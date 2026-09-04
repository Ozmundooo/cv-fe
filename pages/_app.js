import "@/styles/globals.css";
import { DM_Sans, Fraunces } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-dm-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-fraunces",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${dmSans.variable} ${fraunces.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
