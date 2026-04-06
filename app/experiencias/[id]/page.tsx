"use client"

import { useParams } from "next/navigation"
import { useI18n } from "@/lib/i18n"
import { Navigation } from "@/components/navigation"
import { SafeLink as Link } from "@/components/safe-link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Church, 
  UtensilsCrossed, 
  Mountain, 
  Clock, 
  Users, 
  Star, 
  MapPin, 
  Calendar,
  Check,
  Camera,
  Utensils,
  Palette,
  TreePine,
  Footprints,
  Heart,
  Shield,
  Leaf,
  ArrowLeft,
  ChevronRight
} from "lucide-react"
import Image from "next/image"

// Experience data with rich content
const experienceData = {
  es: {
    "inmersion-colonial": {
      id: "inmersion-colonial",
      name: "Inmersión Colonial",
      tagline: "Viaja en el tiempo por la Ciudad Blanca",
      category: "Cultural",
      heroImage: "/placeholder.svg?height=600&width=1200&text=Sucre+Colonial",
      price: 85,
      duration: "8 horas",
      groupSize: "2-8 personas",
      rating: 4.9,
      reviewCount: 234,
      difficulty: "Fácil",
      description: "Sumérgete en la historia viva de Sucre, la primera capital de Bolivia y Patrimonio de la Humanidad UNESCO desde 1991. Esta experiencia te llevará por calles empedradas, conventos centenarios y plazas que guardan los secretos de la independencia sudamericana.",
      highlights: [
        "Visita guiada a la Casa de la Libertad, cuna de la independencia boliviana",
        "Recorrido por el Convento de San Felipe Neri con vistas panorámicas",
        "Taller práctico de tejido tradicional con artesanas locales",
        "Almuerzo típico en restaurante colonial histórico",
        "Entrada a 5 museos principales de la ciudad"
      ],
      itinerary: [
        {
          time: "08:00",
          title: "Encuentro en Plaza 25 de Mayo",
          description: "Nos reunimos frente a la Catedral Metropolitana para comenzar nuestra aventura. Café de bienvenida incluido."
        },
        {
          time: "08:30",
          title: "Casa de la Libertad",
          description: "Visitamos el lugar donde se firmó la Declaración de Independencia de Bolivia en 1825. Aquí conocerás la historia de los libertadores."
        },
        {
          time: "10:00",
          title: "Convento de San Felipe Neri",
          description: "Subimos a los techos del convento para disfrutar de las mejores vistas de la ciudad y entender la arquitectura colonial."
        },
        {
          time: "11:30",
          title: "Taller de Tejido Tradicional",
          description: "Aprende técnicas ancestrales de tejido con artesanas de la comunidad Jalq'a. Te llevarás tu propia creación."
        },
        {
          time: "13:00",
          title: "Almuerzo Colonial",
          description: "Degustamos platos tradicionales en un restaurante ubicado en una casona del siglo XVIII."
        },
        {
          time: "14:30",
          title: "Ruta de Museos",
          description: "Visitamos el Museo de Arte Indígena ASUR, Museo Charcas y el Museo de la Catedral con su tesoro de plata."
        },
        {
          time: "16:00",
          title: "Despedida en el Mirador",
          description: "Culminamos en el Mirador de la Recoleta con una vista del atardecer sobre la ciudad blanca."
        }
      ],
      includes: [
        { text: "Guía certificado bilingüe (español/inglés)", included: true },
        { text: "Transporte local en vehículo privado", included: true },
        { text: "Entrada a 5 museos y monumentos", included: true },
        { text: "Taller de tejido con materiales", included: true },
        { text: "Almuerzo típico boliviano", included: true },
        { text: "Café y snacks durante el tour", included: true },
        { text: "Seguro de viaje", included: true },
        { text: "Fotografía profesional", included: false },
        { text: "Propinas", included: false }
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600&text=Casa+Libertad",
        "/placeholder.svg?height=400&width=600&text=San+Felipe+Neri",
        "/placeholder.svg?height=400&width=600&text=Tejido+Tradicional",
        "/placeholder.svg?height=400&width=600&text=Plaza+25+Mayo",
        "/placeholder.svg?height=400&width=600&text=Museo+ASUR",
        "/placeholder.svg?height=400&width=600&text=Atardecer+Recoleta"
      ],
      reviews: [
        {
          name: "María García",
          country: "España",
          rating: 5,
          date: "Marzo 2024",
          comment: "Una experiencia inolvidable. Nuestro guía Juan nos hizo sentir la historia como si estuviéramos viviéndola. El taller de tejido fue mi parte favorita."
        },
        {
          name: "John Smith",
          country: "Estados Unidos",
          rating: 5,
          date: "Febrero 2024",
          comment: "Best cultural tour I've ever taken. The depth of knowledge and passion of the guide made this experience truly special."
        },
        {
          name: "Ana Müller",
          country: "Alemania",
          rating: 5,
          date: "Enero 2024",
          comment: "Perfectamente organizado. Los museos son increíbles y el almuerzo fue delicioso. Muy recomendado para amantes de la historia."
        }
      ],
      faqs: [
        {
          question: "¿Es necesario tener buen estado físico?",
          answer: "No, el tour es accesible para todos. Caminamos a paso tranquilo y hay opciones de descanso."
        },
        {
          question: "¿Qué debo llevar?",
          answer: "Recomendamos zapatos cómodos, protector solar, sombrero y una chaqueta ligera para las mañanas frescas."
        },
        {
          question: "¿El tour es privado o grupal?",
          answer: "Ofrecemos ambas opciones. Los grupos son pequeños (máximo 8 personas) para garantizar una experiencia personalizada."
        }
      ],
      meetingPoint: "Plaza 25 de Mayo, frente a la Catedral Metropolitana de Sucre",
      icon: Church
    },
    "ruta-sabores": {
      id: "ruta-sabores",
      name: "Ruta de los Sabores",
      tagline: "Un festín para todos los sentidos",
      category: "Gastronómico",
      heroImage: "/placeholder.svg?height=600&width=1200&text=Gastronomia+Sucre",
      price: 95,
      duration: "6 horas",
      groupSize: "2-6 personas",
      rating: 4.8,
      reviewCount: 189,
      difficulty: "Fácil",
      description: "Sucre es la capital gastronómica de Bolivia, famosa por sus chocolates artesanales, las mejores salteñas del país y una tradición culinaria que fusiona sabores españoles, indígenas y criollos. Esta experiencia te llevará por mercados, cocinas y talleres para descubrir el alma de Bolivia a través de su comida.",
      highlights: [
        "Visita al Mercado Central con degustación de productos locales",
        "Clase de cocina boliviana: aprende a hacer salteñas",
        "Tour por fábricas de chocolate artesanal con degustación",
        "Cata de vinos y singanis de Tarija",
        "Almuerzo de 5 tiempos en restaurante premiado"
      ],
      itinerary: [
        {
          time: "09:00",
          title: "Mercado Central de Sucre",
          description: "Comenzamos en el corazón gastronómico de la ciudad. Probarás frutas exóticas, jugos naturales y conocerás los ingredientes de la cocina boliviana."
        },
        {
          time: "10:00",
          title: "Desayuno de Salteñas",
          description: "Visitamos la salteñería más antigua de Sucre para probar las famosas empanadas jugosas que son el desayuno tradicional boliviano."
        },
        {
          time: "11:00",
          title: "Clase de Cocina Boliviana",
          description: "En una cocina tradicional, aprenderás a preparar salteñas desde cero: la masa, el jigote y los secretos del repulgue perfecto."
        },
        {
          time: "13:00",
          title: "Almuerzo Gourmet",
          description: "Disfrutamos un menú de 5 tiempos que fusiona cocina tradicional con técnicas modernas en un restaurante con vista a la ciudad."
        },
        {
          time: "14:30",
          title: "Ruta del Chocolate",
          description: "Visitamos Para Ti y Taboada, las chocolaterías más famosas de Sucre. Aprenderás el proceso del cacao al chocolate y degustarás variedades únicas."
        },
        {
          time: "15:30",
          title: "Cata de Vinos y Singani",
          description: "Finalizamos con una cata guiada de vinos de altura y singani, el destilado nacional de Bolivia, en una bodega boutique."
        }
      ],
      includes: [
        { text: "Guía gastronómico experto", included: true },
        { text: "Transporte privado con aire acondicionado", included: true },
        { text: "Degustación en 6 locales diferentes", included: true },
        { text: "Clase de cocina completa (3 horas)", included: true },
        { text: "Almuerzo gourmet de 5 tiempos", included: true },
        { text: "Cata de vinos y singani (4 variedades)", included: true },
        { text: "Recetario digital con recetas bolivianas", included: true },
        { text: "Certificado de participación", included: true },
        { text: "Compras en mercados (a cuenta del viajero)", included: false }
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600&text=Mercado+Central",
        "/placeholder.svg?height=400&width=600&text=Saltenas",
        "/placeholder.svg?height=400&width=600&text=Clase+Cocina",
        "/placeholder.svg?height=400&width=600&text=Chocolate+Artesanal",
        "/placeholder.svg?height=400&width=600&text=Vinos+Tarija",
        "/placeholder.svg?height=400&width=600&text=Plato+Gourmet"
      ],
      reviews: [
        {
          name: "Pierre Dubois",
          country: "Francia",
          rating: 5,
          date: "Marzo 2024",
          comment: "En tant que chef, je suis très impressionné par la richesse de la gastronomie bolivienne. Les salteñas sont maintenant mon plat préféré!"
        },
        {
          name: "Carla Rodríguez",
          country: "Argentina",
          rating: 5,
          date: "Febrero 2024",
          comment: "El chocolate de Sucre es el mejor que he probado. La clase de cocina fue súper divertida y me llevo las recetas para hacer en casa."
        },
        {
          name: "Takeshi Yamamoto",
          country: "Japón",
          rating: 4,
          date: "Enero 2024",
          comment: "Experiencia muy completa. La combinación de historia y gastronomía es perfecta. El singani es una bebida única que todos deberían probar."
        }
      ],
      faqs: [
        {
          question: "¿Hay opciones vegetarianas/veganas?",
          answer: "Sí, podemos adaptar todo el tour para dietas vegetarianas, veganas y otras restricciones alimentarias con aviso previo."
        },
        {
          question: "¿Puedo comprar productos para llevar?",
          answer: "Absolutamente. Te ayudamos a encontrar los mejores chocolates, especias y productos para llevar como souvenirs gastronómicos."
        },
        {
          question: "¿La clase de cocina es apta para principiantes?",
          answer: "Sí, la clase está diseñada para todos los niveles. Nuestros chefs te guían paso a paso."
        }
      ],
      meetingPoint: "Hotel Parador Santa María La Real, Calle Colón #220",
      icon: UtensilsCrossed
    },
    "ecoturismo-maragua": {
      id: "ecoturismo-maragua",
      name: "Ecoturismo en Maragua",
      tagline: "Donde la tierra cuenta su historia de millones de años",
      category: "Aventura",
      heroImage: "/placeholder.svg?height=600&width=1200&text=Crater+Maragua",
      price: 120,
      duration: "10 horas",
      groupSize: "4-10 personas",
      rating: 4.9,
      reviewCount: 156,
      difficulty: "Moderada",
      description: "El Cráter de Maragua es un anfiteatro natural de 8km de diámetro formado hace 65 millones de años. Aquí encontrarás huellas de dinosaurios, formaciones geológicas únicas y comunidades indígenas que mantienen vivas tradiciones milenarias. Esta experiencia de turismo regenerativo contribuye directamente al desarrollo sostenible de la comunidad.",
      highlights: [
        "Senderismo por el interior del cráter con vistas espectaculares",
        "Visita a huellas de dinosaurios de 68 millones de años",
        "Almuerzo comunitario preparado por familias locales",
        "Taller de textiles Jalq'a con diseños únicos del mundo",
        "Contribución directa a proyectos de conservación"
      ],
      itinerary: [
        {
          time: "06:00",
          title: "Salida de Sucre",
          description: "Partimos temprano en vehículo 4x4 rumbo al cráter. Durante el trayecto, tu guía te explicará la geología de la región."
        },
        {
          time: "08:00",
          title: "Mirador del Cráter",
          description: "Primera parada en el borde del cráter para apreciar la magnitud de esta formación geológica única. Tiempo para fotografías."
        },
        {
          time: "09:00",
          title: "Senderismo hacia las Huellas",
          description: "Caminata de 4km por senderos ancestrales hasta el sitio paleontológico donde se conservan huellas de dinosaurios terópodos."
        },
        {
          time: "11:00",
          title: "Comunidad de Maragua",
          description: "Llegamos a la comunidad donde seremos recibidos por familias locales. Conocerás su forma de vida y cosmovisión andina."
        },
        {
          time: "12:30",
          title: "Almuerzo Comunitario",
          description: "Disfrutamos un almuerzo tradicional preparado con productos de la zona: papa, chuño, charque y quinua."
        },
        {
          time: "14:00",
          title: "Taller de Textiles Jalq'a",
          description: "Las tejedoras de Maragua nos enseñan los secretos de los textiles Jalq'a, reconocidos por UNESCO como patrimonio cultural."
        },
        {
          time: "15:30",
          title: "Caminata de Retorno",
          description: "Regresamos por un sendero diferente, observando la flora y fauna del ecosistema de puna."
        },
        {
          time: "16:30",
          title: "Regreso a Sucre",
          description: "Viaje de retorno con paradas para disfrutar de los paisajes del atardecer sobre los valles."
        }
      ],
      includes: [
        { text: "Guía naturalista certificado", included: true },
        { text: "Transporte 4x4 ecológico (combustible compensado)", included: true },
        { text: "Senderismo guiado (8km total)", included: true },
        { text: "Almuerzo comunitario completo", included: true },
        { text: "Taller de textiles", included: true },
        { text: "Contribución a fondo de conservación", included: true },
        { text: "Bastones de trekking", included: true },
        { text: "Botiquín de primeros auxilios", included: true },
        { text: "Botas de trekking", included: false },
        { text: "Mochila personal", included: false }
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600&text=Crater+Vista+Aerea",
        "/placeholder.svg?height=400&width=600&text=Huellas+Dinosaurios",
        "/placeholder.svg?height=400&width=600&text=Comunidad+Maragua",
        "/placeholder.svg?height=400&width=600&text=Textiles+Jalqa",
        "/placeholder.svg?height=400&width=600&text=Sendero+Crater",
        "/placeholder.svg?height=400&width=600&text=Atardecer+Puna"
      ],
      reviews: [
        {
          name: "Emma Wilson",
          country: "Reino Unido",
          rating: 5,
          date: "Marzo 2024",
          comment: "A life-changing experience. The dinosaur footprints are incredible, but what truly moved me was the warmth of the community and learning about their textile traditions."
        },
        {
          name: "Lucas Ferreira",
          country: "Brasil",
          rating: 5,
          date: "Febrero 2024",
          comment: "Paisagens de outro mundo! A cratera é impressionante e saber que contribuímos para a comunidade local torna tudo mais especial."
        },
        {
          name: "Sophie Martin",
          country: "Canadá",
          rating: 5,
          date: "Enero 2024",
          comment: "This is what sustainable tourism should look like. Every aspect was thoughtfully planned to benefit the local community while giving us an unforgettable adventure."
        }
      ],
      faqs: [
        {
          question: "¿Qué nivel de condición física se necesita?",
          answer: "Se requiere condición física moderada. La caminata es de 8km en total con desniveles suaves. Si tienes dudas, consulta con nosotros."
        },
        {
          question: "¿Qué pasa si llueve?",
          answer: "El tour se realiza con lluvia moderada (es parte de la experiencia). En caso de tormentas fuertes, reprogramamos sin costo."
        },
        {
          question: "¿Cómo contribuye el tour a la comunidad?",
          answer: "El 30% del precio va directamente a la comunidad: pago justo a familias, fondo escolar y proyectos de conservación del sitio paleontológico."
        }
      ],
      meetingPoint: "Terminal de Buses de Sucre, Av. Ostria Gutiérrez",
      icon: Mountain
    }
  },
  en: {
    "inmersion-colonial": {
      id: "inmersion-colonial",
      name: "Colonial Immersion",
      tagline: "Travel back in time through the White City",
      category: "Cultural",
      heroImage: "/placeholder.svg?height=600&width=1200&text=Colonial+Sucre",
      price: 85,
      duration: "8 hours",
      groupSize: "2-8 people",
      rating: 4.9,
      reviewCount: 234,
      difficulty: "Easy",
      description: "Immerse yourself in the living history of Sucre, Bolivia's first capital and a UNESCO World Heritage Site since 1991. This experience will take you through cobblestone streets, centuries-old convents, and squares that hold the secrets of South American independence.",
      highlights: [
        "Guided visit to Casa de la Libertad, birthplace of Bolivian independence",
        "Tour of San Felipe Neri Convent with panoramic views",
        "Hands-on traditional weaving workshop with local artisans",
        "Traditional lunch at a historic colonial restaurant",
        "Entry to 5 major city museums"
      ],
      itinerary: [
        {
          time: "08:00",
          title: "Meeting at Plaza 25 de Mayo",
          description: "We gather in front of the Metropolitan Cathedral to begin our adventure. Welcome coffee included."
        },
        {
          time: "08:30",
          title: "Casa de la Libertad",
          description: "We visit the place where Bolivia's Declaration of Independence was signed in 1825. Here you'll learn about the liberators' history."
        },
        {
          time: "10:00",
          title: "San Felipe Neri Convent",
          description: "We climb to the convent's rooftops to enjoy the best views of the city and understand colonial architecture."
        },
        {
          time: "11:30",
          title: "Traditional Weaving Workshop",
          description: "Learn ancestral weaving techniques with artisans from the Jalq'a community. You'll take home your own creation."
        },
        {
          time: "13:00",
          title: "Colonial Lunch",
          description: "We enjoy traditional dishes at a restaurant located in an 18th-century mansion."
        },
        {
          time: "14:30",
          title: "Museum Route",
          description: "We visit the ASUR Indigenous Art Museum, Charcas Museum, and the Cathedral Museum with its silver treasure."
        },
        {
          time: "16:00",
          title: "Farewell at the Viewpoint",
          description: "We conclude at La Recoleta Viewpoint with a sunset view over the white city."
        }
      ],
      includes: [
        { text: "Certified bilingual guide (Spanish/English)", included: true },
        { text: "Local transport in private vehicle", included: true },
        { text: "Entry to 5 museums and monuments", included: true },
        { text: "Weaving workshop with materials", included: true },
        { text: "Traditional Bolivian lunch", included: true },
        { text: "Coffee and snacks during tour", included: true },
        { text: "Travel insurance", included: true },
        { text: "Professional photography", included: false },
        { text: "Tips", included: false }
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600&text=Casa+Libertad",
        "/placeholder.svg?height=400&width=600&text=San+Felipe+Neri",
        "/placeholder.svg?height=400&width=600&text=Traditional+Weaving",
        "/placeholder.svg?height=400&width=600&text=Plaza+25+Mayo",
        "/placeholder.svg?height=400&width=600&text=ASUR+Museum",
        "/placeholder.svg?height=400&width=600&text=Recoleta+Sunset"
      ],
      reviews: [
        {
          name: "María García",
          country: "Spain",
          rating: 5,
          date: "March 2024",
          comment: "An unforgettable experience. Our guide Juan made us feel history as if we were living it. The weaving workshop was my favorite part."
        },
        {
          name: "John Smith",
          country: "United States",
          rating: 5,
          date: "February 2024",
          comment: "Best cultural tour I've ever taken. The depth of knowledge and passion of the guide made this experience truly special."
        },
        {
          name: "Ana Müller",
          country: "Germany",
          rating: 5,
          date: "January 2024",
          comment: "Perfectly organized. The museums are incredible and the lunch was delicious. Highly recommended for history lovers."
        }
      ],
      faqs: [
        {
          question: "Do I need to be in good physical shape?",
          answer: "No, the tour is accessible to everyone. We walk at a relaxed pace and there are rest options."
        },
        {
          question: "What should I bring?",
          answer: "We recommend comfortable shoes, sunscreen, a hat, and a light jacket for cool mornings."
        },
        {
          question: "Is the tour private or group?",
          answer: "We offer both options. Groups are small (maximum 8 people) to ensure a personalized experience."
        }
      ],
      meetingPoint: "Plaza 25 de Mayo, in front of the Metropolitan Cathedral of Sucre",
      icon: Church
    },
    "ruta-sabores": {
      id: "ruta-sabores",
      name: "Flavors Route",
      tagline: "A feast for all the senses",
      category: "Gastronomic",
      heroImage: "/placeholder.svg?height=600&width=1200&text=Sucre+Gastronomy",
      price: 95,
      duration: "6 hours",
      groupSize: "2-6 people",
      rating: 4.8,
      reviewCount: 189,
      difficulty: "Easy",
      description: "Sucre is Bolivia's gastronomic capital, famous for its artisan chocolates, the country's best salteñas, and a culinary tradition that blends Spanish, indigenous, and Creole flavors. This experience will take you through markets, kitchens, and workshops to discover Bolivia's soul through its food.",
      highlights: [
        "Visit to Central Market with local product tasting",
        "Bolivian cooking class: learn to make salteñas",
        "Tour of artisan chocolate factories with tasting",
        "Tarija wine and singani tasting",
        "5-course lunch at award-winning restaurant"
      ],
      itinerary: [
        {
          time: "09:00",
          title: "Sucre Central Market",
          description: "We begin at the gastronomic heart of the city. You'll taste exotic fruits, natural juices, and learn about Bolivian cuisine ingredients."
        },
        {
          time: "10:00",
          title: "Salteñas Breakfast",
          description: "We visit Sucre's oldest salteñería to try the famous juicy empanadas that are the traditional Bolivian breakfast."
        },
        {
          time: "11:00",
          title: "Bolivian Cooking Class",
          description: "In a traditional kitchen, you'll learn to prepare salteñas from scratch: the dough, the jigote, and the secrets of the perfect fold."
        },
        {
          time: "13:00",
          title: "Gourmet Lunch",
          description: "We enjoy a 5-course menu that blends traditional cuisine with modern techniques at a restaurant with city views."
        },
        {
          time: "14:30",
          title: "Chocolate Route",
          description: "We visit Para Ti and Taboada, Sucre's most famous chocolatiers. You'll learn the process from cacao to chocolate and taste unique varieties."
        },
        {
          time: "15:30",
          title: "Wine and Singani Tasting",
          description: "We finish with a guided tasting of high-altitude wines and singani, Bolivia's national spirit, at a boutique winery."
        }
      ],
      includes: [
        { text: "Expert gastronomy guide", included: true },
        { text: "Private air-conditioned transport", included: true },
        { text: "Tasting at 6 different locations", included: true },
        { text: "Complete cooking class (3 hours)", included: true },
        { text: "5-course gourmet lunch", included: true },
        { text: "Wine and singani tasting (4 varieties)", included: true },
        { text: "Digital recipe book with Bolivian recipes", included: true },
        { text: "Participation certificate", included: true },
        { text: "Market purchases (at traveler's expense)", included: false }
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600&text=Central+Market",
        "/placeholder.svg?height=400&width=600&text=Saltenas",
        "/placeholder.svg?height=400&width=600&text=Cooking+Class",
        "/placeholder.svg?height=400&width=600&text=Artisan+Chocolate",
        "/placeholder.svg?height=400&width=600&text=Tarija+Wines",
        "/placeholder.svg?height=400&width=600&text=Gourmet+Dish"
      ],
      reviews: [
        {
          name: "Pierre Dubois",
          country: "France",
          rating: 5,
          date: "March 2024",
          comment: "As a chef, I'm very impressed by the richness of Bolivian gastronomy. Salteñas are now my favorite dish!"
        },
        {
          name: "Carla Rodríguez",
          country: "Argentina",
          rating: 5,
          date: "February 2024",
          comment: "Sucre's chocolate is the best I've ever tasted. The cooking class was super fun and I'm taking the recipes home."
        },
        {
          name: "Takeshi Yamamoto",
          country: "Japan",
          rating: 4,
          date: "January 2024",
          comment: "Very complete experience. The combination of history and gastronomy is perfect. Singani is a unique drink everyone should try."
        }
      ],
      faqs: [
        {
          question: "Are there vegetarian/vegan options?",
          answer: "Yes, we can adapt the entire tour for vegetarian, vegan, and other dietary restrictions with prior notice."
        },
        {
          question: "Can I buy products to take home?",
          answer: "Absolutely. We help you find the best chocolates, spices, and products to take as gastronomic souvenirs."
        },
        {
          question: "Is the cooking class suitable for beginners?",
          answer: "Yes, the class is designed for all levels. Our chefs guide you step by step."
        }
      ],
      meetingPoint: "Parador Santa María La Real Hotel, Calle Colón #220",
      icon: UtensilsCrossed
    },
    "ecoturismo-maragua": {
      id: "ecoturismo-maragua",
      name: "Maragua Ecotourism",
      tagline: "Where the earth tells its million-year story",
      category: "Adventure",
      heroImage: "/placeholder.svg?height=600&width=1200&text=Maragua+Crater",
      price: 120,
      duration: "10 hours",
      groupSize: "4-10 people",
      rating: 4.9,
      reviewCount: 156,
      difficulty: "Moderate",
      description: "The Maragua Crater is an 8km diameter natural amphitheater formed 65 million years ago. Here you'll find dinosaur footprints, unique geological formations, and indigenous communities that keep millenary traditions alive. This regenerative tourism experience contributes directly to the community's sustainable development.",
      highlights: [
        "Hiking inside the crater with spectacular views",
        "Visit to 68-million-year-old dinosaur footprints",
        "Community lunch prepared by local families",
        "Jalq'a textile workshop with unique world designs",
        "Direct contribution to conservation projects"
      ],
      itinerary: [
        {
          time: "06:00",
          title: "Departure from Sucre",
          description: "We leave early in a 4x4 vehicle heading to the crater. During the journey, your guide will explain the region's geology."
        },
        {
          time: "08:00",
          title: "Crater Viewpoint",
          description: "First stop at the crater's edge to appreciate the magnitude of this unique geological formation. Time for photographs."
        },
        {
          time: "09:00",
          title: "Hiking to the Footprints",
          description: "4km walk through ancestral trails to the paleontological site where theropod dinosaur footprints are preserved."
        },
        {
          time: "11:00",
          title: "Maragua Community",
          description: "We arrive at the community where we'll be received by local families. You'll learn about their way of life and Andean worldview."
        },
        {
          time: "12:30",
          title: "Community Lunch",
          description: "We enjoy a traditional lunch prepared with local products: potato, chuño, charque, and quinoa."
        },
        {
          time: "14:00",
          title: "Jalq'a Textile Workshop",
          description: "Maragua's weavers teach us the secrets of Jalq'a textiles, recognized by UNESCO as cultural heritage."
        },
        {
          time: "15:30",
          title: "Return Hike",
          description: "We return by a different trail, observing the flora and fauna of the puna ecosystem."
        },
        {
          time: "16:30",
          title: "Return to Sucre",
          description: "Return journey with stops to enjoy sunset views over the valleys."
        }
      ],
      includes: [
        { text: "Certified naturalist guide", included: true },
        { text: "Ecological 4x4 transport (carbon offset)", included: true },
        { text: "Guided hiking (8km total)", included: true },
        { text: "Complete community lunch", included: true },
        { text: "Textile workshop", included: true },
        { text: "Conservation fund contribution", included: true },
        { text: "Trekking poles", included: true },
        { text: "First aid kit", included: true },
        { text: "Trekking boots", included: false },
        { text: "Personal backpack", included: false }
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600&text=Crater+Aerial+View",
        "/placeholder.svg?height=400&width=600&text=Dinosaur+Footprints",
        "/placeholder.svg?height=400&width=600&text=Maragua+Community",
        "/placeholder.svg?height=400&width=600&text=Jalqa+Textiles",
        "/placeholder.svg?height=400&width=600&text=Crater+Trail",
        "/placeholder.svg?height=400&width=600&text=Puna+Sunset"
      ],
      reviews: [
        {
          name: "Emma Wilson",
          country: "United Kingdom",
          rating: 5,
          date: "March 2024",
          comment: "A life-changing experience. The dinosaur footprints are incredible, but what truly moved me was the warmth of the community and learning about their textile traditions."
        },
        {
          name: "Lucas Ferreira",
          country: "Brazil",
          rating: 5,
          date: "February 2024",
          comment: "Out of this world landscapes! The crater is impressive and knowing we contributed to the local community makes everything more special."
        },
        {
          name: "Sophie Martin",
          country: "Canada",
          rating: 5,
          date: "January 2024",
          comment: "This is what sustainable tourism should look like. Every aspect was thoughtfully planned to benefit the local community while giving us an unforgettable adventure."
        }
      ],
      faqs: [
        {
          question: "What fitness level is required?",
          answer: "Moderate fitness is required. The hike is 8km total with gentle slopes. If you have doubts, consult with us."
        },
        {
          question: "What happens if it rains?",
          answer: "The tour runs in moderate rain (it's part of the experience). In case of severe storms, we reschedule at no cost."
        },
        {
          question: "How does the tour contribute to the community?",
          answer: "30% of the price goes directly to the community: fair pay to families, school fund, and paleontological site conservation projects."
        }
      ],
      meetingPoint: "Sucre Bus Terminal, Av. Ostria Gutiérrez",
      icon: Mountain
    }
  }
}

// Labels for both languages
const labels = {
  es: {
    backToExperiences: "Volver a Experiencias",
    perPerson: "por persona",
    bookNow: "Reservar Ahora",
    requestInfo: "Solicitar Información",
    highlights: "Lo que incluye esta experiencia",
    itinerary: "Itinerario Detallado",
    whatsIncluded: "Qué está incluido",
    gallery: "Galería de Fotos",
    reviews: "Opiniones de Viajeros",
    faqs: "Preguntas Frecuentes",
    meetingPoint: "Punto de Encuentro",
    difficulty: "Dificultad",
    duration: "Duración",
    groupSize: "Tamaño del Grupo",
    basedOn: "basado en",
    reviewsText: "opiniones",
    included: "Incluido",
    notIncluded: "No incluido",
    sustainableExperience: "Experiencia Sostenible",
    sustainableDesc: "Este tour contribuye directamente al desarrollo de comunidades locales y proyectos de conservación.",
    flexibleCancellation: "Cancelación Flexible",
    flexibleDesc: "Cancela hasta 48 horas antes sin penalización.",
    smallGroups: "Grupos Reducidos",
    smallGroupsDesc: "Experiencia personalizada con grupos pequeños.",
    notFound: "Experiencia no encontrada",
    notFoundDesc: "La experiencia que buscas no existe o ha sido removida.",
    goBack: "Volver al inicio"
  },
  en: {
    backToExperiences: "Back to Experiences",
    perPerson: "per person",
    bookNow: "Book Now",
    requestInfo: "Request Information",
    highlights: "What this experience includes",
    itinerary: "Detailed Itinerary",
    whatsIncluded: "What's Included",
    gallery: "Photo Gallery",
    reviews: "Traveler Reviews",
    faqs: "Frequently Asked Questions",
    meetingPoint: "Meeting Point",
    difficulty: "Difficulty",
    duration: "Duration",
    groupSize: "Group Size",
    basedOn: "based on",
    reviewsText: "reviews",
    included: "Included",
    notIncluded: "Not included",
    sustainableExperience: "Sustainable Experience",
    sustainableDesc: "This tour directly contributes to local community development and conservation projects.",
    flexibleCancellation: "Flexible Cancellation",
    flexibleDesc: "Cancel up to 48 hours before without penalty.",
    smallGroups: "Small Groups",
    smallGroupsDesc: "Personalized experience with small groups.",
    notFound: "Experience not found",
    notFoundDesc: "The experience you're looking for doesn't exist or has been removed.",
    goBack: "Go back home"
  }
}

export default function ExperienceDetailPage() {
  const params = useParams()
  const { language } = useI18n()
  const id = params.id as string
  
  const experience = experienceData[language]?.[id as keyof typeof experienceData.es]
  const l = labels[language]

  if (!experience) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-cream-50 pt-20">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold text-wood-800 mb-4">{l.notFound}</h1>
            <p className="text-wood-600 mb-8">{l.notFoundDesc}</p>
            <Link href="/" className="inline-flex items-center gap-2 text-terracotta-600 hover:text-terracotta-700">
              <ArrowLeft className="h-4 w-4" />
              {l.goBack}
            </Link>
          </div>
        </main>
      </>
    )
  }

  const IconComponent = experience.icon

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-cream-50">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px]">
          <Image
            src={experience.heroImage}
            alt={experience.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Back Button */}
          <div className="absolute top-24 left-4 md:left-8 z-10">
            <Link 
              href="/#experiencias"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-wood-700 hover:bg-white transition-colors text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              {l.backToExperiences}
            </Link>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <Badge className="mb-4 bg-terracotta-500 hover:bg-terracotta-500 text-white">
                {experience.category}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                {experience.name}
              </h1>
              <p className="text-xl text-white/90 mb-4 max-w-2xl">
                {experience.tagline}
              </p>
              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{experience.groupSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span>{experience.rating} ({experience.reviewCount} {l.reviewsText})</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <section>
                <p className="text-lg text-wood-700 leading-relaxed">
                  {experience.description}
                </p>
              </section>

              {/* Highlights */}
              <section>
                <h2 className="text-2xl font-bold text-wood-800 mb-6 flex items-center gap-3">
                  <Heart className="h-6 w-6 text-terracotta-500" />
                  {l.highlights}
                </h2>
                <ul className="space-y-3">
                  {experience.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 rounded-full p-1 bg-terracotta-100 text-terracotta-600">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-wood-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Itinerary */}
              <section>
                <h2 className="text-2xl font-bold text-wood-800 mb-6 flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-terracotta-500" />
                  {l.itinerary}
                </h2>
                <div className="space-y-6">
                  {experience.itinerary.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-terracotta-100 text-terracotta-600 flex items-center justify-center font-semibold text-sm">
                          {item.time}
                        </div>
                        {index < experience.itinerary.length - 1 && (
                          <div className="w-0.5 flex-1 bg-cream-200 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <h3 className="font-semibold text-wood-800 mb-1">{item.title}</h3>
                        <p className="text-wood-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* What's Included */}
              <section>
                <h2 className="text-2xl font-bold text-wood-800 mb-6 flex items-center gap-3">
                  <Check className="h-6 w-6 text-terracotta-500" />
                  {l.whatsIncluded}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {experience.includes.map((item, index) => (
                    <div 
                      key={index} 
                      className={`flex items-start gap-3 p-3 rounded-lg ${
                        item.included ? "bg-emerald-50" : "bg-cream-100"
                      }`}
                    >
                      <div className={`mt-0.5 rounded-full p-0.5 ${
                        item.included 
                          ? "bg-emerald-200 text-emerald-700" 
                          : "bg-cream-300 text-wood-400"
                      }`}>
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className={`text-sm ${
                          item.included ? "text-wood-700" : "text-wood-400 line-through"
                        }`}>
                          {item.text}
                        </span>
                        {!item.included && (
                          <span className="block text-xs text-wood-400 mt-0.5">
                            ({l.notIncluded})
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Gallery */}
              <section>
                <h2 className="text-2xl font-bold text-wood-800 mb-6 flex items-center gap-3">
                  <Camera className="h-6 w-6 text-terracotta-500" />
                  {l.gallery}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {experience.gallery.map((image, index) => (
                    <div key={index} className="aspect-[4/3] relative rounded-xl overflow-hidden group">
                      <Image
                        src={image}
                        alt={`${experience.name} - ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Reviews */}
              <section>
                <h2 className="text-2xl font-bold text-wood-800 mb-6 flex items-center gap-3">
                  <Star className="h-6 w-6 text-terracotta-500" />
                  {l.reviews}
                </h2>
                <div className="space-y-4">
                  {experience.reviews.map((review, index) => (
                    <Card key={index} className="border-cream-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-wood-800">{review.name}</h4>
                            <p className="text-sm text-wood-500">{review.country} · {review.date}</p>
                          </div>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < review.rating 
                                    ? "fill-amber-400 text-amber-400" 
                                    : "text-cream-300"
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-wood-600 italic">&quot;{review.comment}&quot;</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* FAQs */}
              <section>
                <h2 className="text-2xl font-bold text-wood-800 mb-6 flex items-center gap-3">
                  <Shield className="h-6 w-6 text-terracotta-500" />
                  {l.faqs}
                </h2>
                <div className="space-y-4">
                  {experience.faqs.map((faq, index) => (
                    <Card key={index} className="border-cream-200">
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-wood-800 mb-2">{faq.question}</h4>
                        <p className="text-wood-600">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Sticky Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Pricing Card */}
                <Card className="border-2 border-terracotta-200 shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-wood-800">${experience.price}</span>
                        <span className="text-wood-500">USD</span>
                      </div>
                      <p className="text-sm text-wood-500">{l.perPerson}</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="h-4 w-4 text-terracotta-500" />
                        <span className="text-wood-600">{l.duration}: {experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Users className="h-4 w-4 text-terracotta-500" />
                        <span className="text-wood-600">{l.groupSize}: {experience.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Footprints className="h-4 w-4 text-terracotta-500" />
                        <span className="text-wood-600">{l.difficulty}: {experience.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        <span className="text-wood-600">
                          {experience.rating} {l.basedOn} {experience.reviewCount} {l.reviewsText}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Link 
                        href="/checkout"
                        className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold transition-colors bg-terracotta-500 hover:bg-terracotta-600 text-white"
                      >
                        {l.bookNow}
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                      <Button variant="outline" className="w-full h-12 border-terracotta-300 text-terracotta-600 hover:bg-terracotta-50">
                        {l.requestInfo}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Meeting Point */}
                <Card className="border-cream-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-wood-800 mb-3 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-terracotta-500" />
                      {l.meetingPoint}
                    </h3>
                    <p className="text-sm text-wood-600">{experience.meetingPoint}</p>
                  </CardContent>
                </Card>

                {/* Trust Badges */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <Leaf className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-emerald-800 text-sm">{l.sustainableExperience}</h4>
                      <p className="text-xs text-emerald-600 mt-1">{l.sustainableDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 text-sm">{l.flexibleCancellation}</h4>
                      <p className="text-xs text-blue-600 mt-1">{l.flexibleDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <Users className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800 text-sm">{l.smallGroups}</h4>
                      <p className="text-xs text-amber-600 mt-1">{l.smallGroupsDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
