export const ALLOWED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type AllowedImageMimeType = (typeof ALLOWED_IMAGE_MIME_TYPES)[number];

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export const IMAGE_FOLDERS = [
  "cardapio/products",
  "cardapio/store/logo",
  "cardapio/store/hero",
] as const;

export type ImageFolder = (typeof IMAGE_FOLDERS)[number];

export function isAllowedImageMimeType(type: string): type is AllowedImageMimeType {
  return (ALLOWED_IMAGE_MIME_TYPES as readonly string[]).includes(type);
}

export function isValidImageFolder(folder: string): folder is ImageFolder {
  return (IMAGE_FOLDERS as readonly string[]).includes(folder);
}
