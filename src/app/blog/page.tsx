import { Suspense } from "react"
import { Container } from "@/components/container"
import { getAllPosts, getAllTags } from "@/app/data/blog"
import { BlogList } from "@/components/blog/blog-list"

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <Container maxWidth="xl" className="py-12 pt-24">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        }
      >
        <BlogList posts={posts} tags={tags} />
      </Suspense>
    </Container>
  )
}
