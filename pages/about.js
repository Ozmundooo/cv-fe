import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metatags from "@/components/Metatags";
import ImpactGrid from "@/components/ImpactGrid";
import AwardsSection from "@/components/AwardsSection";
import TeamGrid from "@/components/TeamGrid";
import Link from "next/link";
import { Calendar } from "lucide-react";
import {
  getPage,
  getNews,
  sanityImage,
  sanityImageProps,
} from "@/lib/sanity";

const HERO_IMAGE = {
  widths: [480, 800, 1200, 1600],
  sizes: "(min-width: 840px) 800px, 100vw",
};

const impactPalette = [
  "bg-sand text-[#1D1E22]",
  "bg-[#839B78] text-cream",
  "bg-terracotta text-cream",
];

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function About({ page, news }) {
  const heroImage = sanityImageProps(page?.heroImage, HERO_IMAGE);
  const impactItems = (page?.impactItems ?? []).map((item, index) => ({
    ...item,
    className: impactPalette[index % impactPalette.length],
  }));
  const awards = (page?.awards ?? []).map((award) => ({
    ...award,
    imageUrl: sanityImage(award.image),
  }));
  const board = page?.board ?? [];
  const team = page?.team ?? [];

  return (
    <main>
      <Metatags
        title={page?.metaTitle || page?.title || "About Us | Crescent Village"}
        description={
          page?.metaDescription ||
          page?.description ||
          "Learn about Crescent Village's mission, impact, leadership, and the team building a supportive, connected community."
        }
        canonicalLink="/about"
        imageUrl={sanityImage(page?.heroImage, 1200)}
      />
      <Navbar active="" />
      <section className="mx-auto max-w-[1400px] px-5 py-8 md:px-10 lg:py-20">
        <h1 className="font-about-hero-title text-center">
          {page?.title ||
            "It's about creating a community where people feel supported, connected, and empowered to thrive together."}
        </h1>
        {heroImage && (
          <img
            {...heroImage}
            alt="About Crescent Village"
            fetchPriority="high"
            decoding="async"
            className="mx-auto mt-8 max-w-[800px] w-full"
          />
        )}
      </section>
      {(page?.missionVisionValues ?? []).length > 0 && (
        <section className="mx-auto max-w-[1400px] my-8 lg:my-20 px-5 md:px-10">
          <div className="space-y-12">
            {page.missionVisionValues.map(({ title, description }, index) => (
              <div
                key={title ?? index}
                className="grid grid-cols-1 gap-4 lg:grid-cols-3"
              >
                <div className="flex gap-2">
                  <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
                  <h2 className="font-about-mvv-titles">{title}</h2>
                </div>
                <p className="font-about-mvv-description lg:col-span-2">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
      {impactItems.length > 0 && (
        <section className="mx-auto my-8 lg:my-20 max-w-[1400px] px-5 md:px-10">
          <div className="flex gap-2">
            <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
            <h2 className="font-about-mvv-titles">Our Impact</h2>
          </div>
          <div className="mt-8">
            <ImpactGrid items={impactItems} />
          </div>
        </section>
      )}
      {awards.length > 0 && (
        <section className="mx-auto my-8 lg:my-20 max-w-[1400px] px-5 md:px-10">
          <AwardsSection awards={awards} />
        </section>
      )}
      {board.length > 0 && (
        <section className="mx-auto mt-16 lg:mt-40 max-w-[1400px] px-5 md:px-10">
          <div className="flex gap-2">
            <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
            <h2 className="font-about-mvv-titles">Board of Directors</h2>
          </div>
          <h2 className="font-team-heading mt-8">
            {page?.boardHeading || "Leadership & Governance"}
          </h2>
          {page?.boardIntro && (
            <p className="font-team-intro mt-5 max-w-[622px]">
              {page.boardIntro}
            </p>
          )}
          <TeamGrid people={board} groupLabel="Board of Directors" />
        </section>
      )}
      {team.length > 0 && (
        <section className="mx-auto mt-16 lg:mt-40 max-w-[1400px] px-5 md:px-10">
          <div className="flex gap-2">
            <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
            <h2 className="font-about-mvv-titles">Our Team</h2>
          </div>
          <h2 className="font-team-heading mt-8">
            {page?.teamHeading || "The People Behind Crescent Village"}
          </h2>
          {page?.teamIntro && (
            <p className="font-team-intro mt-5 max-w-[622px]">
              {page.teamIntro}
            </p>
          )}
          <TeamGrid people={team} groupLabel="Our Team" />
        </section>
      )}
      {news.length > 0 && (
        <section className="mx-auto mt-16 lg:mt-40 mb-30 max-w-[1400px] px-5 md:px-10">
          <h2 className="font-team-heading mt-8">
            Latest News & Community Updates
          </h2>
          <p className="font-team-intro mt-5 max-w-[622px]">
            Stay informed with the latest announcements, community stories,
            upcoming events, and important updates from across Crescent Village.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 ">
            {news.map((article) => (
              <Link
                href={`/news/${article.slug?.current}`}
                key={article._id}
                className=" group bg-[#FFFFFF] relative"
              >
                {article.type && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-terracotta rounded">
                    <span className="font-card-news-type  text-white">
                      {article.type}
                    </span>
                  </div>
                )}
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    loading="lazy"
                    className="w-full m-auto"
                  />
                )}
                <div className="py-6 px-8 bg-sand group-hover:bg-sand/80 transition-all duration-150 ease-in-out">
                  {article.publishedAt && (
                    <div className="flex items-center mb-2">
                      <Calendar
                        className="inline-block mr-2"
                        size={20}
                        strokeWidth={1}
                      />
                      <p className="font-card-date">
                        {formatDate(article.publishedAt)}
                      </p>
                    </div>
                  )}
                  <h2 className="font-card-title lg:w-3/4">{article.title}</h2>
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

export async function getStaticProps() {
  const [page, news] = await Promise.all([getPage("aboutPage"), getNews()]);

  return {
    props: {
      page: page ?? null,
      news: (news ?? []).slice(0, 2),
    },
    revalidate: 60,
  };
}
