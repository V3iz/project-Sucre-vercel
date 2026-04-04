"use client"

import { SafeLink as Link } from "@/components/safe-link"
import { ArrowLeft, Shield, Leaf, CalendarCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { CheckoutProvider, useCheckout } from "@/lib/checkout-context"
import { CheckoutProgress } from "@/components/checkout/checkout-progress"
import { ReservationSummary } from "@/components/checkout/reservation-summary"
import { CustomerDetailsForm } from "@/components/checkout/customer-details-form"
import { PaymentForm } from "@/components/checkout/payment-form"
import { ConfirmationStep } from "@/components/checkout/confirmation-step"

function CheckoutContent() {
  const { state } = useCheckout()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-3 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Link>
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-serif font-bold text-sm">S</span>
                </div>
                <span className="font-serif text-lg font-semibold">Sucre</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden sm:flex bg-emerald-50 text-emerald-700 border-emerald-200">
                <Shield className="h-3 w-3 mr-1" />
                Pago Seguro
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="border-b bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4">
          <CheckoutProgress currentStep={state.step} />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {state.step === 'confirmation' ? (
          <div className="max-w-2xl mx-auto">
            <ConfirmationStep />
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Left Column - Forms */}
            <div>
              {state.step === 'details' && <CustomerDetailsForm />}
              {state.step === 'payment' && <PaymentForm />}
            </div>

            {/* Right Column - Summary */}
            <div className="lg:order-last order-first">
              <ReservationSummary />
            </div>
          </div>
        )}
      </main>

      {/* Footer Trust Bar */}
      <footer className="border-t bg-secondary/30 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span>Pago Cifrado SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-emerald-500" />
              <span>Turismo Sostenible</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-blue-500" />
              <span>Cancelacion Flexible</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export function CheckoutClient() {
  return (
    <CheckoutProvider>
      <CheckoutContent />
    </CheckoutProvider>
  )
}
