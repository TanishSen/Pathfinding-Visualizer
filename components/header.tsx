import { Brain } from "lucide-react"

export function Header() {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Pathfinding Visualizer
        </h1>
      </div>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Visualize and understand how different pathfinding algorithms work. Click to place walls, select start and end
        points, then watch the magic happen!
      </p>
    </header>
  )
}
