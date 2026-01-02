import { getAllPosts } from '@/lib/wordpressApi';
import Sidebar from '@/components/Sidebar';
import PostCard from '@/components/PostCard';
import PaginationControls from '@/components/PaginationControls';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileText, BookOpen } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Minimalist Blog',
    description: 'Read our latest stories and articles.',
};

export default async function BlogPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParams = await props.searchParams;
    const after = typeof searchParams.after === 'string' ? searchParams.after : undefined;
    const before = typeof searchParams.before === 'string' ? searchParams.before : undefined;
    const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;

    let postsData;
    if (before) {
        postsData = await getAllPosts(undefined, undefined, 10, before);
    } else {
        postsData = await getAllPosts(10, after);
    }

    const posts = postsData?.nodes || [];
    const pageInfo = postsData?.pageInfo || {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null
    };

    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:py-16 max-w-7xl">
            {/* Hero Section */}
            <div className="mb-20 text-center space-y-4">
                <Badge variant="outline" className="px-4 py-1 rounded-full border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
                    <BookOpen className="mr-2 h-3 w-3" />
                    The Archive
                </Badge>
                <h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl md:text-5xl dark:text-white leading-[1.1]">
                    Our <span className="text-primary italic">Blog</span>
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed font-medium">
                    Discover all our latest thoughts, ideas, and stories in one place.
                </p>
            </div>

            <div className="grid gap-16 lg:grid-cols-12">
                {/* Main Content */}
                <main className="lg:col-span-8">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-black flex items-center gap-3">
                            <FileText className="h-6 w-6 text-primary" />
                            All Stories
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
                        <div className="space-y-12">
                            <div className="grid gap-12 sm:grid-cols-2">
                                {posts.map((post: any) => (
                                    <PostCard key={post.slug} post={post} />
                                ))}
                            </div>

                            <PaginationControls
                                hasNextPage={pageInfo.hasNextPage}
                                hasPreviousPage={pageInfo.hasPreviousPage}
                                startCursor={pageInfo.startCursor}
                                endCursor={pageInfo.endCursor}
                                basePath="/blog"
                                currentPage={page}
                            />
                        </div>
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
