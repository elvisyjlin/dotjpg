export const isInstagramImage = (item: Media): item is InstagramImage => {
    return item.platform === "instagram" && item.type === "image";
};

export const isInstagramVideo = (item: Media): item is InstagramVideo => {
    return item.platform === "instagram" && item.type === "video";
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
