"use client"

import React, { useEffect, useState } from "react"
import { Heart } from "lucide-react"

import { cn } from "@/lib/utils"

import { BentoGrid, BentoGridItem } from "./ui/bento-grid"

type Item = {
  post_id: string
  song_url: string
  song_name: string
  song_image: string
  song_duration: string
  album: string
  artist: string
  caption: string
  user_id: string
  name: string
  likes: number
  comments: number
  date: Date
  spanColumns: number
  context_color: string
}

export function BentoGridSecondDemo({ data }: any) {
  const [itemsWithSpan, setItemsWithSpan] = useState<Item[]>([])
  useEffect(() => {
    if (data) {
      const shuffledItems = data.map((post: any) => ({
        post_id: post._id,
        song_url: post.song_url,
        song_name: post.song_name,
        song_image: post.song_image,
        song_duration: post.song_duration,
        album: post.album,
        artist: post.artist,
        caption: post.caption,
        context_color: post.context_color,
        name: post.username,
        user_id: post.user_id,
        likes: post.likes_count,
        comments: post.comments_count,
        date: post.date,
        spanColumns: getRandomSpan(),
      }))
      const itemsWithValidRows = adjustSpanColumnsToFitRow(shuffledItems)
      setItemsWithSpan(itemsWithValidRows)
    }
  }, [data])

  const adjustSpanColumnsToFitRow = (items: Item[]) => {
    let rowSpan = 0
    let adjustedItems: Item[] = []

    items.forEach((item) => {
      if (rowSpan + item.spanColumns > 4) {
        rowSpan = 1
        adjustedItems.push({ ...item, spanColumns: 1 })
      } else {
        adjustedItems.push(item)
        rowSpan += item.spanColumns || 1
      }
    })

    return adjustedItems
  }

  return (
    <BentoGrid className="w-full mx-auto md:auto-rows-[20rem">
      {itemsWithSpan.map((item, i) => (
        <BentoGridItem
          key={i}
          postId={item.post_id}
          title={item.song_name}
          description={item.name}
          userId={item.user_id}
          likes={item.likes}
          comments={item.comments}
          date={item.date}
          header={
            <img
              src={item.song_image}
              alt={item.song_name}
              className="w-full h-auto object-cover"
            />
          }
          icon={<Heart className="h-4 w-4 text-neutral-500" />}
          spanColumns={item.spanColumns}
          contextColor={item.context_color}
        />
      ))}
    </BentoGrid>
  )
}

const getRandomSpan = () => {
  return Math.random() < 0.5 ? 1 : 2
}
