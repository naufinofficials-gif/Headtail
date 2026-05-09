import { Link } from 'react-router-dom';import { motion } from 'framer-motion';import { Coins, Users, Shield, Zap, ChevronRight, Play, Star, Wallet, Gift, TrendingUp } from 'lucide-react';export default function LandingPage() {  const features = [    { icon: Coins, title: 'Coin Flip Game', desc: 'Permainan Head & Tail yang adil dan transparan dengan peluang menang 50:50' },    { icon: Wallet, title: 'Deposit & Withdraw', desc: 'Transaksi cepat melalui E-Wallet dan Bank Transfer dengan proses otomatis' },    { icon: Gift, title: 'Affiliate Program', desc: 'Dapatkan bonus referral dengan mengajak teman bergabung di platform kami' },    { icon: Shield, title: 'Keamanan Terjamin', desc: 'Sistem keamanan berlapis untuk melindungi data dan transaksi Anda' },  ];  const stats = [    { value: '50K+', label: 'Active Players' },    { value: 'Rp 10M+', label: 'Total Payout' },    { value: '99.9%', label: 'Uptime' },    { value: '24/7', label: 'Support' },  ];  return (    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[100px]" />
      </div>
      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5 backdrop-blur-xl bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <Coins className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                  CoinFlip
                </span>
                <span className="text-xs text-slate-400 block -mt-1">PRO</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-300 hover:text-amber-400 transition-colors">Fitur</a>
              <a href="#how" className="text-slate-300 hover:text-amber-400 transition-colors">Cara Main</a>
              <a href="#faq" className="text-slate-300 hover:text-amber-400 transition-colors">FAQ</a>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                to="/login"
                className="px-5 py-2.5 text-slate-300 hover:text-white transition-colors font-medium"
              >
                Masuk
              </Link>
              <Link 
                to="/register"
                className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-105"
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative z-10 min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                Platform Gaming Terpercaya #1 di Indonesia
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Main{' '}
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Head & Tail
                </span>
                <br />
                Menangkan Hadiah Besar!
              </h1>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Rasakan sensasi permainan coin flip yang adil dan transparan. 
                Deposit instan, withdraw cepat, dan bonus affiliate menarik setiap hari!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="group px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Mulai Bermain
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#how"
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold text-lg rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  Pelajari Cara Main
                </a>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/5">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div className="text-2xl lg:text-3xl font-bold text-amber-400">{stat.value}</div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Coin Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full blur-3xl opacity-30 animate-pulse" />
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="relative w-full h-full rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 shadow-2xl shadow-amber-500/50 flex items-center justify-center"
                >
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center">
                    <span className="text-6xl font-bold text-amber-800">H</span>
                  </div>
                  <div className="absolute inset-0 rounded-full border-8 border-amber-200/30" />
                </motion.div>
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-8 -right-8 px-4 py-2 bg-green-500/20 backdrop-blur-xl border border-green-500/30 rounded-xl text-green-400 font-semibold"
                >
                  +Rp 500.000
                </motion.div>
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-8 -left-8 px-4 py-2 bg-amber-500/20 backdrop-blur-xl border border-amber-500/30 rounded-xl text-amber-400 font-semibold"
                >
                  WIN!
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Mengapa Memilih{' '}
              <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">Kami?</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Platform gaming terlengkap dengan fitur premium untuk pengalaman bermain terbaik
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:border-amber-500/30 transition-all hover:shadow-xl hover:shadow-amber-500/5"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section id="how" className="relative z-10 py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Cara{' '}
              <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">Bermain</span>
            </h2>
            <p className="text-xl text-slate-400">Hanya 4 langkah mudah untuk mulai menang</p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Daftar Akun', desc: 'Buat akun gratis dalam hitungan detik', icon: Users },
              { step: '02', title: 'Deposit Saldo', desc: 'Isi saldo via E-Wallet atau Bank Transfer', icon: Wallet },
              { step: '03', title: 'Pilih & Main', desc: 'Pilih Head atau Tail dan tentukan taruhan', icon: Coins },
              { step: '04', title: 'Withdraw', desc: 'Tarik kemenangan Anda kapan saja', icon: TrendingUp },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-800 to-slate-700 border border-amber-500/20 rounded-2xl flex items-center justify-center">
                  <item.icon className="w-10 h-10 text-amber-400" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-amber-500 text-slate-900 text-sm font-bold rounded-full">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-amber-500/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-xl border border-amber-500/20 rounded-3xl text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.1),transparent_50%)]" />
            <div className="relative">
              <Gift className="w-16 h-16 text-amber-400 mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Dapatkan Bonus Referral Hingga 10%!
              </h2>
              <p className="text-xl text-slate-400 mb-8">
                Ajak teman bergabung dan dapatkan bonus setiap kali mereka bermain
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all hover:scale-105"
              >
                <Zap className="w-5 h-5" />
                Daftar Sekarang - Gratis!
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-slate-900/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CoinFlip Pro</span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2024 CoinFlip Pro. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-amber-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}