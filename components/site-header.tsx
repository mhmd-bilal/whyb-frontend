"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/useAuthStore"
import { Storage } from "@ionic/storage"
import { Key } from "lucide-react"

import { siteConfig } from "@/config/site"
import { useToast } from "@/hooks/use-toast"
import { Button, buttonVariants } from "@/components/ui/button"
import { Avatar } from "@/components/avatar"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const { toast } = useToast()
  const router = useRouter()

  const storage = new Storage()
  storage.create()
  const { loggedIn, setLoggedIn, syncWithStorage } = useAuthStore()

  useEffect(() => {
    syncWithStorage()
  }, [syncWithStorage])

  const handleLogout = async () => {
    setLoggedIn(false)
    await storage.set("loggedIn", false)
    toast({
      description: "You have been logged out.",
    })
  }

  return (
    <header className="bg-opacity-60 backdrop-blur-md sticky top-0 z-40 w-full border-b md:border-none ">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 sm:flex">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4 relative z-20">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({ size: "icon", variant: "ghost" })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
            {loggedIn ? (
              <Avatar onLogout={handleLogout} />
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  router.push("/signup")
                }}
              >
                <Key className="hidden h-5 w-5 dark:block" />
                <span className="sr-only">Sign Up</span>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
