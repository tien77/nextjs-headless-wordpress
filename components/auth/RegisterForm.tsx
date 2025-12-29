'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { register } from '@/app/register/actions';
import Link from 'next/link';

export default function RegisterForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const result = await register(formData);

            if (result?.user) {
                setIsSuccess(true);
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (e: any) {
            setError(e.message || 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    if (isSuccess) {
        return (
            <Card className="w-full max-w-md border-none shadow-2xl dark:bg-zinc-900/50 text-center p-6">
                <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-center">
                        <CheckCircle2 className="h-16 w-16 text-green-500 animate-bounce" />
                    </div>
                    <h2 className="text-2xl font-black italic uppercase">Account Created!</h2>
                    <p className="text-muted-foreground">
                        Your account has been successfully created. Redirecting you to login...
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md border-none shadow-2xl dark:bg-zinc-900/50 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
            <CardHeader className="space-y-2 text-center pt-8">
                <CardTitle className="text-3xl font-black tracking-tighter italic uppercase">Join the Journal</CardTitle>
                <CardDescription className="font-medium">
                    Create your account to start sharing your stories
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 pl-1">Username</label>
                        <Input
                            id="username"
                            name="username"
                            placeholder="Username"
                            required
                            disabled={isLoading}
                            className="bg-muted/50 border-none focus-visible:ring-primary h-12 font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 pl-1">Email</label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            disabled={isLoading}
                            className="bg-muted/50 border-none focus-visible:ring-primary h-12 font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 pl-1">Password</label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            disabled={isLoading}
                            className="bg-muted/50 border-none focus-visible:ring-primary h-12 font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 pl-1">Confirm Password</label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            required
                            disabled={isLoading}
                            className="bg-muted/50 border-none focus-visible:ring-primary h-12 font-medium"
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-destructive font-bold text-center animate-pulse pt-2">
                            {error}
                        </p>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col gap-4 pb-8">
                    <Button type="submit" className="w-full font-black h-12 uppercase italic tracking-wider transition-all hover:shadow-lg hover:shadow-primary/20" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            'Sign Up Now'
                        )}
                    </Button>
                    <p className="text-sm text-muted-foreground text-center font-medium">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary font-bold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    );
}
