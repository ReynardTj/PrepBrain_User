import { useState, useEffect } from 'react'
import { TrendingUp, ArrowUpRight } from 'lucide-react'
import MiniProfile from '../components/feed/miniProfile'
import DiscoverSidebar from '../components/feed/discoverSidebar'
import PostCard from '../components/feed/postCard'
import DailyAIDishVoting from '../components/feed/dailyAIDishVoting'
import PostComposer from '../components/feed/postComposer'
import VoteModal from '../components/shared/voteModal'
import { CATEGORIZED_POSTS } from '../data/mockData'
import { usePosts } from '../hooks/usePosts'
import { supabase } from '../lib/supabase'
import type { Post, FeedCategory } from '../types'

const HARDCODED_IMAGES = [
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
  'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400',
  'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
  'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400',
  'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
]

const RESTAURANT_NAMES = [
  'Lune Croissanterie',
  'Hardware Société',
  'Higher Ground',
  'Cumulus Inc.',
  'Krimper Cafe',
  'Hash Specialty',
  'Yarra Kitchen',
  'Melbourne Eatery',
]

const LOCATIONS = [
  'Melbourne CBD',
  'Fitzroy',
  'South Yarra',
  'Brunswick',
  'Carlton',
  'Collingwood',
  'Prahran',
  'City Center',
]

export default function FeedPage() {
  const [feedCategory, setFeedCategory] = useState<FeedCategory>('All Items')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [menuItems, setMenuItems] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { userPosts, createPost } = usePosts()

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('id, dish_name, description, thumbs_up, thumbs_down, waste_score, portions_to_clear, cafe_id')
      
      if (error) {
        console.error('Error fetching menu items:', error)
      } else if (data) {
        const transformedPosts = data.map((item: any, index: number) => {
          const thumbsUp = item.thumbs_up || 0
          const thumbsDown = item.thumbs_down || 0
          const rating = Math.min(5, Math.max(0, 3.5 + (thumbsUp - thumbsDown) * 0.2))
          return {
            id: item.id,
            restaurant: RESTAURANT_NAMES[index % RESTAURANT_NAMES.length],
            location: LOCATIONS[index % LOCATIONS.length],
            dishName: item.dish_name,
            description: item.description || 'Delicious off-menu special',
            image: HARDCODED_IMAGES[index % HARDCODED_IMAGES.length],
            likes: Math.floor(Math.random() * 100),
            rating: parseFloat(rating.toFixed(1)),
            wasteSaved: `${Math.floor(Math.random() * 3 + 1)} kg`,
            tagline: 'Limited time offer',
            impact: `Saves approx. ${item.portions_to_clear || 2} meals`,
            comments: [],
            originalCategory: 'Fresh' as const,
            thumbs_up: thumbsUp,
            thumbs_down: thumbsDown,
          }
        }) as Post[]
        
        setMenuItems(transformedPosts)
      }
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const allPostsData: Record<string, Post[]> = {
    ...CATEGORIZED_POSTS,
    'All Items': [...userPosts, ...menuItems],
  }

  const handleVote = (post: Post) => setSelectedPost(post)
  const handleCloseVote = () => setSelectedPost(null)
  const handleVoteSubmit = (_post: Post) => {
    // Register vote (e.g. send to API); for now just closing is handled by user clicking Close
  }
  const handlePost = (dishName: string, desc: string, waste: string, image: string | null) => {
    createPost(dishName, desc, waste, image)
    setFeedCategory('All Items')
  }

  const handleThumbsVoteChange = () => {
    // No refetch: rating is updated in PostCard state so it does not jump to random values
  }

  return (
    <>
      {selectedPost && (
        <VoteModal
          post={selectedPost}
          onClose={handleCloseVote}
          onVote={handleVoteSubmit}
        />
      )}

      <div className="grid grid-cols-12 gap-8 pt-6">
        {/* Left sidebar */}
        <div className="col-span-3">
          <div className="sticky top-24">
            <MiniProfile />
            <DiscoverSidebar activeCategory={feedCategory} onChange={setFeedCategory} />
          </div>
        </div>

        {/* Main feed */}
        <div className="col-span-6 space-y-8">
          <DailyAIDishVoting />
          <PostComposer onPost={handlePost} />
          {loading ? (
            <div className="text-center text-slate-400 py-8">Loading menu items...</div>
          ) : (
            (allPostsData[feedCategory] || []).map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onVote={handleVote}
                onThumbsVoteChange={handleThumbsVoteChange}
              />
            ))
          )}
        </div>

        {/* Right sidebar */}
        <div className="col-span-3 space-y-6">
          <div className="bg-white rounded-[32px] p-8 border border-slate-200 sticky top-24">
            <h3 className="font-black text-slate-900 mb-8 flex items-center gap-3">
              <TrendingUp size={22} className="text-orange-500" /> Trending Topics
            </h3>
            <div className="space-y-6">
              {[
                { tag: "#ZeroWasteMelb", posts: "2.4k posts" },
                { tag: "#FitzroyEats", posts: "1.2k posts" },
                { tag: "#EcoBites", posts: "980 posts" },
              ].map((t, i) => (
                <div key={i} className="cursor-pointer group flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black text-slate-800 group-hover:text-green-600 transition-colors">{t.tag}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">{t.posts}</p>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-300 group-hover:text-slate-900 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}