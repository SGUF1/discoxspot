// app/layout.tsx
import './globals.css'
import { Poppins } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ReduxProvider } from '@/store/provider'

const inter = Poppins({ subsets: ['latin'], weight: ['400'] })
export const metadata = {
  title: 'DiscoSpot',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
      layout: {
        logoPlacement: 'inside'
      }
    }}>
      <html lang="en">
        <body className={inter.className}>
          <ReduxProvider>{children}</ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
