import Link from 'next/link';
import { getAllCategories, getAllTags } from '@/lib/wordpressApi';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Hash, FolderOpen, Mail } from 'lucide-react';

export default async function Sidebar() {
	const categories = await getAllCategories();
	const tags = await getAllTags();

	return (
		<aside className="space-y-8">
			{/* Search Widget */}
			<Card>
				<CardHeader className="pb-4">
					<CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
						<Search className="h-4 w-4 text-primary" />
						Search
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form action="/search" method="GET" className="relative">
						<Input
							type="text"
							name="q"
							placeholder="Search stories..."
							className="rounded-full bg-muted/50 border-none focus-visible:ring-primary"
						/>
					</form>
				</CardContent>
			</Card>

			{/* Categories Section */}
			<Card>
				<CardHeader className="pb-4">
					<CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
						<FolderOpen className="h-4 w-4 text-primary" />
						Categories
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-2">
						{categories?.map((category: any) => (
							<Link
								key={category.slug}
								href={`/category/${category.slug}`}
								className="group flex items-center justify-between py-1 text-sm text-muted-foreground transition-colors hover:text-primary"
							>
								<span>{category.name}</span>
								<Badge variant="secondary" className="h-5 rounded-full px-1.5 text-[10px] font-bold opacity-70 group-hover:opacity-100 transition-opacity">
									{category.count}
								</Badge>
							</Link>
						))}
						{(!categories || categories.length === 0) && (
							<p className="text-sm text-muted-foreground italic">No categories found.</p>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Tags Section */}
			<Card>
				<CardHeader className="pb-4">
					<CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
						<Hash className="h-4 w-4 text-primary" />
						Popular Tags
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-2">
						{tags?.map((tag: any) => (
							<Link key={tag.slug} href={`/tag/${tag.slug}`}>
								<Badge variant="outline" className="rounded-md font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
									#{tag.name}
								</Badge>
							</Link>
						))}
						{(!tags || tags.length === 0) && (
							<p className="text-sm text-muted-foreground italic">No tags found.</p>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Newsletter Widget */}
			<Card className="bg-zinc-950/80 text-white border-white/10 shadow-xl overflow-hidden relative backdrop-blur-md">
				<div className="absolute top-0 right-0 p-4 opacity-10">
					<Mail className="h-24 w-24 -rotate-12 translate-x-8 translate-y-2 text-white" />
				</div>
				<CardHeader>
					<CardTitle className="text-xl font-bold">Stay Updated</CardTitle>
					<p className="text-sm text-zinc-400">
						Get the best stories delivered directly to your inbox.
					</p>
				</CardHeader>
				<CardContent>
					<form className="space-y-4 relative z-10">
						<Input
							type="email"
							placeholder="Email Address"
							className="bg-white/10 border-white/5 placeholder:text-zinc-500 text-white focus-visible:ring-zinc-700"
						/>
						<Button className="w-full bg-white text-zinc-950 hover:bg-zinc-200 font-bold transition-all active:scale-95">
							Join the newsletter
						</Button>
					</form>
				</CardContent>
			</Card>
		</aside>
	);
}
