import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coins, Home, User, Wallet, ArrowDownCircle, ArrowUpCircle, Users, LogOut, Menu, X, Settings, Shield } from 'lucide-react';
import { useState } from 'react';
import { User as UserType } from '../../App';
interface AdminDashboardProps {
  user: UserType;
  onLogout: () => void;
}
export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuItems = [
    { path: '/admin', icon: Home, label: 'Dashboard' },
    { path: '/admin/users', icon: Users, label: 'Kelola User' },
    { path: '/admin/profile', icon: User, label: 'Profile' },
    { path: '/admin/wallet', icon: Wallet, label: 'E-Wallet & Bank' },
    { path: '/admin/deposits', icon: ArrowDownCircle, label: 'Persetujuan Deposit' },
    { path: '/admin/withdraws', icon: ArrowUpCircle, label: 'Persetujuan Withdraw' },
    { path: '/admin/affiliate', icon: Users, label: 'Affiliate' },
    { path: '/admin/settings', icon: Settings, label: 'Pengaturan' },
  ];
  const isActive = (path: string) => location.pathname === path;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />
      </div>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10"
      >
        {sidebarOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-72 bg-slate-900/80 backdrop-blur-2xl border-r border-white/5 z-40 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <Link to="/admin" className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent">
                CoinFlip
              </span>
              <span className="text-xs text-slate-400 block">Admin Panel</span>
            </div>
          </Link>
          {/* User Info */}
          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">{user?.username}</p>
                <p className="text-sm text-purple-400">Administrator</p>
              </div>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive(item.path)
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all mt-4"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen p-6 lg:p-8">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}