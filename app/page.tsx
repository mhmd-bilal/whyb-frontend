import { Metadata } from "next"
import { Posts } from "@/components/Posts"

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our platform",
}

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          A convenient platform for you to <br className="hidden sm:inline" />
          express and{" "}
          <span className="cursor-pointer text-primary transition-all duration-300 hover:text-5xl hover:font-black hover:underline">
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
