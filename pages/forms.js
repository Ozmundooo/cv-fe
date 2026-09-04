"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown, ChevronRight } from "lucide-react";

const filterGroups = [
  {
    id: "audience",
    label: "Audience",
    options: ["Residents", "Families", "Seniors", "Youth", "Community"],
  },
  {
    id: "topic",
    label: "Topic",
    options: [
      "Housing",
      "Programs",
      "Health & Wellness",
      "Policies",
      "Services",
    ],
  },
];

const forms = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  title: `Form ${index + 1}`,
  description:
    "A short 1–2 sentence description explaining what the form is, who it's for, and why it may be helpful. ",
  categories:
    index % 2
      ? ["Policies & Guidelines"]
      : ["Resident Information", "Policies & Guidelines"],
  audience: filterGroups[0].options[index % 5],
  topic: filterGroups[1].options[index % 5],
}));

function FormDialog({ form }) {
  return (
    <Dialog size="lg">
      <DialogTrigger
        aria-label={`Preview ${form.title}`}
        className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md bg-[#1D1E22] text-cream transition-opacity hover:opacity-80"
      >
        <ChevronRight size={16} strokeWidth={1.5} />
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="grid h-[min(568px,calc(100vh-2rem))] max-w-[calc(100%-2rem)] grid-cols-1 gap-0 overflow-hidden rounded-xl bg-[#1D1E22] p-0 text-[#1D1E22] sm:max-w-[908px] md:grid-cols-[30%_70%]"
      >
        <div className="flex flex-col justify-between bg-cream p-6">
          <div>
            <DialogTitle className="font-subtext text-[24px] font-medium leading-[31px] tracking-[-0.04em] text-[#1D1E22]">
              {form.title}
            </DialogTitle>
            <DialogDescription className="mt-3 font-subtext text-[12px] leading-4 tracking-[-0.04em] text-[#1D1E22]">
              {form.description}
            </DialogDescription>
            <p className="mt-3 font-subtext text-[10px] leading-[13px] tracking-[-0.04em] text-[#1D1E22]">
              PDF - 1.2 MB
            </p>
            <p className="font-subtext text-[10px] leading-[13px] tracking-[-0.04em] text-[#1D1E22]">
              Updated Jul 2026
            </p>
            {/* <div className="mt-4 flex flex-wrap gap-2">
              {resource.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-md bg-terracotta px-3 py-2 font-subtext text-[10px] leading-[13px] tracking-[-0.04em] text-white"
                >
                  {category}
                </span>
              ))}
            </div> */}
          </div>
        </div>
        <div className="min-h-0 bg-[#1D1E22] p-6 md:p-12">
          <iframe
            title={`${form.title} preview`}
            src="/sample.pdf"
            className="h-full w-full rounded-xl bg-white"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Forms() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({
    audience: [],
    topic: [],
  });
  const filteredForms = forms.filter((form) =>
    filterGroups.every(
      ({ id }) =>
        !selectedFilters[id].length || selectedFilters[id].includes(form[id]),
    ),
  );
  const totalPages = Math.max(1, Math.ceil(filteredForms.length / 12));
  const currentForms = filteredForms.slice(
    (currentPage - 1) * 12,
    currentPage * 12,
  );

  function toggleFilter(groupId, option) {
    setCurrentPage(1);
    setSelectedFilters((current) => ({
      ...current,
      [groupId]: current[groupId].includes(option)
        ? current[groupId].filter((item) => item !== option)
        : [...current[groupId], option],
    }));
  }

  return (
    <main>
      <Navbar active="Forms" />
      <section className="mx-auto my-20 max-w-[1400px] px-5 md:px-10">
        <h1 className="font-title max-w-[591px]">
          Forms, Applications & Important Documents
        </h1>
        <p className="mt-10 max-w-[622px] font-subtext text-[15px] leading-5 tracking-[-0.04em] text-[#1D1E22]/80">
          Access the forms you need to apply for services, request support,
          submit information, and complete important community-related
          processes.
        </p>
        <div className="mt-20 grid gap-[10px] lg:grid-cols-[215px_1fr]">
          <aside className="h-fit rounded-md bg-white p-4">
            <h2 className="font-subtext text-[24px] font-bold leading-[31px] tracking-[-0.04em] text-[#1D1E22]">
              Filters
            </h2>
            <div className="mt-6 space-y-6">
              {filterGroups.map((group) => (
                <details key={group.id} open>
                  <summary className="flex cursor-pointer list-none items-center justify-between font-subtext text-[15px] font-medium leading-5 tracking-[-0.04em] text-[#1D1E22] [&::-webkit-details-marker]:hidden">
                    {group.label}
                    <ChevronDown size={16} />
                  </summary>
                  <fieldset className="mt-3 space-y-2">
                    <legend className="sr-only">{group.label}</legend>
                    {group.options.map((option) => (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-2 font-subtext text-[12px] leading-4 tracking-[-0.04em] text-[#1D1E22]"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFilters[group.id].includes(option)}
                          onChange={() => toggleFilter(group.id, option)}
                          className="h-4 w-4 rounded-sm border-[#1D1E22] accent-[#1D1E22]"
                        />
                        {option}
                      </label>
                    ))}
                  </fieldset>
                </details>
              ))}
            </div>
          </aside>
          <div id="forms-grid" className="grid gap-[10px] md:grid-cols-2">
            {currentForms.map((form) => (
              <article
                key={form.id}
                className="relative min-h-[136px] rounded bg-white p-4"
              >
                <div className="flex flex-wrap gap-2 md:absolute md:right-4 md:top-4">
                  {form.categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-md bg-terracotta px-2 py-1 font-subtext text-[10px] leading-[13px] tracking-[-0.04em] text-white"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h2 className="font-subtext text-[24px] font-medium leading-[31px] tracking-[-0.04em] text-[#1D1E22]">
                  {form.title}
                </h2>
                <p className="mt-2 max-w-[287px] font-subtext text-[12px] leading-4 tracking-[-0.04em] text-[#1D1E22]">
                  {form.description}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="font-subtext text-[10px] leading-[13px] tracking-[-0.04em] text-[#1D1E22]">
                    PDF - 1.2 MB <span className="mx-3">Updated Jul 2026</span>
                  </p>
                  <FormDialog form={form} />
                </div>
              </article>
            ))}
            {!currentForms.length && (
              <p className="font-subtext text-[15px] text-[#1D1E22]">
                No forms match the selected filters.
              </p>
            )}
          </div>
        </div>
        {totalPages > 1 && (
          <nav
            aria-label="Forms pagination"
            className="mt-12 flex justify-center gap-2"
          >
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              className="font-subtext text-[16px] disabled:opacity-40"
            >
              &lsaquo;
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-[31px] w-[30px] rounded-[3px] font-subtext text-[16px] font-medium tracking-[-0.04em] text-cream ${currentPage === page ? "bg-[#1D1E22]" : "bg-[#1D1E22]/70"}`}
                >
                  {page}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage === totalPages}
              className="font-subtext text-[16px] disabled:opacity-40"
            >
              &rsaquo;
            </button>
          </nav>
        )}
      </section>
      <Footer />
    </main>
  );
}
