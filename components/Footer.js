import { Mail, Phone } from "lucide-react";

const pageLinks = ["Home", "About", "Programs", "Partners", "News", "Gallery"];
const helpLinks = ["Resources", "Forms"];

const listClassName =
  "group/list space-y-1.5 w-fit md:space-y-2 [&>li>a]:transition-opacity [&>li:hover>a]:opacity-100 [&>li:hover~li>a]:opacity-45 [&>li:has(~li:hover)>a]:opacity-45";

const linkClassName =
  "block font-subtext text-[28px] w-fit font-medium leading-[1.2] tracking-[-0.04em] text-black opacity-100 transition-opacity duration-200 md:text-[32px] md:leading-[42px]";

export default function Footer() {
  return (
    <footer className="w-full bg-sand rounded-t-3xl">
      <div className="mx-auto max-w-[1400px]  px-5 py-10 md:px-8 md:py-12 lg:px-5 lg:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          <section className="lg:col-span-2">
            <h2 className="max-w-[534px] font-subtext text-[28px] font-medium leading-[1.2] tracking-[-0.04em] text-black md:text-[32px] md:leading-[42px]">
              Building community, creating homes, and supporting brighter
              futures.
            </h2>

            <div className="mt-8 font-subtext text-[16px] leading-[1.35] tracking-[-0.04em] text-black md:mt-10">
              <p className="text-[16px] font-normal">ABOUT CRESCENT VILLAGE</p>
              <p className="mt-3">
                138 Yorkland Street
                <br />
                Richmond Hill, ON L4S 1J1
              </p>

              <div className="mt-8 space-y-3">
                <a
                  href="tel:9057703578"
                  className="flex w-fit items-center gap-3 transition-opacity duration-200 hover:opacity-70"
                >
                  <Phone size={16} strokeWidth={2} />
                  <span className="font-subtext text-[15px] font-normal leading-5 tracking-[-0.04em] text-black">
                    905-770-3578
                  </span>
                </a>
                <a
                  href="mailto:hamida.merchant@crescentvillage.org"
                  className="flex w-fit items-center gap-3 transition-opacity duration-200 hover:opacity-70"
                >
                  <Mail size={16} strokeWidth={2} />
                  <span className="font-subtext text-[15px] font-normal leading-5 tracking-[-0.04em] text-black">
                    hamida.merchant@crescentvillage.org
                  </span>
                </a>
              </div>
            </div>
          </section>

          <section className="lg:pl-6">
            <p className="font-subtext text-[15px] font-normal uppercase leading-5 tracking-[-0.04em] text-black">
              Pages
            </p>
            <ul className={`mt-4 ${listClassName}`}>
              {pageLinks.map((label) => (
                <li key={label}>
                  <a href={label.toLowerCase()} className={linkClassName}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="lg:pl-8">
            <p className="font-subtext text-[15px] font-normal uppercase leading-5 tracking-[-0.04em] text-black">
              Help
            </p>
            <ul className={`mt-4 ${listClassName}`}>
              {helpLinks.map((label) => (
                <li key={label}>
                  <a href={label.toLowerCase()} className={linkClassName}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </footer>
  );
}
