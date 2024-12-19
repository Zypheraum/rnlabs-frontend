import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RN Labs | Services',
  description: 'Secure storage meets decentralized finance - your assets, your control. Experience the power of true ownership and financial freedom with our innovative solutions.',
  metadataBase: new URL('https://service.raum.network'),
  openGraph: {
    title: 'RN Labs',
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
