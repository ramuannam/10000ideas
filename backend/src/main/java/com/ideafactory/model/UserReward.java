package com.ideafactory.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_rewards")
public class UserReward {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @NotBlank(message = "Reward name is required")
    private String name;
    
    @NotBlank(message = "Reward description is required")
    @Column(length = 500)
    private String description;
    
    @Enumerated(EnumType.STRING)
    private RewardType type;
    
    @Column(name = "points_value")
    private Integer pointsValue;
    
    @Column(name = "icon_url")
    private String iconUrl;
    
    @Column(name = "earned_at")
    private LocalDateTime earnedAt;
    
    @Column(name = "is_claimed")
    private boolean claimed = false;
    
    @Column(name = "claimed_at")
    private LocalDateTime claimedAt;
    
    // Constructors
    public UserReward() {}
    
    public UserReward(User user, String name, String description, RewardType type, Integer pointsValue) {
        this.user = user;
        this.name = name;
        this.description = description;
        this.type = type;
        this.pointsValue = pointsValue;
        this.earnedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public RewardType getType() { return type; }
    public void setType(RewardType type) { this.type = type; }
    
    public Integer getPointsValue() { return pointsValue; }
    public void setPointsValue(Integer pointsValue) { this.pointsValue = pointsValue; }
    
    public String getIconUrl() { return iconUrl; }
    public void setIconUrl(String iconUrl) { this.iconUrl = iconUrl; }
    
    public LocalDateTime getEarnedAt() { return earnedAt; }
    public void setEarnedAt(LocalDateTime earnedAt) { this.earnedAt = earnedAt; }
    
    public boolean isClaimed() { return claimed; }
    public void setClaimed(boolean claimed) { this.claimed = claimed; }
    
    public LocalDateTime getClaimedAt() { return claimedAt; }
    public void setClaimedAt(LocalDateTime claimedAt) { this.claimedAt = claimedAt; }
    
    @PrePersist
    protected void onCreate() {
        this.earnedAt = LocalDateTime.now();
    }
    
    public enum RewardType {
        BADGE, POINTS, ACHIEVEMENT, MILESTONE
    }
} 