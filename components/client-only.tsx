"use client"

import { useEffect, useState, type ReactNode } from "react"

/**
 * Defers rendering children until after client-side hydration is complete.
 * This prevents Next.js 16's "Router action dispatched before initialization"
 * error caused by next/link calling router.prefetch() during SSR hydration
 * before the App Router has finished its initialization sequence.
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode
  fallback?: ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <>{fallback}</>
  return <>{children}</>
}
