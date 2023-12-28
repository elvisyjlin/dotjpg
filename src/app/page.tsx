"use client";

import Image from "next/image";
import { FC, useEffect, useState } from "react";
import {
  findHighestQualityInstagramDisplayResource,
  findHighestQualityTwitterVideo,
  isInstagramImage,
  isInstagramVideo,
  isTwitterPhoto,
  isTwitterVideo,
} from "../utils";
// import { mockTwitterVideo } from "../mocks";

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

export default function Home() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Media[]>([]);

  // useEffect(() => {
  //   setResult(mockTwitterVideo);
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
                  onClick={() => {
                    navigator.clipboard.readText()
                      .then((text) => setInput(text));
                  }}
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
      <footer className="mt-8 mb-8 container mx-auto text-center text-slate-400 text-sm">
        <hr />
        <div className="mt-2">@ 2024 jpegs. All rights reserved.</div>
      </footer>
    </main>
  )
}
