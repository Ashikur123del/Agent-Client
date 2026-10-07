"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaPlane,
  FaClock,
  FaDollarSign,
  FaCheckCircle,
  FaShieldAlt,
  FaHeadset,
  FaGlobe,
  FaMapMarkerAlt,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import ServiceHero from "../ServiceHero";

const features = [
  {
    icon: FaPlane,
    title: "Domestic & International Booking",
    desc: "We book flights to 30+ countries and all domestic routes in Bangladesh.",
    gradient: "from-emerald-600 to-amber-600",
  },
  {
    icon: FaClock,
    title: "Real-time Flight Schedule",
    desc: "Get accurate departure and arrival times, delays, and gate information.",
    gradient: "from-amber-600 via-emerald-600 to-amber-700",
  },
  {
    icon: FaDollarSign,
    title: "Best Fare Guarantee",
    desc: "We compare fares across airlines to ensure you get the best deal available.",
    gradient: "from-emerald-600 to-teal-600",
  },
  {
    icon: FaCheckCircle,
    title: "Instant Confirmation",
    desc: "Receive your e-ticket immediately after booking confirmation.",
    gradient: "from-amber-500 to-amber-600",
  },
];

const popularRoutes = [
  { from: "Dhaka (DAC)", to: "Dubai (DXB)", price: "$450+" },
  { from: "Dhaka (DAC)", to: "London (LHR)", price: "$600+" },
  { from: "Dhaka (DAC)", to: "Bangkok (BKK)", price: "$350+" },
  { from: "Dhaka (DAC)", to: "Singapore (SIN)", price: "$400+" },
  { from: "Dhaka (DAC)", to: "Kuala Lumpur (KUL)", price: "$320+" },
  { from: "Dhaka (DAC)", to: "Istanbul (IST)", price: "$550+" },
];

const steps = [
  "Search for flights",
  "Compare prices & select",
  "Provide passenger details",
  "Make payment",
  "Receive e-ticket",
];

export default function TicketPage() {
  return (
    <main className="bg-white">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <ServiceHero
        title="Air Ticket Booking"
        subtitle="Ticket Service"
        icon={<FaPlane />}
        description="Book domestic and international flights at the best available prices. We provide fare checking, schedule information, and instant confirmation support – all with a 100% money-back guarantee."
        bgImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80"
      />

      {/* =====================================================
          FEATURE SECTION (WHY CHOOSE US)
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        {/* Background Blur Decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.08),transparent_30%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                Ticket Service
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl md:text-5xl">
              Why Choose Our{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Ticket Service
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              We make flight booking effortless, affordable, and reliable.
            </p>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-7xl mx-auto">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                >
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-md transition-transform duration-300 group-hover:scale-110`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 transition-colors duration-300 group-hover:text-emerald-700">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${item.gradient} transition-all duration-300 group-hover:w-full`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                সহজ ধাপসমূহ
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              How It{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Book your flight in just 5 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-7xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-md transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-600 to-amber-600 text-lg font-extrabold text-white shadow-md">
                  {index + 1}
                </div>
                <p className="text-sm font-semibold text-slate-800">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          POPULAR ROUTES SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/40 via-white to-amber-50/50 py-16 md:py-24 border-b border-slate-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/20 blur-3xl" />
          <div className="absolute -left-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/30 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                জনপ্রিয় রুট
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Popular{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Routes
              </span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Most booked routes by our customers
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-md transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <FaMapMarkerAlt className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800 sm:text-base">
                    {route.from} → {route.to}
                  </span>
                </div>
                <span className="text-sm font-extrabold text-amber-600 sm:text-base">
                  {route.price}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          ADDITIONAL BENEFITS SECTION
      ====================================================== */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-7xl mx-auto">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-md transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-amber-600 text-white shadow-md">
                <FaShieldAlt className="h-7 w-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Secure Payment</h4>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Your transactions are 100% safe and encrypted.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-md transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 via-emerald-600 to-amber-700 text-white shadow-md">
                <FaHeadset className="h-7 w-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">24/7 Support</h4>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Our team is always available to assist you.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-md transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-md">
                <FaGlobe className="h-7 w-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">Global Network</h4>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                We partner with 50+ airlines worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CALL TO ACTION SECTION
      ====================================================== */}
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
                বুকিং সাপোর্ট
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Ready to Book Your{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Flight?
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Contact us now and get the best deals on your next journey.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl md:text-base"
              >
                Contact Us <FaArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services/ticket/airlines-details"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:bg-slate-50 hover:shadow-md md:text-base"
              >
                View Airlines Details →
              </Link>
            </div>

            <p className="mt-8 text-xs font-medium text-slate-400 border-t border-slate-100 pt-6">
              Professional travel support from booking to destination.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}