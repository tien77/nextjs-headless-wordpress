import { getPostBySlug } from '@/lib/wordpressApi';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
		<article className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-20">
			{/* Hero Section */}
			<header className="mb-12 text-center">
				<div className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
					<span>{formattedDate}</span>
					<span className="h-1 w-1 rounded-full bg-gray-300" />
					<span>{post.author?.node?.name || 'Author'}</span>
				</div>
				<h1 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
					{post.title}
				</h1>

				{post.featuredImage && (
					<div className="relative aspect-[21/9] overflow-hidden rounded-3xl shadow-2xl">
						<img
							src={post.featuredImage.node.sourceUrl}
							alt={post.featuredImage.node.altText || post.title}
							className="h-full w-full object-cover"
						/>
					</div>
				)}
			</header>

			{/* Content */}
			<div className="prose prose-lg prose-blue mx-auto max-w-3xl">
				<div
					className="text-gray-700 leading-relaxed space-y-6"
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>
			</div>

			{/* Author Footer */}
			<footer className="mt-16 border-t border-gray-100 pt-10">
				<div className="flex items-center gap-4 rounded-3xl bg-gray-50 p-8 sm:gap-6">
					{post.author?.node?.avatar?.url && (
						<img
							src={post.author.node.avatar.url}
							alt={post.author.node.name}
							className="h-16 w-16 rounded-full ring-4 ring-white shadow-sm"
						/>
					)}
					<div>
						<span className="text-xs font-bold uppercase tracking-widest text-blue-600">Written by</span>
						<h3 className="text-xl font-bold text-gray-900">{post.author?.node?.name}</h3>
						<p className="mt-1 text-sm text-gray-500">Expert writer and contributor at Minimal Blog.</p>
					</div>
				</div>
			</footer>
		</article>
	);
}
