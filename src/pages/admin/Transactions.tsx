import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { formatRupiah, cn } from '../../lib/utils';
import { Check, X, Clock, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function AdminTransactions() {
  const { transactions, users, approveTransaction, rejectTransaction } = useStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  const filteredTransactions = transactions
    .filter(t => filter === 'all' || t.status === filter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getUserDetails = (userId: string) => {
    return users.find(u => u.id === userId);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Manage Transactions</h1>
          <p className="text-slate-400">Approve or reject member deposits and withdrawals.</p>
        </div>
        
        <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
          {(['pending', 'all', 'approved', 'rejected'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors",
                filter === f ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800">
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Date/ID</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase">User</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Type</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Amount</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Method</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Status</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredTransactions.map(tx => {
                const user = getUserDetails(tx.userId);
                return (
                  <tr key={tx.id} className="hover:bg-slate-800/30">
                    <td className="p-4">
                      <p className="text-sm text-white">{new Date(tx.date).toLocaleDateString()}</p>
                      <p className="text-xs text-slate-500 font-mono">{tx.id.substring(0, 12)}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-white">{user?.username}</p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {tx.type === 'deposit' ? (
                          <ArrowDownRight className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-red-400" />
                        )}
                        <span className="text-sm text-white capitalize">{tx.type}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-white">{formatRupiah(tx.amount)}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-400">{tx.method || '-'}</span>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "px-2 py-1 text-xs rounded-full inline-flex items-center gap-1",
                        tx.status === 'approved' ? "bg-emerald-500/20 text-emerald-400" :
                        tx.status === 'rejected' ? "bg-red-500/20 text-red-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      )}>
                        {tx.status === 'pending' && <Clock className="w-3 h-3" />}
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {tx.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => approveTransaction(tx.id)}
                            className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded transition-colors"
                            title="Approve"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => rejectTransaction(tx.id)}
                            className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                            title="Reject"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-sm">Processed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
