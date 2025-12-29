"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export function CommentSection({ postId }: { postId?: string | number }) {
    // Mock comments
    const [comments, setComments] = useState([
        {
            id: 1,
            author: "Alice Johnson",
            avatar: "",
            date: "Oct 24, 2023",
            content: "This article was incredibly insightful! I particularly loved the section about modern web design trends. Keep up the great work!",
        },
        {
            id: 2,
            author: "Mark Smith",
            avatar: "",
            date: "Oct 25, 2023",
            content: "Great read. I've been looking for resources on headless WordPress and this cleared up a lot of my questions.",
        }
    ]);

    return (
        <div className="mt-16 space-y-10 max-w-3xl mx-auto" id="comments">
            {/* Comment List */}
            <div className="space-y-8">
                <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                        <MessageSquare className="h-5 w-5" />
                    </div>
                    Comments <span className="text-muted-foreground text-lg font-normal">({comments.length})</span>
                </h3>

                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4 group">
                            <Avatar className="h-12 w-12 border-2 border-background shadow-md">
                                <AvatarImage src={comment.avatar} />
                                <AvatarFallback className="font-bold bg-muted text-muted-foreground">{comment.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-2 flex-1">
                                <div className="bg-muted/30 p-5 rounded-2xl rounded-tl-none hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-sm tracking-tight">{comment.author}</h4>
                                        <span className="text-xs font-medium text-muted-foreground/60">{comment.date}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{comment.content}</p>
                                </div>
                                <Button variant="ghost" size="sm" className="h-auto px-2 py-0 text-xs font-bold text-muted-foreground hover:text-primary">
                                    Reply
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Comment Form */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 border border-border/50">
                <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">Leave a Reply</h3>
                    <p className="text-sm text-muted-foreground">Your email address will not be published. Required fields are marked *</p>
                </div>

                <form className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name *</Label>
                            <Input id="name" placeholder="John Doe" className="bg-background border-none shadow-sm h-11" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email *</Label>
                            <Input id="email" type="email" placeholder="john@example.com" className="bg-background border-none shadow-sm h-11" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="comment" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Comment *</Label>
                        <Textarea
                            id="comment"
                            placeholder="Share your thoughts..."
                            className="bg-background border-none shadow-sm min-h-[150px] resize-none p-4"
                        />
                    </div>
                    <div className="pt-2">
                        <Button size="lg" className="rounded-full px-8 font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            Post Comment <Send className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
