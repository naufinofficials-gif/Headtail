import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Building2, Save, CheckCircle } from 'lucide-react';
import { Admin } from '../../App';
export default function AdminWallet() {
  const admin = JSON.parse(localStorage.getItem('admin') || '{}') as Admin;
  const [formData, setFormData] = useState({
    walletAddress: admin?.walletAddress || '',
    bankName: admin?.bankName || '',
    bankAccount: admin?.bankAccount || '',
    bankHolderName: admin?.bankHolderName || '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const adminData = JSON.parse(localStorage.getItem('admin') || '{}');
    const updatedAdmin = { ...adminData, ...formData };
    localStorage.setItem('admin', JSON.stringify(updatedAdmin));
    setMessage({ type: 'success', text: 'Data rekening berhasil disimpan!' });
    setIsLoading(false);
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">E-Wallet & Bank Admin</h1>
      <p className="text-slate-400 mb-6">Data ini akan digunakan untuk menerima deposit dan mengirim withdraw.</p>
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
              <h2 className="text-xl font-bold text-white">E-Wallet Admin</h2>
              <p className="text-sm text-slate-400">Dana, OVO, GoPay, dll</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nomor E-Wallet
            </label>
            <input
              type="text"
              value={formData.walletAddress}
              onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
              className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
              placeholder="08xxxxxxxxxx"
            />
          </div>
        </div>
        {/* Bank Section */}
        <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Rekening Bank Admin</h2>
              <p className="text-sm text-slate-400">Untuk transfer bank</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nama Bank
              </label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
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
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
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
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="NAMA LENGKAP"
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-purple-400 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          {isLoading ? 'Menyimpan...' : 'Simpan Data Rekening'}
        </button>
      </div>
    </div>
  );
}