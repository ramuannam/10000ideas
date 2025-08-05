package com.ideafactory.repository;

import com.ideafactory.model.IdeaInvestment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface IdeaInvestmentRepository extends JpaRepository<IdeaInvestment, Long> {
    
    List<IdeaInvestment> findByIdeaIdOrderByAmountDesc(Long ideaId);
    
    @Query("SELECT SUM(i.amount) FROM IdeaInvestment i WHERE i.idea.id = :ideaId")
    BigDecimal getTotalInvestmentByIdeaId(@Param("ideaId") Long ideaId);
    
    List<IdeaInvestment> findByIdeaIdAndPriorityLevel(Long ideaId, String priorityLevel);
    
    List<IdeaInvestment> findByIdeaIdAndIsOptionalFalse(Long ideaId);
} 