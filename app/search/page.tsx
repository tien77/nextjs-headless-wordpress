import { getPostsBySearch } from '@/lib/wordpressApi';
import PostCard from '@/components/PostCard';
import { Metadata } from 'next';

interface SearchPageProps {
	searchParams: Promise<{
		q?: string;
	}>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
	const { q } = await searchParams;
	const query = q || '';
	return {
		title: query ? `Search results for "${query}" | Minimal Blog` : 'Search | Minimal Blog',
		description: `Search results for ${query} on Minimal Blog.`,
	};
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const { q } = await searchParams;
	const query = q || '';
	const posts = query ? await getPostsBySearch(query) : [];

	return (
		<div className="container mx-auto px-4 py-12 sm:px-6 lg:py-20">
			<div className="mb-12 text-center">
				<span className="text-xs font-bold uppercase tracking-widest text-blue-600">Search Results</span>
				<h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
					{query ? `"${query}"` : 'Search our blog'}
				</h1>
				<p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
					Showing {posts?.length || 0} results for your search.
				</p>
			</div>

			<div className="mx-auto mb-16 max-w-xl">
				<form action="/search" method="GET" className="relative">
					<input
						type="text"
						name="q"
						defaultValue={query}
						placeholder="Search for articles..."
						className="w-full rounded-full border border-gray-200 bg-gray-50 px-6 py-4 text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
					/>
					<button
						type="submit"
						className="absolute right-2 top-2 rounded-full bg-blue-600 px-6 py-2 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
					>
						Search
					</button>
				</form>
			</div>

			{!posts || posts.length === 0 ? (
				<div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-100 bg-gray-50 p-12 text-center">
					<h2 className="text-xl font-bold text-gray-900">No results found</h2>
					<p className="mt-2 text-gray-500">Try searching with different keywords.</p>
				</div>
			) : (
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{posts.map((post: any) => (
						<PostCard key={post.slug} post={post} />
					))}
				</div>
			)}
		</div>
	);
}
