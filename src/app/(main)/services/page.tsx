"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaKaaba,
  FaPlane,
  FaHotel,
  FaPassport,
  FaSuitcase,
  FaCheckCircle,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaMapMarkerAlt,
  FaMosque,
  FaGift,
  FaInfoCircle,
  FaGlobe,
  FaFileAlt,
} from "react-icons/fa";
import ServiceHero from "./ServiceHero";


interface PackageTier {
  name: string;
  price: string;
  details: string[];
  gradient: string;
  highlight?: boolean;
}

interface ServiceCategory {
  title: string;
  description: string;
  packages: PackageTier[];
  commonIncludes: string[];
  notes?: string[];
  gifts?: string[];
  preRegInfo?: string[];
}

const umrahData: ServiceCategory = {
  title: "ওমরাহ প্যাকেজ (Umrah Packages)",
  description: "পবিত্র ওমরাহ পালনের জন্য আমাদের বিশেষ ও সুব্যবস্থাপিত প্যাকেজসমূহ।",
  packages: [
    {
      name: "ইকোনমি প্যাকেজ",
      price: "১,৫০,০০০ ৳",
      details: [
        "প্যাকেজের স্থায়িত্ব: ১৪ দিন",
        "হোটেল: মক্কায় ও মদিনায় ৬০০ - ৯০০ মিটারের মধ্যে",
        "ডিরেক্ট ফ্লাইট অন্তর্ভুক্ত",
      ],
      gradient: "from-emerald-600 to-amber-600",
    },
    {
      name: "স্ট্যান্ডার্ড প্যাকেজ",
      price: "১,৫৫,০০০ ৳",
      details: [
        "প্যাকেজের স্থায়িত্ব: ১৪ দিন",
        "হোটেল: মক্কায় ৩০০ - ৬০০ মিটার",
        "মদিনায় মারকাজিয়া (VIP Zone)",
        "ডিরেক্ট ফ্লাইট অন্তর্ভুক্ত",
      ],
      gradient: "from-amber-600 via-emerald-600 to-amber-700",
      highlight: true,
    },
    {
      name: "VIP প্যাকেজ",
      price: "আলোচনা সাপেক্ষে",
      details: [
        "প্যাকেজের স্থায়িত্ব: ৭ - ১৪ দিন",
        "হোটেল: মক্কায় ০ মিটার",
        "মদিনায় মারকাজিয়া (VIP Zone)",
        "ডিরেক্ট ফ্লাইট অন্তর্ভুক্ত",
      ],
      gradient: "from-amber-500 to-amber-600",
    },
  ],
  commonIncludes: [
    "ভিসা, টিকিট, হোটেল ও ট্রান্সপোর্ট",
    "জিয়ারা: মক্কা, মদিনা, তায়েফ, জেদ্দা ও বদর",
    "ওমরাহ প্রশিক্ষণের সু-ব্যবস্থা",
    "দক্ষ ও অভিজ্ঞ ওমরাহ গাইড সুবিধা",
    "ওমরাহ সফর চলাকালীন সময়ে প্রাথমিক চিকিৎসার ব্যবস্থা",
    "নিজস্ব ব্যবস্থাপনায় হাজী সাহেবদের চাহিদামত ঘরোয়া পরিবেশে বাঙালি মানের ৩ বেলা খাওয়ার সু-ব্যবস্থা",
    "রিয়াজুল জান্নাহ (অনুমোদন সাপেক্ষে)",
  ],
  notes: [
    "হাজী সাহেবদের চাহিদা অনুযায়ী প্যাকেজ কম বেশি করার সুবিধা আছে।",
    "প্রতি মাসে দক্ষ ও অভিজ্ঞ মোয়াল্লেমের তত্ত্বাবধানে ওমরাহ পালনের সু-ব্যবস্থা রয়েছে।",
  ],
};

const hajjData: ServiceCategory = {
  title: "হজ প্যাকেজ ২০২৭ (Hajj Packages 2027)",
  description: "পবিত্র হজ পালনের জন্য প্রাক-নিবন্ধন ও সার্বিক ব্যবস্থাপনা সেবা।",
  packages: [
    {
      name: "ইকোনমি প্যাকেজ",
      price: "৫,১৩,৬৪৮ ৳",
      details: [
        "হজ ফ্লাইটের শেষের দিকে যাত্রা",
        "হোটেল: মক্কা ও মদিনায় ৬০০ - ৯০০ মিটারের মধ্যে",
      ],
      gradient: "from-emerald-600 to-emerald-700",
    },
    {
      name: "স্ট্যান্ডার্ড প্যাকেজ",
      price: "৬,২৫,০০০ ৳",
      details: [
        "হজ ফ্লাইটের শুরুর দিকে যাত্রা",
        "হোটেল মক্কায়: ৩০০ - ৬০০ মিটার (নওরত সামস, তাওহিদ আসালা, আকাবীর আল হিজরা অথবা এই সমমানের)",
        "মদিনায়: মারকাজিয়া (VIP Zone)",
      ],
      gradient: "from-amber-600 via-emerald-600 to-amber-700",
      highlight: true,
    },
    {
      name: "VIP প্যাকেজ",
      price: "৭,৫০,০০০ ৳",
      details: [
        "হজ ফ্লাইটের শুরুর দিকে যাত্রা",
        "হোটেল মক্কায়: ০ মিটার (জমজম, হিলটন, ইলাফ কিডা, সাফা)",
        "মদিনায়: মারকাজিয়া (VIP Zone)",
      ],
      gradient: "from-amber-500 to-amber-600",
    },
  ],
  commonIncludes: [
    "ভিসা, টিকিট, হোটেল ও খাবার অন্তর্ভুক্ত",
    "জিয়ারা: মক্কা, মদিনা, ওয়াদি জিন, তায়েফ, জেদ্দা ও বদর",
    "হজ প্রশিক্ষণের সু-ব্যবস্থা",
    "দক্ষ ও অভিজ্ঞ হজ গাইডদের মাধ্যমে হজের যাবতীয় আহকাম সম্পাদন করা",
    "হজ চলাকালীন সময়ে প্রাথমিক চিকিৎসার ব্যবস্থা",
    "ইকোনমি প্যাকেজের হাজী সাহেবদের মক্কা ও মদিনায় রুমে বাঙালি মানের ৩ বেলা খাওয়ার সু-ব্যবস্থা",
    "সৌদি সরকার অনুমোদিত বিভিন্ন দর্শনীয় স্থান পরিদর্শন",
  ],
  gifts: [
    "একটি বড় ট্রলি ব্যাগ",
    "একটি হ্যান্ড ব্যাগ",
    "পাসপোর্টের ব্যাগ",
    "কোমরের বেল্ট",
    "কাঁধের ব্যাগ",
    "হিজাব",
    "সাতদানা তাসবিহ",
    "জুতার ব্যাগ",
  ],
  preRegInfo: [
    "NID কার্ডের ফটোকপি",
    "১ কপি ছবি",
    "সচল মোবাইল নম্বর",
    "৩০,০০০/- টাকা (প্রাক নিবন্ধনের জন্য)",
    "সকল প্যাকেজ প্রাক নিবন্ধনের ট্যাক্স অন্তর্ভুক্ত।",
  ],
  notes: [
    "সকল প্যাকেজের সম্মানিত হজযাত্রীকে হজের আগে ও পরে ৩-৪ দিন হজের আহকাম পালনের সুবিধার্থে, যানজট এড়ানোর জন্য ও হজের খরচ সাশ্রয়ের লক্ষ্যে হারাম সীমানার মধ্যে যেকোনো হোটেল বা বাড়িতে অবস্থান করতে হবে। অথবা মক্কায় একই হোটেলে হাজী সাহেবরা থাকতে চাইলে আলোচনা সাপেক্ষে থাকতে পারবেন।",
  ],
};

const otherServices = [
  { icon: FaPlane, title: "এয়ার টিকিটিং", desc: "অভ্যন্তরীণ ও আন্তর্জাতিক ফ্লাইটের টিকিট বুকিং সেবা।" },
  { icon: FaPassport, title: "ভিসা প্রসেসিং", desc: "সহজ ও দ্রুত ভিসা আবেদন এবং ডকুমেন্টেশন সহায়তা।" },
  { icon: FaHotel, title: "হোটেল রিজার্ভেশন", desc: "বিশ্বের যেকোনো দেশের মানসম্মত হোটেল বুকিং।" },
  { icon: FaSuitcase, title: "ট্যুর প্যাকেজ", desc: "দেশ ও বিদেশের আকর্ষণীয় ট্যুর প্যাকেজ সমূহ।" },
];

export default function ServicesPage() {
  return (
    <main className="bg-white">
      {/* HERO SECTION */}
      <ServiceHero
        title="Our Services & Packages"
        subtitle="মদিনা হজ ও ওমরাহ ট্রাভেলস্"
        icon={<FaKaaba />}
        description="পবিত্র ভূমির পথে, আস্থার সাথে। আপনার হজ ও ওমরাহ পালনকে সহজ ও আরামদায়ক করতে আমরা নিয়োজিত।"
        bgImage="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80"
      />

      {/* UMRAH PACKAGES SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        {/* Background Decorative Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.08),transparent_30%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                পবিত্র ওমরাহ
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl md:text-5xl">
              {umrahData.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              {umrahData.description}
            </p>
          </div>

          {/* Umrah Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mb-16">
            {umrahData.packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border ${
                  pkg.highlight
                    ? "border-amber-400 shadow-xl shadow-amber-500/10"
                    : "border-slate-200/80"
                } bg-white p-6 sm:p-8 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60`}
              >
                {pkg.highlight && (
                  <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
                    জনপ্রিয় প্যাকেজ
                  </div>
                )}
                <div className={pkg.highlight ? "mt-4" : ""}>
                  <h3 className="text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-emerald-700">
                    {pkg.name}
                  </h3>
                  <div className="mt-3 mb-6">
                    <span className="text-3xl font-extrabold bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                      {pkg.price}
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-600 mb-8 border-t border-slate-100 pt-4">
                    {pkg.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5">
                        <FaCheckCircle className="text-emerald-600 mt-1 shrink-0 text-sm" />
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className={`mt-4 block w-full text-center rounded-xl bg-gradient-to-r ${pkg.gradient} py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:opacity-95 hover:shadow-xl`}
                >
                  ওমরাহ প্যাকেজ বুক করুন
                </Link>

                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>

          {/* Includes & Notes */}
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-md">
              <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2.5">
                <FaMosque className="text-emerald-600 text-xl" /> সকল ওমরাহ প্যাকেজে অন্তর্ভুক্ত:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-sm text-slate-600">
                {umrahData.commonIncludes.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-emerald-600 mt-0.5 shrink-0 text-sm" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {umrahData.notes && (
              <div className="bg-amber-50/60 rounded-2xl border border-amber-200/60 p-5 sm:p-6">
                <h5 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-amber-600" /> বিশেষ দ্রষ্টব্য:
                </h5>
                <ul className="space-y-1.5 text-xs sm:text-sm text-amber-800">
                  {umrahData.notes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span>•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* HAJJ PACKAGES SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/40 via-white to-amber-50/50 py-16 md:py-24 border-b border-slate-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/20 blur-3xl" />
          <div className="absolute -left-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/30 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                বার্ষিক হজ সেবা
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl md:text-5xl">
              {hajjData.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              {hajjData.description}
            </p>
          </div>

          {/* Hajj Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mb-16">
            {hajjData.packages.map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border ${
                  pkg.highlight
                    ? "border-amber-400 shadow-xl shadow-amber-500/10"
                    : "border-slate-200/80"
                } bg-white p-6 sm:p-8 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60`}
              >
                {pkg.highlight && (
                  <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
                    সুপারিশকৃত
                  </div>
                )}
                <div className={pkg.highlight ? "mt-4" : ""}>
                  <h3 className="text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-emerald-700">
                    {pkg.name}
                  </h3>
                  <div className="mt-3 mb-6">
                    <span className="text-3xl font-extrabold bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                      {pkg.price}
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-600 mb-8 border-t border-slate-100 pt-4">
                    {pkg.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5">
                        <FaCheckCircle className="text-emerald-600 mt-1 shrink-0 text-sm" />
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className={`mt-4 block w-full text-center rounded-xl bg-gradient-to-r ${pkg.gradient} py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:opacity-95 hover:shadow-xl`}
                >
                  হজ প্যাকেজ বুক করুন
                </Link>

                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>

          {/* Includes & Pre-reg */}
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-md">
                <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2.5">
                  <FaKaaba className="text-amber-600 text-xl" /> সকল হজ প্যাকেজে অন্তর্ভুক্ত:
                </h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  {hajjData.commonIncludes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <FaCheckCircle className="text-emerald-600 mt-1 shrink-0 text-sm" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-md">
                  <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2.5">
                    <FaFileAlt className="text-amber-600 text-xl" /> প্রাক নিবন্ধনে প্রয়োজন:
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-600">
                    {hajjData.preRegInfo?.map((info, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <FaCheckCircle className="text-emerald-600 mt-1 shrink-0 text-sm" />
                        <span>{info}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-md">
                  <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2.5">
                    <FaGift className="text-amber-600 text-xl" /> হজ যাত্রীদের হাদিয়া:
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                    {hajjData.gifts?.map((gift, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <FaStar className="text-amber-400 text-xs shrink-0" />
                        <span>{gift}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {hajjData.notes && (
              <div className="bg-amber-50/60 rounded-2xl border border-amber-200/60 p-5 sm:p-6">
                <h5 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-amber-600" /> বিশেষ দ্রষ্টব্য:
                </h5>
                <ul className="space-y-1.5 text-xs sm:text-sm text-amber-800">
                  {hajjData.notes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span>•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ADDITIONAL TRAVEL SERVICES */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">অন্যান্য ভ্রমণ সেবাসমূহ</h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">আপনার যেকোনো ভ্রমণের সার্বিক সহায়তায় আমরা পাশে আছি।</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {otherServices.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-md transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 transition-colors duration-300 group-hover:text-emerald-700">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{srv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="py-12 bg-gradient-to-r from-emerald-50/50 via-amber-50/40 to-emerald-50/50 border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg sm:text-xl font-serif italic text-slate-800 max-w-4xl mx-auto">
            &quot;তোমরা পৃথিবী ভ্রমণ করো এবং দেখো তিনি কীভাবে সৃষ্টির সূচনা করেছেন।&quot;
          </p>
          <span className="block mt-2 text-xs font-bold text-emerald-700 tracking-wide">— সূরা আল আনকাবুত (২৯:২০)</span>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md p-8 text-center shadow-xl md:p-12"
          >
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                বুকিং চলছে
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              আমাদের সাথে আপনার যাত্রা{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                পরিকল্পনা করুন
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              প্রাক-নিবন্ধন, প্যাকেজের তথ্য বা যেকোনো কাস্টম ট্রাভেল প্ল্যানের জন্য আজই মদিনা হজ ও ওমরাহ ট্রাভেলস্-এর সাথে যোগাযোগ করুন।
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl"
              >
                যোগাযোগ করুন <FaArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-600 border-t border-slate-100 pt-6">
              <span className="flex items-center gap-2">
                <FaPhone className="text-amber-600 text-sm" /> +88 01714 544 877
              </span>
              <span className="flex items-center gap-2">
                <FaEnvelope className="text-emerald-600 text-sm" /> madinahut26@gmail.com
              </span>
              <span className="flex items-center gap-2">
                <FaGlobe className="text-emerald-600 text-sm" /> www.madinahut.com
              </span>
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-amber-600 text-sm" /> চৌরঙ্গী সুপার মার্কেট (৩য় তলা), সাভার, ঢাকা
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}