import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metatags from "@/components/Metatags";
import { getGalleryAlbums, getPage, sanityImageProps } from "@/lib/sanity";

const COVER_IMAGE = {
  widths: [480, 640, 960],
  aspectRatio: 4 / 3,
  quality: 65,
  sizes: "(min-width: 1400px) 440px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw",
};

export default function Gallery({ page, albums }) {
  return (
    <main className="bg-cream">
      <Metatags
        title={
          page?.metaTitle ||
          page?.title ||
          "Gallery | Crescent Village"
        }
        description={
          page?.metaDescription ||
          page?.description ||
          "Browse photo albums from Crescent Village — community moments, events, and residence life."
        }
        canonicalLink="/gallery"
      />
      <Navbar active="Gallery" />
      <section className="mx-auto max-w-[1400px] px-5 py-8 md:px-10 lg:py-20">
        <h1 className="font-title">{page?.title || "Gallery"}</h1>
        {albums.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
            {albums.map((album, index) => {
              const cover = sanityImageProps(album.cover, COVER_IMAGE);
              // The first row is on screen immediately, so don't lazy-load it.
              const firstRow = index < 3;
              return (
                <Link
                  key={album._id}
                  href={`/gallery/${album.slug.current}`}
                  className="group overflow-hidden rounded-md"
                >
                  {cover ? (
                    // Blurred preview shows instantly while the cover loads.
                    <div className="relative overflow-hidden bg-sand">
                      {album.coverPreview && (
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 scale-110 bg-cover bg-center blur-md"
                          style={{ backgroundImage: `url("${album.coverPreview}")` }}
                        />
                      )}
                      <img
                        {...cover}
                        alt={album.title}
                        loading={firstRow ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : undefined}
                        decoding="async"
                        className="relative aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] w-full bg-sand" />
                  )}
                  <div className="bg-sand px-6 py-4">
                    <h3 className="font-card-title">{album.title}</h3>
                    <p className="font-subtext mt-1 text-[15px]">
                      {album.imageCount || 0}{" "}
                      {album.imageCount === 1 ? "photo" : "photos"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="mt-10 font-subtext text-[15px] text-[#1D1E22]">
            No gallery albums are available yet.
          </p>
        )}
      </section>
      <Footer />
    </main>
  );
}

export async function getStaticProps() {
  const [page, albums] = await Promise.all([
    getPage("galleryPage"),
    getGalleryAlbums(),
  ]);

  return {
    props: {
      page: page ?? null,
      albums: albums ?? [],
    },
    revalidate: 60,
  };
}
