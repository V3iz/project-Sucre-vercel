"use client"

import { useState } from "react"
import Image from "next/image"
import { 
  CreditCard, Lock, ArrowLeft, ArrowRight, Shield, 
  CheckCircle, Calendar, Leaf, CalendarCheck, Info
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCheckout } from "@/lib/checkout-context"
import { PaymentInfo } from "@/lib/checkout-types"

const paymentMethods = [
  { name: "Visa", logo: "/images/visa.svg" },
  { name: "Mastercard", logo: "/images/mastercard.svg" },
  { name: "PayPal", logo: "/images/paypal.svg" },
  { name: "QR Bolivia", logo: "/images/qr-bolivia.svg" },
]

export function PaymentForm() {
  const { setPaymentInfo, setStep } = useCheckout()
  const [form, setForm] = useState<PaymentInfo>({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    saveCard: false
  })
  const [errors, setErrors] = useState<Partial<Record<keyof PaymentInfo, string>>>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    const groups = cleaned.match(/.{1,4}/g)
    return groups ? groups.join(" ").substring(0, 19) : ""
  }

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4)
    }
    return cleaned
  }

  const validateForm = () => {
    const newErrors: Partial<Record<keyof PaymentInfo, string>> = {}
    if (!form.cardNumber.trim() || form.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Número de tarjeta inválido"
    }
    if (!form.cardName.trim()) newErrors.cardName = "Requerido"
    if (!form.expiry.trim() || form.expiry.length < 5) {
      newErrors.expiry = "Fecha inválida"
    }
    if (!form.cvv.trim() || form.cvv.length < 3) {
      newErrors.cvv = "CVV inválido"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsProcessing(true)
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      setPaymentInfo(form)
      setStep('confirmation')
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Security Badge */}
      <Card className="bg-emerald-50 border-emerald-200">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <Lock className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-800 text-sm">
                Pago Cifrado 100% Seguro
              </h3>
              <p className="text-xs text-emerald-600">
                Tus datos están protegidos con encriptación SSL de 256 bits
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <div className="space-y-3">
        <Label className="text-sm text-muted-foreground">Métodos de Pago Aceptados</Label>
        <div className="flex flex-wrap gap-3">
          {paymentMethods.map((method) => (
            <div
              key={method.name}
              className="h-10 px-4 bg-card border rounded-md flex items-center justify-center"
            >
              <span className="text-sm font-medium text-muted-foreground">{method.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Form */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Información de Pago
          </CardTitle>
          <CardDescription>
            Ingresa los datos de tu tarjeta de crédito o débito
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Número de Tarjeta *</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={form.cardNumber}
                onChange={(e) => setForm({ ...form, cardNumber: formatCardNumber(e.target.value) })}
                className={`pl-10 ${errors.cardNumber ? "border-destructive" : ""}`}
                maxLength={19}
              />
            </div>
            {errors.cardNumber && (
              <p className="text-xs text-destructive">{errors.cardNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardName">Nombre en la Tarjeta *</Label>
            <Input
              id="cardName"
              placeholder="JUAN PÉREZ"
              value={form.cardName}
              onChange={(e) => setForm({ ...form, cardName: e.target.value.toUpperCase() })}
              className={errors.cardName ? "border-destructive" : ""}
            />
            {errors.cardName && (
              <p className="text-xs text-destructive">{errors.cardName}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Fecha de Expiración *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={form.expiry}
                  onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                  className={`pl-10 ${errors.expiry ? "border-destructive" : ""}`}
                  maxLength={5}
                />
              </div>
              {errors.expiry && (
                <p className="text-xs text-destructive">{errors.expiry}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv" className="flex items-center gap-1">
                CVV *
                <Info className="h-3.5 w-3.5 text-muted-foreground" />
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="cvv"
                  type="password"
                  placeholder="123"
                  value={form.cvv}
                  onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, "") })}
                  className={`pl-10 ${errors.cvv ? "border-destructive" : ""}`}
                  maxLength={4}
                />
              </div>
              {errors.cvv && (
                <p className="text-xs text-destructive">{errors.cvv}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Checkbox
              id="saveCard"
              checked={form.saveCard}
              onCheckedChange={(checked) => setForm({ ...form, saveCard: checked as boolean })}
            />
            <Label htmlFor="saveCard" className="text-sm text-muted-foreground cursor-pointer">
              Guardar tarjeta para futuras reservas
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Cancellation Policy */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <CalendarCheck className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-800 text-sm">
                Cancelación sin fricción
              </h3>
              <p className="text-xs text-blue-600 mt-1">
                Cancela hasta 48 horas antes sin penalidad. Reprograma tu experiencia 
                cuando quieras con nuestra política de reserva flexible 365 días.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setStep('details')}
          className="flex-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <Button 
          type="submit" 
          size="lg" 
          className="flex-[2] bg-primary hover:bg-primary/90"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Procesando...
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              Pagar Ahora
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
