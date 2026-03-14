import { useState } from 'react'
import { Zap, ThumbsUp, TrendingUp, TrendingDown } from 'lucide-react'
import { RANKING_DATA } from '../data/mockData'

export default function RankingPage() {
  const [rankFilter, setRankFilter] = useState<'weekly' | 'allTime'>('weekly')

  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-5xl font-[1000] text-slate-900 tracking-tighter mb-3">Live Leaderboards</h2>
          <p className="text-slate-500 font-medium text-lg">See who's leading the sustainable brunch revolution in Victoria.</p>
        </div>
        <div className="flex bg-slate-50 p-2 rounded-2xl border border-slate-200">
          <button onClick={() => setRankFilter('weekly')} className={`px-10 py-3 rounded-xl text-sm font-black transition-all ${rankFilter === 'weekly' ? 'bg-white border border-slate-200 text-slate-900' : 'text-slate-400'}`}>Weekly</button>
          <button onClick={() => setRankFilter('allTime')} className={`px-10 py-3 rounded-xl text-sm font-black transition-all ${rankFilter === 'allTime' ? 'bg-white border border-slate-200 text-slate-900' : 'text-slate-400'}`}>All-Time</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12">
        {(['Most Creative', 'Fan Favorite'] as const).map(cat => {
          const key = cat === 'Most Creative' ? 'creative' : 'fanFavorite'
          return (
            <div key={cat} className="bg-white rounded-[48px] p-10 border border-slate-200 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h4 className="text-3xl font-[1000] text-slate-900 tracking-tight">{cat}</h4>
                  <p className="text-sm text-slate-400 font-bold uppercase mt-1 tracking-widest">Top Performers</p>
                </div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform ${cat === 'Most Creative' ? 'bg-purple-100 text-purple-600' : 'bg-pink-100 text-pink-600'}`}>
                  {cat === 'Most Creative' ? <Zap size={30} fill="currentColor" /> : <ThumbsUp size={30} fill="currentColor" />}
                </div>
              </div>
              <div className="space-y-4">
                {RANKING_DATA[rankFilter][key].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[28px] border border-slate-100 hover:bg-slate-100 hover:scale-[1.02] transition-all cursor-pointer">
                    <div className="flex items-center gap-6">
                      <span className={`text-4xl font-black ${idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-slate-300' : 'text-orange-200'}`}>#{item.rank}</span>
                      <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-black text-slate-400">{item.name[0]}</div>
                      <span className="text-lg font-black text-slate-800">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-slate-900">{item.score}</p>
                      <div className="flex items-center gap-1 justify-end">
                        {item.trend === 'up' ? <TrendingUp size={12} className="text-green-500" /> : item.trend === 'down' ? <TrendingDown size={12} className="text-red-500" /> : <div className="w-2 h-0.5 bg-slate-300" />}
                        <p className={`text-[10px] font-black uppercase tracking-widest ${item.trend === 'up' ? 'text-green-500' : item.trend === 'down' ? 'text-red-500' : 'text-slate-400'}`}>{item.trend}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}