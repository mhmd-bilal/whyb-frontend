"use client";

import React, { useState } from "react";
import Link from "next/link";
import { postsApi } from "@/utils/api";
import { Search } from "lucide-react";
import { useQuery } from "react-query";
import { useAuth } from "@/contexts/auth-context";
import { useDebounce } from "@/hooks/useDebounce";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BentoGridSecondDemo } from "@/components/BentoGridSecondDemo";
import { LoadingSpinner } from "./ui/spinner";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortOptions = [
  { value: "date", label: "Date" },
  { value: "likes", label: "Likes" },
  { value: "name", label: "Name" },
];

export function Posts() {
  const { token, isLoggedIn, isLoading: authLoading } = useAuth();
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("date"); 
  const debouncedSearch = useDebounce(search, 500);
  const pathname = usePathname();

  const {
    data: posts,
    error,
    isLoading: postsLoading,
  } = useQuery(
    ["posts", debouncedSearch],
    () => postsApi.getPosts(debouncedSearch, token as string),
    {
      enabled: !!token,
      refetchOnWindowFocus: false,
    }
  );

  if (error) return <div>Error loading data</div>;

  const sortedPosts =
    posts?.posts?.slice().sort((a: any, b: any) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "likes") {
        return b.likes_count - a.likes_count;
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    }) || [];

  return (
    <>
      {isLoggedIn ? (
        <div className="flex flex-col md:flex-row gap-4">
          {pathname === "/search" ? null : (
            <Link
              href={"/addpost"}
              rel="noreferrer"
              className={buttonVariants()}
              style={{ minWidth: "100px" }}
            >
              Add Post
            </Link>
          )}

          <div className="relative flex-1 w-full">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="xs:text-xs rounded-full border-solid border"
              placeholder="Search for posts, tags, users, or anything..."
              style={{
                width: "100%",
                paddingLeft: "45px",
              }}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
          </div>

          <div className="relative">
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    Sort by {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ) : (
        <div
          className={
            pathname === "/search"
              ? "flex flex-col items-center justify-center p-4 space-y-4 max-w-xl mx-auto"
              : "flex flex-col gap-4"
          }
        >
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Log in or sign up to view posts
          </p>
          <div className="flex flex-col md:flex-row gap-2">
            <Link
              href={"/signup"}
              rel="noreferrer"
              className={buttonVariants()}
              style={{ minWidth: "100px" }}
            >
              Signup
            </Link>
            <Link
              href={"/login"}
              rel="noreferrer"
              className={buttonVariants({ variant: "outline" })}
              style={{ minWidth: "100px" }}
            >
              Login
            </Link>
          </div>
        </div>
      )}
      {authLoading || postsLoading ? (
        <div className="flex-1">
          <LoadingSpinner />
        </div>
      ) : (
        isLoggedIn && posts && <BentoGridSecondDemo data={sortedPosts} />
      )}
    </>
  );
}
