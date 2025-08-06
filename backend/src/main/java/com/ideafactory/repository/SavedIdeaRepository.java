package com.ideafactory.repository;

import com.ideafactory.model.SavedIdea;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavedIdeaRepository extends JpaRepository<SavedIdea, Long> {
    
    @Query("SELECT si FROM SavedIdea si WHERE si.user.id = :userId")
    Page<SavedIdea> findByUserId(@Param("userId") Long userId, Pageable pageable);
    
    @Query("SELECT si FROM SavedIdea si WHERE si.user.id = :userId AND si.idea.id = :ideaId")
    Optional<SavedIdea> findByUserIdAndIdeaId(@Param("userId") Long userId, @Param("ideaId") Long ideaId);
    
    @Query("SELECT COUNT(si) FROM SavedIdea si WHERE si.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
    
    @Query("SELECT si FROM SavedIdea si WHERE si.user.id = :userId ORDER BY si.savedAt DESC")
    List<SavedIdea> findRecentByUserId(@Param("userId") Long userId);
    
    boolean existsByUserIdAndIdeaId(Long userId, Long ideaId);
} 