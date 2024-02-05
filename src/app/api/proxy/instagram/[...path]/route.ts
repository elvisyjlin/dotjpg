import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const { pathname, searchParams } = url;
    const newUrl = "https://" + pathname.replace("/api/proxy/instagram/", "") + "?" + searchParams.toString();
    const proxyRes = await fetch(newUrl);
    const response = new NextResponse(proxyRes.body);
    response.headers.set("content-type", proxyRes.headers.get("content-type") ?? "");
    return response;
}