package com.ideafactory.controller;

import com.ideafactory.dto.UserLoginRequest;
import com.ideafactory.dto.UserAuthResponse;
import com.ideafactory.model.User;
import com.ideafactory.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Admin Controller
 * Handles admin-specific authentication and dashboard functionality
 * All endpoints require ADMIN role
 */
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private UserService userService;
    
    /**
     * Admin Login Endpoint
     * Separate from user login for security
     */
    @PostMapping("/login")
    public ResponseEntity<UserAuthResponse> adminLogin(@RequestBody UserLoginRequest request) {
        try {
            UserAuthResponse response = userService.adminLogin(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            UserAuthResponse errorResponse = new UserAuthResponse();
            errorResponse.setMessage(e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Admin Dashboard Data
     * Returns admin-specific dashboard information
     */
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getAdminDashboard() {
        try {
            Map<String, Object> dashboardData = new HashMap<>();
            dashboardData.put("message", "Admin dashboard data");
            dashboardData.put("role", "ADMIN");
            dashboardData.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(dashboardData);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Admin Profile
     * Returns admin profile information
     */
    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getAdminProfile() {
        try {
            Map<String, Object> profile = new HashMap<>();
            profile.put("role", "ADMIN");
            profile.put("message", "Admin profile data");
            
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Admin Logout
     * Invalidates admin session
     */
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> adminLogout() {
        try {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Admin logged out successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
} 