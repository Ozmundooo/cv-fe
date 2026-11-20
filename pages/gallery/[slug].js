import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metatags from "@/components/Metatags";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import {
  GALLERY_PREVIEW_COUNT,
  getGalleryAlbumBySlug,
  getGalleryAlbumSlugs,
  sanityImage,
  sanityImageProps,
  sanityImageUrl,
} from "@/lib/sanity";

// `sizes` mirrors the grid: 2 columns on phones, 4 from md, capped by the
// 1400px container. Quality 60 is indistinguishable at thumbnail size and
// ~17% lighter.
const GRID_IMAGE = {
  widths: [360, 480, 640, 720],
  aspectRatio: 4 / 3,
  quality: 60,
  sizes: "(min-width: 1400px) 324px, (min-width: 768px) calc(25vw - 26px), calc(50vw - 24px)",
};
const SLIDE_WIDTHS = [640, 1080, 1600, 2400];
// Only the first photos are loaded eagerly at high priority; the rest
// lazy-load as you scroll.
const HIGH_PRIORITY_COUNT = 4;

// Width/height of the image after any editor crop, so the lightbox can
// lay slides out at the right aspect ratio before they finish loading.
function croppedSize(image) {
  if (!image.width || !image.height) return null;
  const { left = 0, right = 0, top = 0, bottom = 0 } = image.crop ?? {};
  return {
    width: Math.round(image.width * (1 - left - right)),
    height: Math.round(image.height * (1 - top - bottom)),
  };
}

// The lightbox picks the smallest srcSet entry that fills the screen, so
// phones get ~1080px images instead of 4000px+ camera originals.
function toSlide(image, alt) {
  const size = croppedSize(image);
  const largest = SLIDE_WIDTHS[SLIDE_WIDTHS.length - 1];
  const maxWidth = size ? Math.min(size.width, largest) : largest;
  const widths = [...SLIDE_WIDTHS.filter((width) => width < maxWidth), maxWidth];
  const heightFor = (width) =>
    size ? Math.round((width * size.height) / size.width) : undefined;

  return {
    alt,
    src: sanityImageUrl(image, { width: Math.min(1600, maxWidth) }),
    width: size ? maxWidth : undefined,
    height: heightFor(maxWidth),
    thumbnail: sanityImageUrl(image, { width: 300 }),
    srcSet: widths.map((width) => ({
      src: sanityImageUrl(image, { width }),
      width,
      height: heightFor(width),
    })),
  };
}

// While a lightbox slide's full-size image loads (YARL keeps it at opacity 0
// with the `yarl__slide_image_loading` class), show the small thumbnail
// already fetched for the thumbnail strip instead of a black screen.
function SlideWithPlaceholder({ slide, children }) {
  return (
    <div className="gallery-slide relative flex h-full w-full items-center justify-center">
      {slide.thumbnail && (
        <div
          aria-hidden="true"
          className="gallery-slide-placeholder pointer-events-none absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${slide.thumbnail}")` }}
        />
      )}
      {children}
    </div>
  );
}

const lightboxRender = { slideContainer: SlideWithPlaceholder };

export default function GalleryAlbum({ album }) {
  const [selectedImage, setSelectedImage] = useState(-1);
  if (!album) return null;

  const images = (album.images ?? [])
    .map((image, index) => ({ ...image, preview: album.previews?.[index] }))
    .filter((image) => image.asset);
  const photoAlt = (index) => `${album.title} photo ${index + 1}`;
  const lightboxSlides = images.map((image, index) =>
    toSlide(image, photoAlt(index)),
  );

  return (
    <main className="bg-cream">
      <Metatags
        title={
          album.metaTitle ||
          (album.title ? `${album.title} | Crescent Village Gallery` : "Gallery | Crescent Village")
        }
        description={
          album.metaDescription ||
          album.description ||
          "Browse this Crescent Village photo album."
        }
        canonicalLink={`/gallery/${album.slug?.current ?? ""}`}
        imageUrl={sanityImage(album.cover, 1200)}
      />
      <Navbar active="Gallery" />
      <section className="mx-auto max-w-[1400px] px-5 py-8 md:px-10 lg:py-20">
        <Link href="/gallery" className="font-subtext text-[15px] underline">
          &larr; All albums
        </Link>
        <h1 className="font-title mt-4">{album.title}</h1>
        {album.description && (
          <p className="font-subtext mt-4 max-w-[700px]">{album.description}</p>
        )}
        {images.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4 lg:mt-10">
            {images.map((image, index) => {
              const onFirstScreen = index < GALLERY_PREVIEW_COUNT;

              return (
                // Until the photo arrives, the tile shows a blurred preview
                // (first screen) or the photo's dominant colour.
                <figure
                  key={image._key ?? index}
                  className="relative overflow-hidden rounded-md bg-sand"
                  style={image.color ? { backgroundColor: image.color } : undefined}
                >
                  {image.preview && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 scale-110 bg-cover bg-center blur-md"
                      style={{ backgroundImage: `url("${image.preview}")` }}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className="relative block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
                    aria-label={`Open photo ${index + 1} of ${images.length}`}
                  >
                    <img
                      {...sanityImageProps(image, GRID_IMAGE)}
                      alt={photoAlt(index)}
                      loading={onFirstScreen ? "eager" : "lazy"}
                      fetchPriority={index < HIGH_PRIORITY_COUNT ? "high" : undefined}
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                    />
                  </button>
                </figure>
              );
            })}
          </div>
        ) : (
          <p className="mt-10 font-subtext text-[15px] text-[#1D1E22]">
            This album has no photos yet.
          </p>
        )}
      </section>
      <Footer />
      <Lightbox
        open={selectedImage >= 0}
        close={() => setSelectedImage(-1)}
        index={Math.max(selectedImage, 0)}
        slides={lightboxSlides}
        render={lightboxRender}
        carousel={{ finite: false, preload: 2 }}
        plugins={[Thumbnails]}
        thumbnails={{
          position: "bottom",
          width: 120,
          height: 90,
          border: 0,
          borderRadius: 6,
          padding: 0,
          gap: 8,
          imageFit: "cover",
        }}
      />
    </main>
  );
}

export async function getStaticPaths() {
  const slugs = await getGalleryAlbumSlugs();

  return {
    paths: (slugs ?? []).filter(Boolean).map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const album = await getGalleryAlbumBySlug(params.slug);

  if (!album) {
    return { notFound: true, revalidate: 60 };
  }

  return { props: { album }, revalidate: 60 };
}
