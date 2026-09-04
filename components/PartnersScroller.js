"use client";

import Image from "next/image";

export default function PartnersScroller({ partners }) {
  if (!partners.length) {
    return null;
  }

  const partnerTiles = (isDuplicate = false) =>
    partners.map((partner, index) => (
      <div
        key={`${isDuplicate ? "duplicate-" : ""}${partner.id ?? index}`}
        aria-hidden={isDuplicate || undefined}
        className="flex aspect-square w-40 shrink-0 bg-[#FFFFFF]"
      >
        <Image
          src={partner.image}
          alt={isDuplicate ? "" : partner.alt}
          className="m-auto w-3/5"
        />
      </div>
    ));

  return (
    <div className="mt-8 overflow-hidden" aria-label="Our partners">
      <div className="flex w-max animate-[partners-scroll_60s_linear_infinite] gap-[10px] hover:[animation-play-state:paused] motion-reduce:animate-none">
        <div className="flex gap-[10px]">{partnerTiles()}</div>
        <div className="flex gap-[10px]" aria-hidden="true">
          {partnerTiles(true)}
        </div>
      </div>
    </div>
  );
}
