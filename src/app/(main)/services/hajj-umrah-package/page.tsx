"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaMosque,
  FaPlane,
  FaHotel,
  FaBus,
  FaClock,
  FaArrowRight,
  FaCheckCircle,
  FaUsers,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaHands,
  FaShieldAlt,
  FaUserTie,
} from "react-icons/fa";
import ServiceHero from "../ServiceHero";


interface PackageDetail {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: string;
  price: string;
  inclusions: string[];
  highlight: string;
}

interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

type Step = string;

const hajjPackage: PackageDetail = {
  title: "Hajj Package",
  icon: FaMosque,
  duration: "15-20 Days",
  price: "$3,500 – $5,500",
  highlight: "Premium tents in Mina & Arafat",
  inclusions: [
    "Visa processing",
    "Return airfare (Dhaka – Jeddah)",
    "Accommodation in Makkah (5-star, near Haram)",
    "Accommodation in Madinah (5-star, near Masjid)",
    "Camps in Mina & Arafat (air-conditioned)",
    "Transport between holy sites",
    "Group Ziyarah tours",
    "24/7 on-ground support",
  ],
};

const umrahPackage: PackageDetail = {
  title: "Umrah Package",
  icon: FaMosque,
  duration: "7-14 Days",
  price: "$1,200 – $2,500",
  highlight: "Flexible departure dates",
  inclusions: [
    "Visa processing",
    "Return airfare (Dhaka – Jeddah)",
    "Accommodation in Makkah (4-star, near Haram)",
    "Accommodation in Madinah (4-star, near Masjid)",
    "Transport between cities",
    "Optional Ziyarah tours",
    "24/7 on-ground support",
  ],
};

// Services
const services: ServiceItem[] = [
  {
    icon: FaMosque,
    title: "Complete Hajj & Umrah Packages",
    desc: "End-to-end packages covering visa, flights, hotels, transport, and spiritual guidance.",
  },
  {
    icon: FaPlane,
    title: "Ticket Support",
    desc: "Best flight options from Bangladesh with convenient connections and competitive fares.",
  },
  {
    icon: FaHotel,
    title: "Hotel Support",
    desc: "Premium and comfortable hotels within walking distance of Haram in Makkah and Masjid in Madinah.",
  },
  {
    icon: FaBus,
    title: "Transport Support",
    desc: "Comfortable, air-conditioned transport between cities and holy sites with experienced drivers.",
  },
  {
    icon: FaClock,
    title: "Ziyarah Support",
    desc: "Guided tours of holy sites in Makkah (Cave of Hira, Arafat) and Madinah (Uhud, Quba Mosque).",
  },
  {
    icon: FaUserTie,
    title: "Expert Guidance",
    desc: "Experienced religious scholars and guides accompany groups for spiritual and logistical support.",
  },
];

// Why Choose Us
const whyChoose = [
  { icon: FaShieldAlt, label: "10+ Years Experience" },
  { icon: FaHands, label: "Ethical & Transparent" },
  { icon: FaStar, label: "5-Star Rated Packages" },
  { icon: FaUsers, label: "500+ Pilgrims Served" },
];

// Booking Steps
const steps: Step[] = [
  "Choose your package (Hajj or Umrah)",
  "Select departure date and group size",
  "Complete visa application",
  "Make payment and confirm booking",
  "Receive travel documents and pre‑departure briefing",
];

export default function HajjUmrahPage() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 text-slate-800">
      {/* Full-page Emerald + Amber decorative color layer */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-48 top-20 h-[500px] w-[500px] rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute -right-48 top-1/3 h-[500px] w-[500px] rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/20 blur-3xl" />
      </div>

      <ServiceHero
        title="Hajj and Umrah Package"
        subtitle="Hajj & Umrah Services"
        icon={<FaMosque />}
        description="Complete Hajj and Umrah packages with visa, ticket, hotel, transport, and Ziyarah support. Our expert team ensures a spiritually enriching and hassle‑free pilgrimage."
        bgImage="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/The_Kaaba_during_Hajj.jpg/960px-The_Kaaba_during_Hajj.jpg"
      />

      {/* Overview */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/50 border-b border-emerald-100/50 py-16 md:py-24 shadow-sm">
        <div className="pointer-events-none absolute inset-0 overflow-hidden"><div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" /><div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" /><div className="absolute bottom-[-180px] left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/40 blur-3xl" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.08),transparent_30%)]" /></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-600 font-bold tracking-[0.25em] text-xs uppercase bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-1.5 rounded-full shadow-sm border border-amber-200/50">
              Blessed Pilgrimage
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight text-slate-900">
              Your Spiritual{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              We understand the profound significance of Hajj and Umrah. Our
              packages are designed to provide comfort, convenience, and a deep
              spiritual experience – so you can focus on worship and connection
              with Allah.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2 bg-gradient-to-r from-white to-emerald-50/50 px-4 py-2.5 rounded-xl shadow-sm border border-emerald-100 text-slate-700">
                <FaCheckCircle className="text-emerald-500" /> 500+ Pilgrims Served
              </span>
              <span className="flex items-center gap-2 bg-gradient-to-r from-white to-amber-50/50 px-4 py-2.5 rounded-xl shadow-sm border border-amber-100">
                <FaCalendarAlt className="text-amber-500" /> 10+ Years Experience
              </span>
              <span className="flex items-center gap-2 bg-gradient-to-r from-white to-amber-50/50 px-4 py-2.5 rounded-xl shadow-sm border border-amber-100">
                <FaStar className="text-amber-500" /> 5-Star Rated
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Hajj & Umrah Package Cards */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/10 to-white border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-bold tracking-[0.25em] text-xs uppercase bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-1.5 rounded-full shadow-sm border border-amber-200/50">
              Holy Journeys
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight text-slate-900">
              Our Holy{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Packages
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Hajj Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="group rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white via-white to-amber-50/20 p-8 shadow-md shadow-slate-200/50 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center flex-shrink-0 text-amber-600 border border-amber-200/60 shadow-inner">
                    <FaMosque className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-2xl">
                      {hajjPackage.title}
                    </h3>
                    <p className="text-amber-600 font-extrabold text-lg">{hajjPackage.price}</p>
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-r from-slate-50 to-amber-50/30 rounded-2xl border border-slate-200/70 text-xs text-slate-600 mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span><strong>Duration:</strong> {hajjPackage.duration}</span>
                  <span className="text-slate-300">|</span>
                  <span><strong>Highlight:</strong> {hajjPackage.highlight}</span>
                </div>

                <ul className="space-y-3 text-sm text-slate-600 mb-6">
                  {hajjPackage.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className="w-full text-center bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all text-sm block"
              >
                Book Hajj Package
              </Link>
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>

            {/* Umrah Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
              className="group rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white via-white to-amber-50/20 p-8 shadow-md shadow-slate-200/50 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center flex-shrink-0 text-amber-600 border border-amber-200/60 shadow-inner">
                    <FaMosque className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-2xl">
                      {umrahPackage.title}
                    </h3>
                    <p className="text-amber-600 font-extrabold text-lg">{umrahPackage.price}</p>
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-r from-slate-50 to-amber-50/30 rounded-2xl border border-slate-200/70 text-xs text-slate-600 mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span><strong>Duration:</strong> {umrahPackage.duration}</span>
                  <span className="text-slate-300">|</span>
                  <span><strong>Highlight:</strong> {umrahPackage.highlight}</span>
                </div>

                <ul className="space-y-3 text-sm text-slate-600 mb-6">
                  {umrahPackage.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className="w-full text-center bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all text-sm block"
              >
                Book Umrah Package
              </Link>
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/50 border-b border-emerald-100/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-bold tracking-[0.25em] text-xs uppercase bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-1.5 rounded-full shadow-sm border border-amber-200/50">
              What We Offer
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight text-slate-900">
              Our Dedicated{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="group bg-gradient-to-b from-white via-white to-emerald-50/20 border border-slate-200 rounded-3xl p-6 text-center shadow-sm hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/5 transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200/60 flex items-center justify-center mx-auto mb-4 text-amber-600 shadow-inner">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-slate-900 font-bold text-lg mb-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/15 to-white border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-bold tracking-[0.25em] text-xs uppercase bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-1.5 rounded-full shadow-sm border border-amber-200/50">
              Our Strength
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight text-slate-900">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Us
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {whyChoose.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -3 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-slate-50 to-amber-50/30 border border-slate-200/80 rounded-3xl p-6 text-center shadow-sm hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200/60 flex items-center justify-center mb-3 text-amber-600 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-slate-800 text-sm font-semibold">{item.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/50 border-b border-emerald-100/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-bold tracking-[0.25em] text-xs uppercase bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-1.5 rounded-full shadow-sm border border-amber-200/50">
              Simple Process
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight text-slate-900">
              How to{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Book
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-white via-white to-slate-50 border border-slate-200 rounded-3xl p-5 flex items-center gap-4 hover:border-emerald-300 transition-all shadow-sm"
              >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-md">
                  {index + 1}
                </div>
                <p className="text-slate-700 text-sm font-medium">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/10 to-white border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-slate-50 to-amber-50/30 border border-slate-200/80 rounded-3xl p-8 text-center hover:border-amber-400 transition-all shadow-sm">
              <div className="text-4xl font-extrabold bg-gradient-to-r from-amber-500 via-emerald-600 to-amber-700 bg-clip-text text-transparent mb-2">500+</div>
              <h4 className="text-slate-900 font-bold text-lg">Pilgrims Served</h4>
              <p className="text-slate-500 text-sm mt-1">Since 2026</p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-amber-50/30 border border-slate-200/80 rounded-3xl p-8 text-center hover:border-amber-400 transition-all shadow-sm">
              <div className="text-4xl font-extrabold bg-gradient-to-r from-amber-500 via-emerald-600 to-amber-700 bg-clip-text text-transparent mb-2">10+</div>
              <h4 className="text-slate-900 font-bold text-lg">Years Experience</h4>
              <p className="text-slate-500 text-sm mt-1">In Hajj & Umrah</p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-amber-50/30 border border-slate-200/80 rounded-3xl p-8 text-center hover:border-amber-400 transition-all shadow-sm">
              <div className="text-4xl font-extrabold bg-gradient-to-r from-amber-500 via-emerald-600 to-amber-700 bg-clip-text text-transparent mb-2">99%</div>
              <h4 className="text-slate-900 font-bold text-lg">Satisfaction Rate</h4>
              <p className="text-slate-500 text-sm mt-1">From our pilgrims</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/60 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-white via-white to-amber-50/30 border border-slate-200 rounded-[2.5rem] p-8 md:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-300/20 to-orange-300/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Ready for Your{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Spiritual Journey?
              </span>
            </h2>
            <p className="mt-3 text-slate-600 text-lg max-w-2xl mx-auto">
              Let us help you fulfill your dream of Hajj or Umrah with comfort and peace of mind.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-xl shadow-emerald-600/20 transition-all"
              >
                Book Now <FaArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 border border-slate-300/80 bg-white/60 hover:bg-slate-50 text-slate-700 font-semibold px-8 py-3.5 rounded-2xl transition-all shadow-sm"
              >
                View All Services →
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap justify-center gap-6 text-sm text-slate-600 font-medium">
              <span className="flex items-center gap-2 bg-amber-50/50 px-3 py-1.5 rounded-xl border border-amber-100/60">
                <FaPhone className="text-amber-500" /> +880 1884-694337
              </span>
              <span className="flex items-center gap-2 bg-amber-50/50 px-3 py-1.5 rounded-xl border border-amber-100/60">
                <FaEnvelope className="text-amber-500" /> akinaitravelsbd@gmail.com
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}