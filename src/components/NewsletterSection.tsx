"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaCheckCircle } from "react-icons/fa";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim()) {
      setIsSubmitted(true);
      setEmail("");

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-50 py-16 md:py-24">
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top left glow */}
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-sky-300/25 blur-3xl" />

        {/* Right glow */}
        <div className="absolute -right-40 top-1/4 h-[450px] w-[450px] rounded-full bg-indigo-300/20 blur-3xl" />

        {/* Bottom center glow */}
        <div className="absolute bottom-[-180px] left-1/3 h-[400px] w-[400px] rounded-full bg-amber-200/20 blur-3xl" />

        {/* Soft radial background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.10),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.08),transparent_30%)]" />
      </div>

      {/* =====================================================
          DECORATIVE ROUTE
      ====================================================== */}

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
        viewBox="0 0 1200 700"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M -50 500 C 200 350, 350 600, 550 430 S 900 180, 1250 300"
          fill="none"
          stroke="#0EA5E9"
          strokeWidth="2"
          strokeDasharray="3 14"
        />

        <circle
          cx="550"
          cy="430"
          r="5"
          fill="#0EA5E9"
        />

        <circle
          cx="900"
          cy="260"
          r="5"
          fill="#6366F1"
        />
      </svg>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          {/* =================================================
              MAIN CARD
          ================================================== */}

          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 px-5 py-10 shadow-2xl shadow-slate-200/60 backdrop-blur-xl sm:px-8 md:px-12 md:py-14">
            {/* Card decorative glow */}

            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-300/15 blur-3xl" />

            <div className="relative text-center">
              {/* =================================================
                  BADGE
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.2,
                }}
                viewport={{ once: true }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-5 py-2"
              >
                <span className="text-sm">✨</span>

                <span className="text-sm font-semibold tracking-wider text-amber-600">
                  Exclusive Club
                </span>
              </motion.div>

              {/* =================================================
                  HEADING
              ================================================== */}

              <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
                Ready for Your{" "}
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                  Next Adventure?
                </span>
              </h2>

              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
                Join our exclusive club and get first access to limited-edition
                tour packages, inspiring destinations, and member-only
                pricing.
              </p>

              {/* =================================================
                  FORM
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row"
                >
                  {/* Email Input */}

                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    />

                    {/* Success Message */}

                    {isSubmitted && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 5,
                          scale: 0.95,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        className="absolute -top-9 left-0 right-0 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600"
                      >
                        <FaCheckCircle className="h-4 w-4" />

                        Subscribed successfully!
                      </motion.div>
                    )}
                  </div>

                  {/* Subscribe Button */}

                  <motion.button
                    type="submit"
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/20 transition-all duration-300 hover:from-amber-400 hover:to-orange-400 hover:shadow-xl hover:shadow-amber-500/30"
                  >
                    <FaPaperPlane className="h-4 w-4" />

                    Subscribe Now
                  </motion.button>
                </form>

                {/* =================================================
                    TRUST BADGES
                ================================================== */}

                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                  }}
                  viewport={{ once: true }}
                  className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-slate-400"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    No spam, unsubscribe anytime
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Exclusive member discounts
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    First access to new tours
                  </span>
                </motion.div>
              </motion.div>

              {/* =================================================
                  BOTTOM DECORATIVE LINE
              ================================================== */}

              <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200" />

                <span className="text-xs text-slate-300">✦</span>

                <span className="font-mono text-[9px] tracking-[0.25em] text-slate-300">
                  TRAVEL WITH US
                </span>

                <span className="text-xs text-slate-300">✦</span>

                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;