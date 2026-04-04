"use client"

import { useState } from "react"
import Image from "next/image"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Globe,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type ContactReason =
  | "informacion-general"
  | "reserva-tour"
  | "alojamiento"
  | "gastronomia"
  | "prensa"
  | "otro"

interface FormData {
  nombre: string
  email: string
  telefono: string
  motivo: ContactReason | ""
  asunto: string
  mensaje: string
  aceptaTerminos: boolean
}

const CONTACT_REASONS: { value: ContactReason; label: string }[] = [
  { value: "informacion-general", label: "Informacion general sobre Sucre" },
  { value: "reserva-tour", label: "Reserva de tour o actividad" },
  { value: "alojamiento", label: "Consulta sobre alojamiento" },
  { value: "gastronomia", label: "Recomendaciones gastronomicas" },
  { value: "prensa", label: "Prensa y medios de comunicacion" },
  { value: "otro", label: "Otro motivo" },
]

// ─── FAQ data ─────────────────────────────────────────────────────────────────

interface FaqItem {
  q: string
  a: string
}

const FAQS: FaqItem[] = [
  {
    q: "¿Cuál es la mejor época para visitar Sucre?",
    a: "La temporada seca (mayo a octubre) es la más recomendada. El cielo es despejado, las temperaturas son frescas y agradables (15–22°C), y prácticamente no llueve. Agosto y septiembre son los meses más visitados. La temporada de lluvias (noviembre a abril) también tiene su encanto: los valles se vuelven verdes y hay menos turistas.",
  },
  {
    q: "¿Necesito visa para entrar a Bolivia desde mi país?",
    a: "Los ciudadanos de la mayoría de países latinoamericanos y muchos europeos no necesitan visa. Los ciudadanos de Estados Unidos, Canadá y Australia deben tramitar una visa de turista. Te recomendamos verificar los requisitos vigentes en el consulado boliviano de tu país antes de viajar, ya que las regulaciones pueden cambiar.",
  },
  {
    q: "¿Cómo llego a Sucre?",
    a: "Sucre cuenta con el Aeropuerto Internacional Alcantarí (SRE), con vuelos directos desde La Paz, Santa Cruz y Cochabamba. También hay buses interprovinciales desde todas las ciudades principales de Bolivia. El aeropuerto está a 35 km del centro histórico; el traslado toma aproximadamente 40 minutos.",
  },
  {
    q: "¿Cuánto dinero necesito por día en Sucre?",
    a: "Sucre es una ciudad muy accesible. Con un presupuesto de 30–50 USD diarios puedes comer bien, hospedarte en un hostal cómodo y hacer actividades. Con 80–150 USD tendrás una experiencia cómoda en hotel boutique e incluye tours. Los pagos en efectivo (bolivianos, BOB) son los más aceptados; el tipo de cambio oficial es aproximadamente 6.9 BOB por 1 USD.",
  },
  {
    q: "¿Es seguro Sucre para los turistas?",
    a: "Sucre es considerada una de las ciudades más seguras de Bolivia. El centro histórico está bien iluminado y tiene presencia policial constante. Las precauciones habituales aplican: no exhibir objetos de valor en exceso, evitar zonas periféricas de noche y preferir taxis de aplicación o recomendados por el hotel. La Policía de Turismo tiene una oficina en la Plaza 25 de Mayo.",
  },
  {
    q: "¿Con cuánta anticipación debo reservar los tours?",
    a: "Para grupos de hasta 4 personas, con 24–48 horas de anticipación suele ser suficiente. Para grupos grandes (8+ personas) o tours premium (hacienda colonial, astronomía), recomendamos reservar con al menos una semana de anticipación, especialmente en temporada alta (julio–septiembre).",
  },
]

// ─── Contact Info Block ───────────────────────────────────────────────────────

function ContactInfoBlock() {
  return (
    <div className="flex flex-col gap-6">
      {/* Map image */}
      <div className="relative h-52 rounded-xl overflow-hidden border border-border">
        <Image
          src="/images/contacto-hero.jpg"
          alt="Plaza 25 de Mayo, Sucre Bolivia"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-full text-xs font-medium text-foreground">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          Plaza 25 de Mayo, Sucre
        </div>
      </div>

      {/* Contact details */}
      <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4">
        <h3 className="font-serif text-lg font-semibold text-foreground">
          Informacion de contacto
        </h3>

        <ul className="flex flex-col gap-3">
          <li className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-lg shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Direccion</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Plaza 25 de Mayo s/n, Oficina de Turismo
                <br />
                Sucre, Chuquisaca — Bolivia
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-lg shrink-0 mt-0.5">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Telefono / WhatsApp</p>
              <a
                href="tel:+59164522222"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                +591 64 52-2222
              </a>
              <br />
              <a
                href="https://wa.me/59164522222"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-700 transition-colors mt-0.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Escribir por WhatsApp
              </a>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-lg shrink-0 mt-0.5">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Correo electronico</p>
              <a
                href="mailto:info@visitasucre.bo"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                info@visitasucre.bo
              </a>
              <br />
              <a
                href="mailto:tours@visitasucre.bo"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                tours@visitasucre.bo
              </a>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-lg shrink-0 mt-0.5">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Horario de atencion</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lunes a viernes: 8:00 – 18:00
                <br />
                Sabados: 9:00 – 14:00
                <br />
                Domingos: cerrado
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-lg shrink-0 mt-0.5">
              <Globe className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Idiomas de atencion</p>
              <p className="text-sm text-muted-foreground">
                Español · English · Português
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Social media */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-serif text-base font-semibold text-foreground mb-3">
          Siguenos en redes sociales
        </h3>
        <div className="flex flex-col gap-2">
          {[
            {
              icon: Instagram,
              label: "@visitasucre.bo",
              href: "https://instagram.com/visitasucre.bo",
              color: "text-pink-500",
            },
            {
              icon: Facebook,
              label: "Visita Sucre Bolivia",
              href: "https://facebook.com/visitasucre",
              color: "text-blue-600",
            },
            {
              icon: Youtube,
              label: "Visita Sucre",
              href: "https://youtube.com/@visitasucre",
              color: "text-red-600",
            },
          ].map(({ icon: Icon, label, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary transition-colors group"
            >
              <Icon className={`w-4 h-4 ${color}`} />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    motivo: "",
    asunto: "",
    mensaje: "",
    aceptaTerminos: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio."
    if (!form.email.trim()) {
      newErrors.email = "El correo es obligatorio."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Ingresa un correo valido."
    }
    if (!form.motivo) newErrors.motivo = "Selecciona el motivo de tu consulta."
    if (!form.mensaje.trim()) newErrors.mensaje = "Escribe tu mensaje."
    else if (form.mensaje.trim().length < 20)
      newErrors.mensaje = "El mensaje debe tener al menos 20 caracteres."
    if (!form.aceptaTerminos)
      newErrors.aceptaTerminos = "Debes aceptar los terminos para continuar."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 bg-card border border-border rounded-xl text-center gap-4">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-green-600" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-semibold text-foreground">
            Mensaje enviado
          </h3>
          <p className="text-muted-foreground text-sm mt-1 leading-relaxed max-w-xs">
            Gracias, <strong>{form.nombre}</strong>. Responderemos a{" "}
            <strong>{form.email}</strong> en un plazo maximo de 24 horas habiles.
          </p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false)
            setForm({
              nombre: "",
              email: "",
              telefono: "",
              motivo: "",
              asunto: "",
              mensaje: "",
              aceptaTerminos: false,
            })
          }}
          className="text-sm text-primary hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-card border border-border rounded-xl p-6 flex flex-col gap-5"
    >
      <div>
        <h3 className="font-serif text-lg font-semibold text-foreground">
          Envianos un mensaje
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          Respondemos en menos de 24 horas habiles.
        </p>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nombre" className="text-sm font-medium text-foreground">
            Nombre completo <span className="text-primary">*</span>
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Maria Gomez"
            className={`h-10 px-3 rounded-md border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-shadow ${
              errors.nombre ? "border-destructive" : "border-input"
            }`}
          />
          {errors.nombre && (
            <p className="text-xs text-destructive">{errors.nombre}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Correo electronico <span className="text-primary">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            className={`h-10 px-3 rounded-md border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-shadow ${
              errors.email ? "border-destructive" : "border-input"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Phone + Reason */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="telefono" className="text-sm font-medium text-foreground">
            Telefono / WhatsApp{" "}
            <span className="text-muted-foreground text-xs">(opcional)</span>
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            autoComplete="tel"
            value={form.telefono}
            onChange={handleChange}
            placeholder="+591 6x xxx xxxx"
            className="h-10 px-3 rounded-md border border-input text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="motivo" className="text-sm font-medium text-foreground">
            Motivo de contacto <span className="text-primary">*</span>
          </label>
          <select
            id="motivo"
            name="motivo"
            value={form.motivo}
            onChange={handleChange}
            className={`h-10 px-3 rounded-md border text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-ring transition-shadow appearance-none ${
              errors.motivo ? "border-destructive" : "border-input"
            } ${!form.motivo ? "text-muted-foreground" : ""}`}
          >
            <option value="" disabled>
              Selecciona una opcion
            </option>
            {CONTACT_REASONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          {errors.motivo && (
            <p className="text-xs text-destructive">{errors.motivo}</p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="asunto" className="text-sm font-medium text-foreground">
          Asunto{" "}
          <span className="text-muted-foreground text-xs">(opcional)</span>
        </label>
        <input
          id="asunto"
          name="asunto"
          type="text"
          value={form.asunto}
          onChange={handleChange}
          placeholder="Ej: Consulta sobre tour para grupo de 6 personas"
          className="h-10 px-3 rounded-md border border-input text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-shadow"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="mensaje" className="text-sm font-medium text-foreground">
          Mensaje <span className="text-primary">*</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          value={form.mensaje}
          onChange={handleChange}
          placeholder="Cuéntanos en qué podemos ayudarte. Mientras más detalle nos des, mejor podremos orientarte."
          className={`px-3 py-2.5 rounded-md border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none leading-relaxed ${
            errors.mensaje ? "border-destructive" : "border-input"
          }`}
        />
        <div className="flex items-center justify-between">
          {errors.mensaje ? (
            <p className="text-xs text-destructive">{errors.mensaje}</p>
          ) : (
            <span />
          )}
          <span
            className={`text-xs tabular-nums ${
              form.mensaje.length < 20 && form.mensaje.length > 0
                ? "text-destructive"
                : "text-muted-foreground"
            }`}
          >
            {form.mensaje.length} / 1000
          </span>
        </div>
      </div>

      {/* Terms */}
      <div className="flex flex-col gap-1">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            name="aceptaTerminos"
            checked={form.aceptaTerminos}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 accent-primary shrink-0"
          />
          <span className="text-sm text-muted-foreground leading-relaxed">
            Acepto que mis datos sean utilizados para responder a mi consulta, de
            acuerdo a la{" "}
            <a href="#" className="text-primary hover:underline">
              politica de privacidad
            </a>{" "}
            del sitio.
          </span>
        </label>
        {errors.aceptaTerminos && (
          <p className="text-xs text-destructive ml-6">{errors.aceptaTerminos}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/85 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm h-11 rounded-md transition-colors"
      >
        {submitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Enviar mensaje
          </>
        )}
      </button>
    </form>
  )
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="max-w-3xl mx-auto px-4 py-14">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl font-bold text-foreground text-balance">
          Preguntas frecuentes
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          Resolvemos las dudas mas comunes de quienes planifican su visita a Sucre.
        </p>
      </div>

      <ul className="flex flex-col gap-2">
        {FAQS.map((faq, i) => (
          <li key={i} className="border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-secondary transition-colors"
              aria-expanded={open === i}
            >
              <span className="text-sm font-medium text-foreground leading-snug">
                {faq.q}
              </span>
              {open === i ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
            </button>
            {open === i && (
              <div className="px-5 pb-5 pt-1 border-t border-border bg-secondary/30">
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

// ─── Quick info strip ─────────────────────────────────────────────────────────

function QuickInfoStrip() {
  const items = [
    {
      icon: Clock,
      label: "Tiempo de respuesta",
      value: "Menos de 24 h",
    },
    {
      icon: Globe,
      label: "Idiomas de atencion",
      value: "ES · EN · PT",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp disponible",
      value: "Lun–Sab 8–18 h",
    },
    {
      icon: MapPin,
      label: "Oficina de turismo",
      value: "Plaza 25 de Mayo",
    },
  ]

  return (
    <section className="bg-secondary border-y border-border py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="bg-primary/10 p-2.5 rounded-lg shrink-0">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-sm font-semibold text-foreground">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function ContactoClient() {
  return (
    <>
      {/* Quick info strip */}
      <QuickInfoStrip />

      {/* Main contact grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: info */}
          <div className="lg:col-span-2">
            <ContactInfoBlock />
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Emergency / urgent box */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-lg shrink-0">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground text-sm">
              Linea de emergencia turistica — disponible las 24 h
            </p>
            <p className="text-muted-foreground text-sm mt-0.5">
              Si te encuentras en Sucre y necesitas asistencia inmediata, contacta la
              Policia de Turismo o llama al numero de emergencias boliviano.
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-1 shrink-0">
            <a
              href="tel:110"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/85 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              Policia: 110
            </a>
            <a
              href="tel:118"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Ambulancia: 118
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="bg-secondary/40 border-t border-border">
        <FaqAccordion />
      </div>
    </>
  )
}
