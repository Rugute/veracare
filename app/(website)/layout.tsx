import '../globals.css'
import Navbar from '@/Website/components/Navbar'
import Footer from '@/Website/components/Footer'

export const metadata = {
  title: 'VeraCare Health Academy',
  description: 'Professional healthcare training and certification',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}