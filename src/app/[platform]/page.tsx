import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import FAQ from "@/components/faq";
import Tutorial from "@/components/tutorial";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { platform: "instagram" },
    { platform: "threads" },
    { platform: "twitter" },
  ];
}

type Props = {
  params: { platform: string };
};

export default function Downloader({ params }: Props) {
  const platform = params.platform;
  return (
    <main>
      <Navbar />
      <Hero selectedPlatform={platform} />
      <Tutorial />
      <FAQ platform={platform} />
      <Footer />
    </main>
  )
}
