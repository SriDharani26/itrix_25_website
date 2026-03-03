"use client";

import { motion } from "framer-motion";

type SkeletonLoaderProps = {
  className?: string;
};

export default function SkeletonLoader({ className }: SkeletonLoaderProps) {
  const classes = ["relative overflow-hidden rounded-md bg-[#171d2d]", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <motion.div
        className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-[#25324b] to-transparent"
        animate={{ x: ["-20%", "260%"] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

