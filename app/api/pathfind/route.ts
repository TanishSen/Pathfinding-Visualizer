import { type NextRequest, NextResponse } from "next/server";

// Types for the pathfinding request and response
interface PathfindRequest {
  grid: string[][];
  start: { row: number; col: number };
  end: { row: number; col: number };
  algorithm: "bfs" | "dfs" | "dijkstra" | "astar";
}

interface Node {
  row: number;
  col: number;
  distance: number;
  heuristic: number;
  parent: Node | null;
}

interface PathfindResponse {
  visitedNodes: Array<{ row: number; col: number }>;
  path: Array<{ row: number; col: number }>;
  success: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: PathfindRequest = await request.json();
    const { grid, start, end, algorithm } = body;

    // Validate input
    if (!grid || !start || !end || !algorithm) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Forward request to our Spring Boot backend
    const response = await fetch("http://localhost:8080/api/pathfind", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Pathfinding error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function runPathfindingAlgorithm(
  grid: string[][],
  start: { row: number; col: number },
  end: { row: number; col: number },
  algorithm: string
): Promise<PathfindResponse> {
  const rows = grid.length;
  const cols = grid[0].length;
  const visitedNodes: Array<{ row: number; col: number }> = [];
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // Helper function to calculate Manhattan distance (heuristic for A*)
  const manhattanDistance = (
    a: { row: number; col: number },
    b: { row: number; col: number }
  ) => {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
  };

  // Helper function to reconstruct path
  const reconstructPath = (node: Node): Array<{ row: number; col: number }> => {
    const path: Array<{ row: number; col: number }> = [];
    let current: Node | null = node;

    while (current) {
      path.unshift({ row: current.row, col: current.col });
      current = current.parent;
    }

    return path;
  };

  // Helper function to check if coordinates are valid
  const isValid = (row: number, col: number): boolean => {
    return (
      row >= 0 &&
      row < rows &&
      col >= 0 &&
      col < cols &&
      grid[row][col] !== "wall"
    );
  };

  switch (algorithm) {
    case "bfs": {
      const queue: Node[] = [
        {
          row: start.row,
          col: start.col,
          distance: 0,
          heuristic: 0,
          parent: null,
        },
      ];

      const visited = new Set<string>();
      visited.add(`${start.row},${start.col}`);

      while (queue.length > 0) {
        const current = queue.shift()!;
        visitedNodes.push({ row: current.row, col: current.col });

        if (current.row === end.row && current.col === end.col) {
          return {
            visitedNodes,
            path: reconstructPath(current),
            success: true,
          };
        }

        for (const [dr, dc] of directions) {
          const newRow = current.row + dr;
          const newCol = current.col + dc;
          const key = `${newRow},${newCol}`;

          if (isValid(newRow, newCol) && !visited.has(key)) {
            visited.add(key);
            queue.push({
              row: newRow,
              col: newCol,
              distance: current.distance + 1,
              heuristic: 0,
              parent: current,
            });
          }
        }
      }
      break;
    }

    case "dfs": {
      const stack: Node[] = [
        {
          row: start.row,
          col: start.col,
          distance: 0,
          heuristic: 0,
          parent: null,
        },
      ];

      const visited = new Set<string>();

      while (stack.length > 0) {
        const current = stack.pop()!;
        const key = `${current.row},${current.col}`;

        if (visited.has(key)) continue;

        visited.add(key);
        visitedNodes.push({ row: current.row, col: current.col });

        if (current.row === end.row && current.col === end.col) {
          return {
            visitedNodes,
            path: reconstructPath(current),
            success: true,
          };
        }

        for (const [dr, dc] of directions) {
          const newRow = current.row + dr;
          const newCol = current.col + dc;
          const newKey = `${newRow},${newCol}`;

          if (isValid(newRow, newCol) && !visited.has(newKey)) {
            stack.push({
              row: newRow,
              col: newCol,
              distance: current.distance + 1,
              heuristic: 0,
              parent: current,
            });
          }
        }
      }
      break;
    }

    case "dijkstra": {
      const distances = new Map<string, number>();
      const previous = new Map<string, Node>();
      const unvisited = new Set<string>();

      // Initialize distances
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (grid[row][col] !== "wall") {
            const key = `${row},${col}`;
            distances.set(
              key,
              row === start.row && col === start.col
                ? 0
                : Number.POSITIVE_INFINITY
            );
            unvisited.add(key);
          }
        }
      }

      while (unvisited.size > 0) {
        // Find unvisited node with minimum distance
        let current: { row: number; col: number } | null = null;
        let minDistance = Number.POSITIVE_INFINITY;

        for (const key of unvisited) {
          const distance = distances.get(key) || Number.POSITIVE_INFINITY;
          if (distance < minDistance) {
            minDistance = distance;
            const [row, col] = key.split(",").map(Number);
            current = { row, col };
          }
        }

        if (!current || minDistance === Number.POSITIVE_INFINITY) break;

        const currentKey = `${current.row},${current.col}`;
        unvisited.delete(currentKey);
        visitedNodes.push(current);

        if (current.row === end.row && current.col === end.col) {
          // Reconstruct path using previous map
          const path: Array<{ row: number; col: number }> = [];
          let pathNode: { row: number; col: number } | undefined = current;

          while (pathNode) {
            path.unshift(pathNode);
            const key: string = `${pathNode.row},${pathNode.col}`;
            pathNode = previous.get(key)
              ? { row: previous.get(key)!.row, col: previous.get(key)!.col }
              : undefined;
          }

          return {
            visitedNodes,
            path,
            success: true,
          };
        }

        const currentDistance = distances.get(currentKey) || 0;

        for (const [dr, dc] of directions) {
          const newRow = current.row + dr;
          const newCol = current.col + dc;
          const neighborKey = `${newRow},${newCol}`;

          if (isValid(newRow, newCol) && unvisited.has(neighborKey)) {
            const newDistance = currentDistance + 1;
            const currentNeighborDistance =
              distances.get(neighborKey) || Number.POSITIVE_INFINITY;

            if (newDistance < currentNeighborDistance) {
              distances.set(neighborKey, newDistance);
              previous.set(neighborKey, {
                row: current.row,
                col: current.col,
                distance: currentDistance,
                heuristic: 0,
                parent: null,
              });
            }
          }
        }
      }
      break;
    }

    case "astar": {
      const openSet: Node[] = [
        {
          row: start.row,
          col: start.col,
          distance: 0,
          heuristic: manhattanDistance(start, end),
          parent: null,
        },
      ];

      const closedSet = new Set<string>();
      const gScore = new Map<string, number>();
      const fScore = new Map<string, number>();

      gScore.set(`${start.row},${start.col}`, 0);
      fScore.set(`${start.row},${start.col}`, manhattanDistance(start, end));

      while (openSet.length > 0) {
        // Find node with lowest f score
        openSet.sort(
          (a, b) => a.distance + a.heuristic - (b.distance + b.heuristic)
        );
        const current = openSet.shift()!;
        const currentKey = `${current.row},${current.col}`;

        if (closedSet.has(currentKey)) continue;

        closedSet.add(currentKey);
        visitedNodes.push({ row: current.row, col: current.col });

        if (current.row === end.row && current.col === end.col) {
          return {
            visitedNodes,
            path: reconstructPath(current),
            success: true,
          };
        }

        for (const [dr, dc] of directions) {
          const newRow = current.row + dr;
          const newCol = current.col + dc;
          const neighborKey = `${newRow},${newCol}`;

          if (!isValid(newRow, newCol) || closedSet.has(neighborKey)) continue;

          const tentativeGScore = current.distance + 1;
          const currentGScore =
            gScore.get(neighborKey) || Number.POSITIVE_INFINITY;

          if (tentativeGScore < currentGScore) {
            gScore.set(neighborKey, tentativeGScore);
            const heuristic = manhattanDistance(
              { row: newRow, col: newCol },
              end
            );
            fScore.set(neighborKey, tentativeGScore + heuristic);

            openSet.push({
              row: newRow,
              col: newCol,
              distance: tentativeGScore,
              heuristic,
              parent: current,
            });
          }
        }
      }
      break;
    }
  }

  return {
    visitedNodes,
    path: [],
    success: false,
  };
}
