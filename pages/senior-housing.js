import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImpactGrid from "@/components/ImpactGrid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getPage, sanityImage } from "@/lib/sanity";

const impactPalette = [
  "bg-terracotta text-[#F8F4EC]",
  "bg-[#839B78] text-cream",
  "bg-[#D5A84C] text-cream",
];

export default function SeniorHousing({ page }) {
  const heroImageUrl = sanityImage(page?.heroImage);
  const residenceImageUrl = sanityImage(page?.residenceImage);
  const impactItems = (page?.impactItems ?? []).map((item, index) => ({
    ...item,
    className: impactPalette[index % impactPalette.length],
  }));
  const residenceFeatures = (page?.residenceFeatures ?? []).map((feature) => ({
    ...feature,
    imageUrl: sanityImage(feature.image),
  }));
  const residenceGallery = (page?.residenceGallery ?? [])
    .map((image) => sanityImage(image))
    .filter(Boolean);
  const faqs = page?.faqs ?? [];

  return (
    <main className="relative">
      <Navbar active="" />
      <section className="grid lg:grid-cols-2 min-h-screen overflow-hidden max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="bg-green flex flex-col  justify-end px-8 py-10">
          <h1 className="font-trust-hero-title max-w-[720px] ">
            {page?.title || "Affordable Independent Living for Older Adults"}
          </h1>
          {page?.description && (
            <h3 className="font-subtext text-[15px] leading-[31px] max-w-[720px] tracking-[-0.04em] text-cream  mt-4">
              {page.description}
            </h3>
          )}
        </div>
        {heroImageUrl && (
          <img
            src={heroImageUrl}
            alt="Crescent Village Senior Housing"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
      </section>
      {impactItems.length > 0 && (
        <section className="mx-auto my-20 max-w-[1400px] px-5 md:px-10">
          <div className="">
            <ImpactGrid items={impactItems} />
          </div>
        </section>
      )}
      {(page?.residenceTitle || page?.residenceIntro || residenceImageUrl) && (
        <section className="mx-auto mt-40 max-w-[1400px] px-5 md:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {residenceImageUrl && (
              <img
                src={residenceImageUrl}
                alt="Resident receiving community support"
                loading="lazy"
                className="h-full min-h-[360px] w-full rounded-md object-cover"
              />
            )}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-[14px] w-[14px] rounded-full bg-[#1D1E22]" />
                <p className="font-subtext text-[15px] font-medium uppercase leading-5 tracking-[-0.04em] text-[#1D1E22]">
                  About the Residence
                </p>
              </div>
              {page?.residenceTitle && (
                <h2 className="font-team-heading mt-8 max-w-[622px]">
                  {page.residenceTitle}
                </h2>
              )}
              {page?.residenceIntro && (
                <p className="font-team-intro mt-5 max-w-[622px] whitespace-pre-line">
                  {page.residenceIntro}
                </p>
              )}
            </div>
          </div>
        </section>
      )}
      {residenceFeatures.length > 0 && (
        <section className="mx-auto mt-40 max-w-[1400px] px-5 md:px-10">
          {page?.featuresHeading && (
            <h2 className="font-team-heading max-w-[622px]">
              {page.featuresHeading}
            </h2>
          )}
          {page?.featuresIntro && (
            <p className="font-team-intro mt-5 max-w-[400px]">
              {page.featuresIntro}
            </p>
          )}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {residenceFeatures.map((feature, index) => (
              <article
                key={feature._key ?? index}
                className="overflow-hidden rounded-md bg-white"
              >
                {feature.imageUrl && (
                  <img
                    src={feature.imageUrl}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-subtext text-[20px] font-medium leading-5 tracking-[-0.04em] text-[#1D1E22]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 font-subtext text-[12px] leading-4 tracking-[-0.04em] text-[#1D1E22]/80">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      {residenceGallery.length > 0 && (
        <section className="mx-auto mt-40 max-w-[1400px] px-5 md:px-10">
          {page?.galleryHeading && (
            <h2 className="font-team-heading max-w-[622px]">
              {page.galleryHeading}
            </h2>
          )}
          {page?.galleryIntro && (
            <p className="font-team-intro mt-5 max-w-[400px]">
              {page.galleryIntro}
            </p>
          )}
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {residenceGallery.map((url, index) => (
              <img
                key={url ?? index}
                src={url}
                alt=""
                loading="lazy"
                className="h-full w-full rounded-md object-cover"
              />
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
            Questions About <br></br>Senior Housing?
          </h2>
          <p className="font-team-intro mt-5 max-w-[400px] mx-auto text-center">
            Find answers to common questions about eligibility, the residence,
            and the Affordable Housing Program.
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
  const page = await getPage("seniorHousingPage");

  return {
    props: {
      page: page ?? null,
    },
    revalidate: 60,
  };
}
