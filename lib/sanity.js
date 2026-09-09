import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5te6fb6b",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-02-19",
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

export const sanityImage = (source) =>
  source ? builder.image(source).auto("format").url() : null;

const imageProjection = `
  image,
  "imageUrl": image.asset->url,
`;

const fileProjection = `
  file,
  "fileUrl": file.asset->url,
  "fileSize": file.asset->size,
  "fileName": file.asset->originalFilename,
`;

export async function getSingleton(type) {
  return sanityClient.fetch(`*[_id == $id][0]`, { id: type });
}

export async function getPage(type) {
  return sanityClient.fetch(`*[_type == $type][0]`, { type });
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

export async function getGalleryImages() {
  return sanityClient.fetch(
    `*[_id == "galleryPage"][0].images[]{..., "imageUrl": asset->url}`,
  );
}
