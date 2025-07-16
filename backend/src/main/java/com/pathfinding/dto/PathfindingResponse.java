package com.pathfinding.dto;

import java.util.List;

/**
 * Data Transfer Object for pathfinding algorithm responses.
 * 
 * Contains the results of pathfinding execution:
 * - List of visited nodes (for visualization)
 * - Final optimal path
 * - Success status and message
 */
public class PathfindingResponse {
    private List<Coordinate> visitedNodes;
    private List<Coordinate> path;
    private boolean success;
    private String message;

    // Default constructor
    public PathfindingResponse() {}

    // Constructor with all fields
    public PathfindingResponse(List<Coordinate> visitedNodes, List<Coordinate> path, 
                             boolean success, String message) {
        this.visitedNodes = visitedNodes;
        this.path = path;
        this.success = success;
        this.message = message;
    }

    // Getters and Setters
    public List<Coordinate> getVisitedNodes() {
        return visitedNodes;
    }

    public void setVisitedNodes(List<Coordinate> visitedNodes) {
        this.visitedNodes = visitedNodes;
    }

    public List<Coordinate> getPath() {
        return path;
    }

    public void setPath(List<Coordinate> path) {
        this.path = path;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "PathfindingResponse{" +
                "visitedNodesCount=" + (visitedNodes != null ? visitedNodes.size() : 0) +
                ", pathLength=" + (path != null ? path.size() : 0) +
                ", success=" + success +
                ", message='" + message + '\'' +
                '}';
    }
}
