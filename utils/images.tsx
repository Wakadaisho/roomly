export enum ImageSize {
  Thumbnail = "thumbnail_",
  Small = "small_",
  Medium = "medium_",
  Large = "large_",
}

export const responsiveImage = (
  url: string | null,
  size: ImageSize
): string | null => {
  if (url === null) return null;
  return url.replace(/(.+\/)(.+$)/, `$1${size}$2`);
};
