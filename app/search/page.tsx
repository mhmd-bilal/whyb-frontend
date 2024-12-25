import { Metadata } from "next"
import { Posts } from "@/components/Posts"

export const metadata: Metadata = {
  title: "whyb.",
  description: "A new age tune explorer.",
}

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Posts />
    </section>
  )
}
