"use client"

import { useGrid } from "@/contexts/grid-context"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ControlPanel() {
  const {
    selectedAlgorithm,
    setSelectedAlgorithm,
    isVisualizing,
    animationSpeed,
    setAnimationSpeed,
    clearGrid,
    clearWallsAndWeights, // Use the new function here
    generateMaze,
    visualizeAlgorithm,
  } = useGrid()

  const algorithms = [
    { value: "dijkstra", label: "Dijkstra's Algorithm" },
    { value: "astar", label: "A* Search" },
    { value: "bfs", label: "Breadth-first Search" },
    { value: "dfs", label: "Depth-first Search" },
  ]

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex flex-wrap items-center gap-4">
        {/* Algorithm Selection */}
        <div className="flex items-center gap-2">
          <label className="text-white font-medium">Algorithm:</label>
          <Select value={selectedAlgorithm} onValueChange={(value) => setSelectedAlgorithm(value as any)}>
            <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {algorithms.map((algo) => (
                <SelectItem key={algo.value} value={algo.value} className="text-white hover:bg-gray-600">
                  {algo.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Visualize Button */}
        <Button
          onClick={visualizeAlgorithm}
          disabled={isVisualizing}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 font-medium"
        >
          {isVisualizing
            ? "Visualizing..."
            : `Visualize ${algorithms.find((a) => a.value === selectedAlgorithm)?.label || "Algorithm"}!`}
        </Button>

        {/* Clear Board Button */}
        <Button
          onClick={clearGrid}
          disabled={isVisualizing}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
        >
          Clear Board
        </Button>

        {/* Clear Walls & Weights Button */}
        <Button
          onClick={clearWallsAndWeights} // Call the new function here
          disabled={isVisualizing}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
        >
          Clear Walls & Weights
        </Button>

        {/* Generate Maze Button */}
        <Button
          onClick={generateMaze}
          disabled={isVisualizing}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2"
        >
          Generate Maze
        </Button>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-sm text-gray-400">
        <p>
          <strong>Instructions:</strong> Click and drag to draw walls. Click on the start (green) or finish (red) node
          to move them.
        </p>
      </div>
    </div>
  )
}
