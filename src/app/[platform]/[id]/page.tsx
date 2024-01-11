import Footer from "@/components/footer";
import ItemList from "@/components/itemlist";
import Navbar from "@/components/navbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getData(platform: string, id: string): Promise<Post> {
  const url = `${API_URL}/results/${platform}/${id}`;
  return fetch(url)
    .then((res) => res.json());
}

type Props = {
  params: {
    platform: string;
    id: string;
  };
};

export default async function Downloader({ params }: Props) {
  const { platform, id } = params;
  const result = await getData(platform, id);
  const items = result.media_source;
  return (
    <main>
      <Navbar />
      <ItemList items={items} />
      <Footer />
    </main>
  )
}
