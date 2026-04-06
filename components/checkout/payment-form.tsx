"use client"

import { useState, useEffect } from "react"
import { 
  CreditCard, Lock, ArrowLeft, Shield, 
  Calendar, CalendarCheck, Info, Wallet,
  QrCode, Building2, Bitcoin, Copy, Check,
  ExternalLink, ChevronRight, Smartphone,
  RefreshCw, AlertCircle, CheckCircle2
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCheckout } from "@/lib/checkout-context"
import { 
  PaymentMethod, CardPaymentInfo, PayPalPaymentInfo, 
  QRPaymentInfo, TransferPaymentInfo, CryptoPaymentInfo,
  CryptoNetwork, CryptoCurrency,
  calculateSubtotal, calculateTaxes, calculateTotal, TAX_RATE
} from "@/lib/checkout-types"

// Crypto networks configuration
const cryptoNetworks: Record<CryptoCurrency, { networks: CryptoNetwork[], name: string, icon: string }> = {
  BTC: { networks: ['bitcoin'], name: 'Bitcoin', icon: '₿' },
  ETH: { networks: ['ethereum', 'polygon', 'bsc'], name: 'Ethereum', icon: 'Ξ' },
  USDT: { networks: ['ethereum', 'tron', 'polygon', 'bsc', 'solana'], name: 'Tether', icon: '₮' },
  USDC: { networks: ['ethereum', 'polygon', 'solana'], name: 'USD Coin', icon: '$' },
  BNB: { networks: ['bsc'], name: 'BNB', icon: 'B' },
  SOL: { networks: ['solana'], name: 'Solana', icon: '◎' },
}

const networkNames: Record<CryptoNetwork, string> = {
  bitcoin: 'Bitcoin Network',
  ethereum: 'Ethereum (ERC-20)',
  tron: 'Tron (TRC-20)',
  polygon: 'Polygon',
  bsc: 'BNB Smart Chain (BEP-20)',
  solana: 'Solana',
}

// Example wallet addresses (simulated)
const walletAddresses: Record<CryptoNetwork, string> = {
  bitcoin: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  ethereum: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  tron: 'TJYeasTPa6gpwnBzPZn7X8dBvzKP7kxzQm',
  polygon: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  bsc: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  solana: '7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV',
}

const bolivianBanks = [
  'Banco Union',
  'Banco Nacional de Bolivia',
  'Banco Mercantil Santa Cruz',
  'Banco de Credito BCP',
  'Banco Economico',
  'Banco FIE',
  'Banco Ganadero',
  'Banco Fortaleza',
]

export function PaymentForm() {
  const { state, setPaymentInfo, setStep } = useCheckout()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Card form state
  const [cardForm, setCardForm] = useState<Omit<CardPaymentInfo, 'method'>>({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    saveCard: false
  })
  const [cardErrors, setCardErrors] = useState<Partial<Record<string, string>>>({})

  // PayPal state
  const [paypalEmail, setPaypalEmail] = useState("")
  const [paypalStep, setPaypalStep] = useState<'input' | 'redirect' | 'confirm'>('input')
  const [paypalError, setPaypalError] = useState("")

  // QR state
  const [qrBank, setQrBank] = useState("")
  const [qrStep, setQrStep] = useState<'select' | 'scan' | 'confirm'>('select')
  const [qrTimer, setQrTimer] = useState(300)
  const [qrConfirmed, setQrConfirmed] = useState(false)

  // Transfer state
  const [transferBank, setTransferBank] = useState("")
  const [transferReference, setTransferReference] = useState("")
  const [transferStep, setTransferStep] = useState<'select' | 'details' | 'confirm'>('select')
  const [transferFile, setTransferFile] = useState<File | null>(null)

  // Crypto state
  const [cryptoCurrency, setCryptoCurrency] = useState<CryptoCurrency>('BTC')
  const [cryptoNetwork, setCryptoNetwork] = useState<CryptoNetwork>('bitcoin')
  const [cryptoStep, setCryptoStep] = useState<'select' | 'pay' | 'confirm'>('select')
  const [cryptoTxHash, setCryptoTxHash] = useState("")
  const [copied, setCopied] = useState(false)
  const [cryptoTimer, setCryptoTimer] = useState(1800)

  // Dialog for payment processing
  const [showDialog, setShowDialog] = useState(false)
  const [dialogContent, setDialogContent] = useState<{ title: string; description: string; status: 'processing' | 'success' | 'error' }>({
    title: '',
    description: '',
    status: 'processing'
  })

  // Calculate totals
  const subtotal = calculateSubtotal(state.items)
  const taxes = calculateTaxes(subtotal)
  const total = calculateTotal(subtotal, taxes, state.discount)

  // Timer effect for QR
  useEffect(() => {
    if (qrStep === 'scan' && qrTimer > 0) {
      const timer = setInterval(() => setQrTimer(t => t - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [qrStep, qrTimer])

  // Timer effect for Crypto
  useEffect(() => {
    if (cryptoStep === 'pay' && cryptoTimer > 0) {
      const timer = setInterval(() => setCryptoTimer(t => t - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [cryptoStep, cryptoTimer])

  // Reset crypto network when currency changes
  useEffect(() => {
    const availableNetworks = cryptoNetworks[cryptoCurrency].networks
    if (!availableNetworks.includes(cryptoNetwork)) {
      setCryptoNetwork(availableNetworks[0])
    }
  }, [cryptoCurrency, cryptoNetwork])

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const validateCardForm = () => {
    const newErrors: Partial<Record<string, string>> = {}
    if (!cardForm.cardNumber.trim() || cardForm.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Numero de tarjeta invalido"
    }
    if (!cardForm.cardName.trim()) newErrors.cardName = "Requerido"
    if (!cardForm.expiry.trim() || cardForm.expiry.length < 5) {
      newErrors.expiry = "Fecha invalida"
    }
    if (!cardForm.cvv.trim() || cardForm.cvv.length < 3) {
      newErrors.cvv = "CVV invalido"
    }
    setCardErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const processPayment = async () => {
    setIsProcessing(true)
    setShowDialog(true)
    setDialogContent({
      title: 'Procesando Pago',
      description: 'Por favor espere mientras procesamos su pago...',
      status: 'processing'
    })

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2500))

    setDialogContent({
      title: 'Pago Exitoso',
      description: 'Su pago ha sido procesado correctamente',
      status: 'success'
    })

    await new Promise(resolve => setTimeout(resolve, 1500))
    setShowDialog(false)
    setIsProcessing(false)
    setStep('confirmation')
  }

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateCardForm()) {
      setPaymentInfo({ method: 'card', ...cardForm })
      await processPayment()
    }
  }

  const handlePayPalSubmit = async () => {
    if (!paypalEmail.trim() || !paypalEmail.includes('@')) {
      setPaypalError('Email invalido')
      return
    }
    setPaypalError('')
    setPaypalStep('redirect')
    
    // Simulate PayPal redirect
    await new Promise(resolve => setTimeout(resolve, 2000))
    setPaypalStep('confirm')
  }

  const handlePayPalConfirm = async () => {
    setPaymentInfo({ method: 'paypal', email: paypalEmail })
    await processPayment()
  }

  const handleQRConfirm = async () => {
    setPaymentInfo({ method: 'qr', bank: qrBank, confirmed: true })
    await processPayment()
  }

  const handleTransferSubmit = async () => {
    if (!transferReference.trim()) return
    setPaymentInfo({ 
      method: 'transfer', 
      bank: transferBank, 
      referenceNumber: transferReference,
      confirmed: true 
    })
    await processPayment()
  }

  const handleCryptoConfirm = async () => {
    if (!cryptoTxHash.trim()) return
    setPaymentInfo({ 
      method: 'crypto', 
      currency: cryptoCurrency, 
      network: cryptoNetwork,
      walletAddress: walletAddresses[cryptoNetwork],
      txHash: cryptoTxHash,
      confirmed: true 
    })
    await processPayment()
  }

  return (
    <div className="space-y-6">
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
                Tus datos estan protegidos con encriptacion SSL de 256 bits
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Selector */}
      <Card className="border-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Selecciona tu Metodo de Pago</CardTitle>
          <CardDescription>Elige la opcion que prefieras para completar tu reserva</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
            <TabsList className="grid grid-cols-5 h-auto gap-2 bg-transparent p-0">
              <TabsTrigger 
                value="card" 
                className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border rounded-lg"
              >
                <CreditCard className="h-5 w-5" />
                <span className="text-xs">Tarjeta</span>
              </TabsTrigger>
              <TabsTrigger 
                value="paypal" 
                className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border rounded-lg"
              >
                <Wallet className="h-5 w-5" />
                <span className="text-xs">PayPal</span>
              </TabsTrigger>
              <TabsTrigger 
                value="qr" 
                className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border rounded-lg"
              >
                <QrCode className="h-5 w-5" />
                <span className="text-xs">QR</span>
              </TabsTrigger>
              <TabsTrigger 
                value="transfer" 
                className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border rounded-lg"
              >
                <Building2 className="h-5 w-5" />
                <span className="text-xs">Transfer</span>
              </TabsTrigger>
              <TabsTrigger 
                value="crypto" 
                className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border rounded-lg"
              >
                <Bitcoin className="h-5 w-5" />
                <span className="text-xs">Crypto</span>
              </TabsTrigger>
            </TabsList>

            {/* Credit/Debit Card */}
            <TabsContent value="card" className="mt-6">
              <form onSubmit={handleCardSubmit} className="space-y-4">
                <div className="flex gap-2 mb-4">
                  {['Visa', 'Mastercard', 'Amex'].map(card => (
                    <Badge key={card} variant="outline" className="py-1.5 px-3">{card}</Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Numero de Tarjeta *</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardForm.cardNumber}
                      onChange={(e) => setCardForm({ ...cardForm, cardNumber: formatCardNumber(e.target.value) })}
                      className={`pl-10 ${cardErrors.cardNumber ? "border-destructive" : ""}`}
                      maxLength={19}
                    />
                  </div>
                  {cardErrors.cardNumber && (
                    <p className="text-xs text-destructive">{cardErrors.cardNumber}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Nombre en la Tarjeta *</Label>
                  <Input
                    id="cardName"
                    placeholder="JUAN PEREZ"
                    value={cardForm.cardName}
                    onChange={(e) => setCardForm({ ...cardForm, cardName: e.target.value.toUpperCase() })}
                    className={cardErrors.cardName ? "border-destructive" : ""}
                  />
                  {cardErrors.cardName && (
                    <p className="text-xs text-destructive">{cardErrors.cardName}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Fecha de Expiracion *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardForm.expiry}
                        onChange={(e) => setCardForm({ ...cardForm, expiry: formatExpiry(e.target.value) })}
                        className={`pl-10 ${cardErrors.expiry ? "border-destructive" : ""}`}
                        maxLength={5}
                      />
                    </div>
                    {cardErrors.expiry && (
                      <p className="text-xs text-destructive">{cardErrors.expiry}</p>
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
                        value={cardForm.cvv}
                        onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, "") })}
                        className={`pl-10 ${cardErrors.cvv ? "border-destructive" : ""}`}
                        maxLength={4}
                      />
                    </div>
                    {cardErrors.cvv && (
                      <p className="text-xs text-destructive">{cardErrors.cvv}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Checkbox
                    id="saveCard"
                    checked={cardForm.saveCard}
                    onCheckedChange={(checked) => setCardForm({ ...cardForm, saveCard: checked as boolean })}
                  />
                  <Label htmlFor="saveCard" className="text-sm text-muted-foreground cursor-pointer">
                    Guardar tarjeta para futuras reservas
                  </Label>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                  <Shield className="mr-2 h-4 w-4" />
                  Pagar ${total.toFixed(2)} USD
                </Button>
              </form>
            </TabsContent>

            {/* PayPal */}
            <TabsContent value="paypal" className="mt-6">
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">PayPal</div>
                  <p className="text-sm text-blue-700">Paga de forma segura con tu cuenta PayPal</p>
                </div>

                {paypalStep === 'input' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="paypalEmail">Email de PayPal *</Label>
                      <Input
                        id="paypalEmail"
                        type="email"
                        placeholder="tu-email@ejemplo.com"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                        className={paypalError ? "border-destructive" : ""}
                      />
                      {paypalError && <p className="text-xs text-destructive">{paypalError}</p>}
                    </div>
                    <Button onClick={handlePayPalSubmit} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Continuar con PayPal
                    </Button>
                  </div>
                )}

                {paypalStep === 'redirect' && (
                  <div className="text-center py-8">
                    <div className="h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Redirigiendo a PayPal...</p>
                    <p className="text-xs text-muted-foreground mt-2">Por favor espere</p>
                  </div>
                )}

                {paypalStep === 'confirm' && (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                        <div>
                          <p className="font-semibold text-green-800">Cuenta verificada</p>
                          <p className="text-sm text-green-600">{paypalEmail}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total a pagar:</span>
                        <span className="text-2xl font-bold">${total.toFixed(2)} USD</span>
                      </div>
                    </div>
                    <Button onClick={handlePayPalConfirm} className="w-full bg-blue-600 hover:bg-blue-700" size="lg" disabled={isProcessing}>
                      <Shield className="mr-2 h-4 w-4" />
                      Confirmar Pago con PayPal
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full" 
                      onClick={() => setPaypalStep('input')}
                    >
                      Usar otra cuenta
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* QR Payment */}
            <TabsContent value="qr" className="mt-6">
              <div className="space-y-4">
                {qrStep === 'select' && (
                  <>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                      <QrCode className="h-10 w-10 text-purple-600 mx-auto mb-2" />
                      <p className="font-semibold text-purple-800">Pago QR Bolivia</p>
                      <p className="text-sm text-purple-600">Escanea y paga desde tu app bancaria</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Selecciona tu Banco</Label>
                      <Select value={qrBank} onValueChange={setQrBank}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un banco" />
                        </SelectTrigger>
                        <SelectContent>
                          {bolivianBanks.map(bank => (
                            <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={() => setQrStep('scan')} 
                      className="w-full bg-purple-600 hover:bg-purple-700" 
                      size="lg"
                      disabled={!qrBank}
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      Generar Codigo QR
                    </Button>
                  </>
                )}

                {qrStep === 'scan' && (
                  <div className="space-y-4">
                    <div className="bg-secondary/30 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Banco seleccionado: <span className="font-semibold">{qrBank}</span></p>
                      <div className="bg-white p-4 rounded-lg inline-block shadow-sm border">
                        {/* Simulated QR Code */}
                        <div className="w-48 h-48 relative mx-auto">
                          <div className="absolute inset-0 grid grid-cols-8 gap-0.5">
                            {Array.from({ length: 64 }).map((_, i) => (
                              <div 
                                key={i} 
                                className={`aspect-square ${Math.random() > 0.4 ? 'bg-foreground' : 'bg-white'}`}
                              />
                            ))}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white p-2 rounded">
                              <span className="text-primary font-bold text-lg">S</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Monto:</span>
                          <span className="font-bold">${total.toFixed(2)} USD</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Equivalente BOB:</span>
                          <span className="font-semibold">Bs. {(total * 6.96).toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-center gap-2 text-orange-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Expira en: <span className="font-mono font-bold">{formatTime(qrTimer)}</span></span>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Smartphone className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-semibold text-amber-800">Instrucciones:</p>
                          <ol className="list-decimal list-inside text-amber-700 space-y-1 mt-1">
                            <li>Abre la app de tu banco</li>
                            <li>Selecciona "Pagar con QR"</li>
                            <li>Escanea el codigo</li>
                            <li>Confirma el pago</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="qrConfirm" 
                        checked={qrConfirmed}
                        onCheckedChange={(checked) => setQrConfirmed(checked as boolean)}
                      />
                      <Label htmlFor="qrConfirm" className="text-sm cursor-pointer">
                        Ya realice el pago desde mi app bancaria
                      </Label>
                    </div>

                    <Button 
                      onClick={handleQRConfirm} 
                      className="w-full" 
                      size="lg"
                      disabled={!qrConfirmed || isProcessing}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Confirmar Pago
                    </Button>

                    <Button 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => {
                        setQrStep('select')
                        setQrTimer(300)
                        setQrConfirmed(false)
                      }}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Generar nuevo codigo
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Bank Transfer */}
            <TabsContent value="transfer" className="mt-6">
              <div className="space-y-4">
                {transferStep === 'select' && (
                  <>
                    <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
                      <Building2 className="h-10 w-10 text-teal-600 mx-auto mb-2" />
                      <p className="font-semibold text-teal-800">Transferencia Bancaria</p>
                      <p className="text-sm text-teal-600">Realiza una transferencia directa</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Desde que banco realizaras la transferencia?</Label>
                      <Select value={transferBank} onValueChange={setTransferBank}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu banco" />
                        </SelectTrigger>
                        <SelectContent>
                          {bolivianBanks.map(bank => (
                            <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={() => setTransferStep('details')} 
                      className="w-full bg-teal-600 hover:bg-teal-700" 
                      size="lg"
                      disabled={!transferBank}
                    >
                      Ver datos de cuenta
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                )}

                {transferStep === 'details' && (
                  <div className="space-y-4">
                    <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
                      <h4 className="font-semibold text-center">Datos para Transferencia</h4>
                      <Separator />
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Banco:</span>
                          <span className="font-semibold">Banco Union</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Cuenta:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-semibold">10000012345678</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => copyToClipboard('10000012345678')}
                            >
                              {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tipo:</span>
                          <span className="font-semibold">Caja de Ahorros</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Moneda:</span>
                          <span className="font-semibold">Dolares (USD)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Titular:</span>
                          <span className="font-semibold">Sucre Tourism S.R.L.</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">NIT:</span>
                          <span className="font-semibold">123456789</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-base">
                          <span className="text-muted-foreground">Monto a transferir:</span>
                          <span className="font-bold text-primary">${total.toFixed(2)} USD</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-sm text-amber-700">
                        <strong>Importante:</strong> Incluye tu numero de reserva en el concepto de la transferencia para agilizar la verificacion.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="transferRef">Numero de Comprobante/Referencia *</Label>
                      <Input
                        id="transferRef"
                        placeholder="Ej: 123456789"
                        value={transferReference}
                        onChange={(e) => setTransferReference(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Ingresa el numero de operacion de tu transferencia
                      </p>
                    </div>

                    <Button 
                      onClick={handleTransferSubmit} 
                      className="w-full" 
                      size="lg"
                      disabled={!transferReference || isProcessing}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Confirmar Transferencia
                    </Button>

                    <Button 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => setTransferStep('select')}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Volver
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Cryptocurrency */}
            <TabsContent value="crypto" className="mt-6">
              <div className="space-y-4">
                {cryptoStep === 'select' && (
                  <>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                      <Bitcoin className="h-10 w-10 text-orange-500 mx-auto mb-2" />
                      <p className="font-semibold text-orange-800">Pago con Criptomonedas</p>
                      <p className="text-sm text-orange-600">BTC, ETH, USDT, USDC y mas</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Selecciona la Criptomoneda</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {(Object.keys(cryptoNetworks) as CryptoCurrency[]).map((crypto) => (
                            <Button
                              key={crypto}
                              type="button"
                              variant={cryptoCurrency === crypto ? "default" : "outline"}
                              className="flex flex-col h-auto py-3"
                              onClick={() => setCryptoCurrency(crypto)}
                            >
                              <span className="text-lg font-bold">{cryptoNetworks[crypto].icon}</span>
                              <span className="text-xs">{crypto}</span>
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Selecciona la Red</Label>
                        <Select value={cryptoNetwork} onValueChange={(v) => setCryptoNetwork(v as CryptoNetwork)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una red" />
                          </SelectTrigger>
                          <SelectContent>
                            {cryptoNetworks[cryptoCurrency].networks.map(network => (
                              <SelectItem key={network} value={network}>
                                {networkNames[network]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Asegurate de seleccionar la red correcta para evitar perdida de fondos
                        </p>
                      </div>
                    </div>

                    <Button 
                      onClick={() => setCryptoStep('pay')} 
                      className="w-full bg-orange-500 hover:bg-orange-600" 
                      size="lg"
                    >
                      Continuar
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                )}

                {cryptoStep === 'pay' && (
                  <div className="space-y-4">
                    <div className="bg-secondary/30 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                          {cryptoCurrency}
                        </Badge>
                        <Badge variant="outline">
                          {networkNames[cryptoNetwork]}
                        </Badge>
                      </div>
                      
                      {/* Simulated QR Code for Crypto */}
                      <div className="bg-white p-4 rounded-lg inline-block shadow-sm border">
                        <div className="w-40 h-40 relative mx-auto">
                          <div className="absolute inset-0 grid grid-cols-8 gap-0.5">
                            {Array.from({ length: 64 }).map((_, i) => (
                              <div 
                                key={i} 
                                className={`aspect-square ${Math.random() > 0.4 ? 'bg-foreground' : 'bg-white'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-xs text-muted-foreground mb-1">Direccion de {cryptoCurrency}:</p>
                        <div className="flex items-center justify-center gap-2 bg-white rounded border p-2">
                          <code className="text-xs font-mono break-all">
                            {walletAddresses[cryptoNetwork].slice(0, 20)}...{walletAddresses[cryptoNetwork].slice(-8)}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 flex-shrink-0"
                            onClick={() => copyToClipboard(walletAddresses[cryptoNetwork])}
                          >
                            {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total USD:</span>
                          <span className="font-bold">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Equivalente {cryptoCurrency}:</span>
                          <span className="font-semibold">
                            {cryptoCurrency === 'BTC' ? (total / 65000).toFixed(6) :
                             cryptoCurrency === 'ETH' ? (total / 3500).toFixed(5) :
                             cryptoCurrency === 'BNB' ? (total / 580).toFixed(4) :
                             cryptoCurrency === 'SOL' ? (total / 140).toFixed(3) :
                             total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-center gap-2 text-orange-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Expira en: <span className="font-mono font-bold">{formatTime(cryptoTimer)}</span></span>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-red-700">
                          <p className="font-semibold">Importante:</p>
                          <ul className="list-disc list-inside mt-1 space-y-1">
                            <li>Envia solo <strong>{cryptoCurrency}</strong> a esta direccion</li>
                            <li>Usa la red <strong>{networkNames[cryptoNetwork]}</strong></li>
                            <li>Enviar otro token resultara en perdida de fondos</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="txHash">Hash de Transaccion (TX Hash) *</Label>
                      <Input
                        id="txHash"
                        placeholder="0x..."
                        value={cryptoTxHash}
                        onChange={(e) => setCryptoTxHash(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Ingresa el hash de tu transaccion para verificacion
                      </p>
                    </div>

                    <Button 
                      onClick={handleCryptoConfirm} 
                      className="w-full" 
                      size="lg"
                      disabled={!cryptoTxHash || isProcessing}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Confirmar Pago
                    </Button>

                    <Button 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => {
                        setCryptoStep('select')
                        setCryptoTimer(1800)
                      }}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Cambiar criptomoneda/red
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Cancellation Policy */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <CalendarCheck className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-800 text-sm">
                Cancelacion sin friccion
              </h3>
              <p className="text-xs text-blue-600 mt-1">
                Cancela hasta 48 horas antes sin penalidad. Reprograma tu experiencia 
                cuando quieras con nuestra politica de reserva flexible 365 dias.
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
      </div>

      {/* Processing Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {dialogContent.status === 'processing' && (
                <div className="h-5 w-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              )}
              {dialogContent.status === 'success' && (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              )}
              {dialogContent.status === 'error' && (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              {dialogContent.title}
            </DialogTitle>
            <DialogDescription>
              {dialogContent.description}
            </DialogDescription>
          </DialogHeader>
          {dialogContent.status === 'processing' && (
            <div className="flex flex-col items-center py-6">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
              <p className="text-sm text-muted-foreground">No cierres esta ventana</p>
            </div>
          )}
          {dialogContent.status === 'success' && (
            <div className="flex flex-col items-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-sm text-muted-foreground">Redirigiendo...</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
