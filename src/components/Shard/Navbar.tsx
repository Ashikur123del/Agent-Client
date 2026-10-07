"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { ServiceItem } from "@/types/types";

import NavItem from "./Navitem";
import LanguageToggle from "../LanguageToggle";


const menuData: ServiceItem[] = [
  { title: "Home", href: "/" },
  {
    title: "About Us",
    href: "/about",
    subItems: [
      {
      title: "Our Owner",
      href: "/our-partners", 
    },
      {
      title: "Become an Agent",
      href: "/becomeagent", 
    },
    ],
  },
  {
    title: "Services",
    href: "/services",
    subItems: [
      {
        title: "Ticket",
        href: "/services/ticket",
        nestedItems: [
          {
            title: "Airlines Details",
            href: "/services/ticket/airlines-details",
          },
        ],
      },
      {
        title: "Visa Processing",
        href: "/services/visa-processing",
        nestedItems: [
          {
            title: "Tourist Visa Processing",
            href: "/services/visa-processing/tourist-visa",
          },
          {
            title: "Work Permit",
            href: "/services/visa-processing/work-permit",
          },
        ],
      },
      {
        title: "Manpower",
        href: "/services/manpower",
        nestedItems: [{ title: "Details", href: "/services/manpower/details" }],
      },
      {
        title: "Medical Service",
        href: "/services/medical-service",
        nestedItems: [
          { title: "Documents", href: "/services/medical-service/documents" },
        ],
      },
      {
        title: "Hotel Booking",
        href: "/services/hotel-booking",
      },
      {
        title: "Tour Package",
        href: "/services/tour-package",
        nestedItems: [
          { title: "Bangladesh", href: "/services/tour-package/bangladesh" },
          {
            title: "International",
            href: "/services/tour-package/international",
          },
        ],
      },
      {
        title: "Hajj and Umrah Package",
        href: "/services/hajj-umrah-package",
      },
      {
        title: "Saudi All Services",
        href: "/services/saudi-all-services",
      },
    ],
  },
  { title: "News", href: "/news" },
  { title: "Gallery", href: "/gallery" },
  { title: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-950 via-blue-900 to-cyan-900 text-white sticky top-0 z-50 border-b border-indigo-800/40 shadow-xl backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 relative">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-cyan-200 bg-clip-text text-transparent">
                  Madina{" "}
                  <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                    Hajj Umrah
                  </span>{" "}
                  Travel
                </span>
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-8 items-center">
              {menuData.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </ul>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <LanguageToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-amber-500/20 block notranslate"
              >
                Book Now
              </Link>
            </motion.div>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-indigo-200 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-indigo-950/95 border-t border-indigo-800/50 overflow-hidden"
          >
            <ul className="px-3 pt-2 pb-6 space-y-2">
              <li className="px-3 py-2 border-b border-indigo-800/30 flex justify-start">
                <LanguageToggle />
              </li>

              {menuData.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
              <li className="pt-4 px-3">
                <Link
                  href="#"
                  className="block text-center bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 px-5 py-2.5 rounded-xl font-semibold notranslate"
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
