"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaGlobe,
} from "react-icons/fa";

import {
  MdEmail,
  MdLocationOn,
  MdPhone,
} from "react-icons/md";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim()) {
      setSubscribed(true);
      setEmail("");

      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
  };

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "#",
      label: "Facebook",
    },
    {
      icon: FaTwitter,
      href: "#",
      label: "Twitter",
    },
    {
      icon: FaInstagram,
      href: "#",
      label: "Instagram",
    },
    {
      icon: FaLinkedinIn,
      href: "#",
      label: "LinkedIn",
    },
    {
      icon: FaYoutube,
      href: "#",
      label: "YouTube",
    },
  ];

  const services = [
    {
      label: "Air Ticketing",
      href: "/services",
    },
    {
      label: "Visa Processing",
      href: "/services",
    },
    {
      label: "Hotel Reservation",
      href: "/services",
    },
    {
      label: "Holiday Tour Packages",
      href: "/services",
    },
  ];

  const packages = [
    {
      label: "Umrah Packages",
      href: "/services",
    },
    {
      label: "Hajj Packages 2027",
      href: "/services",
    },
    {
      label: "VIP Pilgrimage",
      href: "/services",
    },
    {
      label: "Pre-registration",
      href: "/contact",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-indigo-950 via-blue-900 to-cyan-900 text-white">

      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="absolute bottom-[-200px] left-1/3 h-[450px] w-[450px] rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.10),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.10),transparent_30%)]" />
      </div>

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}

      <div className="container relative mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* BRAND COLUMN */}
          <div className="space-y-5">
            <Link
              href="/"
              className="inline-block text-2xl font-bold"
            >
              <span className="bg-gradient-to-r from-white via-indigo-100 to-cyan-300 bg-clip-text text-transparent">
                Madina{" "}
              </span>
              <span className="text-amber-400">
                Hajj & Umrah
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-indigo-100/60">
              Paving your sacred pilgrimage with trust, excellence, and dedicated Hajj & Umrah travel support.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-indigo-100/40">
                Follow us
              </span>

              <div className="flex gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      whileHover={{
                        scale: 1.1,
                        y: -3,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-indigo-100/60 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-amber-400"
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="mb-5 text-lg font-bold text-white">
              Our Services
            </h4>

            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-indigo-100/60 transition-colors duration-300 hover:text-amber-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PACKAGES */}
          <div>
            <h4 className="mb-5 text-lg font-bold text-white">
              Packages
            </h4>

            <ul className="space-y-3">
              {packages.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-indigo-100/60 transition-colors duration-300 hover:text-amber-400"
                  >
                    <span className="h-1 w-1 rounded-full bg-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER + CONTACT */}
          <div className="space-y-5">
            <div>
              <h4 className="text-lg font-bold text-white">
                Get Updates
              </h4>

              <p className="mt-2 text-sm leading-relaxed text-indigo-100/60">
                Subscribe to receive updates on upcoming Hajj & Umrah batches and offers.
              </p>
            </div>

            {/* Newsletter */}
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white outline-none backdrop-blur-sm transition-all placeholder:text-indigo-100/30 focus:border-cyan-400/50 focus:bg-white/15"
              />

              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="whitespace-nowrap rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:from-amber-400 hover:to-orange-400"
              >
                Subscribe
              </motion.button>
            </form>

            {/* Success Message */}
            {subscribed && (
              <motion.p
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="text-sm font-medium text-emerald-400"
              >
                ✓ Subscribed successfully!
              </motion.p>
            )}

            {/* Contact Details from Image */}
            <div className="space-y-3 border-t border-white/10 pt-4">
              <div className="flex items-start gap-3 text-sm text-indigo-100/60">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <MdLocationOn className="h-5 w-5 text-amber-400" />
                </span>
                <span>
                  Chowrangi Super Market (3rd Floor), Savar, Dhaka
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-indigo-100/60">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <MdPhone className="h-5 w-5 text-amber-400" />
                </span>
                <span>
                  +880 1714 544 877
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-indigo-100/60">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <MdEmail className="h-5 w-5 text-amber-400" />
                </span>
                <span className="break-all">
                  madinahut26@gmail.com
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-indigo-100/60">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                  <FaGlobe className="h-4 w-4 text-amber-400" />
                </span>
                <span className="break-all">
                  www.madinahut.com
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}

      <div className="relative border-t border-white/10 bg-indigo-950/30 backdrop-blur-md">
        <div className="container mx-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

            {/* Copyright */}
            <p className="text-center text-xs text-indigo-100/40 md:text-left">
              © 2026 Madina Hajj & Umrah Travels. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-5">
              <Link
                href="/privacy-policy"
                className="text-xs text-indigo-100/40 transition-colors hover:text-amber-400"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-of-service"
                className="text-xs text-indigo-100/40 transition-colors hover:text-amber-400"
              >
                Terms of Service
              </Link>

              <Link
                href="/contact"
                className="text-xs text-indigo-100/40 transition-colors hover:text-amber-400"
              >
                Contact Us
              </Link>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2 text-indigo-100/30">
              <FaCcVisa className="h-6 w-6" />
              <FaCcMastercard className="h-6 w-6" />
              <FaCcPaypal className="h-6 w-6" />
              <FaCcAmex className="h-6 w-6" />
              <span className="ml-1 text-xs">
                Secure
              </span>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;