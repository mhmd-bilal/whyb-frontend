"use client"

import React from "react"
import { useQuery } from "react-query"
import { useAuth } from "@/contexts/auth-context"
import { userApi } from "@/utils/api"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/spinner"
import { BentoGridSecondDemo } from "@/components/BentoGridSecondDemo"
import { UserData } from "@/types"
import { useParams, useRouter } from "next/navigation"
import { formatDate } from "@/lib/utils"
import { BackHome } from "@/functions/useFunction"

const Profile: React.FC = () => {
  const { token } = useAuth()
  const { userId } = useParams()
  const router = useRouter()

  const { data, error, isLoading } = useQuery<UserData>(
    ["user", userId],
    () => userApi.getUser(userId as string, token!),
    {
      enabled: !!token && !!userId,
      retry: false,
    }
  )

  if (isLoading) return <div className="h-screen w-full flex items-center justify-center">
    <LoadingSpinner />
  </div>
  if (error) return <div className="h-screen w-full flex flex-col  items-center justify-center">
    Error loading profile
    <BackHome />
  </div>
  if (!data?.user) return <div className="h-screen w-full flex flex-col items-center justify-center">
    User not found
    <BackHome />
  </div>

  const handlePost = (id: string) => {
    router.push(`/post/${id}`)
  }


  const { user, posts, stats, comments } = data

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Card className="border shadow-md rounded-lg">
        <CardHeader>
          <h2 className="text-4xl font-bold pb-0">@{user.username}&apos;s profile</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Username</h3>
                <p className="text-lg">{`@${user.username || "Not provided"}`}</p>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Name</h3>
                <p className="text-lg">{user.name || "Not provided"}</p>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Email</h3>
                <p className="text-lg">{user.email || "Not provided"}</p>
              </div>

            </div>

            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-4xl font-bold">{stats.posts_count}</p>
                  <h4 className="text-muted-foreground">Posts</h4>
                </div>
                <div>
                  <p className="text-4xl font-bold">{stats.comments_count}</p>
                  <h4 className="text-muted-foreground">Comments</h4>
                </div>
                <div>
                  <p className="text-4xl font-bold">{stats.likes_count}</p>
                  <h4 className="text-muted-foreground">Likes</h4>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Bio</h3>
                <p className="text-lg">{user.bio || "No bio provided"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-md rounded-lg mt-6">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">@{user.username}&apos;s posts</h2>
          <BentoGridSecondDemo data={posts} />
        </CardContent>
      </Card>
      <div className="space-y-4">
        <Card className="border shadow-md rounded-lg mt-6">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">@{user.username}&apos;s comments</h2>
            <div className="flex flex-col gap-4">
              {comments.map((comment, index) => (
                <Card key={index} className="flex flex-row items-center gap-6 p-4 border rounded-lg cursor-pointer" onClick={() => handlePost(comment.post_id || '')}>
                  <img src={comment.song_image} alt="Song" className="w-16 h-16 rounded object-cover" />
                  <div className="flex flex-1 flex-col">
                    <p className="text-lg">{comment.comment}</p>
                  </div>
                  <p className="text-sm text-muted-foreground ml-auto">{formatDate(comment.date)}</p>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

    </div>
  )
}

export default Profile
