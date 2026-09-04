"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import SampleProgramsPhotoOne from "@/assets/SampleProgramsPhotoOne.png";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function Programs() {
  const sampleProgramsCount = 6;
  const programsPerPage = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sampleProgramsCount / programsPerPage);

  const startIndex = (currentPage - 1) * programsPerPage;
  const currentPrograms = Array.from(
    { length: Math.min(programsPerPage, sampleProgramsCount - startIndex) },
    (_, index) => startIndex + index,
  );

  return (
    <main>
      <Navbar active="Programs" />

      <div className="my-20 max-w-[1400px] mx-auto">
        <h1 className="font-title max-w-[780px]">
          Programs That Bring Our Community Together
        </h1>

        <p className="font-subtext max-w-[780px] mt-10">
          Discover a variety of programs designed to support learning, wellness,
          recreation, and connection for people of all ages at Crescent Village.
        </p>

        {sampleProgramsCount > 0 && (
          <>
            <div
              id="programs-grid"
              className="mt-15 grid grid-cols-2 gap-[10px]"
            >
              {currentPrograms.map((program) => (
                <Link
                  href={"/programs/sample-1"}
                  key={program}
                  className=" group bg-[#FFFFFF] relative"
                >
                  <div className="absolute top-3 right-3 px-3 py-1 bg-terracotta rounded">
                    <span className="font-card-news-type  text-white">
                      Program Type
                    </span>
                  </div>

                  <Image
                    src={SampleProgramsPhotoOne}
                    alt={`Program ${program + 1} Photo`}
                    className="w-full m-auto"
                  />
                  <div className="py-6 px-8 bg-sand group-hover:bg-sand/80 transition-all duration-150 ease-in-out">
                    <h2 className="font-card-title lg:w-3/4">
                      Growing Together Community Garden Program
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
        )}
      </div>

      <Footer />
    </main>
  );
}
