import Link from 'next/link';
import { getAllCategories, getAllTags } from '@/lib/wordpressApi';

export default async function Sidebar() {
	const categories = await getAllCategories();
	const tags = await getAllTags();

	return (
		<aside className="space-y-12">
			{/* Search Widget - for mobile or as additional search */}
			<div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:hidden">
				<h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">Search</h3>
				<form action="/search" method="GET" className="relative">
					<input
						type="text"
						name="q"
						placeholder="Search..."
						className="w-full rounded-full border border-gray-200 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
					/>
				</form>
			</div>

			{/* Categories Section */}
			<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
				<h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900">
					<span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
					Categories
				</h3>
				<ul className="space-y-3">
					{categories?.map((category: any) => (
						<li key={category.slug}>
							<Link
								href={`/category/${category.slug}`}
								className="flex items-center justify-between text-sm text-gray-600 transition-all hover:translate-x-1 hover:text-blue-600"
							>
								<span>{category.name}</span>
								<span className="rounded-full bg-gray-50 px-2 py-0.5 text-[10px] font-bold text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600">
									{category.count}
								</span>
							</Link>
						</li>
					))}
					{!categories || categories.length === 0 && (
						<li className="text-sm text-gray-400">No categories found.</li>
					)}
				</ul>
			</div>

			{/* Tags Section */}
			<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
				<h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900">
					<span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
					Popular Tags
				</h3>
				<div className="flex flex-wrap gap-2">
					{tags?.map((tag: any) => (
						<Link
							key={tag.slug}
							href={`/tag/${tag.slug}`}
							className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
						>
							#{tag.name}
						</Link>
					))}
					{!tags || tags.length === 0 && (
						<span className="text-sm text-gray-400">No tags found.</span>
					)}
				</div>
			</div>

			{/* Newsletter Widget */}
			<div className="rounded-2xl bg-gray-900 p-8 text-center text-white">
				<h3 className="text-lg font-bold">Stay Updated</h3>
				<p className="mt-2 text-sm text-gray-400">
					Get the latest posts delivered right to your inbox.
				</p>
				<form className="mt-6 space-y-3">
					<input
						type="email"
						placeholder="Email Address"
						className="w-full rounded-xl bg-white/10 px-4 py-2.5 text-sm text-white focus:bg-white/20 focus:outline-none"
					/>
					<button className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold transition-all hover:bg-blue-700 active:scale-95">
						Join the Club
					</button>
				</form>
			</div>
		</aside>
	);
}
