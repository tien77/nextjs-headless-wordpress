'use server';

import { registerUser as registerUserApi } from '@/lib/wordpressApi';

export async function register(formData: FormData) {
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        const result = await registerUserApi({
            username,
            email,
            password,
        });
        return result;
    } catch (e: any) {
        throw new Error(e.message || 'Registration failed');
    }
}
