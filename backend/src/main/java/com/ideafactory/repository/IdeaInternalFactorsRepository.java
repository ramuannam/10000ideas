package com.ideafactory.repository;

import com.ideafactory.model.IdeaInternalFactors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdeaInternalFactorsRepository extends JpaRepository<IdeaInternalFactors, Long> {
    
    List<IdeaInternalFactors> findByIdeaId(Long ideaId);
    
    List<IdeaInternalFactors> findByIdeaIdAndFactorType(Long ideaId, String factorType);
} 