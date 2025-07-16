package com.pathfinding.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Root controller to handle requests to the application root.
 */
@RestController
public class RootController {

    /**
     * Root endpoint for the application.
     * Provides basic information about the Pathfinding Visualizer API.
     */
    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> root() {
        Map<String, Object> response = new HashMap<>();
        response.put("service", "🚀 Pathfinding Visualizer Backend");
        response.put("version", "1.0.0");
        response.put("status", "🟢 Running");
        response.put("message", "Welcome to the Pathfinding Visualizer API!");
        
        Map<String, String> links = new HashMap<>();
        links.put("api", "/api/");
        links.put("health", "/api/health");
        links.put("pathfind", "/api/pathfind (POST)");
        
        response.put("endpoints", links);
        
        return ResponseEntity.ok(response);
    }
}
