import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, CreditCard, Building2, Save, CheckCircle } from 'lucide-react';
import { User } from '../../App';
interface WalletProps {
  user: User;
}
export default function MemberWallet({ user }: WalletProps) {
  const [formData, setFormData] = useState({
    walletAddress: user?.walletAddress || '',
    bankName: user?.bankName || '',
    bankAccount: user?.bankAccount || '',
    bankHolderName: user?.bankHolderName || '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...formData };
      localStorage.setItem('users', JSON.stringify(users));
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, ...formData }));
    }
    setMessage({ type: 'success', text: 'Data rekening berhasil disimpan!' });
    setIsLoading(false);
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">E-Wallet & Bank</h1>
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-xl flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-green-500/10 border border-green-500/20 text-green-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}
        >
          <CheckCircle className="w-5 h-5" />
          {message.text}
        </motion.div>
      )}
      <div className="space-y-6">
        {/* E-Wallet Section */}
        <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">E-Wallet</h2>
              <p className="text-sm text-slate-400">Dana, OVO, GoPay, dll</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nomor E-Wallet
              </label>
              <input
                type="text"
                value={formData.walletAddress}
                onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                placeholder="08xxxxxxxxxx"
              />
            </div>
          </form>
        </div>
        {/* Bank Section */}
        <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Rekening Bank</h2>
              <p className="text-sm text-slate-400">Untuk transfer bank</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nama Bank
              </label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                placeholder="BCA, Mandiri, BNI, dll"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nomor Rekening
              </label>
              <input
                type="text"
                value={formData.bankAccount}
                onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                placeholder="1234567890"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nama Pemilik Rekening
              </label>
              <input
                type="text"
                value={formData.bankHolderName}
                onChange={(e) => setFormData({ ...formData, bankHolderName: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                placeholder="NAMA LENGKAP"
              />
            </div>
          </form>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          {isLoading ? 'Menyimpan...' : 'Simpan Data Rekening'}
        </button>
      </div>
    </div>
  );
}