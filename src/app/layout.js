'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { ApolloProvider } from '@apollo/client';
import { ApolloService } from '@/services/apollo-service';
import EmployeeDataContextProvider from '@/context/employeesDataContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>EmployeeTracker</title>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/datepicker.min.js"></script>
            </head>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ApolloProvider client={ApolloService}>
                    <EmployeeDataContextProvider>
                        <body className={inter.className}>
                            {children}
                        </body>
                    </EmployeeDataContextProvider>
                </ApolloProvider>
            </LocalizationProvider>
        </html>
    )
}


