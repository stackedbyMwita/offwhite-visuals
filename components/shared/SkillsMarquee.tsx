'use client'

import Marquee from 'react-fast-marquee'
import { skillsRowOne, skillsRowTwo, ISkill } from '@/data'
import { Zap } from 'lucide-react'

// ── Category dot color ───────────────────────────────────────
const categoryDot: Record<ISkill['category'], string> = {
  design:      'oklch(0.78 0.14 196)',
  development: 'oklch(0.97 0.005 196 / 0.9)',
  tools:       'oklch(0.78 0.14 196 / 0.5)',
  strategy:    'oklch(0.97 0.005 196 / 0.4)',
}

// ── Gradient colors for primary theme ────────────────────────
const gradientPrimary = {
  from: 'oklch(0.65 0.19 256)',  // Deep blue-purple
  to: 'oklch(0.75 0.22 196)',     // Vibrant cyan
}

// ── Single skill pill ────────────────────────────────────────
function SkillPill({ skill }: { skill: ISkill }) {
  return (
    <div
      className="inline-flex items-center gap-2.5 mx-1.5 px-5 py-2.5 rounded-full  shrink-0 select-none"
      style={{
        borderColor: 'oklch(0.97 0.005 196 / 0.2)',
        background: `linear-gradient(135deg, 
          ${gradientPrimary.from}08, 
          ${gradientPrimary.to}08
        )`,
        backdropFilter: 'blur(4px)'
      }}
    >
      <span
        className=""
        style={{ color: categoryDot[skill.category] }}
      >
        <Zap size={18}/>
      </span>
      <span
        className="text-sm font-medium tracking-wide whitespace-nowrap"
        style={{ color: 'oklch(0.97 0.005 196 / 0.85)' }}
      >
        {skill.name}
      </span>
    </div>
  )
}

// ── Single marquee row (no hover effects) ────────────────────
function MarqueeRow({
  skills,
  direction,
  speed = 35,
}: {
  skills: ISkill[]
  direction: 'left' | 'right'
  speed?: number
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: `linear-gradient(90deg, 
          transparent 0%,
          ${gradientPrimary.from}06 20%,
          ${gradientPrimary.to}06 80%,
          transparent 100%
        )`
      }}
    >
      <Marquee
        direction={direction}
        speed={speed}
        delay={0}
        loop={0}
        pauseOnHover
        className="relative z-10"
      >
        {skills.map((skill, i) => (
          <SkillPill key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </Marquee>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────
export default function SkillsMarquee() {
  return (
    <div className="flex flex-col gap-8 w-full overflow-hidden py-8 px-4">
      <MarqueeRow skills={skillsRowOne}  direction="left" speed={35} />
      <MarqueeRow skills={skillsRowTwo} direction="right" speed={42} />
      
    </div>
  )
}