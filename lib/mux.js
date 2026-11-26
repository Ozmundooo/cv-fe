/**
 * Still frame from a public Mux video. `time` is in seconds; 0 matches the
 * first frame, so it doubles as a seamless poster for autoplaying video.
 * https://www.mux.com/docs/guides/get-images-from-a-video
 */
export function muxThumbnailUrl(
  playbackId,
  { width, time = 0, format = "webp" } = {},
) {
  if (!playbackId) return null;
  const params = new URLSearchParams({ time: String(time) });
  if (width) params.set("width", String(width));
  return `https://image.mux.com/${playbackId}/thumbnail.${format}?${params}`;
}

/** `src`/`srcSet`/`sizes` for a responsive <img> of a Mux video frame. */
export function muxThumbnailProps(
  playbackId,
  { widths = [640, 1280, 1920], sizes = "100vw", ...options } = {},
) {
  if (!playbackId) return null;
  const urlFor = (width) => muxThumbnailUrl(playbackId, { ...options, width });

  return {
    src: urlFor(widths[widths.length - 1]),
    srcSet: widths.map((width) => `${urlFor(width)} ${width}w`).join(", "),
    sizes,
  };
}
