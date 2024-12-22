"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import { postsApi } from "@/utils/api"
import { useAuth } from "@/contexts/auth-context"
import { IconBrandSpotifyFilled } from "@tabler/icons-react"
import { useQuery } from "react-query"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function PostDetail() {
  const router = useRouter()
  const { postId } = useParams()
  const { token, isLoggedIn, isLoading: authLoading } = useAuth()
  const { toast } = useToast()

  const { data, error, isLoading, refetch } = useQuery(
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

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    const comment = {
      comment : newComment
    }

    try {
      const response = await postsApi.postComment( comment ,postId as string, token as string)
      setNewComment("")
      refetch()
      toast({
        description: "Comment posted successfully!",
      })
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          description: error.message,
        })
        console.error(error.message)
      }
    }
  }
  
  const handleNavigation = (user_id : string) => {
    router.push(`/profile/${user_id}`);
  };


  const [newComment, setNewComment] = useState("")

  if (authLoading || isLoading) return (
    <div className="h-screen w-full flex items-center justify-center">
      <LoadingSpinner />
    </div>
  )
  if (error) return <div>Error loading post details</div>
  if (!data?.post) return <div>Post not found</div>

  const { post, comments } = data

  return (
    <div
      className="mx-auto max-w-4xl "
    >
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
                className="w-full md:w-auto flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 min-w-max"
                onClick={() => window.open(post.song_url, '_blank')}
              >
                <IconBrandSpotifyFilled />
                <span>Listen on Spotify</span>
              </Button>
            </div>

            <p className="text-xs text-gray-400">
              {new Date(post.date).toLocaleDateString()}
            </p>
            <p 
              className="text-xs text-gray-400 cursor-pointer" 
              onClick={() => handleNavigation(post.user_id)}
              style={{marginTop:"2px"}}
            >
              Post by <span className="underline">{post.name}</span>
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
    
    <Card className="mt-2 p-4 rounded-lg border-0">
  <h3 className="text-lg font-bold mb-4">Comments</h3>
   <div className="space-y-4">
    {comments.map((comment,index) => (
      <Card key={index} className="p-4 border rounded-lg ">
        <p className="font-medium">{comment.username}</p>
        <p className="text-sm text-gray-600">{comment.comment}</p>
      </Card>
    ))}
  </div>

  <div className="mt-4 flex flex-col space-y-4">
    <Textarea
      placeholder="Add a comment..."
      className="xs:text-xs rounded-lg border-b-0 border-solid p-4 border focus:outline-none focus:none"
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
    />
    <Button onClick={handleAddComment} className="self-end">
      Submit
    </Button>
  </div>
</Card>

    </div>
  )
}
