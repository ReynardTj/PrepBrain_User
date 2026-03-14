import type { Post, RankingData, MapPin } from '../types'

// ─── Posts ────────────────────────────────────────────────────────────────────

export const CATEGORIZED_POSTS: Record<string, Post[]> = {
  'Must Try': [
    {
      id: 10, restaurant: "Hardware Société", location: "Melbourne CBD",
      dishName: "Day-Old Sourdough Toast",
      description: "Perfectly crisped sourdough topped with rescued ricotta and local honey.",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=600&auto=format&fit=crop",
      likes: 890, rating: 4.9, wasteSaved: "10kg", tagline: "✨ Must Try of the Month",
      impact: "Saved 120 loaves of bread since Monday",
      comments: [{ user: "Jack", text: "Best toast in the CBD!", avatar: "https://i.pravatar.cc/150?u=4" }],
      originalCategory: "Must Try"
    },
    {
      id: 13, restaurant: "Industry Beans", location: "Fitzroy, VIC",
      dishName: "Spent Coffee Ground Brownies",
      description: "Rich, fudgy brownies made with our daily spent espresso grounds.",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop",
      likes: 1205, rating: 5.0, wasteSaved: "15kg", tagline: "☕ Staff Pick",
      impact: "Repurposing 100% of our daily coffee waste.",
      comments: [{ user: "Sam", text: "The coffee flavor is so deep!", avatar: "https://i.pravatar.cc/150?u=7" }],
      originalCategory: "Must Try"
    }
  ],
  'Rare Finds': [
    {
      id: 11, restaurant: "Code Black Coffee", location: "Brunswick, VIC",
      dishName: "Truffle Potato Skins",
      description: "Premium organic potato skins infused with black truffle oil. Limited to 5 servings.",
      image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=600&auto=format&fit=crop",
      likes: 450, rating: 5.0, wasteSaved: "1.5kg", tagline: "💎 Rare Surplus Treasure",
      impact: "Utilizing 100% of the potato crop",
      comments: [{ user: "Isla", text: "Such a unique flavor profile.", avatar: "https://i.pravatar.cc/150?u=5" }],
      originalCategory: "Rare Finds"
    },
    {
      id: 14, restaurant: "Wide Open Road", location: "Brunswick, VIC",
      dishName: "Ugly Tomato Gazpacho",
      description: "A refreshing chilled soup made from perfectly ripe, but aesthetically imperfect tomatoes.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
      likes: 310, rating: 4.7, wasteSaved: "8kg", tagline: "🍅 Seasonal Rare",
      impact: "Rescued from local farms this morning.",
      comments: [{ user: "Liam", text: "Tastes like summer in a bowl.", avatar: "https://i.pravatar.cc/150?u=8" }],
      originalCategory: "Rare Finds"
    }
  ],
  'Ending Soon': [
    {
      id: 12, restaurant: "Monarch Cakes", location: "St Kilda, VIC",
      dishName: "Pastry Surprise Box",
      description: "Assorted fresh pastries from today. Last 3 boxes left at a huge discount!",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
      likes: 72, rating: 4.6, wasteSaved: "4kg", tagline: "⌛ Expiring in 30 minutes!",
      impact: "Zero waste policy in action",
      comments: [{ user: "Noah", text: "What an absolute steal!", avatar: "https://i.pravatar.cc/150?u=6" }],
      originalCategory: "Ending Soon"
    }
  ],
  'Most Voted': [
    {
      id: 16, restaurant: "Cumulus Inc.", location: "Melbourne CBD, VIC",
      dishName: "Crispy Salmon Skin Chips",
      description: "Voted #1 Most Creative. We turn usually discarded salmon skins into a crispy, salty snack.",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop",
      likes: 2150, rating: 4.9, wasteSaved: "12kg", tagline: "🏆 Most Creative 2026",
      impact: "Maximizing every part of our seafood catch.",
      comments: [{ user: "Lucas", text: "Better than regular chips tbh.", avatar: "https://i.pravatar.cc/150?u=10" }],
      originalCategory: "Most Voted"
    }
  ],
  'General': [
    {
      id: 1, restaurant: "Higher Ground", location: "Melbourne CBD, VIC",
      dishName: "Pumpkin & Lemon Frittata",
      description: "Rescued 5kg of surplus pumpkin from yesterday's soup. This limited-edition Frittata is rich in flavor and zero in waste!",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=600&auto=format&fit=crop",
      likes: 128, rating: 4.8, wasteSaved: "5.2kg", tagline: "🔥 Top 1 this week in CBD",
      impact: "Reduced daily food waste by 15%",
      comments: [
        { user: "Mia", text: "Tastes absolutely amazing!", avatar: "https://i.pravatar.cc/150?u=1" },
        { user: "Oliver", text: "That lemon zest adds such a nice kick.", avatar: "https://i.pravatar.cc/150?u=2" }
      ],
      originalCategory: "General"
    },
    {
      id: 2, restaurant: "Lune Croissanterie", location: "Fitzroy, VIC",
      dishName: "Almond Croissant Pudding",
      description: "Don't discard those day-old pastries! We've transformed them into a decadent bread pudding.",
      image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=600&auto=format&fit=crop",
      likes: 245, rating: 4.9, wasteSaved: "3.5kg", tagline: "🌱 Monthly Favorite",
      impact: "Saved 200 pastries this month",
      comments: [{ user: "Chloe", text: "This pudding is incredible!", avatar: "https://i.pravatar.cc/150?u=3" }],
      originalCategory: "General"
    }
  ]
}

export const ALL_POSTS_FLAT: Post[] = Object.values(CATEGORIZED_POSTS).flat()

// ─── Rankings ─────────────────────────────────────────────────────────────────

export const RANKING_DATA: Record<string, RankingData> = {
  weekly: {
    creative: [
      { rank: 1, name: "Higher Ground", score: 9.8, trend: 'up' },
      { rank: 2, name: "Code Black Coffee", score: 9.6, trend: 'up' },
      { rank: 3, name: "Market Lane", score: 9.2, trend: 'down' }
    ],
    fanFavorite: [
      { rank: 1, name: "Lune Croissanterie", score: 9.9, trend: 'stable' },
      { rank: 2, name: "Hardware Société", score: 9.4, trend: 'up' },
      { rank: 3, name: "Top Paddock", score: 9.1, trend: 'up' }
    ]
  },
  allTime: {
    creative: [
      { rank: 1, name: "Attica", score: 9.9, trend: 'stable' },
      { rank: 2, name: "Cumulus Inc.", score: 9.7, trend: 'up' },
      { rank: 3, name: "Seven Seeds", score: 9.5, trend: 'up' }
    ],
    fanFavorite: [
      { rank: 1, name: "Lune Croissanterie", score: 9.9, trend: 'up' },
      { rank: 2, name: "Chin Chin", score: 9.8, trend: 'stable' },
      { rank: 3, name: "Smith & Daughters", score: 9.6, trend: 'down' }
    ]
  }
}

// ─── Map pins ─────────────────────────────────────────────────────────────────

export const MAP_PINS: MapPin[] = [
  { id: 1, name: "Higher Ground", top: "45%", left: "38%", rating: 4.9, img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200", status: "Trending" },
  { id: 2, name: "Hardware Société", top: "50%", left: "55%", rating: 4.8, img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200", status: "Top Rated" },
  { id: 3, name: "Lune Croissanterie CBD", top: "55%", left: "70%", rating: 4.9, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200", status: "Open Now" },
  { id: 4, name: "Cumulus Inc.", top: "65%", left: "60%", rating: 4.8, img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=200", status: "Closing Soon" },
  { id: 5, name: "Hash Specialty Coffee", top: "48%", left: "50%", rating: 4.7, img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=200", status: "Popular" }
]