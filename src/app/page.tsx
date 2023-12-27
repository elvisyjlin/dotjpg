"use client";

import { saveAs } from "file-saver";
import Image from "next/image";
import { FC, useState } from "react";
// import { mockInstagramSidecar } from "../mocks";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type InstagramImage = {
  type: string;
  display_resources: {
    src: string;
    config_width: number;
    config_height: number;
  }[];
};

type InstagramVideo = {
  type: string;
  dimensions: {
    height: number;
    width: number;
  };
  display_url: string;
  video_url: string;
};

type InstagramMedia = InstagramImage | InstagramVideo;

const isInstagramImage = (item: InstagramMedia): item is InstagramImage => {
  return item.type === "image";
};

const isInstagramVideo = (item: InstagramMedia): item is InstagramVideo => {
  return item.type === "video";
};

const getPreviewProps = (item: InstagramMedia) => {
  if (isInstagramImage(item)) {
    return {
      src: item.display_resources[item.display_resources.length - 1].src,
      url: item.display_resources[item.display_resources.length - 1].src,
      width: item.display_resources[item.display_resources.length - 1].config_width,
      height: item.display_resources[item.display_resources.length - 1].config_height,
    };
  } else if (isInstagramVideo(item)) {
    return {
      src: item.display_url,
      url: item.video_url,
      width: item.dimensions.width,
      height: item.dimensions.height,
    };
  } else {
    throw new Error("Invalid item type");
  }
};

const saveUrl = (url: string) => {
  const match = /.+\/(?<filename>\w+.[a-zA-Z0-9]+)(\?.*)?/.exec(url);
  if (!match) {
    throw new Error("Invalid URL");
  }
  const filename = match.groups?.filename;
  if (!filename) {
    throw new Error("Invalid URL");
  }
  saveAs(url, filename);
  // const a = document.createElement('a');
  // a.href = url;
  // a.download = filename;
  // a.click();
}

type ItemCardProps = {
  item: InstagramMedia;
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
      <button
        className="p-1.5 text-white bg-slate-400 hover:bg-slate-500 text-xs rounded-md"
        onClick={() => {
          saveUrl(url);
        }}
      >Download {isImage ? "photo" : "video"}</button>
    </li>
  )
};

export default function Home() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<InstagramMedia[]>([]);

  // useEffect(() => {
  //   setResult(mockInstagramSidecar);
  // }, []);

  return (
    <main>
      <nav className="container mx-auto h-16  flex items-center">
        <div>jpegs</div>
      </nav>
      <div className="flex flex-col">
        <div className="pt-8 pb-10 sm:pb-20 w-full bg-slate-100">
          <div className="container mx-auto flex flex-col items-center gap-3">
            <ul className="grid grid-cols-2 border border-slate-100 rounded-md divide-x divide-slate-100 
            text-white bg-slate-300">
              <li className="text-center px-4 py-1">Instagram</li>
              <li className="text-center px-4 py-1">Twitter</li>
            </ul>
            <h1 className="mt-4 sm:mt-12 text-3xl font-bold">jpegs</h1>
            <p className="text-slate-600">Download photos and videos</p>
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
                >Paste</button>
              </div>
              <button
                className="text-white bg-slate-400 hover:bg-slate-500 rounded-md px-4 p-2"
                onClick={() => {
                  const url = new URL(API_URL + "/jpegs");
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
          <div className="mt-4 container mx-auto flex flex-col gap-4 items-center">
            <Image className="mt-8" src="/octopus_cat.gif" alt="Loading" width={64} height={64} />
            <div className="ml-3 mb-8 text-slate-400">Searching for photos and videos...</div>
          </div>
        ) : result.length > 0 && (
          <div className="mt-4 container mx-auto flex flex-col gap-4 items-center">
            <div>
              <button
                className="p-1.5 text-white bg-slate-400 hover:bg-slate-500 text-xs rounded-md"
                onClick={() => {
                  result.forEach((item) => {
                    const { url } = getPreviewProps(item);
                    saveUrl(url);
                  });
                }}
              >Download all</button>
            </div>
            <ul className="flex flex-col gap-4 items-center">{result.map((item, index) => (
              <ItemCard key={index} item={item} />
            ))}</ul>
          </div>
        )}
      </div>
      <footer className="mt-8 mb-8 container mx-auto text-center text-slate-400 text-sm">
        <hr />
        <div className="mt-2">@ 2024 jpegs. All rights reserved.</div>
      </footer>
    </main>
  )
}
