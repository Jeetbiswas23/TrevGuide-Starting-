
export const optimizeImageUrl = (url, width = 400) => {
  // For Unsplash images
  if (url.includes('unsplash.com')) {
    return `${url}&w=${width}&q=75&fm=webp`;
  }
  return url;
};