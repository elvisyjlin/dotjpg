"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { capitalize } from "../utils";
import MessageModal from "./modal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type HeroProps = {
  selectedPlatform?: string;
}

const Hero: FC<HeroProps> = ({ selectedPlatform }) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const title = selectedPlatform ? `${capitalize(selectedPlatform)} Downloader` : ".jpg";
  const description = selectedPlatform ? `Download ${capitalize(selectedPlatform)} photos and videos` : "Download photos and videos";
  const placeholder = selectedPlatform ? `Paste the ${capitalize(selectedPlatform)} link here` : "Paste the link here";

  const handleSubmit = (e: any) => {
    e.preventDefault();
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
        if (data["error"]) {
          setErrorMessage(data["error"]);
          setIsOpen(true);
        } else {
          window.location.href = data["result"]["result_url"];
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="flex flex-col">
      <div className="pt-8 pb-10 sm:pb-20 w-full bg-slate-100">
        <div className="container mx-auto flex flex-col items-center gap-3">
          <ul className="grid grid-cols-3 border border-slate-100 rounded-md divide-x divide-slate-100 
            text-white bg-slate-300 text-sm sm:text-base overflow-hidden">
            <li className="flex items-center justify-center">
              <Link
                className={`grow text-center px-2 sm:px-4 py-1 ${selectedPlatform === "twitter" ? "bg-[#313131] cursor-default" : "hover:bg-slate-400"}`}
                href="/twitter"
              >Twitter</Link>
            </li>
            <li className="flex items-center justify-center">
              <Link
                className={`grow text-center px-2 sm:px-4 py-1 ${selectedPlatform === "instagram" ? "bg-[#313131] cursor-default" : "hover:bg-slate-400"}`}
                href="/instagram"
              >Instagram</Link>
            </li>
            <li className="flex items-center justify-center ">
              <Link
                className={`grow text-center px-2 sm:px-4 py-1 ${selectedPlatform === "threads" ? "bg-[#313131] cursor-default" : "hover:bg-slate-400"}`}
                href="/threads"
              >Threads</Link>
            </li>
          </ul>
          <h1 className="mt-4 sm:mt-12 text-3xl font-bold">{title}</h1>
          <p className="text-slate-600">{description}</p>
          <form className="mt-2 flex flex-col sm:flex-row gap-2 w-full sm:w-auto" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                className="border border-slate-300 rounded-md px-4 py-2 w-full sm:w-[400px]"
                type="text"
                placeholder={placeholder}
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
            <input
              className="text-white bg-slate-400 hover:bg-slate-500 rounded-md px-4 p-2 hover:cursor-pointer"
              type="submit"
              value="Download"
            />
          </form>
        </div>
      </div>
      {isLoading && (
        <div className="mt-4 container mx-auto flex flex-col gap-2 sm:gap-3 items-center">
          <div className="w-[32px] sm:w-[48px]">
            <Image className="mt-8" src="/mona-loading-default-c3c7aad1282f.gif" alt="Loading" width={384} height={384} />
          </div>
          <div className="ml-3 mb-8 text-[#444d56] text-sm sm:text-base">Searching for photos and videos...</div>
        </div>
      )}
      <MessageModal title="Error" description={errorMessage} close="Close" isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Hero;
