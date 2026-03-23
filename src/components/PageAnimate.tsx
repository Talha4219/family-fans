"use client";

import { motion } from "framer-motion";
interface PageAnimateProps {
  children: React.ReactNode;
}

export default function PageAnimate({ children }: PageAnimateProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -20,
      }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        // Custom cubic-bezier for premium feel delay: 0.1
      }}
    >
      {" "}
      {children}
    </motion.div>
  );
}
