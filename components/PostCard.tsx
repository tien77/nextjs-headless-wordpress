import Link from 'next/link';
import Image from 'next/image';

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
		<article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:-translate-y-1 hover:shadow-xl">
			<Link href={`/blog/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden">
				{post.featuredImage ? (
					<img
						src={post.featuredImage.node.sourceUrl}
						alt={post.featuredImage.node.altText || post.title}
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
						No Image
					</div>
				)}
				{post.categories?.nodes && post.categories.nodes.length > 0 && (
					<div className="absolute left-4 top-4">
						<Link
							href={`/category/${post.categories.nodes[0].slug}`}
							className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 backdrop-blur-sm hover:bg-blue-600 hover:text-white transition-colors"
						>
							{post.categories.nodes[0].name}
						</Link>
					</div>
				)}
			</Link>
			<div className="flex flex-1 flex-col p-6">
				<div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
					<span>{formattedDate}</span>
					<span className="h-1 w-1 rounded-full bg-gray-300" />
					<span>{post.author?.node?.name || 'Author'}</span>
				</div>
				<h3 className="mb-3 text-xl font-bold leading-tight text-gray-900 group-hover:text-blue-600">
					<Link href={`/blog/${post.slug}`}>{post.title}</Link>
				</h3>
				<div
					className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-500"
					dangerouslySetInnerHTML={{ __html: post.excerpt }}
				/>
				<div className="mt-auto">
					<Link
						href={`/blog/${post.slug}`}
						className="inline-flex items-center gap-1 text-sm font-bold text-gray-900 hover:text-blue-600"
					>
						Read Story
						<svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</Link>
				</div>
			</div>
		</article>
	);
}
