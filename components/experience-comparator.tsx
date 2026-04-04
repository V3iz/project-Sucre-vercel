"use client"

import { Check, Leaf, CalendarCheck, Church, UtensilsCrossed, Mountain, Star, Users, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SafeLink as Link } from "@/components/safe-link"

interface ExperienceFeature {
  text: string
  included: boolean
}

interface ExperienceCard {
  id: string
  name: string
  category: string
  categoryColor: string
  icon: React.ReactNode
  price: number
  description: string
  duration: string
  groupSize: string
  rating: number
  reviews: number
  features: ExperienceFeature[]
  popular?: boolean
}

const experiences: ExperienceCard[] = [
  {
    id: "inmersion-colonial",
    name: "Inmersión Colonial",
    category: "Cultural",
    categoryColor: "bg-terracotta-100 text-terracotta-700",
    icon: <Church className="h-6 w-6" />,
    price: 85,
    description: "Sumérgete en la historia viva de la Ciudad Blanca con visitas guiadas a monumentos UNESCO y talleres artesanales.",
    duration: "8 horas",
    groupSize: "2-8 personas",
    rating: 4.9,
    reviews: 234,
    features: [
      { text: "Guía certificado bilingüe", included: true },
      { text: "Transporte local incluido", included: true },
      { text: "Entrada a 5 museos y monumentos", included: true },
      { text: "Taller de tejido tradicional", included: true },
      { text: "Almuerzo típico boliviano", included: true },
      { text: "Fotografía profesional", included: false },
    ],
  },
  {
    id: "ruta-sabores",
    name: "Ruta de los Sabores",
    category: "Gastronómico",
    categoryColor: "bg-amber-100 text-amber-700",
    icon: <UtensilsCrossed className="h-6 w-6" />,
    price: 95,
    description: "Descubre la rica gastronomía sucrense: desde chocolates artesanales hasta la auténtica salteña y los mejores mercados locales.",
    duration: "6 horas",
    groupSize: "2-6 personas",
    rating: 4.8,
    reviews: 189,
    popular: true,
    features: [
      { text: "Guía gastronómico experto", included: true },
      { text: "Transporte privado", included: true },
      { text: "Degustación en 6 locales", included: true },
      { text: "Clase de cocina boliviana", included: true },
      { text: "Cata de vinos de Tarija", included: true },
      { text: "Recetario digital", included: true },
    ],
  },
  {
    id: "ecoturismo-maragua",
    name: "Ecoturismo en Maragua",
    category: "Alternativo",
    categoryColor: "bg-emerald-100 text-emerald-700",
    icon: <Mountain className="h-6 w-6" />,
    price: 120,
    description: "Explora el cráter de Maragua, huellas de dinosaurios y comunidades indígenas con prácticas de turismo regenerativo.",
    duration: "10 horas",
    groupSize: "4-10 personas",
    rating: 4.9,
    reviews: 156,
    features: [
      { text: "Guía naturalista certificado", included: true },
      { text: "Transporte 4x4 ecológico", included: true },
      { text: "Senderismo guiado (8km)", included: true },
      { text: "Almuerzo comunitario", included: true },
      { text: "Contribución a conservación", included: true },
      { text: "Equipo de trekking", included: true },
    ],
  },
]

export function ExperienceComparator() {
  return (
    <section className="py-20 bg-cream-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-terracotta-300 text-terracotta-600">
            Experiencias Verificadas
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-wood-800 mb-4">
            Compara y Elige tu Aventura
          </h2>
          <p className="text-lg text-wood-600 max-w-2xl mx-auto">
            Tres experiencias únicas diseñadas para diferentes estilos de viaje. 
            Precios transparentes, sin sorpresas ni costos ocultos.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-200">
            <Leaf className="h-4 w-4" />
            <span className="text-sm font-medium">Sostenibilidad Garantizada</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200">
            <CalendarCheck className="h-4 w-4" />
            <span className="text-sm font-medium">Reserva Flexible 365 días</span>
          </div>
        </div>

        {/* Experience Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {experiences.map((exp) => (
            <Card 
              key={exp.id} 
              className={`relative flex flex-col bg-background border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                exp.popular ? "border-terracotta-400 shadow-lg" : "border-cream-200"
              }`}
            >
              {exp.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-terracotta-500 hover:bg-terracotta-500 text-white shadow-md">
                    Más Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                {/* Category Badge */}
                <Badge variant="secondary" className={`w-fit mx-auto mb-3 ${exp.categoryColor}`}>
                  {exp.category}
                </Badge>

                {/* Icon */}
                <div className="mx-auto w-14 h-14 bg-terracotta-100 rounded-full flex items-center justify-center text-terracotta-600 mb-3">
                  {exp.icon}
                </div>

                <CardTitle className="text-xl text-wood-800">{exp.name}</CardTitle>
                <CardDescription className="text-wood-600 text-sm leading-relaxed">
                  {exp.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                {/* Price */}
                <div className="text-center mb-6 pb-6 border-b border-cream-200">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-wood-800">${exp.price}</span>
                    <span className="text-wood-500">USD</span>
                  </div>
                  <p className="text-sm text-wood-500 mt-1">por persona / día</p>
                  <p className="text-xs text-emerald-600 mt-2 font-medium">
                    Todo incluido - Sin costos ocultos
                  </p>
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-wood-600">
                    <Clock className="h-4 w-4 text-terracotta-500" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-wood-600">
                    <Users className="h-4 w-4 text-terracotta-500" />
                    <span>{exp.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-wood-600 col-span-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                      <span className="font-medium">{exp.rating}</span>
                    </div>
                    <span className="text-wood-400">({exp.reviews} reseñas)</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3">
                  {exp.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
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
                  className={`w-full h-10 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors ${
                    exp.popular 
                      ? "bg-primary hover:bg-primary/80 text-white" 
                      : "bg-primary hover:bg-primary/90 text-white"
                  }`}
                >
                  Reservar Ahora
                </Link>
              </CardFooter>

              {/* Trust Micro-badges */}
              <div className="px-6 pb-6 flex justify-center gap-2">
                <div className="flex items-center gap-1 text-xs text-emerald-600">
                  <Leaf className="h-3 w-3" />
                  <span>Eco</span>
                </div>
                <span className="text-cream-300">|</span>
                <div className="flex items-center gap-1 text-xs text-blue-600">
                  <CalendarCheck className="h-3 w-3" />
                  <span>Flexible</span>
                </div>
                <span className="text-cream-300">|</span>
                <div className="flex items-center gap-1 text-xs text-wood-500">
                  <MapPin className="h-3 w-3" />
                  <span>Local</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            ¿Necesitas algo personalizado? Creamos experiencias a medida para grupos y empresas.
          </p>
          <Link 
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 border border-primary text-primary hover:bg-secondary transition-colors"
          >
            Solicitar Cotización Personalizada
          </Link>
        </div>
      </div>
    </section>
  )
}
