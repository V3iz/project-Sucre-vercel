"use client"

import { useState } from "react"
import Image from "next/image"
import { SafeLink as Link } from "@/components/safe-link"
import {
  Clock,
  Star,
  ThumbsUp,
  Send,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  Quote,
  CheckCircle2,
  ListChecks,
  User,
} from "lucide-react"
import {
  type BlogPost,
  type Comment,
  type BlogSection,
  categoryMeta,
  getRelatedPosts,
} from "@/lib/blog-data"

const MONTHS_ES = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
]
const MONTHS_LONG_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
]

function formatDate(iso: string, long = false): string {
  const [year, month, day] = iso.split("-").map(Number)
  const m = long ? MONTHS_LONG_ES[month - 1] : MONTHS_ES[month - 1]
  return `${day} ${m} ${year}`
}

// ─── Rating Widget ────────────────────────────────────────────────────────────

function RatingWidget({
  initialTotal,
  initialCount,
}: {
  initialTotal: number
  initialCount: number
}) {
  const [total, setTotal] = useState(initialTotal)
  const [count, setCount] = useState(initialCount)
  const [userRating, setUserRating] = useState<number | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  const avg = count > 0 ? total / count : 0

  function handleRate(stars: number) {
    if (userRating !== null) return
    setTotal((t) => t + stars)
    setCount((c) => c + 1)
    setUserRating(stars)
  }

  return (
    <div className="bg-secondary rounded-xl border border-border p-5 flex flex-col sm:flex-row items-center gap-5">
      <div className="text-center">
        <p className="text-4xl font-serif font-bold text-primary">{avg.toFixed(1)}</p>
        <p className="text-xs text-muted-foreground mt-1">{count} valoraciones</p>
      </div>

      <div className="flex-1 flex flex-col items-center sm:items-start gap-2">
        <p className="text-sm font-semibold text-foreground">
          {userRating ? "Gracias por tu valoración" : "¿Te resultó útil este artículo?"}
        </p>
        <div className="flex items-center gap-1" role="group" aria-label="Calificar artículo">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={userRating !== null}
              onClick={() => handleRate(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              aria-label={`Calificar con ${star} estrellas`}
              className="disabled:cursor-default transition-transform hover:scale-110"
            >
              <Star
                className={`w-6 h-6 transition-colors ${
                  star <= (hovered ?? userRating ?? 0)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-none text-muted-foreground/40"
                }`}
              />
            </button>
          ))}
        </div>
        {userRating && (
          <p className="text-xs text-green-600 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Calificaste con {userRating} estrellas
          </p>
        )}
      </div>

      <div className="text-center">
        <ThumbsUp className="w-8 h-8 text-primary/40 mx-auto mb-1" />
        <p className="text-xs text-muted-foreground">Utilidad</p>
      </div>
    </div>
  )
}

// ─── Comments ─────────────────────────────────────────────────────────────────

function CommentsSection({ initial }: { initial: Comment[] }) {
  const [comments, setComments] = useState<Comment[]>(initial)
  const [author, setAuthor] = useState("")
  const [text, setText] = useState("")
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!author.trim()) { setError("Por favor ingresa tu nombre."); return }
    if (!text.trim() || text.trim().length < 10) { setError("El comentario debe tener al menos 10 caracteres."); return }
    if (rating === 0) { setError("Por favor selecciona una calificación."); return }

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: author.trim(),
      date: new Date().toISOString().split("T")[0],
      text: text.trim(),
      rating,
    }
    setComments((prev) => [newComment, ...prev])
    setAuthor("")
    setText("")
    setRating(0)
    setError(null)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section aria-label="Comentarios" className="mt-10">
      <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
        Comentarios ({comments.length})
      </h2>

      {/* Form */}
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-foreground mb-4">Deja tu comentario</h3>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="comment-author" className="text-sm font-medium text-foreground">
                Tu nombre <span className="text-destructive">*</span>
              </label>
              <input
                id="comment-author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ej: Ana García"
                className="border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                maxLength={60}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <p className="text-sm font-medium text-foreground">
                Utilidad del artículo <span className="text-destructive">*</span>
              </p>
              <div
                className="flex items-center gap-1"
                role="group"
                aria-label="Calificación del comentario"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    aria-label={`${star} estrellas`}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        star <= (hovered || rating)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-none text-muted-foreground/40"
                      }`}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="text-xs text-muted-foreground ml-2">
                    {["", "Poco útil", "Regular", "Útil", "Muy útil", "Excelente"][rating]}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="comment-text" className="text-sm font-medium text-foreground">
              Comentario <span className="text-destructive">*</span>
            </label>
            <textarea
              id="comment-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="¿Qué te pareció este artículo? ¿Tienes algo que añadir?"
              className="border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none leading-relaxed"
              maxLength={600}
            />
            <p className="text-xs text-muted-foreground text-right">{text.length}/600</p>
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {error}
            </p>
          )}

          {submitted && (
            <p role="status" className="text-sm text-green-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Comentario publicado. ¡Gracias por tu aporte!
            </p>
          )}

          <button
            type="submit"
            className="self-start inline-flex items-center gap-2 bg-primary hover:bg-primary/85 text-white font-semibold px-5 py-2.5 rounded-md text-sm transition-colors"
          >
            <Send className="w-4 h-4" />
            Publicar comentario
          </button>
        </form>
      </div>

      {/* Comment list */}
      {comments.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-8">
          Sé el primero en comentar este artículo.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {comments.map((c) => (
            <li
              key={c.id}
              className="bg-card border border-border rounded-xl p-5 flex gap-4"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="font-semibold text-sm text-foreground">{c.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(c.date)}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= c.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-none text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

// ─── Content Renderer ─────────────────────────────────────────────────────────

function renderSection(section: BlogSection, idx: number) {
  switch (section.type) {
    case "heading":
      return (
        <h2
          key={idx}
          className="font-serif text-xl font-semibold text-foreground mt-8 mb-3"
        >
          {section.text}
        </h2>
      )
    case "paragraph":
      return (
        <p key={idx} className="text-base text-foreground leading-relaxed">
          {section.text}
        </p>
      )
    case "list":
      return (
        <ul key={idx} className="flex flex-col gap-2 my-2">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground leading-relaxed">
              <ListChecks className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case "tip":
      return (
        <div
          key={idx}
          className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 my-4"
        >
          <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-semibold text-primary">Consejo: </span>
            {section.text}
          </p>
        </div>
      )
    case "warning":
      return (
        <div
          key={idx}
          className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 my-4"
        >
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            <span className="font-semibold">Importante: </span>
            {section.text}
          </p>
        </div>
      )
    case "quote":
      return (
        <blockquote
          key={idx}
          className="border-l-4 border-primary pl-5 my-6 italic"
        >
          <p className="text-base text-foreground leading-relaxed flex gap-2">
            <Quote className="w-4 h-4 text-primary/40 shrink-0 mt-1" />
            {section.text}
          </p>
          {section.author && (
            <footer className="text-xs text-muted-foreground mt-2">
              — {section.author}
            </footer>
          )}
        </blockquote>
      )
    default:
      return null
  }
}

// ─── Full Post View ───────────────────────────────────────────────────────────

export function BlogPostClient({ post }: { post: BlogPost }) {
  const related = getRelatedPosts(post.relatedSlugs)
  const meta = categoryMeta[post.category]

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-10">

        {/* ── Main column ── */}
        <article className="flex-1 min-w-0">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground line-clamp-1">{post.title}</span>
          </nav>

          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${meta.color}`}>
              {meta.label}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime} min de lectura
            </span>
            <time
              dateTime={post.publishedAt}
              className="text-xs text-muted-foreground"
            >
              {formatDate(post.publishedAt, true)}
            </time>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground leading-tight text-balance mb-4">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.authorRole}</p>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative w-full h-64 lg:h-80 rounded-xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 800px"
            />
          </div>

          {/* Content */}
          <div className="prose-like flex flex-col gap-4">
            {post.content.map((section, idx) => renderSection(section, idx))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Rating widget */}
          <div className="mt-8">
            <RatingWidget
              initialTotal={post.initialRating.total}
              initialCount={post.initialRating.count}
            />
          </div>

          {/* Comments */}
          <CommentsSection initial={post.initialComments} />
        </article>

        {/* ── Sidebar ── */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="sticky top-24 flex flex-col gap-6">

            {/* Article summary */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-serif font-semibold text-foreground mb-3 text-sm">
                En este artículo
              </h3>
              <ul className="flex flex-col gap-2">
                {post.content
                  .filter((s) => s.type === "heading")
                  .map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary font-bold shrink-0">{i + 1}.</span>
                      <span className="leading-snug">{s.text}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-serif font-semibold text-foreground mb-4 text-sm">
                  Artículos relacionados
                </h3>
                <ul className="flex flex-col gap-4">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/blog/${r.slug}`}
                        className="flex gap-3 group"
                      >
                        <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={r.image}
                            alt={r.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                            {r.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {r.readingTime} min
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick CTA */}
            <div className="bg-primary rounded-xl p-5 text-white">
              <h3 className="font-serif font-semibold text-lg mb-2">
                Planifica tu viaje
              </h3>
              <p className="text-white/75 text-xs leading-relaxed mb-4">
                Nuestros expertos locales te ayudan a diseñar la experiencia perfecta en Sucre.
              </p>
              <Link
                href="/tours"
                className="block text-center bg-white text-primary font-semibold text-sm py-2 rounded-md hover:bg-white/90 transition-colors"
              >
                Explorar tours
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
