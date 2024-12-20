import { useEffect, useState } from "react"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { Posts } from "@/components/Posts"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10 ">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          A convenient platform for you to <br className="hidden sm:inline" />
          express and{" "}
          <span className="text-primary cursor-pointer hover:underline hover:font-black hover:text-5xl transition-all duration-300">
            whyb
          </span>{" "}
          with the rest of us.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and comfortable experience that you would enjoy. 
        </p>
      </div>
      <Posts />
    </section>
  )
}
