import { getPostsByCategory } from '@/lib/wordpressApi';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FolderOpen } from 'lucide-react';

interface CategoryPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
	const { slug } = await params;
	const category = await getPostsByCategory(slug);

	if (!category) {
		return {
			title: 'Category Not Found',
		};
	}

	return {
		title: `Posts in ${category.name} | The Journal`,
		description: category.description || `Browse all posts in the ${category.name} category.`,
	};
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { slug } = await params;
	const category = await getPostsByCategory(slug);

	if (!category) {
		notFound();
	}

	const posts = category.posts.nodes;

	return (
		<div className="container mx-auto px-4 py-12 sm:px-6 lg:py-16 max-w-7xl">
			<div className="mb-16 text-center space-y-4">
				<Badge variant="secondary" className="px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-primary/10 text-primary border-none">
					Category Archive
				</Badge>
				<h1 className="text-5xl font-black tracking-tight text-zinc-900 sm:text-6xl dark:text-white leading-tight">
					{category.name}
				</h1>
				{category.description && (
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed font-medium">
						{category.description}
					</p>
				)}
			</div>

			<div className="grid gap-16 lg:grid-cols-12">
				<main className="lg:col-span-8">
					<div className="mb-8 flex items-center gap-3">
						<FolderOpen className="h-6 w-6 text-primary" />
						<h2 className="text-2xl font-black italic">Stories in {category.name}</h2>
					</div>
					<Separator className="mb-10 opacity-50" />

					{posts.length === 0 ? (
						<div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
							<p className="text-muted-foreground font-medium">No posts found in this category yet.</p>
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
