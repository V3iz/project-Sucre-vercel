"use client"

import { useState, useEffect, useRef } from "react"
import { SafeLink as Link } from "@/components/safe-link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

const navHrefs = [
  { href: "/", key: "inicio" },
  { href: "/experiencias", key: "experiencias" },
  { href: "/tours", key: "tours" },
  { href: "/alojamiento", key: "alojamiento" },
  { href: "/gastronomia", key: "gastronomia" },
  { href: "/blog", key: "blog" },
  { href: "/contacto", key: "contacto" },
] as const

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { language, setLanguage, t } = useI18n()

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-lg">S</span>
            </div>
            <span className="font-serif text-xl lg:text-2xl font-semibold text-foreground tracking-tight">
              Sucre
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
            {navHrefs.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {t.nav[link.key]}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex items-center rounded-full border border-border bg-secondary overflow-hidden text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLanguage("es")}
                aria-pressed={language === "es"}
                className={cn(
                  "px-3 py-1.5 transition-colors",
                  language === "es"
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                aria-pressed={language === "en"}
                className={cn(
                  "px-3 py-1.5 transition-colors",
                  language === "en"
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                EN
              </button>
            </div>
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center rounded-md text-sm font-semibold h-9 px-4 bg-primary hover:bg-primary/85 text-white transition-colors shadow-sm"
            >
              {t.nav.reservar}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-secondary transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 bg-black/40 z-40" aria-hidden="true" />
      )}

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={cn(
          "lg:hidden fixed top-16 right-0 bottom-0 w-80 max-w-full bg-background z-50 shadow-xl",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col p-6 gap-1" aria-label="Navegación movil">
          {navHrefs.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-foreground hover:text-primary transition-colors py-3 border-b border-border last:border-0"
            >
              {t.nav[link.key]}
            </Link>
          ))}
          {/* Language toggle mobile */}
          <div className="flex items-center gap-2 pt-4">
            <span className="text-xs text-muted-foreground font-medium">
              {language === "es" ? "Idioma" : "Language"}:
            </span>
            <div className="flex items-center rounded-full border border-border bg-secondary overflow-hidden text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLanguage("es")}
                aria-pressed={language === "es"}
                className={cn(
                  "px-3 py-1.5 transition-colors",
                  language === "es"
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                aria-pressed={language === "en"}
                className={cn(
                  "px-3 py-1.5 transition-colors",
                  language === "en"
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                EN
              </button>
            </div>
          </div>
          <Link
            href="/checkout"
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full inline-flex items-center justify-center rounded-md text-sm font-semibold h-11 px-4 bg-primary hover:bg-primary/85 text-white transition-colors shadow-sm"
          >
            {t.nav.reservar}
          </Link>
        </nav>
      </div>
    </header>
  )
}
