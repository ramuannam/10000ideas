package com.ideafactory.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "idea_schemes")
public class IdeaScheme {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idea_id", nullable = false)
    private Idea idea;
    
    @NotBlank
    private String schemeName;
    
    @Column(name = "scheme_type")
    private String schemeType; // GOVERNMENT, BANK, PRIVATE, NGO
    
    @Column(name = "scheme_category")
    private String schemeCategory; // SUBSIDY, LOAN, GRANT, TRAINING
    
    @Column(name = "region_state")
    private String regionState;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "eligibility_criteria", columnDefinition = "TEXT")
    private String eligibilityCriteria;
    
    @Column(name = "maximum_amount")
    private BigDecimal maximumAmount;
    
    @Column(name = "interest_rate")
    private BigDecimal interestRate;
    
    @Column(name = "repayment_period")
    private String repaymentPeriod;
    
    @Column(name = "application_deadline")
    private LocalDateTime applicationDeadline;
    
    @Column(name = "contact_info")
    private String contactInfo;
    
    @Column(name = "website_url")
    private String websiteUrl;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public IdeaScheme() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public IdeaScheme(Idea idea, String schemeName, String schemeType) {
        this();
        this.idea = idea;
        this.schemeName = schemeName;
        this.schemeType = schemeType;
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
    
    public String getSchemeName() {
        return schemeName;
    }
    
    public void setSchemeName(String schemeName) {
        this.schemeName = schemeName;
    }
    
    public String getSchemeType() {
        return schemeType;
    }
    
    public void setSchemeType(String schemeType) {
        this.schemeType = schemeType;
    }
    
    public String getSchemeCategory() {
        return schemeCategory;
    }
    
    public void setSchemeCategory(String schemeCategory) {
        this.schemeCategory = schemeCategory;
    }
    
    public String getRegionState() {
        return regionState;
    }
    
    public void setRegionState(String regionState) {
        this.regionState = regionState;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getEligibilityCriteria() {
        return eligibilityCriteria;
    }
    
    public void setEligibilityCriteria(String eligibilityCriteria) {
        this.eligibilityCriteria = eligibilityCriteria;
    }
    
    public BigDecimal getMaximumAmount() {
        return maximumAmount;
    }
    
    public void setMaximumAmount(BigDecimal maximumAmount) {
        this.maximumAmount = maximumAmount;
    }
    
    public BigDecimal getInterestRate() {
        return interestRate;
    }
    
    public void setInterestRate(BigDecimal interestRate) {
        this.interestRate = interestRate;
    }
    
    public String getRepaymentPeriod() {
        return repaymentPeriod;
    }
    
    public void setRepaymentPeriod(String repaymentPeriod) {
        this.repaymentPeriod = repaymentPeriod;
    }
    
    public LocalDateTime getApplicationDeadline() {
        return applicationDeadline;
    }
    
    public void setApplicationDeadline(LocalDateTime applicationDeadline) {
        this.applicationDeadline = applicationDeadline;
    }
    
    public String getContactInfo() {
        return contactInfo;
    }
    
    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }
    
    public String getWebsiteUrl() {
        return websiteUrl;
    }
    
    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
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
    
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
} 