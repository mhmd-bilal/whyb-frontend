import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: NavItem[]
  pathname?: string
}

export function MainNav({ items, pathname }: MainNavProps) {
  return (
    <>
      <div className="gap-6 md:gap-10 md:flex-row hidden sm:flex">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo className="size-6" />
          <span className="inline-block font-bold">{siteConfig.name}</span>
        </Link>
        {items?.length ? (
          <nav className="flex gap-6">
            {items?.map((item, index) => {
              return item.href ? (
                <Link
                  key={ index} 
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium",
                    item.disabled && "cursor-not-allowed opacity-80",
                    pathname === item.href ? "": "text-muted-foreground"
                  )}
                >
                  {item.title}
                </Link>
              ) : null
            } )}

          </nav>
        ) : null}
      </div>

      <div className="fixed top-0 left-0 right-0 sm:hidden bg-transparent z-0">
        <div className="container h-16 flex justify-between items-center px-2">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="size-6" />
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
        </div>
      </div>
    </>
  )
}