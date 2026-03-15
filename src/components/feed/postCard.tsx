import { Heart, MessageCircle, Share2, MapPin, Leaf, Sparkles, Gem, Clock, Trophy, Zap, Star, ShoppingBag, MoreHorizontal, ThumbsUp, ThumbsDown, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { Post, Comment } from '../../types'
import { supabase } from '../../lib/supabase'

interface Props {
  post: Post
  onVote: (post: Post) => void
  onThumbsVoteChange?: (postId: string | number, thumbsUp: number, thumbsDown: number) => void
}

const RATING_STEP = 0.5
const RATING_MIN = 0
const RATING_MAX = 5
const CURRENT_USER = { name: 'You', avatar: 'https://i.pravatar.cc/150?u=current' }

function clampRating(value: number): number {
  return Math.min(RATING_MAX, Math.max(RATING_MIN, value))
}

function formatCommentTime(createdAt?: string): string {
  if (!createdAt) return ''
  const d = new Date(createdAt)
  const diffMs = Date.now() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  return `${Math.floor(diffHours / 24)}d ago`
}

export default function PostCard({ post, onVote, onThumbsVoteChange }: Props) {
  const [thumbsUp, setThumbsUp] = useState(post.thumbs_up || 0)
  const [thumbsDown, setThumbsDown] = useState(post.thumbs_down || 0)
  const [rating, setRating] = useState(() => clampRating(post.rating))
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes)
  const [userThumbsUp, setUserThumbsUp] = useState(false)
  const [userThumbsDown, setUserThumbsDown] = useState(false)
  const [comments, setComments] = useState<Comment[]>(post.comments || [])
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [shareOpen, setShareOpen] = useState(false)
  const [copyToast, setCopyToast] = useState(false)

  // Sync state with post when post identity or initial data changes (e.g. category switch)
  useEffect(() => {
    setThumbsUp(post.thumbs_up || 0)
    setThumbsDown(post.thumbs_down || 0)
    setRating(clampRating(post.rating))
    setLikesCount(post.likes)
    setComments(post.comments || [])
  }, [post.id, post.thumbs_up, post.thumbs_down, post.rating, post.likes, post.comments])

  const handleThumbsUp = async () => {
    const isTogglingOff = userThumbsUp
    const newThumbsUp = isTogglingOff ? thumbsUp - 1 : thumbsUp + 1
    const oldThumbsUp = thumbsUp
    setUserThumbsUp(!isTogglingOff)
    setThumbsUp(Math.max(0, newThumbsUp))
    setRating(prev => clampRating(prev + (isTogglingOff ? -RATING_STEP : RATING_STEP)))
    if (post.id) {
      const { error } = await supabase.from('menu_items').update({ thumbs_up: Math.max(0, newThumbsUp) }).eq('id', post.id)
      if (error) {
        setUserThumbsUp(isTogglingOff)
        setThumbsUp(oldThumbsUp)
        setRating(prev => clampRating(prev + (isTogglingOff ? RATING_STEP : -RATING_STEP)))
      } else if (onThumbsVoteChange) onThumbsVoteChange(post.id, Math.max(0, newThumbsUp), thumbsDown)
    }
  }

  const handleThumbsDown = async () => {
    const isTogglingOff = userThumbsDown
    const newThumbsDown = isTogglingOff ? thumbsDown - 1 : thumbsDown + 1
    const oldThumbsDown = thumbsDown
    setUserThumbsDown(!isTogglingOff)
    setThumbsDown(Math.max(0, newThumbsDown))
    setRating(prev => clampRating(prev + (isTogglingOff ? RATING_STEP : -RATING_STEP)))
    if (post.id) {
      const { error, data } = await supabase
        .from('menu_items')
        .update({ thumbs_down: newThumbsDown })
        .eq('id', post.id)
        .select()
      if (error) {
        setUserThumbsDown(isTogglingOff)
        setThumbsDown(oldThumbsDown)
        setRating(prev => clampRating(prev + (isTogglingOff ? -RATING_STEP : RATING_STEP)))
      } else if (onThumbsVoteChange) onThumbsVoteChange(post.id, thumbsUp, Math.max(0, newThumbsDown))
    }
  }

  const handleHeart = () => setLiked(prev => !prev)

  const handleCommentSubmit = () => {
    const text = commentText.trim()
    if (!text) return
    const newComment: Comment = {
      user: CURRENT_USER.name,
      text,
      avatar: CURRENT_USER.avatar,
      createdAt: new Date().toISOString(),
    }
    setComments(prev => [...prev, newComment])
    setCommentText('')
    setShowCommentInput(false)
  }

  const handleCopyLink = () => {
    const url = window.location.href + (post.id ? `#post-${post.id}` : '')
    navigator.clipboard.writeText(url).then(() => {
      setCopyToast(true)
      setTimeout(() => setCopyToast(false), 2000)
    })
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

        {(comments.length > 0 || showCommentInput) && (
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-[1000] text-slate-400 uppercase tracking-widest">Community Buzz</p>
              {comments.length > 0 && <span className="text-[10px] font-black text-blue-500">{comments.length} comments</span>}
            </div>
            <div className="space-y-3">
              {comments.map((c, i) => (
                <div key={i} className="flex gap-4">
                  <img src={c.avatar} className="w-10 h-10 rounded-[12px] object-cover border border-slate-200 flex-shrink-0" alt="" draggable={false} />
                  <div className="bg-slate-50/50 p-4 rounded-[20px] flex-1 border border-slate-200 min-w-0">
                    <p className="text-xs font-black text-slate-900 mb-1">{c.user}</p>
                    <p className="text-xs text-slate-600 leading-snug">{c.text}</p>
                    {c.createdAt && <p className="text-[10px] text-slate-400 mt-1">{formatCommentTime(c.createdAt)}</p>}
                  </div>
                </div>
              ))}
              {showCommentInput && (
                <div className="flex gap-3 items-end">
                  <img src={CURRENT_USER.avatar} className="w-10 h-10 rounded-[12px] object-cover border border-slate-200 flex-shrink-0" alt="" draggable={false} />
                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleCommentSubmit() } }}
                      placeholder="Write a comment..."
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button type="button" onClick={handleCommentSubmit} className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 transition-colors">Post Comment</button>
                      <button type="button" onClick={() => { setShowCommentInput(false); setCommentText('') }} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="flex gap-6">
            <button
              type="button"
              onClick={handleHeart}
              className={`flex items-center gap-2 font-black transition-colors ${liked ? 'text-pink-500' : 'text-slate-400'}`}
            >
              <Heart size={24} className={liked ? 'fill-pink-500' : ''} /> <span>{likesCount + (liked ? 1 : 0)}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowCommentInput(true)}
              className="flex items-center gap-2 text-slate-400 font-black transition-colors"
            >
              <MessageCircle size={24} /> <span>{comments.length}</span>
            </button>
            <button
              type="button"
              onClick={() => setShareOpen(true)}
              className="flex items-center gap-2 text-slate-400 font-black transition-colors"
            >
              <Share2 size={24} />
            </button>
            <button
              type="button"
              onClick={handleThumbsUp}
              className={`flex items-center gap-2 font-black transition-colors ${userThumbsUp ? 'text-green-500' : 'text-slate-400'}`}
            >
              <ThumbsUp size={24} className={userThumbsUp ? 'fill-green-500' : ''} /> <span>{thumbsUp}</span>
            </button>
            <button
              type="button"
              onClick={handleThumbsDown}
              className={`flex items-center gap-2 font-black transition-colors ${userThumbsDown ? 'text-red-500' : 'text-slate-400'}`}
            >
              <ThumbsDown size={24} className={userThumbsDown ? 'fill-red-500' : ''} /> <span>{thumbsDown}</span>
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

      {shareOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShareOpen(false)}>
          <div className="bg-white rounded-[32px] w-full max-w-sm overflow-hidden shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-black text-slate-900">Share</h3>
              <button type="button" onClick={() => setShareOpen(false)} className="p-2 hover:bg-slate-50 rounded-full"><X size={20} /></button>
            </div>
            <div className="p-4 space-y-2">
              <button type="button" onClick={handleCopyLink} className="w-full flex items-center gap-3 p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-left font-bold text-sm text-slate-800 transition-colors">
                <span className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 text-xs">Link</span>
                Copy Link
              </button>
              {['Facebook', 'Twitter/X', 'WhatsApp', 'Messenger', 'Email'].map(platform => (
                <button key={platform} type="button" className="w-full flex items-center gap-3 p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-left font-bold text-sm text-slate-800 transition-colors">
                  <span className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 text-xs">{platform.slice(0, 1)}</span>
                  Share to {platform}
                </button>
              ))}
            </div>
            {copyToast && (
              <div className="p-4 bg-green-50 border-t border-green-100 text-center text-sm font-bold text-green-800">Link copied to clipboard.</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}