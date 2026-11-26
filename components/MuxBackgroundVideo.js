import dynamic from "next/dynamic";
import Head from "next/head";
import { muxThumbnailProps } from "@/lib/mux";

// Mux's playback engine bundles hls.js (~600 KB), so it is loaded after the
// page is interactive rather than in the page's main bundle. Until it starts
// streaming, the server-rendered first-frame image below fills the space.
const MuxVideo = dynamic(() => import("@mux/mux-video-react"), { ssr: false });

/**
 * Muted, looping, decorative background video streamed from Mux.
 * `className` is applied to both the poster image and the video, so pass
 * positioning/sizing classes (e.g. "absolute inset-0 h-full w-full object-cover").
 */
export default function MuxBackgroundVideo({ playbackId, title, className }) {
  if (!playbackId) return null;

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://stream.mux.com" />
      </Head>
      {/* An empty <video> is transparent, so this stays visible until the
          first frame paints, and remains as the fallback if autoplay is
          blocked (e.g. iOS Low Power Mode). */}
      <img
        {...muxThumbnailProps(playbackId)}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className={className}
      />
      <MuxVideo
        playbackId={playbackId}
        streamType="on-demand"
        autoPlay="muted"
        muted
        loop
        playsInline
        disableCookies
        metadata={title ? { video_title: title } : undefined}
        aria-hidden="true"
        tabIndex={-1}
        className={className}
      />
    </>
  );
}
