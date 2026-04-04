export interface BookingItem {
  id: string
  name: string
  category: string
  pricePerPerson: number
  quantity: number
  date?: string
}

export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  specialRequests?: string
}

export interface PaymentInfo {
  cardNumber: string
  cardName: string
  expiry: string
  cvv: string
  saveCard: boolean
}

export interface BookingState {
  items: BookingItem[]
  customer: CustomerInfo | null
  payment: PaymentInfo | null
  step: 'details' | 'payment' | 'confirmation'
  promoCode?: string
  discount: number
}

export const TAX_RATE = 0.13 // 13% IVA Bolivia

export function calculateSubtotal(items: BookingItem[]): number {
  return items.reduce((sum, item) => sum + item.pricePerPerson * item.quantity, 0)
}

export function calculateTaxes(subtotal: number): number {
  return subtotal * TAX_RATE
}

export function calculateTotal(subtotal: number, taxes: number, discount: number): number {
  return subtotal + taxes - discount
}
