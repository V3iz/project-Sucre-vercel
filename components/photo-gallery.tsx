"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { X, ZoomIn } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const imageSrcs = [
  "/gallery/sucre-plaza.jpg",
  "/gallery/sucre-cathedral.jpg",
  "/gallery/sucre-food.jpg",
  "/gallery/sucre-landscape.jpg",
  "/gallery/sucre-textiles.jpg",
  "/gallery/sucre-streets.jpg",
]

type SelectedImage = {
  src: string
  alt: string
  caption: string
}

export function PhotoGallery() {
  const { t } = useI18n()
  const g = t.gallery
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null)

  const openLightbox = useCallback((index: number) => {
    setSelectedImage({
      src: imageSrcs[index],
      alt: g.images[index].alt,
      caption: g.images[index].caption,
    })
  }, [g.images])

  const closeLightbox = useCallback(() => {
    setSelectedImage(null)
  }, [])

  // Close on Escape key
  useEffect(() => {
    if (!selectedImage) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [selectedImage, closeLightbox])

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
          <button
            onClick={() => openLightbox(0)}
            className="relative col-span-1 row-span-2 rounded-xl overflow-hidden group aspect-[3/4] md:aspect-auto md:h-[420px] shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-zoom-in text-left"
            aria-label={g.images[0].caption}
          >
            <Image
              src={imageSrcs[0]}
              alt={g.images[0].alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
              <span className="font-body text-white text-sm font-semibold">{g.images[0].caption}</span>
              <ZoomIn className="w-5 h-5 text-white/80 shrink-0" aria-hidden="true" />
            </div>
          </button>

          <button
            onClick={() => openLightbox(1)}
            className="relative rounded-xl overflow-hidden group aspect-[4/3] shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-zoom-in text-left"
            aria-label={g.images[1].caption}
          >
            <Image
              src={imageSrcs[1]}
              alt={g.images[1].alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
              <span className="font-body text-white text-sm font-semibold">{g.images[1].caption}</span>
              <ZoomIn className="w-5 h-5 text-white/80 shrink-0" aria-hidden="true" />
            </div>
          </button>

          <button
            onClick={() => openLightbox(2)}
            className="relative rounded-xl overflow-hidden group aspect-[4/3] shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-zoom-in text-left"
            aria-label={g.images[2].caption}
          >
            <Image
              src={imageSrcs[2]}
              alt={g.images[2].alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
              <span className="font-body text-white text-sm font-semibold">{g.images[2].caption}</span>
              <ZoomIn className="w-5 h-5 text-white/80 shrink-0" aria-hidden="true" />
            </div>
          </button>

          {/* Row 2: (first col spans) | wide landscape | portrait */}
          <button
            onClick={() => openLightbox(3)}
            className="relative rounded-xl overflow-hidden group aspect-[4/3] shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-zoom-in text-left"
            aria-label={g.images[3].caption}
          >
            <Image
              src={imageSrcs[3]}
              alt={g.images[3].alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
              <span className="font-body text-white text-sm font-semibold">{g.images[3].caption}</span>
              <ZoomIn className="w-5 h-5 text-white/80 shrink-0" aria-hidden="true" />
            </div>
          </button>

          <button
            onClick={() => openLightbox(4)}
            className="relative rounded-xl overflow-hidden group aspect-[4/3] shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-zoom-in text-left"
            aria-label={g.images[4].caption}
          >
            <Image
              src={imageSrcs[4]}
              alt={g.images[4].alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
              <span className="font-body text-white text-sm font-semibold">{g.images[4].caption}</span>
              <ZoomIn className="w-5 h-5 text-white/80 shrink-0" aria-hidden="true" />
            </div>
          </button>

          <button
            onClick={() => openLightbox(5)}
            className="relative rounded-xl overflow-hidden group aspect-[4/3] shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-zoom-in text-left"
            aria-label={g.images[5].caption}
          >
            <Image
              src={imageSrcs[5]}
              alt={g.images[5].alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
              <span className="font-body text-white text-sm font-semibold">{g.images[5].caption}</span>
              <ZoomIn className="w-5 h-5 text-white/80 shrink-0" aria-hidden="true" />
            </div>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.caption}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-colors duration-200"
            aria-label="Cerrar imagen"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Image container — stop propagation so clicking image doesn't close */}
          <div
            className="relative w-full max-w-5xl max-h-[85vh] rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1400}
              height={900}
              className="object-contain w-full h-full max-h-[85vh]"
              priority
            />
            {/* Caption bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
              <p className="font-body text-white text-base font-semibold">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
