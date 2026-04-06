"use client"

import { useState } from "react"
import { SafeLink as Link } from "@/components/safe-link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { BookingModal } from "@/components/booking-modal"
import {
  MapPin,
  Clock,
  Star,
  Users,
  Leaf,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Shield,
  Zap,
} from "lucide-react"

// ─── Types ─────────────────────────────────────────────────────────────────────

type Difficulty = "Fácil" | "Moderado" | "Exigente"
type TourCategory = "ciudad" | "naturaleza" | "gastronomia" | "aventura" | "nocturno"

interface Tour {
  id: string
  title: string
  subtitle: string
  category: TourCategory
  categoryLabel: string
  difficulty: Difficulty
  duration: string
  durationDays: number
  price: number
  priceLabel: string
  rating: number
  reviews: number
  maxGroup: number
  departure: string
  image: string
  highlights: string[]
  includes: string[]
  sustainable: boolean
  featured: boolean
  badge?: string
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const categories: { id: TourCategory | "todos"; label: string }[] = [
  { id: "todos", label: "Todos los tours" },
  { id: "ciudad", label: "Ciudad" },
  { id: "naturaleza", label: "Naturaleza" },
  { id: "gastronomia", label: "Gastronomia" },
  { id: "aventura", label: "Aventura" },
  { id: "nocturno", label: "Nocturno" },
]

const difficultyColors: Record<Difficulty, string> = {
  "Fácil": "bg-green-100 text-green-700",
  "Moderado": "bg-amber-100 text-amber-700",
  "Exigente": "bg-red-100 text-red-700",
}

const tours: Tour[] = [
  {
    id: "tour-ciudad-historica",
    title: "Tour Ciudad Histórica",
    subtitle: "El mejor recorrido por el centro patrimonial de Sucre",
    category: "ciudad",
    categoryLabel: "Ciudad",
    difficulty: "Fácil",
    duration: "4 horas",
    durationDays: 0,
    price: 45,
    priceLabel: "por persona",
    rating: 4.9,
    reviews: 528,
    maxGroup: 10,
    departure: "8:00 am · 2:00 pm",
    image: "/images/tour-ciudad.jpg",
    highlights: ["Plaza 25 de Mayo", "Casa de la Libertad", "Catedral Metropolitana", "Barrio La Recoleta"],
    includes: ["Guía certificado bilingüe", "Transporte en minibus", "Degustación de salteñas", "Auriculares de guía"],
    sustainable: true,
    featured: true,
    badge: "Más vendido",
  },
  {
    id: "tour-canyon-4x4",
    title: "Cañón de los Dinosaurios 4×4",
    subtitle: "Expedición off-road por los cañones rojos y Cal Orcko",
    category: "aventura",
    categoryLabel: "Aventura",
    difficulty: "Moderado",
    duration: "Día completo",
    durationDays: 1,
    price: 110,
    priceLabel: "por persona",
    rating: 4.8,
    reviews: 213,
    maxGroup: 8,
    departure: "7:00 am",
    image: "/images/tour-canyon.jpg",
    highlights: ["Cal Orcko (huellas de dinosaurio)", "Cañón de Palca", "Mina de plata", "Almuerzo campestre"],
    includes: ["Jeep 4×4 privado", "Guía especializado", "Almuerzo típico", "Seguro de actividad"],
    sustainable: false,
    featured: true,
    badge: "Aventura top",
  },
  {
    id: "tour-singani-vinos",
    title: "Ruta del Singani y Vinos",
    subtitle: "Visita a bodega artesanal y cata de singani boliviano",
    category: "gastronomia",
    categoryLabel: "Gastronomia",
    difficulty: "Fácil",
    duration: "5 horas",
    durationDays: 0,
    price: 75,
    priceLabel: "por persona",
    rating: 4.7,
    reviews: 147,
    maxGroup: 12,
    departure: "10:00 am · 3:00 pm",
    image: "/images/tour-vinos.jpg",
    highlights: ["Viñedo Aranjuez", "Cata de 5 variedades", "Taller de maridaje", "Vista panorámica"],
    includes: ["Transporte ida y vuelta", "Cata guiada", "Tabla de quesos y embutidos", "Botella de recuerdo"],
    sustainable: true,
    featured: false,
  },
  {
    id: "tour-mercados-sabores",
    title: "Mercados y Sabores Locales",
    subtitle: "Recorre los mercados con una chef local y cocina tu almuerzo",
    category: "gastronomia",
    categoryLabel: "Gastronomia",
    difficulty: "Fácil",
    duration: "3 horas",
    durationDays: 0,
    price: 60,
    priceLabel: "por persona",
    rating: 4.9,
    reviews: 302,
    maxGroup: 8,
    departure: "9:00 am",
    image: "/images/tour-mercados.jpg",
    highlights: ["Mercado Central", "Compra de ingredientes", "Clase de cocina", "Almuerzo incluido"],
    includes: ["Chef guía local", "Ingredientes frescos", "Recetario digital", "Degustaciones en ruta"],
    sustainable: true,
    featured: false,
    badge: "Nuevo",
  },
  {
    id: "tour-bici-montaña",
    title: "Bici de Montaña por los Valles",
    subtitle: "Descenso de 35 km por rutas rurales y pueblos coloniales",
    category: "aventura",
    categoryLabel: "Aventura",
    difficulty: "Exigente",
    duration: "6 horas",
    durationDays: 0,
    price: 85,
    priceLabel: "por persona",
    rating: 4.8,
    reviews: 178,
    maxGroup: 10,
    departure: "7:30 am",
    image: "/images/tour-bici.jpg",
    highlights: ["Descenso por Río Chico", "Pueblo de Yotala", "Mirador El Inca", "Picnic en ruta"],
    includes: ["Bicicleta de montaña", "Casco y protecciones", "Mecánico de ruta", "Snack y agua"],
    sustainable: true,
    featured: false,
  },
  {
    id: "tour-hacienda-colonial",
    title: "Hacienda Colonial Privada",
    subtitle: "Experiencia exclusiva en una hacienda del siglo XVIII restaurada",
    category: "ciudad",
    categoryLabel: "Ciudad",
    difficulty: "Fácil",
    duration: "Día completo",
    durationDays: 1,
    price: 155,
    priceLabel: "por persona",
    rating: 4.9,
    reviews: 93,
    maxGroup: 6,
    departure: "A convenir",
    image: "/images/tour-hacienda.jpg",
    highlights: ["Tour privado de la hacienda", "Almuerzo gourmet", "Cabalgata opcional", "Spa en jardines"],
    includes: ["Transporte privado", "Guía de historia", "Almuerzo de 4 tiempos", "Bebidas premium"],
    sustainable: true,
    featured: false,
    badge: "Premium",
  },
  {
    id: "tour-estrellas-nocturno",
    title: "Astronomía y Estrellas del Altiplano",
    subtitle: "Observación nocturna con telescopios profesionales a 3.000 m",
    category: "nocturno",
    categoryLabel: "Nocturno",
    difficulty: "Fácil",
    duration: "4 horas",
    durationDays: 0,
    price: 70,
    priceLabel: "por persona",
    rating: 4.9,
    reviews: 201,
    maxGroup: 12,
    departure: "7:30 pm",
    image: "/images/tour-estrellas.jpg",
    highlights: ["Mirador nocturno privado", "Telescopios profesionales", "Conferencia de astrofísica", "Vía Láctea visible"],
    includes: ["Transporte nocturno", "Astrónomo guía", "Chocolate caliente", "Fotografía nocturna asistida"],
    sustainable: true,
    featured: false,
    badge: "Imperdible",
  },
]

// ─── Tour Card ────────────────────────────────────────────────────────────────

function TourCard({ tour, onBook }: { tour: Tour; onBook: (tour: Tour) => void }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="group bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {tour.badge && (
            <span className="bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {tour.badge}
            </span>
          )}
          {tour.sustainable && (
            <span className="bg-white/90 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              Sostenible
            </span>
          )}
        </div>

        {/* Bottom meta */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <Badge variant="secondary" className="bg-white/90 text-foreground text-xs">
            {tour.categoryLabel}
          </Badge>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColors[tour.difficulty]}`}>
            {tour.difficulty}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 className="font-serif text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
            {tour.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
            {tour.subtitle}
          </p>
        </div>

        {/* Quick meta row */}
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <li className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            {tour.duration}
          </li>
          <li className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 shrink-0" />
            Max {tour.maxGroup} pers.
          </li>
          <li className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            {tour.departure}
          </li>
        </ul>

        {/* Highlights list */}
        <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
          {tour.highlights.slice(0, 4).map((h) => (
            <li key={h} className="flex items-start gap-1.5 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 shrink-0 mt-0.5 text-primary" />
              <span className="line-clamp-1">{h}</span>
            </li>
          ))}
        </ul>

        {/* Expandable includes */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 text-xs text-primary font-medium hover:underline w-fit"
        >
          {expanded ? (
            <>Ocultar detalle <ChevronUp className="w-3.5 h-3.5" /></>
          ) : (
            <>Ver qué incluye <ChevronDown className="w-3.5 h-3.5" /></>
          )}
        </button>

        {expanded && (
          <ul className="flex flex-col gap-1.5 border-t border-border pt-3">
            {tour.includes.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-green-600" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-foreground">{tour.rating}</span>
              <span>({tour.reviews} reseñas)</span>
            </div>
            <p className="text-xl font-bold text-primary mt-0.5">
              ${tour.price}
              <span className="text-xs font-normal text-muted-foreground ml-1">
                / {tour.priceLabel}
              </span>
            </p>
          </div>
          <button
            onClick={() => onBook(tour)}
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/85 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
          >
            Reservar
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  )
}

// ─── Featured Banner ──────────────────────────────────────────────────────────

function FeaturedTour({ tour, onBook }: { tour: Tour; onBook: (tour: Tour) => void }) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-border shadow-sm h-72 lg:h-80 flex items-end">
      <Image
        src={tour.image}
        alt={tour.title}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 1200px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative z-10 p-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 w-full">
        <div>
          {tour.badge && (
            <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
              {tour.badge}
            </span>
          )}
          <h3 className="font-serif text-2xl font-bold text-white leading-tight text-balance max-w-md">
            {tour.title}
          </h3>
          <p className="text-white/70 text-sm mt-1 max-w-sm">{tour.subtitle}</p>
          <div className="flex items-center gap-4 mt-2 text-white/60 text-xs">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{tour.duration}</span>
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{tour.rating} ({tour.reviews})</span>
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
          <p className="text-white text-2xl font-bold font-serif">${tour.price}<span className="text-sm font-normal text-white/60 ml-1">/ pers.</span></p>
          <button
            onClick={() => onBook(tour)}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/85 text-white font-semibold px-5 py-2.5 rounded-md transition-colors text-sm whitespace-nowrap"
          >
            Reservar ahora <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ToursPage() {
  const [activeCategory, setActiveCategory] = useState<TourCategory | "todos">("todos")
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBookTour = (tour: Tour) => {
    setSelectedTour(tour)
    setIsModalOpen(true)
  }

  const featured = tours.filter((t) => t.featured)
  const filtered = tours.filter(
    (t) => activeCategory === "todos" || t.category === activeCategory
  )

  return (
    <>
      <main className="pt-16 lg:pt-20 min-h-screen bg-background">

        {/* ── Hero banner ── */}
        <section className="relative bg-foreground text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-white">Tours</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white text-balance max-w-2xl leading-tight">
                  Tours guiados por Sucre
                </h1>
                <p className="mt-4 text-white/70 text-base lg:text-lg max-w-xl leading-relaxed">
                  Desde recorridos urbanos hasta aventuras off-road. Cada tour incluye
                  guía certificado, transporte y la esencia auténtica del destino.
                </p>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-3 lg:shrink-0">
                {[
                  { icon: Shield, label: "Guías certificados" },
                  { icon: Zap, label: "Reserva instantánea" },
                  { icon: Leaf, label: "Turismo sostenible" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-xs text-white/80">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-8">
              {[
                { value: "7", label: "Tours disponibles" },
                { value: "4.88", label: "Valoracion media" },
                { value: "1,662+", label: "Reseñas verificadas" },
                { value: "100%", label: "Satisfaccion garantizada" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-serif font-bold text-primary">{s.value}</p>
                  <p className="text-xs text-white/60 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured tours ── */}
        {featured.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 pt-10 pb-2">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-5">
              Tours destacados
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {featured.map((tour) => (
                <FeaturedTour key={tour.id} tour={tour} onBook={handleBookTour} />
              ))}
            </div>
          </section>
        )}

        {/* ── Category filter ── */}
        <section className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as TourCategory | "todos")}
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
          </div>
        </section>

        {/* ── Tour grid ── */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          <p className="text-sm text-muted-foreground mb-6">
            Mostrando{" "}
            <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "tour" : "tours"}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No hay tours en esta categoría.</p>
              <button
                onClick={() => setActiveCategory("todos")}
                className="mt-4 text-sm text-primary hover:underline"
              >
                Ver todos los tours
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((tour) => (
                <TourCard key={tour.id} tour={tour} onBook={handleBookTour} />
              ))}
            </div>
          )}
        </section>

        {/* ── Bottom CTA ── */}
        <section className="bg-secondary border-t border-border py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground text-balance">
              ¿Quieres un tour privado o grupal?
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Armamos itinerarios exclusivos para bodas, viajes corporativos,
              jubilaciones y grupos familiares. Fechas y rutas a tu medida.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/85 text-white font-semibold px-6 py-2.5 rounded-md transition-colors text-sm"
              >
                Solicitar cotizacion <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      {selectedTour && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedTour(null)
          }}
          item={{
            id: selectedTour.id,
            name: selectedTour.title,
            subtitle: selectedTour.subtitle,
            category: selectedTour.categoryLabel,
            price: selectedTour.price,
            image: selectedTour.image,
            duration: selectedTour.duration,
            maxGroup: selectedTour.maxGroup,
          }}
        />
      )}
    </>
  )
}
