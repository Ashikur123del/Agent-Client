"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaStar,
  FaRegStar,
  FaArrowRight,
  FaUsers,
  FaCalendarAlt,
  FaCheckCircle,
  FaKaaba,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const packages = [
  {
    id: 1,
    title: "Premium Umrah Package",
    location: "Makkah & Madina",
    description:
      "Perform Umrah with maximum comfort. Includes 5-star close proximity hotels, direct flights, and dedicated Moallem support.",
    image:
      "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=800&q=85",
    duration: "14 Days",
    groupSize: "Family & Group",
    included: ["5★ Hotel", "Guide", "Visa", "Transport"],
    available: "Year Round",
    rating: 4.9,
    reviews: 142,
    badge: "Most Popular",
    badgeColor: "from-amber-500 to-amber-600",
  },
  {
    id: 2,
    title: "VIP Ramadan Umrah",
    location: "Makkah & Madina",
    description:
      "Experience the last 10 days of Ramadan in the Holy Haram with luxury accommodations, Suhoor, and Iftar arrangements.",
    image:
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=85",
    duration: "15 Days",
    groupSize: "Limited Seats",
    included: ["Luxury Stay", "Iftar & Suhoor", "Ziyarat"],
    available: "Ramadan Season",
    rating: 4.9,
    reviews: 88,
    badge: "Special",
    badgeColor: "from-emerald-600 to-teal-600",
  },
  {
    id: 3,
    title: "Economy Umrah Package",
    location: "Makkah & Madina",
    description:
      "Affordable and spiritual journey designed for pilgrims seeking complete rituals under guidance without breaking the bank.",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=85",
    duration: "10 Days",
    groupSize: "Max 20",
    included: ["3★ Hotel", "Visa", "Guidance", "Bus Transport"],
    available: "Monthly Tours",
    rating: 4.8,
    reviews: 215,
    badge: "Best Value",
    badgeColor: "from-emerald-500 to-emerald-700",
  },
  {
    id: 4,
    title: "Executive Hajj Package",
    location: "Saudi Arabia",
    description:
      "Comprehensive Royal Hajj service featuring tent options in Mina, AC transport, guided rituals, and premium hospitality.",
    image:
      "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=85",
    duration: "40 Days",
    groupSize: "Exclusive",
    included: ["VIP Tents", "Moallem", "All Meals", "Flights"],
    available: "Hajj Season 2026",
    rating: 5.0,
    reviews: 95,
    badge: "Premium Hajj",
    badgeColor: "from-amber-600 to-amber-700",
  },
];

const FeaturedTourPackages: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 lg:py-28">
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top Left Glow */}
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />

        {/* Right Glow */}
        <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />

        {/* Bottom Glow */}
        <div className="absolute bottom-[-180px] left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/40 blur-3xl" />

        {/* Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.08),transparent_30%)]" />
      </div>

      {/* =====================================================
          DECORATIVE TRAVEL ROUTE
      ====================================================== */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M -50 650 C 250 500, 350 750, 600 550 S 950 250, 1250 350"
          fill="none"
          stroke="#10B981"
          strokeWidth="2"
          strokeDasharray="2 14"
        />

        <circle cx="600" cy="550" r="5" fill="#10B981" />
        <circle cx="950" cy="350" r="5" fill="#F59E0B" />
      </svg>


      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
    
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center justify-between gap-5 sm:flex-row"
        >
          {/* Header Text */}
          <div className="text-center sm:text-left">
            {/* Label */}
            <div className="mb-3 flex items-center justify-center gap-3 sm:justify-start font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                HOLY JOURNEY PACKAGES
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600 sm:hidden" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Featured Hajj &{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Umrah Packages
              </span>
            </h2>

            {/* Description */}
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Discover carefully curated spiritual itineraries, close-to-Haram hotels, and hassle-free travel services designed for your peace of mind.
            </p>
          </div>

          {/* View All Button */}
          <Link
            href="/services/tour-package"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-emerald-800 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 hover:shadow-md"
          >
            View All Packages
            <FaArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* =====================================================
            PACKAGE CARDS
        ====================================================== */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
            >
              {/* =================================================
                  IMAGE
              ================================================== */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

                {/* Badge */}
                <div
                  className={`absolute left-3 top-3 rounded-full bg-gradient-to-r ${pkg.badgeColor} px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg`}
                >
                  {pkg.badge}
                </div>

                {/* Location */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-md backdrop-blur-sm">
                  <MdLocationOn className="h-4 w-4 text-amber-600" />
                  {pkg.location}
                </div>
              </div>

              {/* =================================================
                  CONTENT
              ================================================== */}
              <div className="flex flex-1 flex-col p-5">
                {/* Title */}
                <h3 className="text-lg font-bold leading-tight text-slate-800 transition-colors duration-300 group-hover:text-emerald-700">
                  {pkg.title}
                </h3>

                {/* Description */}
                <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-500">
                  {pkg.description}
                </p>

                {/* Meta */}
                <div className="mt-4 grid grid-cols-2 gap-2 border-y border-slate-100 py-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <FaUsers className="h-3 w-3 text-emerald-600" />
                    {pkg.groupSize}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <FaCalendarAlt className="h-3 w-3 text-emerald-600" />
                    {pkg.available}
                  </span>
                </div>

                {/* Included Services */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {pkg.included.map((item, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[9px] font-medium text-slate-600 transition-colors group-hover:border-emerald-200 group-hover:bg-emerald-50 group-hover:text-emerald-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Rating & Duration */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(pkg.rating) ? (
                            <FaStar className="h-3.5 w-3.5 text-amber-400" />
                          ) : (
                            <FaRegStar className="h-3.5 w-3.5 text-slate-300" />
                          )}
                        </span>
                      ))}
                    </div>

                    <span className="text-[11px] font-medium text-slate-500">
                      {pkg.rating} ({pkg.reviews})
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-[11px] font-medium text-slate-600">
                    <FaCheckCircle className="h-3 w-3 text-emerald-600" />
                    {pkg.duration}
                  </span>
                </div>

                {/* Book Button */}
                <Link
                  href="/contact"
                  className="mt-4 block w-full rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 py-2.5 text-center text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl hover:shadow-emerald-600/30"
                >
                  Book Package
                </Link>
              </div>

              {/* Hover Gradient */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTourPackages;