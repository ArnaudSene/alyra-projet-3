import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { Providers } from './providers';
import Headers from "@/components/headers/headers";
import {WorkflowStatusContextProvider} from "@/context/workflowStatus";

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-gray-900 text-slate-200">
            <WorkflowStatusContextProvider>
                <Providers>
                    <Headers />

                    <main className='container mx-auto py-10 px-5'>
                        {children}
                    </main>

                </Providers>
            </WorkflowStatusContextProvider>
            </body>
        </html>
    );
}

export default RootLayout;
