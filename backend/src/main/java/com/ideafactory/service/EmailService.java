package com.ideafactory.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Value("${app.frontend-url:http://localhost:3000}")
    private String frontendUrl;
    
    public void sendVerificationEmail(String email, String token) {
        // TODO: Implement actual email sending logic
        // For now, just log the verification link
        String verificationLink = frontendUrl + "/verify-email?token=" + token;
        System.out.println("Verification email sent to " + email + " with link: " + verificationLink);
    }
    
    public void sendPasswordResetEmail(String email, String token) {
        // TODO: Implement actual email sending logic
        // For now, just log the reset link
        String resetLink = frontendUrl + "/reset-password?token=" + token;
        System.out.println("Password reset email sent to " + email + " with link: " + resetLink);
    }
} 