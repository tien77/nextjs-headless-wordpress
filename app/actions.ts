'use server';

import { getAllPosts, createComment } from '@/lib/wordpressApi';

export async function fetchMorePosts(after: string) {
    return await getAllPosts(10, after);
}

export async function submitComment(formData: FormData) {
    const postId = Number(formData.get('postId'));
    const parentId = formData.get('parentId') ? String(formData.get('parentId')) : null;
    const author = String(formData.get('name'));
    const authorEmail = String(formData.get('email'));
    const content = String(formData.get('comment'));

    if (!postId || !author || !authorEmail || !content) {
        return { success: false, message: 'Missing required fields' };
    }

    try {
        const result = await createComment({
            postId,
            parentId,
            author,
            authorEmail,
            content
        });

        if (result?.success) {
            if (!result.comment) {
                return { success: true, comment: null, message: 'Your comment is awaiting moderation.' };
            }
            return { success: true, comment: result.comment };
        } else {
            return { success: false, message: 'Failed to post comment. Unknown error.' };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred: ' + (error as Error).message };
    }
}
