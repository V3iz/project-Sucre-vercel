"use client"

import { useState } from "react"
import { Check, Leaf, CalendarCheck, Church, UtensilsCrossed, Mountain, Star, Users, Clock, MapPin, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SafeLink as Link } from "@/components/safe-link"
import { BookingModal } from "@/components/booking-modal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useI18n } from "@/lib/i18n"

const icons = [
  <Church key="church" className="h-6 w-6" />,
  <UtensilsCrossed key="utensils" className="h-6 w-6" />,
  <Mountain key="mountain" className="h-6 w-6" />,
]

const prices = [85, 95, 120]
const ratings = [4.9, 4.8, 4.9]
const reviewCounts = [234, 189, 156]
const popularIndex = 1

const categoryColors: Record<string, string> = {
  "Cultural": "bg-terracotta-100 text-terracotta-700",
  "Gastronómico": "bg-amber-100 text-amber-700",
  "Gastronomic": "bg-amber-100 text-amber-700",
  "Alternativo": "bg-emerald-100 text-emerald-700",
  "Alternative": "bg-emerald-100 text-emerald-700",
}

interface SelectedExperience {
  id: string
  name: string
  category: string
  price: number
  duration: string
  maxGroup: number
}

export function ExperienceComparator() {
  const { t } = useI18n()
  const exp = t.experiences
  const [selectedExp, setSelectedExp] = useState<SelectedExperience | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBook = (card: typeof exp.cards[0], price: number) => {
    // Extract max group from string like "2-8 personas"
    const groupMatch = card.groupSize.match(/(\d+)-(\d+)/)
    const maxGroup = groupMatch ? parseInt(groupMatch[2]) : 10

    setSelectedExp({
      id: card.id,
      name: card.name,
      category: card.category,
      price,
      duration: card.duration,
      maxGroup,
    })
    setIsModalOpen(true)
  }

  return (
    <section className="py-24 bg-light-gray" id="experiencias">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-gold-300 text-gold-700 bg-gold-50">
            {exp.badge}
          </Badge>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-wood-800 mb-4">
            {exp.title}
          </h2>
          <p className="font-body text-lg text-wood-600 max-w-2xl mx-auto">
            {exp.description}
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-200 shadow-sm">
            <Leaf className="h-4 w-4" />
            <span className="font-body text-sm font-medium">{exp.sustainability}</span>
          </div>
          <div className="flex items-center gap-2 bg-sky-50 text-sky-700 px-4 py-2 rounded-full border border-sky-200 shadow-sm">
            <CalendarCheck className="h-4 w-4" />
            <span className="font-body text-sm font-medium">{exp.flexibleBooking}</span>
          </div>
        </div>

        {/* Experience Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {exp.cards.map((card, index) => {
            const isPopular = index === popularIndex
            return (
              <Card 
                key={card.id} 
                className={`relative flex flex-col bg-white rounded-xl border-0 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                  isPopular ? "" : ""
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gold-600 hover:bg-gold-700 text-white shadow-md">
                      {exp.mostPopular}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  {/* Category Badge */}
                  <Badge variant="secondary" className={`w-fit mx-auto mb-3 font-body ${categoryColors[card.category] || "bg-gray-100 text-gray-700"}`}>
                    {card.category}
                  </Badge>

                  {/* Icon */}
                  <div className="mx-auto w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center text-gold-600 mb-3">
                    {icons[index]}
                  </div>

                  <CardTitle className="font-sans text-xl text-wood-800">{card.name}</CardTitle>
                  <CardDescription className="font-body text-wood-600 text-sm leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  {/* Price */}
                  <div className="text-center mb-6 pb-6 border-b border-cream-200">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-wood-800">${prices[index]}</span>
                      <span className="text-wood-500">USD</span>
                    </div>
                    <p className="text-sm text-wood-500 mt-1">{exp.perPersonDay}</p>
                    <p className="text-xs text-emerald-600 mt-2 font-medium">
                      {exp.allIncluded}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                    <div className="flex items-center gap-2 text-wood-600 font-body">
                      <Clock className="h-4 w-4 text-gold-600" />
                      <span>{card.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-wood-600 font-body">
                      <Users className="h-4 w-4 text-gold-600" />
                      <span>{card.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-2 text-wood-600 col-span-2 font-body">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-gold-500 fill-gold-500" />
                        <span className="font-medium">{ratings[index]}</span>
                      </div>
                      <span className="text-wood-400">({reviewCounts[index]} {exp.reviews})</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {card.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`mt-0.5 rounded-full p-0.5 ${
                          feature.included 
                            ? "bg-emerald-100 text-emerald-600" 
                            : "bg-cream-200 text-wood-400"
                        }`}>
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span className={`text-sm ${
                          feature.included ? "text-wood-700" : "text-wood-400 line-through"
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Activity Details Accordion */}
                  <Accordion type="single" collapsible className="mt-5 rounded-xl border border-gold-200 overflow-hidden">
                    <AccordionItem value="details" className="border-0">
                      <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-gold-700 hover:text-gold-800 hover:no-underline hover:bg-gold-50 bg-gold-50/50 transition-colors font-body">
                        {exp.activityDetailsLabel}
                      </AccordionTrigger>
                      <AccordionContent className="bg-cream-50">
                        <p className="px-4 pb-4 text-sm text-wood-600 leading-relaxed font-body">
                          {exp.activityDetailsContent[index]}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>

                <CardFooter className="pt-4 flex flex-col gap-2">
                  <Link 
                    href={`/experiencias/${card.id}`}
                    className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all border border-gold-300 text-gold-700 hover:bg-gold-50 font-body"
                  >
                    <Info className="h-4 w-4" />
                    {exp.viewDetails}
                  </Link>
                  <button 
                    onClick={() => handleBook(card, prices[index])}
                    className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all bg-gold-600 hover:bg-gold-700 text-white shadow-md hover:shadow-lg font-body"
                  >
                    {exp.bookNow}
                  </button>
                </CardFooter>

                {/* Trust Micro-badges */}
                <div className="px-6 pb-6 flex justify-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-emerald-600">
                    <Leaf className="h-3 w-3" />
                    <span>{exp.eco}</span>
                  </div>
                  <span className="text-cream-300">|</span>
                  <div className="flex items-center gap-1 text-xs text-blue-600">
                    <CalendarCheck className="h-3 w-3" />
                    <span>{exp.flexible}</span>
                  </div>
                  <span className="text-cream-300">|</span>
                  <div className="flex items-center gap-1 text-xs text-wood-500">
                    <MapPin className="h-3 w-3" />
                    <span>{exp.local}</span>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            {exp.customNeed}
          </p>
          <Link 
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 border border-primary text-primary hover:bg-secondary transition-colors"
          >
            {exp.requestQuote}
          </Link>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedExp && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedExp(null)
          }}
          item={{
            id: selectedExp.id,
            name: selectedExp.name,
            category: selectedExp.category,
            price: selectedExp.price,
            duration: selectedExp.duration,
            maxGroup: selectedExp.maxGroup,
          }}
        />
      )}
    </section>
  )
}
