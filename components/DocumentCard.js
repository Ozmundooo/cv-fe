import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  X,
} from "lucide-react";
import PortableText from "@/components/PortableText";
import OnlineFormFields, { useFormSubmission } from "@/components/OnlineFormFields";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { describeDocument } from "@/lib/documents";
import { cn } from "@/lib/utils";

const buttonBase =
  "inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md px-5 font-subtext text-[15px] font-medium tracking-[-0.02em] whitespace-nowrap transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green disabled:cursor-wait disabled:opacity-70 sm:w-auto";
const primaryButton = cn(buttonBase, "bg-green text-cream hover:bg-green/90");
const secondaryButton = cn(
  buttonBase,
  "border border-[#1D1E22]/20 bg-white text-[#1D1E22] hover:bg-[#1D1E22]/5",
);

function CategoryChips({ categories, className }) {
  if (!categories?.length) return null;
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {categories.map((category) => (
        <span
          key={category}
          className="rounded-md bg-terracotta px-2 py-1 font-subtext text-[10px] leading-[13px] tracking-[-0.04em] text-white"
        >
          {category}
        </span>
      ))}
    </div>
  );
}

function AboutContent({ item }) {
  const hasBody = Array.isArray(item.body) && item.body.length > 0;
  if (!item.description && !hasBody) return null;

  return (
    <div className="[&>*:first-child]:mt-0">
      {item.description && (
        <p className="font-article-body">{item.description}</p>
      )}
      <PortableText blocks={item.body} compact />
    </div>
  );
}

function FileSummary({ file }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#1D1E22]/10 bg-white p-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-terracotta/10 text-terracotta">
        <FileText size={20} strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="truncate font-subtext text-[14px] font-medium leading-5 tracking-[-0.02em] text-[#1D1E22]">
          {file.name}
        </p>
        <p className="font-subtext text-[12px] leading-4 tracking-[-0.02em] text-[#1D1E22]/60">
          {[file.label, file.size].filter(Boolean).join(" · ")}
        </p>
      </div>
    </div>
  );
}

const DESKTOP_QUERY = "(min-width: 768px)";
const subscribeToDesktop = (onChange) => {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

// Inline PDF viewers are unreliable on phones, and browsers still download
// iframes hidden with CSS, so the preview is only mounted on desktop.
// Mobile relies on the Open / Download buttons instead.
function PdfPreview({ file, title }) {
  const isDesktop = useSyncExternalStore(
    subscribeToDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
  if (!isDesktop) return null;

  return (
    <div className="min-h-0 flex-1 bg-[#1D1E22]/90 p-3">
      <iframe
        title={`${title} preview`}
        src={`${file.url}#toolbar=0&navpanes=0&view=FitH`}
        className="h-full w-full rounded-md border-0 bg-white"
      />
    </div>
  );
}

function SubmissionSuccess({ title }) {
  const ref = useRef(null);
  // On small screens the success message replaces a long form; bring it
  // into view so people see their submission went through.
  useEffect(() => {
    ref.current?.scrollIntoView({ block: "nearest" });
    ref.current?.focus();
  }, []);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      className="flex h-full flex-col items-center justify-center py-10 text-center outline-none"
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-green/10 text-green">
        <CheckCircle2 size={28} strokeWidth={1.75} />
      </span>
      <h3 className="mt-5 font-title text-[24px] font-bold leading-tight tracking-[-0.03em] text-[#1D1E22]">
        Thank you!
      </h3>
      <p className="mt-2 max-w-[380px] font-subtext text-[15px] leading-5 tracking-[-0.02em] text-[#1D1E22]/70">
        Your “{title}” form has been sent to the Crescent Village team.
      </p>
    </div>
  );
}

function ExternalLinkButton({ link, className }) {
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {link.label}
      <ExternalLink size={16} strokeWidth={1.75} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function FooterActions({ kind, file, link, formId, submission }) {
  if (kind === "online-form") {
    if (submission.status === "success") {
      return <DialogClose className={primaryButton}>Done</DialogClose>;
    }
    const submitting = submission.status === "submitting";
    return (
      <button type="submit" form={formId} disabled={submitting} className={primaryButton}>
        {submitting && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
        {submitting ? "Submitting…" : "Submit form"}
      </button>
    );
  }

  const downloadButton = file && (
    <a href={file.downloadUrl} className={link ? secondaryButton : primaryButton}>
      <Download size={16} strokeWidth={1.75} aria-hidden="true" />
      Download {file.label}
    </a>
  );

  if (kind === "file" && link) {
    return (
      <>
        {downloadButton}
        <ExternalLinkButton link={link} className={primaryButton} />
      </>
    );
  }

  if (kind === "file") {
    return (
      <>
        <a href={file.url} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
          <ExternalLink size={16} strokeWidth={1.75} aria-hidden="true" />
          Open in new tab
        </a>
        {downloadButton}
      </>
    );
  }

  if (kind === "link") {
    return <ExternalLinkButton link={link} className={primaryButton} />;
  }

  return <DialogClose className={secondaryButton}>Close</DialogClose>;
}

function footerHint({ kind, link, submission }) {
  if (kind === "online-form") {
    if (submission.status === "error") return null;
    if (submission.status === "success") return null;
    return "Fields marked * are required.";
  }
  if (link?.host) return `Opens ${link.host} in a new tab.`;
  return null;
}

/**
 * A form or resource card plus its popup. The popup's layout and primary
 * button follow what the item offers (see `describeDocument`).
 */
export default function DocumentCard({ item, type }) {
  const formId = `document-form-${useId()}`;
  const { kind, file, link, meta, cardAction } = describeDocument(item, type);
  const { submission, handleSubmit, reset } = useFormSubmission({
    fields: item.form,
    title: item.title,
  });
  const showPreview = kind === "file" && file.isPdf;
  const isWide = kind === "online-form" || showPreview;
  const hint = footerHint({ kind, link, submission });

  return (
    <Dialog onOpenChangeComplete={(open) => !open && reset()}>
      <article className="group relative flex min-h-[136px] flex-col rounded bg-white p-4 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(29,30,34,0.35)]">
        <div className="flex flex-col-reverse gap-2 md:flex-row md:items-start md:justify-between md:gap-4">
          <h2 className="font-subtext text-[24px] font-medium leading-[31px] tracking-[-0.04em] text-[#1D1E22]">
            {item.title}
          </h2>
          <CategoryChips
            categories={item.categories}
            className="md:max-w-[45%] md:shrink-0 md:justify-end md:pt-1"
          />
        </div>
        {item.description && (
          <p className="mt-2 max-w-[287px] font-subtext text-[12px] leading-4 tracking-[-0.04em] text-[#1D1E22]">
            {item.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="font-subtext text-[11px] leading-[14px] tracking-[-0.02em] text-[#1D1E22]/70">
            {meta}
          </p>
          {/* The ::after overlay makes the whole card open the popup. */}
          <DialogTrigger className="inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-md bg-[#1D1E22] px-3 font-subtext text-[13px] font-medium tracking-[-0.02em] text-cream transition-opacity after:absolute after:inset-0 after:rounded group-hover:opacity-85 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-green">
            {cardAction}
            <span className="sr-only">: {item.title}</span>
            <ArrowRight
              size={14}
              strokeWidth={2}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </DialogTrigger>
        </div>
      </article>

      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-[#1D1E22]/60"
        className={cn(
          "flex max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden rounded-xl bg-cream p-0 text-[#1D1E22] ring-0 sm:max-h-[calc(100dvh-2rem)] sm:w-[calc(100%-2rem)]",
          isWide ? "max-w-[1040px] sm:max-w-[1040px]" : "max-w-[640px] sm:max-w-[640px]",
          // An iframe has no intrinsic height, so give PDF previews room.
          showPreview && "md:h-[min(760px,calc(100dvh-4rem))]",
          kind === "online-form" && "md:max-h-[min(820px,calc(100dvh-4rem))]",
        )}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start gap-4 border-b border-[#1D1E22]/10 px-5 py-4 md:px-8 md:py-6">
          <div className="min-w-0 flex-1">
            <CategoryChips categories={item.categories} className="mb-2.5" />
            <DialogTitle className="font-title text-[22px] font-bold leading-[1.15] tracking-[-0.03em] text-[#1D1E22] md:text-[30px]">
              {item.title}
            </DialogTitle>
            {meta && (
              <DialogDescription className="mt-2 font-subtext text-[13px] leading-4 tracking-[-0.02em] text-[#1D1E22]/60">
                {meta}
              </DialogDescription>
            )}
          </div>
          <DialogClose
            aria-label="Close"
            className="-mr-2 -mt-1 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#1D1E22] transition-colors hover:bg-[#1D1E22]/5 focus-visible:outline-2 focus-visible:outline-green"
          >
            <X size={20} strokeWidth={1.75} />
          </DialogClose>
        </div>

        {/* Body: stacked and scrolling as one on mobile; side-by-side
            columns that scroll independently on desktop. */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto md:flex-row md:overflow-hidden">
          {kind === "online-form" && (
            <>
              {(item.description || item.body?.length > 0) && (
                <section
                  aria-label="About this form"
                  className="px-5 py-5 md:w-[38%] md:shrink-0 md:overflow-y-auto md:px-8 md:py-6"
                >
                  <AboutContent item={item} />
                </section>
              )}
              <section
                aria-label="Form"
                className="flex-1 border-t border-[#1D1E22]/10 bg-white px-5 py-5 md:overflow-y-auto md:border-l md:border-t-0 md:px-8 md:py-6"
              >
                {submission.status === "success" ? (
                  <SubmissionSuccess title={item.title} />
                ) : (
                  <OnlineFormFields id={formId} fields={item.form} onSubmit={handleSubmit} />
                )}
              </section>
            </>
          )}

          {kind === "file" && (
            <>
              <div
                className={cn(
                  "space-y-5 px-5 py-5 md:overflow-y-auto md:px-8 md:py-6",
                  showPreview ? "md:w-[360px] md:shrink-0" : "flex-1",
                )}
              >
                <AboutContent item={item} />
                <FileSummary file={file} />
              </div>
              {showPreview && <PdfPreview file={file} title={item.title} />}
            </>
          )}

          {(kind === "link" || kind === "notice") && (
            <div className="flex-1 px-5 py-5 md:overflow-y-auto md:px-8 md:py-6">
              <AboutContent item={item} />
            </div>
          )}
        </div>

        {/* Footer: the call to action is always visible. */}
        <div className="flex shrink-0 flex-col gap-3 border-t border-[#1D1E22]/10 bg-cream px-5 py-4 sm:flex-row sm:items-center sm:justify-end md:px-8">
          {submission.status === "error" && kind === "online-form" ? (
            <p
              role="alert"
              className="font-subtext text-[13px] leading-4 tracking-[-0.02em] text-red-700 sm:mr-auto"
            >
              {submission.message}
            </p>
          ) : (
            hint && (
              <p className="font-subtext text-[13px] leading-4 tracking-[-0.02em] text-[#1D1E22]/60 sm:mr-auto">
                {hint}
              </p>
            )
          )}
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <FooterActions
              kind={kind}
              file={file}
              link={link}
              formId={formId}
              submission={submission}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
