export const isInstagramImage = (item: Media): item is InstagramImage => {
    return item.platform === "instagram" && item.type === "image";
};

export const isInstagramVideo = (item: Media): item is InstagramVideo => {
    return item.platform === "instagram" && item.type === "video";
};

export const isThreadsImage = (item: Media): item is ThreadsImage => {
    return item.platform === "threads" && item.type === "image";
};

export const isThreadsVideo = (item: Media): item is ThreadsVideo => {
    return item.platform === "threads" && item.type === "video";
};

export const isTwitterPhoto = (item: Media): item is TwitterPhoto => {
    return item.platform === "twitter" && item.type === "image";
};

export const isTwitterVideo = (item: Media): item is TwitterVideo => {
    return item.platform === "twitter" && item.type === "video";
};

export const findHighestQualityInstagramDisplayResource = (item: InstagramMedia) => {
    const displayResources = item.display_resources;
    let best = displayResources[0];
    let resolution = 0;
    for (let i = 0; i < displayResources.length; i++) {
        const resource = displayResources[i];
        if (resource.config_width && resource.config_height) {
            const newResolution = resource.config_width * resource.config_height;
            if (newResolution > resolution) {
                best = resource;
                resolution = newResolution;
            }
        }
    }
    return best;
};

export const findHighestQualityThreadsImage = (item: ThreadsImage | ThreadsVideo) => {
    const candidates = item.image_versions2.candidates;
    let best = candidates[0];
    let resolution = 0;
    for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        if (candidate.width && candidate.height) {
            const newResolution = candidate.width * candidate.height;
            if (newResolution > resolution) {
                best = candidate;
                resolution = newResolution;
            }
        }
    }
    if (!best.width || !best.height) {
        // best will be the first candidate if none of them have width or height
        best.width = item.original_width;
        best.height = item.original_height;
    }
    return best;
};

export const findHighestQualityThreadsVideo = (item: ThreadsVideo) => {
    // TODO: Find highest quality video
    return {
        url: item.video_versions[0].url,
        width: item.original_width,
        height: item.original_height,
    };
};

export const findHighestQualityTwitterVideo = (item: TwitterVideo) => {
    const variants = item.video_info.variants;
    let best = variants[0];
    let bitrate = 0;
    for (let i = 0; i < variants.length; i++) {
        const variant = variants[i];
        if (variant.bitrate && variant.bitrate > bitrate) {
            best = variant;
            bitrate = variant.bitrate;
        }
    }
    return best;
};

export const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);
