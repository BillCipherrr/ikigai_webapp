"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

const elements = [
  {
    title: "你所愛的事",
    description: "讓你感到熱情、充滿活力，做起來完全不會累的事。",
    color: "bg-pink-100",
  },
  {
    title: "你擅長的事",
    description: "你做起來很輕鬆，但別人可能覺得很困難的事。",
    color: "bg-purple-100",
  },
  {
    title: "世界需要的事",
    description: "你希望這個世界的哪個部分，可以因為你而變得更好？",
    color: "bg-green-100",
  },
  {
    title: "能賺錢的事",
    description: "別人會付錢請你做，能為你帶來收入以支持生活的事。",
    color: "bg-yellow-100",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function IntroductionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold">什麼是 Ikigai？</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Ikigai 是日文「生き甲斐」的發音，意思是「生存的價值」，也就是「讓你每天早上起床的理由」。它由以下四個核心元素交織而成：
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {elements.map((element) => (
          <motion.div
            key={element.title}
            className={`p-6 rounded-lg shadow-md ${element.color}`}
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-2">{element.title}</h2>
            <p>{element.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center">
        <Link
          href="/journey"
          className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          我明白了，開始旅程
        </Link>
      </div>
    </main>
  );
}