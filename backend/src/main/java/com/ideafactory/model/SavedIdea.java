package com.ideafactory.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "saved_ideas")
public class SavedIdea {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idea_id", nullable = false)
    private Idea idea;
    
    @Column(name = "saved_at")
    private LocalDateTime savedAt;
    
    @Column(name = "notes")
    private String notes;
    
    // Constructors
    public SavedIdea() {}
    
    public SavedIdea(User user, Idea idea) {
        this.user = user;
        this.idea = idea;
        this.savedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public Idea getIdea() { return idea; }
    public void setIdea(Idea idea) { this.idea = idea; }
    
    public LocalDateTime getSavedAt() { return savedAt; }
    public void setSavedAt(LocalDateTime savedAt) { this.savedAt = savedAt; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    @PrePersist
    protected void onCreate() {
        this.savedAt = LocalDateTime.now();
    }
} 