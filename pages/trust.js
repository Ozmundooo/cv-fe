import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeFeatureCards from "@/components/HomeFeatureCards";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getPage, getPrograms, sanityImage } from "@/lib/sanity";

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

export default function Trust({ page, programs }) {
  const values = (page?.values ?? []).map((value) => ({
    ...value,
    iconUrl: sanityImage(value.icon),
  }));
  const featureCards = (page?.featureCards ?? []).map((card, index) => ({
    ...card,
    imageUrl: sanityImage(card.image),
    contentPosition: index === 1 ? "right" : undefined,
    textClassName: overlayTextClass[card.overlay] ?? overlayTextClass.sand,
    buttonClassName:
      overlayButtonClass[card.overlay] ?? overlayButtonClass.sand,
  }));
  const faqs = page?.faqs ?? [];

  return (
    <main className="relative">
      <Navbar active="" />
      <section className="relative min-h-screen overflow-hidden max-w-[1400px] mx-auto">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/homeVideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute inset-0 flex flex-col  justify-end mx-10 mb-10 px-5 pt-24">
          <h1 className="font-trust-hero-title max-w-[720px] ">
            {page?.title ||
              "Supporting Communities Through Compassionate Giving"}
          </h1>
          {page?.description && (
            <h3 className="font-subtext text-[15px] leading-[31px] max-w-[720px] tracking-[-0.04em] text-cream  mt-4">
              {page.description}
            </h3>
          )}
        </div>
      </section>

      {page?.purpose && (
        <section className="mx-auto my-20 max-w-[1000px] px-5 md:px-10">
          <div className="mx-auto flex w-fit gap-2 text-center">
            <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
            <h2 className="font-about-mvv-titles">
              {page?.purposeTitle || "Our Purpose"}
            </h2>
          </div>
          <div className="mt-8">
            <p className="font-about-mvv-description text-center whitespace-pre-line">
              {page.purpose}
            </p>
          </div>
        </section>
      )}
      {values.length > 0 && (
        <section className="mx-auto my-20 max-w-[1000px] px-5 md:px-10">
          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
            {values.map((value, index) => (
              <div key={value._key ?? index} className="text-center">
                {value.iconUrl && (
                  <img
                    src={value.iconUrl}
                    alt={value.title ?? ""}
                    loading="lazy"
                    className="mx-auto h-16 w-16"
                  />
                )}
                <h3 className="mt-4 font-subtext text-[24px] font-medium uppercase leading-[31px] tracking-[-0.04em] text-[#1D1E22]">
                  {value.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[240px] font-subtext text-[14px] font-medium leading-[18px] tracking-[-0.04em] text-[#1D1E22]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <HomeFeatureCards cards={featureCards} />
      {programs.length > 0 && (
        <section className="mx-auto mt-40 mb-30 max-w-[1400px] px-5 md:px-10">
          <h2 className="font-team-heading mt-8 max-w-[622px]">
            Programs That Bring Our Community Together
          </h2>
          <p className="font-team-intro mt-5 max-w-[622px]">
            Explore a variety of programs designed to support learning,
            wellness, recreation, and meaningful connections for residents of
            all ages.
          </p>
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

      {faqs.length > 0 && (
        <section className="mx-auto mt-40 mb-30 max-w-[1400px] px-5 md:px-10">
          <div className="mx-auto flex w-fit gap-2 text-center">
            <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
            <h2 className="font-about-mvv-titles">
              Frequently Asked Questions
            </h2>
          </div>
          <h2 className="font-team-heading mt-8 text-center">
            Questions About <br></br>Trust?
          </h2>
          <p className="font-team-intro mt-5 max-w-[400px] mx-auto text-center">
            Find answers to common questions about eligibility, the residence,
            and the Affordable Housing Program.{" "}
          </p>

          <Accordion className="mt-8 max-w-[613px] mx-auto" multiple>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq._key ?? index}
                value={faq.question ?? String(index)}
                className="border-b border-[#202622]"
              >
                <AccordionTrigger className="font-subtext py-5 text-[18px] text-[#202622] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-article-body pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}
      <Footer />
    </main>
  );
}

export async function getStaticProps() {
  const [page, programs] = await Promise.all([
    getPage("trustPage"),
    getPrograms(),
  ]);

  return {
    props: {
      page: page ?? null,
      programs: (programs ?? []).slice(0, 2),
    },
    revalidate: 60,
  };
}
