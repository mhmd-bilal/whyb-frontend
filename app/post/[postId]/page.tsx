"use client"

import React from "react"
import { useParams, useRouter } from "next/navigation"
import { postsApi } from "@/utils/api"
import { useAuth } from "@/contexts/auth-context"
import { IconArrowLeftTail, IconBrandSpotifyFilled, IconBrandYoutubeFilled } from "@tabler/icons-react"
import { useQuery } from "react-query"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { IconHeartFilled } from "@tabler/icons-react"
import { ConfettiEmoji } from "@/components/ConfettiEmoji"
import { ArrowLeft, ChevronLeft } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { BackHome } from "@/functions/useFunction"

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
      onError: (error: unknown) => {
        if (error instanceof Error) {
          toast({
            variant: "destructive",
            description: error.message,
          })
          console.error(error.message)
        }
        if (!isLoggedIn) {
          router.push("/login")
        }
      },
    }
  )

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    const comment = {
      comment: newComment
    }

    try {
      const response = await postsApi.postComment(comment, postId as string, token as string)
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

  const handleNavigation = (user_id: string) => {
    router.push(`/profile/${user_id}`);
  };


  const [newComment, setNewComment] = useState("")

  if (authLoading || isLoading) return (
    <div className="h-screen w-full flex items-center justify-center">
      <LoadingSpinner />
    </div>
  )
  if (error) return <div className="h-screen w-full flex flex-col items-center justify-center">
    Error loading post
    <BackHome />
  </div>
  if (!data?.post) return <div className="h-screen w-full flex flex-col items-center justify-center">
    Post not found
    <BackHome />
  </div>

  const { post, comments, likes_count, liked } = data

  return (
    <div className="mx-auto w-full max-w-none flex-1">
      <div
        className="mx-auto w-full px-4 justify-center flex  flex-col flex-1 gap-6"
        style={{
          background: `radial-gradient(circle at top center, ${post.context_color} -200%, transparent 50%)`,
          backgroundSize: 'cover',
        }}
      >
        <div className="mx-auto max-w-4xl w-full">
          <Card className="border-none bg-transparent shadow-none rounded-lg w-full">
            <CardHeader className="hidden md:flex justify-between items-start" />
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="mb-6 h-full md:mb-0 md:w-1/3 flex">
                  <img
                    src={post.song_image}
                    alt={post.song_name}
                    className="h-full rounded-lg object-cover"
                  />
                </div>
                <div className="flex w-full flex-col space-y-2 md:w-2/3">
                  <div className="flex flex-col space-y-4 md:space-y-4 md:flex-row md:justify-between">
                    <div>
                      <h2 className="text-2xl">{post.song_name}</h2>
                      <p className="text-lg">{post.artist}</p>
                      <p
                        className="text-xs text-gray-400 cursor-pointer mt-1"
                        onClick={() => handleNavigation(post.user_id)}
                      >
                        Posted by <span className="underline">@{post.username}</span> on {formatDate(post.date.toString())}
                      </p>
                    </div>
                    <div className="flex flex-row h-fit gap-3">
                      <Button
                        className={`w-full md:w-auto flex items-center justify-center space-x-2 ${post.song_url.includes('spotify') ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} min-w-max`}
                        onClick={() => {
                          if (post.song_url.includes('spotify')) {
                            window.open(post.song_url, '_blank');
                          } else if (post.song_url.includes('youtube')) {
                            window.open(post.song_url, '_blank');
                          }
                        }}
                      >
                        {post.song_url.includes('spotify') ? (
                          <>
                            <IconBrandSpotifyFilled />
                            <span>Listen on Spotify</span>
                          </>
                        ) : (
                          <>
                            <IconBrandYoutubeFilled />
                            <span>Listen on YouTube</span>
                          </>
                        )}
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
                </div>
              </div>
              <div>
                <div>
                  <p className="text-lg mt-4 md:text-xl font-light">{post.caption}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {comments && (
          <div className="mx-auto max-w-4xl w-full">
            <Card className="mt-2 max-w-4xl p-4 rounded-lg border-0 bg-transparent">
              <h3 className="text-lg font-bold mb-4">Comments</h3>
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <Card key={index} className="flex flex-col md:flex-row items-start gap-2 md:gap-6 p-4 border rounded-lg bg-transparent">
                    <p className="font-medium underline cursor-pointer" onClick={() => handleNavigation(post.user_id)}>@{comment.username}</p>
                    <p className="text-sm text-gray-300 flex-1">{comment.comment}</p>
                    <p className="text-sm text-muted-foreground ml-auto w-fit">{formatDate(comment.date)}</p>
                  </Card>
                ))}
              </div>

              <div className="mt-4 flex flex-col space-y-4">
                <Textarea
                  rows={6}
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
        )}

      </div>
    </div>
  )
}
