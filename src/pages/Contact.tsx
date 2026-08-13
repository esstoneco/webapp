import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

import {
 
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";


export default function Contact() {
  const form = useRef<HTMLFormElement>(null);

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  if (!form.current) {
    return;
  }

  const serviceId =
    import.meta.env.VITE_EMAILJS_SERVICE_ID;

  const templateId =
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  const publicKey =
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error(
      "EmailJS environment variables are missing."
    );

    setStatus("error");

    return;
  }

  setStatus("sending");

  try {
    await emailjs.sendForm(
      serviceId,
      templateId,
      form.current,
      {
        publicKey,
      }
    );

    setStatus("success");

    form.current.reset();

  } catch (error) {

    console.error(
      "EmailJS error:",
      error
    );

    setStatus("error");
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
              Get In Touch
            </p>

            <h1 className="mb-8 text-5xl font-bold leading-tight md:text-7xl">
              Let's Talk
              <br />
              About Your Project
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-stone-600">
              Tell us about your project, your requirements and
              the marble you are looking for. Our team will be
              happy to help.
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
              Contact Information
            </p>

            <h2 className="mb-8 text-4xl font-bold">
              We'd love to hear from you.
            </h2>

            <p className="mb-10 text-lg leading-8 text-stone-600">
              Whether you are an architect, designer, contractor,
              developer or private client, contact us to discuss
              your requirements.
            </p>


            <div className="space-y-6">

              {/*<ContactItem
                icon={<FaPhone />}
                title="Phone"
                value="+30 XXX XXX XXXX"
              />*/}

              <ContactItem
                icon={<FaEnvelope />}
                title="Email"
                value="esstoneco@gmail.com"
              />

              <ContactItem
                icon={<FaMapMarkerAlt />}
                title="Location"
                value="Northern Greece"
              />

              <ContactItem
                icon={<FaClock />}
                title="Working Hours"
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
                onReset={() => setStatus("idle")}
              />

            ) : (

              <form
                ref={form}
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* =========================================
                    NAME
                ========================================= */}

                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
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
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
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
                    Company
                    <span className="ml-2 font-normal text-stone-400">
                      Optional
                    </span>
                  </label>

                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Company name"
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
                    Project Type
                  </label>

                  <select
                    id="project_type"
                    name="project_type"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-stone-200 bg-white px-5 py-4 outline-none transition focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20"
                  >

                    <option value="" disabled>
                      Select project type
                    </option>

                    <option value="Residential">
                      Residential
                    </option>

                    <option value="Hospitality">
                      Hospitality
                    </option>

                    <option value="Commercial">
                      Commercial
                    </option>

                    <option value="Architectural">
                      Architectural
                    </option>

                    <option value="Other">
                      Other
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
                    Tell us about your project
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us about your project, marble requirements, approximate quantities, location, timeline..."
                    className="w-full resize-none rounded-xl border border-stone-200 bg-white px-5 py-4 outline-none transition focus:border-[#C8A97E] focus:ring-2 focus:ring-[#C8A97E]/20"
                  />

                </div>


                {/* =========================================
                    TIME
                ========================================= */}

                <input
                  type="hidden"
                  name="time"
                  value={new Date().toLocaleString()}
                  readOnly
                />


                {/* =========================================
                    ERROR MESSAGE
                ========================================= */}

                {status === "error" && (

                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">

                    Something went wrong while sending your
                    enquiry.

                    <br />

                    Please try again or contact us directly by email.

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

                  {status === "sending"
                    ? "Sending..."
                    : "Send Enquiry"}

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
                  Find Us
                </h3>

                <p className="text-stone-500">
                  Northern Greece
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
            Natural premium Marble
          </p>

          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Have a project in mind?
          </h2>

          <p className="text-lg text-stone-300">
            Let's discuss how we can bring natural stone
            into your next project.
          </p>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   CONTACT ITEM
========================================================= */

type ContactItemProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

function ContactItem({
  icon,
  title,
  value,
}: ContactItemProps) {
  return (
    <div className="flex items-start gap-5">

      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#C8A97E]/10 text-[#a27d4f]">
        {icon}
      </div>

      <div>

        <p className="mb-1 text-sm uppercase tracking-wider text-stone-500">
          {title}
        </p>

        <p className="font-semibold">
          {value}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   SUCCESS MESSAGE
========================================================= */

type SuccessMessageProps = {
  onReset: () => void;
};

function SuccessMessage({
  onReset,
}: SuccessMessageProps) {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center text-center">

      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#C8A97E]/20 text-3xl text-[#a27d4f]">
        ✓
      </div>

      <h2 className="mb-4 text-3xl font-bold">
        Thank You
      </h2>

      <p className="max-w-md leading-7 text-stone-600">
        Your enquiry has been sent successfully.
        Our team will get back to you as soon as possible.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 font-semibold text-[#a27d4f] hover:underline"
      >
        Send another enquiry
      </button>

    </div>
  );
}
