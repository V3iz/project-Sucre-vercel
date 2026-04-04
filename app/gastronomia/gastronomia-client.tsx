"use client"

import { useState } from "react"
import { SafeLink as Link } from "@/components/safe-link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Star,
  ArrowRight,
  Clock,
  Leaf,
  UtensilsCrossed,
  CheckCircle2,
  SlidersHorizontal,
  X,
  ChefHat,
  Flame,
  Coffee,
  Wine,
} from "lucide-react"

// ─── Types ─────────────────────────────────────────────────────────────────────

type RestaurantCategory = "todos" | "tipico" | "moderno" | "vegetariano" | "cafe" | "mercado"
type MealType = "todos" | "desayuno" | "almuerzo" | "cena"

interface Restaurant {
  id: string
  name: string
  subtitle: string
  category: RestaurantCategory
  categoryLabel: string
  mealType: MealType[]
  mealTypeLabel: string
  priceRange: "$" | "$$" | "$$$"
  priceLabel: string
  rating: number
  reviews: number
  location: string
  hours: string
  image: string
  specialties: string[]
  highlights: string[]
  description: string
  badge?: string
  sustainable?: boolean
  featured?: boolean
  mustTry?: string
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const restaurants: Restaurant[] = [
  {
    id: "la-posada",
    name: "Restaurante La Posada",
    subtitle: "Cocina boliviana auténtica en ambiente colonial",
    category: "tipico",
    categoryLabel: "Típico",
    mealType: ["desayuno", "almuerzo", "cena"],
    mealTypeLabel: "Todo el día",
    priceRange: "$$",
    priceLabel: "Precio moderado",
    rating: 4.8,
    reviews: 623,
    location: "Calle Audiencia 92, Centro",
    hours: "7:00 am – 10:00 pm",
    image: "/images/gastronomia-mariscos.jpg",
    specialties: ["Salteñas", "Picante chuquisaqueño", "Pique macho", "Cazuela de maní"],
    highlights: [
      "Ingredientes frescos de origen local",
      "Menú vegetariano disponible",
      "Atención desde el desayuno",
      "Ambiente acogedor colonial",
    ],
    description:
      "Uno de los restaurantes más representativos de la gastronomía boliviana en Sucre. La Posada captura la esencia de las tradiciones culinarias de Chuquisaca en cada plato.",
    badge: "Imperdible",
    sustainable: true,
    featured: true,
    mustTry: "Picante chuquisaqueño",
  },
  {
    id: "el-huerto",
    name: "El Huerto",
    subtitle: "Jardín restaurante con cocina fresca y vegetariana",
    category: "vegetariano",
    categoryLabel: "Vegetariano",
    mealType: ["almuerzo", "cena"],
    mealTypeLabel: "Almuerzo y cena",
    priceRange: "$$",
    priceLabel: "Precio moderado",
    rating: 4.7,
    reviews: 891,
    location: "Calle Ladislao Cabrera 86",
    hours: "12:00 pm – 10:00 pm",
    image: "/images/gastronomia-el-huerto.jpg",
    specialties: ["Ensaladas gourmet", "Pastas artesanales", "Pollo al limón", "Cheesecake local"],
    highlights: [
      "Jardín exterior con luz natural",
      "Opciones 100% vegetarianas y veganas",
      "Ingredientes orgánicos locales",
      "Muy popular entre viajeros internacionales",
    ],
    description:
      "Escondido tras un zaguán colonial, El Huerto sorprende con un frondoso jardín donde se sirven almuerzos y cenas de cocina fresca, ligera y creativa.",
    badge: "Top viajeros",
    sustainable: true,
    featured: true,
    mustTry: "Ensalada fresca de temporada",
  },
  {
    id: "mercado-central",
    name: "Mercado Central",
    subtitle: "La experiencia gastronómica más auténtica de Sucre",
    category: "mercado",
    categoryLabel: "Mercado",
    mealType: ["desayuno", "almuerzo"],
    mealTypeLabel: "Desayuno y almuerzo",
    priceRange: "$",
    priceLabel: "Muy económico",
    rating: 4.6,
    reviews: 1240,
    location: "Calle Ravelo s/n, Centro",
    hours: "6:00 am – 3:00 pm",
    image: "/images/gastronomia-mercado.jpg",
    specialties: ["Api morado con pastel", "Fricasé de cerdo", "Sopa de maní", "Chicha boliviana"],
    highlights: [
      "Más de 50 puestos de comida local",
      "Precios desde Bs. 15 (menos de $2)",
      "Ingredientes directos de productores",
      "Desayuno típico desde las 6 am",
    ],
    description:
      "El Mercado Central es el corazón culinario de Sucre y el mejor lugar para desayunar como lo hacen los locales. Sus decenas de puestos ofrecen desde api morado hasta fricasé.",
    badge: "Auténtico local",
    sustainable: false,
    featured: false,
    mustTry: "Api morado con pastel",
  },
  {
    id: "condor-cafe",
    name: "Condor Café",
    subtitle: "Café cultural con música en vivo y cocina de fusión",
    category: "cafe",
    categoryLabel: "Café & Bar",
    mealType: ["desayuno", "almuerzo", "cena"],
    mealTypeLabel: "Todo el día",
    priceRange: "$$",
    priceLabel: "Precio moderado",
    rating: 4.5,
    reviews: 447,
    location: "Calle Ortiz 14, Plaza 25 de Mayo",
    hours: "8:00 am – 12:00 am",
    image: "/images/gastronomia-chocolate.jpg",
    specialties: [
      "Café de altura boliviano",
      "Singani sour",
      "Tapas de fusión andina",
      "Brownie de cacao Beni",
    ],
    highlights: [
      "Música en vivo miércoles y viernes",
      "Terraza con vista a la plaza principal",
      "Carta de cócteles con singani boliviano",
      "Wifi y ambiente de trabajo",
    ],
    description:
      "El Condor Café es punto de encuentro de viajeros y creativos locales. Su terraza frente a la Plaza 25 de Mayo es perfecta para desayunar con café de altura boliviano.",
    sustainable: false,
    featured: false,
    mustTry: "Singani Sour con cítricos bolivianos",
  },
  {
    id: "sabores-chuquisaquenos",
    name: "Sabores Chuquisaqueños",
    subtitle: "Fritanga, chorizo y platos típicos de la región",
    category: "tipico",
    categoryLabel: "Típico",
    mealType: ["almuerzo", "cena"],
    mealTypeLabel: "Almuerzo y cena",
    priceRange: "$",
    priceLabel: "Muy económico",
    rating: 4.7,
    reviews: 334,
    location: "Calle Aniceto Arce 112",
    hours: "11:00 am – 9:00 pm",
    image: "/images/gastronomia-fritanga.jpg",
    specialties: [
      "Fritanga chuquisaqueña",
      "Chorizo chuquisaqueño",
      "Mondongo",
      "Ají de cumanda",
    ],
    highlights: [
      "Recetas tradicionales de más de 100 años",
      "El mejor chorizo chuquisaqueño de la ciudad",
      "Porciones generosas a precios populares",
      "Reconocido por Ministerio de Culturas",
    ],
    description:
      "Restaurante familiar especializado en los platos más representativos de Chuquisaca. Su fritanga —costillas de cerdo marinadas en chicha y ají colorado— es considerada la mejor de Sucre.",
    badge: "Receta tradicional",
    sustainable: true,
    featured: false,
    mustTry: "Fritanga chuquisaqueña",
  },
  {
    id: "salteneria-central",
    name: "Salteñería Central",
    subtitle: "Las mejores salteñas de Sucre, solo en las mañanas",
    category: "tipico",
    categoryLabel: "Típico",
    mealType: ["desayuno"],
    mealTypeLabel: "Solo desayuno",
    priceRange: "$",
    priceLabel: "Muy económico",
    rating: 4.9,
    reviews: 1520,
    location: "Calle España 165, Centro",
    hours: "8:00 am – 1:00 pm",
    image: "/images/gastronomia-salteñas.jpg",
    specialties: [
      "Salteñas de pollo",
      "Salteñas de carne",
      "Salteñas vegetarianas",
      "Té de hierbas andinas",
    ],
    highlights: [
      "Solo se sirven hasta agotarse — llega temprano",
      "Masa artesanal horneada cada mañana",
      "Premios gastronómicos nacionales 2023–2024",
      "Variedad de salsas: picante, suave y verde",
    ],
    description:
      "Las salteñas son el desayuno favorito de los sucrenses y esta salteñería las prepara a la perfección: masa dorada, relleno jugoso con aceitunas, pasas y huevo.",
    badge: "4.9 / 5",
    sustainable: false,
    featured: false,
    mustTry: "Salteña de pollo jugosa",
  },
]

const categoryFilters: { id: RestaurantCategory | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "tipico", label: "Típico boliviano" },
  { id: "vegetariano", label: "Vegetariano" },
  { id: "mercado", label: "Mercado" },
  { id: "cafe", label: "Café & Bar" },
]

const mealFilters: { id: MealType | "todos"; label: string }[] = [
  { id: "todos", label: "Cualquier comida" },
  { id: "desayuno", label: "Desayuno" },
  { id: "almuerzo", label: "Almuerzo" },
  { id: "cena", label: "Cena" },
]

const priceLabels: Record<"$" | "$$" | "$$$", string> = {
  "$": "Muy económico (< $5)",
  "$$": "Moderado ($5–$15)",
  "$$$": "Premium ($15+)",
}

const dishesData = [
  { name: "Salteñas", desc: "Empanada horneada con relleno jugoso. Desayuno estrella de Bolivia.", icon: Flame },
  { name: "Fritanga", desc: "Costillas de cerdo con chicha y ají colorado. Emblema de Chuquisaca.", icon: UtensilsCrossed },
  { name: "Cazuela de Maní", desc: "Sopa espesa de maní con carne y papa. Reconfortante y nutritiva.", icon: ChefHat },
  { name: "Chorizo Chuquisaqueño", desc: "Embutido ahumado con especias locales. Se sirve con papa y llajwa.", icon: Flame },
  { name: "Api Morado", desc: "Bebida caliente de maíz morado con clavo y canela. Desayuno típico.", icon: Coffee },
  { name: "Singani", desc: "Destilado de uva boliviano Patrimonio Cultural. Base de cócteles únicos.", icon: Wine },
]

// ─── Restaurant Card ──────────────────────────────────────────────────────────

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <article className="group bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {restaurant.badge && (
            <span className="bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {restaurant.badge}
            </span>
          )}
          {restaurant.sustainable && (
            <span className="bg-white/90 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              Local
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <Badge variant="secondary" className="bg-white/90 text-foreground text-xs">
            {restaurant.categoryLabel}
          </Badge>
          <span className="bg-white/90 text-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
            {restaurant.priceRange}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 className="font-serif text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
            {restaurant.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{restaurant.subtitle}</p>
        </div>

        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <li className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            {restaurant.hours}
          </li>
          <li className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {restaurant.location}
          </li>
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {restaurant.specialties.slice(0, 3).map((s) => (
            <span
              key={s}
              className="text-[11px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>

        {restaurant.mustTry && (
          <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-lg px-3 py-2">
            <ChefHat className="w-4 h-4 text-primary shrink-0" />
            <p className="text-xs text-foreground">
              <span className="font-semibold">Prueba sí o sí:</span>{" "}
              {restaurant.mustTry}
            </p>
          </div>
        )}

        <ul className="flex flex-col gap-1">
          {restaurant.highlights.slice(0, 2).map((h) => (
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
              <span className="font-semibold text-foreground">{restaurant.rating}</span>
              <span>({restaurant.reviews} reseñas)</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{priceLabels[restaurant.priceRange]}</p>
          </div>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/85 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
          >
            Ver más
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}

// ─── Featured Restaurant ──────────────────────────────────────────────────────

function FeaturedRestaurant({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-border shadow-sm h-72 lg:h-80 flex items-end">
      <Image
        src={restaurant.image}
        alt={restaurant.name}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 1200px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative z-10 p-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 w-full">
        <div>
          {restaurant.badge && (
            <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
              {restaurant.badge}
            </span>
          )}
          <h3 className="font-serif text-2xl font-bold text-white leading-tight text-balance max-w-md">
            {restaurant.name}
          </h3>
          <p className="text-white/70 text-sm mt-1 max-w-sm">{restaurant.subtitle}</p>
          <div className="flex items-center gap-4 mt-2 text-white/60 text-xs">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {restaurant.hours}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {restaurant.rating} ({restaurant.reviews} reseñas)
            </span>
          </div>
          {restaurant.mustTry && (
            <div className="flex items-center gap-1.5 mt-2">
              <ChefHat className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-white/80">
                <span className="font-semibold text-white">Prueba sí o sí:</span>{" "}
                {restaurant.mustTry}
              </span>
            </div>
          )}
        </div>
        <div className="shrink-0">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/85 text-white font-semibold px-5 py-2.5 rounded-md transition-colors text-sm whitespace-nowrap"
          >
            Ver restaurante <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Main Client Component ────────────────────────────────────────────────────

export function GastronomiaClient() {
  const [activeCategory, setActiveCategory] = useState<RestaurantCategory | "todos">("todos")
  const [activeMeal, setActiveMeal] = useState<MealType | "todos">("todos")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const featured = restaurants.filter((r) => r.featured)
  const filtered = restaurants.filter((r) => {
    const catMatch = activeCategory === "todos" || r.category === activeCategory
    const mealMatch = activeMeal === "todos" || r.mealType.includes(activeMeal as MealType)
    return catMatch && mealMatch
  })

  const hasActiveFilters = activeCategory !== "todos" || activeMeal !== "todos"

  return (
    <>
      {/* ── Platos típicos strip ── */}
      <section className="bg-secondary border-b border-border py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
            Platos y bebidas que debes probar
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {dishesData.map(({ name, desc, icon: Icon }) => (
              <div
                key={name}
                className="flex flex-col items-center text-center gap-2 bg-card rounded-xl p-4 border border-border"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-foreground leading-snug">{name}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured restaurants ── */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pt-10 pb-2">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-5">
            Restaurantes destacados
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {featured.map((r) => (
              <FeaturedRestaurant key={r.id} restaurant={r} />
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
                  onClick={() => setActiveCategory(cat.id as RestaurantCategory | "todos")}
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
                filtersOpen || activeMeal !== "todos"
                  ? "bg-secondary text-foreground border-border"
                  : "text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Horario
            </button>

            {hasActiveFilters && (
              <button
                onClick={() => {
                  setActiveCategory("todos")
                  setActiveMeal("todos")
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
              {mealFilters.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveMeal(m.id as MealType | "todos")}
                  className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors whitespace-nowrap ${
                    activeMeal === m.id
                      ? "bg-primary text-white border-primary"
                      : "text-muted-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {m.label}
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
          {filtered.length === 1 ? "restaurante" : "restaurantes"}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No hay restaurantes con estos filtros.</p>
            <button
              onClick={() => {
                setActiveCategory("todos")
                setActiveMeal("todos")
              }}
              className="mt-4 text-sm text-primary hover:underline"
            >
              Ver todos los restaurantes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </section>

      {/* ── Gastronomic tips ── */}
      <section className="bg-secondary border-t border-border py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-8 text-center">
            Guía rápida del viajero gastronómico
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "Horarios bolivianos",
                desc: "El desayuno fuerte es entre 8–10 am (salteñas obligatorias). El almuerzo es la comida principal: 12–2 pm. La cena suele ser ligera y después de las 7 pm.",
              },
              {
                icon: Flame,
                title: "El ají: corazón de la cocina",
                desc: "Chuquisaca es el primer productor de ají deshidratado de Bolivia. El ají colorado y el amarillo dan carácter único a todos los platos. Pide llajwa (salsa picante fresca) con cada comida.",
              },
              {
                icon: Wine,
                title: "Singani y chicha",
                desc: "El singani boliviano es Patrimonio Cultural. Pruébalo en un chuflay (con gaseosa) o en un cóctel artesanal. La chicha de maíz es la bebida fermentada ancestral de la región.",
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

      {/* ── CTA Tour Gastronómico ── */}
      <section className="bg-foreground text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-white text-balance">
            ¿Quieres un tour gastronómico guiado?
          </h2>
          <p className="mt-3 text-white/70 leading-relaxed">
            Recorre los mercados, prueba los mejores platos y aprende a cocinar
            fritanga con una chef local. Cupos limitados, salida diaria a las 9 am.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/85 text-white font-semibold px-6 py-2.5 rounded-md transition-colors text-sm"
            >
              Ver tour gastronómico
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/experiencias"
              className="inline-flex items-center gap-2 border border-white/30 text-white hover:border-white font-semibold px-6 py-2.5 rounded-md transition-colors text-sm"
            >
              Clase de cocina boliviana
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
