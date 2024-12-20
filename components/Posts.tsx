"use client"

import React, { useState } from "react"
import Link from "next/link"
import { getPosts } from "@/utils/api"
import { Search } from "lucide-react"
import { useQuery } from "react-query"
import { useAuth } from "@/contexts/auth-context"

import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BentoGridSecondDemo } from "@/components/BentoGridSecondDemo"
import { LoadingSpinner } from "./ui/spinner"

export function Posts() {
  const { token, isLoggedIn, isLoading } = useAuth()
  const [search, setSearch] = useState<string>("")

  const {
    data: posts,
    error,
    isLoading: queryLoading,
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
      {isLoggedIn ? (
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
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            href={"/signup"}
            rel="noreferrer"
            className={buttonVariants()}
            style={{ minWidth: "100px" }}
          >
            Signup
          </Link>
          <div className="relative w-full">
            Log in or sign up to view posts
          </div>
        </div>
      )}

      <BentoGridSecondDemo data={posts} />
    </>
  )
}
