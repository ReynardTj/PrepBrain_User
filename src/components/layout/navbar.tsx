import { Leaf, TrendingUp, Trophy, Award, Navigation, Search } from 'lucide-react'
import type { ActiveTab } from '../../types'

interface Props {
  activeTab: ActiveTab
  onChange: (tab: ActiveTab) => void
}

const NAV_ITEMS: { id: ActiveTab; icon: React.ElementType; label: string }[] = [
  { id: 'feed', icon: TrendingUp, label: 'Feed' },
  { id: 'halloffame', icon: Trophy, label: 'Hall of Fame' },
  { id: 'ranking', icon: Award, label: 'Rankings' },
  { id: 'map', icon: Navigation, label: 'Explore' },
]

export default function Navbar({ activeTab, onChange }: Props) {
  return (
    <nav className="sticky top-0 z-[150] bg-white/80 backdrop-blur-3xl border-b border-slate-200 px-10 h-24 flex items-center">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onChange('feed')}>
            <div className="bg-slate-900 p-3 rounded-[18px] group-hover:rotate-12 transition-transform">
              <Leaf className="text-green-400" size={28} fill="currentColor" />
            </div>
            <span className="text-3xl font-[1000] tracking-tighter text-slate-900">PrepBrain</span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className={`flex items-center gap-2.5 text-sm font-black transition-all pb-1.5 border-b-[3px] ${
                  activeTab === item.id
                    ? 'text-slate-900 border-slate-900'
                    : 'text-slate-400 border-transparent hover:text-slate-600'
                }`}
              >
                <item.icon size={20} /> {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center bg-slate-50 rounded-2xl px-5 py-3 w-80 border border-slate-200 focus-within:ring-2 ring-slate-200">
            <Search size={18} className="text-slate-400" />
            <input type="text" placeholder="Find stores, dishes, tags..." className="bg-transparent border-none outline-none px-4 text-xs w-full font-bold" />
          </div>
          <div
            className="w-12 h-12 rounded-[18px] overflow-hidden border-2 border-slate-200 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => onChange('dashboard')}
          >
            <img src="https://i.pravatar.cc/150?u=brunchmanager" alt="Profile" className="w-full h-full object-cover" draggable={false} />
          </div>
        </div>
      </div>
    </nav>
  )
}