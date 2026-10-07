"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaUser,
} from "react-icons/fa";

const insights = [
  {
    id: 1,
    category: "UMRAH GUIDE",
    categoryColor: "from-amber-500 to-orange-500",
    title: "Essential Preparation Steps for Your First Umrah Journey",
    excerpt:
      "Performing Umrah is a sacred spiritual journey. Learn about the key Ihram rules, required travel documents, health preparations, and step-by-step rituals to ensure a peaceful and meaningful pilgrimage to Makkah and Madinah.",
    image:
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=85",
    date: "August 10, 2026",
    readTime: "5 min read",
    author: "Islamic Travel Desk",
    href: "/news/umrah-preparation-guide",
  },
  {
    id: 2,
    category: "HAJJ INSIGHTS",
    categoryColor: "from-emerald-500 to-teal-500",
    title: "Understanding Hajj Rites: Day-by-Day Pilgrim Guide",
    excerpt:
      "A comprehensive breakdown of Hajj rituals from Mina to Arafat and Muzdalifah. Understand the spiritual significance of each rite and get practical tips on staying healthy and focused during peak pilgrimage days.",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=85",
    date: "August 05, 2026",
    readTime: "6 min read",
    author: "Madina Guidance Team",
    href: "/news/hajj-rites-guide",
  },
  {
    id: 3,
    category: "TRAVEL TIPS",
    categoryColor: "from-purple-500 to-pink-500",
    title: "Packing Essentials for Makkah & Madinah Pilgrims",
    excerpt:
      "Avoid overpacking while ensuring you have everything needed for comfort during Tawaaf and Ziyarat. From comfortable footwear to essential personal care and Ihram guidelines, here is your definitive packing list.",
    image:
      "https://images.unsplash.com/photo-1565552070098-0120800b6f50?w=800&q=85",
    date: "July 28, 2026",
    readTime: "4 min read",
    author: "Madina Travel Advisory",
    href: "/news/pilgrim-packing-essentials",
  },
];

const TravelInsights = () => {
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

        {/* Bottom glow */}
        <div className="absolute bottom-[-180px] left-1/3 h-[400px] w-[400px] rounded-full bg-blue-200/25 blur-3xl" />

        {/* Soft radial gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.10),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(99,102,241,0.08),transparent_30%)]" />
      </div>

      {/* =====================================================
          DECORATIVE TRAVEL ROUTE
      ====================================================== */}

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M -50 650 C 250 500, 350 750, 600 550 S 950 250, 1250 350"
          fill="none"
          stroke="#0EA5E9"
          strokeWidth="2"
          strokeDasharray="3 14"
        />

        <circle cx="600" cy="550" r="5" fill="#0EA5E9" />
        <circle cx="950" cy="350" r="5" fill="#6366F1" />
      </svg>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          {/* Small Label */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-sky-500" />
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-sky-600">
              Islamic Guidance & News
            </p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-sky-500" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            Stay informed with expert guidance,
            <br />
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
              Hajj & Umrah tips and spiritual insights
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Read practical pilgrim advice, visa updates, and spiritual articles provided by Madina Hajj & Umrah Travels.
          </p>
        </motion.div>

        {/* =====================================================
            INSIGHTS GRID
        ====================================================== */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {insights.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
              }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/60 transition-all duration-300 hover:border-sky-300 hover:shadow-2xl hover:shadow-sky-100"
            >
              {/* IMAGE */}
              <Link href={item.href}>
                <div className="relative h-56 overflow-hidden sm:h-60">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div
                    className={`absolute left-4 top-4 rounded-full bg-gradient-to-r ${item.categoryColor} px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg`}
                  >
                    {item.category}
                  </div>
                </div>
              </Link>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col p-6">
                {/* Meta Information */}
                <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <FaCalendarAlt className="h-3 w-3 text-sky-500" />
                    {item.date}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <FaClock className="h-3 w-3 text-sky-500" />
                    {item.readTime}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <FaUser className="h-3 w-3 text-sky-500" />
                    {item.author}
                  </span>
                </div>

                {/* Title */}
                <Link href={item.href}>
                  <h3 className="line-clamp-2 text-xl font-bold leading-tight text-slate-800 transition-colors duration-300 group-hover:text-sky-700">
                    {item.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-slate-500">
                  {item.excerpt}
                </p>

                {/* Continue Reading */}
                <Link
                  href={item.href}
                  className="group/link mt-5 inline-flex items-center gap-2 border-t border-slate-100 pt-4 text-sm font-semibold text-sky-600 transition-colors hover:text-sky-800"
                >
                  Read Full Article
                  <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>

              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-400/[0.03] via-transparent to-indigo-400/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.article>
          ))}
        </div>

        {/* =====================================================
            VIEW ALL BUTTON
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
          }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/20 transition-all duration-300 hover:from-amber-400 hover:to-orange-400 hover:shadow-xl hover:shadow-amber-500/30"
          >
            View All Articles
            <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TravelInsights;