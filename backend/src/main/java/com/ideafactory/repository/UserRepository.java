package com.ideafactory.repository;

import com.ideafactory.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Basic user queries
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    Optional<User> findByGoogleId(String googleId);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    
    // Role-based queries
    List<User> findByRole(User.UserRole role);
    List<User> findByRoleAndActive(User.UserRole role, boolean active);
    
    // Admin-specific queries
    Optional<User> findByAdminSessionId(String adminSessionId);
    Optional<User> findByRoleAndAdminSessionId(User.UserRole role, String adminSessionId);
    
    // Active user queries
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.active = true")
    Optional<User> findActiveUserByEmail(@Param("email") String email);
    
    @Query("SELECT u FROM User u WHERE u.username = :username AND u.active = true")
    Optional<User> findActiveUserByUsername(@Param("username") String username);
    
    // Auth provider queries
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.authProvider = 'EMAIL'")
    Optional<User> findEmailUserByEmail(@Param("email") String email);
    
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.authProvider = 'GOOGLE'")
    Optional<User> findGoogleUserByEmail(@Param("email") String email);
    
    // Token queries
    Optional<User> findByResetPasswordToken(String token);
    Optional<User> findByVerificationToken(String token);
    
    // Admin session queries
    @Query("SELECT u FROM User u WHERE u.role = 'ADMIN' AND u.adminSessionId = :sessionId")
    Optional<User> findAdminBySessionId(@Param("sessionId") String sessionId);
    
    // User management queries
    @Query("SELECT u FROM User u WHERE u.role = 'USER' ORDER BY u.createdAt DESC")
    List<User> findAllRegularUsers();
    
    @Query("SELECT u FROM User u WHERE u.role = 'ADMIN' ORDER BY u.createdAt DESC")
    List<User> findAllAdmins();
    
    // Statistics queries
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = 'USER' AND u.active = true")
    Long countActiveUsers();
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = 'ADMIN' AND u.active = true")
    Long countActiveAdmins();
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.emailVerified = true")
    Long countVerifiedUsers();
} 