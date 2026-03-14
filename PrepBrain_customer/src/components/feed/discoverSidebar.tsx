import { useState } from 'react'
import { Filter, Zap, Sparkles, Gem, Clock, Trophy, ChevronUp, ChevronDown } from 'lucide-react'
import type { FeedCategory } from '../../types'

interface Props {
  activeCategory: FeedCategory
  onChange: (cat: FeedCategory) => void
}

const CATEGORIES: { id: FeedCategory; icon: React.ElementType }[] = [
  { id: 'All Items', icon: Zap },
  { id: 'Must Try', icon: Sparkles },
  { id: 'Rare Finds', icon: Gem },
  { id: 'Ending Soon', icon: Clock },
  { id: 'Most Voted', icon: Trophy },
]

export default function DiscoverSidebar({ activeCategory, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="bg-white rounded-[28px] border border-slate-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(v => !v)}
        className={`w-full p-6 flex items-center justify-between transition-colors ${isOpen ? 'bg-slate-50/50' : 'bg-white'}`}
      >
        <h3 className="font-black text-slate-900 flex items-center gap-2">
          <Filter size={18} /> Discover
        </h3>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div className="p-3 space-y-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`w-full text-left px-5 py-3.5 rounded-2xl text-sm font-bold flex items-center gap-3 transition-all ${
                activeCategory === cat.id
                  ? 'bg-green-600 text-white translate-x-1'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <cat.icon size={16} /> {cat.id}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}