import { useState, useRef, useEffect } from 'react'
import { Clock } from 'lucide-react'
import CountdownTimer from './countdownTimer'
import AIDishVoteCard from './aiDishVoteCard'
import { useAIDishVoting } from '../../hooks/useAIDishVoting'

export default function DailyAIDishVoting() {
  const { round, dishes, userVotes, loading, error, vote } = useAIDishVoting()
  const [timerEnded, setTimerEnded] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, scrollLeft: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    if ((e.target as HTMLElement).closest('button')) return
    setIsDragging(true)
    dragStart.current = { x: e.clientX, scrollLeft: scrollRef.current.scrollLeft }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!scrollRef.current) return
    e.preventDefault()
    const dx = dragStart.current.x - e.clientX
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft + dx
  }

  const handleMouseUp = () => setIsDragging(false)

  const moveRef = useRef(handleMouseMove)
  const upRef = useRef(handleMouseUp)
  moveRef.current = handleMouseMove
  upRef.current = handleMouseUp

  useEffect(() => {
    if (!isDragging) return
    const onMove = (e: MouseEvent) => moveRef.current(e)
    const onUp = () => upRef.current()
    document.addEventListener('mousemove', onMove, { passive: false })
    document.addEventListener('mouseup', onUp)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
  }, [isDragging])

  const [remainingMs, setRemainingMs] = useState(0)

  useEffect(() => {
    if (!round) return
    const endsAtMs = new Date(round.endsAt).getTime()
    const update = () => setRemainingMs(Math.max(0, endsAtMs - Date.now()))
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [round?.endsAt])

  const isEnded = timerEnded || (round ? new Date(round.endsAt).getTime() <= Date.now() : false)
  const remainingHours = remainingMs / (60 * 60 * 1000)
  // const timerBoxGreen = remainingHours >= 15
  const timerBoxYellow = remainingHours >= 3 && remainingHours < 15
  const timerBoxRed = remainingHours > 0 && remainingHours < 3
  const timerBoxClass = isEnded
    ? 'bg-slate-100 border-slate-300 text-slate-600'
    : timerBoxRed
      ? 'bg-red-100 border-red-400 text-red-800'
      : timerBoxYellow
        ? 'bg-amber-100 border-amber-400 text-amber-900'
        : 'bg-green-100 border-green-400 text-green-800'

  const maxTotal = dishes.length
    ? Math.max(...dishes.map(d => d.interestedCount + d.wantToTryCount))
    : 0
  const mostVotedDishId =
    maxTotal > 0 ? dishes.find(d => d.interestedCount + d.wantToTryCount === maxTotal)?.id ?? null : null

  if (loading) {
    return (
      <div className="bg-white rounded-[32px] border border-slate-200 p-8">
        <p className="text-slate-400 text-sm font-medium">Loading daily dishes...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-[32px] border border-slate-200 p-8">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    )
  }

  if (!round || dishes.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-5 pb-4 border-b border-slate-100">
        <h3 className="font-sans font-black text-slate-900 text-xl mb-3">
          Vote For Tomorrow&apos;s Potential Dishes
        </h3>
        <div
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 font-bold text-sm ${timerBoxClass}`}
        >
          <Clock size={18} />
          {!isEnded && <span>Voting ends in </span>}
          <CountdownTimer
            endsAt={round.endsAt}
            onEnd={() => setTimerEnded(true)}
            className="text-inherit"
            urgentClassName="text-inherit"
          />
        </div>
      </div>

      <div
        ref={scrollRef}
        role="region"
        aria-label="AI dish cards - drag to scroll"
        className={`p-4 overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
      >
        <div className="flex gap-4 pb-2" style={{ scrollSnapType: 'x mandatory' }}>
          {dishes.map(dish => (
            <div key={dish.id} style={{ scrollSnapAlign: 'start' }}>
              <AIDishVoteCard
                dish={dish}
                userVote={userVotes[dish.id] ?? null}
                isEnded={isEnded}
                isMostVoted={mostVotedDishId === dish.id}
                onVote={vote}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
