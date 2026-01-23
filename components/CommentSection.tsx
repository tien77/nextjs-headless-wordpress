"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, Loader2, X } from "lucide-react";
import { useState, useTransition, useRef, useEffect } from "react";
import { submitComment } from "@/app/actions";

interface Comment {
    id: string;
    content: string;
    date: string;
    parentId?: string | null;
    author: {
        node: {
            name: string;
            avatar?: {
                url: string;
            };
        };
    };
    children?: Comment[];
}

export function CommentSection({ postId, initialComments = [] }: { postId?: string | number, initialComments?: Comment[] }) {
    // Build comment tree
    const buildCommentTree = (comments: Comment[]) => {
        const commentMap = new Map<string, Comment>();
        const roots: Comment[] = [];

        // Initialize map and add children array
        comments.forEach(comment => {
            commentMap.set(comment.id, { ...comment, children: [] });
        });

        // Build hierarchy
        comments.forEach(comment => {
            const node = commentMap.get(comment.id)!;
            if (comment.parentId) {
                const parent = commentMap.get(comment.parentId);
                if (parent) {
                    parent.children?.push(node);
                } else {
                    roots.push(node); // Fallback if parent not found
                }
            } else {
                roots.push(node);
            }
        });

        return roots;
    };

    const [comments, setComments] = useState<Comment[]>(buildCommentTree(initialComments));
    const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
    const [isPending, startTransition] = useTransition();
    const [submissionMessage, setSubmissionMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleReply = (comment: Comment) => {
        setReplyingTo(comment);
        const form = document.getElementById('comment-form');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const cancelReply = () => {
        setReplyingTo(null);
    };

    // Auto-clear message after 3 seconds
    useEffect(() => {
        if (submissionMessage) {
            const timer = setTimeout(() => {
                setSubmissionMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [submissionMessage]);

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const result = await submitComment(formData);
            if (result.success) {
                // Determine comment data to add
                let newComment: Comment;

                if (result.comment) {
                    newComment = {
                        ...result.comment,
                        children: []
                    };
                    setSubmissionMessage({ text: 'Comment submitted successfully!', type: 'success' });
                } else {
                    // Start of manual construction for pending comment
                    const content = String(formData.get('comment'));
                    const name = String(formData.get('name'));
                    // We need a temporary ID
                    newComment = {
                        id: `temp-${Date.now()}`,
                        content: content,
                        date: new Date().toISOString(),
                        parentId: result.comment?.parentId || (formData.get('parentId') as string) || null,
                        author: {
                            node: {
                                name: name,
                                avatar: { url: '' } // Placeholder or default
                            }
                        },
                        children: []
                    };

                    setSubmissionMessage({ text: result.message || 'Comment submitted.', type: 'success' });

                    if (!result.comment) {
                        formRef.current?.reset();
                        setReplyingTo(null);
                        return;
                    }
                }

                // Helper to flatten current tree back to list
                const flatten = (nodes: Comment[]): Comment[] => {
                    let flat: Comment[] = [];
                    nodes.forEach(node => {
                        const { children, ...rest } = node;
                        flat.push(rest as Comment);
                        if (children && children.length > 0) {
                            flat = flat.concat(flatten(children));
                        }
                    });
                    return flat;
                };

                const currentFlat = flatten(comments);
                const updatedFlat = [...currentFlat, newComment];
                setComments(buildCommentTree(updatedFlat));

                // Reset form
                formRef.current?.reset();
                setReplyingTo(null);
            } else {
                setSubmissionMessage({ text: result.message || 'Failed to submit comment', type: 'error' });
            }
        });
    };

    const CommentItem = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => (
        <div className={`flex flex-col ${isReply ? 'mt-6 ml-8 sm:ml-12 border-l-2 border-border/50 pl-6' : ''}`}>
            <div className="flex gap-4 group">
                <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-background shadow-md shrink-0">
                    <AvatarImage src={comment.author.node.avatar?.url} />
                    <AvatarFallback className="font-bold bg-muted text-muted-foreground">
                        {comment.author.node.name ? comment.author.node.name[0] : 'A'}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex-1 min-w-0">
                    <div className="glass-card p-5 rounded-2xl rounded-tl-none hover:bg-white/60 dark:hover:bg-black/30 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-sm tracking-tight truncate mr-2">{comment.author.node.name}</h4>
                            <span className="text-xs font-medium text-muted-foreground/60 shrink-0">
                                {new Date(comment.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                        <div className="text-sm text-muted-foreground leading-relaxed break-words"
                            dangerouslySetInnerHTML={{ __html: comment.content }}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReply(comment)}
                        className="h-auto px-2 py-0 text-xs font-bold text-muted-foreground hover:text-primary self-start"
                    >
                        Reply
                    </Button>
                </div>
            </div>

            {/* Recursively render children */}
            {comment.children && comment.children.length > 0 && (
                <div className="space-y-6">
                    {comment.children.map(child => (
                        <CommentItem key={child.id} comment={child} isReply={true} />
                    ))}
                </div>
            )}
        </div>
    );

    const totalComments = (nodes: Comment[]): number => {
        let count = 0;
        nodes.forEach(node => {
            count += 1 + (node.children ? totalComments(node.children) : 0);
        });
        return count;
    };

    const count = totalComments(comments);

    return (
        <div className="mt-16 space-y-10 max-w-3xl mx-auto" id="comments">
            {/* Comment List */}
            <div className="space-y-8">
                <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                        <MessageSquare className="h-5 w-5" />
                    </div>
                    Comments <span className="text-muted-foreground text-lg font-normal">({count})</span>
                </h3>

                {comments.length === 0 ? (
                    <div className="py-12 text-center glass-card border-dashed">
                        <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {comments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))}
                    </div>
                )}
            </div>

            <Separator />

            {/* Comment Form */}
            <div id="comment-form" className="glass-card p-8 transition-all">
                <div className="mb-6 flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold mb-2">
                            {replyingTo ? `Reply to ${replyingTo.author.node.name}` : 'Leave a Reply'}
                        </h3>
                        <p className="text-sm text-muted-foreground">Your email address will not be published. Required fields are marked *</p>
                    </div>
                    {replyingTo && (
                        <Button variant="ghost" size="icon" onClick={cancelReply} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                            <X className="h-5 w-5" />
                        </Button>
                    )}
                </div>

                <form ref={formRef} action={handleSubmit} className="space-y-5">
                    <input type="hidden" name="postId" value={postId} />
                    {replyingTo && <input type="hidden" name="parentId" value={replyingTo.id} />}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name *</Label>
                            <Input id="name" name="name" placeholder="John Doe" required className="bg-white/50 dark:bg-black/20 border-white/10 shadow-sm h-11 backdrop-blur-sm focus-visible:ring-primary/50" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email *</Label>
                            <Input id="email" name="email" type="email" placeholder="john@example.com" required className="bg-white/50 dark:bg-black/20 border-white/10 shadow-sm h-11 backdrop-blur-sm focus-visible:ring-primary/50" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="comment" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Comment *</Label>
                        <Textarea
                            id="comment"
                            name="comment"
                            placeholder="Share your thoughts..."
                            required
                            className="bg-white/50 dark:bg-black/20 border-white/10 shadow-sm min-h-[150px] resize-none p-4 backdrop-blur-sm focus-visible:ring-primary/50"
                        />
                    </div>
                    <div className="pt-2 flex flex-col gap-4">
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isPending}
                            className="rounded-full px-8 font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all w-fit"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting...
                                </>
                            ) : (
                                <>
                                    Post Comment <Send className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>

                        {submissionMessage && (
                            <div className={`p-4 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2 ${submissionMessage.type === 'success'
                                ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                : 'bg-destructive/10 text-destructive'
                                }`}>
                                {submissionMessage.text}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
