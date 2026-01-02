import { getPostsByCategory } from '@/lib/wordpressApi';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';
import PaginationControls from '@/components/PaginationControls';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FolderOpen } from 'lucide-react';

interface CategoryPageProps {
	params: Promise<{
		slug: string;
	}>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

import { generateMetadataFromSeo } from '@/lib/seo';

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
	const { slug } = await params;
	// Metadata usually doesn't need deep pagination content, so we just invoke with defaults
	const category = await getPostsByCategory(slug);

	if (!category) {
		return {
			title: 'Category Not Found',
		};
	}

	return generateMetadataFromSeo(category.seo);
}

export default async function CategoryPage(props: CategoryPageProps) {
	const { slug } = await props.params;
	const searchParams = await props.searchParams;

	const after = typeof searchParams.after === 'string' ? searchParams.after : undefined;
	const before = typeof searchParams.before === 'string' ? searchParams.before : undefined;
	const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;

	// Fetch logic: 10 per page
	let category;
	if (before) {
		category = await getPostsByCategory(slug, undefined, undefined, 10, before);
	} else {
		category = await getPostsByCategory(slug, 10, after);
	}

	if (!category) {
		notFound();
	}

	const posts = category.posts?.nodes || [];
	const pageInfo = category.posts?.pageInfo || {
		hasNextPage: false,
		hasPreviousPage: false,
		startCursor: null,
		endCursor: null
	};

	return (
		<div className="container mx-auto px-4 py-12 sm:px-6 lg:py-16 max-w-7xl">
			<div className="mb-16 text-center space-y-4">
				<Badge variant="secondary" className="px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-primary/10 text-primary border-none">
					Category Archive
				</Badge>
				<h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl dark:text-white leading-tight">
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
								basePath={`/category/${slug}`}
								currentPage={page}
							/>
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
