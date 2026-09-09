import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImpactGrid from "@/components/ImpactGrid";
import AwardsSection from "@/components/AwardsSection";
import HomeFeatureCards from "@/components/HomeFeatureCards";
import PartnersScroller from "@/components/PartnersScroller";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import { getPage, getPrograms, getNews, sanityImage } from "@/lib/sanity";

const impactPalette = [
  "bg-sand text-[#1D1E22]",
  "bg-[#839B78] text-cream",
  "bg-terracotta text-cream",
];

const overlayTextClass = {
  sand: "text-[#1D1E22]",
  dark: "text-cream",
  gold: "text-cream",
};

const overlayButtonClass = {
  sand: "border-[#1D1E22] bg-[#1D1E22] text-white",
  dark: "border-cream bg-cream text-[#202622]",
  gold: "border-cream bg-cream text-[#202622]",
};

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Home({ home, programs, news, partners }) {
  const impactItems = (home?.impactItems ?? []).map((item, index) => ({
    ...item,
    className: impactPalette[index % impactPalette.length],
  }));

  const featureCards = (home?.featureCards ?? []).map((card, index) => ({
    ...card,
    imageUrl: sanityImage(card.image),
    contentPosition: index === 1 ? "right" : undefined,
    textClassName: overlayTextClass[card.overlay] ?? overlayTextClass.sand,
    buttonClassName:
      overlayButtonClass[card.overlay] ?? overlayButtonClass.sand,
  }));

  const awards = (home?.awards ?? []).map((award) => ({
    ...award,
    imageUrl: sanityImage(award.image),
  }));

  const partnerTiles = (partners ?? []).map((partner) => ({
    ...partner,
    imageUrl: sanityImage(partner.logo),
  }));

  return (
    <main className="relative">
      <Navbar active="Home" className="absolute inset-x-0 top-0 z-10" />
      <section className="relative min-h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={home?.heroVideo || "/homeVideo.mp4"} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-end mb-10 px-5 pt-24">
          <h1 className="font-home-hero-title max-w-[700px] text-center">
            {home?.heroTitle || "More Than Housing. A Place to Belong."}
          </h1>
          <div className="mt-10 flex flex-wrap justify-center gap-[30px]">
            <Link
              href="/about"
              className="flex h-[38px] w-[123px] items-center justify-center gap-3 rounded-md bg-green font-subtext text-[15px] font-medium tracking-[-0.04em] text-cream transition-opacity hover:opacity-90"
            >
              Learn more
              <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </Link>
            <Link
              href="/forms"
              className="flex h-[38px] w-[131px] items-center justify-center gap-2 rounded-md  bg-cream font-subtext text-[15px] font-medium tracking-[-0.04em] text-[#1D1E22] transition-opacity hover:opacity-90"
            >
              Fill out forms
              <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {home?.story && (
        <section className="mx-auto my-20 max-w-[1400px] px-5 md:px-10">
          <div className="mx-auto flex w-fit gap-2 text-center">
            <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
            <h2 className="font-about-mvv-titles">
              {home?.storyTitle || "Our Story"}
            </h2>
          </div>
          <div className="mt-8">
            <p className="font-about-mvv-description text-center">
              {home.story}
            </p>
          </div>
        </section>
      )}
      {impactItems.length > 0 && (
        <section className="mx-auto my-20 max-w-[1400px] px-5 md:px-10">
          <div className="flex gap-2 text-center w-fit mx-auto">
            <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
            <h2 className="font-about-mvv-titles">Our Impact</h2>
          </div>
          <div className="mt-8">
            <ImpactGrid items={impactItems} />
          </div>
        </section>
      )}
      <HomeFeatureCards cards={featureCards} />
      {programs.length > 0 && (
        <section className="mx-auto mt-16 lg:mt-40 lg:mb-30 max-w-[1400px] px-5 md:px-10">
          <h2 className="font-team-heading mt-8 max-w-[622px]">
            {home?.programsHeading ||
              "Programs That Bring Our Community Together"}
          </h2>
          {home?.programsIntro && (
            <p className="font-team-intro mt-5 max-w-[622px]">
              {home.programsIntro}
            </p>
          )}
          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 ">
            {programs.map((program) => (
              <Link
                href={`/programs/${program.slug?.current}`}
                key={program._id}
                className=" group bg-[#FFFFFF] relative"
              >
                {program.type && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-terracotta rounded">
                    <span className="font-card-news-type  text-white">
                      {program.type}
                    </span>
                  </div>
                )}
                {program.imageUrl && (
                  <img
                    src={program.imageUrl}
                    alt={program.title}
                    loading="lazy"
                    className="w-full m-auto"
                  />
                )}
                <div className="py-6 px-8 bg-sand group-hover:bg-sand/80 transition-all duration-150 ease-in-out">
                  <h2 className="font-card-title lg:w-3/4">{program.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      {awards.length > 0 && (
        <section className="mx-auto my-20 max-w-[1400px] px-5 md:px-10">
          <AwardsSection awards={awards} />
        </section>
      )}
      {partnerTiles.length > 0 && (
        <section className="mx-auto mt-16 lg:mt-40 lg:mb-30  ">
          <div className="flex gap-2 text-center w-fit mx-auto">
            <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
            <h2 className="font-about-mvv-titles">
              {home?.partnersHeading || "Our Partners"}
            </h2>
          </div>
          <PartnersScroller partners={partnerTiles} />
        </section>
      )}

      {news.length > 0 && (
        <section className="mx-auto mt-16 lg:mt-40 mb-16 lg:mb-30 max-w-[1400px] px-5 md:px-10">
          <h2 className="font-team-heading mt-8">
            {home?.newsHeading || "Latest News & Community Updates"}
          </h2>
          {home?.newsIntro && (
            <p className="font-team-intro mt-5 max-w-[622px]">
              {home.newsIntro}
            </p>
          )}
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
  const [home, programs, news, partnersPage] = await Promise.all([
    getPage("homePage"),
    getPrograms(),
    getNews(),
    getPage("partnersPage"),
  ]);

  return {
    props: {
      home: home ?? null,
      programs: (programs ?? []).slice(0, 2),
      news: (news ?? []).slice(0, 2),
      partners: partnersPage?.partners ?? [],
    },
    revalidate: 60,
  };
}
