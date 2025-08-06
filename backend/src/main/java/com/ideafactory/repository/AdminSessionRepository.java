package com.ideafactory.repository;

import com.ideafactory.model.AdminSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AdminSessionRepository extends JpaRepository<AdminSession, Long> {
    
    // Find active session by session ID
    Optional<AdminSession> findBySessionIdAndActive(String sessionId, boolean active);
    
    // Find active session by user ID
    Optional<AdminSession> findByUser_IdAndActive(Long userId, boolean active);
    
    // Find all active sessions
    List<AdminSession> findByActive(boolean active);
    
    // Find expired sessions
    @Query("SELECT as FROM AdminSession as WHERE as.expiresAt < :now")
    List<AdminSession> findExpiredSessions(@Param("now") LocalDateTime now);
    
    // Find sessions by user
    List<AdminSession> findByUser_Id(Long userId);
    
    // Deactivate all sessions for a user
    @Modifying
    @Query("UPDATE AdminSession as SET as.active = false WHERE as.user.id = :userId")
    void deactivateAllSessionsForUser(@Param("userId") Long userId);
    
    // Deactivate all sessions except the current one
    @Modifying
    @Query("UPDATE AdminSession as SET as.active = false WHERE as.user.id = :userId AND as.sessionId != :sessionId")
    void deactivateOtherSessionsForUser(@Param("userId") Long userId, @Param("sessionId") String sessionId);
    
    // Clean up expired sessions
    @Modifying
    @Query("UPDATE AdminSession as SET as.active = false WHERE as.expiresAt < :now")
    void deactivateExpiredSessions(@Param("now") LocalDateTime now);
    
    // Count active sessions for a user
    @Query("SELECT COUNT(as) FROM AdminSession as WHERE as.user.id = :userId AND as.active = true")
    Long countActiveSessionsForUser(@Param("userId") Long userId);
    
    // Count total active sessions
    @Query("SELECT COUNT(as) FROM AdminSession as WHERE as.active = true")
    Long countActiveSessions();
} 