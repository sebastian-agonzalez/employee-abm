import './globals.css';
import { Inter } from 'next/font/google';
import ToastNotificationContextProvider from '@/context/ToastNotificationContext';
import FramerMotionWrapper from '@/components/framer-motion-wrapper/FramerMotionWrapper';
import DatePickerLocalizationProvider from '@/components/date-picker-localization-provider/DatePickerLocalizationProvider';
import ApolloClientProvider from '@/components/apollo-client-provider/ApolloClientProvider';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
    return (
        <html lang="en" className=''>
            <head>
                <title>StaffTracker</title>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
            </head>
            <body className={`${inter.className}`}>
                <FramerMotionWrapper>
                    <ToastNotificationContextProvider>
                        <DatePickerLocalizationProvider>
                            <ApolloClientProvider>
                                {children}
                            </ApolloClientProvider>
                        </DatePickerLocalizationProvider>
                    </ToastNotificationContextProvider>
                </FramerMotionWrapper>
            </body>
        </html>
    )
}


