"use client"

import { useGrid } from "@/contexts/grid-context"
import { Badge } from "@/components/ui/badge"
import { Clock, Target, Zap, Brain } from "lucide-react"

export function AlgorithmInfo() {
  const { selectedAlgorithm } = useGrid()

  const algorithmDetails = {
    bfs: {
      name: "Breadth-First Search",
      description: "Explores nodes level by level, guaranteeing the shortest path in unweighted graphs.",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      guaranteesOptimal: true,
      icon: <Target className="w-4 h-4" />,
    },
    dfs: {
      name: "Depth-First Search",
      description: "Explores as far as possible along each branch before backtracking.",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      guaranteesOptimal: false,
      icon: <Brain className="w-4 h-4" />,
    },
    dijkstra: {
      name: "Dijkstra's Algorithm",
      description: "Finds shortest paths from source to all vertices in weighted graphs with non-negative weights.",
      timeComplexity: "O((V + E) log V)",
      spaceComplexity: "O(V)",
      guaranteesOptimal: true,
      icon: <Clock className="w-4 h-4" />,
    },
    astar: {
      name: "A* Search",
      description: "Uses heuristics to guide search towards the goal, combining Dijkstra with greedy best-first.",
      timeComplexity: "O(b^d)",
      spaceComplexity: "O(b^d)",
      guaranteesOptimal: true,
      icon: <Zap className="w-4 h-4" />,
    },
  }

  const details = algorithmDetails[selectedAlgorithm]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {details.icon}
        <h3 className="text-lg font-semibold text-gray-800">{details.name}</h3>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{details.description}</p>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Time Complexity:</span>
          <Badge variant="secondary">{details.timeComplexity}</Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Space Complexity:</span>
          <Badge variant="secondary">{details.spaceComplexity}</Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Optimal Path:</span>
          <Badge variant={details.guaranteesOptimal ? "default" : "destructive"}>
            {details.guaranteesOptimal ? "Guaranteed" : "Not Guaranteed"}
          </Badge>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">Legend</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Start</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>End</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-800 rounded"></div>
            <span>Wall</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-200 rounded"></div>
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded"></div>
            <span>Path</span>
          </div>
        </div>
      </div>
    </div>
  )
}
