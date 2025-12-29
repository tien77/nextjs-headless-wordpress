import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search as SearchIcon } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse delay-700" />

            <div className="max-w-2xl w-full text-center space-y-12 relative z-10">
                {/* Large 404 text with gradient */}
                <div className="space-y-2">
                    <h1 className="text-[12rem] sm:text-[18rem] font-black leading-none tracking-tighter italic select-none">
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-400 dark:from-white dark:to-zinc-800">
                            404
                        </span>
                    </h1>
                    <div className="h-2 w-24 bg-primary mx-auto rounded-full" />
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-900 dark:text-white italic">
                        Entry Not Found
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto font-medium leading-relaxed">
                        The page you're searching for seems to have vanished into the digital void. It might have been moved or removed entirely.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Button asChild size="lg" className="rounded-full px-8 font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" /> Back to Journal
                        </Link>
                    </Button>

                    <Button variant="outline" asChild size="lg" className="rounded-full px-8 font-bold border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
                        <Link href="/search">
                            <SearchIcon className="mr-2 h-4 w-4" /> Search Stories
                        </Link>
                    </Button>
                </div>

                {/* Subtle helper text */}
                <div className="pt-12">
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-400">
                        Error Code: ERR_PAGE_NOT_FOUND_04
                    </p>
                </div>
            </div>
        </div>
    );
}
