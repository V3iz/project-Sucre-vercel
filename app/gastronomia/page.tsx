import { GastronomiaClient } from "./gastronomia-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gastronomía en Sucre, Bolivia — Restaurantes y Platos Típicos",
  description:
    "Descubre los mejores restaurantes de Sucre y la gastronomía típica de Chuquisaca: salteñas, fritanga, cazuela de maní, singani y más. Guía curada para viajeros.",
}

export default function GastronomiaPage() {
  return (
    <main className="pt-16 lg:pt-20 min-h-screen bg-background">

        {/* ── Hero banner ── */}
        <section className="relative bg-foreground text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
              <a href="/" className="hover:text-white transition-colors">Inicio</a>
              <span>/</span>
              <span className="text-white">Gastronomía</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white text-balance max-w-2xl leading-tight">
                  Sabores auténticos de Chuquisaca
                </h1>
                <p className="mt-4 text-white/70 text-base lg:text-lg max-w-xl leading-relaxed">
                  Sucre es el epicentro gastronómico de Bolivia. El ají, el maní, la chicha
                  y el singani son los protagonistas de una cocina con siglos de historia y
                  sabores únicos en el mundo.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:shrink-0">
                {[
                  { label: "Cocina patrimonial" },
                  { label: "Ingredientes locales" },
                  { label: "Selección curada" },
                ].map(({ label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-xs text-white/80"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-8 mt-8">
              {[
                { value: "6+", label: "Restaurantes curados" },
                { value: "4.72", label: "Valoración media" },
                { value: "5,000+", label: "Reseñas verificadas" },
                { value: "1er", label: "Productor de ají en Bolivia" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-serif font-bold text-primary">{s.value}</p>
                  <p className="text-xs text-white/60 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <GastronomiaClient />
      </main>
  )
}
