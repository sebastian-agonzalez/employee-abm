'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { ApolloProvider } from '@apollo/client';
import { ApolloService } from '@/services/apollo-service';
import { Header } from '@/components/main-header/header';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>EmployeeTracker</title>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
            </head>
            <ApolloProvider client={ApolloService}>
                <body className={inter.className}>
                    <>
                        <Header></Header>
                        <main className='h-full' >
                            {children}
                        </main>
                    </>
                </body>
            </ApolloProvider>
        </html>
    )
}


