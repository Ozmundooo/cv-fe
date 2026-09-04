import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import SampleAboutHeroImage from "@/assets/SampleAboutHeroImage.png";
import ImpactGrid from "@/components/ImpactGrid";
import AwardsSection from "@/components/AwardsSection";
import SampleAwardOne from "@/assets/SampleAwardOne.png";
import SampleAwardTwo from "@/assets/SampleAwardTwo.png";
import SampleAwardThree from "@/assets/SampleAwardThree.png";
import TeamCard from "@/components/TeamCard";
import HomeFeatureCards from "@/components/HomeFeatureCards";
import PartnersScroller from "@/components/PartnersScroller";
import Link from "next/link";
import SampleNewsPhotoOne from "@/assets/SampleNewsPhotoOne.png";
import SampleProgramsPhotoOne from "@/assets/SampleProgramsPhotoOne.png";
import SampleLogo from "@/assets/SampleLogo.svg";
import { Calendar, ChevronRight } from "lucide-react";

const impactItems = [
  {
    title: "A Thriving Community for Families",
    value: "198+",
    description:
      "Family housing units providing safe, affordable homes where residents can build strong futures and lasting community connections.",
    className: "bg-sand text-[#1D1E22]",
  },
  {
    title: "Supporting Our Community for Decades",
    value: "30+ Years",
    description:
      "Since welcoming its first residents in 1993, Crescent Village has been creating opportunities through affordable housing, community programs, and resident support.",
    className: "bg-[#839B78] text-cream",
  },
  {
    title: "Programs for Every Stage of Life",
    value: "All Ages",
    description:
      "From children and youth to adults and seniors, Crescent Village offers programs and services that inspire learning, connection, wellness, and community engagement.",
    className: "bg-terracotta text-cream",
  },
];

const awards = [
  {
    id: "ontario-trillium-2018",
    title: "Award for Excellence",
    presentedBy: "Ontario Trillium Foundation",
    year: "2018",
    image: SampleAwardOne,
    description:
      "Recognized for creating an inclusive and thriving community by delivering exceptional resident programs, fostering meaningful partnerships, and providing outstanding affordable housing services.",
  },
  {
    id: "onpha-2012",
    title: "Award for Excellence",
    presentedBy: "Ontario Non-Profit Housing Association (ONPHA)",
    year: "2012",
    image: SampleAwardTwo,
    description:
      "Recognized for creating an inclusive and thriving community by delivering exceptional resident programs, fostering meaningful partnerships, and providing outstanding affordable housing services.",
  },
  {
    id: "onpha-2022",
    title: "Award for Excellence",
    presentedBy: "Ontario Non-Profit Housing Association (ONPHA)",
    year: "2022",
    image: SampleAwardThree,
    description:
      "Recognized for creating an inclusive and thriving community by delivering exceptional resident programs, fostering meaningful partnerships, and providing outstanding affordable housing services.",
  },
  {
    id: "onpha-2022",
    title: "Award for Excellence",
    presentedBy: "Ontario Non-Profit Housing Association (ONPHA)",
    year: "2022",
    image: SampleAwardThree,
    description:
      "Recognized for creating an inclusive and thriving community by delivering exceptional resident programs, fostering meaningful partnerships, and providing outstanding affordable housing services.",
  },
  {
    id: "onpha-2022",
    title: "Award for Excellence",
    presentedBy: "Ontario Non-Profit Housing Association (ONPHA)",
    year: "2022",
    image: SampleAwardThree,
    description:
      "Recognized for creating an inclusive and thriving community by delivering exceptional resident programs, fostering meaningful partnerships, and providing outstanding affordable housing services.",
  },
];

const partners = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  image: SampleLogo,
  alt: `Partner ${index + 1} Logo`,
}));

const featureCards = [
  {
    eyebrow: "About",
    title: "Building Community Through Connection & Care",
    description:
      "For over 30 years, Crescent Village has supported individuals and families through affordable housing, community programs, and trusted services that help residents connect, grow, and thrive.",
    action: "Discover Our Story",
    href: "/about",
    image: SampleAboutHeroImage,
    overlay: "sand",
    textClassName: "text-[#1D1E22]",
    buttonClassName: "border-[#1D1E22] bg-[#1D1E22] text-white",
  },
  {
    eyebrow: "Crescent Village Senior Housing Corp",
    title: "Comfort, Independence & Community",
    description:
      "Crescent Village Senior Housing Corp. provides affordable, supportive housing where older adults can live independently while staying connected to a caring community.",
    action: "Explore Senior Housing",
    href: "/senior-housing",
    image: SampleProgramsPhotoOne,
    overlay: "dark",
    contentPosition: "right",
    textClassName: "text-cream",
    buttonClassName: "border-cream bg-cream text-[#202622]",
  },
  {
    eyebrow: "Crescent Village Trust",
    title: "Supporting Our Community for Generations",
    description:
      "Crescent Village Trust helps strengthen our community by supporting initiatives, partnerships, and opportunities that create lasting impact for residents and families.",
    action: "Learn About the Trust",
    href: "/trust",
    image: SampleNewsPhotoOne,
    overlay: "gold",
    textClassName: "text-cream",
    buttonClassName: "border-cream bg-cream text-[#202622]",
  },
];

export default function Home() {
  const sampleNewsCount = 2;
  const sampleProgramsCount = 2;
  return (
    <main className="relative">
      <Navbar active="Home" className="absolute inset-x-0 top-0 z-10" />
      <section className="relative min-h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/homeVideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-end mb-10 px-5 pt-24">
          <h1 className="font-home-hero-title max-w-[700px] text-center">
            More Than Housing. A Place to Belong.
          </h1>
          <div className="mt-10 flex flex-wrap justify-center gap-[30px]">
            <Link
              href="/about"
              className="flex h-[38px] w-[123px] items-center justify-center gap-3 rounded-md bg-green font-subtext text-[15px] font-medium tracking-[-0.04em] text-cream transition-opacity hover:opacity-90"
            >
              Learn more
              <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </Link>
            <a
              href="#"
              className="flex h-[38px] w-[131px] items-center justify-center gap-2 rounded-md  bg-cream font-subtext text-[15px] font-medium tracking-[-0.04em] text-[#1D1E22] transition-opacity hover:opacity-90"
            >
              Fill out forms
              <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto my-20 max-w-[1400px] px-5 md:px-10">
        <div className="mx-auto flex w-fit gap-2 text-center">
          <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
          <h2 className="font-about-mvv-titles">Our Story</h2>
        </div>
        <div className="mt-8">
          <p className="font-about-mvv-description text-center">
            For more than 30 years, Crescent Village has provided affordable
            housing, meaningful programs, and trusted community services that
            help residents of all ages thrive. Together, we're creating a
            welcoming community where everyone has the opportunity to connect,
            learn, and grow.
          </p>
        </div>
      </section>
      <section className="mx-auto my-20 max-w-[1400px] px-5 md:px-10">
        <div className="flex gap-2 text-center w-fit mx-auto">
          <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
          <h2 className="font-about-mvv-titles">Our Impact</h2>
        </div>
        <div className="mt-8">
          <ImpactGrid items={impactItems} />
        </div>
      </section>
      <HomeFeatureCards cards={featureCards} />
      <section className="mx-auto mt-40 mb-30 max-w-[1400px] px-5 md:px-10">
        <h2 className="font-team-heading mt-8 max-w-[622px]">
          Programs That Bring Our Community Together
        </h2>
        <p className="font-team-intro mt-5 max-w-[622px]">
          Explore a variety of programs designed to support learning, wellness,
          recreation, and meaningful connections for residents of all ages.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 ">
          {Array.from({ length: sampleProgramsCount }).map((_, programs) => (
            <Link
              href={"/programs/sample-1"}
              key={programs}
              className=" group bg-[#FFFFFF] relative"
            >
              <div className="absolute top-3 right-3 px-3 py-1 bg-terracotta rounded">
                <span className="font-card-news-type  text-white">
                  Program Type
                </span>
              </div>

              <Image
                src={SampleProgramsPhotoOne}
                alt={`Program ${programs + 1} Photo`}
                className="w-full m-auto"
              />
              <div className="py-6 px-8 bg-sand group-hover:bg-sand/80 transition-all duration-150 ease-in-out">
                <h2 className="font-card-title lg:w-3/4">
                  Growing Together Community Garden Program
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto my-20 max-w-[1400px] px-5 md:px-10">
        <AwardsSection awards={awards} />
      </section>
      <section className="mx-auto mt-40 mb-30  ">
        <div className="flex gap-2 text-center w-fit mx-auto">
          <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
          <h2 className="font-about-mvv-titles">Our Partners</h2>
        </div>
        <PartnersScroller partners={partners} />
      </section>

      <section className="mx-auto mt-40 mb-30 max-w-[1400px] px-5 md:px-10">
        <h2 className="font-team-heading mt-8">
          Latest News & Community Updates
        </h2>
        <p className="font-team-intro mt-5 max-w-[622px]">
          Stay informed with the latest announcements, community stories,
          upcoming events, and important updates from across Crescent Village.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 ">
          {Array.from({ length: sampleNewsCount }).map((_, news) => (
            <Link
              href={"/news/sample-1"}
              key={news}
              className=" group bg-[#FFFFFF] relative"
            >
              <div className="absolute top-3 right-3 px-3 py-1 bg-terracotta rounded">
                <span className="font-card-news-type  text-white">
                  News Type
                </span>
              </div>

              <Image
                src={SampleNewsPhotoOne}
                alt={`News ${news + 1} Photo`}
                className="w-full m-auto"
              />
              <div className="py-6 px-8 bg-sand group-hover:bg-sand/80 transition-all duration-150 ease-in-out">
                <div className="flex items-center mb-2">
                  <Calendar
                    className="inline-block mr-2"
                    size={20}
                    strokeWidth={1}
                  />
                  <p className="font-card-date">August 24th, 2026</p>
                </div>
                <h2 className="font-card-title lg:w-3/4">
                  Celebrating Our Community, One Neighbour at a Time
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
