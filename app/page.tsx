import { getAllPosts } from '@/lib/wordpressApi';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:py-20">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Insights & <span className="text-blue-600">Stories</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
          Discover the latest trends in technology, design, and lifestyle through our minimalist blog.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        {/* Main Content */}
        <div className="lg:col-span-8">
          {!posts || posts.length === 0 ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-100 bg-gray-50 p-12 text-center">
              <div className="mb-4 rounded-full bg-blue-50 p-3 text-blue-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l5 5v11a2 2 0 01-2 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3v5h5" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">No posts found</h2>
              <p className="mt-2 text-gray-500">Check back later for new content or verify your WordPress connection.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2">
              {posts.map((post: any) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
