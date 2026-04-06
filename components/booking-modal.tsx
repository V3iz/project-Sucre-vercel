"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Minus, Plus, Users, Baby, Calendar, Clock, MapPin, CreditCard } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { BookingItem } from "@/lib/checkout-types"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  item: {
    id: string
    name: string
    subtitle?: string
    category: string
    price: number
    priceChild?: number
    image?: string
    duration?: string
    location?: string
    maxGroup?: number
  }
}

export function BookingModal({ isOpen, onClose, item }: BookingModalProps) {
  const router = useRouter()
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const childPrice = item.priceChild ?? Math.round(item.price * 0.5)
  const totalPrice = (adults * item.price) + (children * childPrice)
  const totalTravelers = adults + children
  const maxGroup = item.maxGroup ?? 12

  const handleAdultsChange = (delta: number) => {
    const newValue = adults + delta
    if (newValue >= 1 && (newValue + children) <= maxGroup) {
      setAdults(newValue)
    }
  }

  const handleChildrenChange = (delta: number) => {
    const newValue = children + delta
    if (newValue >= 0 && (adults + newValue) <= maxGroup) {
      setChildren(newValue)
    }
  }

  const handleContinue = () => {
    setIsSubmitting(true)
    
    const bookingItem: BookingItem = {
      id: item.id,
      name: item.name,
      category: item.category,
      pricePerPerson: item.price,
      pricePerChild: childPrice,
      quantity: totalTravelers,
      adults,
      children,
      date: date ? format(date, "yyyy-MM-dd") : undefined,
      image: item.image,
      duration: item.duration,
    }
    
    // Store in sessionStorage for checkout to pick up
    sessionStorage.setItem('pendingBooking', JSON.stringify(bookingItem))
    
    router.push('/checkout')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 bg-secondary/30">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="secondary" className="mb-2 text-xs">
                {item.category}
              </Badge>
              <DialogTitle className="font-serif text-xl font-semibold text-foreground">
                {item.name}
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-muted-foreground">
                {item.subtitle || `Reserva tu experiencia de ${item.category.toLowerCase()}`}
              </DialogDescription>
            </div>
          </div>
          
          {/* Quick Info */}
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
            {item.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {item.duration}
              </span>
            )}
            {item.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {item.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              Max {maxGroup} personas
            </span>
          </div>
        </DialogHeader>

        <div className="px-6 py-5 space-y-5">
          {/* Date Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              Fecha del tour
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "PPP", { locale: es })
                  ) : (
                    <span className="text-muted-foreground">Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Separator />

          {/* Travelers Selection */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Viajeros
            </h4>

            {/* Adults */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Adultos</p>
                  <p className="text-xs text-muted-foreground">${item.price} por persona</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleAdultsChange(-1)}
                  disabled={adults <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{adults}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleAdultsChange(1)}
                  disabled={totalTravelers >= maxGroup}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Baby className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Ninos (3-12 anos)</p>
                  <p className="text-xs text-muted-foreground">${childPrice} por nino</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleChildrenChange(-1)}
                  disabled={children <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{children}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleChildrenChange(1)}
                  disabled={totalTravelers >= maxGroup}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {totalTravelers >= maxGroup && (
              <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-md">
                Has alcanzado el maximo de {maxGroup} viajeros para este tour.
              </p>
            )}
          </div>

          <Separator />

          {/* Price Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{adults} adulto{adults !== 1 ? 's' : ''} x ${item.price}</span>
              <span>${adults * item.price}</span>
            </div>
            {children > 0 && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{children} nino{children !== 1 ? 's' : ''} x ${childPrice}</span>
                <span>${children * childPrice}</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between items-center">
              <span className="font-semibold text-foreground">Total</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-primary">${totalPrice}</span>
                <span className="text-sm text-muted-foreground ml-1">USD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-secondary/30 border-t">
          <Button 
            className="w-full" 
            size="lg" 
            onClick={handleContinue}
            disabled={isSubmitting}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Procesando...' : 'Continuar al Pago'}
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Cancelacion gratuita hasta 48h antes
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
