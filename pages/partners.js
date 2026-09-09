"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPage, sanityImage } from "@/lib/sanity";

const PARTNERS_PER_PAGE = 12;

export default function Partners({ page }) {
  const partners = (page?.partners ?? []).map((partner) => ({
    ...partner,
    imageUrl: sanityImage(partner.logo),
  }));
  const partnerCount = partners.length;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(partnerCount / PARTNERS_PER_PAGE));

  const startIndex = (currentPage - 1) * PARTNERS_PER_PAGE;
  const currentPartners = partners.slice(
    startIndex,
    startIndex + PARTNERS_PER_PAGE,
  );

  return (
    <main>
      <Navbar active="Partners" />

      <div className="mx-auto my-8 max-w-[1400px] px-5 md:px-10 lg:my-20">
        <h1 className="font-title max-w-[780px]">
          {page?.title ||
            "Building a Stronger Community Through Trusted Partnerships"}
        </h1>

        {page?.description && (
          <p className="mt-4 max-w-[780px] font-subtext lg:mt-10">
            {page.description}
          </p>
        )}

        {partnerCount > 0 ? (
          <>
            <div
              id="partners-grid"
              className="mt-8 grid grid-cols-2 gap-[10px] md:grid-cols-3 md:gap-[20px] lg:mt-20 lg:grid-cols-6"
            >
              {currentPartners.map((partner, index) => (
                <div
                  key={partner._key ?? index}
                  className="aspect-square flex bg-[#FFFFFF]"
                >
                  {partner.imageUrl && (
                    <img
                      src={partner.imageUrl}
                      alt={partner.name ? `${partner.name} logo` : ""}
                      loading="lazy"
                      className="w-3/5 m-auto"
                    />
                  )}
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#partners-grid"
                      onClick={(e) => {
                        e.preventDefault();

                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                        }
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;

                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#partners-grid"
                          isActive={currentPage === page}
                          className={
                            currentPage === page
                              ? "pointer-events-none  bg-black text-white"
                              : "bg-black/70 text-white"
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href="#partners-grid"
                      onClick={(e) => {
                        e.preventDefault();

                        if (currentPage < totalPages) {
                          setCurrentPage(currentPage + 1);
                        }
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        ) : (
          <p className="mt-8 font-subtext text-[15px] text-[#1D1E22] lg:mt-20">
            No partners have been added yet.
          </p>
        )}
      </div>

      <Footer />
    </main>
  );
}

export async function getStaticProps() {
  const page = await getPage("partnersPage");

  return {
    props: {
      page: page ?? null,
    },
    revalidate: 60,
  };
}
