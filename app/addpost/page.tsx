"use client"

import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { postsApi } from "@/utils/api"
import { useAuth } from "@/contexts/auth-context"
import { IconBrandSpotify } from "@tabler/icons-react"
import { Youtube } from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

const AddPostPage: FC = () => {
  const [link, setLink] = useState<string>("")
  const [loading, setLoading] = useState<Boolean>(false)
  const [postContent, setPostContent] = useState<string>("")
  const [platform, setPlatform] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { token, isLoggedIn, isLoading: authLoading } = useAuth()


  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setLink(url)

    if (url.includes("spotify.com")) {
      setPlatform("spotify")
    } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
      setPlatform("youtube")
    } else {
      setPlatform(null)
    }
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const postDetail = {
      song_url: link,
      caption: postContent,
    }

    try {
      const response = await postsApi.createPost(postDetail, token as string)
      setLink("")
      setPostContent("")
      toast({
        description: "Post created successfully!",
      })
      setLoading(false)
      router.push("/")
    } catch (error: unknown) {
      setLoading(false)
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          description: error.message,
        })
        console.error(error.message)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4 max-w-xl mx-auto pt-14">
      {isLoggedIn ? (<>
        <h1 className="text-2xl font-semibold text-center">Add New Post</h1>

        <div className="w-full space-y-4">
          <div className="w-full">
            <label htmlFor="link" className="block text-sm font-medium mb-2">
              Song Link
            </label>
            <div className="flex items-center justify-center space-x-3 mb-2">
              {platform === "spotify" && (
                <IconBrandSpotify size={24} className="text-green-500" />
              )}
              {platform === "youtube" && (
                <Youtube size={24} className="text-red-500" />
              )}
              <Input
                autoFocus
                id="link"
                placeholder="Paste your song URL"
                value={link}
                disabled={loading === true}
                onChange={handleLinkChange}
                className="w-full"
              />
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Post Content
            </label>
            <Textarea
              id="content"
              placeholder="Write about the song..."
              value={postContent}
              onChange={handleContentChange}
              disabled={loading === true}
              rows={6}
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={!link || !postContent || loading === true}
          >
            {loading ? <LoadingSpinner /> : "Submit Post"}
          </Button>
        </div></>
      ) : (
        <>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Log in or sign up to add posts
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
        </>
      )}

    </div>
  )
}

export default AddPostPage
