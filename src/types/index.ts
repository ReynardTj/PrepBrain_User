// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface Comment {
  user: string
  text: string
  avatar: string
  createdAt?: string
}

export interface Post {
  id: number
  restaurant: string
  location: string
  dishName: string
  description: string
  image: string
  likes: number
  rating: number
  wasteSaved: string
  tagline: string
  impact: string
  comments: Comment[]
  originalCategory: string
  thumbs_up?: number
  thumbs_down?: number
}

export interface RankItem {
  rank: number
  name: string
  score: number
  trend: 'up' | 'down' | 'stable'
}

export interface RankingData {
  creative: RankItem[]
  fanFavorite: RankItem[]
}

export interface MapPin {
  id: number
  name: string
  top: string
  left: string
  rating: number
  img: string
  status: string
}

export type FeedCategory = 'All Items' | 'Must Try' | 'Rare Finds' | 'Ending Soon' | 'Most Voted'

export type ActiveTab = 'feed' | 'ranking' | 'halloffame' | 'map' | 'dashboard'

// ─── Daily AI Dish Voting ───────────────────────────────────────────────────

export type AIDishVoteOption = 'interested' | 'want_to_try'

export interface AIDish {
  id: string
  roundId: string
  name: string
  tagline?: string
  imageUrl: string
  ingredientsUsed?: string[]
  whyGenerated?: string
  restaurantIds?: string[]
  interestedCount: number
  wantToTryCount: number
  createdAt: string
}

export interface AIDishVotingRound {
  id: string
  startsAt: string
  endsAt: string
  status: 'active' | 'ended'
  dishIds: string[]
}

export interface AIDishVote {
  id: string
  roundId: string
  dishId: string
  userId: string | null
  deviceId: string | null
  vote: AIDishVoteOption
  createdAt: string
}