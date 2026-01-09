import './globals.css'
import Script from 'next/script'
import { DM_Sans, Forum } from 'next/font/google'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dm-sans'
})

const forum = Forum({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-forum'
})

export const metadata = {
  title: 'Grilli - Amazing & Delicious Food',
  description: 'This is a Restaurant html template made by codewithsadee',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${dmSans.variable} ${forum.variable}`}>
        {children}
        <Script 
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js" 
          type="module"
          strategy="afterInteractive"
        />
        <Script 
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js" 
          noModule
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}

