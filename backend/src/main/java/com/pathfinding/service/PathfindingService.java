package com.pathfinding.service;

import com.pathfinding.dto.*;
import com.pathfinding.model.Node;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Service class containing implementations of various pathfinding algorithms.
 * 
 * Supports BFS, DFS, Dijkstra's Algorithm, and A* Search with detailed
 * tracking of visited nodes for visualization purposes.
 */
@Service
public class PathfindingService {

    // Directions for grid movement (up, down, left, right)
    private static final int[][] DIRECTIONS = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    /**
     * Execute the specified pathfinding algorithm.
     * 
     * @param request Contains grid, start/end points, and algorithm choice
     * @return PathfindingResponse with results
     */
    public PathfindingResponse executeAlgorithm(PathfindingRequest request) {
        String algorithm = request.getAlgorithm().toLowerCase();
        
        switch (algorithm) {
            case "bfs":
                return breadthFirstSearch(request);
            case "dfs":
                return depthFirstSearch(request);
            case "dijkstra":
                return dijkstraAlgorithm(request);
            case "astar":
                return aStarSearch(request);
            default:
                return new PathfindingResponse(null, null, false, "Unknown algorithm: " + algorithm);
        }
    }

    /**
     * Breadth-First Search (BFS) Algorithm
     * 
     * Time Complexity: O(V + E)
     * Space Complexity: O(V)
     * Guarantees shortest path in unweighted graphs.
     */
    private PathfindingResponse breadthFirstSearch(PathfindingRequest request) {
        String[][] grid = request.getGrid();
        Coordinate start = request.getStart();
        Coordinate end = request.getEnd();
        
        int rows = grid.length;
        int cols = grid[0].length;
        
        // Track visited nodes for visualization
        List<Coordinate> visitedNodes = new ArrayList<>();
        Queue<Node> queue = new LinkedList<>();
        Set<String> visited = new HashSet<>();
        
        // Initialize with start node
        Node startNode = new Node(start.getRow(), start.getCol(), 0, null);
        queue.offer(startNode);
        visited.add(start.getRow() + "," + start.getCol());
        
        while (!queue.isEmpty()) {
            Node current = queue.poll();
            visitedNodes.add(new Coordinate(current.getRow(), current.getCol()));
            
            // Check if we reached the destination
            if (current.getRow() == end.getRow() && current.getCol() == end.getCol()) {
                List<Coordinate> path = reconstructPath(current);
                return new PathfindingResponse(visitedNodes, path, true, "Path found using BFS");
            }
            
            // Explore neighbors
            for (int[] direction : DIRECTIONS) {
                int newRow = current.getRow() + direction[0];
                int newCol = current.getCol() + direction[1];
                String key = newRow + "," + newCol;
                
                if (isValidMove(grid, newRow, newCol, rows, cols) && !visited.contains(key)) {
                    visited.add(key);
                    queue.offer(new Node(newRow, newCol, current.getDistance() + 1, current));
                }
            }
        }
        
        return new PathfindingResponse(visitedNodes, new ArrayList<>(), false, "No path found using BFS");
    }

    /**
     * Depth-First Search (DFS) Algorithm
     * 
     * Time Complexity: O(V + E)
     * Space Complexity: O(V)
     * Does not guarantee shortest path.
     */
    private PathfindingResponse depthFirstSearch(PathfindingRequest request) {
        String[][] grid = request.getGrid();
        Coordinate start = request.getStart();
        Coordinate end = request.getEnd();
        
        int rows = grid.length;
        int cols = grid[0].length;
        
        List<Coordinate> visitedNodes = new ArrayList<>();
        Stack<Node> stack = new Stack<>();
        Set<String> visited = new HashSet<>();
        
        Node startNode = new Node(start.getRow(), start.getCol(), 0, null);
        stack.push(startNode);
        
        while (!stack.isEmpty()) {
            Node current = stack.pop();
            String key = current.getRow() + "," + current.getCol();
            
            if (visited.contains(key)) continue;
            
            visited.add(key);
            visitedNodes.add(new Coordinate(current.getRow(), current.getCol()));
            
            // Check if we reached the destination
            if (current.getRow() == end.getRow() && current.getCol() == end.getCol()) {
                List<Coordinate> path = reconstructPath(current);
                return new PathfindingResponse(visitedNodes, path, true, "Path found using DFS");
            }
            
            // Explore neighbors (in reverse order for consistent behavior)
            for (int i = DIRECTIONS.length - 1; i >= 0; i--) {
                int[] direction = DIRECTIONS[i];
                int newRow = current.getRow() + direction[0];
                int newCol = current.getCol() + direction[1];
                String neighborKey = newRow + "," + newCol;
                
                if (isValidMove(grid, newRow, newCol, rows, cols) && !visited.contains(neighborKey)) {
                    stack.push(new Node(newRow, newCol, current.getDistance() + 1, current));
                }
            }
        }
        
        return new PathfindingResponse(visitedNodes, new ArrayList<>(), false, "No path found using DFS");
    }

    /**
     * Dijkstra's Algorithm
     * 
     * Time Complexity: O((V + E) log V)
     * Space Complexity: O(V)
     * Guarantees shortest path in weighted graphs with non-negative weights.
     */
    private PathfindingResponse dijkstraAlgorithm(PathfindingRequest request) {
        String[][] grid = request.getGrid();
        Coordinate start = request.getStart();
        Coordinate end = request.getEnd();
        
        int rows = grid.length;
        int cols = grid[0].length;
        
        List<Coordinate> visitedNodes = new ArrayList<>();
        PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingInt(Node::getDistance));
        Map<String, Integer> distances = new HashMap<>();
        Map<String, Node> previous = new HashMap<>();
        Set<String> visited = new HashSet<>();
        
        // Initialize distances
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (!grid[i][j].equals("wall")) {
                    String key = i + "," + j;
                    distances.put(key, (i == start.getRow() && j == start.getCol()) ? 0 : Integer.MAX_VALUE);
                }
            }
        }
        
        Node startNode = new Node(start.getRow(), start.getCol(), 0, null);
        pq.offer(startNode);
        
        while (!pq.isEmpty()) {
            Node current = pq.poll();
            String currentKey = current.getRow() + "," + current.getCol();
            
            if (visited.contains(currentKey)) continue;
            
            visited.add(currentKey);
            visitedNodes.add(new Coordinate(current.getRow(), current.getCol()));
            
            // Check if we reached the destination
            if (current.getRow() == end.getRow() && current.getCol() == end.getCol()) {
                List<Coordinate> path = reconstructPathFromMap(previous, current);
                return new PathfindingResponse(visitedNodes, path, true, "Path found using Dijkstra");
            }
            
            // Explore neighbors
            for (int[] direction : DIRECTIONS) {
                int newRow = current.getRow() + direction[0];
                int newCol = current.getCol() + direction[1];
                String neighborKey = newRow + "," + newCol;
                
                if (isValidMove(grid, newRow, newCol, rows, cols) && !visited.contains(neighborKey)) {
                    int newDistance = current.getDistance() + 1;
                    Integer currentDistance = distances.get(neighborKey);
                    
                    if (currentDistance != null && newDistance < currentDistance) {
                        distances.put(neighborKey, newDistance);
                        previous.put(neighborKey, current);
                        pq.offer(new Node(newRow, newCol, newDistance, current));
                    }
                }
            }
        }
        
        return new PathfindingResponse(visitedNodes, new ArrayList<>(), false, "No path found using Dijkstra");
    }

    /**
     * A* Search Algorithm
     * 
     * Time Complexity: O(b^d) where b is branching factor, d is depth
     * Space Complexity: O(b^d)
     * Guarantees shortest path with admissible heuristic.
     */
    private PathfindingResponse aStarSearch(PathfindingRequest request) {
        String[][] grid = request.getGrid();
        Coordinate start = request.getStart();
        Coordinate end = request.getEnd();
        
        int rows = grid.length;
        int cols = grid[0].length;
        
        List<Coordinate> visitedNodes = new ArrayList<>();
        PriorityQueue<Node> openSet = new PriorityQueue<>((a, b) -> 
            Integer.compare(a.getDistance() + a.getHeuristic(), b.getDistance() + b.getHeuristic()));
        Set<String> closedSet = new HashSet<>();
        Map<String, Integer> gScore = new HashMap<>();
        
        Node startNode = new Node(start.getRow(), start.getCol(), 0, null);
        startNode.setHeuristic(manhattanDistance(start, end));
        
        openSet.offer(startNode);
        gScore.put(start.getRow() + "," + start.getCol(), 0);
        
        while (!openSet.isEmpty()) {
            Node current = openSet.poll();
            String currentKey = current.getRow() + "," + current.getCol();
            
            if (closedSet.contains(currentKey)) continue;
            
            closedSet.add(currentKey);
            visitedNodes.add(new Coordinate(current.getRow(), current.getCol()));
            
            // Check if we reached the destination
            if (current.getRow() == end.getRow() && current.getCol() == end.getCol()) {
                List<Coordinate> path = reconstructPath(current);
                return new PathfindingResponse(visitedNodes, path, true, "Path found using A*");
            }
            
            // Explore neighbors
            for (int[] direction : DIRECTIONS) {
                int newRow = current.getRow() + direction[0];
                int newCol = current.getCol() + direction[1];
                String neighborKey = newRow + "," + newCol;
                
                if (!isValidMove(grid, newRow, newCol, rows, cols) || closedSet.contains(neighborKey)) {
                    continue;
                }
                
                int tentativeGScore = current.getDistance() + 1;
                Integer currentGScore = gScore.get(neighborKey);
                
                if (currentGScore == null || tentativeGScore < currentGScore) {
                    gScore.put(neighborKey, tentativeGScore);
                    int heuristic = manhattanDistance(new Coordinate(newRow, newCol), end);
                    
                    Node neighbor = new Node(newRow, newCol, tentativeGScore, current);
                    neighbor.setHeuristic(heuristic);
                    openSet.offer(neighbor);
                }
            }
        }
        
        return new PathfindingResponse(visitedNodes, new ArrayList<>(), false, "No path found using A*");
    }

    /**
     * Check if a move to the specified coordinates is valid.
     */
    private boolean isValidMove(String[][] grid, int row, int col, int rows, int cols) {
        return row >= 0 && row < rows && col >= 0 && col < cols && !grid[row][col].equals("wall");
    }

    /**
     * Calculate Manhattan distance between two coordinates (heuristic for A*).
     */
    private int manhattanDistance(Coordinate a, Coordinate b) {
        return Math.abs(a.getRow() - b.getRow()) + Math.abs(a.getCol() - b.getCol());
    }

    /**
     * Reconstruct path from end node to start using parent pointers.
     */
    private List<Coordinate> reconstructPath(Node endNode) {
        List<Coordinate> path = new ArrayList<>();
        Node current = endNode;
        
        while (current != null) {
            path.add(0, new Coordinate(current.getRow(), current.getCol()));
            current = current.getParent();
        }
        
        return path;
    }

    /**
     * Reconstruct path using previous node map (for Dijkstra).
     */
    private List<Coordinate> reconstructPathFromMap(Map<String, Node> previous, Node endNode) {
        List<Coordinate> path = new ArrayList<>();
        Node current = endNode;
        
        while (current != null) {
            path.add(0, new Coordinate(current.getRow(), current.getCol()));
            String key = current.getRow() + "," + current.getCol();
            current = previous.get(key);
        }
        
        return path;
    }
}
