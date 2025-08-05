package com.ideafactory.repository;

import com.ideafactory.model.IdeaBankLoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdeaBankLoanRepository extends JpaRepository<IdeaBankLoan, Long> {
    
    List<IdeaBankLoan> findByIdeaIdAndIsActiveTrue(Long ideaId);
    
    List<IdeaBankLoan> findByIdeaIdAndLoanType(Long ideaId, String loanType);
    
    List<IdeaBankLoan> findByIdeaIdAndBankName(Long ideaId, String bankName);
} 