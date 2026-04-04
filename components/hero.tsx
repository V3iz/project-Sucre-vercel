"use client"

import { useState, useMemo } from "react"
import { SafeLink as Link } from "@/components/safe-link"
import { Search, MapPin, Clock, Compass, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"

function NativeSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  options: { value: string; label: string }[]
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full h-12 rounded-md border-0 bg-secondary text-sm font-medium appearance-none",
          "pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer",
          value === "" ? "text-muted-foreground" : "text-foreground"
        )}
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
    </div>
  )
}

export function Hero() {
  const [experienceType, setExperienceType] = useState("")
  const [duration, setDuration] = useState("")
  const { t } = useI18n()
  const h = t.hero

  const exploreHref = useMemo(() => {
    const params = new URLSearchParams()
    if (experienceType) params.set("tipo", experienceType)
    if (duration) params.set("duracion", duration)
    return `/experiencias${params.toString() ? `?${params.toString()}` : ""}`
  }, [experienceType, duration])

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/sucre-hero.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-40">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border mb-8">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">
              {h.badge}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6 text-balance">
            {h.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            {h.subtitle}
          </p>
        </div>
      </div>

      {/* Sticky Search Bar */}
      <div className="sticky bottom-0 z-20 bg-background/95 backdrop-blur-md border-t border-border py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl shadow-lg border border-border p-4 lg:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {/* Experience Type Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Compass className="w-4 h-4" />
                  {h.experienceLabel}
                </label>
                <NativeSelect
                  value={experienceType}
                  onChange={setExperienceType}
                  placeholder={h.experiencePlaceholder}
                  options={h.experienceTypes}
                />
              </div>

              {/* Duration Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {h.durationLabel}
                </label>
                <NativeSelect
                  value={duration}
                  onChange={setDuration}
                  placeholder={h.durationPlaceholder}
                  options={h.durationOptions}
                />
              </div>

              {/* CTA Button */}
              <div className="flex items-end">
                <Link
                  href={exploreHref}
                  className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-md bg-primary hover:bg-primary/85 text-white text-base font-semibold transition-colors shadow-sm"
                >
                  <Search className="w-5 h-5" />
                  {h.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
