package com.pathfinding.controller;

import com.pathfinding.dto.PathfindingRequest;
import com.pathfinding.dto.PathfindingResponse;
import com.pathfinding.service.PathfindingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
