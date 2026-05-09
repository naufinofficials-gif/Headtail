import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, CheckCircle, Shield, Users, Coins } from 'lucide-react';
import { GameSettings } from '../../App';
export default function AdminSettings() {
  const savedSettings = JSON.parse(localStorage.getItem('gameSettings') || '{}') as GameSettings;
  const [winMode, setWinMode] = useState<'admin' | 'member' | 'fair'>(savedSettings.winMode || 'fair');
  const [minDeposit, setMinDeposit] = useState(savedSettings.minDeposit || 50000);
  const [minWithdraw, setMinWithdraw] = useState(savedSettings.minWithdraw || 100000);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const settings: GameSettings = {
      winMode,
      minDeposit,
      minWithdraw,
    };
    localStorage.setItem('gameSettings', JSON.stringify(settings));
    setMessage('Pengaturan berhasil disimpan!');
    setIsLoading(false);
    setTimeout(() => setMessage(''), 3000);
  };
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Pengaturan Website</h1>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400"
        >
          <CheckCircle className="w-5 h-5" />
          {message}
        </motion.div>
      )}
      {/* Win Mode */}
      <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Mode Kemenangan</h2>
            <p className="text-sm text-slate-400">Tentukan siapa yang menang dalam permainan</p>
          </div>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => setWinMode('admin')}
            className={`w-full p-4 rounded-xl border transition-all text-left ${
              winMode === 'admin'
                ? 'bg-purple-500/20 border-purple-500/30'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Admin Selalu Menang</p>
                <p className="text-sm text-slate-400">Member akan selalu kalah dalam permainan</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                winMode === 'admin' ? 'border-purple-400 bg-purple-400' : 'border-slate-500'
              }`}>
                {winMode === 'admin' && <CheckCircle className="w-5 h-5 text-white" />}
              </div>
            </div>
          </button>
          <button
            onClick={() => setWinMode('member')}
            className={`w-full p-4 rounded-xl border transition-all text-left ${
              winMode === 'member'
                ? 'bg-purple-500/20 border-purple-500/30'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Member Selalu Menang</p>
                <p className="text-sm text-slate-400">Member akan selalu menang dalam permainan</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                winMode === 'member' ? 'border-purple-400 bg-purple-400' : 'border-slate-500'
              }`}>
                {winMode === 'member' && <CheckCircle className="w-5 h-5 text-white" />}
              </div>
            </div>
          </button>
          <button
            onClick={() => setWinMode('fair')}
            className={`w-full p-4 rounded-xl border transition-all text-left ${
              winMode === 'fair'
                ? 'bg-purple-500/20 border-purple-500/30'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Fair 50:50</p>
                <p className="text-sm text-slate-400">Peluang menang adil 50% untuk setiap pihak</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                winMode === 'fair' ? 'border-purple-400 bg-purple-400' : 'border-slate-500'
              }`}>
                {winMode === 'fair' && <CheckCircle className="w-5 h-5 text-white" />}
              </div>
            </div>
          </button>
        </div>
      </div>
      {/* Min Deposit & Withdraw */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">Minimal Deposit</h3>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">Rp</span>
            <input
              type="number"
              value={minDeposit}
              onChange={(e) => setMinDeposit(parseInt(e.target.value) || 0)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all"
            />
          </div>
        </div>
        <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">Minimal Withdraw</h3>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">Rp</span>
            <input
              type="number"
              value={minWithdraw}
              onChange={(e) => setMinWithdraw(parseInt(e.target.value) || 0)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleSave}
        disabled={isLoading}
        className="w-full py-4 bg-gradient-to-r from-purple-400 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Save className="w-5 h-5" />
        {isLoading ? 'Menyimpan...' : 'Simpan Pengaturan'}
      </button>
    </div>
  );
}