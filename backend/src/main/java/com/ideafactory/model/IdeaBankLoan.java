package com.ideafactory.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "idea_bank_loans")
public class IdeaBankLoan {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idea_id", nullable = false)
    private Idea idea;
    
    @NotBlank
    private String bankName;
    
    @Column(name = "loan_type")
    private String loanType; // BUSINESS_LOAN, MSME_LOAN, STARTUP_LOAN, etc.
    
    @Column(name = "loan_name")
    private String loanName;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "minimum_amount")
    private BigDecimal minimumAmount;
    
    @Column(name = "maximum_amount")
    private BigDecimal maximumAmount;
    
    @Column(name = "interest_rate_min")
    private BigDecimal interestRateMin;
    
    @Column(name = "interest_rate_max")
    private BigDecimal interestRateMax;
    
    @Column(name = "loan_tenure_min")
    private String loanTenureMin;
    
    @Column(name = "loan_tenure_max")
    private String loanTenureMax;
    
    @Column(name = "processing_fee")
    private BigDecimal processingFee;
    
    @Column(name = "eligibility_criteria", columnDefinition = "TEXT")
    private String eligibilityCriteria;
    
    @Column(name = "required_documents", columnDefinition = "TEXT")
    private String requiredDocuments;
    
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
    public IdeaBankLoan() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public IdeaBankLoan(Idea idea, String bankName, String loanType) {
        this();
        this.idea = idea;
        this.bankName = bankName;
        this.loanType = loanType;
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
    
    public String getBankName() {
        return bankName;
    }
    
    public void setBankName(String bankName) {
        this.bankName = bankName;
    }
    
    public String getLoanType() {
        return loanType;
    }
    
    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }
    
    public String getLoanName() {
        return loanName;
    }
    
    public void setLoanName(String loanName) {
        this.loanName = loanName;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public BigDecimal getMinimumAmount() {
        return minimumAmount;
    }
    
    public void setMinimumAmount(BigDecimal minimumAmount) {
        this.minimumAmount = minimumAmount;
    }
    
    public BigDecimal getMaximumAmount() {
        return maximumAmount;
    }
    
    public void setMaximumAmount(BigDecimal maximumAmount) {
        this.maximumAmount = maximumAmount;
    }
    
    public BigDecimal getInterestRateMin() {
        return interestRateMin;
    }
    
    public void setInterestRateMin(BigDecimal interestRateMin) {
        this.interestRateMin = interestRateMin;
    }
    
    public BigDecimal getInterestRateMax() {
        return interestRateMax;
    }
    
    public void setInterestRateMax(BigDecimal interestRateMax) {
        this.interestRateMax = interestRateMax;
    }
    
    public String getLoanTenureMin() {
        return loanTenureMin;
    }
    
    public void setLoanTenureMin(String loanTenureMin) {
        this.loanTenureMin = loanTenureMin;
    }
    
    public String getLoanTenureMax() {
        return loanTenureMax;
    }
    
    public void setLoanTenureMax(String loanTenureMax) {
        this.loanTenureMax = loanTenureMax;
    }
    
    public BigDecimal getProcessingFee() {
        return processingFee;
    }
    
    public void setProcessingFee(BigDecimal processingFee) {
        this.processingFee = processingFee;
    }
    
    public String getEligibilityCriteria() {
        return eligibilityCriteria;
    }
    
    public void setEligibilityCriteria(String eligibilityCriteria) {
        this.eligibilityCriteria = eligibilityCriteria;
    }
    
    public String getRequiredDocuments() {
        return requiredDocuments;
    }
    
    public void setRequiredDocuments(String requiredDocuments) {
        this.requiredDocuments = requiredDocuments;
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