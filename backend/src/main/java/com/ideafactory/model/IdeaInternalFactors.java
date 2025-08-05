package com.ideafactory.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

@Entity
@Table(name = "idea_internal_factors")
public class IdeaInternalFactors {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idea_id", nullable = false)
    private Idea idea;
    
    @NotBlank
    private String factorType; // STRENGTHS, WEAKNESSES, OPPORTUNITIES, THREATS
    
    @ElementCollection
    private List<String> factors;
    
    @Column(name = "color_code")
    private String colorCode; // For UI styling
    
    @Column(name = "icon_code")
    private String iconCode; // For UI icons
    
    // Constructors
    public IdeaInternalFactors() {}
    
    public IdeaInternalFactors(Idea idea, String factorType, List<String> factors) {
        this.idea = idea;
        this.factorType = factorType;
        this.factors = factors;
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
    
    public String getFactorType() {
        return factorType;
    }
    
    public void setFactorType(String factorType) {
        this.factorType = factorType;
    }
    
    public List<String> getFactors() {
        return factors;
    }
    
    public void setFactors(List<String> factors) {
        this.factors = factors;
    }
    
    public String getColorCode() {
        return colorCode;
    }
    
    public void setColorCode(String colorCode) {
        this.colorCode = colorCode;
    }
    
    public String getIconCode() {
        return iconCode;
    }
    
    public void setIconCode(String iconCode) {
        this.iconCode = iconCode;
    }
} 