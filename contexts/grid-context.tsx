"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

export type CellType = "empty" | "wall" | "start" | "end" | "visited" | "path" | "current"
export type Algorithm = "bfs" | "dfs" | "dijkstra" | "astar"

export interface Cell {
  row: number
  col: number
  type: CellType
  distance: number
  heuristic: number
  parent: Cell | null
  isAnimated: boolean
}

export interface GridContextType {
  grid: Cell[][]
  startPoint: { row: number; col: number } | null
  endPoint: { row: number; col: number } | null
  selectedAlgorithm: Algorithm
  isVisualizing: boolean
  drawingMode: "wall" | "start" | "end"

  // Actions
  initializeGrid: () => void
  updateCell: (row: number, col: number, type: CellType) => void
  setStartPoint: (row: number, col: number) => void
  setEndPoint: (row: number, col: number) => void
  setSelectedAlgorithm: (algorithm: Algorithm) => void
  setIsVisualizing: (isVisualizing: boolean) => void
  setDrawingMode: (mode: "wall" | "start" | "end") => void
  clearGrid: () => void
  clearPath: () => void
  clearWallsAndWeights: () => void // New function to clear walls and weights
  generateMaze: () => void
  visualizeAlgorithm: () => Promise<void>
}

const GridContext = createContext<GridContextType | undefined>(undefined)

const GRID_ROWS = 25 // Adjusted for better mobile experience
const GRID_COLS = 50

export function GridProvider({ children }: { children: React.ReactNode }) {
  const [grid, setGrid] = useState<Cell[][]>([])
  const [startPoint, setStartPointState] = useState<{ row: number; col: number } | null>({ row: 12, col: 10 })
  const [endPoint, setEndPointState] = useState<{ row: number; col: number } | null>({ row: 12, col: 40 })
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>("dijkstra")
  const [isVisualizing, setIsVisualizing] = useState(false)
  const [drawingMode, setDrawingMode] = useState<"wall" | "start" | "end">("wall")

  // Initialize grid with default start and end points
  const initializeGrid = useCallback(() => {
    const newGrid: Cell[][] = []
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow: Cell[] = []
      for (let col = 0; col < GRID_COLS; col++) {
        let cellType: CellType = "empty"
        if (row === 12 && col === 10) cellType = "start"
        if (row === 12 && col === 40) cellType = "end"

        currentRow.push({
          row,
          col,
          type: cellType,
          distance: Number.POSITIVE_INFINITY,
          heuristic: 0,
          parent: null,
          isAnimated: false,
        })
      }
      newGrid.push(currentRow)
    }
    setGrid(newGrid)
  }, [])

  // Initialize grid on mount
  React.useEffect(() => {
    initializeGrid()
  }, [initializeGrid])

  const updateCell = useCallback((row: number, col: number, type: CellType) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((gridRow) => [...gridRow])
      newGrid[row][col] = { ...newGrid[row][col], type }
      return newGrid
    })
  }, [])

  const setStartPoint = useCallback(
    (row: number, col: number) => {
      if (startPoint) {
        updateCell(startPoint.row, startPoint.col, "empty")
      }
      updateCell(row, col, "start")
      setStartPointState({ row, col })
    },
    [startPoint, updateCell],
  )

  const setEndPoint = useCallback(
    (row: number, col: number) => {
      if (endPoint) {
        updateCell(endPoint.row, endPoint.col, "empty")
      }
      updateCell(row, col, "end")
      setEndPointState({ row, col })
    },
    [endPoint, updateCell],
  )

  const clearGrid = useCallback(() => {
    setGrid((prevGrid) => {
      return prevGrid.map((row) =>
        row.map((cell) => ({
          ...cell,
          type: cell.type === "start" || cell.type === "end" ? cell.type : "empty",
          distance: Number.POSITIVE_INFINITY,
          heuristic: 0,
          parent: null,
          isAnimated: false,
        })),
      )
    })
  }, [])

  // This function now ONLY clears visited, path, and current nodes. Walls are preserved.
  const clearPath = useCallback(() => {
    setGrid((prevGrid) => {
      return prevGrid.map((row) =>
        row.map((cell) => ({
          ...cell,
          type: cell.type === "visited" || cell.type === "path" || cell.type === "current" ? "empty" : cell.type,
          distance: Number.POSITIVE_INFINITY,
          heuristic: 0,
          parent: null,
          isAnimated: false,
        })),
      )
    })
  }, [])

  // New function to clear walls, visited, path, and current nodes.
  const clearWallsAndWeights = useCallback(() => {
    setGrid((prevGrid) => {
      return prevGrid.map((row) =>
        row.map((cell) => ({
          ...cell,
          type:
            cell.type === "visited" || cell.type === "path" || cell.type === "current" || cell.type === "wall"
              ? "empty"
              : cell.type,
          distance: Number.POSITIVE_INFINITY,
          heuristic: 0,
          parent: null,
          isAnimated: false,
        })),
      )
    })
  }, [])

  const generateMaze = useCallback(() => {
    clearGrid()

    // Simple maze generation using randomized Prim's algorithm
    const newGrid = grid.map((row) => [...row])

    // Fill with walls
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        if (newGrid[row][col].type !== "start" && newGrid[row][col].type !== "end") {
          newGrid[row][col].type = "wall"
        }
      }
    }

    // Create passages
    const passages: Array<{ row: number; col: number }> = []
    const visited = new Set<string>()

    // Start from a random point
    const currentRow = Math.floor(Math.random() * GRID_ROWS)
    const currentCol = Math.floor(Math.random() * GRID_COLS)

    if (newGrid[currentRow][currentCol].type !== "start" && newGrid[currentRow][currentCol].type !== "end") {
      newGrid[currentRow][currentCol].type = "empty"
    }
    visited.add(`${currentRow},${currentCol}`)

    // Add neighboring walls to passages list
    const addNeighbors = (row: number, col: number) => {
      const directions = [
        [-2, 0],
        [2, 0],
        [0, -2],
        [0, 2],
      ]
      directions.forEach(([dr, dc]) => {
        const newRow = row + dr
        const newCol = col + dc
        if (newRow >= 0 && newRow < GRID_ROWS && newCol >= 0 && newCol < GRID_COLS) {
          if (!visited.has(`${newRow},${newCol}`)) {
            passages.push({ row: newRow, col: newCol })
          }
        }
      })
    }

    addNeighbors(currentRow, currentCol)

    while (passages.length > 0) {
      const randomIndex = Math.floor(Math.random() * passages.length)
      const { row, col } = passages.splice(randomIndex, 1)[0]

      if (!visited.has(`${row},${col}`)) {
        // Find a visited neighbor
        const directions = [
          [-2, 0],
          [2, 0],
          [0, -2],
          [0, 2],
        ]
        const validNeighbors = directions
          .map(([dr, dc]) => ({ row: row + dr, col: col + dc }))
          .filter(
            ({ row: nr, col: nc }) =>
              nr >= 0 && nr < GRID_ROWS && nc >= 0 && nc < GRID_COLS && visited.has(`${nr},${nc}`),
          )

        if (validNeighbors.length > 0) {
          const neighbor = validNeighbors[Math.floor(Math.random() * validNeighbors.length)]

          // Create passage
          if (newGrid[row][col].type !== "start" && newGrid[row][col].type !== "end") {
            newGrid[row][col].type = "empty"
          }

          // Create passage between current and neighbor
          const midRow = (row + neighbor.row) / 2
          const midCol = (col + neighbor.col) / 2
          if (newGrid[midRow][midCol].type !== "start" && newGrid[midRow][midCol].type !== "end") {
            newGrid[midRow][midCol].type = "empty"
          }

          visited.add(`${row},${col}`)
          addNeighbors(row, col)
        }
      }
    }

    setGrid(newGrid)
  }, [grid, clearGrid])

  const visualizeAlgorithm = useCallback(async () => {
    let result: any // Declare result variable here
    if (!startPoint || !endPoint || isVisualizing) return

    setIsVisualizing(true)
    clearPath() // This now only clears previous visualization, not walls

    // Wait for clear to complete
    await new Promise((resolve) => setTimeout(resolve, 100))

    try {
      const response = await fetch("/api/pathfind", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grid: grid.map((row) => row.map((cell) => cell.type)),
          start: startPoint,
          end: endPoint,
          algorithm: selectedAlgorithm,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get pathfinding result")
      }

      result = await response.json()

      // Animate visited nodes
      for (let i = 0; i < result.visitedNodes.length; i++) {
        const { row, col } = result.visitedNodes[i]

        setTimeout(() => {
          setGrid((prevGrid) => {
            const newGrid = prevGrid.map((gridRow) => [...gridRow])
            // Only update if it's not a start or end node
            if (newGrid[row][col].type !== "start" && newGrid[row][col].type !== "end") {
              newGrid[row][col] = { ...newGrid[row][col], type: "visited", isAnimated: true }
            }
            return newGrid
          })
        }, i * 50)
      }

      // Animate final path
      setTimeout(
        () => {
          result.path.forEach((node: { row: number; col: number }, index: number) => {
            setTimeout(() => {
              setGrid((prevGrid) => {
                const newGrid = prevGrid.map((gridRow) => [...gridRow])
                // Only update if it's not a start or end node
                if (newGrid[node.row][node.col].type !== "start" && newGrid[node.row][node.col].type !== "end") {
                  newGrid[node.row][node.col] = { ...newGrid[node.row][node.col], type: "path" }
                }
                return newGrid
              })
            }, index * 50)
          })
        },
        result.visitedNodes.length * 50 + 500,
      )
    } catch (error) {
      console.error("Error visualizing algorithm:", error)
      // Fallback to client-side implementation
      await visualizeClientSide()
    }

    setTimeout(
      () => {
        setIsVisualizing(false)
      },
      (result?.visitedNodes?.length || 0) * 50 + (result?.path?.length || 0) * 50 + 1000,
    )
  }, [startPoint, endPoint, isVisualizing, grid, selectedAlgorithm, clearPath])

  // Client-side fallback implementation
  const visualizeClientSide = useCallback(async () => {
    if (!startPoint || !endPoint) return

    const visitedNodes: Array<{ row: number; col: number }> = []
    const path: Array<{ row: number; col: number }> = []

    // Simple BFS implementation as fallback
    const queue = [startPoint]
    const visited = new Set<string>()
    const parent = new Map<string, { row: number; col: number }>()

    visited.add(`${startPoint.row},${startPoint.col}`)

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]

    while (queue.length > 0) {
      const current = queue.shift()!
      visitedNodes.push(current)

      if (current.row === endPoint.row && current.col === endPoint.col) {
        // Reconstruct path
        let pathNode = current;
        
        while (pathNode) {
          path.unshift(pathNode)
          const parentKey = `${pathNode.row},${pathNode.col}`
          pathNode = parent.get(parentKey) || null
        }
        break
      }

      for (const [dr, dc] of directions) {
        const newRow = current.row + dr
        const newCol = current.col + dc
        const key = `${newRow},${newCol}`

        if (
          newRow >= 0 &&
          newRow < GRID_ROWS &&
          newCol >= 0 &&
          newCol < GRID_COLS &&
          !visited.has(key) &&
          grid[newRow][newCol].type !== "wall"
        ) {
          visited.add(key)
          parent.set(key, current)
          queue.push({ row: newRow, col: newCol })
        }
      }
    }

    // Animate results
    for (let i = 0; i < visitedNodes.length; i++) {
      const { row, col } = visitedNodes[i]

      setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((gridRow) => [...gridRow])
          if (newGrid[row][col].type === "empty") {
            newGrid[row][col] = { ...newGrid[row][col], type: "visited", isAnimated: true }
          }
          return newGrid
        })
      }, i * 50)
    }

    // Animate path
    setTimeout(
      () => {
        path.forEach((node, index) => {
          setTimeout(() => {
            setGrid((prevGrid) => {
              const newGrid = prevGrid.map((gridRow) => [...gridRow])
              if (
                newGrid[node.row][node.col].type === "visited" ||
                newGrid[node.row][node.col].type === "start" ||
                newGrid[node.row][node.col].type === "end"
              ) {
                newGrid[node.row][node.col] = { ...newGrid[node.row][node.col], type: "path" }
              }
              return newGrid
            })
          }, index * 50)
        })
      },
      visitedNodes.length * 50 + 500,
    )
  }, [startPoint, endPoint, grid])

  const value: GridContextType = {
    grid,
    startPoint,
    endPoint,
    selectedAlgorithm,
    isVisualizing,
    drawingMode,
    initializeGrid,
    updateCell,
    setStartPoint,
    setEndPoint,
    setSelectedAlgorithm,
    setIsVisualizing,
    setDrawingMode,
    clearGrid,
    clearPath,
    clearWallsAndWeights, // Expose the new function
    generateMaze,
    visualizeAlgorithm,
  }

  return <GridContext.Provider value={value}>{children}</GridContext.Provider>
}

export function useGrid() {
  const context = useContext(GridContext)
  if (context === undefined) {
    throw new Error("useGrid must be used within a GridProvider")
  }
  return context
}
