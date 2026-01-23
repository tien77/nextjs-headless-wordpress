import { Separator } from '@/components/ui/separator';
import { Github, Twitter } from 'lucide-react';

export default function Footer() {
	return (
		<footer className="border-t border-white/20 bg-white/30 dark:bg-black/20 backdrop-blur-lg py-16">
			<div className="container mx-auto px-4 sm:px-6 max-w-7xl">
				<div className="grid gap-12 md:grid-cols-4 lg:grid-cols-5">
					<div className="md:col-span-2 lg:col-span-2">
						<span className="text-xl font-black tracking-tighter uppercase italic">
							The <span className="text-primary">Journal</span>
						</span>
						<p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed font-medium">
							Carefully curated stories at the intersection of technology, design, and modern culture. Built for the curious mind.
						</p>
						<div className="flex items-center gap-4 mt-6">
							<a href="#" className="p-2 rounded-full bg-background border border-zinc-200 dark:border-zinc-800 hover:border-primary hover:text-primary transition-all">
								<Twitter className="h-4 w-4" />
							</a>
							<a href="#" className="p-2 rounded-full bg-background border border-zinc-200 dark:border-zinc-800 hover:border-primary hover:text-primary transition-all">
								<Github className="h-4 w-4" />
							</a>
						</div>
					</div>
					<div>
						<h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-white">The Blog</h3>
						<ul className="mt-6 space-y-3 text-sm text-muted-foreground">
							<li><a href="/" className="hover:text-primary transition-colors font-medium">Latest Stories</a></li>
							<li><a href="#" className="hover:text-primary transition-colors font-medium">Popular Posts</a></li>
							<li><a href="#" className="hover:text-primary transition-colors font-medium">Editorial</a></li>
						</ul>
					</div>
					<div>
						<h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-white">Categories</h3>
						<ul className="mt-6 space-y-3 text-sm text-muted-foreground">
							<li><a href="/category/technology" className="hover:text-primary transition-colors font-medium">Technology</a></li>
							<li><a href="/category/lifestyle" className="hover:text-primary transition-colors font-medium">Lifestyle</a></li>
							<li><a href="/category/design" className="hover:text-primary transition-colors font-medium">Design</a></li>
						</ul>
					</div>
					<div>
						<h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-white">Legal</h3>
						<ul className="mt-6 space-y-3 text-sm text-muted-foreground">
							<li><a href="#" className="hover:text-primary transition-colors font-medium">Privacy Policy</a></li>
							<li><a href="#" className="hover:text-primary transition-colors font-medium">Terms</a></li>
						</ul>
					</div>
				</div>

				<Separator className="mt-16 mb-8 opacity-50" />

				<div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
					<p>© {new Date().getFullYear()} The Journal. All rights reserved.</p>
					<p>Designed for humans.</p>
				</div>
			</div>
		</footer>
	);
}
