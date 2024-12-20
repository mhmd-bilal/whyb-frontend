export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "whyb",
  description:
    "A convinient ",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Search",
      href: "/search",
    },
    {
      title: "Add Post",
      href: "/addpost",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
