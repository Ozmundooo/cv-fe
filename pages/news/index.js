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
import { Calendar } from "lucide-react";
import Link from "next/link";
import { getPage, getNews } from "@/lib/sanity";

const NEWS_PER_PAGE = 4;

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function News({ page, news }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(news.length / NEWS_PER_PAGE));

  const startIndex = (currentPage - 1) * NEWS_PER_PAGE;
  const currentNews = news.slice(startIndex, startIndex + NEWS_PER_PAGE);

  return (
    <main>
      <Navbar active="News" />

      <div className="mx-auto my-8 max-w-[1400px] px-5 md:px-10 lg:my-20">
        <h1 className="font-title max-w-[780px]">
          {page?.title || "Latest News & Community Updates"}
        </h1>

        {page?.description && (
          <p className="mt-4 max-w-[780px] font-subtext lg:mt-10">
            {page.description}
          </p>
        )}

        {news.length > 0 ? (
          <>
            <div
              id="news-grid"
              className="mt-8 grid grid-cols-1 gap-[10px] md:grid-cols-2 md:gap-[20px] lg:mt-20"
            >
              {currentNews.map((article) => (
                <Link
                  href={`/news/${article.slug?.current}`}
                  key={article._id}
                  className=" group bg-[#FFFFFF] relative"
                >
                  {article.type && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-terracotta rounded">
                      <span className="font-card-news-type  text-white">
                        {article.type}
                      </span>
                    </div>
                  )}

                  {article.imageUrl && (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      loading="lazy"
                      className="w-full m-auto"
                    />
                  )}
                  <div className="py-6 px-8 bg-sand group-hover:bg-sand/80 transition-all duration-150 ease-in-out">
                    {article.publishedAt && (
                      <div className="flex items-center mb-2">
                        <Calendar
                          className="inline-block mr-2"
                          size={20}
                          strokeWidth={1}
                        />
                        <p className="font-card-date">
                          {formatDate(article.publishedAt)}
                        </p>
                      </div>
                    )}
                    <h2 className="font-card-title lg:w-3/4">
                      {article.title}
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
        ) : (
          <p className="mt-15 font-subtext text-[15px] text-[#1D1E22]">
            No news articles have been added yet.
          </p>
        )}
      </div>

      <Footer />
    </main>
  );
}

export async function getStaticProps() {
  const [page, news] = await Promise.all([getPage("newsPage"), getNews()]);

  return {
    props: {
      page: page ?? null,
      news: news ?? [],
    },
    revalidate: 60,
  };
}
