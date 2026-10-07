"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_NAME = "googtrans";

function setLanguageCookie(lang: "en" | "bn") {
  const domain = window.location.hostname;

  if (lang === "en") {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
    document.cookie = `${COOKIE_NAME}=; path=/; domain=${domain}; max-age=0`;
    document.cookie = `${COOKIE_NAME}=; path=/; domain=.${domain}; max-age=0`;
  } else {
    const value = `/en/${lang}`;
    document.cookie = `${COOKIE_NAME}=${value}; path=/`;
    document.cookie = `${COOKIE_NAME}=${value}; path=/; domain=${domain}`;
    document.cookie = `${COOKIE_NAME}=${value}; path=/; domain=.${domain}`;
  }
}

export default function LanguageToggle() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<"en" | "bn">("en");
  const [mounted, setMounted] = useState(false); 
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("site_lang") as "en" | "bn" | null;
    if (saved) setCurrent(saved);
    setMounted(true); 
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (lang: "en" | "bn") => {
    if (lang === current) {
      setOpen(false);
      return;
    }
    window.localStorage.setItem("site_lang", lang);
    setLanguageCookie(lang);
    window.location.reload();
  };

  
  const label = mounted ? (current === "en" ? "Language" : "ভাষা") : "Language";

  return (
    <div className="relative notranslate" ref={ref} suppressHydrationWarning>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-teal-100 hover:text-white px-3 py-1.5 rounded-lg border border-teal-800/50 text-sm font-medium transition-colors"
      >
        <span suppressHydrationWarning>{label}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute right-0 mt-2 w-40 bg-teal-950 border border-teal-800/50 rounded-xl shadow-2xl py-1 z-50"
          >
            <li>
              <button
                onClick={() => handleSelect("en")}
                className={`w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-teal-800/60 hover:text-amber-300 ${
                  mounted && current === "en" ? "text-amber-300" : "text-teal-50"
                }`}
              >
                English
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSelect("bn")}
                className={`w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-teal-800/60 hover:text-amber-300 ${
                  mounted && current === "bn" ? "text-amber-300" : "text-teal-50"
                }`}
              >
                বাংলা
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}