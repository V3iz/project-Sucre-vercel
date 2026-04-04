import { Navigation } from "@/components/navigation"
import { AlojamientoClient } from "./alojamiento-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Alojamiento en Sucre, Bolivia — Hoteles y Hospedajes",
  description:
    "Hoteles boutique coloniales, estándares y hostales en el corazón de Sucre. Selección curada con las mejores opciones de alojamiento en la Ciudad Blanca de Bolivia.",
}

export default function AlojamientoPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16 lg:pt-20 min-h-screen bg-background">

        {/* ── Hero banner ── */}
        <section className="relative bg-foreground text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
              <a href="/" className="hover:text-white transition-colors">Inicio</a>
              <span>/</span>
              <span className="text-white">Alojamiento</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white text-balance max-w-2xl leading-tight">
                  Dónde hospedarte en Sucre
                </h1>
                <p className="mt-4 text-white/70 text-base lg:text-lg max-w-xl leading-relaxed">
                  Desde palacios coloniales restaurados hasta acogedores hostales en el
                  corazón del patrimonio. Todos los alojamientos seleccionados por
                  ubicación, autenticidad y calidad de servicio.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:shrink-0">
                {[
                  { label: "Hoteles verificados" },
                  { label: "Todos en centro histórico" },
                  { label: "Opciones sostenibles" },
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
                { value: "5", label: "Alojamientos seleccionados" },
                { value: "4.76", label: "Valoración media" },
                { value: "3,060+", label: "Reseñas verificadas" },
                { value: "100%", label: "Ubicados en el centro" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-serif font-bold text-primary">{s.value}</p>
                  <p className="text-xs text-white/60 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AlojamientoClient />
      </main>
    </>
  )
}
