'use client'

import Marquee from 'react-fast-marquee'
import { skillsRowOne, skillsRowTwo, ISkill } from '@/data'
import { Zap } from 'lucide-react'
import { useMemo } from 'react'

// ── Vibrant Color Palette (OKLCH-based for consistency) ─────────────────
const vibrantColors = [
  'oklch(0.82 0.18 196)',   // Bright Cyan
  'oklch(0.78 0.22 250)',   // Electric Blue
  'oklch(0.85 0.17 320)',   // Vibrant Pink
  'oklch(0.88 0.15 80)',    // Lime Green
  'oklch(0.80 0.20 35)',    // Orange
  'oklch(0.79 0.19 270)',   // Purple
  'oklch(0.84 0.16 140)',   // Teal
  'oklch(0.87 0.14 60)',    // Yellow-Green
  'oklch(0.81 0.21 310)',   // Magenta
  'oklch(0.83 0.18 210)',   // Sky Blue
]

// Assign a unique color to each skill (stable across re-renders)
const skillColorMap = new Map<string, string>()

skillsRowOne.forEach((skill, index) => {
  if (!skillColorMap.has(skill.name)) {
    skillColorMap.set(skill.name, vibrantColors[index % vibrantColors.length])
  }
})

skillsRowTwo.forEach((skill, index) => {
  if (!skillColorMap.has(skill.name)) {
    skillColorMap.set(skill.name, vibrantColors[(index + 5) % vibrantColors.length])
  }
})

// ── Single skill pill with unique color ────────────────────────────────
function SkillPill({ skill }: { skill: ISkill }) {
  const color = skillColorMap.get(skill.name) || 'oklch(0.78 0.14 196)'

  return (
    <div
      className="inline-flex items-center gap-3 mx-2 px-6 py-3 rounded-2xl shrink-0 select-none group"
      style={{
        background: `linear-gradient(135deg, ${color}12, transparent)`,
        boxShadow: `0 4px 20px -4px ${color}30`,
      }}
    >
      {/* Icon with unique color glow */}
      <span
        className="transition-transform group-hover:scale-110"
        style={{
          color: color,
          filter: `drop-shadow(0 0 8px ${color})`,
        }}
      >
        <Zap size={19} strokeWidth={2.5} />
      </span>

      {/* Skill name */}
      <span
        className="text-base font-medium tracking-wide whitespace-nowrap"
        style={{
          color: color,
          textShadow: `0 1px 3px ${color}40`,
        }}
      >
        {skill.name}
      </span>
    </div>
  )
}

// ── Single marquee row ─────────────────────────────────────────────────
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
    <div className="relative overflow-hidden">
      {/* Subtle background glow strip */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%,
            oklch(0.78 0.14 196 / 0.08) 30%,
            oklch(0.78 0.14 196 / 0.05) 70%,
            transparent 100%
          )`,
        }}
      />

      <Marquee
        direction={direction}
        speed={speed}
        delay={0}
        loop={0}
        pauseOnHover
        className="relative z-10 py-3"
      >
        {skills.map((skill, i) => (
          <SkillPill key={`${skill.name}-${i}`} skill={skill} />
        ))}
        
        {/* Duplicate for seamless loop */}
        {skills.map((skill, i) => (
          <SkillPill key={`dup-${skill.name}-${i}`} skill={skill} />
        ))}
      </Marquee>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────
export default function SkillsMarquee() {
  return (
    <div className="w-full overflow-hidden py-12 px-4 bg-black/30">
      <div className="flex flex-col gap-2">
        <MarqueeRow 
          skills={skillsRowOne} 
          direction="left" 
          speed={32} 
        />
        
        <MarqueeRow 
          skills={skillsRowTwo} 
          direction="right" 
          speed={38} 
        />
      </div>
    </div>
  )
}