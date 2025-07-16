"use client"
import { Grid } from "@/components/grid"
import { ControlPanel } from "@/components/control-panel"
import { AlgorithmInfo } from "@/components/algorithm-info"
import { Header } from "@/components/header"
import { GridProvider } from "@/contexts/grid-context"

export default function PathfindingVisualizer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <GridProvider>
        <div className="container mx-auto px-4 py-6">
          <Header />
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
            <div className="xl:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <Grid />
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <ControlPanel />
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <AlgorithmInfo />
              </div>
            </div>
          </div>
        </div>
      </GridProvider>
    </div>
  )
}
