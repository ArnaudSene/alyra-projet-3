'use client'

import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import Headers from "@/components/headers/headers";
import IsConnected from '@/components/IsConnected';

import { Providers } from './providers';
import { WorkflowStepperManager } from '@/components/home/WorkflowStepperManager';
import { AppLogo } from '@/components/AppLogo';

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-gray-900 text-slate-200">
                <Providers>
                    <Headers />
                    <main className='container mx-auto pt-10'>
                        <IsConnected>
                            <h1 className='text-center'><AppLogo/></h1>

                            <WorkflowStepperManager />
                            {children}
                        </IsConnected>
                    </main>
                </Providers>
            </body>
        </html>
    )
}

export default RootLayout
