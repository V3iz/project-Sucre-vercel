import { Hero } from "@/components/hero"
import { ExperienceComparator } from "@/components/experience-comparator"
import { NpsWidget } from "@/components/nps-widget"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ExperienceComparator />
      <NpsWidget />
    </main>
  )
}
