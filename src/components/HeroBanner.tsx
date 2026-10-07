"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import Left from "@/assets/left.png";
import Right from "@/assets/right.png";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { getSliders } from "@/lib/serviceapi/slider.service";

// Prisma schema er sathe match kore interface update kora holo
interface Slide {
  id: string | number;
  image: string;
  alt?: string;
  firstText: string;
  highlightText: string;
  secondText: string;
  description: string;
}

const HeroBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getSliders();
        setSlides(data || []);
      } catch (error) {
        console.error("Failed to load sliders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const textContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const normalText = {
    hidden: { opacity: 0, x: -70 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.75, ease: "easeInOut" as const },
    },
  };

  const highlightTextAnim = {
    hidden: { opacity: 0, x: 100, scale: 0.82 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.9, ease: "easeInOut" as const },
    },
  };

  const secondLine = {
    hidden: { opacity: 0, y: 45 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" as const },
    },
  };

  if (loading) {
    return (
      <section className="relative h-[80vh] min-h-[500px] w-full bg-slate-950 flex items-center justify-center text-white">
        <p className="text-base animate-pulse text-amber-400">
          Loading Banners...
        </p>
      </section>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden md:h-[75vh]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className="hero-swiper h-full w-full"
      >
        {slides.map((slide, index) => {
          const rawImage = slide?.image || "";
          const imageUrl = rawImage.startsWith("http")
            ? rawImage
            : rawImage.startsWith("/")
            ? rawImage
            : `/${rawImage}`;

          return (
            <SwiperSlide key={slide.id || index}>
              <div className="relative h-full w-full overflow-hidden">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: activeIndex === index ? 1.08 : 1 }}
                  transition={{ duration: 6, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full"
                >
                  <Image
                    src={imageUrl}
                    alt={slide.alt || "Slide image"}
                    fill
                    priority={index === 0}
                    unoptimized={true}
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-indigo-950/50 to-sky-950/35" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/60 to-transparent" />
                <div className="absolute -left-32 top-1/3 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
                <div className="absolute -right-32 bottom-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

                <div className="relative z-10 flex h-full w-full items-center justify-center text-center">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {activeIndex === index && (
                      <motion.div
                        variants={textContainer}
                        initial="hidden"
                        animate="show"
                        className="mx-auto max-w-4xl"
                      >
                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.7, delay: 0.1 },
                            },
                          }}
                          className="mb-3 flex items-center justify-center gap-3"
                        >
                          <span className="h-px w-6 bg-gradient-to-r from-transparent to-sky-300 sm:w-10" />
                          <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-sky-200 backdrop-blur-md sm:text-[11px]">
                            Your Journey Starts Here
                          </span>
                          <span className="h-px w-6 bg-gradient-to-l from-transparent to-sky-300 sm:w-10" />
                        </motion.div>

                        {/* MAIN HEADING */}
                        <motion.h1
                          variants={textContainer}
                          initial="hidden"
                          animate="show"
                          className="relative inline-block text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl"
                        >
                          {/* LEFT PLANE */}
                          <div className="absolute -left-16 -top-12 z-20 hidden sm:block md:-left-28 md:-top-20 lg:-left-36 lg:-top-24">
                            <motion.div
                              initial={{
                                opacity: 0,
                                x: -200,
                                y: -80,
                                scale: 0.5,
                                rotate: -15,
                              }}
                              animate={{
                                opacity: 1,
                                x: 0,
                                y: 0,
                                scale: 1,
                                rotate: 0,
                              }}
                              transition={{
                                duration: 1.5,
                                delay: 0.9,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            >
                              <motion.div
                                animate={{
                                  y: [0, -20, 0],
                                  rotate: [0, -5, 0],
                                }}
                                transition={{
                                  duration: 4,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                className="relative h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36"
                              >
                                <Image
                                  src={Left}
                                  alt="Travel decoration left"
                                  fill
                                  className="object-contain drop-shadow-2xl"
                                />
                              </motion.div>
                            </motion.div>
                          </div>
                          
                          {/* FIRST TEXT */}
                          <motion.span
                            variants={normalText}
                            className="inline-block"
                          >
                            {slide.firstText}
                          </motion.span>{" "}
                          
                          {/* HIGHLIGHT TEXT */}
                          <motion.span
                            variants={highlightTextAnim}
                            className="inline-block bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400 bg-clip-text text-transparent"
                          >
                            {slide.highlightText}
                          </motion.span>

                          {/* RIGHT PLANE */}
                          <div className="absolute -right-16 -top-12 z-20 hidden sm:block md:-right-28 md:-top-20 lg:-right-36 lg:-top-24">
                            <motion.div
                              initial={{
                                opacity: 0,
                                x: 200,
                                y: -80,
                                scale: 0.5,
                                rotate: 15,
                              }}
                              animate={{
                                opacity: 1,
                                x: 0,
                                y: 0,
                                scale: 1,
                                rotate: 0,
                              }}
                              transition={{
                                duration: 1.5,
                                delay: 1.1,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            >
                              <motion.div
                                animate={{
                                  y: [0, -22, 0],
                                  rotate: [0, 5, 0],
                                }}
                                transition={{
                                  duration: 4.2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                className="relative h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36"
                              >
                                <Image
                                  src={Right}
                                  alt="Travel decoration right"
                                  fill
                                  className="object-contain drop-shadow-2xl"
                                />
                              </motion.div>
                            </motion.div>
                          </div>
                          
                          <br />
                          
                          {/* SECOND TEXT */}
                          <motion.span
                            variants={secondLine}
                            className="inline-block text-white"
                          >
                            {slide.secondText}
                          </motion.span>
                        </motion.h1>

                        {/* DESCRIPTION */}
                        <motion.p
                          initial={{ opacity: 0, y: 25 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.75,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-slate-200 sm:text-sm md:text-base"
                        >
                          {slide.description}
                        </motion.p>

                        {/* BUTTONS */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.95,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="mt-6 flex flex-wrap justify-center gap-3"
                        >
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                          >
                            <Link
                              href="/services"
                              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-amber-500/25 transition-all duration-300 hover:from-amber-400 hover:to-orange-400 sm:px-6 sm:py-3 sm:text-sm"
                            >
                              View Services
                            </Link>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                          >
                            <Link
                              href="/contact"
                              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white shadow-md backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/20 sm:px-6 sm:py-3 sm:text-sm"
                            >
                              Contact Us
                            </Link>
                          </motion.div>
                        </motion.div>

                        {/* TRUST BADGES */}
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 1.15 }}
                          className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-slate-200/80 sm:text-xs"
                        >
                          <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/50" />
                            100% Trusted
                          </span>
                          <span className="hidden h-3 w-px bg-white/20 sm:block" />
                          <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-md shadow-sky-400/50" />
                            Expert Guidance
                          </span>
                          <span className="hidden h-3 w-px bg-white/20 sm:block" />
                          <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-md shadow-amber-400/50" />
                            24/7 Support
                          </span>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* SLIDE NUMBER */}
                <div className="absolute bottom-6 left-6 z-20 hidden font-mono text-[10px] tracking-[0.25em] text-white/50 sm:block md:left-8 lg:left-12">
                  0{index + 1}
                  <span className="mx-2 text-white/20">/</span>0{slides.length}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* SWIPER PAGINATION STYLES */}
      <style jsx global>{`
        .hero-swiper .swiper-pagination {
          bottom: 20px !important;
        }

        .hero-swiper .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.45);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .hero-swiper .swiper-pagination-bullet-active {
          width: 22px;
          border-radius: 999px;
          background: #f59e0b;
        }
      `}</style>
    </section>
  );
};

export default HeroBanner; 