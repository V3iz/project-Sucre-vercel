"use client"

import { useState } from "react"
import { SafeLink as Link } from "@/components/safe-link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Clock,
  Star,
  Users,
  Leaf,
  ArrowRight,
  SlidersHorizontal,
  X,
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────────

const categories = [
  { id: "todas", label: "Todas" },
  { id: "cultura", label: "Cultura" },
  { id: "naturaleza", label: "Naturaleza" },
  { id: "gastronomia", label: "Gastronomia" },
  { id: "alternativo", label: "Alternativo" },
]

const durations = [
  { id: "todas", label: "Cualquier duracion" },
  { id: "medio-dia", label: "Medio dia" },
  { id: "dia-completo", label: "Dia completo" },
  { id: "varios-dias", label: "Varios dias" },
]

const experiences = [
  {
    id: "inmersion-colonial",
    title: "Inmersion Colonial",
    subtitle: "Recorre el centro historico UNESCO a pie",
    category: "cultura",
    duration: "dia-completo",
    durationLabel: "Dia completo",
    price: 85,
    rating: 4.9,
    reviews: 312,
    group: "Max 8 personas",
    location: "Centro Historico",
    image: "/images/exp-colonial.jpg",
    tags: ["UNESCO", "Guia certificado", "Transporte incluido"],
    sustainable: true,
    featured: false,
  },
  {
    id: "ruta-sabores",
    title: "Ruta de los Sabores",
    subtitle: "Degustacion y cocina tradicional boliviana",
    category: "gastronomia",
    duration: "medio-dia",
    durationLabel: "Medio dia",
    price: 65,
    rating: 4.8,
    reviews: 198,
    group: "Max 10 personas",
    location: "Mercado Central",
    image: "/images/exp-gastronomia.jpg",
    tags: ["Clase de cocina", "Degustacion", "Sin gluten (op.)"],
    sustainable: true,
    featured: true,
  },
  {
    id: "ecoturismo-maragua",
    title: "Ecoturismo en Maragua",
    subtitle: "Crater geologico y comunidades indigenas",
    category: "naturaleza",
    duration: "varios-dias",
    durationLabel: "2 dias",
    price: 120,
    rating: 4.9,
    reviews: 87,
    group: "Max 6 personas",
    location: "Crater de Maragua",
    image: "/images/exp-maragua.jpg",
    tags: ["Camping", "Guia local", "Turismo regenerativo"],
    sustainable: true,
    featured: true,
  },
  {
    id: "taller-chocolate",
    title: "Taller de Chocolate Artesanal",
    subtitle: "Del cacao al chocolate fino de Bolivia",
    category: "gastronomia",
    duration: "medio-dia",
    durationLabel: "3 horas",
    price: 55,
    rating: 4.7,
    reviews: 241,
    group: "Max 12 personas",
    location: "Chocolateria del Sur",
    image: "/images/exp-chocolate.jpg",
    tags: ["Produccion artesanal", "Degustacion", "Lleva tu chocolate"],
    sustainable: false,
    featured: false,
  },
  {
    id: "tejidos-jalq-a",
    title: "Tejidos Jalq'a",
    subtitle: "Aprende el telar con artesanas locales",
    category: "cultura",
    duration: "dia-completo",
    durationLabel: "Dia completo",
    price: 75,
    rating: 4.8,
    reviews: 154,
    group: "Max 6 personas",
    location: "Comunidad Candelaria",
    image: "/images/exp-tejidos.jpg",
    tags: ["Artesania viva", "Comunidad beneficiada", "Kit incluido"],
    sustainable: true,
    featured: false,
  },
  {
    id: "huellas-dinosaurio",
    title: "Huellas de Dinosaurio",
    subtitle: "Cal Orcko: la pared paleontologica mas grande del mundo",
    category: "alternativo",
    duration: "medio-dia",
    durationLabel: "4 horas",
    price: 45,
    rating: 4.6,
    reviews: 409,
    group: "Max 15 personas",
    location: "Cal Orcko",
    image: "/images/exp-dinosaurios.jpg",
    tags: ["Paleontologia", "Guia cientifico", "Apto familias"],
    sustainable: false,
    featured: false,
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ExperienceCard({ exp }: { exp: (typeof experiences)[0] }) {
  return (
    <article className="group bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={exp.image}
          alt={exp.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {exp.featured && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
            Destacada
          </span>
        )}
        {exp.sustainable && (
          <span className="absolute top-3 right-3 bg-white/90 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <Leaf className="w-3 h-3" />
            Sostenible
          </span>
        )}
        <div className="absolute bottom-3 left-3">
          <Badge
            variant="secondary"
            className="bg-white/90 text-foreground text-xs capitalize"
          >
            {exp.category}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 className="font-serif text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
            {exp.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
            {exp.subtitle}
          </p>
        </div>

        {/* Meta */}
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <li className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            {exp.durationLabel}
          </li>
          <li className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 shrink-0" />
            {exp.group}
          </li>
          <li className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {exp.location}
          </li>
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-foreground">{exp.rating}</span>
              <span>({exp.reviews} resenas)</span>
            </div>
            <p className="text-xl font-bold text-primary mt-0.5">
              ${exp.price}
              <span className="text-xs font-normal text-muted-foreground ml-1">
                / persona
              </span>
            </p>
          </div>
          <Link
            href="/checkout"
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/85 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
          >
            Reservar
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ExperienciasPage() {
  const [activeCategory, setActiveCategory] = useState("todas")
  const [activeDuration, setActiveDuration] = useState("todas")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = experiences.filter((exp) => {
    const catMatch = activeCategory === "todas" || exp.category === activeCategory
    const durMatch = activeDuration === "todas" || exp.duration === activeDuration
    return catMatch && durMatch
  })

  const hasActiveFilters = activeCategory !== "todas" || activeDuration !== "todas"

  return (
    <>
      <main className="pt-16 lg:pt-20 min-h-screen bg-background">
        {/* ── Hero banner ── */}
        <section className="relative bg-foreground text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-white">Experiencias</span>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white text-balance max-w-2xl leading-tight">
              Experiencias que transforman
            </h1>
            <p className="mt-4 text-white/70 text-base lg:text-lg max-w-xl leading-relaxed">
              Sumérgete en la cultura viva, los sabores auténticos y los paisajes
              únicos de Sucre. Cada experiencia es guiada por expertos locales.
            </p>
            {/* Quick stats */}
            <div className="flex flex-wrap gap-8 mt-8">
              {[
                { value: "6+", label: "Experiencias activas" },
                { value: "4.8", label: "Valoracion media" },
                { value: "1,200+", label: "Viajeros felices" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-serif font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/60 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Filters ── */}
        <section className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-3 flex-wrap">
              {/* Category pills */}
              <div className="flex items-center gap-2 flex-wrap flex-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`text-sm font-medium px-4 py-1.5 rounded-full border transition-colors whitespace-nowrap ${
                      activeCategory === cat.id
                        ? "bg-primary text-white border-primary"
                        : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Duration filter toggle */}
              <button
                onClick={() => setFiltersOpen((v) => !v)}
                className={`flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-full border transition-colors ${
                  filtersOpen || activeDuration !== "todas"
                    ? "bg-secondary text-foreground border-border"
                    : "text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Duracion
              </button>

              {/* Clear filters */}
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setActiveCategory("todas")
                    setActiveDuration("todas")
                  }}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <X className="w-3 h-3" />
                  Limpiar
                </button>
              )}
            </div>

            {/* Duration sub-filter */}
            {filtersOpen && (
              <div className="flex items-center gap-2 pt-2 flex-wrap">
                {durations.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setActiveDuration(d.id)}
                    className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors whitespace-nowrap ${
                      activeDuration === d.id
                        ? "bg-primary text-white border-primary"
                        : "text-muted-foreground border-border hover:border-primary hover:text-primary"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Grid ── */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No hay experiencias con estos filtros.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("todas")
                  setActiveDuration("todas")
                }}
                className="mt-4 text-sm text-primary hover:underline"
              >
                Ver todas las experiencias
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Mostrando{" "}
                <span className="font-semibold text-foreground">
                  {filtered.length}
                </span>{" "}
                {filtered.length === 1 ? "experiencia" : "experiencias"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((exp) => (
                  <ExperienceCard key={exp.id} exp={exp} />
                ))}
              </div>
            </>
          )}
        </section>

        {/* ── Bottom CTA strip ── */}
        <section className="bg-secondary border-t border-border py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground text-balance">
              ¿Buscas algo a medida?
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Diseñamos itinerarios personalizados para grupos, familias y viajeros
              corporativos. Cuéntanos tu vision.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
              <Link
                href="/checkout"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/85 text-white font-semibold px-6 py-2.5 rounded-md transition-colors text-sm"
              >
                Reservar experiencia
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-secondary font-semibold px-6 py-2.5 rounded-md transition-colors text-sm"
              >
                Cotizacion personalizada
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
