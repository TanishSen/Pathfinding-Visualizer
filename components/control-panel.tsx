"use client"

import { useGrid } from "@/contexts/grid-context"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Play, Square, Trash2, Shuffle, MousePointer, Navigation, Target } from "lucide-react"

export function ControlPanel() {
  const {
    selectedAlgorithm,
    setSelectedAlgorithm,
    isVisualizing,
    animationSpeed,
    setAnimationSpeed,
    drawingMode,
    setDrawingMode,
    clearGrid,
    clearPath,
    generateMaze,
    visualizeAlgorithm,
  } = useGrid()

  const algorithms = [
    { value: "bfs", label: "Breadth-First Search (BFS)" },
    { value: "dfs", label: "Depth-First Search (DFS)" },
    { value: "dijkstra", label: "Dijkstra's Algorithm" },
    { value: "astar", label: "A* Search" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Algorithm Selection</h3>
        <Select value={selectedAlgorithm} onValueChange={(value) => setSelectedAlgorithm(value as any)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an algorithm" />
          </SelectTrigger>
          <SelectContent>
            {algorithms.map((algo) => (
              <SelectItem key={algo.value} value={algo.value}>
                {algo.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Drawing Mode</h3>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={drawingMode === "wall" ? "default" : "outline"}
            size="sm"
            onClick={() => setDrawingMode("wall")}
            className="flex items-center gap-2"
          >
            <MousePointer className="w-4 h-4" />
            Walls
          </Button>
          <Button
            variant={drawingMode === "start" ? "default" : "outline"}
            size="sm"
            onClick={() => setDrawingMode("start")}
            className="flex items-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            Start
          </Button>
          <Button
            variant={drawingMode === "end" ? "default" : "outline"}
            size="sm"
            onClick={() => setDrawingMode("end")}
            className="flex items-center gap-2"
          >
            <Target className="w-4 h-4" />
            End
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Animation Speed</h3>
        <div className="space-y-2">
          <Slider
            value={[animationSpeed]}
            onValueChange={(value) => setAnimationSpeed(value[0])}
            max={100}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Slow</span>
            <Badge variant="secondary">{animationSpeed}%</Badge>
            <span>Fast</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={visualizeAlgorithm}
          disabled={isVisualizing}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          size="lg"
        >
          {isVisualizing ? (
            <>
              <Square className="w-4 h-4 mr-2" />
              Visualizing...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Visualize {algorithms.find((a) => a.value === selectedAlgorithm)?.label}
            </>
          )}
        </Button>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={clearPath} variant="outline" size="sm" disabled={isVisualizing}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Path
          </Button>
          <Button onClick={clearGrid} variant="outline" size="sm" disabled={isVisualizing}>
            <Square className="w-4 h-4 mr-2" />
            Clear Grid
          </Button>
        </div>

        <Button onClick={generateMaze} variant="outline" className="w-full bg-transparent" disabled={isVisualizing}>
          <Shuffle className="w-4 h-4 mr-2" />
          Generate Maze
        </Button>
      </div>
    </div>
  )
}
