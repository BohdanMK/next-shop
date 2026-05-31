'use client'

import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

interface SliderControlsProps {
  current: number
  total: number
  onPrev: () => void
  onNext: () => void
  onDotClick: (index: number) => void
  className?: string
}

export function SliderControls({ current, total, onPrev, onNext, onDotClick, className }: SliderControlsProps) {
  const t = useTranslations('slider')

  return (
    <div className={cn("flex items-center justify-between mt-3", className)}>
      <div className="flex items-center gap-1">
        <button
          onClick={onPrev}
          aria-label={t('prevSlide')}
          className={cn(
            "p-1 rounded-full hover:bg-muted transition-colors cursor-pointer",
            current === 0 && "opacity-50 cursor-not-allowed"
          )}
        >
          <img src="icons/left-arrow.svg" alt="Arrow left" />
        </button>
        <button
          onClick={onNext}
          aria-label={t('nextSlide')}
          className={cn(
            "p-1 rounded-full hover:bg-muted transition-colors cursor-pointer",
            current === total - 1 && "opacity-50 cursor-not-allowed"
          )}
        >
          <img src="icons/right-arrow.svg" alt="Arrow right" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            aria-label={t('slide', { n: i + 1 })}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === current
                ? "w-4 h-4 bg-primary"
                : "w-4 h-4 bg-muted-foreground/40 hover:bg-muted-foreground/70 cursor-pointer"
            )}
          />
        ))}
      </div>
    </div>
  )
}
