import { getPostsByCategory } from '@/lib/wordpressApi';
import PostCard from '@/components/PostCard';
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
		title: `Posts in ${category.name} | Minimal Blog`,
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
		<div className="container mx-auto px-4 py-12 sm:px-6 lg:py-20">
			<div className="mb-12 text-center">
				<span className="text-xs font-bold uppercase tracking-widest text-blue-600">Category Archive</span>
				<h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
					{category.name}
				</h1>
				{category.description && (
					<p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
						{category.description}
					</p>
				)}
			</div>

			<div className="grid gap-12 lg:grid-cols-12">
				<div className="lg:col-span-8">
					{posts.length === 0 ? (
						<div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed">
							<p className="text-gray-500">No posts found in this category.</p>
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
