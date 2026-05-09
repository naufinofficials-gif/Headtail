import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Transaction, User } from '../../App';
export default function AdminWithdraws() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]') as Transaction[];
  const withdraws = transactions.filter(t => t.type === 'withdraw');
  const filteredWithdraws = filter === 'all' ? withdraws : withdraws.filter(t => t.status === filter);
  const handleApprove = (trxId: string, userId: string, amount: number) => {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const trxIndex = transactions.findIndex((t: Transaction) => t.id === trxId);
    if (trxIndex !== -1) {
      transactions[trxIndex].status = 'approved';
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex].balance -= amount;
      localStorage.setItem('users', JSON.stringify(users));
    }
    window.location.reload();
  };
  const handleReject = (trxId: string) => {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const trxIndex = transactions.findIndex((t: Transaction) => t.id === trxId);
    if (trxIndex !== -1) {
      transactions[trxIndex].status = 'rejected';
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
    window.location.reload();
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
      case 'approved':
        return <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Disetujui</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm flex items-center gap-1"><XCircle className="w-3 h-3" /> Ditolak</span>;
      default:
        return null;
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Persetujuan Withdraw</h1>
      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {(['pending', 'approved', 'rejected', 'all'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              filter === f
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {f === 'all' ? 'Semua' : f === 'pending' ? 'Pending' : f === 'approved' ? 'Disetujui' : 'Ditolak'}
          </button>
        ))}
      </div>
      {/* List */}
      {filteredWithdraws.length === 0 ? (
        <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center text-slate-400">
          <ArrowUpCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Tidak ada withdraw {filter !== 'all' ? filter : ''}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredWithdraws.map(trx => (
            <motion.div
              key={trx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                    <ArrowUpCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{trx.username}</p>
                    <p className="text-sm text-slate-400">{trx.paymentMethod}</p>
                  </div>
                </div>
                {getStatusBadge(trx.status)}
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-sm text-slate-400">Jumlah</p>
                  <p className="text-lg font-bold text-red-400">Rp {trx.amount.toLocaleString('id-ID')}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-sm text-slate-400">Akun Tujuan</p>
                  <p className="text-white">{trx.accountDetails}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-sm text-slate-400">Tanggal</p>
                  <p className="text-white">{new Date(trx.createdAt).toLocaleString('id-ID')}</p>
                </div>
              </div>
              {trx.status === 'pending' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(trx.id, trx.userId, trx.amount)}
                    className="flex-1 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Setujui
                  </button>
                  <button
                    onClick={() => handleReject(trx.id)}
                    className="flex-1 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Tolak
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}