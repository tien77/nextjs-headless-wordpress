import { getPostBySlug, getPostsByCategory } from '@/lib/wordpressApi';
import Link from 'next/link';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, User } from 'lucide-react';
import { CommentSection } from '@/components/CommentSection';

interface PostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		return {
			title: 'Post Not Found',
		};
	}

	return {
		title: `${post.title} | Minimal Blog`,
		description: post.excerpt?.replace(/<[^>]*>?/gm, '').substring(0, 160),
		openGraph: {
			title: post.title,
			description: post.excerpt?.replace(/<[^>]*>?/gm, '').substring(0, 160),
			images: post.featuredImage ? [post.featuredImage.node.sourceUrl] : [],
		},
	};
}

export default async function PostPage({ params }: PostPageProps) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	// Fetch related posts from the same category
	const primaryCategory = post.categories?.nodes?.[0];
	const categoryData = primaryCategory ? await getPostsByCategory(primaryCategory.slug) : null;
	const relatedPosts = categoryData?.posts?.nodes
		?.filter((p: any) => p.slug !== slug)
		?.slice(0, 3) || [];

	const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});

	return (
		<div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
			<div className="grid gap-16 lg:grid-cols-12">
				{/* Main Article Content */}
				<main className="lg:col-span-8">
					<article className="space-y-12">
						{/* Hero Section */}
						<header className="mb-12 text-center space-y-6">
							{post.categories?.nodes && post.categories.nodes.length > 0 && (
								<Badge variant="outline" className="px-3 py-1 uppercase tracking-widest text-[10px] font-black border-primary text-primary">
									{post.categories.nodes[0].name}
								</Badge>
							)}

							<h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl lg:text-7xl dark:text-white leading-tight">
								{post.title}
							</h1>

							<div className="flex items-center justify-center gap-6 text-sm text-muted-foreground font-medium">
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4 text-primary" />
									<span>{formattedDate}</span>
								</div>
								<div className="flex items-center gap-2">
									<User className="h-4 w-4 text-primary" />
									<span>{post.author?.node?.name || 'Author'}</span>
								</div>
							</div>

							{post.featuredImage && (
								<div className="relative aspect-[21/9] overflow-hidden rounded-3xl shadow-2xl mt-12 bg-muted">
									<Image
										src={post.featuredImage.node.sourceUrl}
										alt={post.featuredImage.node.altText || post.title}
										fill
										priority
										className="object-cover"
									/>
								</div>
							)}
						</header>

						{/* Content */}
						<div className="prose prose-zinc prose-lg dark:prose-invert mx-auto max-w-3xl">
							<div
								className="text-zinc-800 dark:text-zinc-200 leading-[1.8] space-y-6"
								dangerouslySetInnerHTML={{ __html: post.content }}
							/>
						</div>

						{/* Tags Section */}
						{post.tags?.nodes && post.tags.nodes.length > 0 && (
							<div className="flex flex-wrap gap-2 pt-8">
								<span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-2 flex items-center">
									Tags:
								</span>
								{post.tags.nodes.map((tag: any) => (
									<Link key={tag.slug} href={`/tag/${tag.slug}`}>
										<Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
											#{tag.name}
										</Badge>
									</Link>
								))}
							</div>
						)}

						<Separator className="my-16" />

						{/* Author Footer */}
						<Card className="border-none bg-zinc-50 dark:bg-zinc-900/50 p-8 sm:p-10 rounded-3xl overflow-hidden relative">
							<div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
								{post.author?.node?.avatar?.url && (
									<div className="relative h-20 w-20 overflow-hidden rounded-2xl ring-4 ring-white shadow-xl">
										<Image
											src={post.author.node.avatar.url}
											alt={post.author.node.name}
											fill
											className="object-cover"
										/>
									</div>
								)}
								<div className="text-center sm:text-left space-y-1">
									<span className="text-[10px] font-black uppercase tracking-widest text-primary">About the Author</span>
									<h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{post.author?.node?.name}</h3>
									<p className="max-w-md text-sm text-muted-foreground leading-relaxed">
										Contributing writer and creative explorer sharing insights on technology and the modern web.
									</p>
								</div>
							</div>
						</Card>

						{/* Comment Section */}
						<CommentSection postId={post.databaseId} />
					</article>

					{/* Related Posts Section */}
					{relatedPosts.length > 0 && (
						<div className="mt-20 space-y-10">
							<div className="flex items-center gap-4">
								<Separator className="flex-1" />
								<h2 className="text-2xl font-black tracking-tight flex items-center gap-2 whitespace-nowrap">
									<span className="text-primary italic">Related</span> Stories
								</h2>
								<Separator className="flex-1" />
							</div>
							<div className="grid gap-8 sm:grid-cols-2">
								{relatedPosts.slice(0, 2).map((relatedPost: any) => (
									<PostCard key={relatedPost.slug} post={relatedPost} />
								))}
							</div>
						</div>
					)}
				</main>

				{/* Sidebar */}
				<div className="lg:col-span-4">
					<Sidebar />
				</div>
			</div>
		</div>
	);
}
