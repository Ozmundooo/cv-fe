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
import Link from "next/link";
import SampleNewsPhotoOne from "@/assets/SampleNewsPhotoOne.png";
import { Calendar } from "lucide-react";
const missionVisionValues = [
  {
    title: "Our Mission",
    description:
      "For more than 30 years, Crescent Village has provided affordable housing, meaningful programs, and trusted community services that help residents of all ages thrive. Together, we're creating a welcoming community where everyone has the opportunity to connect, learn, and grow.",
  },
  {
    title: "Our Vision",
    description:
      "For more than 30 years, Crescent Village has provided affordable housing, meaningful programs, and trusted community services that help residents of all ages thrive. Together, we're creating a welcoming community where everyone has the opportunity to connect, learn, and grow.",
  },
  {
    title: "Our Values",
    description:
      "For more than 30 years, Crescent Village has provided affordable housing, meaningful programs, and trusted community services that help residents of all ages thrive. Together, we're creating a welcoming community where everyone has the opportunity to connect, learn, and grow.",
  },
];

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

export default function About() {
  const sampleNewsCount = 2;
  return (
    <main>
      <Navbar active="" />
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 lg:py-20">
        <h1 className="font-about-hero-title text-center">
          It&apos;s about creating a community where people feel supported,
          connected, and empowered to thrive together.
        </h1>
        <Image
          src={SampleAboutHeroImage}
          alt="About Hero"
          width={800}
          height={800}
          className="mx-auto mt-8 max-w-[800px] "
        />
      </section>
      <section className="mx-auto max-w-[1400px] my-20">
        <div className="space-y-12">
          {missionVisionValues.map(({ title, description }) => (
            <div key={title} className="grid grid-cols-2 lg:grid-cols-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
                <h2 className="font-about-mvv-titles">{title}</h2>
              </div>
              <p className="font-about-mvv-description lg:col-span-2">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto my-20 max-w-[1400px] px-5 md:px-10">
        <div className="flex gap-2">
          <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
          <h2 className="font-about-mvv-titles">Our Impact</h2>
        </div>
        <div className="mt-8">
          <ImpactGrid items={impactItems} />
        </div>
      </section>
      <section className="mx-auto my-20 max-w-[1400px] px-5 md:px-10">
        <AwardsSection awards={awards} />
      </section>
      <section className="mx-auto mt-40 max-w-[1400px] px-5 md:px-10">
        <div className="flex gap-2">
          <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
          <h2 className="font-about-mvv-titles">Board of Directors</h2>
        </div>
        <h2 className="font-team-heading mt-8">Leadership & Governance</h2>
        <p className="font-team-intro mt-5 max-w-[622px]">
          Meet the dedicated Board of Directors guiding Crescent Village's
          vision, governance, and long-term commitment to the community.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
        </div>
      </section>
      <section className="mx-auto mt-40 max-w-[1400px] px-5 md:px-10">
        <div className="flex gap-2">
          <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
          <h2 className="font-about-mvv-titles">Our Team</h2>
        </div>
        <h2 className="font-team-heading mt-8">
          The People Behind Crescent Village
        </h2>
        <p className="font-team-intro mt-5 max-w-[622px]">
          Our team is committed to creating a welcoming, supportive community by
          delivering programs, services, and everyday support for residents.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
        </div>
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
