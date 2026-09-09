"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { getGalleryImages, getPage, urlFor } from "@/lib/sanity";

export default function Gallery({ page, images }) {
  const [selectedImage, setSelectedImage] = useState(-1);

  const lightboxSlides = images.map((image, index) => ({
    src: image.imageUrl,
    alt: `Crescent Village community moment ${index + 1}`,
  }));

  return (
    <main className="bg-cream">
      <Navbar active="Gallery" />
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 lg:py-20">
        <h1 className="font-title">{page?.title || "Gallery"}</h1>
        {images.length > 0 ? (
          <div className="mt-4 lg:mt-10 grid  grid-cols-2 gap-2  md:grid-cols-4 ">
            {images.map((image, index) => (
              <figure
                key={image._key ?? index}
                className="overflow-hidden rounded-md"
              >
                <button
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className="block h-full w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
                  aria-label={`Open community moment ${index + 1}`}
                >
                  <img
                    src={urlFor(image.imageUrl).format("webp").url()}
                    alt={`Crescent Village community moment ${index + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </button>
              </figure>
            ))}
          </div>
        ) : (
          <p className="mt-10 font-subtext text-[15px] text-[#1D1E22]">
            No gallery images are available yet.
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

export async function getStaticProps() {
  const [page, images] = await Promise.all([
    getPage("galleryPage"),
    getGalleryImages(),
  ]);

  return {
    props: {
      page: page ?? null,
      images: images ?? [],
    },
    revalidate: 60,
  };
}
