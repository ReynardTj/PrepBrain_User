import { useState } from 'react'
import type { Post } from '../types'

export function usePosts() {
  const [userPosts, setUserPosts] = useState<Post[]>([])

  const createPost = (dishName: string, description: string, waste: string, image: string | null) => {
    if (!dishName || !description) return false

    const newPost: Post = {
      id: Date.now(),
      restaurant: "Yarra Valley Kitchen",
      location: "South Yarra, VIC",
      dishName,
      description,
      image: image || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop",
      likes: 0,
      rating: 5.0,
      wasteSaved: waste ? `${waste}kg` : "1kg",
      tagline: "✨ Just Posted",
      impact: "Freshly rescued ingredients from today.",
      comments: [],
      originalCategory: "Fresh"
    }

    setUserPosts(prev => [newPost, ...prev])
    return true
  }

  return { userPosts, createPost }
}