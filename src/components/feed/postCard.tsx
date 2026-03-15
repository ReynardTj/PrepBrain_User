import { Heart, MessageCircle, Share2, MapPin, Leaf, Sparkles, Gem, Clock, Trophy, Zap, Star, ShoppingBag, MoreHorizontal, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { Post } from '../../types'
import { supabase } from '../../lib/supabase'

interface Props {
  post: Post
  onVote: (post: Post) => void
  onThumbsVoteChange?: (postId: string | number, thumbsUp: number, thumbsDown: number) => void
}

const RATING_STEP = 0.5
const RATING_MIN = 0
const RATING_MAX = 5

function clampRating(value: number): number {
  return Math.min(RATING_MAX, Math.max(RATING_MIN, value))
}

export default function PostCard({ post, onVote, onThumbsVoteChange }: Props) {
  const [thumbsUp, setThumbsUp] = useState(post.thumbs_up || 0)
  const [thumbsDown, setThumbsDown] = useState(post.thumbs_down || 0)
  const [rating, setRating] = useState(() => clampRating(post.rating))

  // Sync state with post when post identity or initial data changes (e.g. category switch)
  useEffect(() => {
    setThumbsUp(post.thumbs_up || 0)
    setThumbsDown(post.thumbs_down || 0)
    setRating(clampRating(post.rating))
  }, [post.id, post.thumbs_up, post.thumbs_down, post.rating])

  const handleThumbsUp = async () => {
    const oldThumbsUp = thumbsUp
    const newThumbsUp = thumbsUp + 1
    setThumbsUp(newThumbsUp)
    setRating(prev => clampRating(prev + RATING_STEP))
    if (post.id) {
      const { error } = await supabase
        .from('menu_items')
        .update({ thumbs_up: newThumbsUp })
        .eq('id', post.id)
        .select()
      if (error) {
        console.error('Error updating thumbs up:', error)
        setThumbsUp(oldThumbsUp)
        setRating(prev => clampRating(prev - RATING_STEP))
        alert('Failed to update thumbs up. Please try again.')
      } else {
        if (onThumbsVoteChange) onThumbsVoteChange(post.id, newThumbsUp, thumbsDown)
      }
    }
  }

  const handleThumbsDown = async () => {
    const oldThumbsDown = thumbsDown
    const newThumbsDown = thumbsDown + 1
    setThumbsDown(newThumbsDown)
    setRating(prev => clampRating(prev - RATING_STEP))
    if (post.id) {
      const { error } = await supabase
        .from('menu_items')
        .update({ thumbs_down: newThumbsDown })
        .eq('id', post.id)
        .select()
      if (error) {
        console.error('Error updating thumbs down:', error)
        setThumbsDown(oldThumbsDown)
        setRating(prev => clampRating(prev + RATING_STEP))
        alert('Failed to update thumbs down. Please try again.')
      } else {
        if (onThumbsVoteChange) onThumbsVoteChange(post.id, thumbsUp, newThumbsDown)
      }
    }
  }
  return (
    <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden group">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-slate-900 rounded-[14px] flex items-center justify-center text-white font-black">
            {post.restaurant[0]}
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">{post.restaurant}</h4>
            <p className="text-[10px] text-slate-400 font-bold tracking-wider flex items-center gap-1">
              <MapPin size={10} /> {post.location}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase flex items-center gap-1 border border-green-100">
            <Leaf size={12} /> {post.wasteSaved} Saved
          </div>
          <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <MoreHorizontal size={20} className="text-slate-400" />
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 relative">
        <img
          src={post.image}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          alt={post.dishName}
          draggable={false}
        />
        {post.originalCategory && post.originalCategory !== 'General' && post.originalCategory !== 'Fresh' && (
          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase flex items-center gap-1">
            {post.originalCategory === 'Must Try' && <Sparkles size={12} />}
            {post.originalCategory === 'Rare Finds' && <Gem size={12} />}
            {post.originalCategory === 'Ending Soon' && <Clock size={12} />}
            {post.originalCategory === 'Most Voted' && <Trophy size={12} />}
            {post.originalCategory === 'Fresh' && <Zap size={12} className="text-yellow-400" />}
            {post.originalCategory}
          </div>
        )}
        <div className="absolute top-4 right-4">
          <button className="bg-white/95 backdrop-blur-md text-slate-900 px-5 py-3 rounded-2xl border border-slate-100 hover:bg-white hover:scale-105 transition-all flex items-center gap-2 text-xs font-black">
            <ShoppingBag size={14} className="text-green-600" /> ORDER NOW
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-slate-900/60 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-xs font-black ring-1 ring-white/20">
            {post.tagline}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h5 className="font-[1000] text-3xl text-slate-900 tracking-tight">{post.dishName}</h5>
          <div className="flex items-center gap-1.5 text-yellow-500 font-black text-lg bg-yellow-50 px-3 py-1 rounded-xl">
            <Star size={20} fill="currentColor" /> {rating.toFixed(1)}
          </div>
        </div>
        <p className="text-slate-600 font-medium leading-relaxed mb-6">{post.description}</p>

        <div className="p-4 bg-green-50/50 rounded-[20px] border border-green-100 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-green-600 uppercase tracking-widest leading-none mb-1">Impact Made</p>
            <p className="text-sm font-bold text-green-800">{post.impact}</p>
          </div>
        </div>

        {post.comments && post.comments.length > 0 && (
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-[1000] text-slate-400 uppercase tracking-widest">Community Buzz</p>
              <span className="text-[10px] font-black text-blue-500 cursor-pointer">View all {post.comments.length} comments</span>
            </div>
            <div className="space-y-3">
              {post.comments.map((c, i) => (
                <div key={i} className="flex gap-4">
                  <img src={c.avatar} className="w-10 h-10 rounded-[12px] object-cover border border-slate-200" alt="avatar" draggable={false} />
                  <div className="bg-slate-50/50 p-4 rounded-[20px] flex-1 border border-slate-200">
                    <p className="text-xs font-black text-slate-900 mb-1">{c.user}</p>
                    <p className="text-xs text-slate-600 leading-snug">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="flex gap-6">
            <button className="flex items-center gap-2 text-slate-400 font-black hover:text-pink-500 transition-colors group">
              <Heart size={24} className="group-hover:fill-pink-500 transition-all" /> <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-slate-400 font-black hover:text-blue-500 transition-colors">
              <MessageCircle size={24} /> <span>{post.comments?.length || 0}</span>
            </button>
            <button className="flex items-center gap-2 text-slate-400 font-black hover:text-slate-900 transition-colors">
              <Share2 size={24} />
            </button>
            <button
              onClick={handleThumbsUp}
              className="flex items-center gap-2 text-slate-400 font-black hover:text-green-500 transition-colors group"
            >
              <ThumbsUp size={24} className="group-hover:fill-green-500 transition-all" /> <span>{thumbsUp}</span>
            </button>
            <button
              onClick={handleThumbsDown}
              className="flex items-center gap-2 text-slate-400 font-black hover:text-red-500 transition-colors group"
            >
              <ThumbsDown size={24} className="group-hover:fill-red-500 transition-all" /> <span>{thumbsDown}</span>
            </button>
          </div>
          <button
            onClick={() => onVote(post)}
            className="bg-slate-900 text-white px-10 py-4 rounded-[22px] font-black text-xs hover:bg-green-600 transition-all active:scale-95"
          >
            Vote for Legend
          </button>
        </div>
      </div>
    </div>
  )
}