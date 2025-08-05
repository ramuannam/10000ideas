package com.ideafactory.controller;

import com.ideafactory.model.*;
import com.ideafactory.service.IdeaDetailService;
import com.ideafactory.service.IdeaReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/idea-details")
@CrossOrigin(origins = "${spring.web.cors.allowed-origins}")
public class IdeaDetailController {
    
    @Autowired
    private IdeaDetailService ideaDetailService;
    
    @Autowired
    private IdeaReviewService reviewService;
    
    // Complete Idea Details
    @GetMapping("/{ideaId}/complete")
    public ResponseEntity<Map<String, Object>> getCompleteIdeaDetails(@PathVariable Long ideaId) {
        Map<String, Object> details = ideaDetailService.getCompleteIdeaDetails(ideaId);
        return ResponseEntity.ok(details);
    }
    
    // Internal Factors
    @GetMapping("/{ideaId}/internal-factors")
    public ResponseEntity<List<IdeaInternalFactors>> getInternalFactors(@PathVariable Long ideaId) {
        List<IdeaInternalFactors> factors = ideaDetailService.getInternalFactorsByIdeaId(ideaId);
        return ResponseEntity.ok(factors);
    }
    
    @PostMapping("/{ideaId}/internal-factors")
    public ResponseEntity<IdeaInternalFactors> createInternalFactors(
            @PathVariable Long ideaId, 
            @RequestBody IdeaInternalFactors factors) {
        factors.setIdea(new Idea());
        factors.getIdea().setId(ideaId);
        IdeaInternalFactors saved = ideaDetailService.createInternalFactors(factors);
        return ResponseEntity.ok(saved);
    }
    
    @DeleteMapping("/internal-factors/{factorsId}")
    public ResponseEntity<Void> deleteInternalFactors(@PathVariable Long factorsId) {
        ideaDetailService.deleteInternalFactors(factorsId);
        return ResponseEntity.ok().build();
    }
    
    // Investments
    @GetMapping("/{ideaId}/investments")
    public ResponseEntity<Map<String, Object>> getInvestments(@PathVariable Long ideaId) {
        Map<String, Object> investments = ideaDetailService.getInvestmentSummaryByIdeaId(ideaId);
        return ResponseEntity.ok(investments);
    }
    
    @PostMapping("/{ideaId}/investments")
    public ResponseEntity<IdeaInvestment> createInvestment(
            @PathVariable Long ideaId, 
            @RequestBody IdeaInvestment investment) {
        investment.setIdea(new Idea());
        investment.getIdea().setId(ideaId);
        IdeaInvestment saved = ideaDetailService.createInvestment(investment);
        return ResponseEntity.ok(saved);
    }
    
    @DeleteMapping("/investments/{investmentId}")
    public ResponseEntity<Void> deleteInvestment(@PathVariable Long investmentId) {
        ideaDetailService.deleteInvestment(investmentId);
        return ResponseEntity.ok().build();
    }
    
    // Schemes
    @GetMapping("/{ideaId}/schemes")
    public ResponseEntity<List<IdeaScheme>> getSchemes(@PathVariable Long ideaId) {
        List<IdeaScheme> schemes = ideaDetailService.getSchemesByIdeaId(ideaId);
        return ResponseEntity.ok(schemes);
    }
    
    @GetMapping("/{ideaId}/schemes/{schemeType}")
    public ResponseEntity<List<IdeaScheme>> getSchemesByType(
            @PathVariable Long ideaId, 
            @PathVariable String schemeType) {
        List<IdeaScheme> schemes = ideaDetailService.getSchemesByIdeaIdAndType(ideaId, schemeType);
        return ResponseEntity.ok(schemes);
    }
    
    @PostMapping("/{ideaId}/schemes")
    public ResponseEntity<IdeaScheme> createScheme(
            @PathVariable Long ideaId, 
            @RequestBody IdeaScheme scheme) {
        scheme.setIdea(new Idea());
        scheme.getIdea().setId(ideaId);
        IdeaScheme saved = ideaDetailService.createScheme(scheme);
        return ResponseEntity.ok(saved);
    }
    
    @DeleteMapping("/schemes/{schemeId}")
    public ResponseEntity<Void> deleteScheme(@PathVariable Long schemeId) {
        ideaDetailService.deleteScheme(schemeId);
        return ResponseEntity.ok().build();
    }
    
    // Bank Loans
    @GetMapping("/{ideaId}/bank-loans")
    public ResponseEntity<List<IdeaBankLoan>> getBankLoans(@PathVariable Long ideaId) {
        List<IdeaBankLoan> bankLoans = ideaDetailService.getBankLoansByIdeaId(ideaId);
        return ResponseEntity.ok(bankLoans);
    }
    
    @GetMapping("/{ideaId}/bank-loans/{loanType}")
    public ResponseEntity<List<IdeaBankLoan>> getBankLoansByType(
            @PathVariable Long ideaId, 
            @PathVariable String loanType) {
        List<IdeaBankLoan> bankLoans = ideaDetailService.getBankLoansByIdeaIdAndType(ideaId, loanType);
        return ResponseEntity.ok(bankLoans);
    }
    
    @PostMapping("/{ideaId}/bank-loans")
    public ResponseEntity<IdeaBankLoan> createBankLoan(
            @PathVariable Long ideaId, 
            @RequestBody IdeaBankLoan bankLoan) {
        bankLoan.setIdea(new Idea());
        bankLoan.getIdea().setId(ideaId);
        IdeaBankLoan saved = ideaDetailService.createBankLoan(bankLoan);
        return ResponseEntity.ok(saved);
    }
    
    @DeleteMapping("/bank-loans/{bankLoanId}")
    public ResponseEntity<Void> deleteBankLoan(@PathVariable Long bankLoanId) {
        ideaDetailService.deleteBankLoan(bankLoanId);
        return ResponseEntity.ok().build();
    }
    
    // Reviews
    @GetMapping("/{ideaId}/reviews")
    public ResponseEntity<List<IdeaReview>> getReviews(@PathVariable Long ideaId) {
        List<IdeaReview> reviews = reviewService.getApprovedReviewsByIdeaId(ideaId);
        return ResponseEntity.ok(reviews);
    }
    
    @GetMapping("/{ideaId}/rating-summary")
    public ResponseEntity<Map<String, Object>> getRatingSummary(@PathVariable Long ideaId) {
        Map<String, Object> summary = reviewService.getRatingSummaryByIdeaId(ideaId);
        return ResponseEntity.ok(summary);
    }
    
    @PostMapping("/{ideaId}/reviews")
    public ResponseEntity<IdeaReview> createReview(
            @PathVariable Long ideaId, 
            @RequestBody IdeaReview review) {
        review.setIdea(new Idea());
        review.getIdea().setId(ideaId);
        IdeaReview saved = reviewService.createReview(review);
        return ResponseEntity.ok(saved);
    }
    
    @PostMapping("/reviews/{reviewId}/vote")
    public ResponseEntity<IdeaReview> voteReview(
            @PathVariable Long reviewId, 
            @RequestParam boolean isHelpful) {
        IdeaReview updated = reviewService.updateReviewVotes(reviewId, isHelpful);
        return ResponseEntity.ok(updated);
    }
    
    // Admin endpoints for review management
    @GetMapping("/admin/reviews/pending")
    public ResponseEntity<List<IdeaReview>> getPendingReviews() {
        List<IdeaReview> reviews = reviewService.getPendingReviews();
        return ResponseEntity.ok(reviews);
    }
    
    @PostMapping("/admin/reviews/{reviewId}/approve")
    public ResponseEntity<IdeaReview> approveReview(@PathVariable Long reviewId) {
        IdeaReview approved = reviewService.approveReview(reviewId);
        return ResponseEntity.ok(approved);
    }
    
    @DeleteMapping("/admin/reviews/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.ok().build();
    }
} 