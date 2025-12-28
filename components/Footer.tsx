export default function Footer() {
	return (
		<footer className="border-t border-gray-100 bg-gray-50 py-12">
			<div className="container mx-auto px-4 sm:px-6">
				<div className="grid gap-8 md:grid-cols-4">
					<div className="md:col-span-2">
						<h2 className="text-xl font-bold tracking-tighter text-gray-900">
							MINIMAL<span className="text-blue-600">BLOG</span>
						</h2>
						<p className="mt-4 max-w-xs text-sm text-gray-500 leading-relaxed">
							A minimalist blog built with Next.js and Headless WordPress. Focusing on content and readability.
						</p>
					</div>
					<div>
						<h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Platform</h3>
						<ul className="mt-4 space-y-2 text-sm text-gray-500">
							<li><a href="#" className="hover:text-blue-600">Features</a></li>
							<li><a href="#" className="hover:text-blue-600">Integrations</a></li>
							<li><a href="#" className="hover:text-blue-600">Pricing</a></li>
						</ul>
					</div>
					<div>
						<h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Support</h3>
						<ul className="mt-4 space-y-2 text-sm text-gray-500">
							<li><a href="#" className="hover:text-blue-600">Documentation</a></li>
							<li><a href="#" className="hover:text-blue-600">Guides</a></li>
							<li><a href="#" className="hover:text-blue-600">API Status</a></li>
						</ul>
					</div>
				</div>
				<div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-400">
					<p>© {new Date().getFullYear()} Minimal Blog. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
