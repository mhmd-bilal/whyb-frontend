"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import { postsApi } from "@/utils/api"
import { useAuth } from "@/contexts/auth-context"
import { IconArrowLeftTail, IconBrandSpotifyFilled } from "@tabler/icons-react"
import { useQuery } from "react-query"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { IconHeartFilled } from "@tabler/icons-react"
import { formatDistanceToNow, isAfter, subHours } from "date-fns";
import { ConfettiEmoji } from "@/components/ConfettiEmoji"
import { ArrowLeft, ChevronLeft } from "lucide-react"

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

  const handleLike = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await postsApi.postLike(postId as string, token as string)
      refetch()      
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

  const { post, comments, likes_count, liked } = data

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
  
    const isWithin24Hours = isAfter(date, subHours(now, 24));
  
    if (isWithin24Hours) {
      const distance = formatDistanceToNow(date, { addSuffix: true });
      return distance.replace("about ", "").replace("less than ", "");
    }
  
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
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
        <CardContent >
          {/* <div className="w-full">
        <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="w-fit p-0 hover:bg-transparent"
            >
          <div className="flex items-center justify-center gap-1 text-xs" >
              <ChevronLeft size={13} />Back to Posts
          </div>
            </Button>
            </div> */}
            <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="mb-6 w-full md:mb-0 md:w-1/3">
            <img
              src={post.song_image}
              alt={post.song_name}
              className="w-full rounded-lg object-cover shadow-md"
            />
          </div>
          <div className="flex w-full flex-col space-y-2 md:w-2/3">
          <div className="flex flex-col space-y-4 md:space-y-4 md:flex-row md:justify-between">
            <div >
              <h2 className="text-2xl ">{post.song_name}</h2>
              <p className="text-lg">
                {post.artist}
              </p>
              <p 
              className="text-xs text-gray-400 cursor-pointer mt-1" 
              onClick={() => handleNavigation(post.user_id)}
            >
              Posted by <span className="underline">{post.name}</span> on {formatDate(post.date.toString())}
            </p>
            </div>
            <div className="flex flex-row h-fit gap-3">
              <Button 
                className="w-full md:w-auto flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 min-w-max"
                onClick={() => window.open(post.song_url, '_blank')}
              >
                <IconBrandSpotifyFilled />
                <span>Listen on Spotify</span>
              </Button>

              <Badge
                style={{
                    backgroundColor: liked ? post.context_color : "transparent",
                    border: liked ? "none" : `1px solid ${post.context_color}`,
                    color: liked ? "none" : `1px solid ${post.context_color}`,
                  }}
                  className="relative flex font-light flex-row w-fit gap-0.5 min-w-fit px-2 py-0.5 text-xs z-10 cursor-pointer hover:scale-125 transition duration-500"
                onClick={handleLike}
              >
                <ConfettiEmoji count={likes_count.toString()} onClick={handleLike} />
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-2xl mt-4 md:text-4xl font-medium ">{post.caption}</p>
          </div>
          </div>
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
