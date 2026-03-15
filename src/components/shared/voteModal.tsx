import { useState } from 'react'
import { X, ChevronRight, Check } from 'lucide-react'
import type { Post } from '../../types'

const CATEGORIES = ['Most Creative', 'Best Value', 'Incredible Taste', 'Zero Waste Hero'] as const

interface Props {
  post: Post
  onClose: () => void
  onVote: (post: Post, category: string) => void
}

export default function VoteModal({ post, onClose, onVote }: Props) {
  const [voted, setVoted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryClick = (category: string) => {
    if (voted) return
    setSelectedCategory(category)
    setVoted(true)
    onVote(post, category)
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[40px] w-full max-w-md overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-black text-slate-900">Cast Your Vote</h3>
            <p className="text-xs font-bold text-slate-400 mt-1">Which category does this dish deserve?</p>
          </div>
          <button type="button" onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-3">
          {voted && selectedCategory ? (
            <div className="py-4 px-5 rounded-2xl bg-green-50 border-2 border-green-200 text-center">
              <p className="font-black text-green-800 text-lg">Thank you for voting!</p>
              <p className="text-sm text-green-700 mt-1">You voted for {selectedCategory}.</p>
              <button type="button" onClick={onClose} className="mt-4 px-6 py-2 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition-colors">
                Close
              </button>
            </div>
          ) : (
            CATEGORIES.map(label => {
              const isSelected = selectedCategory === label
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleCategoryClick(label)}
                  disabled={voted}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? 'border-green-500 bg-green-50'
                      : 'border-slate-100 hover:border-slate-900 group'
                  }`}
                >
                  <span className={`font-black ${isSelected ? 'text-green-800' : 'text-slate-800 group-hover:translate-x-1'} transition-transform`}>{label}</span>
                  {isSelected ? <Check size={18} className="text-green-600" /> : <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900" />}
                </button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}