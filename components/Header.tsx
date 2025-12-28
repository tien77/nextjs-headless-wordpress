import Link from 'next/link';

export default function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
			<div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
				<div className="flex items-center gap-2">
					<Link href="/" className="text-xl font-bold tracking-tighter text-gray-900 transition-colors hover:text-blue-600">
						MINIMAL<span className="text-blue-600">BLOG</span>
					</Link>
				</div>
				<nav className="hidden lg:flex items-center gap-8">
					<Link href="/" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">
						Home
					</Link>
					<Link href="/category/lifestyle" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">
						Lifestyle
					</Link>
					<Link href="/category/technology" className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600">
						Tech
					</Link>
				</nav>
				<div className="flex items-center gap-4">
					<form action="/search" method="GET" className="hidden sm:block relative">
						<input
							type="text"
							name="q"
							placeholder="Search..."
							className="w-40 rounded-full border border-gray-100 bg-gray-50 px-4 py-1.5 text-xs focus:border-blue-500 focus:bg-white focus:outline-none transition-all lg:w-60"
						/>
						<button type="submit" className="absolute right-3 top-1.5 text-gray-400 hover:text-blue-600">
							<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</button>
					</form>
					<button className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-lg active:scale-95">
						Subscribe
					</button>
				</div>
			</div>
		</header>
	);
}
