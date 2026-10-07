"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaMoneyBillAlt,
  FaPassport,
  FaPlane,
  FaUsers,
  FaHospital,
  FaFileAlt,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaBuilding,
  FaShieldAlt,
  FaHands,
} from "react-icons/fa";
import ServiceHero from "../ServiceHero";

interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  highlight?: string;
}

interface WhyChooseItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const services: ServiceItem[] = [
  {
    icon: FaPassport,
    title: "Saudi Visa Services",
    desc: "Tourist, business, work, and family visit visas for Saudi Arabia. Complete document assistance and application support.",
    highlight: "95% Approval Rate",
  },
  {
    icon: FaPlane,
    title: "Saudi Ticket Support",
    desc: "Best flight options to Saudi Arabia from Bangladesh with competitive fares on Biman, Saudia, Emirates, and more.",
    highlight: "Best Fares",
  },
  {
    icon: FaUsers,
    title: "Saudi Manpower Support",
    desc: "Worker placement, document processing, and employment coordination for Saudi job opportunities across all sectors.",
    highlight: "100+ Workers Placed",
  },
  {
    icon: FaHospital,
    title: "Saudi Medical Support",
    desc: "Complete medical test guidance and health documentation required for Saudi visas and work permits.",
    highlight: "Authorized Clinics",
  },
  {
    icon: FaFileAlt,
    title: "Saudi Document Processing",
    desc: "Complete document attestation, verification, and legalization for all Saudi visa and employment applications.",
    highlight: "Fast Processing",
  },
  {
    icon: FaMoneyBillAlt,
    title: "Hajj & Umrah Support",
    desc: "Complete Hajj and Umrah services for Saudi Arabia – visa, flights, hotels, transport, and Ziyarah support.",
    highlight: "500+ Pilgrims Served",
  },
];

// Why Choose Us
const whyChoose: WhyChooseItem[] = [
  { icon: FaShieldAlt, label: "Authorized Agent" },
  { icon: FaHands, label: "Transparent Process" },
  { icon: FaStar, label: "4.9/5 Rating" },
  { icon: FaBuilding, label: "Saudi Embassy Approved" },
];

// Booking Steps
const steps: string[] = [
  "Contact us with your requirements",
  "We provide a tailored solution",
  "Complete documentation and application",
  "Track status with our support team",
  "Receive your Saudi visa/services",
];

export default function SaudiAllServicesPage() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 text-slate-800">
      {/* Complete Emerald + Amber decorative palette layer */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-48 top-20 h-[500px] w-[500px] rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute -right-48 top-1/3 h-[500px] w-[500px] rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/20 blur-3xl" />
      </div>

      <ServiceHero
        title="Saudi All Services"
        subtitle="Saudi Services"
        icon={<FaMoneyBillAlt />}
        description="Complete Saudi Arabia services – visa processing, ticket booking, manpower support, medical documentation, and Hajj & Umrah packages. Your one-stop solution for all Saudi travel and employment needs."
        bgImage="https://images.pexels.com/photos/36573970/pexels-photo-36573970/free-photo-of-pilgrims-gather-around-the-kaaba-in-mecca.jpeg?h=1000&w=1500&fit=crop"
      />

      {/* Overview Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/50 border-b border-emerald-100/50 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden"><div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" /><div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" /><div className="absolute bottom-[-180px] left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/40 blur-3xl" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.08),transparent_30%)]" /></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-600 font-bold tracking-[0.25em] text-xs uppercase bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-1.5 rounded-full shadow-sm border border-amber-200/50">
              Complete Solutions
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Your Complete{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Saudi Solution
              </span>
            </h2>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              Whether you are planning a pilgrimage, a business trip, or a new
              career in Saudi Arabia – we provide comprehensive services to make
              your journey smooth and successful. Our expert team handles every
              detail with professionalism and care.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2 bg-gradient-to-r from-white to-emerald-50/50 px-4 py-2.5 rounded-xl shadow-sm border border-emerald-100 text-slate-700">
                <FaCheckCircle className="text-emerald-500" /> 1000+ Visas Processed
              </span>
              <span className="flex items-center gap-2 bg-gradient-to-r from-white to-amber-50/50 px-4 py-2.5 rounded-xl shadow-sm border border-amber-100 text-slate-700">
                <FaClock className="text-amber-500" /> Fast Processing
              </span>
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                <FaBuilding className="text-amber-500" /> Saudi Embassy Approved
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/10 to-white border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-bold tracking-[0.25em] text-xs uppercase bg-amber-100 px-3 py-1 rounded-full">
              What We Offer
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Our{" "}
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
                  className="group bg-gradient-to-b from-white via-white to-emerald-50/20 border border-slate-200/80 rounded-2xl p-6 text-center shadow-sm shadow-slate-200/50 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200/60 flex items-center justify-center mx-auto mb-4 text-amber-600 shadow-inner">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h4 className="text-slate-900 font-bold text-lg mb-2">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>
                  {item.highlight && (
                    <div>
                      <span className="inline-block bg-amber-50 border border-amber-200 rounded-full px-3 py-1 text-amber-700 text-xs font-semibold transition-colors group-hover:border-emerald-200 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                        ✨ {item.highlight}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/50 border-b border-emerald-100/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
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
                  className="bg-gradient-to-br from-slate-50 to-amber-50/30 border border-slate-200/80 rounded-2xl p-5 text-center shadow-sm hover:border-emerald-300 hover:shadow-md transition-all"
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

      {/* How to Get Started */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/10 to-white border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              How to{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Get Started
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
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/50 border-b border-emerald-100/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-slate-50 to-amber-50/30 border border-slate-200/80 rounded-3xl p-8 text-center hover:border-emerald-300 transition-all shadow-sm">
              <div className="text-4xl font-extrabold bg-gradient-to-r from-amber-500 via-emerald-600 to-amber-700 bg-clip-text text-transparent mb-2">1000+</div>
              <h4 className="text-slate-900 font-bold text-lg">Visas Processed</h4>
              <p className="text-slate-500 text-sm mt-1">Since 2026</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center hover:border-amber-300 transition-all shadow-sm">
              <div className="text-4xl font-extrabold text-amber-600 mb-2">12+</div>
              <h4 className="text-slate-900 font-bold text-lg">Services Offered</h4>
              <p className="text-slate-500 text-sm mt-1">For Saudi Arabia</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center hover:border-amber-300 transition-all shadow-sm">
              <div className="text-4xl font-extrabold text-amber-600 mb-2">98%</div>
              <h4 className="text-slate-900 font-bold text-lg">Success Rate</h4>
              <p className="text-slate-500 text-sm mt-1">Visa applications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Cards */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/10 to-white border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-50 to-amber-50/30 border border-slate-200/80 rounded-3xl p-8 shadow-sm hover:border-emerald-300 transition-all">
              <h4 className="text-slate-900 font-bold text-xl mb-4 flex items-center gap-2">
                📋 Visa Types
              </h4>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-500 w-4 h-4 flex-shrink-0" /> Tourist Visa
                </li>
                <li className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-500 w-4 h-4 flex-shrink-0" /> Business Visa
                </li>
                <li className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-500 w-4 h-4 flex-shrink-0" /> Work Visa / Employment
                </li>
                <li className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-500 w-4 h-4 flex-shrink-0" /> Family Visit Visa
                </li>
                <li className="flex items-center gap-2.5">
                  <FaCheckCircle className="text-emerald-500 w-4 h-4 flex-shrink-0" /> Hajj & Umrah Visa
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm hover:border-amber-300 transition-all">
              <h4 className="text-slate-900 font-bold text-xl mb-4 flex items-center gap-2">
                ✅ Why Saudi Arabia?
              </h4>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-2.5">
                  <FaStar className="text-amber-500 w-4 h-4 flex-shrink-0" /> Growing economy & job market
                </li>
                <li className="flex items-center gap-2.5">
                  <FaStar className="text-amber-500 w-4 h-4 flex-shrink-0" /> Vision 2030 opportunities
                </li>
                <li className="flex items-center gap-2.5">
                  <FaStar className="text-amber-500 w-4 h-4 flex-shrink-0" /> Competitive salaries
                </li>
                <li className="flex items-center gap-2.5">
                  <FaStar className="text-amber-500 w-4 h-4 flex-shrink-0" /> Tax-free income
                </li>
                <li className="flex items-center gap-2.5">
                  <FaStar className="text-amber-500 w-4 h-4 flex-shrink-0" /> Modern infrastructure
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/60 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-b from-white via-white to-amber-50/30 border border-slate-200 rounded-[2.5rem] p-8 md:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-300/20 to-orange-300/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Saudi Journey?
              </span>
            </h2>
            <p className="mt-3 text-slate-600 text-lg max-w-2xl mx-auto">
              Contact us today for a free consultation and let us handle all your Saudi service needs.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-600 hover:from-emerald-700 hover:to-amber-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-xl shadow-emerald-600/20 transition-all"
              >
                Get Started <FaArrowRight className="w-4 h-4" />
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