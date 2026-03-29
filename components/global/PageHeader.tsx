import MaxWidthWrapper from '@/components/layout/MaxWidthWrapper'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionHeader from '@/components/shared/SectionHeader'
import InteractiveZap from './InteractiveZap'

interface PageHeaderProps {
  eyebrow: string
  heading: string
  accentWord?: string
  description?: string
  align?: 'left' | 'center'
  children?: React.ReactNode
}

export default function PageHeader({
  eyebrow,
  heading,
  accentWord,
  description,
  align = 'left',
  children,
}: PageHeaderProps) {
  return (
    <SectionWrapper
      variant="dark"
      suppressTexture
      className="relative flex flex-col pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden"
    >

      {/* Content */}
      <MaxWidthWrapper className="relative z-10 flex justify-between gap-8">
        <div className='flex flex-col'>
          <SectionHeader
          eyebrow={eyebrow}
          heading={heading}
          accentWord={accentWord}
          description={description}
          align={align}
          headingClassName="max-w-2xl"
          descriptionClassName="max-w-xl"
        />

        {children && (
          <div className="flex flex-wrap items-center gap-4">
            {children}
          </div>
        )}

        {/* Bottom accent line */}
        <div
          className="h-px w-full mt-12"
          style={{
            background: 'linear-gradient(90deg, oklch(0.78 0.14 196 / 0.4) 0%, transparent 60%)',
          }}
        />
        </div>

        {/* Interactive Illustration Side */}
        <div className='hidden lg:block flex-1 relative'>
          <InteractiveZap />
        </div>
      </MaxWidthWrapper>
    </SectionWrapper>
  )
}