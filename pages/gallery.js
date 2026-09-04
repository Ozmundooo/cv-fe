"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const galleryFileNames = [
  "IMG_6120.JPG",
  "IMG_6121.JPG",
  "IMG_6122.JPG",
  "IMG_6123.JPG",
  "IMG_6124.JPG",
  "IMG_6125.JPG",
  "IMG_6126.JPG",
  "IMG_6127.JPG",
  "IMG_6128.JPG",
  "IMG_6129.JPG",
  "IMG_6130.JPG",
  "IMG_6131.JPG",
  "IMG_6132.JPG",
  "IMG_6133.JPG",
  "IMG_6134.JPG",
  "IMG_6135.JPG",
  "IMG_6136.JPG",
  "IMG_6137.JPG",
  "IMG_6138.JPG",
  "IMG_6139.JPG",
  "IMG_6140.JPG",
  "IMG_6141.JPG",
  "IMG_6142.JPG",
  "IMG_6143.JPG",
  "IMG_6144.JPG",
  "IMG_6145.JPG",
  "IMG_6146.JPG",
  "IMG_6147.JPG",
  "IMG_6148.JPG",
  "IMG_6149.JPG",
  "IMG_6150.JPG",
  "IMG_6151.JPG",
  "IMG_6152.JPG",
  "IMG_6153.JPG",
  "IMG_6154.JPG",
  "IMG_6155.JPG",
  "IMG_6156.JPG",
  "IMG_6157.JPG",
  "IMG_6158.JPG",
  "IMG_6159.JPG",
  "IMG_6160.JPG",
  "IMG_6161.JPG",
  "IMG_6162.JPG",
  "IMG_6163.JPG",
  "IMG_6164.JPG",
  "IMG_6165.JPG",
  "IMG_6166.JPG",
  "IMG_6167.JPG",
  "IMG_6168.JPG",
  "IMG_6169.JPG",
  "IMG_6170.JPG",
  "IMG_6171.JPG",
  "IMG_6172.JPG",
  "IMG_6173.JPG",
  "IMG_6174.JPG",
  "IMG_6175.JPG",
  "IMG_6176.JPG",
  "IMG_6177.JPG",
  "IMG_6178.JPG",
  "IMG_6179.JPG",
  "IMG_6180.JPG",
  "IMG_6181.JPG",
  "IMG_6182.JPG",
  "IMG_6183.JPG",
  "IMG_6184.JPG",
  "IMG_6185.JPG",
  "IMG_6186.JPG",
  "IMG_6187.JPG",
  "IMG_6188.JPG",
  "IMG_6189.JPG",
  "IMG_6191.JPG",
  "IMG_6193.JPG",
  "IMG_6196.JPG",
  "IMG_6197.JPG",
  "IMG_6198.JPG",
  "IMG_6199.JPG",
  "IMG_6201.JPG",
  "IMG_6202.JPG",
  "IMG_6203.JPG",
  "IMG_6204.JPG",
  "IMG_6208.JPG",
  "IMG_6209.JPG",
  "IMG_6210.JPG",
  "IMG_6211.JPG",
  "IMG_6212.JPG",
  "IMG_6216.JPG",
  "IMG_6217.JPG",
  "IMG_6218.JPG",
  "IMG_6219.JPG",
  "IMG_6220.JPG",
  "IMG_6221.JPG",
  "IMG_6222.JPG",
  "IMG_6223.JPG",
  "IMG_6224.JPG",
  "IMG_6225.JPG",
  "IMG_6226.JPG",
  "IMG_6227.JPG",
  "IMG_6228.JPG",
  "IMG_6229.JPG",
  "IMG_6230.JPG",
  "IMG_6231.JPG",
  "IMG_6232.JPG",
  "IMG_6233 (1).JPG",
  "IMG_6233.JPG",
  "IMG_6323.JPG",
];

function getGalleryImages() {
  const layouts = [
    "md:col-span-2 md:row-span-2",
    "md:col-span-1 md:row-span-1",
    "md:col-span-3 md:row-span-2",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-2 md:row-span-2",
  ];

  return galleryFileNames.slice(0, 16).map((fileName, index) => ({
    image: {
      src: `/api/gallery/${encodeURIComponent(fileName)}`,
      width: 1600,
      height: 1200,
    },
  }));
}

const galleryImages = getGalleryImages();

const lightboxSlides = galleryImages.map(({ image }, index) => ({
  src: image.src,
  width: image.width,
  height: image.height,
  alt: `Crescent Village community moment ${index + 1}`,
}));

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(-1);

  return (
    <main className="bg-cream">
      <Navbar active="Gallery" />
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 lg:py-20">
        <h1 className="font-title">Gallery</h1>
        <div className="mt-10 grid  grid-cols-2 gap-2  md:grid-cols-4 ">
          {galleryImages.map(({ image, className }, index) => (
            <figure
              key={index}
              className={`overflow-hidden rounded-md ${className}`}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(index)}
                className="block h-full w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
                aria-label={`Open community moment ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`Crescent Village community moment ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  sizes=""
                />
              </button>
            </figure>
          ))}
        </div>
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
