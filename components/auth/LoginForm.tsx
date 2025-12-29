'use client';

import { useActionState, useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn('credentials', {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid username or password');
            } else {
                router.refresh(); // Update server components
                router.push('/');
            }
        } catch (e) {
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-md border-none shadow-xl dark:bg-zinc-900/50">
            <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-2xl font-black tracking-tight">Welcome Back</CardTitle>
                <CardDescription>
                    Enter your credentials to access your account
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            id="username"
                            name="username"
                            placeholder="Username"
                            required
                            disabled={isLoading}
                            className="bg-muted/50 border-none focus-visible:ring-primary h-11"
                        />
                    </div>
                    <div className="space-y-2">
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            disabled={isLoading}
                            className="bg-muted/50 border-none focus-visible:ring-primary h-11"
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-destructive font-bold text-center animate-in fade-in slide-in-from-top-2">
                            {error}
                        </p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full font-bold h-11" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
