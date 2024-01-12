type InstagramDisplayResource = {
    src: string;
    config_width: number;
    config_height: number;
};

type InstagramImage = {
    platform: "instagram";
    type: "image";
    display_resources: InstagramDisplayResource[];
};

type InstagramVideo = {
    platform: "instagram";
    type: "video";
    dimensions: {
        height: number;
        width: number;
    };
    display_resources: InstagramDisplayResource[];
    video_url: string;
};

type InstagramMedia = InstagramImage | InstagramVideo;

type ThreadsImage = {
    platform: "threads";
    type: "image";
    original_width: number;
    original_height: number;
    image_versions2: {
        candidates: {
            url: string;
            width?: number;
            height?: number;
            "__typename"?: string;
        }[];
    };
};

type ThreadsVideo = {
    platform: "threads";
    type: "video";
    original_width: number;
    original_height: number;
    video_versions: {
        type: number;
        url: string;
        "__typename": string;
    }[];
    image_versions2: {
        candidates: {
            url: string;
            width?: number;
            height?: number;
            "__typename"?: string;
        }[];
    };
};

type ThreadsMedia = ThreadsImage | ThreadsVideo;

type TwitterPhoto = {
    platform: "twitter";
    type: "image";
    media_url_https: string;
    small_media_url_https: string;
    medium_media_url_https: string;
    large_media_url_https: string;
    original_media_url_https: string;
    original_info: {
        width: number;
        height: number;
    };
};

type TwitterVideo = {
    platform: "twitter";
    type: "video";
    media_url_https: string;
    small_media_url_https: string;
    medium_media_url_https: string;
    large_media_url_https: string;
    original_media_url_https: string;
    original_info: {
        width: number;
        height: number;
    };
    additional_media_info: any;
    video_info: {
        duration_millis: number;
        aspect_ratio: number[];
        variants: {
            bitrate?: number;
            content_type: string;
            url: string;
        }[];
    };
};

type TwitterMedia = TwitterPhoto | TwitterVideo;

type Media = InstagramMedia | ThreadsMedia | TwitterMedia;

interface BasePost {
    updated_at: string;
    platform: string;
    media_source: (Media | null)[];
}

interface TwitterPost extends BasePost {
    platform: "twitter";
    user: string;
    tweet_id: string;
    media_source: TwitterMedia[];
};

interface InstagramPost extends BasePost {
    platform: "instagram";
    shortcode: string;
    media_source: InstagramMedia[];
};

interface ThreadsPost extends BasePost {
    platform: "threads";
    user: string;
    code: string;
    post_id: string;
    media_source: ThreadsMedia[];
};

type Post = TwitterPost | InstagramPost | ThreadsPost;
