import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5te6fb6b",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-02-19",
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source) {
  if (!source) return { url: () => "" };
  return builder.image(source);
}
// Pass a width whenever the rendered size is known: many uploads are
// straight-from-camera originals (some 7200x10800 / 20MB+), and without a
// width Sanity's CDN serves them at full resolution.
export const sanityImage = (source, width) => {
  if (!source) return null;
  const image = builder.image(source).auto("format");
  return (width ? image.width(width) : image).url();
};

/**
 * Builds a resized Sanity CDN URL. When `aspectRatio` (width / height) is
 * given, the image is cropped to it, honouring the editor's hotspot.
 */
export function sanityImageUrl(source, { width, aspectRatio, quality } = {}) {
  if (!source) return null;
  let image = builder.image(source).auto("format");
  if (width) image = image.width(width);
  if (width && aspectRatio) {
    image = image.height(Math.round(width / aspectRatio)).fit("crop");
  }
  if (quality) image = image.quality(quality);
  return image.url();
}

/**
 * Returns `src`, `srcSet` and `sizes` for a responsive <img>, so the
 * browser downloads only the resolution it actually needs.
 */
export function sanityImageProps(
  source,
  { widths = [480, 800, 1200, 1600], aspectRatio, quality, sizes = "100vw" } = {},
) {
  if (!source) return null;
  const fallbackWidth = widths[Math.floor((widths.length - 1) / 2)];
  const urlFor = (width) => sanityImageUrl(source, { width, aspectRatio, quality });

  return {
    src: urlFor(fallbackWidth),
    srcSet: widths.map((width) => `${urlFor(width)} ${width}w`).join(", "),
    sizes,
  };
}

// How many leading gallery images get a blurred preview and eager loading:
// enough to cover the first screen on phones and desktops.
export const GALLERY_PREVIEW_COUNT = 12;

// Appending "?auto=format" lets Sanity's CDN content-negotiate (based on
// the request's Accept header) and serve a modern, compressed format
// such as WebP/AVIF instead of the original (often much larger) upload,
// while leaving vector sources (e.g. SVG logos/icons) untouched.
// Note: Sanity rejects "?auto=webp" with a 400, and ignores "?format=webp".
const imageProjection = `
  "image": image,
  "imageUrl": image.asset->url + "?auto=format"
`;

const fileProjection = `
  file,
  "fileUrl": file.asset->url,
  "fileSize": file.asset->size,
  "fileName": file.asset->originalFilename,
  "fileExtension": file.asset->extension,
`;

export async function getSingleton(type) {
  return sanityClient.fetch(`*[_id == $id][0]`, { id: type });
}

// `heroMedia.video` is a sanity-plugin-mux-input field: a weak reference to a
// `mux.videoAsset` document, which holds the Mux playback ID.
export async function getPage(type) {
  return sanityClient.fetch(
    `*[_type == $type][0]{
      ...,
      heroMedia{
        image,
        "videoPlaybackId": video.asset->playbackId,
      },
    }`,
    { type },
  );
}
export function imageUrlFor(source, format) {
  const image = urlFor(source);
  return format ? image.format(format).url() : image.url();
}
export async function getPrograms() {
  return sanityClient.fetch(
    `*[_type == "program"] | order(_createdAt desc){..., ${imageProjection}}`,
  );
}

export async function getProgramBySlug(slug) {
  return sanityClient.fetch(
    `*[_type == "program" && slug.current == $slug][0]{..., ${imageProjection}}`,
    { slug },
  );
}

export async function getProgramSlugs() {
  return sanityClient.fetch(
    `*[_type == "program" && defined(slug.current)].slug.current`,
  );
}

export async function getNews() {
  return sanityClient.fetch(
    `*[_type == "newsArticle"] | order(publishedAt desc){..., ${imageProjection}}`,
  );
}

export async function getNewsArticleBySlug(slug) {
  return sanityClient.fetch(
    `*[_type == "newsArticle" && slug.current == $slug][0]{..., ${imageProjection}}`,
    { slug },
  );
}

export async function getNewsSlugs() {
  return sanityClient.fetch(
    `*[_type == "newsArticle" && defined(slug.current)].slug.current`,
  );
}

export async function getResources() {
  return sanityClient.fetch(
    `*[_type == "resource"] | order(_createdAt asc){..., ${fileProjection}}`,
  );
}

export async function getForms() {
  return sanityClient.fetch(
    `*[_type == "form"] | order(_createdAt asc){..., ${fileProjection}}`,
  );
}

export async function getGalleryAlbums() {
  return sanityClient.fetch(
    `*[_type == "galleryAlbum" && defined(slug.current)] | order(date desc, _createdAt desc){
      _id, title, slug, description, date,
      "cover": coalesce(coverImage, images[0]),
      "coverPreview": coalesce(coverImage, images[0]).asset->metadata.lqip,
      "imageCount": count(images)
    }`,
  );
}

// `color` is each photo's dominant colour, shown while it loads. `previews`
// holds tiny base64 blurred previews (~550 bytes each) for the first screen
// only, so 100+ photo albums don't bloat the page.
export async function getGalleryAlbumBySlug(slug) {
  return sanityClient.fetch(
    `*[_type == "galleryAlbum" && slug.current == $slug][0]{
      _id, title, slug, description, date, metaTitle, metaDescription,
      "cover": coalesce(coverImage, images[0]),
      images[]{
        _key, _type, asset, crop, hotspot,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "color": asset->metadata.palette.dominant.background
      },
      "previews": images[0...${GALLERY_PREVIEW_COUNT}].asset->metadata.lqip
    }`,
    { slug },
  );
}

export async function getGalleryAlbumSlugs() {
  return sanityClient.fetch(
    `*[_type == "galleryAlbum" && defined(slug.current)].slug.current`,
  );
}
