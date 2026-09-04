"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function AwardsSection({ awards, perPage = 3 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(awards.length / perPage);
  const pageStart = (currentPage - 1) * perPage;
  const currentAwards = awards.slice(pageStart, pageStart + perPage);

  return (
    <section className="mx-auto max-w-[1340px] rounded-b-md bg-green px-5 py-10 text-cream md:px-9 lg:py-12">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="size-3 shrink-0 rounded-full bg-cream"
        />
        <p className="font-awards-eyebrow">Awards and Recognitions</p>
      </div>
      <h2 className="font-awards-heading mt-8">Recognized for Impact</h2>
      <p className="font-awards-intro mt-5 max-w-[622px]">
        Over the years, Crescent Village has been honored for its dedication to
        affordable housing, community engagement, and programs that make a
        lasting difference in the lives of residents.
      </p>

      <div id="awards-list" className="mt-10 space-y-10 lg:mt-14 lg:space-y-6">
        {currentAwards.map((award) => (
          <article
            key={award.id}
            className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_230px_minmax(0,1fr)] lg:items-start lg:gap-16"
          >
            <div>
              <h3 className="font-awards-title">{award.title}</h3>
              <dl className="font-awards-detail mt-6 space-y-4">
                <div>
                  <dt>Presented By</dt>
                  <dd className="font-normal">{award.presentedBy}</dd>
                </div>
                <div>
                  <dt>Year</dt>
                  <dd className="font-normal">{award.year}</dd>
                </div>
              </dl>
            </div>
            <Image
              src={award.image}
              alt={`${award.title} certificate from ${award.year}`}
              className="mx-auto max-h-[298px] w-auto rounded-md object-contain"
            />
            <p className="font-awards-description">{award.description}</p>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#awards-list"
                text=""
                onClick={(event) => {
                  event.preventDefault();
                  setCurrentPage((page) => Math.max(1, page - 1));
                }}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50 text-cream hover:bg-transparent hover:text-cream"
                    : "text-cream hover:bg-transparent hover:text-cream"
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#awards-list"
                    isActive={currentPage === page}
                    onClick={(event) => {
                      event.preventDefault();
                      setCurrentPage(page);
                    }}
                    className={
                      currentPage === page
                        ? "bg-cream text-[#212429] hover:bg-cream hover:text-[#212429]"
                        : "bg-cream/70 text-[#212429] hover:bg-cream hover:text-[#212429]"
                    }
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <PaginationNext
                href="#awards-list"
                text=""
                onClick={(event) => {
                  event.preventDefault();
                  setCurrentPage((page) => Math.min(totalPages, page + 1));
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50 text-cream hover:bg-transparent hover:text-cream"
                    : "text-cream hover:bg-transparent hover:text-cream"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
}
