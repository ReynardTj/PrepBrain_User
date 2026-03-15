import { useState, useEffect, useRef } from 'react'

interface Props {
  endsAt: string
  onEnd?: () => void
  className?: string
  urgentClassName?: string
}

function formatRemaining(ms: number): string {
  if (ms <= 0) return '00:00:00'
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return [hours, minutes, seconds]
    .map(n => n.toString().padStart(2, '0'))
    .join(':')
}

export default function CountdownTimer({ endsAt, onEnd, className = '', urgentClassName = '' }: Props) {
  const onEndRef = useRef(onEnd)
  onEndRef.current = onEnd
  const endsAtMs = new Date(endsAt).getTime()
  const [remainingMs, setRemainingMs] = useState(() => Math.max(0, endsAtMs - Date.now()))
  const isEnded = remainingMs <= 0
  const isUrgent = remainingMs > 0 && remainingMs < 60 * 60 * 1000

  useEffect(() => {
    if (isEnded) {
      onEndRef.current?.()
      return
    }
    const interval = setInterval(() => {
      const next = Math.max(0, endsAtMs - Date.now())
      setRemainingMs(next)
      if (next <= 0) {
        clearInterval(interval)
        onEndRef.current?.()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [endsAtMs, isEnded])

  if (isEnded) {
    return <span className={className}>Voting ended</span>
  }

  return (
    <span className={isUrgent ? urgentClassName : className}>
      {isUrgent && 'Closing soon · '}
      {formatRemaining(remainingMs)}
    </span>
  )
}
