"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  icon?: React.ReactNode;
  bgImage?: string;
}

const ServiceHero = ({
  title,
  subtitle,
  description,
  icon,
  bgImage,
}: ServiceHeroProps) => {
  const defaultImage =
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80";

  return (
    <section className="relative flex h-[50vh] w-full items-center overflow-hidden md:h-[60vh]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage || defaultImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-sky-950/70 via-indigo-950/60 to-blue-950/70" />

        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 via-transparent to-indigo-900/30" />

        <div className="absolute -right-20 -top-20 h-[350px] w-[350px] rounded-full bg-sky-400/20 blur-3xl" />

        <div className="absolute -bottom-32 -left-20 h-[400px] w-[400px] rounded-full bg-indigo-400/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-4 flex justify-center text-5xl text-amber-400"
            >
              {icon}
            </motion.div>
          )}

          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300 backdrop-blur-md">
            {subtitle}
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-sky-100 md:text-xl"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-indigo-950/50 to-transparent" />
    </section>
  );
};

export default ServiceHero;