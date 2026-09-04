import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const overlayClasses = {
  sand: "bg-gradient-to-r from-sand from-[23.54%] via-sand/50 via-[61.77%] to-transparent",
  dark: "bg-gradient-to-l from-[#202622] from-[59.1%] via-[#202622]/50 via-[74.16%] to-transparent",
  gold: "bg-gradient-to-r from-gold from-[23.54%] via-gold/50 via-[61.77%] to-transparent",
};

export default function HomeFeatureCards({ cards }) {
  return (
    <section className="mx-auto max-w-[1400px] space-y-10 px-5 md:px-10">
      {cards.map((card) => (
        <article
          key={card.eyebrow}
          className="relative min-h-[524px] overflow-hidden rounded-md"
        >
          <Image
            src={card.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1400px) 100vw, 1340px"
          />
          <div className={`absolute inset-0 ${overlayClasses[card.overlay]}`} />
          <div
            className={`relative flex min-h-[524px] items-center px-10 py-16 md:px-10 ${
              card.contentPosition === "right" ? "justify-end" : "justify-start"
            }`}
          >
            <div className={`max-w-[708px] ${card.textClassName}`}>
              {card.eyebrow && (
                <div className="flex items-center gap-3">
                  <span className="h-[14px] w-[14px] shrink-0 rounded-full bg-current" />
                  <p
                    className={`font-subtext text-[15px] font-medium uppercase leading-5 tracking-[-0.04em] ${card.textClassName}`}
                  >
                    {card.eyebrow}
                  </p>
                </div>
              )}

              <h2
                className={`mt-10 font-subtext text-[42px] font-bold leading-[1.12] tracking-[-0.04em] lg:text-[52px] lg:leading-[58px] ${card.textClassName}`}
              >
                {card.title}
              </h2>
              <p
                className={`mt-5 max-w-[622px] font-subtext text-[15px] leading-5 tracking-[-0.04em] ${card.textClassName}`}
              >
                {card.description}
              </p>
              {card.href && (
                <Link
                  href={card.href}
                  className={`mt-8 flex h-10 w-fit items-center gap-3 rounded-[3px] border px-4 font-subtext text-[15px] font-medium leading-5 tracking-[-0.04em] transition-opacity hover:opacity-90 ${card.buttonClassName}`}
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
