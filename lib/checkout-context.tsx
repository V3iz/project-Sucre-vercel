"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { BookingItem, CustomerInfo, PaymentInfo, BookingState } from "./checkout-types"

interface CheckoutContextType {
  state: BookingState
  addItem: (item: BookingItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  setCustomerInfo: (info: CustomerInfo) => void
  setPaymentInfo: (info: PaymentInfo) => void
  setStep: (step: BookingState['step']) => void
  applyPromoCode: (code: string) => void
  clearBooking: () => void
}

const initialState: BookingState = {
  items: [
    {
      id: "ruta-sabores",
      name: "Ruta de los Sabores",
      category: "Gastronómico",
      pricePerPerson: 95,
      quantity: 2,
    }
  ],
  customer: null,
  payment: null,
  step: 'details',
  discount: 0
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(initialState)

  const addItem = (item: BookingItem) => {
    setState(prev => ({
      ...prev,
      items: [...prev.items, item]
    }))
  }

  const removeItem = (id: string) => {
    setState(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }))
  }

  const updateQuantity = (id: string, quantity: number) => {
    setState(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    }))
  }

  const setCustomerInfo = (info: CustomerInfo) => {
    setState(prev => ({ ...prev, customer: info }))
  }

  const setPaymentInfo = (info: PaymentInfo) => {
    setState(prev => ({ ...prev, payment: info }))
  }

  const setStep = (step: BookingState['step']) => {
    setState(prev => ({ ...prev, step }))
  }

  const applyPromoCode = (code: string) => {
    // Simple promo code logic - could be expanded
    if (code.toUpperCase() === 'SUCRE10') {
      setState(prev => ({ ...prev, promoCode: code, discount: 10 }))
    }
  }

  const clearBooking = () => {
    setState(initialState)
  }

  return (
    <CheckoutContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      setCustomerInfo,
      setPaymentInfo,
      setStep,
      applyPromoCode,
      clearBooking
    }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider")
  }
  return context
}
