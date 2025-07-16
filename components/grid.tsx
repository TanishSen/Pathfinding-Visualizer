"use client"

import { useGrid } from "@/contexts/grid-context"
import { Cell } from "@/components/cell"

export function Grid() {
  const { grid } = useGrid()

  if (!grid.length) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading grid...</div>
      </div>
    )
  }

  return (
    <div className="overflow-auto">
      <div
        className="grid gap-0 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${grid[0]?.length || 50}, minmax(0, 1fr))`,
          maxWidth: "fit-content",
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell key={`${rowIndex}-${colIndex}`} cell={cell} row={rowIndex} col={colIndex} />
          )),
        )}
      </div>
    </div>
  )
}
