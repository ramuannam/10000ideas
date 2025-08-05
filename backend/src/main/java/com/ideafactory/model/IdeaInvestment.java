package com.ideafactory.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;

@Entity
@Table(name = "idea_investments")
public class IdeaInvestment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idea_id", nullable = false)
    private Idea idea;
    
    @NotBlank
    private String investmentCategory; // Machinery, Land, Marketing, Raw Materials, etc.
    
    @NotNull
    private BigDecimal amount;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "priority_level")
    private String priorityLevel; // HIGH, MEDIUM, LOW
    
    @Column(name = "is_optional")
    private Boolean isOptional = false;
    
    @Column(name = "payment_terms")
    private String paymentTerms; // Upfront, Installments, etc.
    
    @Column(name = "supplier_info")
    private String supplierInfo;
    
    // Constructors
    public IdeaInvestment() {}
    
    public IdeaInvestment(Idea idea, String investmentCategory, BigDecimal amount) {
        this.idea = idea;
        this.investmentCategory = investmentCategory;
        this.amount = amount;
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
    
    public String getInvestmentCategory() {
        return investmentCategory;
    }
    
    public void setInvestmentCategory(String investmentCategory) {
        this.investmentCategory = investmentCategory;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getPriorityLevel() {
        return priorityLevel;
    }
    
    public void setPriorityLevel(String priorityLevel) {
        this.priorityLevel = priorityLevel;
    }
    
    public Boolean getIsOptional() {
        return isOptional;
    }
    
    public void setIsOptional(Boolean isOptional) {
        this.isOptional = isOptional;
    }
    
    public String getPaymentTerms() {
        return paymentTerms;
    }
    
    public void setPaymentTerms(String paymentTerms) {
        this.paymentTerms = paymentTerms;
    }
    
    public String getSupplierInfo() {
        return supplierInfo;
    }
    
    public void setSupplierInfo(String supplierInfo) {
        this.supplierInfo = supplierInfo;
    }
} 