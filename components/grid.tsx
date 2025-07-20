"use client"

import { useGrid } from "@/contexts/grid-context"
import { Cell } from "@/components/cell"

export function Grid() {
  const { grid } = useGrid()

  if (!grid.length) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-400">Loading grid...</div>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <div className="inline-block border-2 border-gray-600 bg-gray-800 p-2 rounded">
        <div
          className="grid gap-0"
          style={{
            gridTemplateColumns: `repeat(${grid[0]?.length || 50}, 20px)`,
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Cell key={`${rowIndex}-${colIndex}`} cell={cell} row={rowIndex} col={colIndex} />
            )),
          )}
        </div>
      </div>
    </div>
  )
}
