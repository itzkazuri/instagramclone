// src/config/site.ts
export const siteConfig = {
  name: "Cosplayer Medsos",
  description: "Connect with fellow cosplayers, share your creations, and discover amazing cosplays from around the world.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/og-image.jpg`,
  links: {
    twitter: "https://twitter.com/cosplayermedsos",
    github: "https://github.com/cosplayermedsos",
  },
};