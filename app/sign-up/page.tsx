import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'

export default function SingUp(){
    return(
        <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center'>

            <Card>
                <CardHeader>
                    <CardTitle>
                            Sign Up
                    </CardTitle>
                    <CardDescription> Create an account to start tracking your job application</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}