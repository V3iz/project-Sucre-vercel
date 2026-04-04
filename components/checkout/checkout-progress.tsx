"use client"

import { Check, User, CreditCard, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckoutProgressProps {
  currentStep: 'details' | 'payment' | 'confirmation'
}

const steps = [
  { id: 'details', label: 'Datos Personales', icon: User },
  { id: 'payment', label: 'Pago Seguro', icon: CreditCard },
  { id: 'confirmation', label: 'Confirmación', icon: CheckCircle },
]

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const currentIndex = steps.findIndex(s => s.id === currentStep)

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isComplete = index < currentIndex
          const isCurrent = index === currentIndex
          const isPending = index > currentIndex

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isComplete && "bg-emerald-500 border-emerald-500 text-white",
                    isCurrent && "bg-primary border-primary text-primary-foreground",
                    isPending && "bg-muted border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {isComplete ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium text-center",
                    isCurrent && "text-foreground",
                    !isCurrent && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      index < currentIndex ? "bg-emerald-500" : "bg-muted"
                    )}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
