import React from "react";
import Head from "next/head";

export const SITE_URL = "https://crescentvillage.org";
export const SITE_NAME = "Crescent Village";
export const DEFAULT_TITLE = "Crescent Village";
export const DEFAULT_DESCRIPTION =
  "Crescent Village is a non-profit community supporting affordable housing, senior living, and community programs.";
// Falls back to the site logo until a dedicated 1200x630 /public/ogimage.png is added.
const DEFAULT_OG_IMAGE = "/web-app-manifest-512x512.png";

function absoluteUrl(path) {
  const base = (process.env.NEXT_PUBLIC_BASE_URL || SITE_URL).replace(/\/$/, "");
  if (!path) return base;
  if (/^https?:\/\//i.test(path)) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Shared SEO/social metatags. Pass page-specific values; every prop falls
 * back to a sensible site-wide default so every page renders complete tags
 * even when its Sanity content hasn't been filled in yet.
 */
export default function Metatags({
  title,
  description,
  keywords,
  noIndex,
  canonicalLink = "/",
  imageUrl,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
}) {
  const resolvedTitle = title || DEFAULT_TITLE;
  const resolvedDescription = description || DEFAULT_DESCRIPTION;
  const url = absoluteUrl(canonicalLink);
  const image = absoluteUrl(imageUrl || DEFAULT_OG_IMAGE);

  return (
    <Head>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="robots"
        content={
          noIndex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <meta
        name="googlebot"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />
      <meta httpEquiv="Content-Type" content="text/html; charSet=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content={author || SITE_NAME} />
      <meta charSet="utf-8" />

      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {author && <meta property="article:author" content={author} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_NAME} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={image} />

      <meta itemProp="name" content={resolvedTitle} />
      <meta itemProp="url" content={url} />
      <meta itemProp="description" content={resolvedDescription} />
      <meta itemProp="image" content={image} />
    </Head>
  );
}
