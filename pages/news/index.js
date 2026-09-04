"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import SampleNewsPhotoOne from "@/assets/SampleNewsPhotoOne.png";

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

export default function News() {
  const sampleNewsCount = 6;
  const newsPerPage = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sampleNewsCount / newsPerPage);

  const startIndex = (currentPage - 1) * newsPerPage;
  const currentNews = Array.from(
    { length: Math.min(newsPerPage, sampleNewsCount - startIndex) },
    (_, index) => startIndex + index,
  );

  return (
    <main>
      <Navbar active="News" />

      <div className="my-20 max-w-[1400px] mx-auto">
        <h1 className="font-title max-w-[780px]">
          Latest News & Community Updates
        </h1>

        <p className="font-subtext max-w-[780px] mt-10">
          Stay informed with the latest announcements, upcoming events,
          community stories, and important updates from Crescent Village.
        </p>

        {sampleNewsCount > 0 && (
          <>
            <div id="news-grid" className="mt-15 grid grid-cols-2 gap-[10px]">
              {currentNews.map((news) => (
                <Link
                  href={"/news/sample-1"}
                  key={news}
                  className=" group bg-[#FFFFFF] relative"
                >
                  <div className="absolute top-3 right-3 px-3 py-1 bg-terracotta rounded">
                    <span className="font-card-news-type  text-white">
                      News Type
                    </span>
                  </div>

                  <Image
                    src={SampleNewsPhotoOne}
                    alt={`News ${news + 1} Photo`}
                    className="w-full m-auto"
                  />
                  <div className="py-6 px-8 bg-sand group-hover:bg-sand/80 transition-all duration-150 ease-in-out">
                    <div className="flex items-center mb-2">
                      <Calendar
                        className="inline-block mr-2"
                        size={20}
                        strokeWidth={1}
                      />
                      <p className="font-card-date">August 24th, 2026</p>
                    </div>
                    <h2 className="font-card-title lg:w-3/4">
                      Celebrating Our Community, One Neighbour at a Time
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
                      href="#news-grid"
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
                          href="#news-grid"
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
                      href="#news-grid"
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
