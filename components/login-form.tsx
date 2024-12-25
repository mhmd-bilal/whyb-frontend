"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authApi } from "@/utils/api"
import { useAuth } from "@/contexts/auth-context"

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
import { Eye, EyeOff } from "lucide-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { toast } = useToast()
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isView, setIsView] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    try {
      const response = await authApi.login({ email, password })
      toast({
        description: response.message,
      })
      login(`${response.token_type} ${response.access_token}`, String(response.user_id));
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
                <Label htmlFor="email" required>Email</Label>
                <Input
                  autoFocus
                  id="email"
                  type="email"
                  placeholder="phildunphy@yeehaw.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" required>
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={isView ? "text" : "password"}
                    id="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {isView ? (
                    <Eye
                      size={20}
                      className="absolute right-2 top-2 z-10 cursor-pointer text-sm text-[#696562]"
                      onClick={() => setIsView(!isView)}
                    />
                  ) : (
                    <EyeOff
                      size={20}
                      className="absolute right-2 top-2 z-10 cursor-pointer text-sm text-[#696562]"
                      onClick={() => setIsView(!isView)}
                    />
                  )}
                </div>
              </div>
              <Button type="submit" className="w-full">
                Log In
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
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
