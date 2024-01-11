import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { capitalize } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getPostCoverPhotoProps = (post: Post) => {
  if (post.media_source[0]) {
    if (post.platform === "instagram") {
      const resource = post.media_source[0].display_resources[0];
      return {
        src: resource.src,
        url: resource.src,
        width: resource.config_width,
        height: resource.config_height,
      };
    } else if (post.platform === "threads") {
      const candidate = post.media_source[0].image_versions2.candidates[0];
      return {
        src: candidate.url,
        url: candidate.url,
        width: candidate.width,
        height: candidate.height,
      };
    } else if (post.platform === "twitter") {
      const candidate = post.media_source[0];
      return {
        src: candidate.original_media_url_https,
        url: candidate.original_media_url_https,
        width: candidate.original_info.width,
        height: candidate.original_info.height,
      };
    }
    throw new Error("Invalid platform");
  } else {
    return null;
  }
}

const getResultUrl = (post: Post): string | undefined => {
  if (post.platform === "twitter" && post.tweet_id) {
    return `/twitter/${post.tweet_id}`;
  } else if (post.platform === "instagram" && post.shortcode) {
    return `/instagram/${post.shortcode}`;
  } else if (post.platform === "threads" && post.code) {
    return `/threads/${post.code}`;
  }
  return undefined;
}

const countImages = (post: Post) => {
  return post.media_source.filter((media) => media && media.type === "image").length;
};

const countVideos = (post: Post) => {
  return post.media_source.filter((media) => media && media.type === "video").length;
};

type PlatformTagProps = {
  platform: string;
};

const PlatformTag: FC<PlatformTagProps> = ({ platform }) => {
  return (
    <div>{capitalize(platform)}</div>
  )
};

type MediaInfo = {
  imageCount: number;
  videoCount: number;
};

const MediaInfo: FC<MediaInfo> = ({ imageCount, videoCount }) => {
  return (
    <div>
      {imageCount > 0 && <span>{imageCount} {imageCount > 1 ? "images" : "image"}</span>}
      {imageCount > 0 && videoCount > 0 && <span> and </span>}
      {videoCount > 0 && <span>{videoCount} {videoCount > 1 ? "videos" : "video"}</span>}
    </div>
  );
};

type PostCardProps = {
  post: Post;
};

const PostCardContent: FC<PostCardProps> = ({ post }) => {
  const coverPhotoProps = getPostCoverPhotoProps(post);
  return (
    <>
      <div className="relative aspect-square">
        {coverPhotoProps && (
          <Image
            src={coverPhotoProps.src}
            alt="Cover"
            style={{ objectFit: "cover" }}
            fill
          />
        )}
      </div>
      <div className="mt-1 flex justify-between">
        <PlatformTag platform={post.platform} />
        <MediaInfo imageCount={countImages(post)} videoCount={countVideos(post)} />
      </div>
      <div className="mt-1 flex justify-end">
        <div>{new Date(post.updated_at).toLocaleString()}</div>
      </div>
    </>
  );
};

const PostCard: FC<PostCardProps> = ({ post }) => {
  const resultUrl = getResultUrl(post);
  return (
    <li className={`p-4 rounded-lg border ${resultUrl ? "hover:bg-slate-50" : ""}`}>
      {resultUrl ? (
        <Link
          href={resultUrl}
        >
          <PostCardContent post={post} />
        </Link>
      ) : (
        <PostCardContent post={post} />
      )}
    </li>
  );
};

type PostGridViewProps = {
  posts: Post[];
};

const PostGridView: FC<PostGridViewProps> = ({ posts }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {posts.map((post, index) => (
        <PostCard post={post} key={index} />
      ))}
    </ul>
  );
}

async function getData(start_date?: string): Promise<Post[]> {
  let url = `${API_URL}/feeds`;
  if (start_date) {
    url += `?start_date=${start_date}`;
  }
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data["result"]);
  // return mockFeeds;
}

type Props = {
  searchParams?: {
    start_date?: string;
  };
};

export default async function Dashboard(params: Props) {
  const posts = await getData(params.searchParams?.start_date);

  return (
    <main>
      <Navbar />
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="mt-4 sm:mt-12 text-3xl font-bold">Dashboard</h1>
        <div className="w-full max-w-[1440px] mt-8">
          {posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            <PostGridView posts={posts} />
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
