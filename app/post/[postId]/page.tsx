"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { getPost } from "@/utils/api"
import { Storage } from "@ionic/storage"
import { IconBrandSpotifyFilled } from "@tabler/icons-react"
import { useQuery } from "react-query"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/spinner"

export default function PostDetail() {
  const router = useRouter()
  const { postId } = useParams()

  const storage = new Storage()
  storage.create()

  const { data, error, isLoading } = useQuery(
    ["post", postId],
    async () => getPost(postId, await storage.get("authToken")),
    {
      enabled: !!postId,
      refetchOnWindowFocus: false,
    }
  )

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>Error loading post details</div>

  const post = data?.post
  return (
    <div
      className="max-w-4xl mx-auto px-4 py-8"
      style={{
        background: `radial-gradient(circle at top center, ${post.context_color} -200%, transparent 70%)`,
      }}
    >
      {post && (
        <Card className="shadow-none rounded-lg border-none bg-transparent">
          <CardHeader className="hidden md:flex justify-between items-start "></CardHeader>

          <CardContent className="flex flex-col md:flex-row space-x-8">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <img
                src={post.song_image}
                alt={post.song_name}
                className="w-full rounded-lg object-cover"
              />
            </div>

            <div className="w-full md:w-2/3 flex flex-col justify-between text-left">
              <div className="flex flex-col md:flex-row md:justify-between justify-start items-start mb-4">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-xl font-bold">{post.song_name}</h2>
                  <p className="text-lg font-light">
                    {post.artist || "Unknown Artist"}
                  </p>
                </div>
                <Button className="bg-green-500 flex items-center space-x-2 ml-auto">
                  <IconBrandSpotifyFilled />
                  <span>Listen on Spotify</span>
                </Button>
              </div>

              <p className="text-xs text-gray-400 -mt-6">
                {new Date(post.date).toLocaleDateString()}
              </p>
              <p className="text-4xl mb-4">{post.caption}</p>

              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="w-full mt-4"
              >
                Back to Posts
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
