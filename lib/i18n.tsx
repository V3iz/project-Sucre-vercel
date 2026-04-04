"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Language = "es" | "en"

export const translations = {
  es: {
    nav: {
      inicio: "Inicio",
      experiencias: "Experiencias",
      tours: "Tours",
      alojamiento: "Alojamiento",
      gastronomia: "Gastronomía",
      blog: "Blog",
      contacto: "Contacto",
      reservar: "Reservar Ahora",
    },
    hero: {
      badge: "Patrimonio de la Humanidad UNESCO",
      title: "Sucre: El Corazón Histórico y Cultural de Bolivia",
      subtitle: "Descubre la capital del patrimonio, la gastronomía y el turismo sostenible",
      experienceLabel: "Tipo de Experiencia",
      experiencePlaceholder: "Selecciona una experiencia",
      durationLabel: "Duración",
      durationPlaceholder: "Selecciona duración",
      cta: "Explorar Destino",
      experienceTypes: [
        { value: "cultura", label: "Cultura" },
        { value: "naturaleza", label: "Naturaleza" },
        { value: "gastronomia", label: "Gastronomía" },
      ],
      durationOptions: [
        { value: "fin-de-semana", label: "Fin de semana" },
        { value: "semana-completa", label: "Semana completa" },
        { value: "nomada-digital", label: "Nómada Digital" },
      ],
    },
  },
  en: {
    nav: {
      inicio: "Home",
      experiencias: "Experiences",
      tours: "Tours",
      alojamiento: "Accommodation",
      gastronomia: "Gastronomy",
      blog: "Blog",
      contacto: "Contact",
      reservar: "Book Now",
    },
    hero: {
      badge: "UNESCO World Heritage Site",
      title: "Sucre: The Historic and Cultural Heart of Bolivia",
      subtitle: "Discover the capital of heritage, gastronomy and sustainable tourism",
      experienceLabel: "Experience Type",
      experiencePlaceholder: "Select an experience",
      durationLabel: "Duration",
      durationPlaceholder: "Select duration",
      cta: "Explore Destination",
      experienceTypes: [
        { value: "cultura", label: "Culture" },
        { value: "naturaleza", label: "Nature" },
        { value: "gastronomia", label: "Gastronomy" },
      ],
      durationOptions: [
        { value: "fin-de-semana", label: "Weekend" },
        { value: "semana-completa", label: "Full week" },
        { value: "nomada-digital", label: "Digital Nomad" },
      ],
    },
  },
} as const

type Translations = typeof translations

interface I18nContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations[Language]
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider")
  return ctx
}
