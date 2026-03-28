import { WorkProcess } from "@/components/global";
import { MaxWidthWrapper, SectionWrapper } from '@/components/layout';
import { SectionHeader } from '@/components/shared'

export default function WorkStepsSection() {
  return (
    <SectionWrapper
      variant="light"
      id="work"
      fullHeight
      className="flex flex-col"
    >
      <MaxWidthWrapper 
        className="flex flex-col items-center gap-6 pt-36 md:pt-44"
      >
        <SectionHeader
          eyebrow="Here are the Steps"
          heading="How do We Work ?"
          accentWord="Work"
          description="We are a digital agency that specializes in web design, SEO, social media management. Our experienced team works closely with clients to deliver customized solutions that meet their specific needs"
          align = 'center'
        />
        <WorkProcess />
      </MaxWidthWrapper>
    </SectionWrapper>
  )
}