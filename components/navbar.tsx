import { Briefcase } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { getSession } from '@/lib/auth'
import { signOut } from '@/lib/auth'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback } from './ui/avatar'

export default async function Navbar() {
    const session = await getSession();
    
    return (
        <nav className='border-b border-gray-200 bg-white'>
            <div className='container mx-auto flex h-16 items-center px-4 justify-between'>
                <Link href="/" className='flex items-center gap-2 text-xl font-semibold text-primary'>
                    <Briefcase />
                    Job Tracker
                </Link>
                
                <div className='flex items-center gap-4'>
                    {session?.user ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="ghost" className="text-gray-700 hover:text-black">Dashboard</Button>
                            </Link>
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger className="rounded-full focus:outline-none">
                                    <Avatar>
                                        <AvatarFallback className="bg-primary text-white">
                                            {session.user?.name?.[0]?.toUpperCase() || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                
                                <DropdownMenuContent align="end">
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel>
                                            <div>
                                                <p className="font-medium">{session.user?.name}</p>
                                                <p className="text-xs text-gray-500 font-normal">{session.user?.email}</p>
                                            </div>
                                        </DropdownMenuLabel>

                                        {/* 👇 استدعاء الخروج بـ Server Action نظيف وبدون Client Components */}
                                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600">
                                            <form
                                                action={async () => {
                                                    'use server';
                                                    await signOut({ redirectTo: '/sign-in' });
                                                }}
                                                className="w-full"
                                            >
                                                <button type="submit" className="w-full text-left">
                                                    Log Out
                                                </button>
                                            </form>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in">
                                <Button variant="ghost" className="text-gray-700 hover:text-black">
                                    Log In
                                </Button>
                            </Link>
                            <Link href="/sign-up">
                                <Button className="bg-primary hover:bg-primary/90">
                                    Start for free
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}