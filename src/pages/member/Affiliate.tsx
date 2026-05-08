import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Copy, CheckCircle, Gift, TrendingUp, Share2 } from 'lucide-react';
import { User } from '../../App';
interface AffiliateProps {
  user: User;
}
export default function MemberAffiliate({ user }: AffiliateProps) {
  const [copied, setCopied] = useState(false);
  const baseUrl = window.location.origin;
  const affiliateLink = `${baseUrl}/register?ref=${user?.referralCode}`;
  const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
  const referrals = users.filter(u => u.referredBy === user?.referralCode);
  const totalReferrals = referrals.length;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Program Affiliate</h1>
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-amber-400" />
            <span className="text-slate-400">Total Referral</span>
          </div>
          <p className="text-3xl font-bold text-white">{totalReferrals}</p>
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
            <span className="text-slate-400">Kode Anda</span>
          </div>
          <p className="text-2xl font-bold text-blue-400">{user?.referralCode}</p>
        </motion.div>
      </div>
      {/* Link Section */}
      <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Share2 className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl font-bold text-white">Link Affiliate Anda</h2>
        </div>
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
                : 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 hover:shadow-lg hover:shadow-amber-500/25'
            }`}
          >
            {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? 'Tersalin!' : 'Salin'}
          </button>
        </div>
      </div>
      {/* How it works */}
      <div className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Cara Kerja Program Affiliate</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold text-sm">1</div>
            <div>
              <p className="text-white font-medium">Bagikan link affiliate Anda</p>
              <p className="text-slate-400 text-sm">Sebarkan link ke teman, keluarga, atau media sosial</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold text-sm">2</div>
            <div>
              <p className="text-white font-medium">Teman mendaftar melalui link Anda</p>
              <p className="text-slate-400 text-sm">Mereka akan otomatis terdaftar sebagai referral Anda</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold text-sm">3</div>
            <div>
              <p className="text-white font-medium">Dapatkan bonus 10%</p>
              <p className="text-slate-400 text-sm">Setiap deposit referral, Anda mendapat bonus 10%</p>
            </div>
          </div>
        </div>
      </div>
      {/* Referrals List */}
      <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Daftar Referral Anda</h3>
        {referrals.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Belum ada referral. Bagikan link Anda sekarang!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {referrals.map((ref, i) => (
              <div key={ref.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{ref.username.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{ref.username}</p>
                    <p className="text-sm text-slate-400">{new Date(ref.createdAt).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">Aktif</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}