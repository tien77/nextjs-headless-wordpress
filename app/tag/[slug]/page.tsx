import { getPostsByTag } from '@/lib/wordpressApi';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Hash } from 'lucide-react';

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
		title: `Posts tagged with ${tag.name} | The Journal`,
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
		<div className="container mx-auto px-4 py-12 sm:px-6 lg:py-16 max-w-7xl">
			<div className="mb-16 text-center space-y-4">
				<Badge variant="secondary" className="px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-primary/10 text-primary border-none">
					Tag Archive
				</Badge>
				<h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl dark:text-white leading-tight">
					#{tag.name}
				</h1>
				{tag.description && (
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed font-medium">
						{tag.description}
					</p>
				)}
			</div>

			<div className="grid gap-16 lg:grid-cols-12">
				<main className="lg:col-span-8">
					<div className="mb-8 flex items-center gap-3">
						<Hash className="h-6 w-6 text-primary" />
						<h2 className="text-2xl font-black italic">Stories tagged with #{tag.name}</h2>
					</div>
					<Separator className="mb-10 opacity-50" />

					{posts.length === 0 ? (
						<div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
							<p className="text-muted-foreground font-medium">No posts found with this tag yet.</p>
						</div>
					) : (
						<div className="grid gap-12 sm:grid-cols-2">
							{posts.map((post: any) => (
								<PostCard key={post.slug} post={post} />
							))}
						</div>
					)}
				</main>
				<aside className="lg:col-span-4">
					<Sidebar />
				</aside>
			</div>
		</div>
	);
}
