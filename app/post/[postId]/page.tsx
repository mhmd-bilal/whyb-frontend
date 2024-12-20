"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import { postsApi } from "@/utils/api"
import { useAuth } from "@/contexts/auth-context"
import { IconBrandSpotifyFilled } from "@tabler/icons-react"
import { useQuery } from "react-query"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/spinner"

export default function PostDetail() {
  const router = useRouter()
  const { postId } = useParams()
  const { token, isLoggedIn, isLoading: authLoading } = useAuth()

  const { data, error, isLoading } = useQuery(
    ["post", postId],
    () => postsApi.getPost(postId as string, token as string),
    {
      enabled: !!token && !!postId,
      retry: false,
      onError: (error) => {
        console.error("Failed to fetch post:", error)
        if (!isLoggedIn) {
          router.push("/login")
        }
      },
    }
  )

  if (authLoading || isLoading) return (
    <div className="h-screen w-full flex items-center justify-center">
      <LoadingSpinner />
    </div>
  )
  if (error) return <div>Error loading post details</div>
  if (!data?.post) return <div>Post not found</div>

  const { post } = data

  return (
    <div
      className="mx-auto max-w-4xl px-4 py-8"
      style={{
        background: `radial-gradient(circle at top center, ${post.context_color} -200%, transparent 70%)`,
      }}
    >
      <Card className="border-none bg-transparent shadow-none rounded-lg">
        <CardHeader className="hidden md:flex justify-between items-start" />
        <CardContent className="flex flex-col md:flex-row md:space-x-8">
          <div className="mb-6 w-full md:mb-0 md:w-1/3">
            <img
              src={post.song_image}
              alt={post.song_name}
              className="w-full rounded-lg object-cover shadow-md"
            />
          </div>

          <div className="flex w-full flex-col space-y-4 md:w-2/3">
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">{post.song_name}</h2>
                <p className="text-lg">
                  {post.artist || "Unknown Artist"}
                </p>
              </div>
              <Button 
                className="w-full md:w-auto flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600"
                onClick={() => window.open(post.song_url, '_blank')}
              >
                <IconBrandSpotifyFilled />
                <span>Listen on Spotify</span>
              </Button>
            </div>

            <p className="text-xs text-gray-400">
              {new Date(post.date).toLocaleDateString()}
            </p>
            <p className="text-2xl md:text-4xl font-medium">{post.caption}</p>

            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="w-full mt-auto"
            >
              Back to Posts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
