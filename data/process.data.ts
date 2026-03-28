import { ClipboardList, Lightbulb, Rocket, Zap } from 'lucide-react'
import { IProcessStep } from '@/types'

export const processSteps: IProcessStep[] = [
  {
    step: 1,
    title: 'Briefing',
    description:
      'We start by listening. A deep discovery session to understand your goals, audience, constraints, and definition of success.',
    icon: ClipboardList,
  },
  {
    step: 2,
    title: 'Strategy',
    description:
      'We translate insights into a clear plan — sitemap, user flows, technical architecture, and a realistic timeline.',
    icon: Lightbulb,
  },
  {
    step: 3,
    title: 'Execution',
    description:
      'We build in focused sprints, sharing progress regularly. You are never left wondering what is happening.',
    icon: Zap,
  },
  {
    step: 4,
    title: 'Launch',
    description:
      'We QA thoroughly, deploy carefully, and stay close post-launch to handle any issues and measure early performance.',
    icon: Rocket,
  },
]