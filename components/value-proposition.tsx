"use client"

import { Building2, Footprints, Sun, Wallet } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const iconComponents = [Building2, Footprints, Sun, Wallet]

export function ValueProposition() {
  const { t } = useI18n()
  const vp = t.valueProposition

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Section Title — Playfair Display via font-sans (mapped in globals) */}
        <h2 className="font-sans text-3xl md:text-4xl font-bold text-center text-wood-800 mb-14 text-balance max-w-3xl mx-auto leading-snug">
          {vp.title}
        </h2>

        {/* 4-column responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vp.reasons.map((reason, index) => {
            const Icon = iconComponents[index]
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-3 p-7 rounded-2xl border border-cream-200 bg-white hover:shadow-md transition-shadow duration-300"
              >
                {/* Icon circle — terracotta background + terracotta icon */}
                <div className="w-14 h-14 rounded-full bg-terracotta-100 flex items-center justify-center shrink-0">
                  <Icon
                    className="w-6 h-6 text-terracotta-600"
                    strokeWidth={1.75}
                  />
                </div>

                {/* Title — Inter via font-body utility */}
                <h3 className="font-body text-base font-bold text-wood-800 leading-snug">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-wood-500 leading-relaxed">
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
