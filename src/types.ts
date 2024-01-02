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
            width: number;
            height: number;
            "__typename": string;
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
            width: number;
            height: number;
            "__typename": string;
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
        variants: {
            bitrate: number;
            content_type: string;
            url: string;
        }[];
    };
};

type TwitterMedia = TwitterPhoto | TwitterVideo;

type Media = InstagramMedia | ThreadsMedia | TwitterMedia;
