"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import type { CTAContentProps } from "./types";

export default function CTAContent({
  badge,
  title,
  highlightedText,
  description,
}: CTAContentProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.8,
      }}
      className="max-w-3xl"
    >
      {/* Badge */}

      <div
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-white/20
          bg-white/10
          px-5
          py-2.5
          text-sm
          font-semibold
          uppercase
          tracking-[0.2em]
          text-white
          backdrop-blur-md
        "
      >
        <Sparkles
          size={16}
          className="text-[#3BAEA0]"
        />

        {badge}
      </div>

      {/* Heading */}

      <h2
        className="
          mt-8
          text-4xl
          font-bold
          leading-tight
          tracking-tight
          text-white

          md:text-5xl

          lg:text-6xl
        "
      >
        {title}

        <span
          className="
            mt-2
            block
            bg-gradient-to-r
            from-[#3BAEA0]
            via-cyan-300
            to-white
            bg-clip-text
            text-transparent
          "
        >
          {highlightedText}
        </span>
      </h2>

      {/* Description */}

      <p
        className="
          mt-8
          max-w-2xl
          text-lg
          leading-8
          text-slate-200

          lg:text-xl
        "
      >
        {description}
      </p>
    </motion.div>
  );
}