import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://web.raum.network/' ?? 'http://localhost:3000'),
  openGraph: {
  title: 'Raum Network | RaumFi DEX | RaumStore | RN Bridge',
  description: 'Secure storage meets decentralized finance - your assets, your control. Experience the power of true ownership and financial freedom with our innovative solutions.',
  images: [
    {
      url: 'https://raumstore.raum.network/ipfs/bafybeifbs6dortkdefrrb5lzdohjxi3vyotn5prb6js5t3fqy3i4hydkwu',
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