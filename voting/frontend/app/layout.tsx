import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import {Providers} from './providers';

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-gray-50">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}

export default RootLayout;
