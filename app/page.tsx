"use client"
import { Grid } from "@/components/grid"
import { ControlPanel } from "@/components/control-panel"
import { Header } from "@/components/header"
import { GridProvider } from "@/contexts/grid-context"

export default function PathfindingVisualizer() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <GridProvider>
        <div className="container mx-auto px-4 py-6">
          <Header />
          <div className="mt-8">
            <ControlPanel />
            <div className="mt-6">
              <Grid />
            </div>
          </div>
        </div>
      </GridProvider>
    </div>
  )
}
