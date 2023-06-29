import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { Providers } from './providers';
import Headers from "@/components/headers/headers";

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-gray-900 text-slate-200">
                <Providers>
                    <Headers />

                    <main className='container mx-auto py-10 px-5'>
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}

export default RootLayout;
