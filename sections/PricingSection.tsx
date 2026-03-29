import { PriceCard } from "@/components/cards"
import { MaxWidthWrapper, SectionWrapper } from '@/components/layout'
import { SectionHeader } from '@/components/shared'
import { pricingPlans } from "@/data"

export default function PricingSection() {
  return (
    <SectionWrapper
      variant="dark"
      id="pricing"
      fullHeight
      className="flex flex-col"
    >
      <MaxWidthWrapper className="flex flex-col items-center gap-6 pt-24 md:pt-32 pb-24">
        <SectionHeader
          eyebrow="Pricing Plan"
          heading="Choose Your Package"
          accentWord="Package"
          description="Transparent pricing for every stage of your business. No hidden fees — just great work."
          align="center"
        />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {pricingPlans.map((plan, i) => (
            <PriceCard key={i} plan={plan} />
          ))}
        </div>
      </MaxWidthWrapper>
    </SectionWrapper>
  )
}