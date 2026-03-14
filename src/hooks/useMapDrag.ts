import { useState } from 'react'

interface Position { x: number; y: number }

export function useMapDrag() {
  const [mapPos, setMapPos] = useState<Position>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - mapPos.x, y: e.clientY - mapPos.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const MAX_PAN = 150
    const newX = Math.max(-MAX_PAN, Math.min(MAX_PAN, e.clientX - dragStart.x))
    const newY = Math.max(-MAX_PAN, Math.min(MAX_PAN, e.clientY - dragStart.y))
    setMapPos({ x: newX, y: newY })
  }

  const handleMouseUp = () => setIsDragging(false)

  return { mapPos, isDragging, handleMouseDown, handleMouseMove, handleMouseUp }
}