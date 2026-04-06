"use client"

import { useState } from "react"
import { Plane, Bus, X, MapPin, ChevronDown, ChevronUp, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCheckout } from "@/lib/checkout-context"
import { TransportType, TRANSPORT_PRICES } from "@/lib/checkout-types"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

interface TransportOption {
  type: TransportType
  icon: React.ReactNode
  labelKey: "none" | "ground" | "air"
  price: number
  colorClass: string
  borderClass: string
  bgClass: string
  badgeClass: string
}

const GROUND_ROUTES = [
  "Potosí → Sucre",
  "Cochabamba → Sucre",
  "La Paz → Sucre",
  "Santa Cruz → Sucre",
  "Oruro → Sucre",
]

const AIR_ROUTES = [
  "La Paz (LPB) → Sucre (SRE)",
  "Santa Cruz (VVI) → Sucre (SRE)",
  "Cochabamba (CBB) → Sucre (SRE)",
]

export function TransportSelector() {
  const { state, setTransport } = useCheckout()
  const { t, language } = useI18n()
  const tr = t.checkout.transport

  const [expanded, setExpanded] = useState(true)
  const [originInput, setOriginInput] = useState(state.transport.origin ?? "")

  const selected = state.transport.type

  const options: TransportOption[] = [
    {
      type: "none",
      icon: <X className="h-5 w-5" />,
      labelKey: "none",
      price: TRANSPORT_PRICES.none,
      colorClass: "text-muted-foreground",
      borderClass: "border-border",
      bgClass: "bg-secondary/40",
      badgeClass: "bg-secondary text-muted-foreground",
    },
    {
      type: "ground",
      icon: <Bus className="h-5 w-5" />,
      labelKey: "ground",
      price: TRANSPORT_PRICES.ground,
      colorClass: "text-amber-700",
      borderClass: "border-amber-300",
      bgClass: "bg-amber-50",
      badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
    },
    {
      type: "air",
      icon: <Plane className="h-5 w-5" />,
      labelKey: "air",
      price: TRANSPORT_PRICES.air,
      colorClass: "text-sky-700",
      borderClass: "border-sky-300",
      bgClass: "bg-sky-50",
      badgeClass: "bg-sky-100 text-sky-800 border-sky-300",
    },
  ]

  const handleSelect = (type: TransportType) => {
    setTransport({
      type,
      price: TRANSPORT_PRICES[type],
      origin: type !== "none" ? originInput : undefined,
      destination: "Sucre, Bolivia",
    })
  }

  const handleOriginChange = (value: string) => {
    setOriginInput(value)
    if (selected !== "none") {
      setTransport({
        type: selected,
        price: TRANSPORT_PRICES[selected],
        origin: value,
        destination: "Sucre, Bolivia",
      })
    }
  }

  const selectedOption = options.find((o) => o.type === selected)!

  return (
    <Card className="border-2">
      {/* Header — clickable to collapse */}
      <CardHeader
        className="cursor-pointer select-none pb-3"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn("p-1.5 rounded-md", selectedOption.bgClass)}>
              <span className={selectedOption.colorClass}>{selectedOption.icon}</span>
            </div>
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                {tr.title}
                {selected !== "none" && (
                  <Badge
                    variant="outline"
                    className={cn("text-xs font-medium", selectedOption.badgeClass)}
                  >
                    +${TRANSPORT_PRICES[selected]} USD
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="text-xs mt-0.5">{tr.description}</CardDescription>
            </div>
          </div>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
          )}
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="space-y-4 pt-0">
          {/* Option Cards */}
          <div className="grid gap-3">
            {options.map((opt) => (
              <button
                key={opt.type}
                type="button"
                onClick={() => handleSelect(opt.type)}
                className={cn(
                  "w-full text-left rounded-xl border-2 p-4 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  selected === opt.type
                    ? `${opt.borderClass} ${opt.bgClass}`
                    : "border-border bg-background hover:border-muted-foreground/40 hover:bg-secondary/30"
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Radio indicator */}
                  <div
                    className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                      selected === opt.type
                        ? `${opt.borderClass} ${opt.bgClass}`
                        : "border-muted-foreground/40"
                    )}
                  >
                    {selected === opt.type && (
                      <div
                        className={cn(
                          "h-2.5 w-2.5 rounded-full",
                          opt.type === "none"
                            ? "bg-muted-foreground"
                            : opt.type === "ground"
                            ? "bg-amber-600"
                            : "bg-sky-600"
                        )}
                      />
                    )}
                  </div>

                  {/* Icon + label */}
                  <div
                    className={cn(
                      "flex items-center justify-center h-9 w-9 rounded-lg shrink-0",
                      selected === opt.type ? opt.bgClass : "bg-secondary"
                    )}
                  >
                    <span
                      className={cn(
                        selected === opt.type ? opt.colorClass : "text-muted-foreground"
                      )}
                    >
                      {opt.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span
                        className={cn(
                          "font-semibold text-sm",
                          selected === opt.type ? opt.colorClass : "text-foreground"
                        )}
                      >
                        {tr.options[opt.labelKey].label}
                      </span>
                      {opt.price > 0 ? (
                        <span
                          className={cn(
                            "text-sm font-bold",
                            selected === opt.type ? opt.colorClass : "text-foreground"
                          )}
                        >
                          +${opt.price} USD
                          <span className="text-xs font-normal text-muted-foreground ml-1">
                            {tr.perPerson}
                          </span>
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground font-medium">
                          {tr.free}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {tr.options[opt.labelKey].description}
                    </p>

                    {/* Routes */}
                    {opt.type !== "none" && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {(opt.type === "ground" ? GROUND_ROUTES : AIR_ROUTES).map((route) => (
                          <span
                            key={route}
                            className={cn(
                              "text-[10px] px-2 py-0.5 rounded-full border font-medium",
                              selected === opt.type
                                ? opt.badgeClass
                                : "bg-secondary text-muted-foreground border-border"
                            )}
                          >
                            {route}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Origin input — only when transport is selected */}
          {selected !== "none" && (
            <div className="space-y-2 pt-1">
              <Label htmlFor="transport-origin" className="flex items-center gap-1.5 text-sm">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                {tr.originLabel}
              </Label>
              <Input
                id="transport-origin"
                placeholder={
                  selected === "ground" ? tr.originPlaceholderGround : tr.originPlaceholderAir
                }
                value={originInput}
                onChange={(e) => handleOriginChange(e.target.value)}
                className="text-sm"
              />
              <div className="flex items-start gap-1.5 text-xs text-muted-foreground bg-secondary/50 rounded-md p-2.5">
                <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>{selected === "ground" ? tr.groundNote : tr.airNote}</span>
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
