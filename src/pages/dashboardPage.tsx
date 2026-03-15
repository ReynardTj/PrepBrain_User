import { link } from 'fs'
import { BarChart3, TrendingUp, CheckCircle2, Sparkles, ChefHat, ArrowRight, Zap } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 space-y-10">
      <div className="grid grid-cols-12 gap-10">

        {/* Hero stat card */}
        <div className="col-span-12">
          <div className="bg-slate-900 rounded-[64px] p-16 text-white relative overflow-hidden flex items-center justify-between">
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-20 h-20 rounded-[30px] overflow-hidden border-4 border-white/20">
                  <img src="https://i.pravatar.cc/150?u=brunchmanager" className="w-full h-full object-cover" alt="Manager" draggable={false} />
                </div>
                <div>
                  <h2 className="text-6xl font-[1000] tracking-tighter leading-none mb-2">Yarra Kitchen Manager</h2>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-blue-400" /> Verified Eco-Partner 2026
                  </p>
                </div>
              </div>
              <div className="flex gap-16">
                <div><p className="text-5xl font-[1000] text-green-400 tracking-tighter">#34</p><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">National Rank</p></div>
                <div className="w-px h-16 bg-white/10" />
                <div><p className="text-5xl font-[1000] text-blue-400 tracking-tighter">12.8k</p><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Monthly Reach</p></div>
                <div className="w-px h-16 bg-white/10" />
                <div><p className="text-5xl font-[1000] text-yellow-400 tracking-tighter">1.4k</p><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Engagement Rate</p></div>
              </div>
            </div>
            <div className="relative z-10 w-[300px] h-[180px] flex items-end gap-3 bg-white/5 p-8 rounded-[40px] border border-white/10 backdrop-blur-xl">
              {[40, 75, 50, 95, 60, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-white/10 rounded-t-xl relative overflow-hidden group">
                  <div className="absolute bottom-0 w-full bg-green-500 group-hover:bg-green-400 transition-all duration-1000" style={{ height: `${h}%` }} />
                </div>
              ))}
            </div>
            <Sparkles className="absolute -bottom-20 -right-20 text-white/5 w-[500px] h-[500px] rotate-12" />
          </div>
        </div>

        {/* Metrics */}
        <div className="col-span-8 space-y-10">
          <div className="bg-white rounded-[56px] p-12 border border-slate-200 relative overflow-hidden">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-3xl font-[1000] text-slate-900 tracking-tight flex items-center gap-3">
                  <BarChart3 size={32} className="text-blue-500" /> Influence Growth
                </h3>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time Performance Metrics</p>
              </div>
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-2xl border border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Live Tracking</span>
              </div>
            </div>
            <div className="h-64 w-full relative mb-12">
              <svg viewBox="0 0 400 100" className="w-full h-full">
                <path d="M0,90 Q40,85 80,60 T160,70 T240,40 T320,50 T400,10" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                <path d="M0,90 Q40,85 80,60 T160,70 T240,40 T320,50 T400,10 V100 H0 Z" fill="#3b82f6" opacity="0.07" />
              </svg>
            </div>
            <div className="grid grid-cols-4 gap-8 pt-10 border-t border-slate-100">
              {[
                { label: "Profile Views", val: "14,842", delta: "+15%", up: true },
                { label: "Engagement", val: "18.4%", delta: "+4%", up: true },
                { label: "Viral Shares", val: "1,245", delta: "+24%", up: true },
                { label: "Saves", val: "890", delta: "-2%", up: false }
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-[1000] text-slate-900">{stat.val}</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${stat.up ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>{stat.delta}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="bg-white rounded-[40px] p-10 border border-slate-200 flex flex-col items-center">
              <h4 className="font-black text-slate-900 w-full mb-6">Waste Saved by Category</h4>
              <div className="relative w-40 h-40 mb-6">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-green-500" strokeDasharray="50, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-blue-500" strokeDasharray="30, 100" strokeDashoffset="-50" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-orange-500" strokeDasharray="20, 100" strokeDashoffset="-80" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black">85</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">KG Total</span>
                </div>
              </div>
              <div className="w-full space-y-2">
                {[['bg-green-500', 'Produce', '50%'], ['bg-blue-500', 'Bakery', '30%'], ['bg-orange-500', 'Dairy', '20%']].map(([color, label, pct]) => (
                  <div key={label} className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-2 font-bold"><div className={`w-2 h-2 rounded-full ${color}`} /> {label}</span>
                    <span className="text-slate-500 font-black">{pct}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-[40px] p-10 text-white flex flex-col justify-between">
              <div>
                <h4 className="font-black text-slate-100 flex items-center gap-2 mb-2"><TrendingUp size={18} className="text-green-400" /> Revenue Recovery</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">Value generated from off-menu surplus sales this month.</p>
              </div>
              <div>
                <p className="text-5xl font-black text-white tracking-tighter mb-4">$3,240 <span className="text-sm text-slate-400">AUD</span></p>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-black uppercase text-green-400 mb-1">+12% vs Last Month</p>
                  <p className="text-xs text-slate-300">Equivalent to saving approx. 40 meals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-4 space-y-10">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[56px] p-12 text-white relative overflow-hidden cursor-pointer"
            onClick={() => window.open('https://qkhnh.github.io/PrepBrain/', '_blank')}>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-[24px] flex items-center justify-center mb-8 shadow-xl">
                <ChefHat size={32} />
              </div>
              <h3 className="text-3xl font-[1000] mb-4 leading-tight">Leftover Recipe Generator</h3>
              <p className="text-purple-100 text-sm font-medium mb-10 leading-relaxed">Turn today's leftovers into tomorrow's signature off-menu dish.</p>
              <button className="w-full bg-white text-purple-600 py-5 rounded-[24px] font-[1000] text-xs hover:bg-slate-50 hover:scale-105 transition-all flex items-center justify-center gap-2">
                Launch Generator <ArrowRight size={16} />
              </button>
            </div>
            <Zap className="absolute -top-10 -right-10 text-white/5 w-64 h-64 rotate-45" />
          </div>

          <div className="bg-white rounded-[48px] p-10 border border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-[1000] text-xl text-slate-900 flex items-center gap-3"><CheckCircle2 size={24} className="text-blue-500" /> Daily Tasks</h4>
              <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-3 py-1 rounded-full">2 REMAINING</span>
            </div>
            <div className="space-y-5">
              {[
                { task: "Update surplus inventory", done: true },
                { task: "Reply to 5 fan comments", done: false },
                { task: "Publish Week 12 Report", done: false }
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-4 cursor-pointer group">
                  <div className={`w-7 h-7 rounded-xl border flex items-center justify-center transition-all ${t.done ? 'bg-green-500 border-green-500' : 'border-slate-300 group-hover:border-slate-900'}`}>
                    {t.done && <CheckCircle2 size={16} className="text-white" />}
                  </div>
                  <span className={`text-sm font-bold transition-all ${t.done ? 'text-slate-300 line-through' : 'text-slate-700'}`}>{t.task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}