"use client"

import { Building2, Footprints, Sun, Wallet } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const GOLD = "#C5A028"

const iconComponents = [Building2, Footprints, Sun, Wallet]

export function ValueProposition() {
  const { t } = useI18n()
  const vp = t.valueProposition

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2
          className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold text-center text-wood-800 mb-14 text-balance max-w-3xl mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {vp.title}
          </span>
        </h2>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {vp.reasons.map((reason, index) => {
            const Icon = iconComponents[index]
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-card border border-cream-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${GOLD}18` }}
                >
                  <Icon
                    className="w-7 h-7"
                    style={{ color: GOLD }}
                    strokeWidth={1.75}
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-base font-bold text-wood-800 leading-snug"
                  style={{ fontFamily: "var(--font-body), 'Inter', sans-serif" }}
                >
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-wood-500 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
