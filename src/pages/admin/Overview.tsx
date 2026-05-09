import { motion } from 'framer-motion';
import { Users, Wallet, ArrowDownCircle, ArrowUpCircle, TrendingUp, Activity, Clock, CheckCircle } from 'lucide-react';
import { User, Transaction, GameHistory, GameSettings } from '../../App';
export default function AdminOverview() {
  const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]') as Transaction[];
  const gameHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]') as GameHistory[];
  const gameSettings = JSON.parse(localStorage.getItem('gameSettings') || '{}') as GameSettings;
  const pendingDeposits = transactions.filter(t => t.type === 'deposit' && t.status === 'pending');
  const pendingWithdraws = transactions.filter(t => t.type === 'withdraw' && t.status === 'pending');
  const totalBalance = users.reduce((sum, u) => sum + (u.balance || 0), 0);
  const totalGames = gameHistory.length;
  const stats = [
    { label: 'Total Member', value: users.length, icon: Users, color: 'from-blue-400 to-blue-600' },
    { label: 'Total Saldo Member', value: `Rp ${totalBalance.toLocaleString('id-ID')}`, icon: Wallet, color: 'from-amber-400 to-amber-600' },
    { label: 'Deposit Pending', value: pendingDeposits.length, icon: ArrowDownCircle, color: 'from-green-400 to-green-600' },
    { label: 'Withdraw Pending', value: pendingWithdraws.length, icon: ArrowUpCircle, color: 'from-red-400 to-red-600' },
  ];
  const getWinModeLabel = () => {
    switch (gameSettings.winMode) {
      case 'admin': return 'Admin Menang';
      case 'member': return 'Member Menang';
      case 'fair': return 'Fair 50:50';
      default: return 'Fair 50:50';
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Admin</h1>
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      {/* Game Settings Info */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">Pengaturan Game</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-slate-400">Mode Kemenangan</span>
              <span className="text-purple-400 font-medium">{getWinModeLabel()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-slate-400">Minimal Deposit</span>
              <span className="text-green-400 font-medium">Rp {gameSettings.minDeposit?.toLocaleString('id-ID') || 50000}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-slate-400">Minimal Withdraw</span>
              <span className="text-red-400 font-medium">Rp {gameSettings.minWithdraw?.toLocaleString('id-ID') || 100000}</span>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">Statistik Game</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-slate-400">Total Permainan</span>
              <span className="text-amber-400 font-medium">{totalGames}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-slate-400">Member Menang</span>
              <span className="text-green-400 font-medium">{gameHistory.filter(g => g.won).length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-slate-400">Member Kalah</span>
              <span className="text-red-400 font-medium">{gameHistory.filter(g => !g.won).length}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Transactions */}
      <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        <h3 className="text-lg font-bold text-white mb-4">Transaksi Terbaru</h3>
        {transactions.length === 0 ? (
          <p className="text-slate-400 text-center py-4">Belum ada transaksi</p>
        ) : (
          <div className="space-y-3">
            {transactions.slice(-5).reverse().map(trx => (
              <div key={trx.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    trx.type === 'deposit' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {trx.type === 'deposit' ? <ArrowDownCircle className="w-5 h-5 text-green-400" /> : <ArrowUpCircle className="w-5 h-5 text-red-400" />}
                  </div>
                  <div>
                    <p className="text-white font-medium">{trx.username}</p>
                    <p className="text-sm text-slate-400">{trx.type === 'deposit' ? 'Deposit' : 'Withdraw'} • Rp {trx.amount.toLocaleString('id-ID')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {trx.status === 'pending' && <Clock className="w-4 h-4 text-yellow-400" />}
                  {trx.status === 'approved' && <CheckCircle className="w-4 h-4 text-green-400" />}
                  <span className={`text-sm ${
                    trx.status === 'pending' ? 'text-yellow-400' : trx.status === 'approved' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {trx.status === 'pending' ? 'Pending' : trx.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}