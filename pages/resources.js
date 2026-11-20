import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metatags from "@/components/Metatags";
import DocumentCard from "@/components/DocumentCard";
import { ChevronDown } from "lucide-react";
import { getPage, getResources } from "@/lib/sanity";

export default function Resources({ page, resources }) {
  const filterGroups = (page?.filterGroups ?? []).map((group) => ({
    ...group,
    id: group.label?.toLowerCase(),
  }));
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState(() =>
    Object.fromEntries(filterGroups.map((group) => [group.id, []])),
  );
  const filteredResources = resources.filter((resource) =>
    filterGroups.every(
      ({ id }) =>
        !selectedFilters[id]?.length ||
        selectedFilters[id].includes(resource[id]),
    ),
  );
  const totalPages = Math.max(1, Math.ceil(filteredResources.length / 12));
  const currentResources = filteredResources.slice(
    (currentPage - 1) * 12,
    currentPage * 12,
  );

  function toggleFilter(groupId, option) {
    setCurrentPage(1);
    setSelectedFilters((current) => ({
      ...current,
      [groupId]: current[groupId]?.includes(option)
        ? current[groupId].filter((item) => item !== option)
        : [...(current[groupId] ?? []), option],
    }));
  }

  return (
    <main>
      <Metatags
        title={
          page?.metaTitle ||
          page?.title ||
          "Resources | Crescent Village"
        }
        description={
          page?.metaDescription ||
          page?.description ||
          "Find important resources, guides, and useful links for Crescent Village residents and families."
        }
        canonicalLink="/resources"
      />
      <Navbar active="Resources" />
      <section className="mx-auto my-8 lg:my-20 max-w-[1400px] px-5 md:px-10">
        <h1 className="font-title max-w-[591px]">
          {page?.title || "Important Resources, Guides & Useful Links"}
        </h1>
        {page?.description && (
          <p className="mt-4 lg:mt-10 max-w-[622px] font-subtext text-[15px] leading-5 tracking-[-0.04em] text-[#1D1E22]/80">
            {page.description}
          </p>
        )}
        <div className="mt-8 lg:mt-20 grid gap-[10px] lg:grid-cols-[215px_1fr]">
          {filterGroups.length > 0 && (
            <aside className="h-fit rounded-md bg-white p-4">
              <h2 className="font-subtext text-[24px] font-bold leading-[31px] tracking-[-0.04em] text-[#1D1E22]">
                Filters
              </h2>
              <div className="mt-6 space-y-6">
                {filterGroups.map((group) => (
                  <details key={group.id}>
                    <summary className="flex cursor-pointer list-none items-center justify-between font-subtext text-[15px] font-medium leading-5 tracking-[-0.04em] text-[#1D1E22] [&::-webkit-details-marker]:hidden">
                      {group.label}
                      <ChevronDown size={16} />
                    </summary>
                    <fieldset className="mt-3 space-y-2">
                      <legend className="sr-only">{group.label}</legend>
                      {(group.options ?? []).map((option) => (
                        <label
                          key={option}
                          className="flex cursor-pointer items-center gap-2 font-subtext text-[12px] leading-4 tracking-[-0.04em] text-[#1D1E22]"
                        >
                          <input
                            type="checkbox"
                            checked={
                              selectedFilters[group.id]?.includes(option) ??
                              false
                            }
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
          )}
          <div id="resource-grid" className="grid gap-[10px] md:grid-cols-2">
            {currentResources.map((resource) => (
              <DocumentCard key={resource._id} item={resource} type="resource" />
            ))}
            {!currentResources.length && (
              <p className="font-subtext text-[15px] text-[#1D1E22]">
                No resources match the selected filters.
              </p>
            )}
          </div>
        </div>
        {totalPages > 1 && (
          <nav
            aria-label="Resources pagination"
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

export async function getStaticProps() {
  const [page, resources] = await Promise.all([
    getPage("resourcesPage"),
    getResources(),
  ]);

  return {
    props: {
      page: page ?? null,
      resources: resources ?? [],
    },
    revalidate: 60,
  };
}
