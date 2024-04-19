"use client";

import { FC } from "react";
import { InstagramLogo, ThreadsLogo, XLogo } from "@phosphor-icons/react";
import Link from "next/link";

const getLogoClassName = (active: boolean) => {
    return `rounded-lg p-0.5 shadow ${active ? "text-[#313131] cursor-default" : "hover:bg-slate-100"}`;
}

type FeaturesProps = {
    selectedPlatform?: string;
};

const Features: FC<FeaturesProps> = ({ selectedPlatform }) => (
    <div className="mt-12 mb-12 container mx-auto">
        <h2 className="text-xl font-semibold text-center">Supported platforms</h2>
        <div className="mt-4 flex gap-2 text-slate-400 justify-center">
            <Link href="/twitter">
                <XLogo size={36} weight="fill" className={getLogoClassName(selectedPlatform === "twitter")} />
            </Link>
            <Link href="/instagram">
                <InstagramLogo size={36} weight="fill" className={getLogoClassName(selectedPlatform === "instagram")} />
            </Link>
            <Link href="/threads">
                <ThreadsLogo size={36} weight="fill" className={getLogoClassName(selectedPlatform === "threads")} />
            </Link>
        </div>
        <div className="mt-4 mx-auto max-w-[630px] text-sm text-slate-500">
            <span>.jpg supports X (Twitter) posts (tweets) and Instagram posts and reels. </span>
            <span>Please note that Threads changed their API recently and it disrupted the data retrieval. </span>
        </div>
    </div>
);

export default Features;
