// Auth related types
export interface AuthResponse {
  user_id: string
  message: string
  token_type: string
  access_token: string
}

// User related types
export interface User {
  id?: string
  username?: string
  email?: string
  bio?: string
  name?: string
  followers_count?: number
  following_count?: number
}

export interface UserStats {
  posts_count: number
  comments_count: number
  likes_count: number
  followers_count: number
  following_count: number
}

export interface UserData {
  user: User
  posts: Post[]
  stats: UserStats
  comments: Comment[]
}

// Post related types
export interface Post {
  id: string
  song_name: string
  artist: string
  song_image: string
  song_url: string
  song_duration?: string
  song_provider?: string
  album?: string
  caption: string
  user_id: string
  date: string
  context_color: string
  name: string
  user_name: string
}

export interface PostResponse {
  post: Post
  comments: Comment[]
}

export interface PostsResponse {
  posts: Post[]
}

// Comment related types
export interface Comment {
  id?: string
  comment: string
  content?: string
  user_id?: string
  post_id?: string
  username?: string
  created_at?: string
  song_image: string
}

export interface CommentInput {
  comment: string
}

// API related types
export interface ApiError {
  message: string
  status?: number
}

// Auth Context types
export interface AuthContextType {
  token: string | null
  isLoggedIn: boolean
  login: (token: string, userId: string) => void
  logout: () => void
  isLoading: boolean
  userId: string | null
} 