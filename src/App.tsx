import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import MemberDashboard from './pages/member/Dashboard';
import MemberProfile from './pages/member/Profile';
import MemberWallet from './pages/member/Wallet';
import MemberDeposit from './pages/member/Deposit';
import MemberWithdraw from './pages/member/Withdraw';
import MemberAffiliate from './pages/member/Affiliate';
import CoinFlipGame from './pages/member/CoinFlipGame';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProfile from './pages/admin/Profile';
import AdminWallet from './pages/admin/Wallet';
import AdminDeposits from './pages/admin/Deposits';
import AdminWithdraws from './pages/admin/Withdraws';
import AdminAffiliate from './pages/admin/Affiliate';
import AdminSettings from './pages/admin/Settings';
import AdminUsers from './pages/admin/Users';
import AdminOverview from './pages/admin/Overview';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  balance: number;
  referralCode: string;
  referredBy: string | null;
  walletAddress: string;
  bankName: string;
  bankAccount: string;
  bankHolderName: string;
  createdAt: string;
}

export interface Admin {
  id: string;
  username: string;
  email: string;
  password: string;
  walletAddress: string;
  bankName: string;
  bankAccount: string;
  bankHolderName: string;
}

export interface Transaction {
  id: string;
  userId: string;
  username: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  paymentMethod: string;
  accountDetails: string;
  createdAt: string;
}

export interface GameSettings {
  winMode: 'admin' | 'member' | 'fair';
  minDeposit: number;
  minWithdraw: number;
}

export interface GameHistory {
  id: string;
  userId: string;
  username: string;
  bet: number;
  choice: 'heads' | 'tails';
  result: 'heads' | 'tails';
  won: boolean;
  amount: number;
  createdAt: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedIsAdmin = localStorage.getItem('isAdmin');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    if (savedIsAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (user: User, admin: boolean = false) => {
    setCurrentUser(user);
    setIsAdmin(admin);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('isAdmin', String(admin));
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/register" element={<Register onLogin={login} />} />
        
        {/* Member Routes */}
        <Route path="/member" element={currentUser && !isAdmin ? <MemberDashboard user={currentUser} onLogout={logout} /> : <Navigate to="/login" />}>
          <Route index element={<CoinFlipGame user={currentUser!} />} />
          <Route path="profile" element={<MemberProfile user={currentUser!} />} />
          <Route path="wallet" element={<MemberWallet user={currentUser!} />} />
          <Route path="deposit" element={<MemberDeposit user={currentUser!} />} />
          <Route path="withdraw" element={<MemberWithdraw user={currentUser!} />} />
          <Route path="affiliate" element={<MemberAffiliate user={currentUser!} />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={currentUser && isAdmin ? <AdminDashboard user={currentUser} onLogout={logout} /> : <Navigate to="/login" />}>
          <Route index element={<AdminOverview />} />
          <Route path="profile" element={<AdminProfile user={currentUser!} />} />
          <Route path="wallet" element={<AdminWallet />} />
          <Route path="deposits" element={<AdminDeposits />} />
          <Route path="withdraws" element={<AdminWithdraws />} />
          <Route path="affiliate" element={<AdminAffiliate />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;