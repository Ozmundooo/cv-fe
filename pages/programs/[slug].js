import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { CalendarDays, MapPin, UserRound } from "lucide-react";
import SampleProgramsPhotoOne from "@/assets/SampleProgramsPhotoOne.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const span = (key, text) => ({ _key: key, _type: "span", text });
const block = (key, text, style = "normal", listItem) => ({
  _key: key,
  _type: "block",
  style,
  ...(listItem ? { listItem } : {}),
  children: [span(`${key}-text`, text)],
});

const sampleProgram = {
  title: "Growing Together Community Garden Program",
  description:
    "Build new skills, connect with neighbours, and enjoy the benefits of growing fresh produce in a welcoming community garden designed for residents of all ages and experience levels.",
  type: "Program Type",
  summary:
    "The Growing Together Community Garden Program provides residents with the opportunity to cultivate their own garden plots while participating in seasonal workshops, volunteer initiatives, and community harvest events.",
  details: [
    { label: "Age Group", value: "All Ages", icon: UserRound },
    {
      label: "Location",
      value: "Crescent Village Community Garden",
      icon: MapPin,
    },
    {
      label: "Schedule",
      value: "Every Wednesday 6:00 PM - 8:00 PM",
      icon: CalendarDays,
    },
  ],
  body: [
    block("about", "About the Program", "h2"),
    block(
      "about-one",
      "The Growing Together Community Garden Program was created to encourage healthy living, environmental stewardship, and meaningful community connections. Participants receive access to shared garden spaces, educational workshops, gardening tools, and ongoing support from experienced volunteers and community partners.",
    ),
    block(
      "about-two",
      "Throughout the growing season, residents work alongside one another to plant vegetables, herbs, flowers, and native plants while learning sustainable gardening techniques and building lasting relationships within the Crescent Village community.",
    ),
    block(
      "about-three",
      "The program welcomes participants of all skill levels and encourages families, seniors, youth, and individuals to get involved.",
    ),
    {
      _key: "gallery",
      _type: "imageGallery",
      images: [SampleProgramsPhotoOne, SampleProgramsPhotoOne],
    },
    block("learn", "What You'll Learn", "h2"),
    block(
      "learn-intro",
      "Participants will have opportunities to develop practical gardening skills, including:",
    ),
    block(
      "learn-list",
      "Soil preparation and garden planning\nPlanting seasonal vegetables and flowers\nComposting and sustainable gardening practices\nWater conservation techniques\nHarvesting and food preservation basics\nCreating pollinator-friendly gardens",
      "normal",
      "bullet",
    ),
    block("learn-note", "No previous gardening experience is required."),
    block("seasonal", "Seasonal Activities", "h2"),
    block(
      "seasonal-intro",
      "Throughout the year, the program offers a variety of activities including:",
    ),
    block(
      "seasonal-list",
      "Spring planting workshops\nWeekly community gardening sessions\nChildren's nature activities\nGuest speakers from local horticultural organizations\nSummer harvest celebrations\nFall garden cleanup and composting workshops",
      "normal",
      "bullet",
    ),
    block(
      "seasonal-note",
      "Additional special events may be announced throughout the season.",
    ),
  ],
  faqs: [
    [
      "Is gardening experience required?",
      "No. The program is designed for residents of every experience level, with guidance and workshops available throughout the season.",
    ],
    [
      "Is there a cost to participate?",
      "The program is offered to Crescent Village residents. Contact the community team for current registration details.",
    ],
    [
      "Can children participate?",
      "Yes. Families are welcome, and children can participate alongside a parent or guardian.",
    ],
    [
      "What happens if it rains?",
      "Outdoor sessions may be adjusted for weather. Registered participants receive updates about any schedule changes.",
    ],
  ],
};

function PortableText({ blocks }) {
  return blocks.map((contentBlock) => {
    if (contentBlock._type === "imageGallery") {
      return (
        <div key={contentBlock._key} className="my-10 grid grid-cols-2 gap-2">
          {contentBlock.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="Community garden program participants"
              className="aspect-square w-full rounded-md object-cover"
            />
          ))}
        </div>
      );
    }

    const text = contentBlock.children.map((child) => child.text).join("");
    if (contentBlock.style === "h2")
      return (
        <h2
          key={contentBlock._key}
          className="font-article-heading mt-10 border-t border-[#202622] pt-10 first:mt-0 first:border-0 first:pt-0"
        >
          {text}
        </h2>
      );
    if (contentBlock.listItem === "bullet")
      return (
        <ul
          key={contentBlock._key}
          className="font-article-body my-5 list-disc space-y-1 pl-5"
        >
          {text.split("\n").map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    return (
      <p key={contentBlock._key} className="font-article-body mt-5">
        {text}
      </p>
    );
  });
}

export default function Program() {
  return (
    <main className="bg-cream">
      <Navbar active="Programs" />
      <section className="mx-auto max-w-[890px] px-5 pt-24 text-center lg:pt-28">
        <div className="w-fit mx-auto px-3 py-1 bg-terracotta rounded mb-5">
          <span className="font-card-news-type text-white">
            {sampleProgram.type}
          </span>
        </div>
        <h1 className="font-title mt-7 text-center font-semibold tracking-[-0.08em]">
          {sampleProgram.title}
        </h1>
        <p className="font-subtext mx-auto mt-5 max-w-[622px] text-center text-[#202622]/80">
          {sampleProgram.description}
        </p>
        <Image
          src={SampleProgramsPhotoOne}
          alt="Participants preparing food at a Crescent Village community event"
          className="mt-10 aspect-[890/593] w-full rounded-md object-cover"
          priority
        />
      </section>

      <section className="mx-auto max-w-[630px] px-5 pt-8">
        <div className="grid gap-3 sm:grid-cols-3">
          {sampleProgram.details.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex min-h-[85px] my-auto  gap-3 rounded-md bg-terracotta px-3 py-3 text-left text-cream"
            >
              <Icon size={24} strokeWidth={1.5} className="mt-2" />
              <div className="mt-2">
                <p className="font-subtext text-[13px] leading-4 text-cream">
                  <strong className="block font-medium text-[20px] mb-2">
                    {label}
                  </strong>
                </p>
                <p className="font-subtext text-[13px] leading-4 text-cream">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="font-article-body mx-auto mt-8 max-w-[613px] border-b border-[#202622] pb-5 text-center font-medium">
          {sampleProgram.summary}
        </p>
      </section>

      <article className="mx-auto max-w-[613px] px-5 py-10">
        <PortableText blocks={sampleProgram.body} />
      </article>

      <section className="mx-auto max-w-[613px] px-5 pb-20">
        <h2 className="font-article-heading text-[36px] leading-[44px]">
          What Else Would You Like To Know?
        </h2>
        <Accordion className="mt-8" multiple>
          {sampleProgram.faqs.map(([question, answer]) => (
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
