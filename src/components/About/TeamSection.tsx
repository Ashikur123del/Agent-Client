"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { ImManWoman } from "react-icons/im";

const team = [
  {
    id: 1,
    name: "Haji Md. Rahman",
    role: "Founder & Chairman",
    experience: "18+ years serving Pilgrims",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    bio: "Dedicated to facilitating smooth, spiritual, and comfortable Hajj & Umrah journeys for thousands of pilgrims.",
  },
  {
    id: 2,
    name: "Shaykh Ahmadullah",
    role: "Lead Moallem & Guide",
    experience: "12+ years in Hajj Guidance",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    bio: "Prominent scholar ensuring all pilgrims perform their rituals accurately according to the Sunnah.",
  },
  {
    id: 3,
    name: "Nasrin Sultana",
    role: "Umrah Visa & Travel Specialist",
    experience: "9+ years in Visa Processing",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    bio: "Expert in Saudi Arabia fast-track Umrah visas and flight arrangements with hassle-free support.",
  },
  {
    id: 4,
    name: "Fatema Akhter",
    role: "Makkah-Madina Ground Host",
    experience: "7+ years Ground Operations",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    bio: "Ensures seamless hotel check-ins, transport logistics, and 24/7 hospitality for pilgrim groups.",
  },
];

const TeamSection: React.FC = () => {
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

        {/* Radial Gradient */}
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
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-500" />
            <span className="rounded-full bg-emerald-500/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
              Our Team
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-500" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-emerald-700 via-amber-600 to-emerald-800 bg-clip-text text-transparent">
              Dedicated Experts
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Experienced scholars, visa counselors, and ground hosts committed to serving you on your holy pilgrimage.
          </p>
        </motion.div>

        {/* =====================================================
            TEAM GRID
        ====================================================== */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 text-center shadow-lg shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:border-emerald-300 hover:bg-white hover:shadow-xl hover:shadow-emerald-100/60"
            >
              {/* =================================================
                  AVATAR
              ================================================== */}
              <div className="relative mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full border-2 border-amber-400/80 bg-amber-50 transition-all duration-300 group-hover:border-emerald-500 group-hover:shadow-lg group-hover:shadow-emerald-200/50">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  sizes="112px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* =================================================
                  NAME & ROLE
              ================================================== */}
              <h3 className="text-lg font-bold text-slate-800 transition-colors duration-300 group-hover:text-emerald-700">
                {member.name}
              </h3>

              {/* Role */}
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-amber-600">
                {member.role}
              </p>

              {/* Experience */}
              <p className="mt-1 text-xs text-slate-500 font-medium">
                {member.experience}
              </p>

              {/* Bio */}
              <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-600">
                {member.bio}
              </p>

              {/* =================================================
                  SOCIAL ICONS
              ================================================== */}
              <div className="mt-5 flex justify-center gap-3">
                {/* Facebook */}
                <a
                  href="#"
                  aria-label={`${member.name} Facebook`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  <FaFacebookF className="h-3.5 w-3.5" />
                </a>

                {/* Twitter */}
                <a
                  href="#"
                  aria-label={`${member.name} Twitter`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 transition-all duration-300 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-600"
                >
                  <FaTwitter className="h-3.5 w-3.5" />
                </a>

                {/* LinkedIn */}
                <a
                  href="#"
                  aria-label={`${member.name} LinkedIn`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <FaLinkedinIn className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Hover Glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        {/* =====================================================
            TEAM COUNT
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-2 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-sm">
            <span className="text-lg text-amber-500">
              <ImManWoman />
            </span>
            <span>
              50+ Dedicated Support Staff & Guides in Makkah, Madina, and Dhaka
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;