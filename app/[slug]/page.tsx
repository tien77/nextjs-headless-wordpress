import { getPageBySlug } from '@/lib/wordpressApi';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

import { generateMetadataFromSeo } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page) {
        return {
            title: 'Page Not Found',
        };
    }

    return generateMetadataFromSeo(page.seo);
}

export default async function StaticPage({ params }: PageProps) {
    const { slug } = await params;
    const page = await getPageBySlug(slug);

    if (!page) {
        notFound();
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
            <header className="mb-12 text-center space-y-6">
                <h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white leading-tight">
                    {page.title}
                </h1>

                {page.featuredImage && (
                    <div className="relative aspect-[21/9] overflow-hidden rounded-3xl shadow-2xl mt-12 bg-muted">
                        <Image
                            src={page.featuredImage.node.sourceUrl}
                            alt={page.featuredImage.node.altText || page.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                )}
            </header>

            <div className="prose prose-zinc prose-lg dark:prose-invert mx-auto max-w-3xl">
                <div
                    className="text-zinc-800 dark:text-zinc-200 leading-[1.8] space-y-6"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />
            </div>
        </div>
    );
}
