// Editors often paste bare domains ("york.ca/SeniorsandHeat.") into link
// fields. Turn those into working absolute URLs.
export function normalizeHref(href) {
  const value = href?.trim();
  if (!value) return null;
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(value)) return value;
  if (/^[\w-]+(\.[\w-]+)+/.test(value)) {
    return `https://${value.replace(/[.,;:)]+$/, "")}`;
  }
  return value;
}

export function isExternalHref(href) {
  return /^https?:/i.test(href ?? "");
}

export function hostnameOf(href) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function blockText(block) {
  return (block?.children ?? []).map((child) => child.text ?? "").join("");
}

/** Every link in a Portable Text body, with the text of the paragraph it sits in. */
export function getBodyLinks(blocks) {
  return (blocks ?? []).flatMap((block) =>
    (block.markDefs ?? [])
      .filter((mark) => mark._type === "link" && mark.href)
      .map((mark) => ({
        href: normalizeHref(mark.href),
        context: blockText(block),
      })),
  );
}
