"use client"

import type React from "react"
import { useGrid, type Cell as CellType } from "@/contexts/grid-context"
import { cn } from "@/lib/utils"

interface CellProps {
  cell: CellType
  row: number
  col: number
}

export function Cell({ cell, row, col }: CellProps) {
  const { updateCell, setStartPoint, setEndPoint, drawingMode, isVisualizing } = useGrid()

  const handleClick = () => {
    if (isVisualizing) return

    if (cell.type === "start" || cell.type === "end") {
      // Allow moving start/end points
      return
    }

    if (cell.type === "empty") {
      updateCell(row, col, "wall")
    } else if (cell.type === "wall") {
      updateCell(row, col, "empty")
    }
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (isVisualizing) return

    // Draw walls when dragging
    if (e.buttons === 1 && cell.type === "empty") {
      updateCell(row, col, "wall")
    }
  }

  const getCellStyles = () => {
    const baseStyles = "w-5 h-5 border border-gray-700 cursor-pointer"

    switch (cell.type) {
      case "start":
        return cn(baseStyles, "bg-green-500 border-green-400")
      case "end":
        return cn(baseStyles, "bg-red-500 border-red-400")
      case "wall":
        return cn(baseStyles, "bg-gray-900 border-gray-800")
      case "visited":
        return cn(baseStyles, "bg-blue-400 border-blue-300", cell.isAnimated && "animate-pulse")
      case "path":
        return cn(baseStyles, "bg-yellow-400 border-yellow-300")
      case "current":
        return cn(baseStyles, "bg-purple-400 border-purple-300")
      default:
        return cn(baseStyles, "bg-white border-gray-300 hover:bg-gray-100")
    }
  }

  return (
    <div
      className={getCellStyles()}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseDown={(e) => e.preventDefault()} // Prevent text selection
    />
  )
}
