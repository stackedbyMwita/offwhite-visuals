"use client"

import { SectionWrapper } from "@/components/layout";
import { SectionHeader } from "@/components/shared";
import CustomButton from "@/components/ui/CustomButton";
import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <SectionWrapper
      variant="dark"
      id="services"
      className="flex flex-col"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 60 }}
        className="flex flex-col pt-24 m-0 px-6 md:px-16 lg:px-24 xl:px-32 py-16 md:py-20"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-4">
          <SectionHeader
            eyebrow=""
            heading="Lets Make Something Together"
            accentWord="Together"
            description=''
            align="left"
            headingClassName="max-w-2xl"
          />    
          <CustomButton
            label="Let's talk"
            href="/contact"
            className="w-fit"
          />
        </div>
      </motion.div>
    </SectionWrapper>
  )
}