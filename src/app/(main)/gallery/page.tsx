"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaImages, FaArrowRight, FaPhone, FaEnvelope, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import ServiceHero from "../services/ServiceHero";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch galleries from API
  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`, {
          cache: "no-store",
        });
        const result = await res.json();
        
        if (res.ok || result.success) {
          const items = Array.isArray(result) ? result : result.data || [];
          setGalleryImages(items);
        } else {
          toast.error(result.message || "Failed to fetch galleries");
        }
      } catch (error) {
        console.error("Error fetching galleries:", error);
        toast.error("Something went wrong while fetching!");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 text-slate-800">
      {/* Complete Emerald + Amber + Teal + Slate + White decorative palette */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-48 top-20 h-[500px] w-[500px] rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute -right-48 top-1/3 h-[500px] w-[500px] rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.08),transparent_30%)]" />
      </div>

      {/* HERO SECTION */}
      <ServiceHero
        title="Our Gallery"
        subtitle="Visual Journey"
        icon={<FaImages />}
        description="Explore our curated collection of luxury hotels, beautiful resorts, premium rooms, and world-class amenities across our top destinations."
        bgImage="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80"
      />

      {/* GALLERY GRID SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/50 py-16 md:py-24 border-b border-emerald-100/50">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-sky-300/20 blur-3xl" />
          <div className="absolute -right-40 top-1/4 h-[450px] w-[450px] rounded-full bg-indigo-300/20 blur-3xl" />
          <div className="absolute bottom-[-180px] left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/40 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.06),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.06),transparent_30%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400" />
              <span className="rounded-full bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-600 shadow-sm border border-amber-200/50">
                Photo Collection
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-amber-500 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Hotel Experiences
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-500 md:text-lg">
              Take a glance at the comfort, elegance, and facilities awaiting you at our handpicked partner properties.
            </p>
          </motion.div>

          {/* LOADING & DATA RENDER */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <FaSpinner className="animate-spin text-3xl text-emerald-600" />
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl border border-slate-200 max-w-xl mx-auto shadow-sm">
              <p className="text-slate-500 text-sm">No gallery items found.</p>
            </div>
          ) : (
            /* GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {galleryImages.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white via-white to-emerald-50/20 shadow-md shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
                >
                  <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-slate-50 to-amber-50/30">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-slate-700 shadow-sm z-10">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-emerald-700 line-clamp-1">
                      {item.title}
                    </h3>
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/60 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 bottom-[-120px] h-[350px] w-[350px] rounded-full bg-emerald-200/25 blur-3xl" />
          <div className="absolute -right-32 top-[-120px] h-[350px] w-[350px] rounded-full bg-amber-200/25 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-slate-200 bg-gradient-to-b from-white via-white to-amber-50/30 p-8 text-center shadow-2xl md:p-12"
          >
            <span className="inline-block rounded-full bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-600 border border-amber-200/50 shadow-sm">
              Book Your Stay
            </span>

            <h2 className="mt-5 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Inspired by Our{" "}
              <span className="bg-gradient-to-r from-amber-500 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Destinations?
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
              Let us help you book these luxurious stays at the best available rates today.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-600 px-7 py-3.5 font-bold text-white shadow-xl shadow-emerald-600/20 transition-all duration-300 hover:from-emerald-700 hover:to-amber-700"
              >
                Contact Us <FaArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-medium text-slate-500 border-t border-slate-100 pt-6">
              <span className="flex items-center gap-2 bg-amber-50/50 px-3 py-1.5 rounded-xl border border-amber-100/60">
                <FaPhone className="text-amber-500" /> +880 1884-694337
              </span>
              <span className="flex items-center gap-2 bg-amber-50/50 px-3 py-1.5 rounded-xl border border-amber-100/60">
                <FaEnvelope className="text-amber-500" /> akinaitravelsbd@gmail.com
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}