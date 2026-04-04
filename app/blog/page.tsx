import { BlogClient } from "./blog-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog de Viajes — Sucre, Bolivia | Guías, Atractivos y Consejos",
  description:
    "Artículos sobre turismo en Sucre: guías para el viajero, atractivos turísticos, seguridad, gastronomía, cultura y naturaleza. Todo lo que necesitas saber antes de viajar.",
}

export default function BlogPage() {
  return (
    <main className="pt-16 lg:pt-20 min-h-screen bg-background">

        {/* Hero banner */}
        <section className="relative bg-foreground text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
              <a href="/" className="hover:text-white transition-colors">Inicio</a>
              <span>/</span>
              <span className="text-white">Blog</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white text-balance max-w-2xl leading-tight">
                  Blog de viajes a Sucre
                </h1>
                <p className="mt-4 text-white/70 text-base lg:text-lg max-w-xl leading-relaxed">
                  Guías prácticas, historias de atractivos, consejos de seguridad y todo lo que
                  necesitas para aprovechar al máximo tu visita a la Ciudad Blanca.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:shrink-0">
                {["Información actualizada", "Autores locales", "Comentarios abiertos"].map(
                  (label) => (
                    <div
                      key={label}
                      className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-xs text-white/80"
                    >
                      {label}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-8 mt-8">
              {[
                { value: "8", label: "Artículos publicados" },
                { value: "6", label: "Categorías temáticas" },
                { value: "4.7", label: "Valoración media" },
                { value: "100%", label: "Información local verificada" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-serif font-bold text-primary">{s.value}</p>
                  <p className="text-xs text-white/60 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BlogClient />
      </main>
  )
}
