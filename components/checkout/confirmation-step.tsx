"use client"

import { SafeLink as Link } from "@/components/safe-link"
import { CheckCircle, Download, Mail, Calendar, MapPin, Star, Quote } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useCheckout } from "@/lib/checkout-context"
import { calculateSubtotal, calculateTaxes, calculateTotal } from "@/lib/checkout-types"
import { useI18n } from "@/lib/i18n"

export function ConfirmationStep() {
  const { state, clearBooking } = useCheckout()
  const { t, language } = useI18n()
  const confirmation = t.checkout.confirmation
  const summary = t.checkout.summary

  const subtotal = calculateSubtotal(state.items)
  const taxes = calculateTaxes(subtotal)
  const total = calculateTotal(subtotal, taxes, state.discount)

  const bookingNumber = `SCR-${Date.now().toString(36).toUpperCase()}`

  const reviews = language === "es" ? [
    {
      id: 1,
      name: "María García",
      location: "Madrid, España",
      rating: 5,
      text: "Una experiencia inolvidable. El guía conocía cada rincón de Sucre y nos hizo sentir como locales.",
      date: "Marzo 2026"
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      location: "La Paz, Bolivia",
      rating: 5,
      text: "Excelente organización y atención al detalle. La gastronomía fue el punto alto del viaje.",
      date: "Febrero 2026"
    }
  ] : [
    {
      id: 1,
      name: "María García",
      location: "Madrid, Spain",
      rating: 5,
      text: "An unforgettable experience. The guide knew every corner of Sucre and made us feel like locals.",
      date: "March 2026"
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      location: "La Paz, Bolivia",
      rating: 5,
      text: "Excellent organization and attention to detail. The gastronomy was the highlight of the trip.",
      date: "February 2026"
    }
  ]

  const nextSteps = language === "es" ? [
    "Revisa tu correo electrónico para el comprobante de pago",
    "Nuestro equipo te contactará en 24-48 horas para coordinar fechas",
    "Recibirás un itinerario detallado 3 días antes de tu experiencia"
  ] : [
    "Check your email for the payment receipt",
    "Our team will contact you within 24-48 hours to coordinate dates",
    "You will receive a detailed itinerary 3 days before your experience"
  ]

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <Card className="bg-emerald-50 border-emerald-200">
        <CardContent className="py-8 text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-800 mb-2">
            {confirmation.title}
          </h2>
          <p className="text-emerald-600 mb-4">
            {confirmation.thankYou}
          </p>
          <Badge variant="outline" className="bg-white text-emerald-700 border-emerald-300 text-lg px-4 py-1">
            {bookingNumber}
          </Badge>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-lg">{confirmation.bookingDetails}</CardTitle>
          <CardDescription>
            {confirmation.emailSent}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">{confirmation.date}</p>
                <p className="text-sm text-muted-foreground">
                  {language === "es" ? "Por confirmar (te contactaremos)" : "To be confirmed (we will contact you)"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">{language === "es" ? "Punto de Encuentro" : "Meeting Point"}</p>
                <p className="text-sm text-muted-foreground">Plaza 25 de Mayo, Sucre</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Items Summary */}
          <div className="space-y-3">
            {state.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} {item.quantity === 1 ? (language === "es" ? "persona" : "person") : (language === "es" ? "personas" : "people")}
                  </p>
                </div>
                <span className="font-semibold">${(item.pricePerPerson * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{summary.subtotal}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{summary.taxes} (13%)</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            {state.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>{summary.discount}</span>
                <span>-${state.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-2">
              <span>{confirmation.total}</span>
              <span>${total.toFixed(2)} USD</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            {confirmation.whatsNext}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm">
            {nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Micro-Trust Reviews */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">
          {language === "es" ? "Lo que dicen nuestros viajeros" : "What our travelers say"}
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-secondary/30">
              <CardContent className="pt-4">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-primary/30 mb-2" />
                <p className="text-sm text-muted-foreground mb-4 italic">
                  {`"${review.text}"`}
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button variant="outline" className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          {confirmation.downloadPDF}
        </Button>
        <Link 
          href="/"
          onClick={() => clearBooking()}
          className="flex-1 h-10 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
        >
          {confirmation.backHome}
        </Link>
      </div>
    </div>
  )
}
