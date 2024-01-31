"use client";

import Image from "next/image";
import { FC } from "react";

import {
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
          style={{ objectFit: "contain" }}
          unoptimized
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
          style={{ objectFit: "contain" }}
          unoptimized
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

type ItemListProps = {
  items: Media[];
};

const ItemList: FC<ItemListProps> = ({ items }) => {
  return (
    <div className="mt-4 container mx-auto flex flex-col gap-4 items-center">
      <div className="text-sm sm:text-base">
        The photos are loaded with the highest quality. Tap to open and download the photo or video.
      </div>
      <ul className="flex flex-col gap-4 items-center">{items.map((item, index) => (
        <ItemCard key={index} item={item} />
      ))}</ul>
      <button
        className="p-1.5 text-white bg-slate-400 hover:bg-slate-500 text-xs rounded-md"
        onClick={() => history.back()}
      >Back</button>
    </div>
  );
};

export default ItemList;