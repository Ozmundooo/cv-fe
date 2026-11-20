import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import PortableText from "@/components/PortableText";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { sanityImageProps } from "@/lib/sanity";

// Portraits are uploaded as huge camera originals (up to 7200x10800), so
// always request them cropped and resized for the grid. The bio popup
// reuses these exact props so its portrait comes straight from cache.
const PORTRAIT_IMAGE = {
  widths: [320, 480, 640, 800, 960],
  aspectRatio: 3 / 4,
  sizes:
    "(min-width: 1400px) 440px, (min-width: 1024px) 31vw, (min-width: 768px) 48vw, 100vw",
};

const hasBio = (person) => Array.isArray(person.bio) && person.bio.length > 0;

function TeamCard({ person, image, onOpen, triggerRef }) {
  return (
    <article className="group relative">
      {image && (
        <div className="overflow-hidden rounded-md bg-sand">
          <img
            {...image}
            alt={person.name ?? ""}
            loading="lazy"
            decoding="async"
            className={`aspect-[3/4] w-full object-cover transition-transform duration-500 ease-out ${onOpen ? "group-hover:scale-[1.02]" : ""}`}
          />
        </div>
      )}
      <h3 className="mt-3 font-subtext text-[20px] font-bold leading-7 tracking-[-0.04em] text-[#1D1E22] lg:mt-1 lg:text-[32px] lg:leading-[58px]">
        {person.name}
      </h3>
      {person.role && (
        <p className="font-subtext text-[15px] font-normal leading-5 tracking-[-0.04em] text-[#1D1E22]/80">
          {person.role}
        </p>
      )}
      {onOpen && (
        // The ::after overlay stretches the button over the whole card, so
        // the photo and name are clickable too.
        <button
          ref={triggerRef}
          type="button"
          onClick={onOpen}
          className="mt-3 inline-flex cursor-pointer items-center gap-1.5 font-subtext text-[15px] font-medium tracking-[-0.04em] text-[#1D1E22] underline decoration-[#1D1E22]/30 underline-offset-4 transition-colors after:absolute after:inset-0 after:rounded-md group-hover:decoration-[#1D1E22] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-green"
        >
          Read bio
          <span className="sr-only">: {person.name}</span>
          <ArrowRight
            aria-hidden="true"
            size={16}
            strokeWidth={1.75}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      )}
    </article>
  );
}

const navButtonClassName =
  "inline-flex h-10 cursor-pointer items-center gap-2 rounded-md px-3 font-subtext text-[15px] font-medium tracking-[-0.04em] text-[#1D1E22] transition-colors hover:bg-[#1D1E22]/5 focus-visible:outline-2 focus-visible:outline-green";

export default function TeamGrid({ people, groupLabel }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const triggers = useRef([]);

  const images = people.map((person) =>
    sanityImageProps(person.image, PORTRAIT_IMAGE),
  );
  const bioIndexes = people.flatMap((person, index) =>
    hasBio(person) ? [index] : [],
  );
  const position = bioIndexes.indexOf(activeIndex);
  const active = people[activeIndex];
  const activeImage = images[activeIndex];
  const canBrowse = bioIndexes.length > 1;

  function personAt(offset) {
    const count = bioIndexes.length;
    return bioIndexes[(position + offset + count) % count];
  }

  function handleKeyDown(event) {
    if (!canBrowse) return;
    if (event.key === "ArrowRight") setActiveIndex(personAt(1));
    if (event.key === "ArrowLeft") setActiveIndex(personAt(-1));
  }

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-x-3 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {people.map((person, index) => (
          <TeamCard
            key={person._key ?? index}
            person={person}
            image={images[index]}
            triggerRef={(node) => {
              triggers.current[index] = node;
            }}
            onOpen={
              hasBio(person)
                ? () => {
                    setActiveIndex(index);
                    setOpen(true);
                  }
                : undefined
            }
          />
        ))}
      </div>

      {bioIndexes.length > 0 && active && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            showCloseButton={false}
            overlayClassName="bg-[#1D1E22]/60"
            // Return focus to the card of whoever is showing when closed,
            // not the card that was originally clicked.
            finalFocus={() => triggers.current[activeIndex] ?? true}
            onKeyDown={handleKeyDown}
            className="flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[880px] flex-col gap-0 overflow-hidden rounded-xl bg-cream p-0 text-[#1D1E22] ring-0 sm:max-w-[880px] md:max-h-[min(680px,calc(100dvh-4rem))] md:min-h-[480px] md:flex-row"
          >
            {activeImage && (
              <div className="relative hidden w-[300px] shrink-0 bg-sand md:block">
                <img
                  {...activeImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            )}

            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
              <div className="flex shrink-0 items-start gap-4 border-b border-[#1D1E22]/10 p-5 md:px-8 md:pb-6 md:pt-8">
                {activeImage && (
                  <img
                    {...activeImage}
                    alt=""
                    className="aspect-[3/4] w-16 shrink-0 rounded-md bg-sand object-cover md:hidden"
                  />
                )}
                <div className="min-w-0 flex-1">
                  {groupLabel && (
                    <p className="font-subtext text-[12px] font-bold uppercase leading-4 tracking-[0.02em] text-terracotta">
                      {groupLabel}
                    </p>
                  )}
                  <DialogTitle className="mt-1.5 font-subtext text-[26px] font-bold leading-[1.1] tracking-[-0.04em] text-[#1D1E22] md:text-[36px]">
                    {active.name}
                  </DialogTitle>
                  {active.role && (
                    <DialogDescription className="mt-2 font-subtext text-[15px] leading-5 tracking-[-0.04em] text-[#1D1E22]/70">
                      {active.role}
                    </DialogDescription>
                  )}
                </div>
                <DialogClose
                  aria-label="Close"
                  className="-mr-2 -mt-1 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#1D1E22] transition-colors hover:bg-[#1D1E22]/5 focus-visible:outline-2 focus-visible:outline-green"
                >
                  <X size={20} strokeWidth={1.75} />
                </DialogClose>
              </div>

              <div
                key={activeIndex}
                className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 md:px-8 [&>*:first-child]:mt-5 md:[&>*:first-child]:mt-6"
              >
                <PortableText blocks={active.bio} compact />
              </div>

              {canBrowse && (
                <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#1D1E22]/10 px-2 py-2 md:px-5 md:py-3">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(personAt(-1))}
                    aria-label={`Previous: ${people[personAt(-1)]?.name}`}
                    className={navButtonClassName}
                  >
                    <ArrowLeft size={18} strokeWidth={1.75} />
                    Previous
                  </button>
                  <p
                    aria-live="polite"
                    className="font-subtext text-[13px] tabular-nums tracking-[-0.02em] text-[#1D1E22]/60"
                  >
                    {position + 1} of {bioIndexes.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(personAt(1))}
                    aria-label={`Next: ${people[personAt(1)]?.name}`}
                    className={navButtonClassName}
                  >
                    Next
                    <ArrowRight size={18} strokeWidth={1.75} />
                  </button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
