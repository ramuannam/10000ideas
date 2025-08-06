package com.ideafactory.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "proposed_ideas")
public class ProposedIdea {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @NotBlank(message = "Idea title is required")
    private String title;
    
    @NotBlank(message = "Idea description is required")
    @Column(length = 2000)
    private String description;
    
    @Column(name = "category")
    private String category;
    
    @Column(name = "investment_needed")
    private Long investmentNeeded;
    
    @Column(name = "difficulty_level")
    private String difficultyLevel;
    
    @Enumerated(EnumType.STRING)
    private ProposalStatus status = ProposalStatus.PENDING;
    
    @Column(name = "admin_notes")
    private String adminNotes;
    
    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;
    
    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;
    
    @Column(name = "reviewed_by")
    private String reviewedBy;
    
    // Constructors
    public ProposedIdea() {}
    
    public ProposedIdea(User user, String title, String description, String category, Long investmentNeeded, String difficultyLevel) {
        this.user = user;
        this.title = title;
        this.description = description;
        this.category = category;
        this.investmentNeeded = investmentNeeded;
        this.difficultyLevel = difficultyLevel;
        this.status = ProposalStatus.PENDING;
        this.submittedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public Long getInvestmentNeeded() { return investmentNeeded; }
    public void setInvestmentNeeded(Long investmentNeeded) { this.investmentNeeded = investmentNeeded; }
    
    public String getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }
    
    public ProposalStatus getStatus() { return status; }
    public void setStatus(ProposalStatus status) { this.status = status; }
    
    public String getAdminNotes() { return adminNotes; }
    public void setAdminNotes(String adminNotes) { this.adminNotes = adminNotes; }
    
    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
    
    public LocalDateTime getReviewedAt() { return reviewedAt; }
    public void setReviewedAt(LocalDateTime reviewedAt) { this.reviewedAt = reviewedAt; }
    
    public String getReviewedBy() { return reviewedBy; }
    public void setReviewedBy(String reviewedBy) { this.reviewedBy = reviewedBy; }
    
    @PrePersist
    protected void onCreate() {
        this.submittedAt = LocalDateTime.now();
    }
    
    public enum ProposalStatus {
        PENDING, APPROVED, REJECTED, UNDER_REVIEW
    }
} 