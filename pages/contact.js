import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Metatags from "@/components/Metatags";

const labelClassName =
  "block font-subtext text-[12px] leading-4 tracking-[-0.04em] text-black";

const inputClassName =
  "mt-2 block w-full rounded-md border border-[#1D1E22]/10 bg-cream px-3 py-2 font-subtext text-[15px] leading-5 tracking-[-0.04em] text-[#1D1E22] outline-none focus:border-[#D66E4A]";

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    value: (
      <>
        138 Yorkland Street
        <br />
        Richmond Hill, ON L4S 1J1
      </>
    ),
  },
  {
    icon: Phone,
    label: "Phone",
    value: "905-770-3578",
    href: "tel:9057703578",
  },
  {
    icon: Mail,
    label: "Email",
    value: "housing@crescentvillage.org",
    href: "mailto:housing@crescentvillage.org",
  },
];

const inquiryTypes = [
  "General inquiry",
  "Housing & availability",
  "Programs",
  "Partnerships",
  "Media",
  "Other",
];

function ContactForm() {
  const [submissionState, setSubmissionState] = useState({
    status: "idle",
    message: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setSubmissionState({
        status: "error",
        message:
          "This form is unavailable because its submission service has not been configured.",
      });
      return;
    }

    const submittedForm = event.currentTarget;
    const formData = new FormData(submittedForm);

    formData.set("access_key", accessKey);
    formData.set(
      "subject",
      `Contact form - ${formData.get("Inquiry type") || "General inquiry"}`,
    );
    formData.set("from_name", "Crescent Village Website");
    setSubmissionState({ status: "submitting", message: "" });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Web3Forms could not submit the form.",
        );
      }

      submittedForm.reset();
      setSubmissionState({
        status: "success",
        message: "Thank you. Your message has been sent. We'll be in touch soon.",
      });
    } catch (error) {
      setSubmissionState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Your message could not be sent. Please try again.",
      });
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Honeypot spam protection (Web3Forms) */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClassName}>
          Name<span aria-hidden="true"> *</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className={inputClassName}
          />
        </label>
        <label className={labelClassName}>
          Email<span aria-hidden="true"> *</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className={inputClassName}
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClassName}>
          Phone
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            className={inputClassName}
          />
        </label>
        <label className={labelClassName}>
          Inquiry type<span aria-hidden="true"> *</span>
          <select
            name="Inquiry type"
            required
            defaultValue=""
            className={inputClassName}
          >
            <option value="" disabled>
              Select an option
            </option>
            {inquiryTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={labelClassName}>
        Message<span aria-hidden="true"> *</span>
        <textarea
          name="message"
          required
          rows={6}
          className={`${inputClassName} resize-y`}
        />
      </label>

      <button
        type="submit"
        disabled={submissionState.status === "submitting"}
        className="mt-2 flex h-[38px] items-center justify-center rounded-md bg-green px-5 font-subtext text-[15px] font-medium tracking-[-0.04em] text-cream transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {submissionState.status === "submitting"
          ? "Sending..."
          : "Send message"}
      </button>

      {submissionState.message && (
        <p
          aria-live="polite"
          className={`font-subtext text-[12px] leading-4 tracking-[-0.04em] ${
            submissionState.status === "success"
              ? "text-green-800"
              : "text-red-700"
          }`}
        >
          {submissionState.message}
        </p>
      )}
    </form>
  );
}

export default function Contact() {
  return (
    <main>
      <Metatags
        title="Contact | Crescent Village"
        description="Get in touch with Crescent Village. Reach out with questions about housing, programs, partnerships, and more."
        canonicalLink="/contact"
      />
      <Navbar active="Contact" />
      <section className="mx-auto my-8 lg:my-20 max-w-[1400px] px-5 md:px-10">
        <h1 className="font-title max-w-[591px]">Get in Touch</h1>
        <p className="mt-4 lg:mt-10 max-w-[622px] font-subtext text-[15px] leading-5 tracking-[-0.04em] text-[#1D1E22]/80">
          Have a question about housing, our programs, or partnering with
          Crescent Village? Send us a message and our team will get back to
          you as soon as possible.
        </p>

        <div className="mt-8 lg:mt-20 grid gap-[10px] lg:grid-cols-[320px_1fr]">
          <aside className="h-fit rounded-md bg-white p-4 md:p-6">
            <h2 className="font-subtext text-[24px] font-bold leading-[31px] tracking-[-0.04em] text-[#1D1E22]">
              Contact details
            </h2>
            <ul className="mt-6 space-y-6">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md bg-[#1D1E22] text-cream">
                    <Icon size={14} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="font-subtext text-[10px] uppercase leading-[13px] tracking-[-0.04em] text-[#1D1E22]/70">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block font-subtext text-[15px] leading-5 tracking-[-0.04em] text-[#1D1E22] transition-opacity duration-200 hover:opacity-70"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 font-subtext text-[15px] leading-5 tracking-[-0.04em] text-[#1D1E22]">
                        {value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          <div className="rounded-md bg-white p-4 md:p-6">
            <h2 className="font-subtext text-[24px] font-medium leading-[31px] tracking-[-0.04em] text-[#1D1E22]">
              Send us a message
            </h2>
            <p className="mt-2 mb-6 font-subtext text-[12px] leading-4 tracking-[-0.04em] text-[#1D1E22]">
              Fields marked with * are required.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
