package com.ideafactory.repository;

import com.ideafactory.model.IdeaReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdeaReviewRepository extends JpaRepository<IdeaReview, Long> {
    
    List<IdeaReview> findByIdeaIdAndIsApprovedTrueOrderByCreatedAtDesc(Long ideaId);
    
    @Query("SELECT AVG(r.rating) FROM IdeaReview r WHERE r.idea.id = :ideaId AND r.isApproved = true")
    Double getAverageRatingByIdeaId(@Param("ideaId") Long ideaId);
    
    @Query("SELECT COUNT(r) FROM IdeaReview r WHERE r.idea.id = :ideaId AND r.isApproved = true")
    Long getReviewCountByIdeaId(@Param("ideaId") Long ideaId);
    
    @Query("SELECT COUNT(r) FROM IdeaReview r WHERE r.idea.id = :ideaId AND r.rating = :rating AND r.isApproved = true")
    Long getReviewCountByRating(@Param("ideaId") Long ideaId, @Param("rating") Integer rating);
    
    List<IdeaReview> findByIsApprovedFalseOrderByCreatedAtDesc();
    
    @Query("SELECT r FROM IdeaReview r WHERE r.idea.id = :ideaId AND r.isApproved = true ORDER BY r.createdAt DESC")
    List<IdeaReview> findApprovedReviewsByIdeaId(@Param("ideaId") Long ideaId);
} 