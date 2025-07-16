package com.pathfinding.model;

/**
 * Represents a node in the pathfinding grid.
 * 
 * Contains position, distance from start, heuristic value (for A*),
 * and parent reference for path reconstruction.
 */
public class Node {
    private int row;
    private int col;
    private int distance;
    private int heuristic;
    private Node parent;

    // Default constructor
    public Node() {}

    // Constructor with position and distance
    public Node(int row, int col, int distance, Node parent) {
        this.row = row;
        this.col = col;
        this.distance = distance;
        this.parent = parent;
        this.heuristic = 0;
    }

    // Getters and Setters
    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getCol() {
        return col;
    }

    public void setCol(int col) {
        this.col = col;
    }

    public int getDistance() {
        return distance;
    }

    public void setDistance(int distance) {
        this.distance = distance;
    }

    public int getHeuristic() {
        return heuristic;
    }

    public void setHeuristic(int heuristic) {
        this.heuristic = heuristic;
    }

    public Node getParent() {
        return parent;
    }

    public void setParent(Node parent) {
        this.parent = parent;
    }

    /**
     * Calculate f-score for A* algorithm (g + h).
     */
    public int getFScore() {
        return distance + heuristic;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        
        Node node = (Node) obj;
        return row == node.row && col == node.col;
    }

    @Override
    public int hashCode() {
        return 31 * row + col;
    }

    @Override
    public String toString() {
        return "Node{" +
                "position=(" + row + ", " + col + ")" +
                ", distance=" + distance +
                ", heuristic=" + heuristic +
                ", fScore=" + getFScore() +
                '}';
    }
}
