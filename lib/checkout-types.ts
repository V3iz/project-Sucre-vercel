export interface BookingItem {
  id: string
  name: string
  category: string
  pricePerPerson: number
  quantity: number
  date?: string
}

export type TransportType = 'none' | 'ground' | 'air'

export interface TransportInfo {
  type: TransportType
  origin?: string
  destination?: string
  price: number
}

export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  specialRequests?: string
  transport?: TransportInfo
}

export type PaymentMethod = 'card' | 'paypal' | 'qr' | 'transfer' | 'crypto'
export type CryptoNetwork = 'bitcoin' | 'ethereum' | 'tron' | 'polygon' | 'bsc' | 'solana'
export type CryptoCurrency = 'BTC' | 'ETH' | 'USDT' | 'USDC' | 'BNB' | 'SOL'

export interface CardPaymentInfo {
  method: 'card'
  cardNumber: string
  cardName: string
  expiry: string
  cvv: string
  saveCard: boolean
}

export interface PayPalPaymentInfo {
  method: 'paypal'
  email: string
}

export interface QRPaymentInfo {
  method: 'qr'
  bank: string
  confirmed: boolean
}

export interface TransferPaymentInfo {
  method: 'transfer'
  bank: string
  referenceNumber: string
  confirmed: boolean
}

export interface CryptoPaymentInfo {
  method: 'crypto'
  currency: CryptoCurrency
  network: CryptoNetwork
  walletAddress: string
  txHash?: string
  confirmed: boolean
}

export type PaymentInfo = CardPaymentInfo | PayPalPaymentInfo | QRPaymentInfo | TransferPaymentInfo | CryptoPaymentInfo

export interface BookingState {
  items: BookingItem[]
  customer: CustomerInfo | null
  payment: PaymentInfo | null
  step: 'details' | 'payment' | 'confirmation'
  promoCode?: string
  discount: number
  transport: TransportInfo
}

export const TAX_RATE = 0.13 // 13% IVA Bolivia

export function calculateSubtotal(items: BookingItem[]): number {
  return items.reduce((sum, item) => sum + item.pricePerPerson * item.quantity, 0)
}

export function calculateTaxes(subtotal: number): number {
  return subtotal * TAX_RATE
}

export const TRANSPORT_PRICES: Record<TransportType, number> = {
  none: 0,
  ground: 35,
  air: 180,
}

export function calculateTotal(subtotal: number, taxes: number, discount: number, transportPrice = 0): number {
  return subtotal + taxes - discount + transportPrice
}
