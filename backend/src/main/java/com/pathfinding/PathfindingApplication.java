package com.pathfinding;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Spring Boot application class for the Pathfinding Visualizer backend.
 * 
 * This application provides REST API endpoints for pathfinding algorithms
 * including BFS, DFS, Dijkstra's Algorithm, and A* Search.
 * 
 * @author Pathfinding Visualizer Team
 * @version 1.0
 */
@SpringBootApplication
public class PathfindingApplication {

    public static void main(String[] args) {
        SpringApplication.run(PathfindingApplication.class, args);
        System.out.println("🚀 Pathfinding Visualizer Backend is running!");
        System.out.println("📡 API available at: http://localhost:8080/api/pathfind");
    }
}
