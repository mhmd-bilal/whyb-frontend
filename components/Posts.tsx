"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { getPosts } from "@/utils/api"
import { Storage } from "@ionic/storage"
import { Search } from "lucide-react"
import { useQuery } from "react-query"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BentoGridSecondDemo } from "@/components/BentoGridSecondDemo"

import { LoadingSpinner } from "./ui/spinner"

const storage = new Storage()
storage.create()

export function Posts({}: any) {
  const [token, setToken] = useState<string | null>(null)
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await storage.get("authToken")
      setToken(storedToken)
    }
    fetchToken()
  }, [])

  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = useQuery(
    ["posts", search],
    () => getPosts("/posts/", { search }, token),
    {
      enabled: !!token,
      refetchOnWindowFocus: false,
    }
  )
  if (isLoading) return <LoadingSpinner />
  if (error) return <div>Error loading data</div>

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <Link
          href={"/addpost"}
          rel="noreferrer"
          className={buttonVariants()}
          style={{ minWidth: "100px" }}
        >
          Add Post
        </Link>

        <div className="relative w-full">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for posts, tags, users, or anything..."
            style={{
              width: "100%",
              paddingLeft: "40px",
            }}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
        </div>
      </div>

      <BentoGridSecondDemo data={posts} />
    </>
  )
}
