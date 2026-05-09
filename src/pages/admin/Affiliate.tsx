import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Copy, CheckCircle, Gift, TrendingUp, Share2 } from 'lucide-react';
import { User } from '../../App';
import { Admin } from '../../App';
export default function AdminAffiliate() {
  const [copied, setCopied] = useState(false);
  const admin = JSON.parse(localStorage.getItem('admin') || '{}') as Admin;
  const baseUrl = window.location.origin;
  const affiliateLink = `${baseUrl}/register`;
  const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
  const totalUsers = users.length;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Link Affiliate</h1>
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-purple-400" />
            <span className="text-slate-400">Total Member</span>
          </div>
          <p className="text-3xl font-bold text-white">{totalUsers}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <Gift className="w-6 h-6 text-green-400" />
            <span className="text-slate-400">Bonus Referral</span>
          </div>
          <p className="text-3xl font-bold text-green-400">10%</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <span className="text-slate-400">Status</span>
          </div>
          <p className="text-xl font-bold text-blue-400">Aktif</p>
        </motion.div>
      </div>
      {/* Link Section */}
      <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Share2 className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">Link Pendaftaran Member</h2>
        </div>
        <p className="text-slate-400 mb-4">Bagikan link ini untuk merekrut member baru</p>
        <div className="flex gap-3">
          <input
            type="text"
            value={affiliateLink}
            readOnly
            className="flex-1 px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm"
          />
          <button
            onClick={copyToClipboard}
            className={`px-6 py-3.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-gradient-to-r from-purple-400 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/25'
            }`}
          >
            {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? 'Tersalin!' : 'Salin'}
          </button>
        </div>
      </div>
      {/* Referrals Overview */}
      <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Semua Member</h3>
        {users.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Belum ada member terdaftar</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {users.map((u, i) => (
              <div key={u.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{u.username.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{u.username}</p>
                    <p className="text-sm text-slate-400">{u.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-amber-400 font-medium">Rp {u.balance.toLocaleString('id-ID')}</p>
                  <p className="text-sm text-slate-400">Kode: {u.referralCode}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}