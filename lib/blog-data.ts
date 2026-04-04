// ─── Blog Data ────────────────────────────────────────────────────────────────
// Central data store for all blog posts. In a production app this would
// come from a CMS or database. For now it lives here as a typed constant.

export type BlogCategory =
  | "guia-viajero"
  | "atractivos"
  | "seguridad"
  | "gastronomia"
  | "cultura"
  | "naturaleza"

export interface Comment {
  id: string
  author: string
  date: string
  text: string
  rating: number // 1–5, usefulness of the article
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: BlogCategory
  categoryLabel: string
  readingTime: number // minutes
  publishedAt: string // ISO date string
  author: string
  authorRole: string
  image: string
  featured?: boolean
  tags: string[]
  content: BlogSection[]
  relatedSlugs: string[]
  initialComments: Comment[]
  initialRating: { total: number; count: number }
}

export interface BlogSection {
  type: "paragraph" | "heading" | "list" | "tip" | "warning" | "quote"
  text?: string
  items?: string[]
  author?: string // for quotes
}

// ─── Posts ────────────────────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  // ── 1. Guía completa del viajero ──────────────────────────────────────────
  {
    slug: "guia-completa-viajero-sucre",
    title: "Guía completa para visitar Sucre por primera vez",
    excerpt:
      "Todo lo que necesitas saber antes de llegar: transporte, moneda, clima, barrios y los errores más comunes que cometen los viajeros.",
    category: "guia-viajero",
    categoryLabel: "Guía del Viajero",
    readingTime: 9,
    publishedAt: "2026-03-10",
    author: "Equipo Sucre Turismo",
    authorRole: "Redacción oficial",
    image: "/images/blog-guia-viajero.jpg",
    featured: true,
    tags: ["primer viaje", "consejos", "transporte", "moneda", "clima"],
    relatedSlugs: ["mejor-epoca-visitar-sucre", "seguridad-turistica-sucre"],
    initialRating: { total: 93, count: 21 },
    initialComments: [
      {
        id: "c1",
        author: "María G.",
        date: "2026-03-18",
        text: "Excelente guía, me fue muy útil para planificar mi viaje. El dato de los minibuses me ahorró mucho dinero.",
        rating: 5,
      },
      {
        id: "c2",
        author: "Carlos V.",
        date: "2026-03-22",
        text: "Muy completa. Solo añadiría que los cajeros del centro a veces se quedan sin efectivo los fines de semana.",
        rating: 4,
      },
    ],
    content: [
      {
        type: "paragraph",
        text: "Sucre, la capital constitucional de Bolivia y Patrimonio de la Humanidad por la UNESCO, recibe cada año a miles de viajeros atraídos por su arquitectura colonial impecable, su gastronomía única y su rico patrimonio histórico. Planificar bien el viaje marca la diferencia entre una experiencia memorable y una llena de imprevistos.",
      },
      {
        type: "heading",
        text: "Cómo llegar a Sucre",
      },
      {
        type: "paragraph",
        text: "El Aeropuerto Alcantarí (SRE) está ubicado a 35 km del centro. BoA (Boliviana de Aviación) y Amaszonas operan vuelos diarios desde La Paz, Santa Cruz y Cochabamba. El precio promedio de un taxi desde el aeropuerto al centro es de Bs. 100–150 (aprox. $14–22 USD). También puedes tomar buses directos desde La Paz (12 h), Potosí (3 h) o Santa Cruz (14 h) en la terminal de Sucre.",
      },
      {
        type: "heading",
        text: "Moneda y pagos",
      },
      {
        type: "paragraph",
        text: "La moneda oficial es el Boliviano (BOB). El tipo de cambio estable es de aproximadamente Bs. 6.96 por dólar estadounidense. Si bien los principales hoteles y restaurantes aceptan tarjetas de crédito, la mayoría de mercados, taxis y tiendas pequeñas solo trabajan en efectivo. Retira bolivianos en los cajeros del Banco Mercantil Santa Cruz o BNB antes de salir del centro.",
      },
      {
        type: "tip",
        text: "Lleva siempre billetes pequeños. Los comercios locales tienen dificultades para cambiar billetes de Bs. 100 o más.",
      },
      {
        type: "heading",
        text: "Transporte interno",
      },
      {
        type: "list",
        items: [
          "Minibuses urbanos: La opción más económica (Bs. 2–3). Cubren toda la ciudad y se identifican por los carteles en el parabrisas.",
          "Trufis: Taxis colectivos de ruta fija. Económicos y cómodos (Bs. 3–4).",
          "Taxis radiales: Seguros y con tarifa fija por zona. Solicita siempre la tarifa antes de subir.",
          "Bicicletas en alquiler: Varias agencias del centro ofrecen alquiler por hora o día.",
        ],
      },
      {
        type: "heading",
        text: "Clima y qué llevar",
      },
      {
        type: "paragraph",
        text: "Sucre tiene un clima privilegiado: primavera casi todo el año con temperaturas entre 10°C y 22°C. La temporada seca (mayo–octubre) es ideal para recorrer la ciudad sin lluvia. La temporada húmeda (noviembre–abril) tiene lluvias vespertinas pero el paisaje luce especialmente verde. Siempre lleva una chaqueta ligera para las noches y protector solar para el mediodía: a 2,750 m de altitud la radiación UV es intensa.",
      },
      {
        type: "warning",
        text: "El mal de altura (soroche) puede afectar en los primeros días. Descansa el primer día, hidratate bien, consume mate de coca y evita el alcohol las primeras 48 horas.",
      },
      {
        type: "heading",
        text: "Barrios imprescindibles",
      },
      {
        type: "list",
        items: [
          "Centro Histórico: El corazón patrimonial de la ciudad, con la Plaza 25 de Mayo, la Catedral y la Casa de la Libertad.",
          "La Recoleta: Barrio alto con vistas panorámicas y ambiente tranquilo. Ideal para el atardecer.",
          "Juana Azurduy: Zona residencial moderna con excelentes restaurantes y vida nocturna.",
          "El Mercado Central: El alma culinaria de Sucre, imprescindible para el desayuno local.",
        ],
      },
      {
        type: "quote",
        text: "Sucre no se visita, se habita. Cada calle te invita a quedarte un día más.",
        author: "Guía turístico local, 2025",
      },
    ],
  },

  // ── 2. Cal Orcko ─────────────────────────────────────────────────────────
  {
    slug: "cal-orcko-huellas-dinosaurios",
    title: "Cal Orcko: la pared de dinosaurios más grande del mundo",
    excerpt:
      "A pocos kilómetros de Sucre se encuentra el sitio paleontológico más impresionante del mundo: más de 5,000 huellas de dinosaurios en una pared vertical de 80 metros.",
    category: "atractivos",
    categoryLabel: "Atractivos Turísticos",
    readingTime: 6,
    publishedAt: "2026-02-14",
    author: "Dr. Andrés Quispe",
    authorRole: "Paleontólogo — USFX",
    image: "/images/blog-cal-orck.jpg",
    featured: true,
    tags: ["dinosaurios", "paleontología", "cal orcko", "parque cretácico", "naturaleza"],
    relatedSlugs: ["guia-completa-viajero-sucre", "mejor-epoca-visitar-sucre"],
    initialRating: { total: 112, count: 24 },
    initialComments: [
      {
        id: "c3",
        author: "Pedro L.",
        date: "2026-02-20",
        text: "Fui con mi familia y los niños quedaron fascinados. El museo interactivo es excelente.",
        rating: 5,
      },
      {
        id: "c4",
        author: "Sofía M.",
        date: "2026-03-05",
        text: "Increíble lugar. El acceso a la pared desde el mirador es gratuito y la vista ya vale el viaje.",
        rating: 5,
      },
    ],
    content: [
      {
        type: "paragraph",
        text: "Cal Orcko, que en quechua significa 'cerro de cal', alberga la concentración más grande de huellas de dinosaurios en el mundo: más de 5,055 pisadas atribuidas a 294 individuos de al menos ocho especies distintas. La pared calcárea de 1.5 km de largo y 80 metros de altura fue descubierta en 1994 por trabajadores de la cementera FANCESA, y hoy es un atractivo científico y turístico de talla mundial.",
      },
      {
        type: "heading",
        text: "Qué ver en Cal Orcko",
      },
      {
        type: "list",
        items: [
          "La Pared Fósil: Accesible desde el mirador del Parque Cretácico, visible sin costo adicional.",
          "Parque Cretácico: Museo al aire libre con réplicas a escala real de dinosaurios, incluyendo un titanosaurio de 18 metros.",
          "Centro de Interpretación: Exposición científica con fósiles originales, videos y maquetas interactivas.",
          "Recorrido guiado: Tours de 1.5 horas disponibles en español e inglés con guías especializados.",
        ],
      },
      {
        type: "heading",
        text: "Las huellas más famosas",
      },
      {
        type: "paragraph",
        text: "Entre todas las trazas, destaca la denominada 'Cal Orcko 01', una secuencia de 347 metros perteneciente a un titanosaurio joven, considerada la pista de un solo animal más larga jamás encontrada. También se han identificado huellas de Tyrannosaurus rex, Ankylosaurus y varios terópodos bípedos, todos de hace aproximadamente 68 millones de años.",
      },
      {
        type: "tip",
        text: "El Parque Cretácico está a solo 5 km del centro. Puedes llegar en taxi por Bs. 20–25 o en el minibús que parte desde la Plaza Libertad.",
      },
      {
        type: "heading",
        text: "Información práctica",
      },
      {
        type: "list",
        items: [
          "Horario: martes a domingo, 9:00 am – 5:00 pm.",
          "Entrada al Parque Cretácico: Bs. 30 (nacionales) / Bs. 60 (extranjeros).",
          "El mirador exterior es de libre acceso los 7 días.",
          "Llevar agua, protector solar y zapatos cómodos.",
        ],
      },
      {
        type: "quote",
        text: "Ver esas huellas es mirar directamente al Cretácico. Es un privilegio que pocos destinos del mundo pueden ofrecer.",
        author: "National Geographic, reseña 2024",
      },
    ],
  },

  // ── 3. Seguridad Turística ────────────────────────────────────────────────
  {
    slug: "seguridad-turistica-sucre",
    title: "Seguridad turística en Sucre: guía práctica y actualizada",
    excerpt:
      "Sucre es considerada una de las ciudades más seguras de Bolivia. Conoce las zonas recomendadas, consejos clave y qué hacer en caso de emergencia.",
    category: "seguridad",
    categoryLabel: "Seguridad Turística",
    readingTime: 7,
    publishedAt: "2026-03-28",
    author: "Equipo Sucre Turismo",
    authorRole: "Redacción oficial",
    image: "/images/blog-seguridad.jpg",
    featured: false,
    tags: ["seguridad", "consejos", "emergencias", "zona segura", "viaje seguro"],
    relatedSlugs: ["guia-completa-viajero-sucre", "mejor-epoca-visitar-sucre"],
    initialRating: { total: 78, count: 17 },
    initialComments: [
      {
        id: "c5",
        author: "Ana R.",
        date: "2026-04-01",
        text: "Muy útil, especialmente los números de emergencia. Los guardé antes de viajar.",
        rating: 5,
      },
    ],
    content: [
      {
        type: "paragraph",
        text: "Sucre tiene una reputación merecida de ser la ciudad más segura y tranquila de Bolivia. Su ritmo pausado, la fuerte presencia policial en el centro histórico y la cultura acogedora de los sucrenses hacen que sea un destino amigable incluso para viajeros solitarios y familias con niños.",
      },
      {
        type: "heading",
        text: "Índice de seguridad",
      },
      {
        type: "paragraph",
        text: "Según el índice Numbeo 2025, Sucre registra uno de los índices de criminalidad más bajos de toda Bolivia y está por debajo del promedio latinoamericano. El turismo es una actividad económica importante para la ciudad, por lo que existe un fuerte incentivo institucional para mantener la seguridad del visitante.",
      },
      {
        type: "heading",
        text: "Zonas recomendadas",
      },
      {
        type: "list",
        items: [
          "Centro Histórico (Plaza 25 de Mayo y alrededores): Zona de alta vigilancia policial, muy segura de día y noche.",
          "La Recoleta: Tranquilo barrio residencial, ideal para caminar solo.",
          "Zona Universitaria: Ambiente animado, especialmente seguro por la presencia estudiantil.",
          "Mercado Central y alrededores: Seguro de día; evitar la zona de madrugada.",
        ],
      },
      {
        type: "heading",
        text: "Consejos generales",
      },
      {
        type: "list",
        items: [
          "No mostrar artículos de valor (cámaras, laptops, joyería) en la vía pública.",
          "Usar taxis radiales o apps de taxi (inDriver es popular) en lugar de tomar taxis de la calle de noche.",
          "Guardar una copia de tu pasaporte en el hotel y llevar solo una copia.",
          "Evitar calles oscuras y poco transitadas después de las 10:00 pm.",
          "En el mercado, usa bolsas cerradas y mantén la cartera en el bolsillo delantero.",
        ],
      },
      {
        type: "warning",
        text: "El 'cuento del tío' (estafas mediante conversación) puede ocurrir en zonas turísticas. Desconfía de extraños que ofrecen descuentos inusuales o piden información bancaria.",
      },
      {
        type: "heading",
        text: "Números de emergencia",
      },
      {
        type: "list",
        items: [
          "Policía Nacional: 110",
          "Bomberos: 119",
          "Ambulancia / Cruz Roja: 118",
          "Policía Turística Sucre: +591 4 6452622",
          "Hospital Santa Bárbara (más cercano al centro): +591 4 6453150",
        ],
      },
      {
        type: "tip",
        text: "La Policía Turística tiene presencia permanente en la Plaza 25 de Mayo. Sus agentes hablan español e inglés básico y están capacitados para asistir a turistas.",
      },
      {
        type: "heading",
        text: "Seguro de viaje",
      },
      {
        type: "paragraph",
        text: "Se recomienda encarecidamente contratar un seguro de viaje que cubra gastos médicos, cancelaciones y pérdida de equipaje. Proveedores como World Nomads, Iati o Assist Card ofrecen planes específicos para Bolivia desde $3 USD/día.",
      },
    ],
  },

  // ── 4. Mejor época para visitar ──────────────────────────────────────────
  {
    slug: "mejor-epoca-visitar-sucre",
    title: "¿Cuál es la mejor época para visitar Sucre?",
    excerpt:
      "Sucre luce bien en cualquier mes, pero hay diferencias clave entre la temporada seca y la lluviosa. Te contamos cuándo ir según lo que quieres vivir.",
    category: "guia-viajero",
    categoryLabel: "Guía del Viajero",
    readingTime: 5,
    publishedAt: "2026-01-20",
    author: "Laura Méndez",
    authorRole: "Periodista de viajes",
    image: "/images/blog-mejor-epoca.jpg",
    featured: false,
    tags: ["clima", "temporada", "cuándo ir", "festividades", "planificación"],
    relatedSlugs: ["guia-completa-viajero-sucre", "seguridad-turistica-sucre"],
    initialRating: { total: 64, count: 15 },
    initialComments: [
      {
        id: "c6",
        author: "Tomás K.",
        date: "2026-02-03",
        text: "Justo lo que necesitaba para decidir las fechas. Muy bien explicado.",
        rating: 4,
      },
    ],
    content: [
      {
        type: "paragraph",
        text: "A 2,750 metros de altitud y rodeada de montañas, Sucre disfruta de un microclima excepcional que ha ganado el apodo de 'Ciudad de la Eterna Primavera'. Las temperaturas rara vez bajan de 8°C en invierno ni superan los 24°C en verano. Aun así, el período que elijas para visitar influirá en la experiencia.",
      },
      {
        type: "heading",
        text: "Temporada seca: mayo – octubre (ideal para turismo)",
      },
      {
        type: "paragraph",
        text: "Este es el momento de mayor flujo turístico. Los días son soleados y secos, perfectos para recorrer la ciudad a pie, hacer excursiones a Cal Orcko o visitar Tarabuco. Las noches en julio y agosto pueden ser frías (hasta 5°C), así que lleva ropa de abrigo. Agosto concentra la mayor cantidad de festividades culturales.",
      },
      {
        type: "heading",
        text: "Temporada húmeda: noviembre – abril (paisajes verdes)",
      },
      {
        type: "paragraph",
        text: "Las lluvias vespertinas son la norma, generalmente entre las 3:00 pm y las 7:00 pm. Las mañanas suelen estar despejadas y son perfectas para visitar los atractivos. El campo luce exuberante y verde, y los precios de alojamiento bajan notablemente. Carnaval (febrero o marzo) es la festividad más vistosa del año.",
      },
      {
        type: "tip",
        text: "Si quieres ver el Carnaval de Sucre o la Fiesta de la Libertad (25 de mayo), reserva alojamiento con meses de anticipación: la ciudad se llena.",
      },
      {
        type: "heading",
        text: "Calendario de festividades clave",
      },
      {
        type: "list",
        items: [
          "Febrero/Marzo — Carnaval de Sucre: Comparsas, chutillos y entrada folclórica en el centro.",
          "Mayo 25 — Día de la Libertad: Celebración histórica con desfiles y eventos culturales.",
          "Agosto — Festival Internacional de Cultura: Música, danza y teatro de toda Bolivia y el mundo.",
          "Septiembre — Feria Departamental de Chuquisaca: Gastronomía, artesanías y productos locales.",
          "Noviembre — Todos Santos: Una de las celebraciones más auténticas del país.",
        ],
      },
    ],
  },

  // ── 5. Textiles y artesanías ──────────────────────────────────────────────
  {
    slug: "textiles-artesanias-sucre",
    title: "Textiles y artesanías de Sucre: guía de compras auténticas",
    excerpt:
      "Los textiles jalq'a y tarabuco son considerados patrimonio cultural. Descubre dónde comprarlos, cómo identificar piezas auténticas y apoyar a los artesanos locales.",
    category: "cultura",
    categoryLabel: "Cultura",
    readingTime: 6,
    publishedAt: "2026-02-28",
    author: "Isabel Torrico",
    authorRole: "Investigadora de patrimonio cultural",
    image: "/images/blog-textiles.jpg",
    featured: false,
    tags: ["artesanías", "textiles", "jalq'a", "tarabuco", "compras", "cultura"],
    relatedSlugs: ["tarabuco-mercado-indigena", "cal-orcko-huellas-dinosaurios"],
    initialRating: { total: 55, count: 13 },
    initialComments: [
      {
        id: "c7",
        author: "Helena S.",
        date: "2026-03-10",
        text: "El dato del ASUR es valiosísimo. Fui y compré directamente a las tejedoras, una experiencia única.",
        rating: 5,
      },
    ],
    content: [
      {
        type: "paragraph",
        text: "Los textiles de la región de Chuquisaca están entre los más sofisticados del mundo andino. Las comunidades jalq'a y tarabuco mantienen vivas tradiciones de tejido que se remontan a siglos antes de la conquista española. Cada pieza es un documento cultural: los diseños comunican cosmovisión, identidad y relación con la naturaleza.",
      },
      {
        type: "heading",
        text: "Textiles Jalq'a",
      },
      {
        type: "paragraph",
        text: "Los tejidos jalq'a se caracterizan por un fondo negro sobre el que se despliegan figuras fantásticas y animales mitológicos en colores vivos —predominantemente rojo y magenta— llamados 'khurus'. Provienen de comunidades al norte de Sucre y son reconocidos internacionalmente por su alta complejidad técnica.",
      },
      {
        type: "heading",
        text: "Textiles Tarabuco",
      },
      {
        type: "paragraph",
        text: "Los textiles de Tarabuco son más coloridos y representan escenas cotidianas, animales y plantas en un estilo narrativo. Se tejen en el telar de cintura y pueden tardar semanas en completarse. Son producidos principalmente por mujeres de la comunidad tarabuqueña.",
      },
      {
        type: "heading",
        text: "Dónde comprar auténtico",
      },
      {
        type: "list",
        items: [
          "ASUR (Museo Textil Etnográfico): Calle San Alberto 413. Vende directamente piezas certificadas de comunidades artesanas. Parte del precio va directo a las tejedoras.",
          "Mercado de Tarabuco: A 64 km de Sucre. Solo domingos. El mercado más auténtico de la región.",
          "Artesanías del Norte, Calle España: Tienda curada con piezas de buena calidad y procedencia verificada.",
          "Mercado Artesanal, Calle Ravelo: Mercado local con más variedad y precios negociables.",
        ],
      },
      {
        type: "tip",
        text: "Para identificar una pieza auténtica: busca irregularidades propias del tejido a mano, colores vegetales que no son uniformes y la etiqueta o firma de la artesana en el reverso.",
      },
      {
        type: "warning",
        text: "Muchos artículos en el mercado central son importados de China o tejidos industrialmente. Si el precio parece demasiado bajo, probablemente no es artesanía auténtica.",
      },
    ],
  },

  // ── 6. Tarabuco ──────────────────────────────────────────────────────────
  {
    slug: "tarabuco-mercado-indigena",
    title: "Tarabuco: el mercado indígena más auténtico de Bolivia",
    excerpt:
      "A 64 km de Sucre, cada domingo el pueblo de Tarabuco se convierte en un mercado de colores. Guía completa para visitarlo con respeto y sacar el mayor provecho.",
    category: "atractivos",
    categoryLabel: "Atractivos Turísticos",
    readingTime: 5,
    publishedAt: "2026-01-08",
    author: "Ricardo Flores",
    authorRole: "Guía turístico certificado",
    image: "/images/blog-tarabuco.jpg",
    featured: false,
    tags: ["tarabuco", "mercado", "cultura indígena", "excursión", "artesanías"],
    relatedSlugs: ["textiles-artesanias-sucre", "mejor-epoca-visitar-sucre"],
    initialRating: { total: 88, count: 19 },
    initialComments: [
      {
        id: "c8",
        author: "Julia P.",
        date: "2026-01-15",
        text: "Una experiencia transformadora. Fui en la excursión organizada y el guía explicó perfectamente la cultura tarabuqueña.",
        rating: 5,
      },
    ],
    content: [
      {
        type: "paragraph",
        text: "Tarabuco es un pequeño municipio de Chuquisaca que cada domingo se convierte en uno de los mercados indígenas más coloridos y auténticos de todo Sudamérica. Los tarabuqueños acuden con sus trajes tradicionales —faldas de lana, ojotas y el ukuku (casco ceremonial de cuero con monedas)— para vender productos agrícolas, tejidos y artesanías.",
      },
      {
        type: "heading",
        text: "Cómo llegar desde Sucre",
      },
      {
        type: "list",
        items: [
          "Excursión organizada: La opción más cómoda. Desde Bs. 60 por persona con salida desde la Plaza Libertad a las 8:00 am.",
          "Bus desde Terminal de Buses: Sale desde las 7:00 am. Bs. 15 por trayecto. Duración aprox. 1h 15min.",
          "Taxi privado: Negocia el precio (aprox. Bs. 120–150 ida y vuelta con espera).",
        ],
      },
      {
        type: "heading",
        text: "Qué ver y hacer",
      },
      {
        type: "list",
        items: [
          "Recorrer el mercado de textiles y artesanías (llega antes de las 10 am para verlo en su apogeo).",
          "Probar el desayuno tarabuqueño: chicha de maíz y platos típicos en los puestos del mercado.",
          "Visitar la iglesia colonial de Tarabuco (s. XVII), con retablos barrocos y arte mestizo.",
          "Fotografiar los trajes ceremoniales (siempre pide permiso antes).",
        ],
      },
      {
        type: "tip",
        text: "El mercado se activa entre las 9:00 am y el mediodía. Después de las 2:00 pm los puestos empiezan a cerrar. Plan recomendado: llegar a las 8:30 am y regresar al mediodía.",
      },
      {
        type: "warning",
        text: "El Pujllay (fiesta de Tarabuco, tercer domingo de marzo) concentra miles de visitantes. Si planificas ir ese día, reserva transporte con semanas de anticipación.",
      },
    ],
  },

  // ── 7. Ruta del Chocolate ─────────────────────────────────────────────────
  {
    slug: "ruta-chocolate-boliviano-sucre",
    title: "La ruta del chocolate boliviano: Sucre, capital del cacao",
    excerpt:
      "Bolivia produce uno de los mejores chocolates del mundo y Sucre es su capital chocolatera. Descubre los talleres, museos y tiendas donde vivir esta dulce experiencia.",
    category: "gastronomia",
    categoryLabel: "Gastronomía",
    readingTime: 5,
    publishedAt: "2026-03-05",
    author: "Valentina Salinas",
    authorRole: "Food blogger — Sabores Andinos",
    image: "/images/blog-chocolate.jpg",
    featured: false,
    tags: ["chocolate", "cacao", "gastronomía", "taller", "souvenir"],
    relatedSlugs: ["guia-completa-viajero-sucre", "textiles-artesanias-sucre"],
    initialRating: { total: 71, count: 16 },
    initialComments: [
      {
        id: "c9",
        author: "Roberto N.",
        date: "2026-03-12",
        text: "Hice el tour en Chocolates Para Ti y fue increíble. El chocolate boliviano no tiene comparación.",
        rating: 5,
      },
      {
        id: "c10",
        author: "Camila H.",
        date: "2026-03-19",
        text: "Gran artículo. Añadiría que en el Mercado Central también venden pasta de maní con chocolate que es para lamer los dedos.",
        rating: 4,
      },
    ],
    content: [
      {
        type: "paragraph",
        text: "Bolivia es el único país del mundo donde el cacao crece en estado silvestre en las selvas del Beni. Este origen exótico le confiere características únicas de sabor: notas frutales, terrosas y levemente florales que lo distinguen de cualquier chocolate del mercado internacional. Sucre se ha posicionado como la capital boliviana del chocolate fino de origen.",
      },
      {
        type: "heading",
        text: "Chocolates Para Ti — El referente",
      },
      {
        type: "paragraph",
        text: "Chocolates Para Ti es la chocolatería más famosa de Sucre, con más de 30 años de historia. Su local en la Calle Audiencia ofrece degustaciones gratuitas, tours al taller de producción (Bs. 30, reserva online) y una tienda con más de 50 variedades de chocolate artesanal. Su trufa de singani (destilado boliviano) es legendaria.",
      },
      {
        type: "heading",
        text: "Museos y talleres",
      },
      {
        type: "list",
        items: [
          "Museo del Chocolate, Calle Bolívar 760: Exposición sobre el proceso del cacao al chocolate con degustación incluida (Bs. 25).",
          "Taller Kakaw, Calle Estudiantes 30: Clases de elaboración de chocolate artesanal de 2 horas (Bs. 80 por persona, incluye llevar tus creaciones).",
          "Ikala Chocolate, Plaza 25 de Mayo: Chocolatería boutique con barras single-origin del Beni y Caranavi.",
        ],
      },
      {
        type: "tip",
        text: "El mejor souvenir de Sucre es una caja de chocolate artesanal. Dura hasta 3 meses en buen estado y cuesta entre Bs. 30 y Bs. 120 según el tamaño.",
      },
      {
        type: "heading",
        text: "El chocolate en la gastronomía local",
      },
      {
        type: "paragraph",
        text: "Más allá del chocolate de mesa, en Sucre encontrarás platos y bebidas que incorporan cacao: el api de chocolate (bebida caliente matutina), el mole boliviano con cacao del Beni y helados artesanales de cacao en la heladería Cholita, a pasos de la Plaza 25 de Mayo.",
      },
    ],
  },

  // ── 8. Casa de la Libertad ────────────────────────────────────────────────
  {
    slug: "casa-libertad-bolivia",
    title: "La Casa de la Libertad: donde nació Bolivia",
    excerpt:
      "En este salón de la antigua Universidad San Francisco Xavier se firmó el Acta de Independencia de Bolivia en 1825. Una visita imprescindible para entender el país.",
    category: "atractivos",
    categoryLabel: "Atractivos Turísticos",
    readingTime: 4,
    publishedAt: "2026-01-28",
    author: "Prof. Marco Bustamante",
    authorRole: "Historiador — USFX Sucre",
    image: "/images/blog-casa-libertad.jpg",
    featured: false,
    tags: ["historia", "independencia", "patrimonio", "museo", "bolivía"],
    relatedSlugs: ["guia-completa-viajero-sucre", "textiles-artesanias-sucre"],
    initialRating: { total: 67, count: 15 },
    initialComments: [
      {
        id: "c11",
        author: "Daniel C.",
        date: "2026-02-05",
        text: "El guía del museo fue excelente, muy didáctico. El Acta original en exposición es impresionante.",
        rating: 5,
      },
    ],
    content: [
      {
        type: "paragraph",
        text: "La Casa de la Libertad, ubicada frente a la Plaza 25 de Mayo, es el edificio histórico más importante de Bolivia. En su Salón de la Independencia, el 6 de agosto de 1825, los representantes de las entonces provincias del Alto Perú firmaron el Acta de Independencia que dio origen a la República Bolívar —hoy Bolivia— en honor al Libertador Simón Bolívar.",
      },
      {
        type: "heading",
        text: "Qué ver en el museo",
      },
      {
        type: "list",
        items: [
          "Salón de la Independencia: El corazón del museo. Conserva el acta original, retratos de los fundadores y el sillón presidencial de Simón Bolívar.",
          "Galería de Presidentes: Retratos y reliquias de todos los presidentes de Bolivia desde 1825.",
          "Sala de Armas: Colección de armas y uniformes de las guerrillas de la Independencia.",
          "Capilla Universitaria (s. XVII): Una de las joyas arquitectónicas del conjunto jesuita.",
        ],
      },
      {
        type: "tip",
        text: "La entrada incluye guía en español e inglés. Duración estimada: 45–60 minutos. Horario: lunes a sábado 9:00 am – 12:00 pm y 2:30 pm – 6:00 pm. Entrada: Bs. 15 (extranjeros).",
      },
      {
        type: "heading",
        text: "Arquitectura colonial",
      },
      {
        type: "paragraph",
        text: "El edificio data del siglo XVII y perteneció originalmente a la Universidad Real y Pontificia San Francisco Xavier de Chuquisaca, fundada en 1624. Su arquitectura combina el estilo barroco mestizo con elementos neoclásicos incorporados en el siglo XIX. La fachada blanca con arcos de piedra tallada es uno de los iconos visuales de Sucre.",
      },
      {
        type: "quote",
        text: "Este salón es el umbral de la libertad. Cada boliviano debería pisarlo al menos una vez en la vida.",
        author: "Javier Mendoza Pizarro, historiador boliviano",
      },
    ],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getRelatedPosts(slugs: string[]): BlogPost[] {
  return slugs
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter((p): p is BlogPost => p !== undefined)
}

export const categoryMeta: Record<
  BlogCategory,
  { label: string; color: string }
> = {
  "guia-viajero": { label: "Guía del Viajero", color: "bg-blue-100 text-blue-800" },
  atractivos: { label: "Atractivos Turísticos", color: "bg-emerald-100 text-emerald-800" },
  seguridad: { label: "Seguridad Turística", color: "bg-amber-100 text-amber-800" },
  gastronomia: { label: "Gastronomía", color: "bg-orange-100 text-orange-800" },
  cultura: { label: "Cultura", color: "bg-purple-100 text-purple-800" },
  naturaleza: { label: "Naturaleza", color: "bg-green-100 text-green-800" },
}
