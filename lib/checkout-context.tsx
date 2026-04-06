"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { BookingItem, CustomerInfo, PaymentInfo, BookingState, TransportInfo } from "./checkout-types"

interface CheckoutContextType {
  state: BookingState
  addItem: (item: BookingItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  updateTravelers: (id: string, adults: number, children: number) => void
  setCustomerInfo: (info: CustomerInfo) => void
  setPaymentInfo: (info: PaymentInfo) => void
  setStep: (step: BookingState['step']) => void
  applyPromoCode: (code: string) => void
  clearBooking: () => void
  setTransport: (transport: TransportInfo) => void
  initializeFromStorage: () => void
}

const initialState: BookingState = {
  items: [],
  customer: null,
  payment: null,
  step: 'details',
  discount: 0,
  transport: { type: 'none', price: 0 },
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

  const updateTravelers = (id: string, adults: number, children: number) => {
    setState(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, adults, children, quantity: adults + children } : item
      )
    }))
  }

  const initializeFromStorage = () => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('pendingBooking')
      if (stored) {
        try {
          const item = JSON.parse(stored) as BookingItem
          setState(prev => ({
            ...prev,
            items: [item],
            step: 'details'
          }))
          sessionStorage.removeItem('pendingBooking')
        } catch (e) {
          console.error('Error parsing booking data:', e)
        }
      }
    }
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
    if (code.toUpperCase() === 'SUCRE10') {
      setState(prev => ({ ...prev, promoCode: code, discount: 10 }))
    }
  }

  const setTransport = (transport: TransportInfo) => {
    setState(prev => ({ ...prev, transport }))
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
      updateTravelers,
      setCustomerInfo,
      setPaymentInfo,
      setStep,
      applyPromoCode,
      clearBooking,
      setTransport,
      initializeFromStorage,
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
