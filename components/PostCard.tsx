import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface PostCardProps {
	post: {
		title: string;
		excerpt: string;
		slug: string;
		date: string;
		featuredImage?: {
			node: {
				sourceUrl: string;
				altText: string;
			};
		};
		author?: {
			node: {
				name: string;
			};
		};
		categories?: {
			nodes: {
				name: string;
				slug: string;
			}[];
		};
	};
}

export default function PostCard({ post }: PostCardProps) {
	const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});

	return (
		<Card className="pt-0 group flex flex-col overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1 duration-300">
			<Link href={`/blog/${post.slug}`} className="relative block aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
				{post.featuredImage?.node?.sourceUrl ? (
					<Image
						src={post.featuredImage.node.sourceUrl}
						alt={post.featuredImage.node.altText || post.title}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover transition-transform duration-500 group-hover:scale-105"
						priority={false}
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center text-muted-foreground">
						No Image
					</div>
				)}
				{post.categories?.nodes && post.categories.nodes.length > 0 && (
					<div className="absolute left-4 top-4 z-10">
						<Badge variant="secondary" className="bg-white/90 text-zinc-900 backdrop-blur-sm hover:bg-white">
							{post.categories.nodes[0].name}
						</Badge>
					</div>
				)}
			</Link>

			<CardHeader className="space-y-2 p-6 pb-0">
				<div className="flex items-center gap-4 text-xs text-muted-foreground">
					<div className="flex items-center gap-1">
						<Calendar className="h-3 w-3" />
						<span>{formattedDate}</span>
					</div>
					<div className="flex items-center gap-1">
						<User className="h-3 w-3" />
						<span>{post.author?.node?.name || 'Author'}</span>
					</div>
				</div>
				<CardTitle className="line-clamp-2 text-xl font-bold leading-tight group-hover:text-primary transition-colors">
					<Link href={`/blog/${post.slug}`}>{post.title}</Link>
				</CardTitle>
			</CardHeader>

			<CardContent className="flex-1 p-6 pt-3">
				<div
					className="line-clamp-3 text-sm leading-relaxed text-muted-foreground"
					dangerouslySetInnerHTML={{ __html: post.excerpt }}
				/>
			</CardContent>

			<CardFooter className="p-6 pt-0">
				<Button asChild variant="ghost" className="px-0 font-bold hover:bg-transparent hover:text-primary group/btn">
					<Link href={`/blog/${post.slug}`} className="flex items-center gap-2">
						Read Story
						<ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
