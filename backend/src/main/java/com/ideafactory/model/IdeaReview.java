package com.ideafactory.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

@Entity
@Table(name = "idea_reviews")
public class IdeaReview {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idea_id", nullable = false)
    private Idea idea;
    
    @NotBlank
    @Size(max = 100)
    private String reviewerName;
    
    @Email
    @Size(max = 100)
    private String reviewerEmail;
    
    @Size(max = 100)
    private String reviewerWebsite;
    
    @NotBlank
    @Size(max = 500)
    private String comment;
    
    @NotNull
    @Min(1)
    @Max(5)
    private Integer rating;
    
    @Column(name = "helpful_votes", columnDefinition = "INT DEFAULT 0")
    private Integer helpfulVotes = 0;
    
    @Column(name = "unhelpful_votes", columnDefinition = "INT DEFAULT 0")
    private Integer unhelpfulVotes = 0;
    
    @Column(name = "is_recommended", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isRecommended = false;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "is_approved", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isApproved = false;
    
    // Constructors
    public IdeaReview() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public IdeaReview(Idea idea, String reviewerName, String comment, Integer rating) {
        this();
        this.idea = idea;
        this.reviewerName = reviewerName;
        this.comment = comment;
        this.rating = rating;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Idea getIdea() {
        return idea;
    }
    
    public void setIdea(Idea idea) {
        this.idea = idea;
    }
    
    public String getReviewerName() {
        return reviewerName;
    }
    
    public void setReviewerName(String reviewerName) {
        this.reviewerName = reviewerName;
    }
    
    public String getReviewerEmail() {
        return reviewerEmail;
    }
    
    public void setReviewerEmail(String reviewerEmail) {
        this.reviewerEmail = reviewerEmail;
    }
    
    public String getReviewerWebsite() {
        return reviewerWebsite;
    }
    
    public void setReviewerWebsite(String reviewerWebsite) {
        this.reviewerWebsite = reviewerWebsite;
    }
    
    public String getComment() {
        return comment;
    }
    
    public void setComment(String comment) {
        this.comment = comment;
    }
    
    public Integer getRating() {
        return rating;
    }
    
    public void setRating(Integer rating) {
        this.rating = rating;
    }
    
    public Integer getHelpfulVotes() {
        return helpfulVotes;
    }
    
    public void setHelpfulVotes(Integer helpfulVotes) {
        this.helpfulVotes = helpfulVotes;
    }
    
    public Integer getUnhelpfulVotes() {
        return unhelpfulVotes;
    }
    
    public void setUnhelpfulVotes(Integer unhelpfulVotes) {
        this.unhelpfulVotes = unhelpfulVotes;
    }
    
    public Boolean getIsRecommended() {
        return isRecommended;
    }
    
    public void setIsRecommended(Boolean isRecommended) {
        this.isRecommended = isRecommended;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public Boolean getIsApproved() {
        return isApproved;
    }
    
    public void setIsApproved(Boolean isApproved) {
        this.isApproved = isApproved;
    }
    
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
} 