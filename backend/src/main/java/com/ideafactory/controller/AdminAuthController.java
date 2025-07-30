package com.ideafactory.controller;

import com.ideafactory.config.JwtTokenUtil;
import com.ideafactory.dto.LoginRequest;
import com.ideafactory.dto.LoginResponse;
import com.ideafactory.model.Admin;
import com.ideafactory.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminAuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private AdminService adminService;
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // Find admin by username or email
            Admin admin = adminService.findByUsernameOrEmail(loginRequest.getUsernameOrEmail());
            
            if (admin == null || !admin.isActive()) {
                return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Invalid credentials or account disabled"));
            }
            
            // Authenticate with Spring Security
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    admin.getUsername(),
                    loginRequest.getPassword()
                )
            );
            
            // Generate JWT token
            String token = jwtTokenUtil.generateToken(admin.getUsername(), admin.getRole().name());
            
            // Update last login
            adminService.updateLastLogin(admin.getUsername());
            
            // Prepare response
            LoginResponse response = new LoginResponse(
                token,
                admin.getUsername(),
                admin.getEmail(),
                admin.getFullName(),
                admin.getRole().name()
            );
            
            return ResponseEntity.ok(response);
            
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, "Invalid credentials"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, "Login failed: " + e.getMessage()));
        }
    }
    
    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                String username = jwtTokenUtil.getUsernameFromToken(token);
                
                if (jwtTokenUtil.validateToken(token, username)) {
                    Admin admin = adminService.findByUsername(username);
                    if (admin != null && admin.isActive()) {
                        return ResponseEntity.ok(new ApiResponse(true, "Token is valid"));
                    }
                }
            }
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, "Invalid token"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, "Token validation failed"));
        }
    }
    
    // Helper class for API responses
    public static class ApiResponse {
        private boolean success;
        private String message;
        
        public ApiResponse(boolean success, String message) {
            this.success = success;
            this.message = message;
        }
        
        // Getters and Setters
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
    }
} 