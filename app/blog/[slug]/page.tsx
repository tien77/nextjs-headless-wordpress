import { getPostBySlug } from '@/lib/wordpressApi';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, User } from 'lucide-react';

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

	const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});

	return (
		<article className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
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
		</article>
	);
}
