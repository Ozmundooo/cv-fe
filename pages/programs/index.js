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
import Link from "next/link";
import { getPage, getPrograms } from "@/lib/sanity";

const PROGRAMS_PER_PAGE = 4;

export default function Programs({ page, programs }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(programs.length / PROGRAMS_PER_PAGE),
  );

  const startIndex = (currentPage - 1) * PROGRAMS_PER_PAGE;
  const currentPrograms = programs.slice(
    startIndex,
    startIndex + PROGRAMS_PER_PAGE,
  );

  return (
    <main>
      <Navbar active="Programs" />

      <div className="my-20 max-w-[1400px] mx-auto px-5 md:px-10">
        <h1 className="font-title max-w-[780px]">
          {page?.title || "Programs That Bring Our Community Together"}
        </h1>

        {page?.description && (
          <p className="font-subtext max-w-[780px] mt-10">{page.description}</p>
        )}

        {programs.length > 0 ? (
          <>
            <div
              id="programs-grid"
              className="mt-15 grid lg:grid-cols-2 gap-[10px] md:gap-[20px]"
            >
              {currentPrograms.map((program) => (
                <Link
                  href={`/programs/${program.slug?.current}`}
                  key={program._id}
                  className=" group bg-[#FFFFFF] relative"
                >
                  {program.type && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-terracotta rounded">
                      <span className="font-card-news-type  text-white">
                        {program.type}
                      </span>
                    </div>
                  )}

                  {program.imageUrl && (
                    <img
                      src={program.imageUrl}
                      alt={program.title}
                      loading="lazy"
                      className="w-full m-auto"
                    />
                  )}
                  <div className="py-6 px-8 bg-sand group-hover:bg-sand/80 transition-all duration-150 ease-in-out">
                    <h2 className="font-card-title lg:w-3/4">
                      {program.title}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#programs-grid"
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
                          href="#programs-grid"
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
                      href="#programs-grid"
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
          <p className="mt-15 font-subtext text-[15px] text-[#1D1E22]">
            No programs have been added yet.
          </p>
        )}
      </div>

      <Footer />
    </main>
  );
}

export async function getStaticProps() {
  const [page, programs] = await Promise.all([
    getPage("programsPage"),
    getPrograms(),
  ]);

  return {
    props: {
      page: page ?? null,
      programs: programs ?? [],
    },
    revalidate: 60,
  };
}
