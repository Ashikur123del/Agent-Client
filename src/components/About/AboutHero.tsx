"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaEarthAmericas, FaRegStar } from "react-icons/fa6";
import { TbPlaneTilt } from "react-icons/tb";

const AboutHero = () => {
  return (
    <section className="relative w-full h-[60vh] min-h-[520px] md:h-[70vh] overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=85"
          alt="About Organized Adventure"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-indigo-950/65 to-slate-950/45" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/70 to-transparent" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 right-0 z-0 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 left-0 z-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl"
      />


      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="mx-auto max-w-5xl"
        >

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 25,
              },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-amber-400 shadow-lg backdrop-blur-md">
              About Us
            </span>
          </motion.div>

          <motion.h1
            variants={{
              hidden: {
                opacity: 0,
                y: 40,
              },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Your Trusted Travel Partner
            <br />

            <motion.span
              initial={{
                opacity: 0,
                x: 70,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400 bg-clip-text text-transparent"
            >
              Since 2018
            </motion.span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
              },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg md:text-xl"
          >
            We are dedicated to making your travel dreams a reality with
            professional, reliable, and personalized service.
          </motion.p>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
              },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4"
          >

            <motion.div
              whileHover={{
                y: -5,
                scale: 1.03,
              }}
              transition={{
                duration: 0.2,
              }}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur-md"
            >
              <FaEarthAmericas className="text-xl text-amber-400" />

              <span>30+ Destinations</span>
            </motion.div>

            <motion.div
              whileHover={{
                y: -5,
                scale: 1.03,
              }}
              transition={{
                duration: 0.2,
              }}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur-md"
            >
              <TbPlaneTilt className="text-2xl text-amber-400" />

              <span>50+ Airline Partners</span>
            </motion.div>

            <motion.div
              whileHover={{
                y: -5,
                scale: 1.03,
              }}
              transition={{
                duration: 0.2,
              }}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur-md"
            >
              <FaRegStar className="text-xl text-amber-400" />

              <span>98% Satisfaction Rate</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-16 bg-gradient-to-t from-indigo-950/50 to-transparent" />
    </section>
  );
};

export default AboutHero;