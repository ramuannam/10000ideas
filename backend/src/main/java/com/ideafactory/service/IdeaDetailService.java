package com.ideafactory.service;

import com.ideafactory.model.*;
import com.ideafactory.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class IdeaDetailService {
    
    @Autowired
    private IdeaInternalFactorsRepository internalFactorsRepository;
    
    @Autowired
    private IdeaInvestmentRepository investmentRepository;
    
    @Autowired
    private IdeaSchemeRepository schemeRepository;
    
    @Autowired
    private IdeaBankLoanRepository bankLoanRepository;
    
    @Autowired
    private IdeaReviewService reviewService;
    
    // Internal Factors Methods
    public List<IdeaInternalFactors> getInternalFactorsByIdeaId(Long ideaId) {
        return internalFactorsRepository.findByIdeaId(ideaId);
    }
    
    public IdeaInternalFactors createInternalFactors(IdeaInternalFactors factors) {
        return internalFactorsRepository.save(factors);
    }
    
    public void deleteInternalFactors(Long factorsId) {
        internalFactorsRepository.deleteById(factorsId);
    }
    
    // Investment Methods
    public List<IdeaInvestment> getInvestmentsByIdeaId(Long ideaId) {
        return investmentRepository.findByIdeaIdOrderByAmountDesc(ideaId);
    }
    
    public Map<String, Object> getInvestmentSummaryByIdeaId(Long ideaId) {
        List<IdeaInvestment> investments = getInvestmentsByIdeaId(ideaId);
        java.math.BigDecimal totalInvestment = investmentRepository.getTotalInvestmentByIdeaId(ideaId);
        
        Map<String, Object> summary = new HashMap<>();
        summary.put("investments", investments);
        summary.put("totalInvestment", totalInvestment != null ? totalInvestment : java.math.BigDecimal.ZERO);
        summary.put("investmentCount", investments.size());
        
        return summary;
    }
    
    public IdeaInvestment createInvestment(IdeaInvestment investment) {
        return investmentRepository.save(investment);
    }
    
    public void deleteInvestment(Long investmentId) {
        investmentRepository.deleteById(investmentId);
    }
    
    // Scheme Methods
    public List<IdeaScheme> getSchemesByIdeaId(Long ideaId) {
        return schemeRepository.findByIdeaIdAndIsActiveTrue(ideaId);
    }
    
    public List<IdeaScheme> getSchemesByIdeaIdAndType(Long ideaId, String schemeType) {
        return schemeRepository.findByIdeaIdAndSchemeType(ideaId, schemeType);
    }
    
    public List<IdeaScheme> getSchemesByIdeaIdAndRegion(Long ideaId, String regionState) {
        return schemeRepository.findByIdeaIdAndRegionState(ideaId, regionState);
    }
    
    public IdeaScheme createScheme(IdeaScheme scheme) {
        return schemeRepository.save(scheme);
    }
    
    public void deleteScheme(Long schemeId) {
        schemeRepository.deleteById(schemeId);
    }
    
    // Bank Loan Methods
    public List<IdeaBankLoan> getBankLoansByIdeaId(Long ideaId) {
        return bankLoanRepository.findByIdeaIdAndIsActiveTrue(ideaId);
    }
    
    public List<IdeaBankLoan> getBankLoansByIdeaIdAndType(Long ideaId, String loanType) {
        return bankLoanRepository.findByIdeaIdAndLoanType(ideaId, loanType);
    }
    
    public IdeaBankLoan createBankLoan(IdeaBankLoan bankLoan) {
        return bankLoanRepository.save(bankLoan);
    }
    
    public void deleteBankLoan(Long bankLoanId) {
        bankLoanRepository.deleteById(bankLoanId);
    }
    
    // Comprehensive Idea Detail
    public Map<String, Object> getCompleteIdeaDetails(Long ideaId) {
        Map<String, Object> details = new HashMap<>();
        
        // Internal Factors
        details.put("internalFactors", getInternalFactorsByIdeaId(ideaId));
        
        // Investments
        details.put("investments", getInvestmentSummaryByIdeaId(ideaId));
        
        // Schemes
        details.put("schemes", getSchemesByIdeaId(ideaId));
        
        // Bank Loans
        details.put("bankLoans", getBankLoansByIdeaId(ideaId));
        
        // Reviews and Ratings
        details.put("ratingSummary", reviewService.getRatingSummaryByIdeaId(ideaId));
        details.put("reviews", reviewService.getApprovedReviewsByIdeaId(ideaId));
        
        return details;
    }
} 