import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import SampleNewsPhotoOne from "@/assets/SampleNewsPhotoOne.png";
import { Calendar } from "lucide-react";
import Link from "next/link";

const sampleArticle = {
  title: "Celebrating Our Community, One Neighbour at a Time",
  description:
    "Stay informed with the latest announcements, upcoming events, community stories, and important updates from Crescent Village.",
  type: "News Type",
  body: [
    {
      _key: "intro",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "intro-text",
          _type: "span",
          text: "It often creeps in after a packed morning of Zoom calls, desk work, and endless decision-making. Your eyes blur, your focus softens, and you find yourself rereading the same line three times. The mid-afternoon slump doesn't just disrupt your rhythm. It lowers cognitive flexibility, impairs short-term memory, and reduces your capacity to perform executive tasks that demand sustained attention and clarity.",
        },
      ],
    },
    {
      _key: "intro-follow-up",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "intro-follow-up-text",
          _type: "span",
          text: "This lull isn't a personal flaw or a matter of poor willpower. It's a predictable physiological shift that affects even the most organized and rested individuals. When left unaddressed, it leads to a cycle of inefficiency, poor posture, stress snacking, and late-day burnout.",
        },
      ],
    },
    {
      _key: "intro-conclusion",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "intro-conclusion-text",
          _type: "span",
          text: "While caffeine or sugary snacks might offer a temporary lift, they often come with a crash. Instead, Red Light Therapy (RLT) offers a physiological and neurological reset that works with your body's own energy systems.",
        },
      ],
    },
    {
      _key: "biological-slowdown",
      _type: "block",
      style: "h2",
      children: [
        {
          _key: "biological-slowdown-title",
          _type: "span",
          text: "Understanding the Afternoon Slump: A Biological Slowdown",
        },
      ],
    },
    {
      _key: "circadian-rhythm",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "circadian-rhythm-text",
          _type: "span",
          text: "The mid-afternoon energy dip is tied directly to your circadian rhythm, a roughly 24-hour internal cycle that governs your sleep-wake patterns, alertness, and hormone regulation. Between 2 PM and 4 PM, your body naturally enters a dip in core temperature, which leads to a subtle but measurable rise in melatonin production, the same hormone that prepares you for sleep at night. This transition signals your brain and body to reduce arousal and alertness.",
        },
      ],
    },
    {
      _key: "glucose-levels",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "glucose-levels-text",
          _type: "span",
          text: "At the same time, blood glucose levels often decline post-lunch, while extended screen time and decision fatigue contribute to reduced cognitive function and increased eye strain. These converging factors can create mental fog, physical heaviness, and emotional irritability.",
        },
      ],
    },
    {
      _key: "cellular-level",
      _type: "block",
      style: "h2",
      children: [
        {
          _key: "cellular-level-title",
          _type: "span",
          text: "How Red Light Therapy Intervenes at the Cellular Level",
        },
      ],
    },
    {
      _key: "rlt-explainer",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "rlt-explainer-text",
          _type: "span",
          text: "Red Light Therapy works by delivering specific wavelengths of light (660nm red and 850nm near-infrared) into the skin and muscle tissue. These wavelengths target the mitochondria, the cellular structures responsible for generating ATP (adenosine triphosphate). ATP powers every biological function, from muscle contraction to neurotransmitter firing.",
        },
      ],
    },
    {
      _key: "rlt-benefits",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "rlt-benefits-text",
          _type: "span",
          text: "Re-energize fatigued muscle groups, especially from prolonged sitting or poor posture\nIncrease circulation, improving oxygen delivery and nutrient absorption\nEnhance cognitive clarity, by supporting blood flow to the brain\nBalance the nervous system, counteracting stress-related hormones such as cortisol",
        },
      ],
    },
    {
      _key: "rlt-conclusion",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "rlt-conclusion-text",
          _type: "span",
          text: "This isn't a superficial pick-me-up. RLT resets your cellular performance to re-engage with the day more fully.",
        },
      ],
    },
    { _key: "article-image", _type: "image", asset: SampleNewsPhotoOne },
    {
      _key: "midday-window",
      _type: "block",
      style: "h2",
      children: [
        {
          _key: "midday-window-title",
          _type: "span",
          text: "Midday as a Biologically Optimal Window for RLT",
        },
      ],
    },
    {
      _key: "midday-explainer",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "midday-explainer-text",
          _type: "span",
          text: "Using RLT during the midday dip aligns with natural circadian lows and helps counteract them. Unlike blue light, which may artificially stimulate wakefulness and interfere with melatonin rhythms, red and near-infrared light support alertness without overstimulation.",
        },
      ],
    },
    {
      _key: "midday-benefits",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "midday-benefits-text",
          _type: "span",
          text: "NIR light in particular has been shown to modulate brainwave activity, supporting focus and cognitive endurance. Because RLT does not override your biological rhythms but rather gently restores energy through cellular activation, it provides a sustainable lift without compromising your ability to wind down later in the day.",
        },
      ],
    },
    {
      _key: "midday-conclusion",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "midday-conclusion-text",
          _type: "span",
          text: "In other words, midday RLT supports circadian alignment while also improving resilience (physically and mentally) for the remainder of the day.",
        },
      ],
    },
  ],
};

function PortableText({ blocks }) {
  return blocks.map((block) => {
    if (block._type === "image") {
      return (
        <Image
          key={block._key}
          src={block.asset}
          alt="Crescent Village community building"
          className="my-12 aspect-[400/373] w-full rounded-md object-cover"
        />
      );
    }

    const text = block.children.map((child) => child.text).join("");

    if (block.style === "h2") {
      return (
        <h2 key={block._key} className="font-article-heading mt-12 mb-8">
          {text}
        </h2>
      );
    }

    if (block.listItem === "bullet") {
      return (
        <ul
          key={block._key}
          className="font-article-body my-5 list-disc space-y-1 pl-5"
        >
          {text.split("\n").map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={block._key} className="font-article-body mb-5">
        {text}
      </p>
    );
  });
}

export default function News() {
  return (
    <main className="bg-cream">
      <section className="bg-sand rounded-b-md">
        <Navbar active="News" />

        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-5 pb-10 pt-16 md:px-10 lg:min-h-[600px] lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pb-[50px] lg:pt-20">
          <div className="max-w-[729px]">
            <div className="w-fit px-3 py-1 bg-terracotta rounded mb-5">
              <span className="font-card-news-type text-white">
                {sampleArticle.type}
              </span>
            </div>
            <h1 className="font-title">{sampleArticle.title}</h1>

            <p className="font-subtext mt-8 max-w-[622px]">
              {sampleArticle.description}
            </p>
          </div>
          <Image
            src={SampleNewsPhotoOne}
            alt="Crescent Village community building"
            className="aspect-[440/512] w-full max-w-[440px] rounded-md object-cover"
          />
        </div>
      </section>

      <article className="mx-auto max-w-[600px] px-5 py-20 lg:py-[60px]">
        <PortableText blocks={sampleArticle.body} />
      </article>

      <section className="mx-auto max-w-[1400px] px-5 pb-20 lg:px-10 lg:pb-[60px]">
        <h2 className="font-title text-[48px] leading-[1.15] md:text-[64px] md:leading-[79px]">
          Related News
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            "Celebrating Our Community, One Neighbour at a Time",
            "Celebrating the People Who Make Crescent Village Home",
          ].map((title) => (
            <Link
              href="/news/sample-1"
              key={title}
              className="group overflow-hidden rounded-md"
            >
              <div className="relative">
                <Image
                  src={SampleNewsPhotoOne}
                  alt="Crescent Village community building"
                  className="aspect-[660/500] w-full object-cover"
                />
                <span className="font-card-news-type absolute right-5 top-5 rounded bg-terracotta px-3 py-1 text-white">
                  News Type
                </span>
              </div>
              <div className="bg-sand px-8 py-6 transition-colors group-hover:bg-sand/80">
                <div className="mb-2 flex items-center gap-2">
                  <Calendar size={20} strokeWidth={1} />
                  <time className="font-card-date" dateTime="2026-08-24">
                    August 24th, 2026
                  </time>
                </div>
                <h3 className="font-card-title max-w-[542px]">{title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
