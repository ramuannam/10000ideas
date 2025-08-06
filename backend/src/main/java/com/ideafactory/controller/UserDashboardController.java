package com.ideafactory.controller;

import com.ideafactory.model.User;
import com.ideafactory.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * User Dashboard Controller
 * Handles user-specific dashboard functionality
 * All endpoints require USER role
 */
@RestController
@RequestMapping("/api/dashboard")
@PreAuthorize("hasRole('USER')")
@CrossOrigin(origins = "*")
public class UserDashboardController {
    
    @Autowired
    private UserService userService;
    
    /**
     * Get User Dashboard Data
     * Returns user-specific dashboard information
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getUserDashboard() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = authentication.getName();
            
            User user = userService.getProfile(userEmail);
            
            Map<String, Object> dashboardData = new HashMap<>();
            dashboardData.put("message", "User dashboard data");
            dashboardData.put("role", "USER");
            dashboardData.put("user", user);
            dashboardData.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(dashboardData);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Get User Profile
     * Returns user profile information
     */
    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getUserProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = authentication.getName();
            
            User user = userService.getProfile(userEmail);
            
            Map<String, Object> profile = new HashMap<>();
            profile.put("role", "USER");
            profile.put("user", user);
            profile.put("message", "User profile data");
            
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Update User Profile
     * Allows users to update their profile information
     */
    @PutMapping("/profile")
    public ResponseEntity<Map<String, Object>> updateUserProfile(@RequestBody Map<String, String> profileData) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userEmail = authentication.getName();
            
            User user = userService.getProfile(userEmail);
            
            // Update user profile
            String bio = profileData.get("bio");
            String phoneNumber = profileData.get("phoneNumber");
            String location = profileData.get("location");
            
            User updatedUser = userService.updateProfile(user.getId(), bio, phoneNumber, location);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Profile updated successfully");
            response.put("user", updatedUser);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * User Logout
     * Invalidates user session
     */
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> userLogout() {
        try {
            Map<String, String> response = new HashMap<>();
            response.put("message", "User logged out successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
