import { ContactoClient } from "./contacto-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto — Visita Sucre Bolivia",
  description:
    "Ponte en contacto con el equipo de Visita Sucre. Consultas sobre tours, alojamiento, gastronomia y planificacion de tu viaje a la ciudad patrimonial de Bolivia.",
}

export default function ContactoPage() {
  return (
    <main className="pt-16 lg:pt-20 min-h-screen bg-background">
      {/* Hero banner */}
      <section className="relative bg-foreground text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
            <a href="/" className="hover:text-white transition-colors">
              Inicio
            </a>
            <span>/</span>
            <span className="text-white">Contacto</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white text-balance max-w-2xl leading-tight">
                Estamos aqui para ayudarte
              </h1>
              <p className="mt-4 text-white/70 text-base lg:text-lg max-w-xl leading-relaxed">
                Planifica tu visita a Sucre con el respaldo de nuestro equipo local.
                Resolvemos tus dudas sobre tours, alojamiento, gastronomia, seguridad
                y todo lo que necesitas para vivir la mejor experiencia en la Ciudad
                Blanca de America.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:shrink-0">
              {[
                { label: "Atencion en 3 idiomas" },
                { label: "Equipo local en Sucre" },
                { label: "Respuesta en 24 h" },
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
              { value: "+3.200", label: "Viajeros asistidos" },
              { value: "4.9/5", label: "Satisfaccion del servicio" },
              { value: "<24 h", label: "Tiempo de respuesta" },
              { value: "100%", label: "Equipo local en Sucre" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-serif font-bold text-primary">{s.value}</p>
                <p className="text-xs text-white/60 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactoClient />
    </main>
  )
}
