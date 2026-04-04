"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { SafeLink as Link } from "@/components/safe-link"
import {
  Search,
  Clock,
  Star,
  ChevronRight,
  ThumbsUp,
  X,
  BookOpen,
  ShieldCheck,
  Utensils,
  Landmark,
  Leaf,
  Map,
} from "lucide-react"
import { blogPosts, categoryMeta, type BlogCategory } from "@/lib/blog-data"

const MONTHS_ES = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
]

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number)
  return `${day} ${MONTHS_ES[month - 1]} ${year}`
}

// ─── Category filter config ───────────────────────────────────────────────────

const categoryFilters: {
  id: BlogCategory | "todos"
  label: string
  Icon: React.ElementType
}[] = [
  { id: "todos", label: "Todos", Icon: BookOpen },
  { id: "guia-viajero", label: "Guía del Viajero", Icon: Map },
  { id: "atractivos", label: "Atractivos", Icon: Landmark },
  { id: "seguridad", label: "Seguridad", Icon: ShieldCheck },
  { id: "gastronomia", label: "Gastronomía", Icon: Utensils },
  { id: "cultura", label: "Cultura", Icon: BookOpen },
  { id: "naturaleza", label: "Naturaleza", Icon: Leaf },
]

// ─── Blog Card ────────────────────────────────────────────────────────────────

function BlogCard({ post }: { post: (typeof blogPosts)[number] }) {
  const avg =
    post.initialRating.count > 0
      ? (post.initialRating.total / post.initialRating.count).toFixed(1)
      : "—"
  const meta = categoryMeta[post.category]

  return (
    <article className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <Link href={`/blog/${post.slug}`} className="relative block h-48 overflow-hidden shrink-0">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${meta.color}`}
          >
            {meta.label}
          </span>
        </div>
        {post.featured && (
          <div className="absolute top-3 right-3">
            <span className="bg-primary text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
              Destacado
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime} min de lectura
          </span>
          <span>·</span>
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-serif text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span className="font-semibold text-foreground">{avg}</span>
            <span>({post.initialRating.count} votos)</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{post.initialComments.length} comentarios</span>
          </div>
        </div>
      </div>
    </article>
  )
}

// ─── Featured post hero ───────────────────────────────────────────────────────

function FeaturedPostHero({ post }: { post: (typeof blogPosts)[number] }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative rounded-xl overflow-hidden flex items-end h-72 lg:h-80 border border-border shadow-sm"
    >
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        priority
        sizes="(max-width: 1200px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="relative z-10 p-6 w-full">
        <span
          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full mb-3 inline-block ${
            categoryMeta[post.category].color
          }`}
        >
          {categoryMeta[post.category].label}
        </span>
        <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white leading-tight text-balance max-w-xl mt-1">
          {post.title}
        </h3>
        <p className="text-white/70 text-sm mt-2 max-w-lg line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center gap-4 mt-3 text-white/60 text-xs">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime} min
          </span>
          <span className="flex items-center gap-1">
            <ThumbsUp className="w-3.5 h-3.5" />
            {(post.initialRating.total / post.initialRating.count).toFixed(1)} utilidad
          </span>
          <span className="flex items-center gap-1 text-white font-semibold">
            Leer artículo <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Main Blog Client ─────────────────────────────────────────────────────────

export function BlogClient() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "todos">("todos")
  const [search, setSearch] = useState("")

  const featured = useMemo(() => blogPosts.filter((p) => p.featured), [])

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const catMatch = activeCategory === "todos" || p.category === activeCategory
      const q = search.toLowerCase()
      const searchMatch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      return catMatch && searchMatch
    })
  }, [activeCategory, search])

  const hasActiveFilters = activeCategory !== "todos" || search.length > 0

  return (
    <>
      {/* ── Featured posts ── */}
      {featured.length > 0 && activeCategory === "todos" && !search && (
        <section className="max-w-7xl mx-auto px-4 pt-10 pb-4">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-5">
            Artículos destacados
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {featured.map((p) => (
              <FeaturedPostHero key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      {/* ── Filters ── */}
      <section className="sticky top-16 lg:top-20 z-30 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                placeholder="Buscar artículos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-sm border border-border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Buscar en el blog"
              />
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {categoryFilters.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id as BlogCategory | "todos")}
                  className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap ${
                    activeCategory === id
                      ? "bg-primary text-white border-primary"
                      : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>

            {/* Clear */}
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setActiveCategory("todos")
                  setSearch("")
                }}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Limpiar
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Post grid ── */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg">
              No se encontraron artículos para tu búsqueda.
            </p>
            <button
              onClick={() => {
                setActiveCategory("todos")
                setSearch("")
              }}
              className="mt-4 text-sm text-primary underline"
            >
              Ver todos los artículos
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              {filtered.length} artículo{filtered.length !== 1 ? "s" : ""}{" "}
              {hasActiveFilters ? "encontrados" : "disponibles"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* ── CTA newsletter ── */}
      <section className="bg-secondary border-t border-border">
        <div className="max-w-3xl mx-auto px-4 py-14 text-center">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-3 text-balance">
            Recibe los mejores consejos de viaje a Sucre
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Cada mes enviamos guías actualizadas, novedades culturales y ofertas exclusivas de tours y alojamiento.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/85 text-white font-semibold px-6 py-3 rounded-md text-sm transition-colors"
          >
            Suscribirme al boletín <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
