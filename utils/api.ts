import {
  ApiError,
  AuthResponse,
  Post,
  PostResponse,
  PostsResponse,
  Comment,
  CommentInput,
  UserData,
  User
} from "@/types"

const API_URL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_URL_DEPLOY_1 : process.env.NEXT_PUBLIC_API_URL_DEV

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

  postComment: (data: Partial<Comment>,postId:string , token: string) =>
    fetchApi<PostResponse>(`/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(data),
    }),

  postLike: (postId:string , token: string) =>
    fetchApi<PostResponse>(`/posts/${postId}/like`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
    }),
}

export const userApi = {
  getUser: (userId: string, token: string) =>
    fetchApi<UserData>(`/user/${userId}`, {
      headers: {
        Authorization: token,
      },
    }),  

  updateUser: (userId: string, data: { name?: string; email?: string; bio?: string }, token: string) =>
    fetchApi<{ user: { name: string; email: string; bio: string } }>(`/user/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
};
