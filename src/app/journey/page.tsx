"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useJourney } from "@/utils/JourneyContext";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    key: "love",
    title: "你所愛的事",
    question: "有哪些事讓你感到熱情、充滿活力，做起來完全不會累？",
  },
  {
    key: "goodAt",
    title: "你擅長的事",
    question: "有哪些事你做起來很輕鬆，但別人可能覺得很困難？",
  },
  {
    key: "worldNeeds",
    title: "世界需要的事",
    question: "你希望這個世界的哪個部分，可以因為你而變得更好？",
  },
  {
    key: "paidFor",
    title: "能賺錢的事",
    question: "有哪些事，別人會付錢請你做？",
  },
];

export default function JourneyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const { data, updateData, isLoaded } = useJourney();
  const [currentInput, setCurrentInput] = useState("");

  useEffect(() => {
    if (isLoaded) {
      setCurrentInput(data[steps[currentStep].key as keyof typeof data].join("\n"));
    }
  }, [currentStep, isLoaded, data]);

  const handleNext = () => {
    const values = currentInput.split("\n").filter((line) => line.trim() !== "");
    updateData(steps[currentStep].key as keyof typeof data, values);

    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setCurrentInput(data[steps[nextStep].key as keyof typeof data].join("\n"));
    } else {
      router.push("/result");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setCurrentInput(data[steps[prevStep].key as keyof typeof data].join("\n"));
    }
  };

  const stepData = steps[currentStep];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          <div className="text-center mb-8">
            <p className="text-blue-600 font-semibold">
              步驟 {currentStep + 1} / {steps.length}
            </p>
            <h1 className="text-2xl md:text-4xl font-bold mt-2">{stepData.title}</h1>
            <p className="mt-4 text-base md:text-lg text-gray-600">{stepData.question}</p>
          </div>

          <textarea
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="每個想法寫一行..."
            disabled={!isLoaded}
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between w-full max-w-2xl mt-8">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          上一步
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700"
        >
          {currentStep === steps.length - 1 ? "完成並查看結果" : "下一步"}
        </button>
      </div>
    </main>
  );
}