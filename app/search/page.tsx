import { getPostsBySearch } from '@/lib/wordpressApi';
import PostCard from '@/components/PostCard';
import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchPageProps {
	searchParams: Promise<{
		q?: string;
	}>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
	const { q } = await searchParams;
	const query = q || '';
	return {
		title: query ? `Search results for "${query}" | The Journal` : 'Search | The Journal',
		description: `Search results for ${query} on The Journal.`,
	};
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const { q } = await searchParams;
	const query = q || '';
	const posts = query ? await getPostsBySearch(query) : [];

	return (
		<div className="container mx-auto px-4 py-12 sm:px-6 lg:py-16 max-w-7xl">
			<div className="mb-12 text-center space-y-4">
				<Badge variant="secondary" className="px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-primary/10 text-primary border-none">
					Search Results
				</Badge>
				<h1 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
					{query ? `"${query}"` : 'Search our stories'}
				</h1>
				<p className="mx-auto max-w-2xl text-lg text-muted-foreground font-medium">
					Showing {posts?.length || 0} stories matching your query.
				</p>
			</div>

			<div className="mx-auto mb-20 max-w-2xl">
				<form action="/search" method="GET" className="relative">
					<Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
					<Input
						type="text"
						name="q"
						defaultValue={query}
						placeholder="Search for articles..."
						className="h-14 w-full rounded-full border-none bg-muted/60 pl-12 pr-32 text-lg focus-visible:ring-primary shadow-sm"
					/>
					<Button
						type="submit"
						className="absolute right-2 top-2 h-10 rounded-full px-8 font-black uppercase tracking-wider shadow-md active:scale-95"
					>
						Search
					</Button>
				</form>
			</div>

			{!posts || posts.length === 0 ? (
				<div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-muted bg-muted/10 p-12 text-center text-muted-foreground">
					<h3 className="text-xl font-bold text-zinc-900 dark:text-white">No results found</h3>
					<p className="mt-2 font-medium">Try searching with different keywords or topics.</p>
				</div>
			) : (
				<div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
					{posts.map((post: any) => (
						<PostCard key={post.slug} post={post} />
					))}
				</div>
			)}
		</div>
	);
}
