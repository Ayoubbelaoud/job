'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // إرسال البيانات لدالة signIn الخاصة بـ Auth.js
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("الإيميل أو كلمة السر غير صحيحة");
            } else {
                // التوجيه للـ Dashboard فاش كيدوز تسجيل الدخول بنجاح
                router.push('/dashboard');
                router.refresh();
            }
        } catch (err) {
            console.error("Sign-in error detail:", err);
            setError("وقع خطأ غير متوقع، حاول مرة أخرى");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4'>
            <Card className='w-full max-w-md border-gray-200 shadow-lg'>
                <CardHeader className="space-y-1">
                    <CardTitle className='text-2xl font-bold text-black'>Sign In</CardTitle>
                    <CardDescription className='text-gray-600'>Enter your credentials to access your account</CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <CardContent className='space-y-4'>
                        {/* إظهار الخطأ فـ حالة وجوده */}
                        {error && (
                            <div className="rounded-md bg-red-50 p-3 text-sm text-red-500 border border-red-200">
                                {error}
                            </div>
                        )}

                        <div className='space-y-2'>
                            <Label htmlFor="email" className='text-gray-700'>Email</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder='test@test.com' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                                className='border-gray-300 focus:border-primary focus:ring-primary' 
                            />
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='password' className='text-gray-700'>Password</Label>
                            <Input 
                                id="password" 
                                type="password" 
                                placeholder="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                                className='border-gray-300 focus:border-primary focus:ring-primary'
                            />
                        </div>
                    </CardContent>

                    <CardFooter className='flex flex-col space-y-4'>
                        <Button 
                            type="submit" 
                            disabled={loading} 
                            className='w-full bg-primary hover:bg-primary/90'
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </Button>

                        <p className='text-center text-sm text-gray-600'>
                            Don't have an account?{" "}
                            <Link href="/sign-up" className='font-medium text-primary hover:underline'>
                                Sign Up
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}