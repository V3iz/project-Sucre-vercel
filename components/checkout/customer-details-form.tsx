"use client"

import { useState } from "react"
import { User, Mail, Phone, Globe, MessageSquare, ArrowRight, Shield, CalendarCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useCheckout } from "@/lib/checkout-context"
import { CustomerInfo } from "@/lib/checkout-types"

const countries = [
  "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Ecuador", 
  "España", "Estados Unidos", "México", "Perú", "Uruguay", "Otro"
]

export function CustomerDetailsForm() {
  const { setCustomerInfo, setStep } = useCheckout()
  const [form, setForm] = useState<CustomerInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    specialRequests: ""
  })
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({})

  const validateForm = () => {
    const newErrors: Partial<CustomerInfo> = {}
    if (!form.firstName.trim()) newErrors.firstName = "Requerido"
    if (!form.lastName.trim()) newErrors.lastName = "Requerido"
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email inválido"
    }
    if (!form.phone.trim()) newErrors.phone = "Requerido"
    if (!form.country) newErrors.country = "Requerido"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setCustomerInfo(form)
      setStep('payment')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Trust Badges */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 py-1.5 px-3">
          <Shield className="h-3.5 w-3.5 mr-1.5" />
          Datos Protegidos
        </Badge>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 py-1.5 px-3">
          <CalendarCheck className="h-3.5 w-3.5 mr-1.5" />
          Cancelación sin fricción
        </Badge>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Información Personal
          </CardTitle>
          <CardDescription>
            Los datos del viajero principal para la reserva
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre *</Label>
              <Input
                id="firstName"
                placeholder="Juan"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className={errors.firstName ? "border-destructive" : ""}
              />
              {errors.firstName && (
                <p className="text-xs text-destructive">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido *</Label>
              <Input
                id="lastName"
                placeholder="Pérez"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className={errors.lastName ? "border-destructive" : ""}
              />
              {errors.lastName && (
                <p className="text-xs text-destructive">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="juan@ejemplo.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+591 70000000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={`pl-10 ${errors.phone ? "border-destructive" : ""}`}
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">País de Residencia *</Label>
              <Select
                value={form.country}
                onValueChange={(value) => setForm({ ...form, country: value })}
              >
                <SelectTrigger className={errors.country ? "border-destructive" : ""}>
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Seleccionar país" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-xs text-destructive">{errors.country}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requests">Solicitudes Especiales (opcional)</Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="requests"
                placeholder="Alergias alimentarias, requerimientos de accesibilidad, preferencias..."
                value={form.specialRequests}
                onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                className="pl-10 min-h-[80px] resize-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
        Continuar al Pago
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}
