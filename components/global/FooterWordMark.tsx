import { siteConfig } from "@/data/site.config"
import { cn } from "@/lib/utils"

type WordMarkProps = {
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizes = {
  sm: "text-[clamp(48px,8vw,96px)]",
  md: "text-[clamp(64px,12vw,120px)]",
  lg: "text-[clamp(72px,14vw,140px)]",
}

export default function FooterWordMark({ size = "md", className }: WordMarkProps) {
  return (
    <div className={cn(
      "text-center overflow-hidden",
      className
    )}>
      <span
        className={cn(
          "font-black font-serif tracking-tighter select-none text-primary/5 bg-clip-text whitespace-nowrap",
          sizes[size]
        )}
        style={{ backgroundImage: "linear-gradient(to bottom, hsl(var(--foreground) / 0.08) 0%, transparent 100%)" }}
      >
        {siteConfig.name}
      </span>
    </div>
  )
}