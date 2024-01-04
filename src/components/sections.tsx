import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import {
  capitalize,
  findHighestQualityInstagramDisplayResource,
  findHighestQualityThreadsImage,
  findHighestQualityThreadsVideo,
  findHighestQualityTwitterVideo,
  isInstagramImage,
  isInstagramVideo,
  isThreadsImage,
  isThreadsVideo,
  isTwitterPhoto,
  isTwitterVideo,
} from "../utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getPreviewProps = (item: Media) => {
  if (isInstagramImage(item)) {
    const resource = findHighestQualityInstagramDisplayResource(item);
    return {
      src: resource.src,  // TODO: get the highest quality
      url: resource.src,
      width: resource.config_width,
      height: resource.config_height,
    };
  } else if (isInstagramVideo(item)) {
    const resource = findHighestQualityInstagramDisplayResource(item);
    return {
      src: resource.src,
      url: item.video_url,
      width: resource.config_width,
      height: resource.config_height,
    };
  } else if (isThreadsImage(item)) {
    const candidate = findHighestQualityThreadsImage(item);
    return {
      src: candidate.url,
      url: candidate.url,
      width: candidate.width,
      height: candidate.height,
    };
  } else if (isThreadsVideo(item)) {
    const imageCandidate = findHighestQualityThreadsImage(item);
    const videoCandidate = findHighestQualityThreadsVideo(item);
    return {
      src: imageCandidate.url,
      url: videoCandidate.url,
      width: imageCandidate.width,
      height: imageCandidate.height,
    };
  } else if (isTwitterPhoto(item)) {
    return {
      src: item.original_media_url_https,
      url: item.original_media_url_https,
      width: item.original_info.width,
      height: item.original_info.height,
    };
  } else if (isTwitterVideo(item)) {
    const variant = findHighestQualityTwitterVideo(item);
    return {
      src: item.original_media_url_https,
      url: variant.url,
      width: item.original_info.width,
      height: item.original_info.height,
    };
  } else {
    throw new Error("Invalid item type");
  }
};

type ItemCardProps = {
  item: Media;
};

const ItemCard: FC<ItemCardProps> = ({ item }) => {
  const isImage = item.type === "image";
  const { src, url, width, height } = getPreviewProps(item);
  return (
    <li className="relative w-full sm:w-[360px] p-4 flex flex-col gap-2 items-center border border-slate-300 rounded-lg">
      {isImage ? (
        <Image
          src={src}
          width={width}
          height={height}
          alt="Item Card"
          objectFit="contain"
        />
      ) : (
        // <video
        //   src={src}
        //   width={width}
        //   height={height}
        //   controls
        //   crossOrigin="anonymous"
        // />
        <Image
          src={src}
          width={width}
          height={height}
          alt="Item Card"
          objectFit="contain"
        />
      )}
      <div className="text-slate-500 text-xs">{width}x{height}</div>
      <a
        className="p-1.5 text-white bg-slate-400 hover:bg-slate-500 text-xs rounded-md"
        href={url}
        target="_blank"
      >Open {isImage ? "photo" : "video"}</a>
    </li>
  )
};

type SearchSectionProps = {
  selectedPlatform?: string;
}

export const SearchSection: FC<SearchSectionProps> = ({ selectedPlatform }) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Media[]>([]);

  // useEffect(() => {
  //   setResult(mockThreadsVideo);
  // }, []);

  const title = selectedPlatform ? `${capitalize(selectedPlatform)} Downloader` : ".jpg";
  const description = selectedPlatform ? `Download ${capitalize(selectedPlatform)} photos and videos` : "Download photos and videos";

  return (
    <div className="flex flex-col">
      <div className="pt-8 pb-10 sm:pb-20 w-full bg-slate-100">
        <div className="container mx-auto flex flex-col items-center gap-3">
          <ul className="grid grid-cols-3 border border-slate-100 rounded-md divide-x divide-slate-100 
            text-white bg-slate-300 text-sm sm:text-base">
            <li className="flex items-center justify-center">
              <Link
                className="grow text-center px-2 sm:px-4 py-1"
                href="/twitter"
              >Twitter</Link>
            </li>
            <li className="flex items-center justify-center">
              <Link
                className="grow text-center px-2 sm:px-4 py-1"
                href="/instagram"
              >Instagram</Link>
            </li>
            <li className="flex items-center justify-center">
              <Link
                className="grow text-center px-2 sm:px-4 py-1"
                href="/threads"
              >Threads</Link>
            </li>
          </ul>
          <h1 className="mt-4 sm:mt-12 text-3xl font-bold">{title}</h1>
          <p className="text-slate-600">{description}</p>
          <div className="mt-2 flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative">
              <input
                className="border border-slate-300 rounded-md px-4 py-2 w-full sm:w-[400px]"
                type="text"
                placeholder="Paste the URL here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="absolute top-1.5 right-2 text-white bg-slate-400 hover:bg-slate-500 border 
                  border-slate-400 rounded-md px-2 p-1 text-sm"
                onClick={() => {
                  navigator.clipboard.readText()
                    .then((text) => setInput(text));
                }}
              >Paste</button>
            </div>
            <button
              className="text-white bg-slate-400 hover:bg-slate-500 rounded-md px-4 p-2"
              onClick={() => {
                const url = selectedPlatform ? new URL(API_URL + "/" + selectedPlatform) : new URL(API_URL + "/auto");
                url.searchParams.append("url", input);
                setIsLoading(true);
                fetch(url.toString())
                  .then((res) => {
                    console.log(res);
                    return res.json();
                  })
                  .then((data) => {
                    console.log(data);
                    setResult(data["result"]["media_source"]);
                  })
                  .finally(() => {
                    setIsLoading(false);
                  });
              }}
            >Download</button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="mt-4 container mx-auto flex flex-col gap-2 sm:gap-3 items-center">
          <div className="w-[32px] sm:w-[48px]">
            <Image className="mt-8" src="/mona-loading-default-c3c7aad1282f.gif" alt="Loading" width={384} height={384} />
          </div>
          <div className="ml-3 mb-8 text-[#444d56] text-sm sm:text-base">Searching for photos and videos...</div>
        </div>
      ) : result.length > 0 && (
        <div className="mt-4 container mx-auto flex flex-col gap-4 items-center">
          <div className="text-sm sm:text-base">
            The photos are loaded with the highest quality. Tap to open and download the photo or video.
          </div>
          <ul className="flex flex-col gap-4 items-center">{result.map((item, index) => (
            <ItemCard key={index} item={item} />
          ))}</ul>
        </div>
      )}
    </div>
  );
};
