"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "es" | "en"

export const translations = {
  es: {
    // Navigation
    nav: {
      inicio: "Inicio",
      experiencias: "Experiencias",
      tours: "Tours",
      alojamiento: "Alojamiento",
      gastronomia: "Gastronomía",
      blog: "Blog",
      contacto: "Contacto",
      reservar: "Reservar Ahora",
      idioma: "Idioma",
    },
    // Hero Section
    hero: {
      badge: "Patrimonio de la Humanidad UNESCO",
      title: "Sucre: El Corazón Histórico y Cultural de Bolivia",
      subtitle: "Descubre la capital del patrimonio, la gastronomía y el turismo sostenible",
      experienceLabel: "Tipo de Experiencia",
      experiencePlaceholder: "Selecciona una experiencia",
      durationLabel: "Duración",
      durationPlaceholder: "Selecciona duración",
      cta: "Explorar Destino",
      experienceTypes: [
        { value: "cultura", label: "Cultura" },
        { value: "naturaleza", label: "Naturaleza" },
        { value: "gastronomia", label: "Gastronomía" },
      ],
      durationOptions: [
        { value: "fin-de-semana", label: "Fin de semana" },
        { value: "semana-completa", label: "Semana completa" },
        { value: "nomada-digital", label: "Nómada Digital" },
      ],
    },
    // Experience Comparator
    experiences: {
      badge: "Experiencias Verificadas",
      title: "Compara y Elige tu Aventura",
      description: "Tres experiencias únicas diseñadas para diferentes estilos de viaje. Precios transparentes, sin sorpresas ni costos ocultos.",
      sustainability: "Sostenibilidad Garantizada",
      flexibleBooking: "Reserva Flexible 365 días",
      perPersonDay: "por persona / día",
      allIncluded: "Todo incluido - Sin costos ocultos",
      reviews: "reseñas",
      bookNow: "Reservar Ahora",
      eco: "Eco",
      flexible: "Flexible",
      local: "Local",
      customNeed: "¿Necesitas algo personalizado? Creamos experiencias a medida para grupos y empresas.",
      requestQuote: "Solicitar Cotización Personalizada",
      mostPopular: "Más Popular",
      viewDetails: "Ver Detalles",
      activityDetailsLabel: "Ver detalles de la actividad",
      activityDetailsContent: [
        "El recorrido comienza a las 9:00 h con la recogida en tu alojamiento. Visitaremos la Plaza 25 de Mayo, la Catedral Metropolitana y el Convento de San Felipe Neri, donde disfrutarás de vistas panorámicas únicas de la ciudad. A continuación, nos adentramos en el mercado artesanal de la calle Ravelo y participamos en un taller de tejido con maestras locales. El almuerzo se sirve en un restaurante típico del centro histórico, con platos como el pique macho y la sopa de maní. Por la tarde visitamos la Casa de la Libertad y finalizamos con un paseo por el Parque Bolívar. Regreso al alojamiento aproximadamente a las 18:00 h.",
        "La experiencia gastronómica arranca con un desayuno de bienvenida en el Mercado Central, degustando salteñas recién horneadas y api con pastel. Seguimos hacia las chocolaterías artesanales del centro, donde aprenderás el proceso del cacao hasta la tableta. A mediodía, clase de cocina boliviana en un espacio culinario local: prepararás majadito, picana y buñuelos. La tarde incluye visita a bodegas locales con cata de singani y vinos de Tarija. Cada parada incluye pequeñas degustaciones guiadas. Finalizamos en la feria gastronómica de la plaza para cerrar con anticuchos y chicha morada.",
        "Salida a las 7:00 h desde Sucre hacia el cráter de Maragua en vehículo 4x4. Tras 2 horas de camino, llegamos al mirador principal con vistas al cráter geológico de 8 km de diámetro. Comenzamos el sendero guiado de 8 km atravesando formaciones rocosas multicolores y campos de cultivo andinos. A mitad del trayecto, visita al sitio paleontológico con huellas de dinosaurios del Cretácico. El almuerzo comunitario lo prepara una familia local: sopa de quinua, chuño frito y chicha tradicional. Regresamos a Sucre al caer la tarde, con parada opcional en la comunidad de Potolo para ver tejidos jalq'a.",
      ],
      cards: [
        {
          id: "inmersion-colonial",
          name: "Inmersión Colonial",
          category: "Cultural",
          description: "Sumérgete en la historia viva de la Ciudad Blanca con visitas guiadas a monumentos UNESCO y talleres artesanales.",
          duration: "8 horas",
          groupSize: "2-8 personas",
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
          description: "Descubre la rica gastronomía sucrense: desde chocolates artesanales hasta la auténtica salteña y los mejores mercados locales.",
          duration: "6 horas",
          groupSize: "2-6 personas",
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
          description: "Explora el cráter de Maragua, huellas de dinosaurios y comunidades indígenas con prácticas de turismo regenerativo.",
          duration: "10 horas",
          groupSize: "4-10 personas",
          features: [
            { text: "Guía naturalista certificado", included: true },
            { text: "Transporte 4x4 ecológico", included: true },
            { text: "Senderismo guiado (8km)", included: true },
            { text: "Almuerzo comunitario", included: true },
            { text: "Contribución a conservación", included: true },
            { text: "Equipo de trekking", included: true },
          ],
        },
      ],
    },
    // NPS Widget
    nps: {
      sectionLabel: "Tu opinión importa",
      question: "¿Qué tan probable es que recomiendes la experiencia en Sucre a otros viajeros?",
      scoreLabels: {
        0: "Nada probable",
        1: "Muy poco probable",
        2: "Poco probable",
        3: "Algo improbable",
        4: "Indiferente",
        5: "Algo probable",
        6: "Moderadamente probable",
        7: "Bastante probable",
        8: "Muy probable",
        9: "Extremadamente probable",
        10: "¡Definitivamente!",
      },
      notLikely: "Nada probable",
      veryLikely: "Totalmente seguro",
      confirmScore: "Confirmar puntuación",
      // Promoter
      promoterBadge: "Promotor activo",
      promoterTitle: "¡Gracias por tu entusiasmo!",
      promoterDescription: "Eres exactamente el tipo de viajero que hace grande a Sucre. Tu voz inspira a otros a descubrir este destino único.",
      ambassadorTitle: "Únete a la comunidad de embajadores de Sucre",
      ambassadorDescription: "Comparte tu aventura y conecta con viajeros que aman el patrimonio",
      shareTrip: "Comparte tu viaje con #ViveSucre",
      finishWithoutSharing: "Finalizar sin compartir",
      // Passive
      passiveBadge: "Satisfecho",
      passiveTitle: "Gracias por visitarnos",
      passiveDescription: "Nos alegra que hayas disfrutado. ¿Hay algo que podría convertir tu experiencia en perfecta?",
      passiveQuestion: "¿Qué podríamos mejorar para superar tus expectativas?",
      optional: "(opcional)",
      passivePlaceholder: "Comparte cualquier detalle que hubiera hecho tu viaje aún más especial...",
      sendComment: "Enviar comentario",
      // Detractor
      detractorTitle: "Lamentamos que no fue lo que esperabas",
      detractorDescription: "Tu experiencia nos importa. Cada observación nos ayuda a construir un mejor destino para todos.",
      detractorQuestion: "Ayúdanos a mejorar el destino. ¿En qué fallamos?",
      detractorNote: "Tu retroalimentación directa va al equipo de gestión del destino. Sí, de verdad.",
      detractorPlaceholder: "Cuéntanos qué no funcionó: atención, precios, accesibilidad, higiene, señalización...",
      sendFeedback: "Enviar retroalimentación",
      // Submitted
      submittedTitle: "Recibido. Gracias por tu tiempo.",
      submittedDescription: "Tu voz es parte del esfuerzo colectivo por hacer de Sucre un destino cada vez más extraordinario.",
      responseRecorded: "Respuesta registrada",
      // Footer
      anonymous: "Anónimo · Tiempo estimado: 30 segundos",
    },
    // Checkout
    checkout: {
      back: "Volver",
      securePayment: "Pago Seguro",
      encryptedSSL: "Pago Cifrado SSL",
      sustainableTourism: "Turismo Sostenible",
      flexibleCancellation: "Cancelación Flexible",
      // Progress
      steps: {
        details: "Datos",
        payment: "Pago",
        confirmation: "Confirmación",
      },
      // Payment
      payment: {
        secureTitle: "Pago Cifrado 100% Seguro",
        secureDescription: "Tus datos están protegidos con encriptación SSL de 256 bits",
        selectMethod: "Selecciona tu Método de Pago",
        selectMethodDescription: "Elige la opción que prefieras para completar tu reserva",
        card: "Tarjeta",
        qr: "QR",
        transfer: "Transfer",
        crypto: "Crypto",
        // Card
        cardNumber: "Número de Tarjeta",
        cardName: "Nombre en la Tarjeta",
        expiry: "Fecha de Expiración",
        saveCard: "Guardar tarjeta para futuras reservas",
        invalidCard: "Número de tarjeta inválido",
        required: "Requerido",
        invalidDate: "Fecha inválida",
        invalidCVV: "CVV inválido",
        pay: "Pagar",
        // PayPal
        paypalSecure: "Paga de forma segura con tu cuenta PayPal",
        paypalEmail: "Email de PayPal",
        continuePaypal: "Continuar con PayPal",
        redirectingPaypal: "Redirigiendo a PayPal...",
        pleaseWait: "Por favor espere",
        accountVerified: "Cuenta verificada",
        totalToPay: "Total a pagar:",
        confirmPayment: "Confirmar Pago",
        // QR Bolivia
        qrTitle: "QR Bolivia",
        qrDescription: "Paga escaneando el código QR desde tu app bancaria",
        selectBank: "Selecciona tu Banco",
        selectBankPlaceholder: "Elige tu banco",
        generateQR: "Generar Código QR",
        scanQR: "Escanea el QR con tu app bancaria",
        equivalentBOB: "Equivalente en Bolivianos",
        timeRemaining: "Tiempo restante:",
        qrInstructions: "Instrucciones:",
        qrStep1: "Abre la app de tu banco",
        qrStep2: "Selecciona 'Pagar con QR'",
        qrStep3: "Escanea el código",
        qrStep4: "Confirma el pago",
        paymentMade: "Ya realicé el pago",
        newQR: "Nuevo QR",
        confirmingPayment: "Confirmando tu pago...",
        confirmPaymentBtn: "Confirmar Pago",
        // Transfer
        transferTitle: "Transferencia Bancaria",
        transferDescription: "Realiza una transferencia a nuestra cuenta y sube el comprobante",
        originBank: "Banco de Origen",
        originBankPlaceholder: "Selecciona tu banco",
        continueTransfer: "Continuar",
        transferTo: "Transfiere a la siguiente cuenta:",
        bankName: "Banco:",
        accountNumber: "Número de Cuenta:",
        accountName: "Titular:",
        accountType: "Tipo:",
        savingsAccount: "Cuenta de Ahorros",
        amount: "Monto:",
        copyAccount: "Copiar Cuenta",
        copied: "Copiado",
        referenceNumber: "Número de Comprobante/Referencia",
        referencePlaceholder: "Ej: 123456789",
        uploadProof: "Subir Comprobante (Opcional)",
        selectedFile: "Archivo seleccionado:",
        confirmTransfer: "Confirmar Transferencia",
        // Crypto
        cryptoTitle: "Criptomonedas",
        cryptoDescription: "Paga con Bitcoin, Ethereum, USDT y más",
        selectCrypto: "Selecciona la Criptomoneda",
        selectNetwork: "Selecciona la Red",
        continuePayment: "Continuar al Pago",
        sendExactAmount: "Envía exactamente:",
        toAddress: "A la siguiente dirección:",
        copyAddress: "Copiar Dirección",
        networkWarning: "Asegúrate de enviar por la red",
        networkWarning2: "Enviar por otra red puede resultar en pérdida de fondos.",
        txHash: "Hash de Transacción (TxID)",
        txHashPlaceholder: "0x...",
        confirmCrypto: "Confirmar Pago",
        // Processing Dialog
        processingPayment: "Procesando Pago",
        processingDescription: "Por favor espere mientras procesamos su pago...",
        paymentSuccess: "Pago Exitoso",
        paymentSuccessDesc: "Su pago ha sido procesado correctamente",
      },
      // Summary
      summary: {
        title: "Resumen de Reserva",
        dateLabel: "Fecha",
        travelers: "viajeros",
        remove: "Eliminar",
        subtotal: "Subtotal",
        taxes: "Impuestos",
        discount: "Descuento",
        total: "Total",
        haveCoupon: "¿Tienes un cupón?",
        couponPlaceholder: "Código de descuento",
        apply: "Aplicar",
        continuePayment: "Continuar al Pago",
        pay: "Pagar",
      },
      // Transport
      transport: {
        title: "¿Necesitas Transporte?",
        description: "Opcional — añade traslado desde tu punto de origen hasta Sucre",
        perPerson: "por persona",
        free: "Sin costo adicional",
        originLabel: "Ciudad de origen",
        originPlaceholderGround: "Ej: Potosí, Cochabamba, La Paz...",
        originPlaceholderAir: "Ej: La Paz (LPB), Santa Cruz (VVI)...",
        groundNote: "El transporte terrestre incluye bus cama panorámico con salida coordinada desde tu ciudad. Horarios confirmados 48h antes del viaje.",
        airNote: "El transporte aéreo incluye traslado al aeropuerto + vuelo en aerolínea local. Horarios sujetos a disponibilidad de vuelos.",
        options: {
          none: {
            label: "Sin transporte",
            description: "Llegaré por mis propios medios a Sucre.",
          },
          ground: {
            label: "Transporte terrestre",
            description: "Bus cama panorámico con WiFi y comodidades. Rutas disponibles desde las principales ciudades.",
          },
          air: {
            label: "Transporte aéreo",
            description: "Vuelo en aerolínea local más rápido y cómodo. Incluye traslado al aeropuerto.",
          },
        },
      },
      // Customer Details
      details: {
        title: "Datos del Viajero Principal",
        description: "Esta información se usará para tu reserva y comunicaciones importantes",
        personalInfo: "Información Personal",
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo Electrónico",
        phone: "Teléfono",
        country: "País",
        selectCountry: "Selecciona un país",
        tripDetails: "Detalles del Viaje",
        arrivalDate: "Fecha de Llegada",
        selectDate: "Selecciona una fecha",
        travelers: "Número de Viajeros",
        specialRequests: "Solicitudes Especiales",
        specialRequestsPlaceholder: "Alergias, necesidades especiales, preferencias...",
        termsAccept: "Acepto los",
        termsLink: "términos y condiciones",
        termsAnd: "y la",
        privacyLink: "política de privacidad",
        continue: "Continuar al Pago",
        required: "Campo requerido",
      },
      // Confirmation
      confirmation: {
        title: "¡Reserva Confirmada!",
        thankYou: "Gracias por elegir Sucre",
        confirmationNumber: "Número de Confirmación",
        emailSent: "Te hemos enviado un correo con todos los detalles de tu reserva.",
        bookingDetails: "Detalles de tu Reserva",
        experience: "Experiencia",
        date: "Fecha",
        travelers: "Viajeros",
        total: "Total Pagado",
        whatsNext: "¿Qué sigue?",
        step1Title: "Revisa tu correo",
        step1Desc: "Recibirás un email con tu itinerario completo",
        step2Title: "Prepara tu viaje",
        step2Desc: "Te enviaremos recomendaciones personalizadas",
        step3Title: "Disfruta Sucre",
        step3Desc: "Nuestro equipo te estará esperando",
        backHome: "Volver al Inicio",
        downloadPDF: "Descargar PDF",
      },
    },
    // Value Proposition
    valueProposition: {
      title: "¿Por qué Sucre?: Cuatro razones por las que la Ciudad Blanca nunca se te olvida",
      reasons: [
        {
          title: "Patrimonio de la Humanidad",
          description: "Arquitectura colonial única en el mundo.",
        },
        {
          title: "Historia Profunda",
          description: "Camina entre huellas reales de dinosaurios.",
        },
        {
          title: "Clima Ideal",
          description: "20°C promedio durante todo el año.",
        },
        {
          title: "Calidad Accesible",
          description: "Alto valor turístico a un precio competitivo.",
        },
      ],
    },
    // Gallery
    gallery: {
      badge: "Galería Visual",
      title: "Descubre Sucre",
      subtitle: "Un vistazo a la magia de la Ciudad Blanca: su arquitectura, su gente, su sabor y su naturaleza.",
      images: [
        { alt: "Plaza principal de Sucre con arquitectura colonial blanca", caption: "Plaza 25 de Mayo" },
        { alt: "Iglesia colonial histórica de Sucre al amanecer", caption: "Catedral Metropolitana" },
        { alt: "Gastronomía andina boliviana, salteñas y platos típicos", caption: "Gastronomía Local" },
        { alt: "Paisaje natural de los valles y montañas alrededor de Sucre", caption: "Naturaleza Andina" },
        { alt: "Detalle de tejidos artesanales y textiles bolivianos coloridos", caption: "Artesanía Boliviana" },
        { alt: "Calles empedradas del centro histórico de Sucre", caption: "Centro Histórico" },
      ],
    },
    // Testimonials
    testimonials: {
      badge: "Lo Que Dicen los Viajeros",
      title: "Experiencias Reales, Recuerdos para Siempre",
      subtitle: "Más de 2.400 viajeros ya descubrieron el encanto único de la Ciudad Blanca.",
      reviews: [
        {
          text: "Sucre es súper segura y sus calles coloniales tienen una energía única. Me enamoré de cada rincón. El tour histórico superó todas mis expectativas.",
          name: "Valentina Ríos",
          country: "Argentina",
          experience: "Inmersión Colonial",
        },
        {
          text: "Comí las mejores salteñas de mi vida aquí. La experiencia gastronómica fue increíble: conocí la cocina boliviana auténtica de una manera muy especial.",
          name: "Marc Dubois",
          country: "Francia",
          experience: "Ruta Gastronómica",
        },
        {
          text: "Caminar sobre huellas de dinosaurios reales fue algo que no olvidaré jamás. Una experiencia completamente única que no encontrarás en ningún otro lugar.",
          name: "Sarah Johnson",
          country: "Estados Unidos",
          experience: "Aventura Maragua",
        },
        {
          text: "El clima perfecto, la gente cálida y el nivel turístico a un precio honesto. Sucre es el secreto mejor guardado de Sudamérica. Ya estoy planeando volver.",
          name: "Dieter Müller",
          country: "Alemania",
          experience: "Inmersión Colonial",
        },
      ],
    },
    // Footer
    footer: {
      contact: {
        title: "Contacto",
        address: "Calle Aniceto Arce 87, Centro Histórico\nSucre, Bolivia",
        phone: "+591 4 645 0000",
        email: "hola@descubresucre.com",
      },
      links: {
        title: "Enlaces Útiles",
        items: [
          { label: "Experiencias", href: "/experiencias" },
          { label: "Tours Guiados", href: "/tours" },
          { label: "Alojamiento", href: "/alojamiento" },
          { label: "Gastronomía", href: "/gastronomia" },
          { label: "Blog de Viajes", href: "/blog" },
          { label: "Política de Privacidad", href: "/privacidad" },
        ],
      },
      social: {
        title: "Redes Sociales",
        followUs: "Síguenos y sé parte de nuestra comunidad viajera.",
      },
      newsletter: {
        title: "Newsletter",
        description: "Recibe inspiración de viaje, ofertas exclusivas y guías de Sucre directamente en tu bandeja.",
        placeholder: "Tu correo electrónico",
        button: "Suscribirme",
        successMessage: "¡Gracias! Te hemos añadido a nuestra lista.",
      },
      copyright: "© 2025 Descubre Sucre. Todos los derechos reservados.",
    },
    // Common
    common: {
      loading: "Cargando...",
      error: "Error",
      success: "Éxito",
      cancel: "Cancelar",
      confirm: "Confirmar",
      save: "Guardar",
      delete: "Eliminar",
      edit: "Editar",
      close: "Cerrar",
      search: "Buscar",
      filter: "Filtrar",
      sort: "Ordenar",
      more: "Ver más",
      less: "Ver menos",
      score: "Puntuación",
    },
  },
  en: {
    // Navigation
    nav: {
      inicio: "Home",
      experiencias: "Experiences",
      tours: "Tours",
      alojamiento: "Accommodation",
      gastronomia: "Gastronomy",
      blog: "Blog",
      contacto: "Contact",
      reservar: "Book Now",
      idioma: "Language",
    },
    // Hero Section
    hero: {
      badge: "UNESCO World Heritage Site",
      title: "Sucre: The Historic and Cultural Heart of Bolivia",
      subtitle: "Discover the capital of heritage, gastronomy and sustainable tourism",
      experienceLabel: "Experience Type",
      experiencePlaceholder: "Select an experience",
      durationLabel: "Duration",
      durationPlaceholder: "Select duration",
      cta: "Explore Destination",
      experienceTypes: [
        { value: "cultura", label: "Culture" },
        { value: "naturaleza", label: "Nature" },
        { value: "gastronomia", label: "Gastronomy" },
      ],
      durationOptions: [
        { value: "fin-de-semana", label: "Weekend" },
        { value: "semana-completa", label: "Full week" },
        { value: "nomada-digital", label: "Digital Nomad" },
      ],
    },
    // Experience Comparator
    experiences: {
      badge: "Verified Experiences",
      title: "Compare and Choose Your Adventure",
      description: "Three unique experiences designed for different travel styles. Transparent pricing, no surprises or hidden costs.",
      sustainability: "Guaranteed Sustainability",
      flexibleBooking: "Flexible Booking 365 days",
      perPersonDay: "per person / day",
      allIncluded: "All included - No hidden costs",
      reviews: "reviews",
      bookNow: "Book Now",
      eco: "Eco",
      flexible: "Flexible",
      local: "Local",
      customNeed: "Need something custom? We create tailored experiences for groups and companies.",
      requestQuote: "Request Custom Quote",
      mostPopular: "Most Popular",
      viewDetails: "View Details",
      activityDetailsLabel: "View activity details",
      activityDetailsContent: [
        "The tour begins at 9:00 AM with pick-up at your accommodation. We will visit Plaza 25 de Mayo, the Metropolitan Cathedral and the Convent of San Felipe Neri, where you will enjoy unique panoramic views of the city. Next, we head into the artisan market on Ravelo Street and participate in a weaving workshop with local master weavers. Lunch is served at a traditional restaurant in the historic center, featuring dishes such as pique macho and peanut soup. In the afternoon we visit the Casa de la Libertad and finish with a stroll through Parque Bolívar. Return to accommodation at approximately 6:00 PM.",
        "The gastronomic experience starts with a welcome breakfast at the Central Market, tasting freshly baked salteñas and api with pastel. We continue to the artisan chocolate shops in the city center, where you will learn the process from cacao to chocolate bar. At midday, a Bolivian cooking class in a local culinary space: you will prepare majadito, picana and buñuelos. The afternoon includes a visit to local wineries with singani and Tarija wine tastings. Each stop includes small guided tastings. We finish at the gastronomic fair on the plaza, closing with anticuchos and chicha morada.",
        "Departure at 7:00 AM from Sucre towards the Maragua crater in a 4x4 vehicle. After 2 hours of driving, we reach the main viewpoint overlooking the 8-km geological crater. We begin the 8-km guided trail through multicolored rock formations and Andean farmland. Halfway through, we visit the paleontological site with Cretaceous dinosaur footprints. The community lunch is prepared by a local family: quinoa soup, fried chuño and traditional chicha. We return to Sucre at dusk, with an optional stop at the Potolo community to see jalq'a textiles.",
      ],
      cards: [
        {
          id: "inmersion-colonial",
          name: "Colonial Immersion",
          category: "Cultural",
          description: "Immerse yourself in the living history of the White City with guided tours to UNESCO monuments and artisan workshops.",
          duration: "8 hours",
          groupSize: "2-8 people",
          features: [
            { text: "Certified bilingual guide", included: true },
            { text: "Local transport included", included: true },
            { text: "Entry to 5 museums and monuments", included: true },
            { text: "Traditional weaving workshop", included: true },
            { text: "Typical Bolivian lunch", included: true },
            { text: "Professional photography", included: false },
          ],
        },
        {
          id: "ruta-sabores",
          name: "Flavors Route",
          category: "Gastronomic",
          description: "Discover the rich Sucre gastronomy: from artisan chocolates to authentic salteñas and the best local markets.",
          duration: "6 hours",
          groupSize: "2-6 people",
          features: [
            { text: "Expert gastronomy guide", included: true },
            { text: "Private transport", included: true },
            { text: "Tasting at 6 locations", included: true },
            { text: "Bolivian cooking class", included: true },
            { text: "Tarija wine tasting", included: true },
            { text: "Digital recipe book", included: true },
          ],
        },
        {
          id: "ecoturismo-maragua",
          name: "Maragua Ecotourism",
          category: "Alternative",
          description: "Explore the Maragua crater, dinosaur footprints and indigenous communities with regenerative tourism practices.",
          duration: "10 hours",
          groupSize: "4-10 people",
          features: [
            { text: "Certified naturalist guide", included: true },
            { text: "Ecological 4x4 transport", included: true },
            { text: "Guided hiking (8km)", included: true },
            { text: "Community lunch", included: true },
            { text: "Conservation contribution", included: true },
            { text: "Trekking equipment", included: true },
          ],
        },
      ],
    },
    // NPS Widget
    nps: {
      sectionLabel: "Your opinion matters",
      question: "How likely are you to recommend the Sucre experience to other travelers?",
      scoreLabels: {
        0: "Not at all likely",
        1: "Very unlikely",
        2: "Unlikely",
        3: "Somewhat unlikely",
        4: "Neutral",
        5: "Somewhat likely",
        6: "Moderately likely",
        7: "Quite likely",
        8: "Very likely",
        9: "Extremely likely",
        10: "Definitely!",
      },
      notLikely: "Not at all likely",
      veryLikely: "Absolutely certain",
      confirmScore: "Confirm score",
      // Promoter
      promoterBadge: "Active Promoter",
      promoterTitle: "Thank you for your enthusiasm!",
      promoterDescription: "You're exactly the kind of traveler that makes Sucre great. Your voice inspires others to discover this unique destination.",
      ambassadorTitle: "Join the Sucre ambassadors community",
      ambassadorDescription: "Share your adventure and connect with travelers who love heritage",
      shareTrip: "Share your trip with #ViveSucre",
      finishWithoutSharing: "Finish without sharing",
      // Passive
      passiveBadge: "Satisfied",
      passiveTitle: "Thank you for visiting us",
      passiveDescription: "We're glad you enjoyed it. Is there anything that could make your experience perfect?",
      passiveQuestion: "What could we improve to exceed your expectations?",
      optional: "(optional)",
      passivePlaceholder: "Share any detail that would have made your trip even more special...",
      sendComment: "Send comment",
      // Detractor
      detractorTitle: "We're sorry it wasn't what you expected",
      detractorDescription: "Your experience matters to us. Every observation helps us build a better destination for everyone.",
      detractorQuestion: "Help us improve the destination. Where did we fail?",
      detractorNote: "Your direct feedback goes to the destination management team. Yes, really.",
      detractorPlaceholder: "Tell us what didn't work: service, prices, accessibility, hygiene, signage...",
      sendFeedback: "Send feedback",
      // Submitted
      submittedTitle: "Received. Thank you for your time.",
      submittedDescription: "Your voice is part of the collective effort to make Sucre an increasingly extraordinary destination.",
      responseRecorded: "Response recorded",
      // Footer
      anonymous: "Anonymous · Estimated time: 30 seconds",
    },
    // Checkout
    checkout: {
      back: "Back",
      securePayment: "Secure Payment",
      encryptedSSL: "SSL Encrypted Payment",
      sustainableTourism: "Sustainable Tourism",
      flexibleCancellation: "Flexible Cancellation",
      // Progress
      steps: {
        details: "Details",
        payment: "Payment",
        confirmation: "Confirmation",
      },
      // Payment
      payment: {
        secureTitle: "100% Secure Encrypted Payment",
        secureDescription: "Your data is protected with 256-bit SSL encryption",
        selectMethod: "Select your Payment Method",
        selectMethodDescription: "Choose the option you prefer to complete your reservation",
        card: "Card",
        qr: "QR",
        transfer: "Transfer",
        crypto: "Crypto",
        // Card
        cardNumber: "Card Number",
        cardName: "Name on Card",
        expiry: "Expiration Date",
        saveCard: "Save card for future bookings",
        invalidCard: "Invalid card number",
        required: "Required",
        invalidDate: "Invalid date",
        invalidCVV: "Invalid CVV",
        pay: "Pay",
        // PayPal
        paypalSecure: "Pay securely with your PayPal account",
        paypalEmail: "PayPal Email",
        continuePaypal: "Continue with PayPal",
        redirectingPaypal: "Redirecting to PayPal...",
        pleaseWait: "Please wait",
        accountVerified: "Account verified",
        totalToPay: "Total to pay:",
        confirmPayment: "Confirm Payment",
        // QR Bolivia
        qrTitle: "QR Bolivia",
        qrDescription: "Pay by scanning the QR code from your banking app",
        selectBank: "Select your Bank",
        selectBankPlaceholder: "Choose your bank",
        generateQR: "Generate QR Code",
        scanQR: "Scan the QR with your banking app",
        equivalentBOB: "Equivalent in Bolivianos",
        timeRemaining: "Time remaining:",
        qrInstructions: "Instructions:",
        qrStep1: "Open your banking app",
        qrStep2: "Select 'Pay with QR'",
        qrStep3: "Scan the code",
        qrStep4: "Confirm the payment",
        paymentMade: "I already made the payment",
        newQR: "New QR",
        confirmingPayment: "Confirming your payment...",
        confirmPaymentBtn: "Confirm Payment",
        // Transfer
        transferTitle: "Bank Transfer",
        transferDescription: "Make a transfer to our account and upload the receipt",
        originBank: "Origin Bank",
        originBankPlaceholder: "Select your bank",
        continueTransfer: "Continue",
        transferTo: "Transfer to the following account:",
        bankName: "Bank:",
        accountNumber: "Account Number:",
        accountName: "Account Holder:",
        accountType: "Type:",
        savingsAccount: "Savings Account",
        amount: "Amount:",
        copyAccount: "Copy Account",
        copied: "Copied",
        referenceNumber: "Reference/Receipt Number",
        referencePlaceholder: "E.g: 123456789",
        uploadProof: "Upload Receipt (Optional)",
        selectedFile: "Selected file:",
        confirmTransfer: "Confirm Transfer",
        // Crypto
        cryptoTitle: "Cryptocurrencies",
        cryptoDescription: "Pay with Bitcoin, Ethereum, USDT and more",
        selectCrypto: "Select Cryptocurrency",
        selectNetwork: "Select Network",
        continuePayment: "Continue to Payment",
        sendExactAmount: "Send exactly:",
        toAddress: "To the following address:",
        copyAddress: "Copy Address",
        networkWarning: "Make sure to send on the",
        networkWarning2: "network. Sending on another network may result in loss of funds.",
        txHash: "Transaction Hash (TxID)",
        txHashPlaceholder: "0x...",
        confirmCrypto: "Confirm Payment",
        // Processing Dialog
        processingPayment: "Processing Payment",
        processingDescription: "Please wait while we process your payment...",
        paymentSuccess: "Payment Successful",
        paymentSuccessDesc: "Your payment has been processed successfully",
      },
      // Summary
      summary: {
        title: "Reservation Summary",
        dateLabel: "Date",
        travelers: "travelers",
        remove: "Remove",
        subtotal: "Subtotal",
        taxes: "Taxes",
        discount: "Discount",
        total: "Total",
        haveCoupon: "Have a coupon?",
        couponPlaceholder: "Discount code",
        apply: "Apply",
        continuePayment: "Continue to Payment",
        pay: "Pay",
      },
      // Transport
      transport: {
        title: "Do you need Transport?",
        description: "Optional — add a transfer from your origin to Sucre",
        perPerson: "per person",
        free: "No extra cost",
        originLabel: "City of origin",
        originPlaceholderGround: "E.g: Potosí, Cochabamba, La Paz...",
        originPlaceholderAir: "E.g: La Paz (LPB), Santa Cruz (VVI)...",
        groundNote: "Ground transport includes a panoramic sleeper bus with departure coordinated from your city. Schedules confirmed 48h before the trip.",
        airNote: "Air transport includes airport transfer + domestic flight. Schedules subject to flight availability.",
        options: {
          none: {
            label: "No transport",
            description: "I will arrive in Sucre by my own means.",
          },
          ground: {
            label: "Ground transport",
            description: "Panoramic sleeper bus with WiFi and amenities. Routes available from major cities.",
          },
          air: {
            label: "Air transport",
            description: "Domestic airline flight, faster and more comfortable. Includes airport transfer.",
          },
        },
      },
      // Customer Details
      details: {
        title: "Primary Traveler Information",
        description: "This information will be used for your reservation and important communications",
        personalInfo: "Personal Information",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phone: "Phone",
        country: "Country",
        selectCountry: "Select a country",
        tripDetails: "Trip Details",
        arrivalDate: "Arrival Date",
        selectDate: "Select a date",
        travelers: "Number of Travelers",
        specialRequests: "Special Requests",
        specialRequestsPlaceholder: "Allergies, special needs, preferences...",
        termsAccept: "I accept the",
        termsLink: "terms and conditions",
        termsAnd: "and the",
        privacyLink: "privacy policy",
        continue: "Continue to Payment",
        required: "Required field",
      },
      // Confirmation
      confirmation: {
        title: "Booking Confirmed!",
        thankYou: "Thank you for choosing Sucre",
        confirmationNumber: "Confirmation Number",
        emailSent: "We have sent you an email with all the details of your reservation.",
        bookingDetails: "Your Booking Details",
        experience: "Experience",
        date: "Date",
        travelers: "Travelers",
        total: "Total Paid",
        whatsNext: "What's next?",
        step1Title: "Check your email",
        step1Desc: "You will receive an email with your complete itinerary",
        step2Title: "Prepare your trip",
        step2Desc: "We will send you personalized recommendations",
        step3Title: "Enjoy Sucre",
        step3Desc: "Our team will be waiting for you",
        backHome: "Back to Home",
        downloadPDF: "Download PDF",
      },
    },
    // Value Proposition
    valueProposition: {
      title: "Why Sucre?: Four reasons the White City stays with you forever",
      reasons: [
        {
          title: "World Heritage Site",
          description: "Unique colonial architecture found nowhere else on earth.",
        },
        {
          title: "Deep History",
          description: "Walk among real dinosaur footprints.",
        },
        {
          title: "Ideal Climate",
          description: "20°C average temperature all year round.",
        },
        {
          title: "Accessible Quality",
          description: "High tourist value at a competitive price.",
        },
      ],
    },
    // Gallery
    gallery: {
      badge: "Visual Gallery",
      title: "Discover Sucre",
      subtitle: "A glimpse into the magic of the White City: its architecture, people, flavours and nature.",
      images: [
        { alt: "Main square of Sucre with white colonial architecture", caption: "Plaza 25 de Mayo" },
        { alt: "Historic colonial church in Sucre at dawn", caption: "Metropolitan Cathedral" },
        { alt: "Andean Bolivian gastronomy, salteñas and typical dishes", caption: "Local Gastronomy" },
        { alt: "Natural landscape of valleys and mountains around Sucre", caption: "Andean Nature" },
        { alt: "Detail of colourful Bolivian artisanal textiles and weaving", caption: "Bolivian Crafts" },
        { alt: "Cobblestone streets of the historic centre of Sucre", caption: "Historic Centre" },
      ],
    },
    // Testimonials
    testimonials: {
      badge: "What Travellers Say",
      title: "Real Experiences, Memories That Last Forever",
      subtitle: "Over 2,400 travellers have already discovered the unique charm of the White City.",
      reviews: [
        {
          text: "Sucre is incredibly safe and its colonial streets have a unique energy. I fell in love with every corner. The historical tour exceeded all my expectations.",
          name: "Valentina Ríos",
          country: "Argentina",
          experience: "Colonial Immersion",
        },
        {
          text: "I ate the best salteñas of my life here. The gastronomic experience was incredible — I discovered authentic Bolivian cuisine in a very special way.",
          name: "Marc Dubois",
          country: "France",
          experience: "Gastronomy Tour",
        },
        {
          text: "Walking on real dinosaur footprints was something I will never forget. A completely unique experience you won't find anywhere else in the world.",
          name: "Sarah Johnson",
          country: "United States",
          experience: "Maragua Adventure",
        },
        {
          text: "Perfect weather, warm people and a high tourist standard at an honest price. Sucre is South America's best kept secret. I'm already planning to return.",
          name: "Dieter Müller",
          country: "Germany",
          experience: "Colonial Immersion",
        },
      ],
    },
    // Footer
    footer: {
      contact: {
        title: "Contact",
        address: "Calle Aniceto Arce 87, Historic Centre\nSucre, Bolivia",
        phone: "+591 4 645 0000",
        email: "hello@discoversucre.com",
      },
      links: {
        title: "Useful Links",
        items: [
          { label: "Experiences", href: "/experiencias" },
          { label: "Guided Tours", href: "/tours" },
          { label: "Accommodation", href: "/alojamiento" },
          { label: "Gastronomy", href: "/gastronomia" },
          { label: "Travel Blog", href: "/blog" },
          { label: "Privacy Policy", href: "/privacidad" },
        ],
      },
      social: {
        title: "Social Media",
        followUs: "Follow us and become part of our travel community.",
      },
      newsletter: {
        title: "Newsletter",
        description: "Receive travel inspiration, exclusive deals and Sucre guides straight to your inbox.",
        placeholder: "Your email address",
        button: "Subscribe",
        successMessage: "Thank you! You have been added to our list.",
      },
      copyright: "© 2025 Discover Sucre. All rights reserved.",
    },
    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      close: "Close",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      more: "See more",
      less: "See less",
      score: "Score",
    },
  },
} as const

type Translations = typeof translations

interface I18nContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations[Language]
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")
  
  // Persist language preference
  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null
    if (saved && (saved === "es" || saved === "en")) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
    // Update html lang attribute
    document.documentElement.lang = lang
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t: translations[language] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider")
  return ctx
}
