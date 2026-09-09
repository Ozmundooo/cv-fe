import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CalendarDays,
  Clock,
  Home as HomeIcon,
  MapPin,
  UserRound,
  Users,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PortableText from "@/components/PortableText";
import { getProgramBySlug, getProgramSlugs, sanityImage } from "@/lib/sanity";

const iconMap = {
  UserRound,
  MapPin,
  CalendarDays,
  Clock,
  Users,
  Home: HomeIcon,
};

export default function Program({ program }) {
  if (!program) return null;

  const imageUrl = sanityImage(program.image);
  const details = program.details ?? [];
  const faqs = program.faqs ?? [];

  return (
    <main className="bg-cream">
      <Navbar active="Programs" />
      <section className="mx-auto max-w-[890px] px-5 pt-24 text-center lg:pt-28">
        {program.type && (
          <div className="w-fit mx-auto px-3 py-1 bg-terracotta rounded mb-5">
            <span className="font-card-news-type text-white">
              {program.type}
            </span>
          </div>
        )}
        <h1 className="font-title mt-7 text-center font-semibold tracking-[-0.08em]">
          {program.title}
        </h1>
        {program.description && (
          <p className="font-subtext mx-auto mt-5 max-w-[622px] text-center text-[#202622]/80">
            {program.description}
          </p>
        )}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={program.title}
            loading="lazy"
            className="mt-10 aspect-[890/593] w-full rounded-md object-cover"
          />
        )}
      </section>

      {(details.length > 0 || program.summary) && (
        <section className="mx-auto max-w-[630px] px-5 pt-8">
          {details.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-3">
              {details.map((detail, index) => {
                const Icon = iconMap[detail.icon] ?? UserRound;
                return (
                  <div
                    key={detail._key ?? index}
                    className="flex min-h-[85px] my-auto  gap-3 rounded-md bg-terracotta px-3 py-3 text-left text-cream"
                  >
                    <Icon size={24} strokeWidth={1.5} className="mt-2" />
                    <div className="mt-2">
                      <p className="font-subtext text-[13px] leading-4 text-cream">
                        <strong className="block font-medium text-[20px] mb-2">
                          {detail.label}
                        </strong>
                      </p>
                      <p className="font-subtext text-[13px] leading-4 text-cream">
                        {detail.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {program.summary && (
            <p className="font-article-body mx-auto mt-8 max-w-[613px] border-b border-[#202622] pb-5 text-center font-medium">
              {program.summary}
            </p>
          )}
        </section>
      )}

      {program.body?.length > 0 && (
        <article className="mx-auto max-w-[613px] px-5 py-10">
          <PortableText blocks={program.body} />
        </article>
      )}

      {faqs.length > 0 && (
        <section className="mx-auto max-w-[613px] px-5 pb-20">
          <h2 className="font-article-heading text-[36px] leading-[44px]">
            What Else Would You Like To Know?
          </h2>
          <Accordion className="mt-8" multiple>
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

export async function getStaticPaths() {
  const slugs = await getProgramSlugs();

  return {
    paths: (slugs ?? []).filter(Boolean).map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const program = await getProgramBySlug(params.slug);

  if (!program) {
    return { notFound: true, revalidate: 60 };
  }

  return { props: { program }, revalidate: 60 };
}
