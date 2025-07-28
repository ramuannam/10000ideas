package com.ideafactory.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "ideas")
public class Idea {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotBlank
    private String category; // Business, Manufacturing, Service, Unicorn, etc.
    
    @NotBlank
    private String sector; // Tech, Healthcare, Education, etc.
    
    @NotNull
    private BigDecimal investmentNeeded;
    
    private String expertiseNeeded;
    
    private String trainingNeeded;
    
    @Column(columnDefinition = "TEXT")
    private String resources;
    
    @Column(columnDefinition = "TEXT")
    private String successExamples;
    
    private String videoUrl;
    
    @Column(columnDefinition = "TEXT")
    private String governmentSubsidies;
    
    @Column(columnDefinition = "TEXT")
    private String fundingOptions;
    
    @Column(columnDefinition = "TEXT")
    private String bankAssistance;
    
    @ElementCollection
    private List<String> targetAudience; // Women, Rural, Specially Abled, etc.
    
    @ElementCollection
    private List<String> specialAdvantages;
    
    private String difficultyLevel; // Easy, Medium, Hard
    
    private String timeToMarket; // 1-3 months, 3-6 months, 6-12 months, 1+ years
    
    private String location; // Urban, Rural, Both
    
    private String imageUrl;
    
    private boolean isActive = true;
    
    // Constructors
    public Idea() {}
    
    public Idea(String title, String description, String category, String sector, BigDecimal investmentNeeded) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.sector = sector;
        this.investmentNeeded = investmentNeeded;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public String getSector() {
        return sector;
    }
    
    public void setSector(String sector) {
        this.sector = sector;
    }
    
    public BigDecimal getInvestmentNeeded() {
        return investmentNeeded;
    }
    
    public void setInvestmentNeeded(BigDecimal investmentNeeded) {
        this.investmentNeeded = investmentNeeded;
    }
    
    public String getExpertiseNeeded() {
        return expertiseNeeded;
    }
    
    public void setExpertiseNeeded(String expertiseNeeded) {
        this.expertiseNeeded = expertiseNeeded;
    }
    
    public String getTrainingNeeded() {
        return trainingNeeded;
    }
    
    public void setTrainingNeeded(String trainingNeeded) {
        this.trainingNeeded = trainingNeeded;
    }
    
    public String getResources() {
        return resources;
    }
    
    public void setResources(String resources) {
        this.resources = resources;
    }
    
    public String getSuccessExamples() {
        return successExamples;
    }
    
    public void setSuccessExamples(String successExamples) {
        this.successExamples = successExamples;
    }
    
    public String getVideoUrl() {
        return videoUrl;
    }
    
    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
    
    public String getGovernmentSubsidies() {
        return governmentSubsidies;
    }
    
    public void setGovernmentSubsidies(String governmentSubsidies) {
        this.governmentSubsidies = governmentSubsidies;
    }
    
    public String getFundingOptions() {
        return fundingOptions;
    }
    
    public void setFundingOptions(String fundingOptions) {
        this.fundingOptions = fundingOptions;
    }
    
    public String getBankAssistance() {
        return bankAssistance;
    }
    
    public void setBankAssistance(String bankAssistance) {
        this.bankAssistance = bankAssistance;
    }
    
    public List<String> getTargetAudience() {
        return targetAudience;
    }
    
    public void setTargetAudience(List<String> targetAudience) {
        this.targetAudience = targetAudience;
    }
    
    public List<String> getSpecialAdvantages() {
        return specialAdvantages;
    }
    
    public void setSpecialAdvantages(List<String> specialAdvantages) {
        this.specialAdvantages = specialAdvantages;
    }
    
    public String getDifficultyLevel() {
        return difficultyLevel;
    }
    
    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }
    
    public String getTimeToMarket() {
        return timeToMarket;
    }
    
    public void setTimeToMarket(String timeToMarket) {
        this.timeToMarket = timeToMarket;
    }
    
    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public boolean isActive() {
        return isActive;
    }
    
    public void setActive(boolean active) {
        isActive = active;
    }
} 