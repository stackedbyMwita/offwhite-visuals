import { SectionWrapper } from "@/components/layout";
import { SectionHeader } from "@/components/shared";
import CustomButton from "@/components/ui/CustomButton";

export default function CTASection() {
  return (
    <SectionWrapper
      variant="dark"
      id="services"
      className="flex flex-col"
    >
      <div className="flex flex-col pt-24 m-0 px-6 md:px-16 lg:px-24 xl:px-32 py-16 md:py-20">
        {/* ── Section header ─────────────────────────────── */}
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
          />
        </div>
      </div>
    </SectionWrapper>
  )
}