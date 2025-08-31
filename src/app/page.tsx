"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 overflow-hidden">
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold">
          Ikigai
        </motion.h1>
        <motion.p variants={itemVariants} className="mt-4 text-xl md:text-2xl text-gray-600">
          找到你每天早上起床的理由
        </motion.p>
        <motion.div variants={itemVariants} className="mt-12">
          <Link
            href="/introduction"
            className="px-6 py-3 md:px-8 md:py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
          >
            開始探索
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
