import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const overlayClasses = {
  sand: "bg-gradient-to-t from-sand via-sand/75 to-sand/10 md:bg-gradient-to-r md:from-sand md:from-[23.54%] md:via-sand/50 md:via-[61.77%] md:to-transparent",
  dark: "bg-gradient-to-t from-[#202622] via-[#202622]/80 to-[#202622]/15 md:bg-gradient-to-l md:from-[#202622] md:from-[59.1%] md:via-[#202622]/50 md:via-[74.16%] md:to-transparent",
  gold: "bg-gradient-to-t from-gold via-gold/75 to-gold/10 md:bg-gradient-to-r md:from-gold md:from-[23.54%] md:via-gold/50 md:via-[61.77%] md:to-transparent",
};

export default function HomeFeatureCards({ cards }) {
  if (!cards?.length) return null;

  return (
    <section className="mx-auto max-w-[1400px] space-y-10 px-5 md:px-10">
      {cards.map((card, index) => (
        <article
          key={card._key ?? card.title ?? index}
          className="relative min-h-[560px] overflow-hidden rounded-md bg-[#1D1E22]/10 sm:min-h-[524px]"
        >
          {card.imageUrl && (
            <Image
              src={card.imageUrl}
              alt=""
              fill
              className="object-cover object-[center_35%] sm:object-center"
              sizes="(max-width: 1400px) 100vw, 1340px"
            />
          )}
          <div
            className={`absolute inset-0 ${overlayClasses[card.overlay] ?? overlayClasses.sand}`}
          />
          <div
            className={`relative flex min-h-[560px] items-end px-5 py-10 sm:min-h-[524px] sm:items-center sm:px-10 sm:py-16 ${
              card.contentPosition === "right" ? "justify-end" : "justify-start"
            }`}
          >
            <div className={`max-w-[708px] ${card.textClassName}`}>
              {card.eyebrow && (
                <div className="flex items-center gap-3">
                  <span className="h-[14px] w-[14px] shrink-0 rounded-full bg-current" />
                  <p
                    className={`font-subtext text-[12px] font-medium uppercase leading-5 tracking-[-0.04em] lg:text-[15px] ${card.textClassName}`}
                  >
                    {card.eyebrow}
                  </p>
                </div>
              )}

              <h2
                className={`mt-6 font-subtext text-[20px] font-bold leading-[1.2] tracking-[-0.04em] lg:mt-10 lg:text-[52px] lg:leading-[58px] ${card.textClassName}`}
              >
                {card.title}
              </h2>
              <p
                className={`mt-4 max-w-[622px] font-subtext text-[14px] leading-5 tracking-[-0.04em] lg:mt-5 lg:text-[15px] ${card.textClassName}`}
              >
                {card.description}
              </p>
              {card.href && (
                <Link
                  href={card.href}
                  className={`mt-6 flex h-10 w-fit items-center gap-3 rounded-[3px] border px-4 font-subtext text-[13px] font-medium leading-5 tracking-[-0.04em] transition-opacity hover:opacity-90 lg:mt-8 lg:text-[15px] ${card.buttonClassName}`}
                >
                  {card.action}
                  <ChevronRight
                    size={14}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
              )}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
