import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { SearchSection } from "@/components/sections";

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
      <SearchSection selectedPlatform={platform} />
      <Footer />
    </main>
  )
}
