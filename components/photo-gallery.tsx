"use client"

import Image from "next/image"
import { useI18n } from "@/lib/i18n"

const imageSrcs = [
  "/gallery/sucre-plaza.jpg",
  "/gallery/sucre-cathedral.jpg",
  "/gallery/sucre-food.jpg",
  "/gallery/sucre-landscape.jpg",
  "/gallery/sucre-textiles.jpg",
  "/gallery/sucre-streets.jpg",
]

export function PhotoGallery() {
  const { t } = useI18n()
  const g = t.gallery

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-16">
          <span className="font-body text-xs font-semibold tracking-widest uppercase text-gold-700 bg-gold-50 border border-gold-200 px-4 py-1.5 rounded-full">
            {g.badge}
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-wood-800 text-balance max-w-2xl">
            {g.title}
          </h2>
          <p className="font-body text-base text-wood-600 max-w-xl leading-relaxed">
            {g.subtitle}
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {/* Row 1: large | tall | normal */}
          <div className="relative col-span-1 row-span-2 rounded-xl overflow-hidden group aspect-[3/4] md:aspect-auto md:h-[420px] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src={imageSrcs[0]}
              alt={g.images[0].alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="font-body text-white text-sm font-semibold">{g.images[0].caption}</span>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden group aspect-[4/3] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src={imageSrcs[1]}
              alt={g.images[1].alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="font-body text-white text-sm font-semibold">{g.images[1].caption}</span>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden group aspect-[4/3] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src={imageSrcs[2]}
              alt={g.images[2].alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="font-body text-white text-sm font-semibold">{g.images[2].caption}</span>
            </div>
          </div>

          {/* Row 2: (first col spans) | wide landscape | portrait */}
          <div className="relative rounded-xl overflow-hidden group aspect-[4/3] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src={imageSrcs[3]}
              alt={g.images[3].alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="font-body text-white text-sm font-semibold">{g.images[3].caption}</span>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden group aspect-[4/3] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src={imageSrcs[4]}
              alt={g.images[4].alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="font-body text-white text-sm font-semibold">{g.images[4].caption}</span>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden group aspect-[4/3] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src={imageSrcs[5]}
              alt={g.images[5].alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="font-body text-white text-sm font-semibold">{g.images[5].caption}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
