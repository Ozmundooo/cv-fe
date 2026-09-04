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
import CommunityIcon from "@/assets/communityIcon.svg";
import CompassionIcon from "@/assets/compassionIcon.svg";
import InclusionIcon from "@/assets/inclusionIcon.svg";
import { Calendar, ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

const values = [
  {
    id: "compassion",
    title: "Compassion",
    icon: CompassionIcon,
    description:
      "Demonstrating care and empathy in all our interactions, ensuring that every resident feels valued and supported.",
  },

  {
    id: "community",
    title: "Community",
    icon: CommunityIcon,
    description:
      "Fostering a strong sense of community through inclusive programs and initiatives that bring residents together.",
  },
  {
    id: "inclusion",
    title: "Inclusion",
    icon: InclusionIcon,
    description:
      "Promoting diversity and inclusion by creating an environment where everyone feels welcome and respected.",
  },
];

const partners = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  image: SampleLogo,
  alt: `Partner ${index + 1} Logo`,
}));

const featureCards = [
  {
    title: "Senior Wellness",
    description:
      "Supporting programs that promote healthy, active, and connected living for older adults through social engagement, wellness initiatives, and community support.",
    action: "Discover Our Story",

    image: SampleAboutHeroImage,
    overlay: "sand",
    textClassName: "text-[#1D1E22]",
    buttonClassName: "border-[#1D1E22] bg-[#1D1E22] text-white",
  },
  {
    title: "Youth Recreation",
    description:
      "Creating opportunities for children and youth through sports, recreation, and leadership programs that encourage confidence, teamwork, and lifelong participation.",

    image: SampleProgramsPhotoOne,
    overlay: "dark",
    contentPosition: "right",
    textClassName: "text-cream",
    buttonClassName: "border-cream bg-cream text-[#202622]",
  },
  {
    title: "Affordable Housing",
    description:
      "Investing in housing initiatives that provide safe, affordable homes while supporting individuals and families on their journey toward long-term stability.",

    image: SampleNewsPhotoOne,
    overlay: "gold",
    textClassName: "text-cream",
    buttonClassName: "border-cream bg-cream text-[#202622]",
  },
];

export default function Home() {
  const sampleNewsCount = 2;
  const sampleProgramsCount = 2;
  const sampleFaqs = [
    [
      "What is the eligibility criteria?",
      "The eligibility criteria for our programs are based on various factors including age, residency, and specific program requirements.",
    ],
    [
      "How can I apply for support?",
      "You can apply for support by filling out the application form available on our website or contacting our office directly.",
    ],
    [
      "What types of programs are funded?",
      "We fund a wide range of programs including community development, youth recreation, senior wellness, and affordable housing initiatives.",
    ],
  ];
  return (
    <main className="relative">
      <Navbar active="" />
      <section className="relative min-h-screen overflow-hidden max-w-[1400px] mx-auto">
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
        <div className="absolute inset-0 flex flex-col  justify-end mx-10 mb-10 px-5 pt-24">
          <h1 className="font-trust-hero-title max-w-[720px] ">
            Supporting Communities Through Compassionate Giving
          </h1>
          <h3 className="font-subtext text-[15px] leading-[31px] max-w-[720px] tracking-[-0.04em] text-cream  mt-4">
            The Crescent Village Charitable Trust provides funding and support
            to programs that strengthen communities and improve quality of life
            for individuals and families.
          </h3>
        </div>
      </section>

      <section className="mx-auto my-20 max-w-[1000px] px-5 md:px-10">
        <div className="mx-auto flex w-fit gap-2 text-center">
          <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
          <h2 className="font-about-mvv-titles">Our Purpose</h2>
        </div>
        <div className="mt-8">
          <p className="font-about-mvv-description text-center">
            The Crescent Village Charitable Trust was established to invest in
            people, strengthen communities, and create opportunities for
            individuals and families through meaningful charitable initiatives.
            <br></br>
            <br></br>
            By supporting local programs and community partnerships, the Trust
            helps improve quality of life while fostering inclusion, compassion,
            and long-term community well-being.
          </p>
        </div>
      </section>
      <section className="mx-auto my-20 max-w-[1000px] px-5 md:px-10">
        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.id} className="text-center">
              <Image
                src={value.icon}
                alt={value.title}
                className="mx-auto h-16 w-16"
              />
              <h3 className="mt-4 font-subtext text-[24px] font-medium uppercase leading-[31px] tracking-[-0.04em] text-[#1D1E22]">
                {value.title}
              </h3>
              <p className="mx-auto mt-2 max-w-[240px] font-subtext text-[14px] font-medium leading-[18px] tracking-[-0.04em] text-[#1D1E22]">
                {value.description}
              </p>
            </div>
          ))}
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

      <section className="mx-auto mt-40 mb-30 max-w-[1400px] px-5 md:px-10">
        <div className="mx-auto flex w-fit gap-2 text-center">
          <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
          <h2 className="font-about-mvv-titles">Frequently Asked Questions</h2>
        </div>
        <h2 className="font-team-heading mt-8 text-center">
          Questions About <br></br>Trust?
        </h2>
        <p className="font-team-intro mt-5 max-w-[400px] mx-auto text-center">
          Find answers to common questions about eligibility, the residence, and
          the Affordable Housing Program.{" "}
        </p>

        <Accordion className="mt-8 max-w-[613px] mx-auto" multiple>
          {sampleFaqs.map(([question, answer]) => (
            <AccordionItem
              key={question}
              value={question}
              className="border-b border-[#202622]"
            >
              <AccordionTrigger className="font-subtext py-5 text-[18px] text-[#202622] hover:no-underline">
                {question}
              </AccordionTrigger>
              <AccordionContent className="font-article-body pb-5">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <Footer />
    </main>
  );
}
