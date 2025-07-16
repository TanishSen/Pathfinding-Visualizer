package com.pathfinding.dto;

/**
 * Data Transfer Object for pathfinding algorithm requests.
 * 
 * Contains all necessary information to execute a pathfinding algorithm:
 * - 2D grid with cell types (empty, wall, start, end)
 * - Start and end coordinates
 * - Algorithm selection
 */
public class PathfindingRequest {
    private String[][] grid;
    private Coordinate start;
    private Coordinate end;
    private String algorithm;

    // Default constructor
    public PathfindingRequest() {}

    // Constructor with all fields
    public PathfindingRequest(String[][] grid, Coordinate start, Coordinate end, String algorithm) {
        this.grid = grid;
        this.start = start;
        this.end = end;
        this.algorithm = algorithm;
    }

    // Getters and Setters
    public String[][] getGrid() {
        return grid;
    }

    public void setGrid(String[][] grid) {
        this.grid = grid;
    }

    public Coordinate getStart() {
        return start;
    }

    public void setStart(Coordinate start) {
        this.start = start;
    }

    public Coordinate getEnd() {
        return end;
    }

    public void setEnd(Coordinate end) {
        this.end = end;
    }

    public String getAlgorithm() {
        return algorithm;
    }

    public void setAlgorithm(String algorithm) {
        this.algorithm = algorithm;
    }

    @Override
    public String toString() {
        return "PathfindingRequest{" +
                "gridSize=" + (grid != null ? grid.length + "x" + grid[0].length : "null") +
                ", start=" + start +
                ", end=" + end +
                ", algorithm='" + algorithm + '\'' +
                '}';
    }
}
