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
  const { updateCell, setStartPoint, setEndPoint, drawingMode, isVisualizing, startPoint, endPoint } = useGrid()

  const handleClick = () => {
    if (isVisualizing) return

    if (drawingMode === "start") {
      if (cell.type !== "end") {
        setStartPoint(row, col)
      }
    } else if (drawingMode === "end") {
      if (cell.type !== "start") {
        setEndPoint(row, col)
      }
    } else if (drawingMode === "wall") {
      if (cell.type === "empty") {
        updateCell(row, col, "wall")
      } else if (cell.type === "wall") {
        updateCell(row, col, "empty")
      }
    }
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (isVisualizing) return

    // Only draw walls when mouse is pressed and in wall mode
    if (e.buttons === 1 && drawingMode === "wall") {
      if (cell.type === "empty") {
        updateCell(row, col, "wall")
      }
    }
  }

  const getCellStyles = () => {
    const baseStyles = "w-4 h-4 border border-gray-200 cursor-pointer transition-all duration-200 hover:scale-110"

    switch (cell.type) {
      case "start":
        return cn(baseStyles, "bg-green-500 border-green-600 shadow-lg")
      case "end":
        return cn(baseStyles, "bg-red-500 border-red-600 shadow-lg")
      case "wall":
        return cn(baseStyles, "bg-gray-800 border-gray-900")
      case "visited":
        return cn(baseStyles, "bg-blue-200 border-blue-300 animate-pulse", cell.isAnimated && "animate-bounce")
      case "path":
        return cn(baseStyles, "bg-yellow-400 border-yellow-500 shadow-md animate-pulse")
      case "current":
        return cn(baseStyles, "bg-purple-400 border-purple-500 animate-ping")
      default:
        return cn(baseStyles, "bg-white hover:bg-gray-50")
    }
  }

  return (
    <div
      className={getCellStyles()}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      title={`Row: ${row}, Col: ${col} - ${cell.type}`}
    />
  )
}
