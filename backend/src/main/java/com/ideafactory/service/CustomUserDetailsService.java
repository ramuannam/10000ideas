package com.ideafactory.service;

import com.ideafactory.model.User;
import com.ideafactory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * Custom User Details Service
 * Implements Spring Security's UserDetailsService to load user details from database
 * for authentication and authorization purposes
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * Load user details by username (email in our case)
     * This method is called by Spring Security during authentication
     * 
     * @param email the email address of the user
     * @return UserDetails object containing user information and authorities
     * @throws UsernameNotFoundException if user is not found
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Find user by email
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        
        // Check if user is active
        if (!user.isActive()) {
            throw new UsernameNotFoundException("User account is disabled: " + email);
        }
        
        // Create authorities based on user role
        String role = "ROLE_" + user.getRole().name();
        
        // Return Spring Security UserDetails object
        return org.springframework.security.core.userdetails.User
            .withUsername(user.getEmail())
            .password(user.getPasswordHash())
            .authorities(Collections.singletonList(new SimpleGrantedAuthority(role)))
            .accountExpired(false)
            .accountLocked(false)
            .credentialsExpired(false)
            .disabled(!user.isActive())
            .build();
    }
    
    /**
     * Load user details by user ID
     * Useful for programmatic authentication
     * 
     * @param userId the user ID
     * @return UserDetails object
     * @throws UsernameNotFoundException if user is not found
     */
    public UserDetails loadUserById(Long userId) throws UsernameNotFoundException {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + userId));
        
        if (!user.isActive()) {
            throw new UsernameNotFoundException("User account is disabled: " + user.getEmail());
        }
        
        String role = "ROLE_" + user.getRole().name();
        
        return org.springframework.security.core.userdetails.User
            .withUsername(user.getEmail())
            .password(user.getPasswordHash())
            .authorities(Collections.singletonList(new SimpleGrantedAuthority(role)))
            .accountExpired(false)
            .accountLocked(false)
            .credentialsExpired(false)
            .disabled(!user.isActive())
            .build();
    }
}
