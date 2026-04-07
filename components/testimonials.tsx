"use client"

import { Star, Quote } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function Testimonials() {
  const { t } = useI18n()
  const test = t.testimonials

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="font-body text-xs font-semibold tracking-widest uppercase text-terracotta-600 bg-terracotta-50 border border-terracotta-200 px-4 py-1.5 rounded-full">
            {test.badge}
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-wood-800 text-balance max-w-2xl">
            {test.title}
          </h2>
          <p className="font-body text-base text-wood-500 max-w-xl leading-relaxed">
            {test.subtitle}
          </p>
        </div>

        {/* 4-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {test.reviews.map((review, index) => (
            <article
              key={index}
              className="relative flex flex-col gap-4 p-6 rounded-2xl border border-cream-200 bg-cream-50 hover:shadow-md transition-shadow duration-300"
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-5 right-5 w-8 h-8 text-terracotta-200"
                strokeWidth={1.5}
                aria-hidden="true"
              />

              {/* 5 gold stars */}
              <div className="flex gap-0.5" aria-label="5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                    strokeWidth={0}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="font-body text-sm text-wood-700 leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="border-t border-cream-200" />

              {/* Reviewer info */}
              <div className="flex flex-col gap-0.5">
                <span className="font-body text-sm font-bold text-wood-800">
                  {review.name}
                </span>
                <span className="font-body text-xs text-wood-400">
                  {review.country} &middot; {review.experience}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
