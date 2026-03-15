import { useState, useEffect, useCallback } from 'react'
import type { AIDish, AIDishVotingRound, AIDishVoteOption } from '../types'

// const DEVICE_ID_KEY = 'ai_dish_voting_device_id'
const VOTES_KEY_PREFIX = 'ai_dish_votes_round_'

// function getOrCreateDeviceId(): string {
//   let id = localStorage.getItem(DEVICE_ID_KEY)
//   if (!id) {
//     id = crypto.randomUUID?.() ?? `device-${Date.now()}-${Math.random().toString(36).slice(2)}`
//     localStorage.setItem(DEVICE_ID_KEY, id)
//   }
//   return id
// }

function getStoredVotesForRound(roundId: string): Record<string, AIDishVoteOption> {
  try {
    const raw = localStorage.getItem(`${VOTES_KEY_PREFIX}${roundId}`)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, AIDishVoteOption>
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch {
    return {}
  }
}

function setStoredVotesForRound(roundId: string, votes: Record<string, AIDishVoteOption>) {
  localStorage.setItem(`${VOTES_KEY_PREFIX}${roundId}`, JSON.stringify(votes))
}

const MOCK_DISHES: AIDish[] = [
  {
    id: 'dish-1',
    roundId: 'round-1',
    name: 'Spicy Garlic Butter Noodles',
    tagline: 'Created from leftover noodles + garlic butter',
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&auto=format&fit=crop',
    interestedCount: 10,
    wantToTryCount: 6,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'dish-2',
    roundId: 'round-1',
    name: 'Crispy Herb-Stuffed Potato Skins',
    tagline: 'Leftover potatoes + fresh herbs + cheese',
    imageUrl: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&auto=format&fit=crop',
    interestedCount: 14,
    wantToTryCount: 16,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'dish-3',
    roundId: 'round-1',
    name: 'Miso-Glazed Day-Old Rice Bowl',
    tagline: 'Surplus rice + miso + seasonal veggies',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop',
    interestedCount: 8,
    wantToTryCount: 12,
    createdAt: new Date().toISOString(),
  },
]

function createMockRound(): AIDishVotingRound {
  const now = Date.now()
  const endsAt = new Date(now + 24 * 60 * 60 * 1000).toISOString()
  const startsAt = new Date(now - 60 * 1000).toISOString()
  return {
    id: 'round-1',
    startsAt,
    endsAt,
    status: 'active',
    dishIds: MOCK_DISHES.map(d => d.id),
  }
}

export function useAIDishVoting() {
  const [round, setRound] = useState<AIDishVotingRound | null>(null)
  const [dishes, setDishes] = useState<AIDish[]>([])
  const [userVotes, setUserVotes] = useState<Record<string, AIDishVoteOption>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadRoundAndDishes = useCallback(() => {
    setLoading(true)
    setError(null)
    try {
      const mockRound = createMockRound()
      setRound(mockRound)
      const stored = getStoredVotesForRound(mockRound.id)
      setUserVotes(stored)
      const baseDishes = MOCK_DISHES.map(d => ({ ...d }))
      const dishesWithStoredVotes = baseDishes.map(d => {
        const v = stored[d.id]
        if (!v) return d
        return {
          ...d,
          interestedCount: d.interestedCount + (v === 'interested' ? 1 : 0),
          wantToTryCount: d.wantToTryCount + (v === 'want_to_try' ? 1 : 0),
        }
      })
      setDishes(dishesWithStoredVotes)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadRoundAndDishes()
  }, [loadRoundAndDishes])

  const vote = useCallback((dishId: string, option: AIDishVoteOption) => {
    if (!round) return
    const endsAtMs = new Date(round.endsAt).getTime()
    if (Date.now() >= endsAtMs) return

    const current = userVotes[dishId]
    const isUnselect = current === option

    if (isUnselect) {
      const { [dishId]: _, ...rest } = userVotes
      setUserVotes(rest)
      setStoredVotesForRound(round.id, rest)
      setDishes(prev => prev.map(d => {
        if (d.id !== dishId) return d
        return {
          ...d,
          interestedCount: Math.max(0, d.interestedCount - (option === 'interested' ? 1 : 0)),
          wantToTryCount: Math.max(0, d.wantToTryCount - (option === 'want_to_try' ? 1 : 0)),
        }
      }))
    } else {
      const newUserVotes = { ...userVotes, [dishId]: option }
      setUserVotes(newUserVotes)
      setStoredVotesForRound(round.id, newUserVotes)
      setDishes(prev => prev.map(d => {
        if (d.id !== dishId) return d
        const addInterested = option === 'interested' ? 1 : 0
        const addWantToTry = option === 'want_to_try' ? 1 : 0
        const subInterested = current === 'interested' ? 1 : 0
        const subWantToTry = current === 'want_to_try' ? 1 : 0
        return {
          ...d,
          interestedCount: d.interestedCount + addInterested - subInterested,
          wantToTryCount: d.wantToTryCount + addWantToTry - subWantToTry,
        }
      }))
    }
  }, [round, userVotes])

  return { round, dishes, userVotes, loading, error, vote, refetch: loadRoundAndDishes }
}
