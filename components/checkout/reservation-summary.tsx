"use client"

import { useState } from "react"
import { Minus, Plus, Trash2, Tag, Shield, Leaf } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCheckout } from "@/lib/checkout-context"
import { calculateSubtotal, calculateTaxes, calculateTotal } from "@/lib/checkout-types"

export function ReservationSummary() {
  const { state, updateQuantity, removeItem, applyPromoCode } = useCheckout()
  const [promoInput, setPromoInput] = useState("")

  const subtotal = calculateSubtotal(state.items)
  const taxes = calculateTaxes(subtotal)
  const total = calculateTotal(subtotal, taxes, state.discount)

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      applyPromoCode(promoInput)
    }
  }

  return (
    <Card className="sticky top-24 bg-card border-2 border-border shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Resumen de Reserva</CardTitle>
          <Badge variant="outline" className="text-emerald-600 border-emerald-300 bg-emerald-50">
            <Shield className="h-3 w-3 mr-1" />
            Pago Protegido
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Booking Items */}
        <div className="space-y-3">
          {state.items.map((item) => (
            <div key={item.id} className="bg-secondary/50 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-foreground text-sm">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-background rounded-md border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <span className="font-semibold text-foreground">
                  ${(item.pricePerPerson * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Código promocional"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>
          <Button variant="outline" size="sm" onClick={handleApplyPromo}>
            Aplicar
          </Button>
        </div>

        {state.promoCode && (
          <div className="flex items-center justify-between text-sm text-emerald-600 bg-emerald-50 px-3 py-2 rounded-md">
            <span>Código {state.promoCode} aplicado</span>
            <span>-${state.discount.toFixed(2)}</span>
          </div>
        )}

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Impuestos (13% IVA)</span>
            <span>${taxes.toFixed(2)} USD</span>
          </div>
          {state.discount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Descuento</span>
              <span>-${state.discount.toFixed(2)} USD</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-foreground">Total</span>
          <div className="text-right">
            <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground ml-1">USD</span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-4 w-4 text-emerald-500" />
            <span>Pago cifrado 100% seguro con SSL</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Leaf className="h-4 w-4 text-emerald-500" />
            <span>Contribuyes al turismo sostenible</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
