import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metatags from "@/components/Metatags";
import { getGalleryAlbums, getPage, sanityImage } from "@/lib/sanity";

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
            {albums.map((album) => {
              const cover = sanityImage(album.cover);
              return (
                <Link
                  key={album._id}
                  href={`/gallery/${album.slug.current}`}
                  className="group overflow-hidden rounded-md"
                >
                  {cover ? (
                    <img
                      src={cover}
                      alt={album.title}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
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
