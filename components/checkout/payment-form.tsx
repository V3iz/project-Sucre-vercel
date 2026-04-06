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
  PaymentMethod, CardPaymentInfo, 
  CryptoNetwork, CryptoCurrency,
  calculateSubtotal, calculateTaxes, calculateTotal
} from "@/lib/checkout-types"
import { useI18n } from "@/lib/i18n"

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
  const { t } = useI18n()
  const pay = t.checkout.payment
  
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
      newErrors.cardNumber = pay.invalidCard
    }
    if (!cardForm.cardName.trim()) newErrors.cardName = pay.required
    if (!cardForm.expiry.trim() || cardForm.expiry.length < 5) {
      newErrors.expiry = pay.invalidDate
    }
    if (!cardForm.cvv.trim() || cardForm.cvv.length < 3) {
      newErrors.cvv = pay.invalidCVV
    }
    setCardErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const processPayment = async () => {
    setIsProcessing(true)
    setShowDialog(true)
    setDialogContent({
      title: pay.processingPayment,
      description: pay.processingDescription,
      status: 'processing'
    })

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2500))

    setDialogContent({
      title: pay.paymentSuccess,
      description: pay.paymentSuccessDesc,
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
      setPaypalError(pay.invalidCard)
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
      {/* Processing Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {dialogContent.status === 'processing' && (
                <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              )}
              {dialogContent.status === 'success' && (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              )}
              {dialogContent.title}
            </DialogTitle>
            <DialogDescription>{dialogContent.description}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Security Badge */}
      <Card className="bg-emerald-50 border-emerald-200">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <Lock className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-800 text-sm">
                {pay.secureTitle}
              </h3>
              <p className="text-xs text-emerald-600">
                {pay.secureDescription}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Selector */}
      <Card className="border-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">{pay.selectMethod}</CardTitle>
          <CardDescription>{pay.selectMethodDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
            <TabsList className="grid grid-cols-5 h-auto gap-2 bg-transparent p-0">
              <TabsTrigger 
                value="card" 
                className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border rounded-lg"
              >
                <CreditCard className="h-5 w-5" />
                <span className="text-xs">{pay.card}</span>
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
                <span className="text-xs">{pay.qr}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="transfer" 
                className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border rounded-lg"
              >
                <Building2 className="h-5 w-5" />
                <span className="text-xs">{pay.transfer}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="crypto" 
                className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border rounded-lg"
              >
                <Bitcoin className="h-5 w-5" />
                <span className="text-xs">{pay.crypto}</span>
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
                  <Label htmlFor="cardNumber">{pay.cardNumber} *</Label>
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
                  <Label htmlFor="cardName">{pay.cardName} *</Label>
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
                    <Label htmlFor="expiry">{pay.expiry} *</Label>
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
                    {pay.saveCard}
                  </Label>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                  <Shield className="mr-2 h-4 w-4" />
                  {pay.pay} ${total.toFixed(2)} USD
                </Button>
              </form>
            </TabsContent>

            {/* PayPal */}
            <TabsContent value="paypal" className="mt-6">
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">PayPal</div>
                  <p className="text-sm text-blue-700">{pay.paypalSecure}</p>
                </div>

                {paypalStep === 'input' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="paypalEmail">{pay.paypalEmail} *</Label>
                      <Input
                        id="paypalEmail"
                        type="email"
                        placeholder="email@example.com"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                        className={paypalError ? "border-destructive" : ""}
                      />
                      {paypalError && <p className="text-xs text-destructive">{paypalError}</p>}
                    </div>
                    <Button onClick={handlePayPalSubmit} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {pay.continuePaypal}
                    </Button>
                  </div>
                )}

                {paypalStep === 'redirect' && (
                  <div className="text-center py-8">
                    <div className="h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">{pay.redirectingPaypal}</p>
                    <p className="text-xs text-muted-foreground mt-2">{pay.pleaseWait}</p>
                  </div>
                )}

                {paypalStep === 'confirm' && (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                        <div>
                          <p className="font-semibold text-green-800">{pay.accountVerified}</p>
                          <p className="text-sm text-green-600">{paypalEmail}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">{pay.totalToPay}</span>
                        <span className="text-2xl font-bold">${total.toFixed(2)} USD</span>
                      </div>
                    </div>
                    <Button onClick={handlePayPalConfirm} className="w-full bg-blue-600 hover:bg-blue-700" size="lg" disabled={isProcessing}>
                      <Shield className="mr-2 h-4 w-4" />
                      {pay.confirmPayment}
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
                      <p className="font-semibold text-purple-800">{pay.qrTitle}</p>
                      <p className="text-sm text-purple-600">{pay.qrDescription}</p>
                    </div>

                    <div className="space-y-2">
                      <Label>{pay.selectBank}</Label>
                      <Select value={qrBank} onValueChange={setQrBank}>
                        <SelectTrigger>
                          <SelectValue placeholder={pay.selectBankPlaceholder} />
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
                      {pay.generateQR}
                    </Button>
                  </>
                )}

                {qrStep === 'scan' && (
                  <div className="space-y-4">
                    <div className="bg-secondary/30 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-2">{pay.scanQR}</p>
                      <div className="bg-white p-4 rounded-lg inline-block shadow-sm border">
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
                          <span className="text-muted-foreground">{t.checkout.summary.total}:</span>
                          <span className="font-bold">${total.toFixed(2)} USD</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{pay.equivalentBOB}:</span>
                          <span className="font-semibold">Bs. {(total * 6.96).toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-center gap-2 text-orange-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{pay.timeRemaining} <span className="font-mono font-bold">{formatTime(qrTimer)}</span></span>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Smartphone className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-semibold text-amber-800">{pay.qrInstructions}</p>
                          <ol className="list-decimal list-inside text-amber-700 space-y-1 mt-1">
                            <li>{pay.qrStep1}</li>
                            <li>{pay.qrStep2}</li>
                            <li>{pay.qrStep3}</li>
                            <li>{pay.qrStep4}</li>
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
                        {pay.paymentMade}
                      </Label>
                    </div>

                    <Button 
                      onClick={handleQRConfirm} 
                      className="w-full" 
                      size="lg"
                      disabled={!qrConfirmed || isProcessing}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      {pay.confirmPaymentBtn}
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
                      {pay.newQR}
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
                      <p className="font-semibold text-teal-800">{pay.transferTitle}</p>
                      <p className="text-sm text-teal-600">{pay.transferDescription}</p>
                    </div>

                    <div className="space-y-2">
                      <Label>{pay.originBank}</Label>
                      <Select value={transferBank} onValueChange={setTransferBank}>
                        <SelectTrigger>
                          <SelectValue placeholder={pay.originBankPlaceholder} />
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
                      {pay.continueTransfer}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </>
                )}

                {transferStep === 'details' && (
                  <div className="space-y-4">
                    <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
                      <h4 className="font-semibold text-center">{pay.transferTo}</h4>
                      <Separator />
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{pay.bankName}</span>
                          <span className="font-semibold">Banco Union</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">{pay.accountNumber}</span>
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
                          <span className="text-muted-foreground">{pay.accountType}</span>
                          <span className="font-semibold">{pay.savingsAccount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{pay.accountName}</span>
                          <span className="font-semibold">Sucre Tourism S.R.L.</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-base">
                          <span className="text-muted-foreground">{pay.amount}</span>
                          <span className="font-bold text-primary">${total.toFixed(2)} USD</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="transferRef">{pay.referenceNumber} *</Label>
                      <Input
                        id="transferRef"
                        placeholder={pay.referencePlaceholder}
                        value={transferReference}
                        onChange={(e) => setTransferReference(e.target.value)}
                      />
                    </div>

                    <Button 
                      onClick={handleTransferSubmit} 
                      className="w-full" 
                      size="lg"
                      disabled={!transferReference || isProcessing}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      {pay.confirmTransfer}
                    </Button>

                    <Button 
                      variant="ghost" 
                      className="w-full"
                      onClick={() => setTransferStep('select')}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {t.checkout.back}
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
                      <p className="font-semibold text-orange-800">{pay.cryptoTitle}</p>
                      <p className="text-sm text-orange-600">{pay.cryptoDescription}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>{pay.selectCrypto}</Label>
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
                        <Label>{pay.selectNetwork}</Label>
                        <Select value={cryptoNetwork} onValueChange={(v) => setCryptoNetwork(v as CryptoNetwork)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {cryptoNetworks[cryptoCurrency].networks.map(network => (
                              <SelectItem key={network} value={network}>
                                {networkNames[network]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button 
                      onClick={() => setCryptoStep('pay')} 
                      className="w-full bg-orange-500 hover:bg-orange-600" 
                      size="lg"
                    >
                      {pay.continuePayment}
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
                        <p className="text-xs text-muted-foreground mb-1">{pay.toAddress}</p>
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
                          <span className="text-muted-foreground">{pay.sendExactAmount}</span>
                          <span className="font-bold">${total.toFixed(2)} USD</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{cryptoCurrency}:</span>
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
                        <span className="text-sm">{pay.timeRemaining} <span className="font-mono font-bold">{formatTime(cryptoTimer)}</span></span>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        <p className="text-sm text-red-700">
                          <strong>{pay.networkWarning}</strong> {networkNames[cryptoNetwork]}. {pay.networkWarning2}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="txHash">{pay.txHash} *</Label>
                      <Input
                        id="txHash"
                        placeholder={pay.txHashPlaceholder}
                        value={cryptoTxHash}
                        onChange={(e) => setCryptoTxHash(e.target.value)}
                      />
                    </div>

                    <Button 
                      onClick={handleCryptoConfirm} 
                      className="w-full" 
                      size="lg"
                      disabled={!cryptoTxHash || isProcessing}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      {pay.confirmCrypto}
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
                      {t.checkout.back}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
