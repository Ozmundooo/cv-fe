import { PortableText as PortableTextReact } from "@portabletext/react";
import { sanityImageProps } from "@/lib/sanity";
import { blockText, isExternalHref, normalizeHref } from "@/lib/links";

const BODY_IMAGE = {
  widths: [480, 800, 1200, 1600],
  sizes: "(min-width: 1024px) 800px, 100vw",
};
const GALLERY_IMAGE = {
  widths: [320, 480, 800],
  aspectRatio: 1,
  sizes: "(min-width: 1024px) 400px, 50vw",
};

const components = {
  types: {
    image: ({ value }) => {
      const image = sanityImageProps(value, BODY_IMAGE);
      if (!image) return null;

      return (
        <img
          {...image}
          alt={value.alt || ""}
          loading="lazy"
          decoding="async"
          className="my-10 aspect-[400/373] w-full rounded-md object-cover"
        />
      );
    },
    imageGallery: ({ value }) => {
      const images = value.images ?? [];
      if (!images.length) return null;

      return (
        <div className="my-10 grid grid-cols-2 gap-2">
          {images.map((image, index) => {
            const props = sanityImageProps(image, GALLERY_IMAGE);
            if (!props) return null;

            return (
              <img
                key={image._key ?? index}
                {...props}
                alt={image.alt || ""}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full rounded-md object-cover"
              />
            );
          })}
        </div>
      );
    },
  },
  marks: {
    // Tailwind's reset strips link styling, which made links in CMS text
    // indistinguishable from the surrounding copy.
    link: ({ value, children }) => {
      const href = normalizeHref(value?.href);
      if (!href) return <>{children}</>;
      const external = isExternalHref(href);

      return (
        <a
          href={href}
          className="wrap-break-word font-medium text-terracotta underline underline-offset-2 hover:no-underline"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h2 className="font-article-heading mt-10 first:mt-0">{children}</h2>
    ),
    h2: ({ children }) => (
      <h2 className="font-article-heading mt-10 border-t border-[#202622] pt-10 first:mt-0 first:border-0 first:pt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-subtext text-[18px] font-bold leading-6 tracking-[-0.04em] text-[#1D1E22]">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="font-article-body mt-5">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="font-article-body my-5 list-disc space-y-1 pl-5">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="font-article-body my-5 list-decimal space-y-1 pl-5">
        {children}
      </ol>
    ),
  },
};

// Popups and narrow columns: article-sized headings would dominate there.
const compactHeading = ({ children }) => (
  <h3 className="mt-6 font-subtext text-[18px] font-bold leading-6 tracking-[-0.04em] text-[#1D1E22]">
    {children}
  </h3>
);
const compactComponents = {
  ...components,
  block: {
    ...components.block,
    h1: compactHeading,
    h2: compactHeading,
    h3: compactHeading,
  },
};

// Editors use empty paragraphs as spacers; the block styles already space
// paragraphs, so those would otherwise double the gaps.
const isEmptyBlock = (block) =>
  block._type === "block" && !block.listItem && !blockText(block).trim();

export default function PortableText({ blocks, compact = false }) {
  if (!Array.isArray(blocks) || !blocks.length) return null;

  return (
    <PortableTextReact
      value={blocks.filter((block) => !isEmptyBlock(block))}
      components={compact ? compactComponents : components}
    />
  );
}
