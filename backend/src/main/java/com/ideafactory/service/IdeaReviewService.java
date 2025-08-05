package com.ideafactory.service;

import com.ideafactory.model.Idea;
import com.ideafactory.model.IdeaReview;
import com.ideafactory.repository.IdeaRepository;
import com.ideafactory.repository.IdeaReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class IdeaReviewService {
    
    @Autowired
    private IdeaReviewRepository reviewRepository;
    
    @Autowired
    private IdeaRepository ideaRepository;
    
    public IdeaReview createReview(IdeaReview review) {
        return reviewRepository.save(review);
    }
    
    public List<IdeaReview> getApprovedReviewsByIdeaId(Long ideaId) {
        return reviewRepository.findApprovedReviewsByIdeaId(ideaId);
    }
    
    public List<IdeaReview> getPendingReviews() {
        return reviewRepository.findByIsApprovedFalseOrderByCreatedAtDesc();
    }
    
    public IdeaReview approveReview(Long reviewId) {
        Optional<IdeaReview> reviewOpt = reviewRepository.findById(reviewId);
        if (reviewOpt.isPresent()) {
            IdeaReview review = reviewOpt.get();
            review.setIsApproved(true);
            return reviewRepository.save(review);
        }
        return null;
    }
    
    public void deleteReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }
    
    public Map<String, Object> getRatingSummaryByIdeaId(Long ideaId) {
        Double averageRating = reviewRepository.getAverageRatingByIdeaId(ideaId);
        Long totalReviews = reviewRepository.getReviewCountByIdeaId(ideaId);
        
        Map<String, Object> summary = new HashMap<>();
        summary.put("averageRating", averageRating != null ? averageRating : 0.0);
        summary.put("totalReviews", totalReviews != null ? totalReviews : 0L);
        
        // Rating distribution
        Map<Integer, Long> ratingDistribution = new HashMap<>();
        for (int i = 1; i <= 5; i++) {
            Long count = reviewRepository.getReviewCountByRating(ideaId, i);
            ratingDistribution.put(i, count != null ? count : 0L);
        }
        summary.put("ratingDistribution", ratingDistribution);
        
        return summary;
    }
    
    public IdeaReview updateReviewVotes(Long reviewId, boolean isHelpful) {
        Optional<IdeaReview> reviewOpt = reviewRepository.findById(reviewId);
        if (reviewOpt.isPresent()) {
            IdeaReview review = reviewOpt.get();
            if (isHelpful) {
                review.setHelpfulVotes(review.getHelpfulVotes() + 1);
            } else {
                review.setUnhelpfulVotes(review.getUnhelpfulVotes() + 1);
            }
            return reviewRepository.save(review);
        }
        return null;
    }
} 