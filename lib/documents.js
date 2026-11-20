import { getBodyLinks, hostnameOf, isExternalHref } from "@/lib/links";

export function formatBytes(bytes) {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

// Dates are stored as "YYYY-MM-DD" and parsed as UTC midnight; formatting in
// UTC stops "2026-10-01" showing as "Sep 2026" in North American time zones.
export function formatUpdatedAt(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

// The button label for an external link is inferred from the sentence the
// link sits in (e.g. "Link to signup") and the item's title.
const LINK_LABELS = [
  [/regist/i, "Register online"],
  [/\bappl(y|ying|ication)\b/i, "Apply online"],
  [/survey/i, "Take the survey"],
  [/sign\s?-?up|rsvp/i, "Sign up online"],
];

function primaryLink(item, type) {
  const link = getBodyLinks(item.body).find(
    ({ href }) => isExternalHref(href) && !/google\.[a-z.]+\/maps/i.test(href),
  );
  if (!link) return null;

  const text = `${link.context} ${item.title ?? ""}`;
  const label =
    LINK_LABELS.find(([pattern]) => pattern.test(text))?.[1] ??
    (type === "form" ? "Open online form" : "Visit website");

  return { href: link.href, label, host: hostnameOf(link.href) };
}

/**
 * Works out what a form/resource actually offers, which decides the popup
 * layout and its call to action:
 * - "online-form": has fields  -> fill in and submit here
 * - "file":        has a file  -> preview / download (plus any sign-up link)
 * - "link":        body links out to an external form or site
 * - "notice":      text only   -> read and close
 */
export function describeDocument(item, type) {
  const hasFields = item.form?.length > 0;
  const extension = (
    item.fileExtension ||
    item.fileName?.split(".").pop() ||
    ""
  ).toLowerCase();

  const file = item.fileUrl
    ? {
        url: item.fileUrl,
        name: item.fileName || item.title,
        downloadUrl: `${item.fileUrl}?dl=${encodeURIComponent(item.fileName ?? "")}`,
        label: extension ? extension.toUpperCase() : "File",
        size: formatBytes(item.fileSize),
        isPdf: extension === "pdf",
      }
    : null;
  // With online fields, submitting here is the action; body links are just
  // contact details.
  const link = hasFields ? null : primaryLink(item, type);
  const kind = hasFields ? "online-form" : file ? "file" : link ? "link" : "notice";

  const typeLabel = {
    "online-form": "Online form",
    file: [file?.label, file?.size].filter(Boolean).join(" · "),
    link: link?.host ? `Link · ${link.host}` : "Link",
    notice: null,
  }[kind];

  return {
    kind,
    file,
    link,
    meta: [typeLabel, item.updatedAt && `Updated ${formatUpdatedAt(item.updatedAt)}`]
      .filter(Boolean)
      .join(" · "),
    cardAction: {
      "online-form": "Fill out online",
      file: link ? "View details" : file?.isPdf ? "View PDF" : "View file",
      link: "View details",
      notice: "Read more",
    }[kind],
  };
}
