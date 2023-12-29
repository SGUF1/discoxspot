// app/layout.tsx
import './globals.css'
import { Poppins } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ReduxProvider } from '@/store/provider'
import ToastProvider from '@/provider/toast-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ModalProvider from '@/provider/modal-provider'
import { Analytics } from '@vercel/analytics/react';
const inter = Poppins({ subsets: ['latin'], weight: ['400'] })
export const metadata = {
  title: 'App',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          logoPlacement: "inside",
        },
        variables: {
          colorPrimary: "#8A0315",
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ReduxProvider>
            <ToastProvider />
            <ModalProvider />
            {children}
          </ReduxProvider>

          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
