'use client';

import { useState, useEffect, useRef } from 'react';
import PostCard from '@/components/PostCard';
import PostCardSkeleton from '@/components/PostCardSkeleton';
import { fetchMorePosts } from '@/app/actions';

interface InfinitePostListProps {
    initialPosts: any[];
    initialPageInfo: {
        hasNextPage: boolean;
        endCursor: string;
    };
}

export default function InfinitePostList({ initialPosts, initialPageInfo }: InfinitePostListProps) {
    const [posts, setPosts] = useState(initialPosts);
    const [pageInfo, setPageInfo] = useState(initialPageInfo);
    const [isLoading, setIsLoading] = useState(false);
    const observerTarget = useRef(null);

    const loadMore = async () => {
        if (isLoading || !pageInfo.hasNextPage) return;

        setIsLoading(true);
        try {
            const data = await fetchMorePosts(pageInfo.endCursor);
            if (data) {
                setPosts((prev) => [...prev, ...data.nodes]);
                setPageInfo(data.pageInfo);
            }
        } catch (error) {
            console.error('Error loading more posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && pageInfo.hasNextPage) {
                    loadMore();
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [pageInfo, isLoading]);

    return (
        <div className="space-y-12">
            <div className="grid gap-12 sm:grid-cols-2">
                {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>

            {pageInfo.hasNextPage && (
                <div ref={observerTarget} className="grid gap-12 sm:grid-cols-2 mt-12">
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                </div>
            )}

            {!pageInfo.hasNextPage && posts.length > 0 && (
                <div className="text-center py-12 text-muted-foreground font-medium">
                    You've reached the end of the journal.
                </div>
            )}
        </div>
    );
}
