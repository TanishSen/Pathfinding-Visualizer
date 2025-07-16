package com.pathfinding.dto;

/**
 * Represents a coordinate point in the 2D grid.
 * 
 * Used for start/end points and path coordinates.
 */
public class Coordinate {
    private int row;
    private int col;

    // Default constructor
    public Coordinate() {}

    // Constructor with row and column
    public Coordinate(int row, int col) {
        this.row = row;
        this.col = col;
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

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        
        Coordinate that = (Coordinate) obj;
        return row == that.row && col == that.col;
    }

    @Override
    public int hashCode() {
        return 31 * row + col;
    }

    @Override
    public String toString() {
        return "(" + row + ", " + col + ")";
    }
}
