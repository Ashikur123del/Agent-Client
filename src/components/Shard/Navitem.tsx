"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceItem, SubItemType, isNestedItem } from "@/types/types";

const isDesktop = () => typeof window !== "undefined" && window.innerWidth >= 768;

export default function NavItem({ item }: { item: ServiceItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  if (!item.subItems) {
    return (
      <li>
        <Link href={item.href || "#"} className="block text-indigo-200 hover:text-white px-3 py-2 font-medium transition-colors md:p-0">
          {item.title}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative group/main py-2 md:py-4"
      onMouseEnter={() => isDesktop() && setIsOpen(true)}
      onMouseLeave={() => {
        if (isDesktop()) {
          setIsOpen(false);
          setActiveSubMenu(null);
        }
      }}
    >
      <div className="flex items-center gap-1">
        <Link
          href={item.href || "#"}
          className="text-indigo-200 hover:text-white px-3 md:px-0 font-medium transition-colors"
        >
          {item.title}
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:text-white focus:outline-none"
          aria-label="Toggle dropdown"
        >
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="w-4 h-4 text-indigo-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="md:absolute left-0 mt-2 w-full md:w-64 bg-indigo-950 text-indigo-50 rounded-xl md:shadow-2xl border border-indigo-800/50 z-50 py-2"
          >
            {item.subItems!.map((sub: SubItemType, idx: number) => {
              const nested = isNestedItem(sub);

              return (
                <li
                  key={idx}
                  className="relative group/sub px-2 md:px-0"
                  onMouseEnter={() => isDesktop() && nested && setActiveSubMenu(sub.title)}
                  onMouseLeave={() => isDesktop() && nested && setActiveSubMenu(null)}
                >
                  {nested ? (
                    <div className="flex items-center justify-between px-4 py-2.5 hover:bg-indigo-800/60 rounded-lg">
                      <Link
                        href={sub.href || "#"}
                        className="text-sm font-medium hover:text-amber-300 transition-colors flex-1"
                      >
                        {sub.title}
                      </Link>

                      <button
                        onClick={() =>
                          setActiveSubMenu(activeSubMenu === sub.title ? null : sub.title)
                        }
                        className="p-1 hover:text-amber-300 focus:outline-none"
                        aria-label="Toggle nested"
                      >
                        <motion.svg
                          animate={{ rotate: activeSubMenu === sub.title ? 90 : 0 }}
                          className="w-3 h-3 text-indigo-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </button>
                    </div>
                  ) : (
                    <Link href={sub.href || "#"} className="block px-4 py-2.5 hover:bg-indigo-800/60 hover:text-amber-300 text-sm rounded-lg">
                      {sub.title}
                    </Link>
                  )}
                  {nested && (
                    <AnimatePresence>
                      {activeSubMenu === sub.title && (
                        <motion.ul
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="md:absolute md:left-full md:top-0 w-full md:w-56 bg-indigo-950 md:border md:border-indigo-800/50 rounded-xl py-1 pl-4 md:pl-0"
                        >
                          {sub.nestedItems.map((linkItem, nIdx) => (
                            <li key={nIdx}>
                              <Link
                                href={linkItem.href}
                                className="block px-4 py-2 hover:bg-indigo-800/60 hover:text-amber-300 text-xs md:text-sm rounded-lg"
                              >
                                {linkItem.title}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}