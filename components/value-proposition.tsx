"use client"

import { Building2, Footprints, Sun, Wallet } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const iconComponents = [Building2, Footprints, Sun, Wallet]

export function ValueProposition() {
  const { t } = useI18n()
  const vp = t.valueProposition

  return (
    <section className="py-24 bg-light-gray">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Section Title — Playfair Display via font-sans (mapped in globals) */}
        <h2 className="font-sans text-3xl md:text-4xl font-bold text-center text-wood-800 mb-16 text-balance max-w-3xl mx-auto leading-snug">
          {vp.title}
        </h2>

        {/* 4-column responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {vp.reasons.map((reason, index) => {
            const Icon = iconComponents[index]
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-4 p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Icon circle — gold background + gold icon */}
                <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                  <Icon
                    className="w-8 h-8 text-gold-600"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title — Inter via font-body utility */}
                <h3 className="font-body text-lg font-bold text-wood-800 leading-snug">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="font-body text-sm text-wood-600 leading-relaxed">
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
