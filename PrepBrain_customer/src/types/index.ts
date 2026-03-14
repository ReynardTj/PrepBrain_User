// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface Comment {
  user: string
  text: string
  avatar: string
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