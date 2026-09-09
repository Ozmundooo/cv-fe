import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar } from "lucide-react";
import Link from "next/link";
import PortableText from "@/components/PortableText";
import {
  getNews,
  getNewsArticleBySlug,
  getNewsSlugs,
  sanityImage,
} from "@/lib/sanity";

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NewsArticle({ article, relatedArticles }) {
  if (!article) return null;

  const imageUrl = sanityImage(article.image);

  return (
    <main className="bg-cream">
      <section className="bg-sand rounded-b-md">
        <Navbar active="News" />

        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-5 pb-10 pt-16 md:px-10 lg:min-h-[600px] lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pb-[50px] lg:pt-20">
          <div className="max-w-[729px]">
            {article.type && (
              <div className="w-fit px-3 py-1 bg-terracotta rounded mb-5">
                <span className="font-card-news-type text-white">
                  {article.type}
                </span>
              </div>
            )}
            <h1 className="font-title">{article.title}</h1>

            {article.description && (
              <p className="font-subtext mt-8 max-w-[622px]">
                {article.description}
              </p>
            )}
          </div>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={article.title}
              loading="lazy"
              className="aspect-[440/512] w-full max-w-[440px] rounded-md object-cover"
            />
          )}
        </div>
      </section>

      {article.body?.length > 0 && (
        <article className="mx-auto max-w-[600px] px-5 py-20 lg:py-[60px]">
          <PortableText blocks={article.body} />
        </article>
      )}

      {relatedArticles.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-5 pb-20 lg:px-10 lg:pb-[60px]">
          <h2 className="font-title text-[48px] leading-[1.15] md:text-[64px] md:leading-[79px]">
            Related News
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {relatedArticles.map((related) => (
              <Link
                href={`/news/${related.slug?.current}`}
                key={related._id}
                className="group overflow-hidden rounded-md"
              >
                <div className="relative">
                  {related.imageUrl && (
                    <img
                      src={related.imageUrl}
                      alt={related.title}
                      loading="lazy"
                      className="aspect-[660/500] w-full object-cover"
                    />
                  )}
                  {related.type && (
                    <span className="font-card-news-type absolute right-5 top-5 rounded bg-terracotta px-3 py-1 text-white">
                      {related.type}
                    </span>
                  )}
                </div>
                <div className="bg-sand px-8 py-6 transition-colors group-hover:bg-sand/80">
                  {related.publishedAt && (
                    <div className="mb-2 flex items-center gap-2">
                      <Calendar size={20} strokeWidth={1} />
                      <time
                        className="font-card-date"
                        dateTime={related.publishedAt}
                      >
                        {formatDate(related.publishedAt)}
                      </time>
                    </div>
                  )}
                  <h3 className="font-card-title max-w-[542px]">
                    {related.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

export async function getStaticPaths() {
  const slugs = await getNewsSlugs();

  return {
    paths: (slugs ?? []).filter(Boolean).map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const [article, allNews] = await Promise.all([
    getNewsArticleBySlug(params.slug),
    getNews(),
  ]);

  if (!article) {
    return { notFound: true, revalidate: 60 };
  }

  const relatedArticles = (allNews ?? [])
    .filter((item) => item.slug?.current !== params.slug)
    .slice(0, 2);

  return {
    props: { article, relatedArticles },
    revalidate: 60,
  };
}
