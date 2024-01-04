"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { SearchSection } from "@/components/sections";

export default function Home() {
  return (
    <main>
      <Navbar />
      <SearchSection />
      <Footer />
    </main>
  )
}
