package com.ideafactory.controller;

import com.ideafactory.dto.UserSignupRequest;
import com.ideafactory.dto.UserLoginRequest;
import com.ideafactory.dto.UserAuthResponse;
import com.ideafactory.model.User;
import com.ideafactory.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * User Controller
 * Handles user authentication and profile management
 * All endpoints are public (no authentication required)
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    /**
     * User Signup Endpoint
     * Creates a new user account with USER role
     */
    @PostMapping("/signup")
    public ResponseEntity<UserAuthResponse> signup(@RequestBody UserSignupRequest request) {
        try {
            UserAuthResponse response = userService.signup(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            UserAuthResponse errorResponse = new UserAuthResponse();
            errorResponse.setMessage(e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * User Login Endpoint
     * Authenticates user and returns JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<UserAuthResponse> login(@RequestBody UserLoginRequest request) {
        try {
            UserAuthResponse response = userService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            UserAuthResponse errorResponse = new UserAuthResponse();
            errorResponse.setMessage(e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Forgot Password Endpoint
     * Sends password reset email
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            userService.forgotPassword(email);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Password reset email sent successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Reset Password Endpoint
     * Resets password using token
     */
    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");
            String newPassword = request.get("newPassword");
            
            userService.resetPassword(token, newPassword);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Password reset successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Email Verification Endpoint
     * Verifies user email using token
     */
    @PostMapping("/verify-email")
    public ResponseEntity<Map<String, String>> verifyEmail(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");
            userService.verifyEmail(token);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Email verified successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    /**
     * Google Login Endpoint
     * Handles Google OAuth authentication
     */
    @PostMapping("/google-login")
    public ResponseEntity<UserAuthResponse> googleLogin(@RequestBody Map<String, String> request) {
        try {
            String googleId = request.get("googleId");
            String email = request.get("email");
            String fullName = request.get("fullName");
            String profilePictureUrl = request.get("profilePictureUrl");
            
            UserAuthResponse response = userService.googleLogin(googleId, email, fullName, profilePictureUrl);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            UserAuthResponse errorResponse = new UserAuthResponse();
            errorResponse.setMessage(e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
} 