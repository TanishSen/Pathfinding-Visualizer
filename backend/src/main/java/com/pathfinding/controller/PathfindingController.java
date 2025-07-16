package com.pathfinding.controller;

import com.pathfinding.dto.PathfindingRequest;
import com.pathfinding.dto.PathfindingResponse;
import com.pathfinding.service.PathfindingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * REST Controller for pathfinding operations.
 * 
 * Provides endpoints for executing various pathfinding algorithms
 * on a 2D grid with obstacles, start, and end points.
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow requests from frontend
public class PathfindingController {

    @Autowired
    private PathfindingService pathfindingService;

    /**
     * Execute pathfinding algorithm on the provided grid.
     * 
     * @param request Contains grid data, start/end points, and algorithm choice
     * @return PathfindingResponse with visited nodes and optimal path
     */
    @PostMapping("/pathfind")
    public ResponseEntity<PathfindingResponse> findPath(@RequestBody PathfindingRequest request) {
        try {
            // Validate request
            if (request.getGrid() == null || request.getStart() == null || 
                request.getEnd() == null || request.getAlgorithm() == null) {
                return ResponseEntity.badRequest()
                    .body(new PathfindingResponse(null, null, false, "Missing required fields"));
            }

            // Execute pathfinding algorithm
            PathfindingResponse response = pathfindingService.executeAlgorithm(request);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(new PathfindingResponse(null, null, false, "Algorithm execution failed: " + e.getMessage()));
        }
    }

    /**
     * Health check endpoint to verify API is running.
     */
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("🟢 Pathfinding API is healthy and ready!");
    }

    /**
     * Root endpoint - provides API information and available endpoints.
     */
    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> getApiInfo() {
        Map<String, Object> apiInfo = new HashMap<>();
        apiInfo.put("service", "Pathfinding Visualizer API");
        apiInfo.put("version", "1.0.0");
        apiInfo.put("status", "🟢 Running");
        
        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("POST /api/pathfind", "Execute pathfinding algorithm");
        endpoints.put("GET /api/health", "Health check");
        endpoints.put("GET /api/", "API information");
        
        apiInfo.put("endpoints", endpoints);
        
        Map<String, String> algorithms = new HashMap<>();
        algorithms.put("BFS", "Breadth-First Search");
        algorithms.put("DFS", "Depth-First Search");
        algorithms.put("DIJKSTRA", "Dijkstra's Algorithm");
        algorithms.put("A_STAR", "A* Search Algorithm");
        
        apiInfo.put("supportedAlgorithms", algorithms);
        
        return ResponseEntity.ok(apiInfo);
    }
}
