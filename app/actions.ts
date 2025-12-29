'use server';

import { getAllPosts } from '@/lib/wordpressApi';

export async function fetchMorePosts(after: string) {
    return await getAllPosts(10, after);
}
