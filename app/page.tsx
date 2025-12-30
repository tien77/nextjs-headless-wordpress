import { getAllPosts } from '@/lib/wordpressApi';
import Sidebar from '@/components/Sidebar';
import InfinitePostList from '@/components/InfinitePostList';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileText, Sparkles } from 'lucide-react';

export default async function Home() {
  const postsData = await getAllPosts(10);
  const posts = postsData?.nodes || [];
  const pageInfo = postsData?.pageInfo || { hasNextPage: false, endCursor: '' };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:py-16 max-w-7xl">
      {/* Hero Section */}
      <div className="mb-20 text-center space-y-4">
        <Badge variant="outline" className="px-4 py-1 rounded-full border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
          <Sparkles className="mr-2 h-3 w-3" />
          Fresh Perspectives
        </Badge>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl md:text-5xl dark:text-white leading-[1.1]">
          The <span className="text-primary italic">Journal</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed font-medium">
          Exploring the intersection of technology, design, and culture.
          Carefully curated stories for the curious mind.
        </p>
      </div>

      <div className="grid gap-16 lg:grid-cols-12">
        {/* Main Content */}
        <main className="lg:col-span-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              Latest Stories
            </h2>
          </div>
          <Separator className="mb-10 opacity-50" />

          {posts.length === 0 ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-muted bg-muted/20 p-12 text-center">
              <div className="mb-4 rounded-full bg-muted p-4 text-muted-foreground">
                <FileText className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold">No stories found</h3>
              <p className="mt-2 text-muted-foreground">
                It looks like there aren't any posts matching your criteria.
              </p>
            </div>
          ) : (
            <InfinitePostList initialPosts={posts} initialPageInfo={pageInfo} />
          )}
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
