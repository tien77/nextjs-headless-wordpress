import { getPostsByTag } from '@/lib/wordpressApi';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface TagPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
	const { slug } = await params;
	const tag = await getPostsByTag(slug);

	if (!tag) {
		return {
			title: 'Tag Not Found',
		};
	}

	return {
		title: `Posts tagged with ${tag.name} | Minimal Blog`,
		description: tag.description || `Browse all posts tagged with ${tag.name}.`,
	};
}

export default async function TagPage({ params }: TagPageProps) {
	const { slug } = await params;
	const tag = await getPostsByTag(slug);

	if (!tag) {
		notFound();
	}

	const posts = tag.posts.nodes;

	return (
		<div className="container mx-auto px-4 py-12 sm:px-6 lg:py-20">
			<div className="mb-12 text-center">
				<span className="text-xs font-bold uppercase tracking-widest text-blue-600">Tag Archive</span>
				<h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
					#{tag.name}
				</h1>
				{tag.description && (
					<p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
						{tag.description}
					</p>
				)}
			</div>

			<div className="grid gap-12 lg:grid-cols-12">
				<div className="lg:col-span-8">
					{posts.length === 0 ? (
						<div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed">
							<p className="text-gray-500">No posts found with this tag.</p>
						</div>
					) : (
						<div className="grid gap-8 sm:grid-cols-2">
							{posts.map((post: any) => (
								<PostCard key={post.slug} post={post} />
							))}
						</div>
					)}
				</div>
				<div className="lg:col-span-4">
					<Sidebar />
				</div>
			</div>
		</div>
	);
}
