"use client";

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
  getGalleryAlbumBySlug,
  getGalleryAlbumSlugs,
  urlFor,
} from "@/lib/sanity";

export default function GalleryAlbum({ album }) {
  const [selectedImage, setSelectedImage] = useState(-1);
  if (!album) return null;

  const images = (album.images ?? []).filter((image) => image.imageUrl);
  const lightboxSlides = images.map((image, index) => ({
    src: image.imageUrl,
    alt: `${album.title} photo ${index + 1}`,
  }));

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
        imageUrl={album.coverUrl}
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
            {images.map((image, index) => (
              <figure
                key={image._key ?? index}
                className="overflow-hidden rounded-md"
              >
                <button
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className="block h-full w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
                  aria-label={`Open photo ${index + 1}`}
                >
                  <img
                    src={urlFor(image).format("webp").url()}
                    alt={`${album.title} photo ${index + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </button>
              </figure>
            ))}
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
        index={selectedImage}
        slides={lightboxSlides}
        carousel={{ finite: false }}
        plugins={[Thumbnails]}
        thumbnails={{
          position: "bottom",
          width: 146,
          height: 128,
          border: 0,
          borderRadius: 6,
          padding: 0,
          gap: 8,
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
