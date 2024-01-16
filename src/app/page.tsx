import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import FAQ from "@/components/faq";
import Tutorial from "@/components/tutorial";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Tutorial />
      <FAQ />
      <Footer />
    </main>
  )
}
