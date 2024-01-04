"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { SearchSection } from "@/components/sections";

export async function getStatisPaths() {
  return {
    paths: [
      { params: { platform: "instagram" } },
      { params: { platform: "threads" } },
      { params: { platform: "twitter" } },
    ],
    fallback: false,
  }
}

type Props = {
  params: { platform: string };
};

export default function Downloader({ params }: Props) {
  const platform = params.platform;
  return (
    <main>
      <Navbar />
      <SearchSection selectedPlatform={platform} />
      <Footer />
    </main>
  )
}
