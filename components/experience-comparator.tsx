"use client"

import { Check, Leaf, CalendarCheck, Church, UtensilsCrossed, Mountain, Star, Users, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SafeLink as Link } from "@/components/safe-link"
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

export function ExperienceComparator() {
  const { t } = useI18n()
  const exp = t.experiences

  return (
    <section className="py-20 bg-cream-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-terracotta-300 text-terracotta-600">
            {exp.badge}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-wood-800 mb-4">
            {exp.title}
          </h2>
          <p className="text-lg text-wood-600 max-w-2xl mx-auto">
            {exp.description}
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-200">
            <Leaf className="h-4 w-4" />
            <span className="text-sm font-medium">{exp.sustainability}</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200">
            <CalendarCheck className="h-4 w-4" />
            <span className="text-sm font-medium">{exp.flexibleBooking}</span>
          </div>
        </div>

        {/* Experience Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {exp.cards.map((card, index) => {
            const isPopular = index === popularIndex
            return (
              <Card 
                key={card.id} 
                className={`relative flex flex-col bg-background border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  isPopular ? "border-terracotta-400 shadow-lg" : "border-cream-200"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-terracotta-500 hover:bg-terracotta-500 text-white shadow-md">
                      {exp.mostPopular}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  {/* Category Badge */}
                  <Badge variant="secondary" className={`w-fit mx-auto mb-3 ${categoryColors[card.category] || "bg-gray-100 text-gray-700"}`}>
                    {card.category}
                  </Badge>

                  {/* Icon */}
                  <div className="mx-auto w-14 h-14 bg-terracotta-100 rounded-full flex items-center justify-center text-terracotta-600 mb-3">
                    {icons[index]}
                  </div>

                  <CardTitle className="text-xl text-wood-800">{card.name}</CardTitle>
                  <CardDescription className="text-wood-600 text-sm leading-relaxed">
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
                    <div className="flex items-center gap-2 text-wood-600">
                      <Clock className="h-4 w-4 text-terracotta-500" />
                      <span>{card.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-wood-600">
                      <Users className="h-4 w-4 text-terracotta-500" />
                      <span>{card.groupSize}</span>
                    </div>
                    <div className="flex items-center gap-2 text-wood-600 col-span-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
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
                </CardContent>

                <CardFooter className="pt-4">
                  <Link 
                    href="/checkout"
                    className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors bg-primary hover:bg-primary/80 text-white"
                  >
                    {exp.bookNow}
                  </Link>
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
    </section>
  )
}
