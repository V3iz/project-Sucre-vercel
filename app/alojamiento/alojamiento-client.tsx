"use client"

import { useState } from "react"
import { SafeLink as Link } from "@/components/safe-link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Star,
  ArrowRight,
  Wifi,
  Car,
  Coffee,
  Waves,
  UtensilsCrossed,
  DoorOpen,
  CheckCircle2,
  SlidersHorizontal,
  X,
  Leaf,
  Phone,
  Shield,
} from "lucide-react"

// ─── Types ─────────────────────────────────────────────────────────────────────

type HotelCategory = "todos" | "lujo" | "boutique" | "estandar" | "hostal"
type PriceRange = "todos" | "economico" | "moderado" | "premium"

interface Hotel {
  id: string
  name: string
  subtitle: string
  category: HotelCategory
  categoryLabel: string
  stars: number
  priceFrom: number
  priceTo: number
  priceRange: PriceRange
  rating: number
  reviews: number
  location: string
  distanceCenter: string
  image: string
  amenities: string[]
  highlights: string[]
  description: string
  phone: string
  badge?: string
  sustainable?: boolean
  featured?: boolean
}

// ─── Amenity Icons Map ─────────────────────────────────────────────────────────

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Wifi: Wifi,
  Parqueo: Car,
  Desayuno: Coffee,
  Piscina: Waves,
  Restaurante: UtensilsCrossed,
  "Room service": DoorOpen,
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const hotels: Hotel[] = [
  {
    id: "capital-plaza",
    name: "Capital Plaza Hotel",
    subtitle: "Boutique colonial frente a la Plaza 25 de Mayo",
    category: "lujo",
    categoryLabel: "Lujo",
    stars: 5,
    priceFrom: 120,
    priceTo: 220,
    priceRange: "premium",
    rating: 4.9,
    reviews: 486,
    location: "Plaza 25 de Mayo Nº 29",
    distanceCenter: "Centro histórico",
    image: "/images/hotel-capital-plaza.jpg",
    amenities: ["Wifi", "Desayuno", "Restaurante", "Room service"],
    highlights: [
      "Vista directa a la Plaza 25 de Mayo",
      "Arquitectura colonial restaurada siglo XVIII",
      "Servicio de concierge 24 horas",
      "Tours virtuales 360° disponibles",
    ],
    description:
      "Hotel boutique de estilo colonial ubicado en el corazón de Sucre, frente a la icónica Plaza 25 de Mayo. Combina la elegancia de la arquitectura patrimonial con comodidades de lujo modernas.",
    phone: "+591 4 6460 101",
    badge: "Mejor valorado",
    sustainable: true,
    featured: true,
  },
  {
    id: "villa-antigua",
    name: "Hotel Villa Antigua",
    subtitle: "Mansión restaurada dentro del Patrimonio Mundial",
    category: "lujo",
    categoryLabel: "Lujo",
    stars: 4,
    priceFrom: 95,
    priceTo: 175,
    priceRange: "premium",
    rating: 4.8,
    reviews: 312,
    location: "Calle Calvo 237, Centro",
    distanceCenter: "3 min a pie del centro",
    image: "/images/hotel-villa-antigua.jpg",
    amenities: ["Wifi", "Desayuno", "Parqueo", "Restaurante"],
    highlights: [
      "Jardín colonial con fuente histórica",
      "Terrazas con vistas panorámicas",
      "Habitaciones temáticas de época",
      "Spa en jardines privados",
    ],
    description:
      "Boutique hotel de 4 estrellas alojado en una mansión del siglo XIX completamente restaurada, declarada Patrimonio Mundial por la UNESCO.",
    phone: "+591 4 6453 000",
    badge: "Patrimonio",
    sustainable: true,
    featured: true,
  },
  {
    id: "hotel-independencia",
    name: "Hotel Independencia",
    subtitle: "Arquitectura colonial del siglo XVI con confort moderno",
    category: "boutique",
    categoryLabel: "Boutique",
    stars: 4,
    priceFrom: 67,
    priceTo: 110,
    priceRange: "moderado",
    rating: 4.7,
    reviews: 598,
    location: "Calle Arenales 54, Centro",
    distanceCenter: "2 min a pie de la Catedral",
    image: "/images/hotel-independencia.jpg",
    amenities: ["Wifi", "Desayuno", "Restaurante", "Room service"],
    highlights: [
      "A pasos de la Catedral Metropolitana",
      "Claustros coloniales originales del siglo XVI",
      "Patio interior con jardín tropical",
      "Menú de cocina boliviana e internacional",
    ],
    description:
      "Hotel de 4 estrellas con historia viva: sus claustros coloniales datan del siglo XVI. Estratégicamente ubicado a metros de la Universidad Mayor de San Francisco Xavier.",
    phone: "+591 4 6444 666",
    sustainable: false,
    featured: false,
  },
  {
    id: "hotel-glorieta",
    name: "Glorieta Hotel",
    subtitle: "Confort y precio justo a 5 minutos del centro",
    category: "estandar",
    categoryLabel: "Estándar",
    stars: 4,
    priceFrom: 30,
    priceTo: 65,
    priceRange: "economico",
    rating: 4.5,
    reviews: 743,
    location: "Av. Ostria Gutiérrez 118",
    distanceCenter: "5 min a pie del centro",
    image: "/images/hotel-glorieta.jpg",
    amenities: ["Wifi", "Parqueo", "Desayuno", "Piscina"],
    highlights: [
      "Piscina exterior climatizada",
      "Parqueo privado gratuito",
      "Desayuno buffet incluido",
      "A 5 min del Museo Etnográfico",
    ],
    description:
      "Hotel de 4 estrellas con una de las mejores relaciones precio-calidad de Sucre. Su piscina exterior y desayuno buffet lo convierten en opción preferida por familias.",
    phone: "+591 4 6452 222",
    badge: "Mejor precio",
    sustainable: false,
    featured: false,
  },
  {
    id: "hostal-ajayu",
    name: "Hospedaje Ajayu",
    subtitle: "Encanto local y ubicación inmejorable, desde $38",
    category: "hostal",
    categoryLabel: "Hostal",
    stars: 3,
    priceFrom: 38,
    priceTo: 75,
    priceRange: "economico",
    rating: 9.3,
    reviews: 921,
    location: "Calle Nicolás Ortiz 14, Centro",
    distanceCenter: "Corazón del casco histórico",
    image: "/images/hostal-ajayu.jpg",
    amenities: ["Wifi", "Desayuno", "Parqueo"],
    highlights: [
      "Puntuación 9.3 en plataformas internacionales",
      "Habitaciones con decoración artesanal local",
      "Terraza-mirador con vista a campanarios",
      "Personal nativo y multilingüe",
    ],
    description:
      "Con una valoración de 9.3, el Ajayu es el alojamiento boutique económico mejor calificado de Sucre. Textiles jalq&apos;a y artesanías de Chuquisaca en cada habitación.",
    phone: "+591 4 6459 015",
    badge: "9.3 / 10",
    sustainable: true,
    featured: false,
  },
]

const categoryFilters: { id: HotelCategory | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "lujo", label: "Lujo" },
  { id: "boutique", label: "Boutique" },
  { id: "estandar", label: "Estándar" },
  { id: "hostal", label: "Hostal / Budget" },
]

const priceFilters: { id: PriceRange | "todos"; label: string }[] = [
  { id: "todos", label: "Cualquier precio" },
  { id: "economico", label: "Económico (< $70)" },
  { id: "moderado", label: "Moderado ($70–$120)" },
  { id: "premium", label: "Premium ($120+)" },
]

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${stars} estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < stars ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  )
}

// ─── Hotel Card ───────────────────────────────────────────────────────────────

function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <article className="group bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {hotel.badge && (
            <span className="bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {hotel.badge}
            </span>
          )}
          {hotel.sustainable && (
            <span className="bg-white/90 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              Eco
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <Badge variant="secondary" className="bg-white/90 text-foreground text-xs">
            {hotel.categoryLabel}
          </Badge>
          <StarRating stars={hotel.stars} />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 className="font-serif text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
            {hotel.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{hotel.subtitle}</p>
        </div>

        <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary" />
          <span>{hotel.location} · {hotel.distanceCenter}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {hotel.amenities.map((amenity) => {
            const Icon = amenityIcons[amenity]
            return (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 text-[11px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full"
              >
                {Icon && <Icon className="w-3 h-3" />}
                {amenity}
              </span>
            )
          })}
        </div>

        <ul className="flex flex-col gap-1">
          {hotel.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-1.5 text-xs text-muted-foreground">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-green-600" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-foreground">{hotel.rating}</span>
              <span>({hotel.reviews} reseñas)</span>
            </div>
            <p className="text-xl font-bold text-primary mt-0.5">
              ${hotel.priceFrom}
              <span className="text-xs font-normal text-muted-foreground ml-1">/ noche</span>
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

// ─── Featured Hotel ───────────────────────────────────────────────────────────

function FeaturedHotel({ hotel }: { hotel: Hotel }) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-border shadow-sm h-72 lg:h-80 flex items-end">
      <Image
        src={hotel.image}
        alt={hotel.name}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 1200px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative z-10 p-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 w-full">
        <div>
          {hotel.badge && (
            <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
              {hotel.badge}
            </span>
          )}
          <h3 className="font-serif text-2xl font-bold text-white leading-tight text-balance max-w-md">
            {hotel.name}
          </h3>
          <p className="text-white/70 text-sm mt-1 max-w-sm">{hotel.subtitle}</p>
          <div className="flex items-center gap-4 mt-2 text-white/60 text-xs">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {hotel.distanceCenter}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {hotel.rating} ({hotel.reviews} reseñas)
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
          <p className="text-white text-2xl font-bold font-serif">
            ${hotel.priceFrom}
            <span className="text-sm font-normal text-white/60 ml-1">/ noche</span>
          </p>
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/85 text-white font-semibold px-5 py-2.5 rounded-md transition-colors text-sm whitespace-nowrap"
          >
            Reservar ahora <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Main Client Component ────────────────────────────────────────────────────

export function AlojamientoClient() {
  const [activeCategory, setActiveCategory] = useState<HotelCategory | "todos">("todos")
  const [activePriceRange, setActivePriceRange] = useState<PriceRange | "todos">("todos")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const featured = hotels.filter((h) => h.featured)
  const filtered = hotels.filter((h) => {
    const catMatch = activeCategory === "todos" || h.category === activeCategory
    const priceMatch = activePriceRange === "todos" || h.priceRange === activePriceRange
    return catMatch && priceMatch
  })

  const hasActiveFilters = activeCategory !== "todos" || activePriceRange !== "todos"

  return (
    <>
      {/* ── Featured hotels ── */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pt-10 pb-2">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-5">
            Alojamientos destacados
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {featured.map((hotel) => (
              <FeaturedHotel key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </section>
      )}

      {/* ── Filters ── */}
      <section className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap flex-1">
              {categoryFilters.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as HotelCategory | "todos")}
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

            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className={`flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-full border transition-colors ${
                filtersOpen || activePriceRange !== "todos"
                  ? "bg-secondary text-foreground border-border"
                  : "text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Precio
            </button>

            {hasActiveFilters && (
              <button
                onClick={() => {
                  setActiveCategory("todos")
                  setActivePriceRange("todos")
                }}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <X className="w-3 h-3" />
                Limpiar
              </button>
            )}
          </div>

          {filtersOpen && (
            <div className="flex items-center gap-2 pt-2 flex-wrap">
              {priceFilters.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePriceRange(p.id as PriceRange | "todos")}
                  className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors whitespace-nowrap ${
                    activePriceRange === p.id
                      ? "bg-primary text-white border-primary"
                      : "text-muted-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-sm text-muted-foreground mb-6">
          Mostrando{" "}
          <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "alojamiento" : "alojamientos"}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No hay alojamientos con estos filtros.</p>
            <button
              onClick={() => {
                setActiveCategory("todos")
                setActivePriceRange("todos")
              }}
              className="mt-4 text-sm text-primary hover:underline"
            >
              Ver todos los alojamientos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </section>

      {/* ── Tips de viaje ── */}
      <section className="bg-secondary border-t border-border py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-8 text-center">
            Consejos para elegir tu alojamiento
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                title: "Quédate en el centro histórico",
                desc: "La Plaza 25 de Mayo, la Catedral y los principales museos están a menos de 10 minutos a pie. Te ahorrarás transporte y ganarás autenticidad.",
              },
              {
                icon: Coffee,
                title: "Desayuno típico incluido",
                desc: "Muchos hoteles incluyen desayuno buffet con productos locales: Api morado, salteñas, queso chuquisaqueño y pan de maíz. Pregunta al reservar.",
              },
              {
                icon: Shield,
                title: "Mejor época para visitar",
                desc: "De mayo a octubre es temporada seca. El clima es fresco y perfecto para caminar. Reserva con anticipación durante la Fiesta de la Virgen de Guadalupe (septiembre).",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-foreground text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-white text-balance">
            ¿Necesitas ayuda para elegir?
          </h2>
          <p className="mt-3 text-white/70 leading-relaxed">
            Nuestro equipo local conoce cada hotel. Te asesoramos sin costo para
            encontrar el alojamiento ideal según tu presupuesto y fechas.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            <Link
              href="/checkout"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/85 text-white font-semibold px-6 py-2.5 rounded-md transition-colors text-sm"
            >
              Reservar alojamiento
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 border border-white/30 text-white hover:border-white font-semibold px-6 py-2.5 rounded-md transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              Asesoría gratuita
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
