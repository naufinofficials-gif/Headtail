import React, { useState } from 'react';
import { useStore, GameMode } from '../../lib/store';
import { formatRupiah } from '../../lib/utils';
import { Save, CheckCircle2, Settings as SettingsIcon } from 'lucide-react';

export default function AdminSettings() {
  const { settings, updateSettings } = useStore();
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    minDeposit: settings.minDeposit,
    minWithdraw: settings.minWithdraw,
    gameMode: settings.gameMode,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setMessage('Settings updated successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Game Settings</h1>
        <p className="text-slate-400">Configure global platform limits and game logic.</p>
      </div>

      {message && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          {message}
        </div>
      )}

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8">
        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Limits */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
              <SettingsIcon className="w-5 h-5 text-indigo-400" />
              Transaction Limits
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Minimum Deposit</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">Rp</span>
                  <input
                    type="number"
                    required
                    value={formData.minDeposit}
                    onChange={(e) => setFormData({ ...formData, minDeposit: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Current: {formatRupiah(settings.minDeposit)}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Minimum Withdraw</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">Rp</span>
                  <input
                    type="number"
                    required
                    value={formData.minWithdraw}
                    onChange={(e) => setFormData({ ...formData, minWithdraw: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Current: {formatRupiah(settings.minWithdraw)}</p>
              </div>
            </div>
          </div>

          {/* Game Logic */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
              <SettingsIcon className="w-5 h-5 text-indigo-400" />
              Game Logic Control
            </h2>
            <p className="text-sm text-slate-400 mb-4">Control who wins the coin flip games globally.</p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <label className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center text-center transition-all ${
                formData.gameMode === 'fair' ? 'bg-indigo-500/10 border-indigo-500' : 'bg-slate-950 border-slate-800 hover:border-slate-600'
              }`}>
                <input 
                  type="radio" 
                  name="gameMode" 
                  className="hidden" 
                  checked={formData.gameMode === 'fair'}
                  onChange={() => setFormData({ ...formData, gameMode: 'fair' })}
                />
                <span className="font-bold text-white mb-1">Fair Play</span>
                <span className="text-xs text-slate-400">50/50 Random Chance</span>
              </label>

              <label className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center text-center transition-all ${
                formData.gameMode === 'admin_wins' ? 'bg-indigo-500/10 border-indigo-500' : 'bg-slate-950 border-slate-800 hover:border-slate-600'
              }`}>
                <input 
                  type="radio" 
                  name="gameMode" 
                  className="hidden" 
                  checked={formData.gameMode === 'admin_wins'}
                  onChange={() => setFormData({ ...formData, gameMode: 'admin_wins' })}
                />
                <span className="font-bold text-white mb-1">Admin Wins</span>
                <span className="text-xs text-slate-400">Members always lose</span>
              </label>

              <label className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center text-center transition-all ${
                formData.gameMode === 'member_wins' ? 'bg-indigo-500/10 border-indigo-500' : 'bg-slate-950 border-slate-800 hover:border-slate-600'
              }`}>
                <input 
                  type="radio" 
                  name="gameMode" 
                  className="hidden" 
                  checked={formData.gameMode === 'member_wins'}
                  onChange={() => setFormData({ ...formData, gameMode: 'member_wins' })}
                />
                <span className="font-bold text-white mb-1">Member Wins</span>
                <span className="text-xs text-slate-400">Members always win</span>
              </label>
            </div>
            
            {formData.gameMode !== 'fair' && (
              <p className="text-xs text-yellow-500 mt-3">
                Warning: Non-fair modes will definitely affect user trust. Use carefully.
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-colors"
            >
              <Save className="w-5 h-5" />
              Save All Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
