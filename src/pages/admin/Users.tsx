import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Wallet, Calendar, Mail, Trash2, Edit } from 'lucide-react';
import { User } from '../../App';
export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleDeleteUser = (userId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      const updatedUsers = users.filter(u => u.id !== userId);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      window.location.reload();
    }
  };
  const handleEditBalance = (userId: string, currentBalance: number) => {
    const newBalance = prompt('Masukkan saldo baru:', String(currentBalance));
    if (newBalance !== null) {
      const updatedUsers = users.map(u => {
        if (u.id === userId) {
          return { ...u, balance: parseInt(newBalance) || 0 };
        }
        return u;
      });
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      window.location.reload();
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Kelola User</h1>
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari username atau email..."
            className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all"
          />
        </div>
      </div>
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-sm text-slate-400">Total Member</p>
          <p className="text-2xl font-bold text-white">{users.length}</p>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-sm text-slate-400">Total Saldo</p>
          <p className="text-2xl font-bold text-amber-400">
            Rp {users.reduce((sum, u) => sum + u.balance, 0).toLocaleString('id-ID')}
          </p>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-sm text-slate-400">Member Aktif</p>
          <p className="text-2xl font-bold text-green-400">{users.filter(u => u.balance > 0).length}</p>
        </div>
      </div>
      {/* Users List */}
      {filteredUsers.length === 0 ? (
        <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center text-slate-400">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>{searchTerm ? 'Tidak ada user yang cocok' : 'Belum ada member terdaftar'}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredUsers.map((u, i) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{u.username.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{u.username}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {u.email}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(u.createdAt).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Saldo</p>
                    <p className="text-xl font-bold text-amber-400">Rp {u.balance.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditBalance(u.id, u.balance)}
                      className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all"
                      title="Edit Saldo"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                      title="Hapus User"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              {/* Additional Info */}
              <div className="mt-4 pt-4 border-t border-white/5 grid md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Kode Referral</p>
                  <p className="text-white font-medium">{u.referralCode}</p>
                </div>
                <div>
                  <p className="text-slate-500">E-Wallet</p>
                  <p className="text-white font-medium">{u.walletAddress || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-500">Bank</p>
                  <p className="text-white font-medium">{u.bankName || '-'} {u.bankAccount}</p>
                </div>
                <div>
                  <p className="text-slate-500">Direferensikan</p>
                  <p className="text-white font-medium">{u.referredBy || '-'}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}