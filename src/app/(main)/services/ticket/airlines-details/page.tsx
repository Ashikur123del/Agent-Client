"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaPlane,
  FaMapMarkerAlt,
  FaSuitcase,
  FaClock,
  FaStar,
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
  FaUsers,
  FaLightbulb,
  FaHeadset,
} from "react-icons/fa";
import ServiceHero from "../../ServiceHero";

const airlines = [
  {
    name: "Emirates",
    hub: "Dubai (DXB)",
    alliance: "None (Independent)",
    routes: "Dubai, London, New York, Sydney, Paris, Singapore",
    flightTime: "8-12 hours",
    baggage: "30kg + 7kg hand carry",
    rules: "E-ticket required, 24hr cancellation policy",
    rating: 4.8,
    website: "https://www.emirates.com",
    directRoutes: "Dubai, London, Singapore",
    connectingRoutes: "New York, Sydney, Paris",
    gradient: "from-emerald-600 to-amber-600",
  },
  {
    name: "Qatar Airways",
    hub: "Doha (DOH)",
    alliance: "oneworld",
    routes: "Doha, Paris, Tokyo, Johannesburg, Bangkok, London",
    flightTime: "6-10 hours",
    baggage: "30kg + 7kg hand carry",
    rules: "E-ticket required, 24hr cancellation policy",
    rating: 4.7,
    website: "https://www.qatarairways.com",
    directRoutes: "Doha, London, Paris",
    connectingRoutes: "Tokyo, Johannesburg, Bangkok",
    gradient: "from-amber-600 via-emerald-600 to-amber-700",
  },
  {
    name: "Singapore Airlines",
    hub: "Singapore (SIN)",
    alliance: "Star Alliance",
    routes: "Singapore, Bangkok, Mumbai, San Francisco, Sydney, London",
    flightTime: "7-11 hours",
    baggage: "35kg + 7kg hand carry",
    rules: "E-ticket required, 48hr cancellation policy",
    rating: 4.9,
    website: "https://www.singaporeair.com",
    directRoutes: "Singapore, Bangkok, Mumbai",
    connectingRoutes: "San Francisco, Sydney, London",
    gradient: "from-emerald-600 to-teal-600",
  },
  {
    name: "Turkish Airlines",
    hub: "Istanbul (IST)",
    alliance: "Star Alliance",
    routes: "Istanbul, Berlin, Moscow, Dubai, Karachi, New York",
    flightTime: "5-9 hours",
    baggage: "30kg + 7kg hand carry",
    rules: "E-ticket required, 24hr cancellation policy",
    rating: 4.6,
    website: "https://www.turkishairlines.com",
    directRoutes: "Istanbul, Berlin, Dubai",
    connectingRoutes: "Moscow, Karachi, New York",
    gradient: "from-amber-500 to-amber-600",
  },
  {
    name: "Etihad Airways",
    hub: "Abu Dhabi (AUH)",
    alliance: "None (Independent)",
    routes: "Abu Dhabi, London, New York, Sydney, Singapore, Paris",
    flightTime: "7-11 hours",
    baggage: "30kg + 7kg hand carry",
    rules: "E-ticket required, 24hr cancellation policy",
    rating: 4.7,
    website: "https://www.etihad.com",
    directRoutes: "Abu Dhabi, London, Singapore",
    connectingRoutes: "New York, Sydney, Paris",
    gradient: "from-emerald-700 to-amber-600",
  },
  {
    name: "Biman Bangladesh Airlines",
    hub: "Dhaka (DAC)",
    alliance: "None (Independent)",
    routes: "Dhaka, London, Singapore, Kuala Lumpur, Bangkok, Kolkata",
    flightTime: "4-8 hours",
    baggage: "30kg + 7kg hand carry",
    rules: "E-ticket required, 24hr cancellation policy",
    rating: 4.2,
    website: "https://www.biman-airlines.com",
    directRoutes: "Dhaka, Kolkata, Bangkok",
    connectingRoutes: "London, Singapore, Kuala Lumpur",
    gradient: "from-teal-600 to-emerald-600",
  },
];

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar key={i} className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
    );
  }
  if (hasHalfStar) {
    stars.push(
      <FaStar
        key="half"
        className="h-3.5 w-3.5 text-amber-500 fill-amber-500 opacity-60"
      />
    );
  }
  while (stars.length < 5) {
    stars.push(
      <FaStar key={stars.length} className="h-3.5 w-3.5 text-slate-200" />
    );
  }
  return stars;
};

export default function AirlinesDetailsPage() {
  return (
    <main className="bg-white">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <ServiceHero
        title="Airlines Details"
        subtitle="Partner Airlines"
        icon={<FaPlane />}
        description="Complete information about our partner airlines – routes, flight time, baggage policies, and booking rules. Find the best airline for your journey."
        bgImage="https://images.unsplash.com/photo-1542296332-2e4473faf563?w=1920&q=80"
      />

      {/* =====================================================
          PARTNER AIRLINES GRID
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.08),transparent_30%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                Partner Airlines
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl md:text-5xl">
              Our Partner{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Airlines
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Choose from our trusted network of global and regional airlines
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {airlines.map((airline, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
              >
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                  <div>
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-emerald-700">
                          {airline.name}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1 font-medium">
                            <FaGlobe className="h-3 w-3 text-emerald-600" /> Hub: {airline.hub}
                          </span>
                          {airline.alliance !== "None (Independent)" && (
                            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700 border border-emerald-100">
                              <FaUsers className="h-3 w-3 text-emerald-600" /> {airline.alliance}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 border border-amber-200/60">
                        <div className="flex items-center gap-0.5">
                          {renderStars(airline.rating)}
                        </div>
                        <span className="ml-1 text-xs font-bold text-slate-700">
                          {airline.rating}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm text-slate-600">
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                        <span>
                          <strong className="text-slate-800">Routes:</strong> {airline.routes}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaPlane className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                        <div>
                          <span className="block">
                            <strong className="text-slate-800">Direct:</strong> {airline.directRoutes}
                          </span>
                          <span className="block text-xs text-slate-400">
                            Connecting: {airline.connectingRoutes}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaClock className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                        <span>
                          <strong className="text-slate-800">Flight Time:</strong> {airline.flightTime}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaSuitcase className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                        <span>
                          <strong className="text-slate-800">Baggage:</strong> {airline.baggage}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400 flex items-center gap-1.5">
                      <span>📋</span> {airline.rules}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <a
                        href={airline.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 transition-colors hover:text-amber-600"
                      >
                        Visit Website <FaArrowRight className="h-3 w-3" />
                      </a>
                      <span className="text-base opacity-70">✈️</span>
                    </div>
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${airline.gradient} transition-all duration-300 group-hover:w-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK COMPARISON TABLE SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                তুলনা সারণী
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Quick{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Comparison
              </span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Compare key features at a glance
            </p>
          </div>

          <div className="max-w-7xl mx-auto overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/50">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-gradient-to-r from-emerald-50 to-amber-50/50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-700 font-bold">
                  <tr>
                    <th className="px-6 py-4">Airline</th>
                    <th className="px-6 py-4">Hub</th>
                    <th className="px-6 py-4">Alliance</th>
                    <th className="px-6 py-4">Flight Time</th>
                    <th className="px-6 py-4">Baggage</th>
                    <th className="px-6 py-4">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {airlines.map((airline, idx) => (
                    <tr key={idx} className="transition-colors hover:bg-emerald-50/40">
                      <td className="px-6 py-4 font-bold text-slate-900">{airline.name}</td>
                      <td className="px-6 py-4">{airline.hub}</td>
                      <td className="px-6 py-4">{airline.alliance}</td>
                      <td className="px-6 py-4">{airline.flightTime}</td>
                      <td className="px-6 py-4">{airline.baggage}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <div className="flex">{renderStars(airline.rating)}</div>
                          <span className="text-xs font-bold text-slate-700">{airline.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TIPS & NEED HELP SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/40 via-white to-amber-50/50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-7xl mx-auto">
            {/* Booking Tips Card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-md transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-amber-600 text-white shadow-md">
                  <FaLightbulb className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Booking Tips</h3>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>Book at least 2-3 weeks in advance for best fares.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>Check baggage allowance carefully – policies vary by carrier.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>Consider connecting flights for cheaper options on long-haul routes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>Always carry a printed copy of your e-ticket and passport.</span>
                </li>
              </ul>
            </div>

            {/* Need Help Card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-md transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60 flex flex-col justify-between">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 via-emerald-600 to-amber-700 text-white shadow-md">
                    <FaHeadset className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Need Help?</h3>
                </div>
                <p className="mb-6 text-sm text-slate-600 leading-relaxed">
                  Our travel experts are here to assist you with booking and fare queries.
                </p>
                <div className="space-y-3 text-sm font-medium text-slate-700">
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-amber-500" />
                    <span>+880 1234 567890</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-amber-500" />
                    <span>info@travelagency.com</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all duration-300 hover:from-emerald-700 hover:to-amber-700 hover:shadow-lg"
                >
                  Contact Us Now <FaArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-12 text-center text-xs font-medium text-slate-400">
            Professional travel support from booking to destination.
          </p>
        </div>
      </section>
    </main>
  );
}