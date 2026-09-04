"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import SampleLogo from "@/assets/SampleLogo.svg";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Partners() {
  const samplePartnerCount = 35;
  const partnersPerPage = 12;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(samplePartnerCount / partnersPerPage);

  const startIndex = (currentPage - 1) * partnersPerPage;
  const currentPartners = Array.from(
    { length: Math.min(partnersPerPage, samplePartnerCount - startIndex) },
    (_, index) => startIndex + index,
  );

  return (
    <main>
      <Navbar active="Partners" />

      <div className="my-20 max-w-[1400px] mx-auto">
        <h1 className="font-title max-w-[780px]">
          Building a Stronger Community Through Trusted Partnerships
        </h1>

        <p className="font-subtext max-w-[780px] mt-10">
          We currently have {samplePartnerCount} trusted partners contributing
          to our community. These partnerships help us grow and strengthen our
          network. Without these partnerships, our community would not be as
          strong and vibrant.
        </p>

        {samplePartnerCount > 0 && (
          <>
            <div
              id="partners-grid"
              className="mt-15 grid grid-cols-6 gap-[10px]"
            >
              {currentPartners.map((partner) => (
                <div key={partner} className="aspect-square flex bg-[#FFFFFF]">
                  <Image
                    src={SampleLogo}
                    alt={`Partner ${partner + 1} Logo`}
                    className="w-3/5 m-auto"
                  />
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
        )}
      </div>

      <Footer />
    </main>
  );
}
