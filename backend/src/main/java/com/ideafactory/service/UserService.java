package com.ideafactory.service;

import com.ideafactory.dto.UserSignupRequest;
import com.ideafactory.dto.UserLoginRequest;
import com.ideafactory.dto.UserAuthResponse;
import com.ideafactory.model.User;
import com.ideafactory.model.AdminSession;
import com.ideafactory.repository.UserRepository;
import com.ideafactory.repository.AdminSessionRepository;
import com.ideafactory.config.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AdminSessionRepository adminSessionRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    
    @Autowired
    private EmailService emailService;
    
    // User Registration
    @Transactional
    public UserAuthResponse signup(UserSignupRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        
        // Generate username from full name
        String username = generateUsernameFromFullName(request.getFullName());
        if (userRepository.existsByUsername(username)) {
            // If username exists, append a number
            int counter = 1;
            while (userRepository.existsByUsername(username + counter)) {
                counter++;
            }
            username = username + counter;
        }
        
        // Create new user
        User user = new User();
        user.setUsername(username);
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setPasswordSalt(generateSalt());
        user.setRole(User.UserRole.USER);
        user.setActive(true);
        user.setEmailVerified(false);
        user.setAuthProvider(User.AuthProvider.EMAIL);
        
        // Set optional fields
        if (request.getProfileImageUrl() != null) {
            user.setProfileImageUrl(request.getProfileImageUrl());
        }
        if (request.getBio() != null) {
            user.setBio(request.getBio());
        }
        if (request.getPhoneNumber() != null) {
            user.setPhoneNumber(request.getPhoneNumber());
        }
        if (request.getLocation() != null) {
            user.setLocation(request.getLocation());
        }
        
        // Generate verification token
        String verificationToken = UUID.randomUUID().toString();
        user.setVerificationToken(verificationToken);
        user.setVerificationTokenExpiry(LocalDateTime.now().plusHours(24));
        
        // Save user
        User savedUser = userRepository.save(user);
        
        // Send verification email
        emailService.sendVerificationEmail(savedUser.getEmail(), verificationToken);
        
        // Generate JWT token
        String token = jwtTokenUtil.generateToken(savedUser.getUsername(), savedUser.getRole().name());
        
        return createAuthResponse(savedUser, token);
    }
    
    // User Login
    @Transactional
    public UserAuthResponse login(UserLoginRequest request) {
        // First check if user exists
        if (!userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("User not found. Please sign up first!");
        }
        
        Optional<User> userOpt = userRepository.findActiveUserByEmail(request.getEmail());
        
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found. Please sign up first!");
        }
        
        User user = userOpt.get();
        
        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid password. Please check your credentials.");
        }
        
        // Update last login
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        
        // Generate JWT token
        String token = jwtTokenUtil.generateToken(user.getUsername(), user.getRole().name());
        
        return createAuthResponse(user, token);
    }
    
    // Admin Login with session management
    @Transactional
    public UserAuthResponse adminLogin(UserLoginRequest request) {
        Optional<User> userOpt = userRepository.findActiveUserByEmail(request.getEmail());
        
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }
        
        User user = userOpt.get();
        
        // Verify it's an admin
        if (!user.isAdmin()) {
            throw new RuntimeException("Access denied. Admin privileges required.");
        }
        
        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid email or password");
        }
        
        // Handle single admin session
        String sessionId = UUID.randomUUID().toString();
        LocalDateTime expiresAt = LocalDateTime.now().plusHours(24);
        
        // Deactivate other admin sessions
        adminSessionRepository.deactivateOtherSessionsForUser(user.getId(), sessionId);
        
        // Create new admin session
        AdminSession adminSession = new AdminSession(user, sessionId, expiresAt);
        adminSessionRepository.save(adminSession);
        
        // Update user's admin session info
        user.setLastAdminLogin(LocalDateTime.now());
        user.setAdminSessionId(sessionId);
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        
        // Generate JWT token
        String token = jwtTokenUtil.generateToken(user.getUsername(), user.getRole().name());
        
        return createAuthResponse(user, token);
    }
    
    // Google Login
    @Transactional
    public UserAuthResponse googleLogin(String googleId, String email, String fullName, String profilePictureUrl) {
        Optional<User> existingUser = userRepository.findByGoogleId(googleId);
        
        User user;
        if (existingUser.isPresent()) {
            // Existing Google user
            user = existingUser.get();
            user.setLastLogin(LocalDateTime.now());
            userRepository.save(user);
        } else {
            // Check if email exists with different auth provider
            Optional<User> emailUser = userRepository.findByEmail(email);
            if (emailUser.isPresent()) {
                throw new RuntimeException("Email already registered with different authentication method");
            }
            
            // Create new Google user
            user = new User();
            user.setUsername(generateUsernameFromEmail(email));
            user.setEmail(email);
            user.setGoogleId(googleId);
            user.setPasswordHash(passwordEncoder.encode(UUID.randomUUID().toString()));
            user.setPasswordSalt(generateSalt());
            user.setRole(User.UserRole.USER);
            user.setActive(true);
            user.setEmailVerified(true);
            user.setAuthProvider(User.AuthProvider.GOOGLE);
            user.setProfileImageUrl(profilePictureUrl);
            user.setBio("Google user");
            
            user = userRepository.save(user);
        }
        
        // Generate JWT token
        String token = jwtTokenUtil.generateToken(user.getUsername(), user.getRole().name());
        
        return createAuthResponse(user, token);
    }
    
    // Forgot Password
    @Transactional
    public void forgotPassword(String email) {
        Optional<User> userOpt = userRepository.findActiveUserByEmail(email);
        
        if (userOpt.isEmpty()) {
            // Don't reveal if email exists or not
            return;
        }
        
        User user = userOpt.get();
        
        // Generate reset token
        String resetToken = UUID.randomUUID().toString();
        user.setResetPasswordToken(resetToken);
        user.setResetPasswordTokenExpiry(LocalDateTime.now().plusHours(1));
        
        userRepository.save(user);
        
        // Send reset email
        emailService.sendPasswordResetEmail(user.getEmail(), resetToken);
    }
    
    // Reset Password
    @Transactional
    public void resetPassword(String token, String newPassword) {
        Optional<User> userOpt = userRepository.findByResetPasswordToken(token);
        
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Invalid or expired reset token");
        }
        
        User user = userOpt.get();
        
        if (user.getResetPasswordTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Reset token has expired");
        }
        
        // Update password
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        user.setPasswordSalt(generateSalt());
        user.setResetPasswordToken(null);
        user.setResetPasswordTokenExpiry(null);
        
        userRepository.save(user);
    }
    
    // Email Verification
    @Transactional
    public void verifyEmail(String token) {
        Optional<User> userOpt = userRepository.findByVerificationToken(token);
        
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Invalid verification token");
        }
        
        User user = userOpt.get();
        
        if (user.getVerificationTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Verification token has expired");
        }
        
        // Verify email
        user.setEmailVerified(true);
        user.setVerificationToken(null);
        user.setVerificationTokenExpiry(null);
        
        userRepository.save(user);
    }
    
    // Get User Profile
    public User getProfile(String email) {
        Optional<User> userOpt = userRepository.findActiveUserByEmail(email);
        
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        
        return userOpt.get();
    }
    
    // Update User Profile
    @Transactional
    public User updateProfile(Long userId, String bio, String phoneNumber, String location) {
        Optional<User> userOpt = userRepository.findById(userId);
        
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        
        User user = userOpt.get();
        user.setBio(bio);
        user.setPhoneNumber(phoneNumber);
        user.setLocation(location);
        
        return userRepository.save(user);
    }
    
    // Admin Session Validation
    public boolean validateAdminSession(String sessionId) {
        Optional<AdminSession> sessionOpt = adminSessionRepository.findBySessionIdAndActive(sessionId, true);
        
        if (sessionOpt.isEmpty()) {
            return false;
        }
        
        AdminSession session = sessionOpt.get();
        return session.isValid();
    }
    
    // Helper methods
    private UserAuthResponse createAuthResponse(User user, String token) {
        UserAuthResponse response = new UserAuthResponse();
        response.setToken(token);
        response.setUserId(user.getId());
        response.setFullName(user.getUsername()); // Use username as fullName for now
        response.setEmail(user.getEmail());
        response.setProfileImageUrl(user.getProfileImageUrl());
        response.setRole(user.getRole().name());
        response.setEmailVerified(user.isEmailVerified());
        response.setExpiresAt(LocalDateTime.now().plusHours(24));
        
        return response;
    }
    
    private String generateSalt() {
        return UUID.randomUUID().toString();
    }
    
    private String generateUsernameFromEmail(String email) {
        String baseUsername = email.split("@")[0];
        String username = baseUsername;
        int counter = 1;
        
        while (userRepository.existsByUsername(username)) {
            username = baseUsername + counter;
            counter++;
        }
        
        return username;
    }
    
    private String generateUsernameFromFullName(String fullName) {
        // Convert full name to lowercase and replace spaces with dots
        String username = fullName.toLowerCase().replaceAll("\\s+", ".");
        // Remove any special characters except dots
        username = username.replaceAll("[^a-z0-9.]", "");
        // Ensure it starts with a letter
        if (!username.matches("^[a-z].*")) {
            username = "user." + username;
        }
        // Limit length
        if (username.length() > 20) {
            username = username.substring(0, 20);
        }
        return username;
    }
} 