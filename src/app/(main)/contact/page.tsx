"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaClock,
  FaArrowRight,
  FaSpinner,
} from "react-icons/fa";
import ServiceHero from "../services/ServiceHero";
import { contactApi } from "@/lib/serviceapi/serveraction/contactApi";
import { toast } from "react-toastify";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      await contactApi.sendMessage(formData);

      setIsSubmitted(true);

      toast.success("Your message has been sent successfully!", {
        position: "top-right",
        autoClose: 4000,
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      const errorMsg =
        error.message || "Something went wrong. Please try again.";
      setErrorMessage(errorMsg);

      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 text-slate-800">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-48 top-20 h-[500px] w-[500px] rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute -right-48 top-1/3 h-[500px] w-[500px] rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.08),transparent_30%)]" />
      </div>
      <ServiceHero
        title="Contact Us"
        subtitle="Get in Touch"
        icon={<FaEnvelope />}
        description="Have questions or ready to plan your journey? We're here to help. Reach out to us anytime our team is available 24/7 to assist you."
        bgImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
      />

      <section className="relative overflow-hidden border-b border-emerald-100/30 bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-900 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-amber-400/20 blur-3xl" />
          <div className="absolute bottom-[-180px] left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-300/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_85%_75%,rgba(245,158,11,0.16),transparent_35%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-emerald-500/5 to-amber-500/5 p-6 shadow-lg shadow-emerald-950/10 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/40 hover:bg-emerald-500/10">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-amber-300/10 bg-gradient-to-br from-amber-400/25 to-amber-600/15">
                  <FaPhone className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Phone</h4>
                  <p className="text-emerald-100/70">+880 1884-694337</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-emerald-500/5 to-amber-500/5 p-6 shadow-lg shadow-emerald-950/10 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-500/10">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-emerald-300/10 bg-gradient-to-br from-emerald-400/25 to-emerald-600/15">
                  <FaWhatsapp className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">WhatsApp</h4>
                  <p className="text-emerald-100/70">+880 1884-694337</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-emerald-500/5 to-amber-500/5 p-6 shadow-lg shadow-emerald-950/10 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/40 hover:bg-emerald-500/10">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-amber-300/10 bg-gradient-to-br from-amber-400/25 to-amber-600/15">
                  <FaEnvelope className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <p className="text-emerald-100/70">www.modinahut.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-emerald-500/5 to-amber-500/5 p-6 shadow-lg shadow-emerald-950/10 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/40 hover:bg-emerald-500/10">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-amber-300/10 bg-gradient-to-br from-amber-400/25 to-amber-600/15">
                  <FaMapMarkerAlt className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Address</h4>
                  <p className="text-emerald-100/70">
                    চৌরঙ্গী সুপার মার্কেট (৩য় তলা), মসজিদ সংলগ্ন, লিফটের -২,
                    সাভার, ঢাকা।
                  </p>
                  <p className="text-emerald-100/70">Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-emerald-500/5 to-amber-500/5 p-6 shadow-lg shadow-emerald-950/10 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/40 hover:bg-emerald-500/10">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-amber-300/10 bg-gradient-to-br from-amber-400/25 to-amber-600/15">
                  <FaClock className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Office Hours</h4>
                  <p className="text-emerald-100/70">
                    Saturday – Thursday: 9:00 AM – 6:00 PM
                  </p>
                  <p className="text-emerald-100/70">Friday: Closed</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-emerald-500/5 to-amber-500/5 p-6 shadow-lg shadow-emerald-950/10 backdrop-blur-sm">
                <h4 className="mb-3 font-semibold text-white">Follow Us</h4>
                <div className="flex gap-3">
                  {[
                    { icon: FaFacebook, href: "#" },
                    { icon: FaInstagram, href: "#" },
                    { icon: FaTwitter, href: "#" },
                    { icon: FaWhatsapp, href: "#" },
                  ].map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={idx}
                        href={social.href}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-emerald-200/60 transition-all duration-300 hover:border-amber-400/50 hover:bg-emerald-500/10 hover:text-amber-300"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-emerald-500/5 to-amber-500/5 p-6 shadow-xl shadow-emerald-950/20 backdrop-blur-sm md:p-8"
            >
              <h3 className="mb-2 text-2xl font-bold text-white">
                Send Us a Message
              </h3>
              <p className="mb-6 text-sm text-emerald-100/60">
                We&apos;ll get back to you within 24 hours.
              </p>

              {errorMessage && (
                <div className="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-center">
                  <p className="font-semibold text-red-400">{errorMessage}</p>
                </div>
              )}

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl border border-emerald-400/30 bg-gradient-to-r from-emerald-400/15 to-amber-400/10 p-4 text-center"
                >
                  <p className="font-semibold text-emerald-400">
                    Your message has been sent successfully!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-white">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-emerald-200/40 focus:border-amber-400/50 focus:bg-emerald-500/10 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-white">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Enter your phone number"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-emerald-200/40 focus:border-amber-400/50 focus:bg-emerald-500/10 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-white">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-emerald-200/40 focus:border-amber-400/50 focus:bg-emerald-500/10 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-white">
                      Service Type
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-amber-400/50 focus:bg-emerald-500/10 focus:ring-4 focus:ring-emerald-500/10"
                    >
                      <option value="" className="bg-white text-slate-900">
                        Select a service
                      </option>
                      <option
                        value="ticket"
                        className="bg-white text-slate-900"
                      >
                        Ticket Booking
                      </option>
                      <option value="visa" className="bg-white text-slate-900">
                        Visa Processing
                      </option>
                      <option value="tour" className="bg-white text-slate-900">
                        Tour Package
                      </option>
                      <option value="hajj" className="bg-white text-slate-900">
                        Hajj & Umrah
                      </option>
                      <option value="hotel" className="bg-white text-slate-900">
                        Hotel Booking
                      </option>
                      <option
                        value="manpower"
                        className="bg-white text-slate-900"
                      >
                        Manpower
                      </option>
                      <option
                        value="medical"
                        className="bg-white text-slate-900"
                      >
                        Medical Service
                      </option>
                      <option value="saudi" className="bg-white text-slate-900">
                        Saudi Services
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-white">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Write your message here..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-emerald-200/40 focus:border-amber-400/50 focus:bg-emerald-500/10 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-600 py-3.5 font-bold text-white shadow-xl shadow-emerald-600/20 transition-all duration-300 hover:from-emerald-700 hover:via-emerald-600 hover:to-amber-700 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="h-4 w-4 animate-spin" />{" "}
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <FaArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 bottom-[-100px] h-[300px] w-[300px] rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute -right-32 top-[-100px] h-[300px] w-[300px] rounded-full bg-amber-400/10 blur-3xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-xl shadow-amber-500/5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.098!2d90.415!3d23.735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8f1e5c5e5e5%3A0x5e5e5e5e5e5e5e5e!2sMotijheel%20C%2FA%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale transition-all duration-500 hover:grayscale-0"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
