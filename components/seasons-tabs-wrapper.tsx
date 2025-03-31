"use client"

import { Suspense, lazy } from "react"

// Lazy load the SeasonsTabs component
const SeasonsTabs = lazy(() => import("./seasons-tabs"))

export default function SeasonsTabsWrapper() {
  return (
    <Suspense fallback={<div className="h-64 bg-secondary/30 rounded-md animate-pulse"></div>}>
      <SeasonsTabs />
    </Suspense>
  )
}

