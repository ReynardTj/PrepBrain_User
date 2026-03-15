import { ThumbsUp, Flame } from 'lucide-react'
import type { AIDish, AIDishVoteOption } from '../../types'

interface Props {
  dish: AIDish
  userVote: AIDishVoteOption | null
  isEnded: boolean
  isMostVoted: boolean
  onVote: (dishId: string, option: AIDishVoteOption) => void
}

export default function AIDishVoteCard({ dish, userVote, isEnded, isMostVoted, onVote }: Props) {
  const total = dish.interestedCount + dish.wantToTryCount
  const interestedPct = total > 0 ? (dish.interestedCount / total) * 100 : 50
  const wantToTryPct = total > 0 ? (dish.wantToTryCount / total) * 100 : 50

  const handleInterested = () => {
    if (isEnded) return
    onVote(dish.id, 'interested')
  }

  const handleWantToTry = () => {
    if (isEnded) return
    onVote(dish.id, 'want_to_try')
  }

  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[300px] bg-white rounded-[28px] border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-2 left-2 bg-slate-900/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider">
          By WouldYouTry.Create
        </div>
        {isMostVoted && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
            <Flame size={10} /> Most Voted Today
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-black text-slate-900 text-sm leading-tight mb-0.5 line-clamp-2">
          {dish.name}
        </h4>
        {dish.tagline && (
          <p className="text-[11px] text-slate-500 font-medium mb-3 line-clamp-2">{dish.tagline}</p>
        )}

        <div className="flex gap-2 mb-3">
          <button
            type="button"
            onClick={handleInterested}
            disabled={!!isEnded}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all ${
              userVote === 'interested'
                ? 'bg-green-100 text-green-700 border-2 border-green-400'
                : userVote === 'want_to_try'
                  ? 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-green-50 hover:border-green-200 hover:text-green-700'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-green-50 hover:border-green-200 hover:text-green-700'
            } ${isEnded ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            title={userVote === 'interested' ? 'Click again to unselect' : undefined}
          >
            <ThumbsUp size={14} className={userVote === 'interested' ? 'fill-current' : ''} />
            Interested
          </button>
          <button
            type="button"
            onClick={handleWantToTry}
            disabled={!!isEnded}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all ${
              userVote === 'want_to_try'
                ? 'bg-orange-100 text-orange-700 border-2 border-orange-400'
                : userVote === 'interested'
                  ? 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700'
            } ${isEnded ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            title={userVote === 'want_to_try' ? 'Click again to unselect' : undefined}
          >
            <Flame size={14} className={userVote === 'want_to_try' ? 'fill-current' : ''} />
            Want to try
          </button>
        </div>

        <div className="mt-auto">
          {userVote != null && (
            <div className="pt-2 border-t border-slate-100">
              <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                <span>Interested: {dish.interestedCount}</span>
                <span>Want to try: {dish.wantToTryCount}</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden flex">
                <div
                  className="h-full bg-green-400 rounded-l-full transition-all duration-300"
                  style={{ width: `${interestedPct}%` }}
                />
                <div
                  className="h-full bg-orange-400 rounded-r-full transition-all duration-300"
                  style={{ width: `${wantToTryPct}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
