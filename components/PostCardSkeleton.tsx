import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

export default function PostCardSkeleton() {
    return (
        <Card className="group flex flex-col overflow-hidden border-none shadow-md animate-pulse">
            <div className="relative aspect-video w-full bg-zinc-200 dark:bg-zinc-800" />

            <CardHeader className="space-y-4 p-6 pb-0">
                <div className="flex items-center gap-4">
                    <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
                <div className="h-6 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-6 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
            </CardHeader>

            <CardContent className="flex-1 p-6 pt-3 space-y-2">
                <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-3 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
            </CardContent>

            <CardFooter className="p-6 pt-0">
                <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
            </CardFooter>
        </Card>
    );
}

export function PostGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid gap-12 sm:grid-cols-2">
            {Array.from({ length: count }).map((_, i) => (
                <PostCardSkeleton key={i} />
            ))}
        </div>
    );
}
