import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { auth } from '@/lib/auth';
import { UserMenu } from '@/components/auth/UserMenu';

export default async function Header() {
	const session = await auth();

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl">
				<div className="flex items-center gap-8">
					<Link href="/" className="flex items-center space-x-2">
						<span className="text-xl font-black tracking-tighter uppercase italic">
							The <span className="text-primary">Journal</span>
						</span>
					</Link>
					<nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
						<Link href="/" className="transition-colors text-muted-foreground hover:text-primary">
							Latest
						</Link>
						<Link href="/sample-page" className="transition-colors text-muted-foreground hover:text-primary">
							Sample Page
						</Link>
					</nav>
				</div>

				<div className="flex items-center gap-2 sm:gap-4">
					<form action="/search" method="GET" className="hidden sm:block relative">
						<Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
						<Input
							type="text"
							name="q"
							placeholder="Search..."
							className="h-9 w-40 rounded-full bg-muted/60 border-none pl-9 focus-visible:ring-primary lg:w-64"
						/>
					</form>
					<ThemeToggle />

					{session?.user ? (
						<UserMenu user={session.user} />
					) : (
						<div className="flex items-center gap-2">
							<Button variant="ghost" asChild className="rounded-full font-bold">
								<Link href="/login">Sign In</Link>
							</Button>
							<Button asChild className="hidden sm:flex rounded-full px-6 font-bold shadow-sm shadow-primary/10 transition-all hover:shadow-md active:scale-95">
								<Link href="/register">Join</Link>
							</Button>
						</div>
					)}

					<Button variant="ghost" size="icon" className="md:hidden">
						<Menu className="h-5 w-5" />
					</Button>
				</div >
			</div >
		</header >
	);
}
