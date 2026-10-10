import { useText } from "../i18n/useText";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";

export default function Contact() {
  const tr = useText();
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const submitting = useRef(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentForm = form.current;
    if (!currentForm || submitting.current) return;

    setErrorMessage("");
    submitting.current = true;
    setStatus("sending");
    let responseStatus: number | undefined;

    try {
      // Capture the time when the enquiry is submitted.
      const time = currentForm.elements.namedItem("time");
      if (time instanceof HTMLInputElement) {
        time.value = new Date().toLocaleString();
      }

      const formData = new FormData(currentForm);
      formData.set("_replyto", String(formData.get("email") ?? ""));
      formData.set("_url", window.location.href);

      const response = await fetch(
        "https://formsubmit.co/ajax/esstoneco@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(Object.fromEntries(formData.entries())),
        }
      );
      responseStatus = response.status;

      const result: { success?: boolean | string; message?: string } =
        await response.json();

      if (
        !response.ok ||
        (result.success !== true && result.success !== "true")
      ) {
        throw new Error(result.message || "FormSubmit rejected the enquiry.");
      }

      currentForm.reset();
      setStatus("success");
    } catch (error) {
      console.error("FormSubmit send failed:", error);
      setErrorMessage(
        responseStatus === 429
          ? "The email service is busy. Please try again later or email us directly."
          : "Your enquiry could not be sent. Please try again or email us directly."
      );
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  };

  return (
    <main className="bg-white">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="bg-stone-100 py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="max-w-4xl"
          >
            <p className="mb-5 uppercase tracking-[6px] text-stone-500">
              {tr("Get In Touch")}
            </p>
            <h1 className="mb-8 text-5xl font-bold leading-tight md:text-7xl">
              {tr("Let's Talk")}
              <br />
              {tr("About Your Project")}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-600">
              {tr("Tell us about your project, your requirements and the marble you are looking for. Our team will be happy to help.")}
            </p>
          </motion.div>
        </div>
      </section>
      {/* =====================================================
          CONTACT SECTION
      ===================================================== */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}
          <div>
            <p className="mb-4 uppercase tracking-[5px] text-stone-500">
              {tr("Contact Information")}
            </p>
            <h2 className="mb-8 text-4xl font-bold">
              {tr("We'd love to hear from you.")}
            </h2>
            <p className="mb-10 text-lg leading-8 text-stone-600">
              {tr("Whether you are an architect, designer, contractor, developer or private client, contact us to discuss your requirements.")}
            </p>
            <div className="space-y-6">
              {/*<ContactItem
                icon={<FaPhone />}
                title="Phone"
                value="+30 XXX XXX XXXX"
              />*/}
              <ContactItem
                icon={<FaEnvelope />}
                title={tr("Email")}
                value="esstoneco@gmail.com"
              />
              <ContactItem
                icon={<FaMapMarkerAlt />}
                title={tr("Location")}
                value="Northern Greece"
              />
              <ContactItem
                icon={<FaClock />}
                title={tr("Working Hours")}
                value="Monday – Friday · 09:00 – 20:00"
              />
            </div>
          </div>
          {/* =================================================
              CONTACT FORM
          ================================================= */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="rounded-3xl bg-stone-100 p-8 md:p-12"
          >
            {status === "success" ? (
              <SuccessMessage
                onReset={() => { setStatus("idle"); }}
              />
            ) : (
              <form
                action="https://formsubmit.co/esstoneco@gmail.com"
                method="POST"
                ref={form}
                onSubmit={(event) => { void handleSubmit(event); }}
                className="space-y-6"
              >
                {/* FormSubmit settings: these do not change the form's design. */}
                <input
                  type="hidden"
                  name="_subject"
                  value="New project enquiry - ES STONE"
                />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="text"
                  name="_honey"
                  style={{ display: "none" }}
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                />

                {/* =========================================
                    NAME
                ========================================= */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold"
                  >
                    {tr("Name")}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder={tr("Your name")}
                    className="w-full rounded-xl border border-stone-200 bg-white px-5 py-4 outline-none transition focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20"
                  />
                </div>
                {/* =========================================
                    EMAIL
                ========================================= */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold"
                  >
                    {tr("Email")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={tr("your@email.com")}
                    className="w-full rounded-xl border border-stone-200 bg-white px-5 py-4 outline-none transition focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20"
                  />
                </div>
                {/* =========================================
                    COMPANY
                ========================================= */}
                <div>
                  <label
                    htmlFor="company"
                    className="mb-2 block text-sm font-semibold"
                  >
                    {tr("Company")}
                    <span className="ml-2 font-normal text-stone-400">
                      {tr("Optional")}
                    </span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder={tr("Company name")}
                    className="w-full rounded-xl border border-stone-200 bg-white px-5 py-4 outline-none transition focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20"
                  />
                </div>
                {/* =========================================
                    PROJECT TYPE
                ========================================= */}
                <div>
                  <label
                    htmlFor="project_type"
                    className="mb-2 block text-sm font-semibold"
                  >
                    {tr("Project Type")}
                  </label>
                  <select
                    id="project_type"
                    name="project_type"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-stone-200 bg-white px-5 py-4 outline-none transition focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20"
                  >
                    <option value="" disabled>
                      {tr("Select project type")}
                    </option>
                    <option value="Residential">
                      {tr("Residential")}
                    </option>
                    <option value="Hospitality">
                      {tr("Hospitality")}
                    </option>
                    <option value="Commercial">
                      {tr("Commercial")}
                    </option>
                    <option value="Architectural">
                      {tr("Architectural")}
                    </option>
                    <option value="Other">
                      {tr("Other")}
                    </option>
                  </select>
                </div>
                {/* =========================================
                    MESSAGE
                ========================================= */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold"
                  >
                    {tr("Tell us about your project")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder={tr("Tell us about your project, marble requirements, approximate quantities, location, timeline...")}
                    className="w-full resize-none rounded-xl border border-stone-200 bg-white px-5 py-4 outline-none transition focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20"
                  />
                </div>
                {/* =========================================
                    TIME
                ========================================= */}
                <input
                  type="hidden"
                  name="time"
                  defaultValue=""
                />
                {/* =========================================
                    ERROR MESSAGE
                ========================================= */}
                {status === "error" && (
                  <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                    {tr(errorMessage)}
                    <br />
                    <a className="font-semibold underline" href="mailto:esstoneco@gmail.com">
                      {tr("esstoneco@gmail.com")}
                    </a>
                  </div>
                )}
                {/* =========================================
                    SUBMIT
                ========================================= */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group flex w-full items-center justify-center gap-3 rounded-full bg-black px-8 py-4 font-semibold text-white transition duration-300 hover:bg-[#C8A97E] hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {tr(status === "sending"
                    ? "Sending..."
                    : "Send Enquiry")}
                  {status !== "sending" && (
                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
      {/* =====================================================
          MAP
      ===================================================== */}
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl bg-stone-100">
            <div className="flex h-[400px] items-center justify-center">
              <div className="text-center">
                <FaMapMarkerAlt className="mx-auto mb-5 text-5xl text-[#C8A97E]" />
                <h3 className="mb-2 text-2xl font-bold">
                  {tr("Find Us")}
                </h3>
                <p className="text-stone-500">
                  {tr("Northern Greece")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="bg-black py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 uppercase tracking-[6px] text-stone-400">
            {tr("Natural premium Marble")}
          </p>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            {tr("Have a project in mind?")}
          </h2>
          <p className="text-lg text-stone-300">
            {tr("Let's discuss how we can bring natural stone into your next project.")}
          </p>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   CONTACT ITEM
========================================================= */

interface ContactItemProps {
  icon: ReactNode;
  title: string;
  value: string;
}

function ContactItem({
  icon,
  title,
  value,
}: ContactItemProps) {
  const tr = useText();

  return (
    <div className="flex items-start gap-5">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#C8A97E]/10 text-[#a27d4f]">
        {icon}
      </div>
      <div>
        <p className="mb-1 text-sm uppercase tracking-wider text-stone-500">
          {tr(title)}
        </p>
        <p className="font-semibold">
          {tr(value)}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   SUCCESS MESSAGE
========================================================= */

interface SuccessMessageProps {
  onReset: () => void;
}

function SuccessMessage({
  onReset,
}: SuccessMessageProps) {
  const tr = useText();

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#C8A97E]/20 text-3xl text-[#a27d4f]">
        ✓
      </div>
      <h2 className="mb-4 text-3xl font-bold">
        {tr("Thank You")}
      </h2>
      <p className="max-w-md leading-7 text-stone-600">
        {tr("Your enquiry has been sent successfully. Our team will get back to you as soon as possible.")}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 font-semibold text-[#a27d4f] hover:underline"
      >
        {tr("Send another enquiry")}
      </button>
    </div>
  );
}
