import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, TrendingUp, TrendingDown, History, Sparkles, AlertCircle } from 'lucide-react';
import { User, GameSettings, GameHistory } from '../../App';
interface CoinFlipGameProps {
  user: User;
}
export default function CoinFlipGame({ user }: CoinFlipGameProps) {
  const [betAmount, setBetAmount] = useState('');
  const [choice, setChoice] = useState<'heads' | 'tails'>('heads');
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [won, setWon] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [coinSide, setCoinSide] = useState<'heads' | 'tails'>('heads');
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setCurrentBalance(currentUser?.balance || 0);
  }, []);
  const gameSettings: GameSettings = JSON.parse(localStorage.getItem('gameSettings') || '{"winMode": "fair"}');
  const gameHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]') as GameHistory[];
  const userHistory = gameHistory.filter(g => g.userId === user?.id).slice(-10).reverse();
  const determineResult = (): 'heads' | 'tails' => {
    switch (gameSettings.winMode) {
      case 'admin':
        return choice === 'heads' ? 'tails' : 'heads';
      case 'member':
        return choice;
      case 'fair':
      default:
        return Math.random() < 0.5 ? 'heads' : 'tails';
    }
  };
  const handleFlip = async () => {
    const bet = parseInt(betAmount);
    if (isNaN(bet) || bet <= 0) {
      setMessage('Masukkan jumlah taruhan yang valid!');
      return;
    }
    if (bet > currentBalance) {
      setMessage('Saldo tidak mencukupi!');
      return;
    }
    setIsFlipping(true);
    setMessage('');
    setResult(null);
    setWon(null);
    // Animate coin flip
    for (let i = 0; i < 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setCoinSide(prev => prev === 'heads' ? 'tails' : 'heads');
    }
    const flipResult = determineResult();
    setResult(flipResult);
    setCoinSide(flipResult);
    const isWinner = flipResult === choice;
    setWon(isWinner);
    const winAmount = isWinner ? bet : -bet;
    // Update balance
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex].balance += winAmount;
      localStorage.setItem('users', JSON.stringify(users));
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      currentUser.balance += winAmount;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      setCurrentBalance(currentUser.balance);
    }
    // Save game history
    const newGame: GameHistory = {
      id: 'game-' + Date.now(),
      userId: user.id,
      username: user.username,
      bet,
      choice,
      result: flipResult,
      won: isWinner,
      amount: Math.abs(winAmount),
      createdAt: new Date().toISOString(),
    };
    gameHistory.push(newGame);
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
    setIsFlipping(false);
    setMessage(isWinner ? `Selamat! Anda menang Rp ${bet.toLocaleString('id-ID')}!` : `Maaf, Anda kalah Rp ${bet.toLocaleString('id-ID')}`);
  };
  const quickBets = [1000, 5000, 10000, 20000, 50000];
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Head & Tail Game</h1>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:text-white transition-all flex items-center gap-2"
        >
          <History className="w-4 h-4" />
          {showHistory ? 'Tutup' : 'Riwayat'}
        </button>
      </div>
      {/* Balance Card */}
      <div className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Saldo Anda</p>
            <p className="text-3xl font-bold text-amber-400">Rp {currentBalance.toLocaleString('id-ID')}</p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <Coins className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
      {/* Game History */}
      {showHistory && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-4 bg-white/5 border border-white/10 rounded-xl"
        >
          <h3 className="text-lg font-bold text-white mb-4">Riwayat Permainan</h3>
          {userHistory.length === 0 ? (
            <p className="text-slate-400 text-center py-4">Belum ada riwayat permainan</p>
          ) : (
            <div className="space-y-2">
              {userHistory.map(game => (
                <div key={game.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      game.won ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {game.won ? <TrendingUp className="w-4 h-4 text-green-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}
                    </div>
                    <div>
                      <p className="text-white text-sm">{game.choice.toUpperCase()} vs {game.result.toUpperCase()}</p>
                      <p className="text-slate-500 text-xs">{new Date(game.createdAt).toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${game.won ? 'text-green-400' : 'text-red-400'}`}>
                    {game.won ? '+' : '-'}Rp {game.amount.toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
      {/* Game Area */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Coin */}
        <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center">
          <motion.div
            animate={{ rotateY: isFlipping ? 180 : 0 }}
            transition={{ duration: 0.3, repeat: isFlipping ? Infinity : 0 }}
            className={`relative w-48 h-48 rounded-full shadow-2xl flex items-center justify-center ${
              coinSide === 'heads'
                ? 'bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500'
                : 'bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500'
            }`}
          >
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
            <span className="text-5xl font-bold text-white drop-shadow-lg">
              {coinSide === 'heads' ? 'H' : 'T'}
            </span>
            <div className="absolute inset-0 rounded-full border-8 border-white/20" />
          </motion.div>
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 px-6 py-3 rounded-xl font-bold text-lg ${
                  won ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
              >
                {won ? '🎉 MENANG!' : '😢 KALAH'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Controls */}
        <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-6">Taruhan Anda</h3>
          {message && (
            <div className={`mb-4 p-4 rounded-xl flex items-center gap-2 ${
              message.includes('menang') ? 'bg-green-500/10 border border-green-500/20 text-green-400' :
              message.includes('kurang') || message.includes('valid') ? 'bg-red-500/10 border border-red-500/20 text-red-400' :
              'bg-amber-500/10 border border-amber-500/20 text-amber-400'
            }`}>
              <AlertCircle className="w-5 h-5" />
              {message}
            </div>
          )}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Jumlah Taruhan</label>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                placeholder="Masukkan jumlah"
                disabled={isFlipping}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {quickBets.map(bet => (
                <button
                  key={bet}
                  onClick={() => setBetAmount(String(bet))}
                  disabled={isFlipping}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:border-amber-500/50 hover:text-amber-400 transition-all text-sm disabled:opacity-50"
                >
                  Rp {bet.toLocaleString('id-ID')}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Pilihan Anda</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setChoice('heads')}
                  disabled={isFlipping}
                  className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                    choice === 'heads'
                      ? 'bg-amber-500/20 border-amber-500/30 text-amber-400'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                  } disabled:opacity-50`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center">
                    <span className="font-bold text-white">H</span>
                  </div>
                  <span className="font-medium">HEADS</span>
                </button>
                <button
                  onClick={() => setChoice('tails')}
                  disabled={isFlipping}
                  className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                    choice === 'tails'
                      ? 'bg-slate-500/20 border-slate-500/30 text-slate-400'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                  } disabled:opacity-50`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center">
                    <span className="font-bold text-white">T</span>
                  </div>
                  <span className="font-medium">TAILS</span>
                </button>
              </div>
            </div>
            <button
              onClick={handleFlip}
              disabled={isFlipping || !betAmount}
              className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isFlipping ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Melempar...
                </>
              ) : (
                <>
                  <Coins className="w-5 h-5" />
                  LEMPAR KOIN!
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}