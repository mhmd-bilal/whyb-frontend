import { Metadata } from "next"
import { Posts } from "@/components/Posts"

export const metadata: Metadata = {
  title: "whyb.",
  description: "A new age tune explorer.",
}

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-4 pb-8 pt-6 md:py-8">
      <div className="flex max-w-[780px] flex-col items-start gap-2">
        <h1 className="text-3xl max-w-[580px] font-extrabold leading-tight tracking-tight md:text-4xl spac">
          Discover, share, and{" "}
          <span className="cursor-pointer text-primary transition-all duration-300 hover:text-5xl hover:font-black hover:underline">
            whyb
          </span>
          {" "}your way through music.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          A seamless platform to express and emote to the music you listen to.
        </p>
      </div>
      <Posts />
    </section>
  )
}
