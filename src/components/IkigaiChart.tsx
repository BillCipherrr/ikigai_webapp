"use client";

import { useJourney } from "@/utils/JourneyContext";
import { motion } from "framer-motion";
import { useMemo } from "react";

const Circle = ({ cx, cy, label, color, textColor = "text-gray-800" }: any) => (
  <>
    <motion.circle
      cx={cx}
      cy={cy}
      r="100"
      className={`${color} opacity-50`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.5 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    />
    <motion.text
      x={cx}
      y={cy - 110}
      textAnchor="middle"
      className={`font-bold text-lg ${textColor}`}
      initial={{ y: cy - 130, opacity: 0 }}
      animate={{ y: cy - 110, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      {label}
    </motion.text>
  </>
);

const IntersectionLabel = ({ x, y, label, items }: any) => (
  <motion.g
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 1.5 }}
  >
    <text x={x} y={y} textAnchor="middle" className="font-bold text-sm fill-current text-gray-700">
      {label}
    </text>
    {items.map((item: string, index: number) => (
      <text key={item} x={x} y={y + 15 * (index + 1)} textAnchor="middle" className="text-xs fill-current text-gray-600">
        {item}
      </text>
    ))}
  </motion.g>
);

export const IkigaiChart = () => {
  const { data } = useJourney();

  const intersections = useMemo(() => {
    const { love, goodAt, worldNeeds, paidFor } = data;
    const passion = love.filter(v => goodAt.includes(v) && !worldNeeds.includes(v) && !paidFor.includes(v));
    const mission = love.filter(v => worldNeeds.includes(v) && !goodAt.includes(v) && !paidFor.includes(v));
    const profession = goodAt.filter(v => paidFor.includes(v) && !love.includes(v) && !worldNeeds.includes(v));
    const vocation = worldNeeds.filter(v => paidFor.includes(v) && !love.includes(v) && !goodAt.includes(v));
    
    const ikigai = love.filter(v => goodAt.includes(v) && worldNeeds.includes(v) && paidFor.includes(v));

    return { passion, mission, profession, vocation, ikigai };
  }, [data]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <svg viewBox="0 0 400 400">
        <Circle cx="140" cy="140" label="你所愛的事" color="fill-pink-300" />
        <Circle cx="260" cy="140" label="你擅長的事" color="fill-purple-300" />
        <Circle cx="140" cy="260" label="世界需要的事" color="fill-green-300" />
        <Circle cx="260" cy="260" label="能賺錢的事" color="fill-yellow-300" />

        <IntersectionLabel x="200" y="100" label="熱情" items={intersections.passion} />
        <IntersectionLabel x="100" y="200" label="使命" items={intersections.mission} />
        <IntersectionLabel x="300" y="200" label="專業" items={intersections.profession} />
        <IntersectionLabel x="200" y="300" label="職志" items={intersections.vocation} />

        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <text x="200" y="200" textAnchor="middle" className="font-extrabold text-xl fill-current text-blue-600">
            IKIGAI
          </text>
          {intersections.ikigai.map((item, index) => (
            <text key={item} x="200" y={220 + 20 * index} textAnchor="middle" className="text-base font-bold fill-current text-blue-500">
              {item}
            </text>
          ))}
        </motion.g>
      </svg>
    </div>
  );
};