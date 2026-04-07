"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Twitter } from "lucide-react"
import { SafeLink as Link } from "@/components/safe-link"
import { useI18n } from "@/lib/i18n"

export function SiteFooter() {
  const { t } = useI18n()
  const f = t.footer
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <footer className="bg-[#1A1A1A] text-white/80">
      <div className="container mx-auto px-6 max-w-6xl py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sans text-base font-bold text-white tracking-wide">
              {f.contact.title}
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold-500" strokeWidth={1.75} aria-hidden="true" />
                <address className="font-body text-sm not-italic leading-relaxed whitespace-pre-line">
                  {f.contact.address}
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-gold-500" strokeWidth={1.75} aria-hidden="true" />
                <a href={`tel:${f.contact.phone}`} className="font-body text-sm hover:text-white transition-colors">
                  {f.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-gold-500" strokeWidth={1.75} aria-hidden="true" />
                <a href={`mailto:${f.contact.email}`} className="font-body text-sm hover:text-white transition-colors">
                  {f.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Useful Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sans text-base font-bold text-white tracking-wide">
              {f.links.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {f.links.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-600 group-hover:bg-gold-500 shrink-0" aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sans text-base font-bold text-white tracking-wide">
              {f.social.title}
            </h3>
            <p className="font-body text-sm leading-relaxed">{f.social.followUs}</p>
            <div className="flex gap-3 mt-1">
              {[
                { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
                { Icon: Twitter, href: "https://twitter.com", label: "Twitter / X" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-gold-500 hover:bg-gold-500/10 hover:text-gold-400 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sans text-base font-bold text-white tracking-wide">
              {f.newsletter.title}
            </h3>
            <p className="font-body text-sm leading-relaxed">{f.newsletter.description}</p>
            {subscribed ? (
              <p className="font-body text-sm text-gold-400 font-medium">
                {f.newsletter.successMessage}
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3 mt-1" noValidate>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={f.newsletter.placeholder}
                  required
                  className="font-body text-sm bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                />
                <button
                  type="submit"
                  className="font-body text-sm font-semibold bg-gold-600 hover:bg-gold-700 text-white rounded-xl px-4 py-2.5 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  {f.newsletter.button}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 max-w-6xl py-5 flex items-center justify-center">
          <p className="font-body text-xs text-white/40 text-center">{f.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
