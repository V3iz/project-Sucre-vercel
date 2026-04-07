"use client"

import { Star, Quote } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function Testimonials() {
  const { t } = useI18n()
  const test = t.testimonials

  return (
    <section className="py-24 bg-light-gray">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="font-body text-xs font-semibold tracking-widest uppercase text-gold-700 bg-gold-50 border border-gold-200 px-4 py-1.5 rounded-full">
            {test.badge}
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-wood-800 text-balance max-w-2xl">
            {test.title}
          </h2>
          <p className="font-body text-base text-wood-600 max-w-xl leading-relaxed">
            {test.subtitle}
          </p>
        </div>

        {/* 4-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {test.reviews.map((review, index) => (
            <article
              key={index}
              className="relative flex flex-col gap-4 p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-6 right-6 w-8 h-8 text-gold-200"
                strokeWidth={1.5}
                aria-hidden="true"
              />

              {/* 5 gold stars */}
              <div className="flex gap-0.5" aria-label="5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-gold-500 text-gold-500"
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
              <div className="border-t border-cream-300" />

              {/* Reviewer info */}
              <div className="flex flex-col gap-0.5">
                <span className="font-body text-sm font-bold text-wood-800">
                  {review.name}
                </span>
                <span className="font-body text-xs text-wood-500">
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
