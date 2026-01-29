import '../globals.css'
import Navbar from '@/Website/components/Navbar'
import Header from "@/Website/components/Header";
import Hero from "@/Website/components/Hero";
import Courses from "@/Website/components/Courses";
import Testimonials from "@/Website/components/Testimonials";
import Contact from "@/Website/components/Contact";
import Footer from "@/Website/components/Footer";

export const metadata = {
  title: 'VeraCare Health Academy',
  description: 'Professional healthcare training and certification',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Courses />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}