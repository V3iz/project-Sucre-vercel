import { Suspense } from "react"
import { CheckoutClient } from "./checkout-client"
import { Skeleton } from "@/components/ui/skeleton"

export const dynamic = "force-dynamic"

function CheckoutSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </header>
      <div className="border-b bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-1 flex-1 mx-4" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-1 flex-1 mx-4" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          <Skeleton className="h-[600px] w-full rounded-lg" />
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutClient />
    </Suspense>
  )
}
