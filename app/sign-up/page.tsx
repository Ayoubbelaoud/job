'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUpAction } from '@/lib/auth-actions'; // تأكد من مسار الملف عندك

export default function SignUp() {
    const [name, setName] = useState("");
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
            // صاوبنا FormData باش ندوزوها لـ Server Action
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);

            const res = await signUpAction(formData);

            if (res?.error) {
                setError(res.error);
            } else {
                // إلى دازت العملية بنجاح، كنزيدو نقلوه لـ Sign In
                router.push('/sign-in?registered=true');
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
            <Card className='w-full max-w-md border-gray-200 shadow-lg'>
                <CardHeader className='space-y-1'>
                    <CardTitle className='text-2xl font-bold text-black'>
                        Sign Up
                    </CardTitle>
                    <CardDescription className='text-gray-600'>Create an account to start tracking your job applications</CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <CardContent className='space-y-4'>
                        {/* عرض الخطأ فـ حالة وجوده */}
                        {error && (
                            <div className="rounded-md bg-red-50 p-3 text-sm text-red-500 border border-red-200">
                                {error}
                            </div>
                        )}

                        <div className='space-y-2'>
                            <Label htmlFor="name" className='text-gray-700'>Name</Label>
                            <Input 
                                id="name" 
                                type="text" 
                                placeholder='Ayoub Belaoud' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                                className='border-gray-300 focus:border-primary focus:ring-primary'  
                            />
                        </div>

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
                            <Label htmlFor="password" className='text-gray-700'>Password</Label>
                            <Input 
                                id="password" 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder='password' 
                                required 
                                minLength={8} 
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
                            {loading ? "Creating Account..." : "Sign Up"}
                        </Button>
                        <p className='text-center text-sm text-gray-600'>
                            Already have an account? <Link href="/sign-in" className='font-medium text-primary hover:underline'>Sign In</Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}