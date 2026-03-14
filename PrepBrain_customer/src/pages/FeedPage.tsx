import { useState } from 'react'
import { TrendingUp, ArrowUpRight } from 'lucide-react'
import MiniProfile from '../components/feed/MiniProfile'
import DiscoverSidebar from '../components/feed/DiscoverSidebar'
import PostCard from '../components/feed/PostCard'
import PostComposer from '../components/feed/PostComposer'
import VoteModal from '../components/shared/VoteModal'
import { CATEGORIZED_POSTS, ALL_POSTS_FLAT } from '../data/mockData'
import { usePosts } from '../hooks/usePosts'
import type { Post, FeedCategory } from '../types'

export default function FeedPage() {
  const [feedCategory, setFeedCategory] = useState<FeedCategory>('All Items')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const { userPosts, createPost } = usePosts()

  const allPostsData: Record<string, Post[]> = {
    ...CATEGORIZED_POSTS,
    'All Items': [...userPosts, ...ALL_POSTS_FLAT],
  }

  const handleVote = (post: Post) => setSelectedPost(post)
  const handleCloseVote = () => setSelectedPost(null)
  const handlePost = (dishName: string, desc: string, waste: string, image: string | null) => {
    createPost(dishName, desc, waste, image)
    setFeedCategory('All Items')
  }

  return (
    <>
      {selectedPost && <VoteModal onClose={handleCloseVote} />}

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
          <PostComposer onPost={handlePost} />
          {(allPostsData[feedCategory] || []).map(post => (
            <PostCard key={post.id} post={post} onVote={handleVote} />
          ))}
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