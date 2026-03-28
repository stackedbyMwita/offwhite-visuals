import { SectionSeparator } from '@/components/global'
import {
  AboutUsSection,
  CTASection,
  FAQSection,
  HeroSection,
  PricingSection,
  ProjectsSection,
  ServicesSection,
  TestimonialSection,
  WorkStepsSection 
} from '@/sections'

export default function MainApp() {
  return (
    <>
      <HeroSection />
      <AboutUsSection />
      <ServicesSection />
      <WorkStepsSection />
      <SectionSeparator variant="zigzag" />
      <ProjectsSection />
      <PricingSection />
      <TestimonialSection />
      <SectionSeparator variant="zigzag" />
      <FAQSection />
      <CTASection />
    </>
  )
}