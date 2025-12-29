import LoginForm from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign In | Minimal Blog',
    description: 'Sign in to your account',
};

export default function LoginPage() {
    return (
        <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <LoginForm />
        </div>
    );
}
