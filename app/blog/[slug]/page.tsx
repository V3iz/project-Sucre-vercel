import { BlogPostClient } from "./blog-post-client"
import { blogPosts, getPostBySlug } from "@/lib/blog-data"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "Artículo no encontrado" }
  return {
    title: `${post.title} — Blog Sucre Bolivia`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="pt-16 lg:pt-20 min-h-screen bg-background">
      <BlogPostClient post={post} />
    </main>
  )
}
