import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpCircle, Wallet, CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { User, Transaction } from '../../App';
interface WithdrawProps {
  user: User;
}
export default function MemberWithdraw({ user }: WithdrawProps) {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [accountDetails, setAccountDetails] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const gameSettings = JSON.parse(localStorage.getItem('gameSettings') || '{"minWithdraw": 100000}');
  const transactions = JSON.parse(localStorage.getItem('transactions') || '[]') as Transaction[];
  const userTransactions = transactions.filter(t => t.userId === user?.id && t.type === 'withdraw');
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const userBalance = currentUser?.balance || 0;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseInt(amount);
    if (withdrawAmount < gameSettings.minWithdraw) {
      setMessage({ type: 'error', text: `Minimal withdraw Rp ${gameSettings.minWithdraw.toLocaleString('id-ID')}` });
      return;
    }
    if (withdrawAmount > userBalance) {
      setMessage({ type: 'error', text: 'Saldo tidak mencukupi!' });
      return;
    }
    if (!paymentMethod) {
      setMessage({ type: 'error', text: 'Pilih metode penarikan!' });
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newTransaction: Transaction = {
      id: 'trx-' + Date.now(),
      userId: user.id,
      username: user.username,
      type: 'withdraw',
      amount: withdrawAmount,
      status: 'pending',
      paymentMethod,
      accountDetails,
      createdAt: new Date().toISOString(),
    };
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    setMessage({ type: 'success', text: 'Withdraw berhasil diajukan! Menunggu persetujuan admin.' });
    setAmount('');
    setPaymentMethod('');
    setAccountDetails('');
    setIsLoading(false);
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
      case 'approved':
        return <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Disetujui</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Ditolak</span>;
      default:
        return null;
    }
  };
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Withdraw</h1>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:text-white transition-all"
        >
          {showHistory ? 'Form Withdraw' : 'Riwayat'}
        </button>
      </div>
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-xl flex items-center gap-2 ${
            message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}
        >
          {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </motion.div>
      )}
      {showHistory ? (
        <div className="space-y-4">
          {userTransactions.length === 0 ? (
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center text-slate-400">
              Belum ada riwayat withdraw
            </div>
          ) : (
            userTransactions.map(trx => (
              <div key={trx.id} className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">Rp {trx.amount.toLocaleString('id-ID')}</p>
                  <p className="text-sm text-slate-400">{trx.paymentMethod} • {new Date(trx.createdAt).toLocaleDateString('id-ID')}</p>
                </div>
                {getStatusBadge(trx.status)}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
              <ArrowUpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Withdraw Saldo</h2>
              <p className="text-sm text-slate-400">Minimal: Rp {gameSettings.minWithdraw.toLocaleString('id-ID')}</p>
            </div>
          </div>
          {/* Balance Info */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-6">
            <p className="text-sm text-slate-400">Saldo Tersedia</p>
            <p className="text-2xl font-bold text-amber-400">Rp {userBalance.toLocaleString('id-ID')}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Jumlah Withdraw</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                placeholder="Masukkan jumlah"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Metode Penarikan</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('E-Wallet')}
                  className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${
                    paymentMethod === 'E-Wallet'
                      ? 'bg-amber-500/20 border-amber-500/30 text-amber-400'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <Wallet className="w-5 h-5" />
                  E-Wallet
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Bank Transfer')}
                  className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${
                    paymentMethod === 'Bank Transfer'
                      ? 'bg-amber-500/20 border-amber-500/30 text-amber-400'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  Bank
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Detail Akun Tujuan</label>
              <input
                type="text"
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                placeholder="Nama bank / Nomor rekening / Nama pemilik"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-red-400 to-red-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <ArrowUpCircle className="w-5 h-5" />
              {isLoading ? 'Memproses...' : 'Ajukan Withdraw'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}