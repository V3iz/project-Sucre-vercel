"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  MessageSquare,
  Send,
  ArrowRight,
  ThumbsUp,
  Sparkles,
} from "lucide-react"

type Phase = "score" | "promoter" | "detractor" | "passive" | "submitted"

function getCategory(score: number): "promoter" | "passive" | "detractor" {
  if (score >= 9) return "promoter"
  if (score >= 7) return "passive"
  return "detractor"
}

const scoreLabels: Record<number, string> = {
  0: "Nada probable",
  1: "Muy poco probable",
  2: "Poco probable",
  3: "Algo improbable",
  4: "Indiferente",
  5: "Algo probable",
  6: "Moderadamente probable",
  7: "Bastante probable",
  8: "Muy probable",
  9: "Extremadamente probable",
  10: "¡Definitivamente!",
}

const scoreColors: Record<number, string> = {
  0:  "bg-red-100 text-red-700 border-red-300 hover:bg-red-200",
  1:  "bg-red-100 text-red-700 border-red-300 hover:bg-red-200",
  2:  "bg-red-100 text-red-700 border-red-300 hover:bg-red-200",
  3:  "bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200",
  4:  "bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200",
  5:  "bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200",
  6:  "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200",
  7:  "bg-lime-100 text-lime-700 border-lime-300 hover:bg-lime-200",
  8:  "bg-lime-100 text-lime-700 border-lime-300 hover:bg-lime-200",
  9:  "bg-green-100 text-green-700 border-green-300 hover:bg-green-200",
  10: "bg-green-100 text-green-700 border-green-300 hover:bg-green-200",
}

const scoreActiveColors: Record<number, string> = {
  0:  "bg-red-600 text-white border-red-600",
  1:  "bg-red-600 text-white border-red-600",
  2:  "bg-red-600 text-white border-red-600",
  3:  "bg-orange-500 text-white border-orange-500",
  4:  "bg-orange-500 text-white border-orange-500",
  5:  "bg-orange-500 text-white border-orange-500",
  6:  "bg-yellow-500 text-white border-yellow-500",
  7:  "bg-lime-500 text-white border-lime-500",
  8:  "bg-lime-500 text-white border-lime-500",
  9:  "bg-green-600 text-white border-green-600",
  10: "bg-green-600 text-white border-green-600",
}

export function NpsWidget() {
  const [selected, setSelected] = useState<number | null>(null)
  const [phase, setPhase] = useState<Phase>("score")
  const [feedback, setFeedback] = useState("")
  const [hoveredScore, setHoveredScore] = useState<number | null>(null)

  const handleScoreSelect = (score: number) => {
    setSelected(score)
  }

  const handleConfirm = () => {
    if (selected === null) return
    const cat = getCategory(selected)
    setPhase(cat)
  }

  const handleSubmit = () => {
    setPhase("submitted")
  }

  const displayScore = hoveredScore !== null ? hoveredScore : selected

  return (
    <section className="py-24 bg-[oklch(0.985_0.002_90)]">
      <div className="max-w-3xl mx-auto px-6">

        {/* Section label */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px w-10 bg-primary/30" />
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground font-sans">
            Tu opinión importa
          </span>
          <div className="h-px w-10 bg-primary/30" />
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">

          {/* Phase: Score selection */}
          {phase === "score" && (
            <div className="p-8 md:p-12">
              <div className="flex items-start gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground leading-snug text-balance">
                    ¿Qué tan probable es que recomiendes la experiencia en Sucre a otros viajeros?
                  </h2>
                  {displayScore !== null && (
                    <p className="mt-1.5 text-sm text-muted-foreground transition-all">
                      {scoreLabels[displayScore]}
                    </p>
                  )}
                </div>
              </div>

              {/* Score scale */}
              <div className="grid grid-cols-11 gap-1.5 mb-3">
                {Array.from({ length: 11 }, (_, i) => i).map((score) => {
                  const isSelected = selected === score
                  return (
                    <button
                      key={score}
                      onClick={() => handleScoreSelect(score)}
                      onMouseEnter={() => setHoveredScore(score)}
                      onMouseLeave={() => setHoveredScore(null)}
                      className={cn(
                        "relative aspect-square rounded-xl border-2 text-sm font-bold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isSelected
                          ? scoreActiveColors[score] + " scale-110 shadow-md"
                          : scoreColors[score]
                      )}
                      aria-label={`Puntuación ${score}`}
                      aria-pressed={isSelected}
                    >
                      {score}
                      {isSelected && (
                        <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-foreground rounded-full border-2 border-card" />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Scale extremes */}
              <div className="flex justify-between mb-8">
                <span className="text-xs text-muted-foreground">Nada probable</span>
                <span className="text-xs text-muted-foreground">Totalmente seguro</span>
              </div>

              {/* Confirm button */}
              <div className="flex justify-end">
                <button
                  onClick={handleConfirm}
                  disabled={selected === null}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                    selected !== null
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  Confirmar puntuación
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Phase: Promoter (9–10) */}
          {phase === "promoter" && (
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-100 mb-4">
                  <Sparkles className="w-8 h-8 text-green-600" />
                </div>
                <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  <Heart className="w-3.5 h-3.5" />
                  Promotor activo �� Puntuación {selected}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  ¡Gracias por tu entusiasmo!
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Eres exactamente el tipo de viajero que hace grande a Sucre. Tu voz inspira a otros a descubrir este destino único.
                </p>
              </div>

              {/* Ambassador CTA */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 text-center mb-6">
                <p className="text-sm text-green-800 font-medium mb-1">
                  Únete a la comunidad de embajadores de Sucre
                </p>
                <p className="text-xs text-green-700/80 mb-4">
                  Comparte tu aventura y conecta con viajeros que aman el patrimonio
                </p>
                <a
                  href="https://www.instagram.com/explore/tags/vivesucre/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
                >
                  <Heart className="w-4 h-4" />
                  Comparte tu viaje con #ViveSucre
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
                >
                  Finalizar sin compartir
                </button>
              </div>
            </div>
          )}

          {/* Phase: Passive (7–8) */}
          {phase === "passive" && (
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-lime-100 mb-4">
                  <ThumbsUp className="w-8 h-8 text-lime-600" />
                </div>
                <div className="inline-flex items-center gap-2 bg-lime-50 border border-lime-200 text-lime-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Satisfecho — Puntuación {selected}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  Gracias por visitarnos
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Nos alegra que hayas disfrutado. ¿Hay algo que podría convertir tu experiencia en perfecta?
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  ¿Qué podríamos mejorar para superar tus expectativas?
                  <span className="text-muted-foreground font-normal"> (opcional)</span>
                </label>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Comparte cualquier detalle que hubiera hecho tu viaje aún más especial..."
                  className="min-h-[100px] resize-none bg-muted/40 border-border focus:border-primary font-sans text-sm"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">{feedback.length}/500</p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  Enviar comentario
                </button>
              </div>
            </div>
          )}

          {/* Phase: Detractor (0–6) */}
          {phase === "detractor" && (
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-100 mb-4">
                  <MessageSquare className="w-8 h-8 text-orange-600" />
                </div>
                <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Puntuación {selected}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  Lamentamos que no fue lo que esperabas
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Tu experiencia nos importa. Cada observación nos ayuda a construir un mejor destino para todos.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-200 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-orange-700" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-orange-900 mb-1">
                      Ayúdanos a mejorar el destino. ¿En qué fallamos?
                    </label>
                    <p className="text-xs text-orange-700/80 mb-3">
                      Tu retroalimentación directa va al equipo de gestión del destino. Sí, de verdad.
                    </p>
                    <Textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Cuéntanos qué no funcionó: atención, precios, accesibilidad, higiene, señalización..."
                      className="min-h-[120px] resize-none bg-white border-orange-200 focus:border-orange-400 font-sans text-sm"
                      maxLength={600}
                    />
                    <p className="text-xs text-orange-700/60 mt-1 text-right">{feedback.length}/600</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  Enviar retroalimentación
                </button>
              </div>
            </div>
          )}

          {/* Phase: Submitted */}
          {phase === "submitted" && (
            <div className="p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                Recibido. Gracias por tu tiempo.
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto mb-6">
                Tu voz es parte del esfuerzo colectivo por hacer de Sucre un destino cada vez más extraordinario.
              </p>
              <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground text-xs font-medium px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Respuesta registrada
              </div>
            </div>
          )}

          {/* Bottom strip */}
          {phase !== "submitted" && (
            <div className="border-t border-border bg-muted/40 px-8 py-3 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Anónimo · Tiempo estimado: 30 segundos
              </p>
              <div className="flex items-center gap-1.5">
                {(["score", "promoter", "passive", "detractor"] as Phase[]).map((p) => (
                  <span
                    key={p}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-colors",
                      phase === p ? "bg-primary" : "bg-border"
                    )}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
