import { PortableText as PortableTextReact } from "@portabletext/react";
import { sanityImage } from "@/lib/sanity";

const components = {
  types: {
    image: ({ value }) => {
      const url = sanityImage(value);
      if (!url) return null;

      return (
        <img
          src={url}
          alt={value.alt || ""}
          loading="lazy"
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
            const url = sanityImage(image);
            if (!url) return null;

            return (
              <img
                key={image._key ?? index}
                src={url}
                alt={image.alt || ""}
                loading="lazy"
                className="aspect-square w-full rounded-md object-cover"
              />
            );
          })}
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="font-article-heading mt-10 border-t border-[#202622] pt-10 first:mt-0 first:border-0 first:pt-0">
        {children}
      </h2>
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
  },
};

export default function PortableText({ blocks }) {
  if (!Array.isArray(blocks) || !blocks.length) return null;

  return <PortableTextReact value={blocks} components={components} />;
}
