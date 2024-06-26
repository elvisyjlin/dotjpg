"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { capitalize } from "../utils";
import MessageModal from "./modal";
import { X } from "@phosphor-icons/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getTabClassName = (active: boolean) => {
  return `grow text-center px-2 sm:px-4 py-1 transition-colors ${active ? "bg-[#313131] cursor-default" : "hover:bg-slate-400"}`;
}

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
  };

  return (
    <div className="flex flex-col">
      <div className="pt-8 pb-10 sm:pb-20 w-full bg-slate-100">
        <div className="container mx-auto flex flex-col items-center gap-3">
          <ul className="grid grid-cols-3 border border-slate-100 rounded-md divide-x divide-slate-100 
            text-white bg-slate-300 text-sm sm:text-base overflow-hidden">
            <li className="flex items-center justify-center">
              <Link
                className={getTabClassName(selectedPlatform === "twitter")}
                href="/twitter"
              >Twitter</Link>
            </li>
            <li className="flex items-center justify-center">
              <Link
                className={getTabClassName(selectedPlatform === "instagram")}
                href="/instagram"
              >Instagram</Link>
            </li>
            <li className="flex items-center justify-center ">
              <Link
                className={getTabClassName(selectedPlatform === "threads")}
                href="/threads"
              >Threads</Link>
            </li>
          </ul>
          <h1 className="mt-4 sm:mt-12 text-3xl font-bold">{title}</h1>
          <p className="text-slate-600">{description}</p>
          <form className="mt-2 flex flex-col sm:flex-row gap-2 w-full sm:w-auto" onSubmit={handleSubmit}>
            <div className="relative overflow-hidden">
              <input
                className="px-4 py-2 w-full border border-slate-300 rounded-md sm:w-[400px] disabled:text-slate-400 disabled:bg-white"
                type="text"
                placeholder={placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button
                className={`absolute top-1.5 right-[4.35rem] text-slate-400 bg-white border border-slate-400 
                  hover:text-slate-800 hover:bg-slate-50 hover:border-slate-800 rounded-md text-sm p-1.5 transition-colors
                  disabled:opacity-50 disabled:hover:text-slate-400 disabled:hover:bg-white disabled:hover:border-slate-400 disabled:hover:cursor-not-allowed
                  transition-transform ${input === "" ? "scale-0" : "scale-100"}`}
                onClick={(e) => {
                  e.preventDefault();
                  setInput("");
                }}
                disabled={isLoading}
              >
                <X size={16} />
              </button>
              <button
                className="absolute top-1.5 right-2 text-white bg-slate-400 hover:bg-slate-500
                  disabled:opacity-50 disabled:hover:bg-slate-400 disabled:hover:cursor-not-allowed
                  border border-slate-400 rounded-md px-2 p-1 text-sm transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.readText()
                    .then((text) => setInput(text));
                }}
                disabled={isLoading}
              >Paste</button>
            </div>
            <button
              className={`${isLoading ? "px-4 py-0" : "px-4 py-2"} h-[42px] min-w-[108px] 
                text-white bg-slate-400 hover:bg-slate-500 rounded-md hover:cursor-pointer transition-colors
                disabled:opacity-50 disabled:hover:bg-slate-400 disabled:hover:cursor-not-allowed
                flex justify-center items-center gap-2`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-[28px]">
                    <Image src="/mona-loading-default-c3c7aad1282f.gif" alt="Loading" width={384} height={384} />
                  </div>
                  <div className="text-gray-700 block sm:hidden">Processing your request...</div>
                </>
              ) : "Download"}
            </button>
          </form>
        </div>
      </div>
      <MessageModal title="Error" description={errorMessage} close="Close" isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Hero;
