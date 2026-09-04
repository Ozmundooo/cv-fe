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
import ResidenceBedroom from "@/assets/Residence/Group 96.png";
import ResidenceKitchen from "@/assets/Residence/Group 97.png";
import ResidenceBathroom from "@/assets/Residence/Group 98.png";
import ResidenceLivingRoom from "@/assets/Residence/Group 99.png";
import ResidenceExterior from "@/assets/Residence/Group 100.png";
import ResidenceBathroomDetail from "@/assets/Residence/Group 101.png";
import AboutTheResidence from "@/assets/AboutTheResidence.png";
import { Calendar, ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const impactItems = [
  {
    title: "Serving Our Community Since",
    value: "2015",
    description:
      "Providing affordable independent housing where older adults can enjoy comfort, stability, and a welcoming community.",
    className: "bg-terracotta text-[#F8F4EC]",
  },
  {
    title: "Purpose-Built Senior Apartments",
    value: "28",
    description:
      "One-bedroom, semi-modified apartments designed to support independent living in a safe and welcoming environment.",
    className: "bg-[#839B78] text-cream",
  },
  {
    title: "Designed Exclusively For",
    value: "65+",
    suffix: "Years of Age",
    description:
      "Affordable Market Rent housing created for adults aged 65 and older, fostering independence and lasting community.",
    className: "bg-[#D5A84C] text-cream",
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

const residenceFeatures = [
  {
    title: "One-Bedroom Suites",
    description:
      "Comfortable semi-modified apartments designed for independent living.",
    image: ResidenceBedroom,
  },
  {
    title: "Affordable Market Rent",
    description:
      "Affordable rental housing through the Affordable Housing Program.",
    image: ResidenceExterior,
  },
  {
    title: "Community Living",
    description:
      "A welcoming environment where residents can remain active and connected.",
    image: ResidenceLivingRoom,
  },
  {
    title: "Safe & Comfortable",
    description:
      "Thoughtfully maintained residences designed for comfort and security.",
    image: ResidenceBathroom,
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
      <section className="grid lg:grid-cols-2 min-h-screen overflow-hidden max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="bg-green flex flex-col  justify-end px-8 py-10">
          <h1 className="font-trust-hero-title max-w-[720px] ">
            Affordable Independent Living for Older Adults
          </h1>
          <h3 className="font-subtext text-[15px] leading-[31px] max-w-[720px] tracking-[-0.04em] text-cream  mt-4">
            Providing affordable, comfortable housing for adults aged 65 and
            older, designed to support independent living in a welcoming
            community.
          </h3>
        </div>
        <Image
          src={SampleNewsPhotoOne}
          alt="Supporting Communities Through Compassionate Giving"
          className="w-full h-full object-cover"
        />
      </section>
      <section className="mx-auto my-20 max-w-[1400px] px-5 md:px-10">
        <div className="">
          <ImpactGrid items={impactItems} />
        </div>
      </section>
      <section className="mx-auto mt-40 max-w-[1400px] px-5 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Image
            src={AboutTheResidence}
            alt="Resident receiving community support"
            className="h-full min-h-[360px] w-full rounded-md object-cover"
          />
          <div>
            <div className="flex items-center gap-3">
              <span className="h-[14px] w-[14px] rounded-full bg-[#1D1E22]" />
              <p className="font-subtext text-[15px] font-medium uppercase leading-5 tracking-[-0.04em] text-[#1D1E22]">
                About the Residence
              </p>
            </div>
            <h2 className="font-team-heading mt-8 max-w-[622px]">
              Comfort, Independence, and Community
            </h2>
            <p className="font-team-intro mt-5 max-w-[622px]">
              Crescent Village Senior Housing Corporation provides affordable
              housing for adults aged 65 and older through the Affordable
              Housing Program.
            </p>
            <p className="font-team-intro mt-5 max-w-[622px]">
              The residence consists of 28 one-bedroom, semi-modified apartments
              that promote independent living within a welcoming community
              environment.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto mt-40 max-w-[1400px] px-5 md:px-10">
        <h2 className="font-team-heading max-w-[622px]">
          Designed For Independent Living
        </h2>
        <p className="font-team-intro mt-5 max-w-[400px]">
          Comfortable housing that supports independent living while fostering
          connection and community.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {residenceFeatures.map((feature) => (
            <article
              key={feature.title}
              className="overflow-hidden rounded-md bg-white"
            >
              <Image
                src={feature.image}
                alt=""
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-subtext text-[20px] font-medium leading-5 tracking-[-0.04em] text-[#1D1E22]">
                  {feature.title}
                </h3>
                <p className="mt-2 font-subtext text-[12px] leading-4 tracking-[-0.04em] text-[#1D1E22]/80">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto mt-40 max-w-[1400px] px-5 md:px-10">
        <h2 className="font-team-heading max-w-[622px]">
          Take a Look Inside the Residence
        </h2>
        <p className="font-team-intro mt-5 max-w-[400px]">
          Explore the welcoming spaces that make Crescent Village Senior Housing
          Corporation a comfortable place to call home.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-3">
          <Image
            src={ResidenceBedroom}
            alt="Bedroom suite"
            className=" h-full w-full rounded-md object-cover"
          />
          <div className="grid lg:grid-cols-2 gap-3">
            <Image
              src={ResidenceLivingRoom}
              alt="Living room"
              className="h-full w-full rounded-md object-cover"
            />
            <Image
              src={ResidenceBathroomDetail}
              alt="Bathroom"
              className="h-full w-full rounded-md object-cover"
            />
            <Image
              src={ResidenceExterior}
              alt="Residence exterior"
              className="h-full w-full rounded-md object-cover"
            />
            <Image
              src={ResidenceKitchen}
              alt="Kitchen"
              className="h-full w-full rounded-md object-cover"
            />
          </div>
          <Image
            src={ResidenceBathroom}
            alt="Bathroom"
            className="h-full w-full rounded-md object-cover"
          />
        </div>
      </section>
      <section className="mx-auto mt-40 mb-30 max-w-[1400px] px-5 md:px-10">
        <div className="mx-auto flex w-fit gap-2 text-center">
          <div className="h-3 w-3 shrink-0 rounded-full bg-black"></div>
          <h2 className="font-about-mvv-titles">Frequently Asked Questions</h2>
        </div>
        <h2 className="font-team-heading mt-8 text-center">
          Questions About <br></br>Senior Housing?
        </h2>
        <p className="font-team-intro mt-5 max-w-[400px] mx-auto text-center">
          Find answers to common questions about eligibility, the residence, and
          the Affordable Housing Program.
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
