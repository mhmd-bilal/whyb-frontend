"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { postData } from "@/utils/api"
import { Storage } from "@ionic/storage"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { toast } = useToast()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const storage = new Storage()
  storage.create()

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    try {
      const response = await postData("/signin/", userData)
      toast({
        description: response.message,
      })
      await storage.set(
        "authToken",
        `${response.token_type} ${response.access_token}`
      )
      await storage.set("loggedIn", true);
      router.push("/")
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

  return (
    <div className={className} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>Enter your credentials to log in</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="phildunphy@yeehaw.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Log In
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
                Sign Up
              </a>
            </div>{" "}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
