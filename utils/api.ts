const API_URL = process.env.NEXT_PUBLIC_API_URL_DEPLOY_1

interface ApiError {
  message: string
  status?: number
}

interface AuthResponse {
  message: string
  token_type: string
  access_token: string
}

interface Post {
  id: string
  song_name: string
  artist: string
  song_image: string
  caption: string
  date: string
  context_color: string
  song_url: string
}

interface PostsResponse {
  posts: Post[]
}

interface PostResponse {
  post: Post
}

// Helper function for API calls
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (!res.ok) {
    const error: ApiError = await res.json().catch(() => ({
      message: "An error occurred",
    }))
    throw new Error(error.message || "Failed to fetch data")
  }

  return res.json()
}

// Auth APIs
export const authApi = {
  login: (data: { email: string; password: string }) =>
    fetchApi<AuthResponse>("/signin/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  signup: (data: { email: string; password: string; username: string }) =>
    fetchApi<AuthResponse>("/signup/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
}

// Posts APIs
export const postsApi = {
  getPosts: (search: string = "", token: string) =>
    fetchApi<PostsResponse>(`/posts/${search ? `?search=${search}` : ""}`, {
      headers: {
        Authorization: token,
      },
    }),

  getPost: (id: string, token: string) =>
    fetchApi<PostResponse>(`/posts/${id}`, {
      headers: {
        Authorization: token,
      },
    }),

  createPost: (data: Partial<Post>, token: string) =>
    fetchApi<PostResponse>("/posts/", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(data),
    }),

  updatePost: (id: string, data: Partial<Post>, token: string) =>
    fetchApi<PostResponse>(`/posts/${id}`, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(data),
    }),

  deletePost: (id: string, token: string) =>
    fetchApi<{ message: string }>(`/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }),
}

// User APIs
export const userApi = {
  getProfile: (token: string) =>
    fetchApi<{ user: any }>("/profile/", {
      headers: {
        Authorization: token,
      },
    }),

  updateProfile: (data: any, token: string) =>
    fetchApi<{ user: any }>("/profile/", {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(data),
    }),
} 