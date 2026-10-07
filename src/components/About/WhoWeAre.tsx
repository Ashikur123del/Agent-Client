"use client";

import { IoIosTrophy } from "react-icons/io";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaHandshake,
  FaGlobe,
  FaHeart,
  FaRegStar,
  FaKaaba,
} from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

const WhoWeAre = () => {
  const highlights = [
    {
      icon: FaKaaba,
      text: "Specialized Hajj & Umrah packages under experienced Moallem guidance",
    },
    {
      icon: FaHandshake,
      text: "Trusted Saudi visa processing & approval with 98% success rate",
    },
    {
      icon: FaGlobe,
      text: "Direct & connecting air ticketing to Saudi Arabia & 30+ countries",
    },
    {
      icon: FaHeart,
      text: "Dedicated ground support & luxury transfers in Makkah & Madina",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top Left Glow */}
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />

        {/* Right Glow */}
        <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />

        {/* Bottom Glow */}
        <div className="absolute bottom-[-180px] left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/40 blur-3xl" />

        {/* Soft Radial Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.08),transparent_30%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* =========================
              IMAGE
          ========================== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-lg lg:max-w-none"
          >
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/40">
              <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px]">
                <Image
                  src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80"
                  alt="Madina Hajj & Umrah Travels Team and Pilgrims"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

                {/* Emerald Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-transparent to-amber-600/10" />
              </div>

              {/* Happy Pilgrims */}
              <div className="absolute bottom-4 left-4 rounded-xl border border-white/20 bg-emerald-950/40 px-4 py-2 shadow-lg backdrop-blur-md">
                <span className="flex items-center gap-2 text-sm font-semibold text-white">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  1,000+ Satisfied Pilgrims
                </span>
              </div>

              {/* Rating */}
              <div className="absolute right-4 top-4 rounded-xl border border-amber-300/30 bg-amber-500/20 px-4 py-2 shadow-lg backdrop-blur-md">
                <span className="flex items-center gap-2 text-sm font-bold text-amber-200">
                  <FaRegStar />
                  4.9/5 Rating
                </span>
              </div>
            </div>
          </motion.div>

          {/* =========================
              CONTENT
          ========================== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            {/* Label */}
            <span className="inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
              Who We Are
            </span>

            {/* Heading */}
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Serving Pilgrims With{" "}
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-amber-600 to-emerald-700 bg-clip-text text-transparent">
                Devotion & Trust
              </span>
            </h2>

            {/* Paragraph */}
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              <strong className="text-slate-900">Madina Hajj & Umrah Travels</strong> started its journey in{" "}
              <strong className="text-slate-900">2018</strong> with a sacred mission: to serve pilgrims with honesty, transparency, and utmost dedication across Bangladesh and beyond.
            </p>

            <p className="mt-3 text-base leading-relaxed text-slate-500 md:text-lg">
              We specialize in{" "}
              <strong className="text-slate-900">Hajj & Umrah packages</strong>,{" "}
              <strong className="text-slate-900">Saudi Visa processing</strong>,{" "}
              <strong className="text-slate-900">Air ticketing</strong>, and{" "}
              <strong className="text-slate-900">Hotel booking near Haram</strong>. Our commitment is to provide a smooth and spiritually uplifting journey for every pilgrim.
            </p>

            {/* Highlights */}
            <ul className="mt-6 space-y-3">
              {highlights.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                    }}
                    viewport={{ once: true }}
                    className="group flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white/80 p-3 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-lg"
                  >
                    <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600 transition-transform duration-300 group-hover:scale-110" />

                    <span className="text-sm text-slate-600 md:text-base">
                      {item.text}
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            {/* Bottom Meta */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-500"
            >
              <p className="flex items-center gap-2">
                <span className="text-2xl text-amber-600">
                  <IoIosTrophy />
                </span>
                Govt. Approved Agency
              </p>

              <span className="hidden h-6 w-px bg-slate-200 sm:block" />

              <p className="flex items-center gap-2">
                <span className="text-2xl text-emerald-600">
                  <FaGlobe />
                </span>
                Global Network
              </p>

              <span className="hidden h-6 w-px bg-slate-200 sm:block" />

              <p className="flex items-center gap-2">
                <span className="text-2xl text-amber-600">
                  <FaUsers />
                </span>
                Dedicated Support Team
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;