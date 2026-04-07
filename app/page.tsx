import { Hero } from "@/components/hero"
import { ValueProposition } from "@/components/value-proposition"
import { ExperienceComparator } from "@/components/experience-comparator"
import { PhotoGallery } from "@/components/photo-gallery"
import { Testimonials } from "@/components/testimonials"
import { NpsWidget } from "@/components/nps-widget"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ValueProposition />
      <ExperienceComparator />
      <PhotoGallery />
      <Testimonials />
      <NpsWidget />
    </main>
  )
}
