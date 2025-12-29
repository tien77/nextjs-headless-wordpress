import RegisterForm from '@/components/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up | Minimal Blog',
    description: 'Create a new account at The Journal',
};

export default function RegisterPage() {
    return (
        <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-zinc-50/30 dark:bg-transparent">
            <RegisterForm />
        </div>
    );
}
