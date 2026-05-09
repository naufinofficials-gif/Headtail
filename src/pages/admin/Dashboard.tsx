import React from 'react';
import { useStore } from '../../lib/store';
import { formatRupiah } from '../../lib/utils';
import { Users, ArrowDownRight, ArrowUpRight, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const { users, transactions } = useStore();

  const totalUsers = users.filter(u => u.role === 'user').length;
  
  const pendingDeposits = transactions.filter(t => t.type === 'deposit' && t.status === 'pending');
  const pendingWithdraws = transactions.filter(t => t.type === 'withdraw' && t.status === 'pending');
  
  const totalDeposits = transactions
    .filter(t => t.type === 'deposit' && t.status === 'approved')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalWithdraws = transactions
    .filter(t => t.type === 'withdraw' && t.status === 'approved')
    .reduce((sum, t) => sum + t.amount, 0);

  // Platform profit estimate (deposits - withdraws - user balances)
  const totalUserBalances = users
    .filter(u => u.role === 'user')
    .reduce((sum, u) => sum + u.balance, 0);
    
  const platformProfit = totalDeposits - totalWithdraws - totalUserBalances;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-slate-400">Overview of platform performance and pending tasks.</p>
      </div>

      {/* Action Needed Alerts */}
      {(pendingDeposits.length > 0 || pendingWithdraws.length > 0) && (
        <div className="flex gap-4">
          {pendingDeposits.length > 0 && (
            <div className="flex-1 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-yellow-500 font-bold">{pendingDeposits.length} Pending Deposits</p>
                <p className="text-xs text-yellow-500/70">Require your approval</p>
              </div>
              <a href="/admin/transactions" className="px-4 py-2 bg-yellow-500 text-yellow-950 rounded-lg text-sm font-bold">Review</a>
            </div>
          )}
          {pendingWithdraws.length > 0 && (
            <div className="flex-1 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-blue-400 font-bold">{pendingWithdraws.length} Pending Withdraws</p>
                <p className="text-xs text-blue-400/70">Require your approval</p>
              </div>
              <a href="/admin/transactions" className="px-4 py-2 bg-blue-500 text-blue-950 rounded-lg text-sm font-bold">Review</a>
            </div>
          )}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-800 rounded-lg">
              <Users className="w-5 h-5 text-slate-400" />
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Total Members</h3>
          </div>
          <p className="text-3xl font-bold text-white">{totalUsers}</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <ArrowDownRight className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Total Deposits</h3>
          </div>
          <p className="text-2xl font-bold text-emerald-400">{formatRupiah(totalDeposits)}</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <ArrowUpRight className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Total Withdraws</h3>
          </div>
          <p className="text-2xl font-bold text-red-400">{formatRupiah(totalWithdraws)}</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Activity className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Platform Profit Estimate</h3>
          </div>
          <p className={`text-2xl font-bold ${platformProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {platformProfit >= 0 ? '+' : ''}{formatRupiah(platformProfit)}
          </p>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white">Recent Members</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800">
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Username</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Email</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Balance</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Referred By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.filter(u => u.role === 'user').slice(-5).reverse().map(user => (
                <tr key={user.id} className="hover:bg-slate-800/30">
                  <td className="p-4 font-medium text-white">{user.username}</td>
                  <td className="p-4 text-slate-400 text-sm">{user.email}</td>
                  <td className="p-4 text-emerald-400 font-medium">{formatRupiah(user.balance)}</td>
                  <td className="p-4 text-slate-500 text-sm">{user.referredBy || '-'}</td>
                </tr>
              ))}
              {users.filter(u => u.role === 'user').length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">No members yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
