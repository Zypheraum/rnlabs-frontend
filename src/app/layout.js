import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://services.raum.network/'),
  openGraph: {
  title: 'RN Labs',
  description: 'Secure storage meets decentralized finance - your assets, your control. Experience the power of true ownership and financial freedom with our innovative solutions.',
  images: [
    {
      url: 'https://raw.githubusercontent.com/Zypheraum/rnlabs-frontend/refs/heads/main/public/RnlogoPinkWithBlackBackground.svg',
      width: 800,
      height: 600,
    },
  ],
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
