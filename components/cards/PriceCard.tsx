'use client'

import { IPricingPlan } from "@/types";
import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import CustomButton from "../ui/CustomButton";

interface PriceCardProps {
  plan: IPricingPlan;
}

export default function PriceCard({ plan }: PriceCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className={`relative flex flex-col p-8 rounded-fluid border-2 transition-all duration-500 group overflow-hidden ${
        plan.highlighted
          ? "border-primary shadow-[0_0_60px_rgba(74,213,203,0.15)]"
          : "border-border/10 hover:border-primary/10"
      }`}
      style={{
        background: plan.highlighted
          ? 'radial-gradient(circle at top right, oklch(0.45 0.12 185 / 0.9) 0%, oklch(0.25 0.05 185) 35%, oklch(0.18 0.03 185) 100%)'
          : 'radial-gradient(circle at top right, oklch(0.32 0.06 185 / 0.7) 0%, oklch(0.20 0.02 185) 45%, oklch(0.14 0.02 185) 100%)',
      }}
    >
      {/* Plan Header */}
      <div className="mb-8 z-10">
        <h3 className="text-xl font-bold mb-3 ">{plan.name}</h3>
        <div className="flex items-baseline gap-1.5">
          <span className="text-4xl text-primary tracking-tighter">${plan.price}</span>
          <span className="text-muted-foreground text-sm font-medium tracking-wide">/ {plan.period}</span>
        </div>
        <p className="mt-5 text-sm text-muted-foreground leading-relaxed min-h-12">
          {plan.description}
        </p>
      </div>

      <hr className="border-border/40 mb-8 z-10" />

      {/* Features List */}
      <ul className="flex-1 space-y-4 mb-10 z-10">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3.5">
            {/* Circular Mint Check Icon */}
            <div className={`mt-1 rounded-full p-1 transition-colors ${
              plan.highlighted ? "bg-primary" : "bg-primary/20"
            }`}>
              <CheckIcon 
                size={12} 
                className={plan.highlighted ? "text-primary-foreground" : "text-primary"} 
                strokeWidth={3} 
              />
            </div>
            <span className="text-sm ">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <div className="flex flex-row items-center w-full m-auto">
        <CustomButton
          label={plan.cta}
          href="/contact"
          fullWidth
          variant={plan.highlighted ? "primary" : "secondary" }
        />
      </div>

      {/* Optional Gradient Overlay for texture */}
      <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-50 z-0" />
    </motion.div>
  );
}