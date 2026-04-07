import { Hero } from "@/components/hero"
import { ValueProposition } from "@/components/value-proposition"
import { ExperienceComparator } from "@/components/experience-comparator"
import { NpsWidget } from "@/components/nps-widget"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ValueProposition />
      <ExperienceComparator />
      <NpsWidget />
    </main>
  )
}
