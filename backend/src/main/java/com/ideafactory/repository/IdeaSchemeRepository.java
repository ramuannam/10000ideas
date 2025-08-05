package com.ideafactory.repository;

import com.ideafactory.model.IdeaScheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdeaSchemeRepository extends JpaRepository<IdeaScheme, Long> {
    
    List<IdeaScheme> findByIdeaIdAndIsActiveTrue(Long ideaId);
    
    List<IdeaScheme> findByIdeaIdAndSchemeType(Long ideaId, String schemeType);
    
    List<IdeaScheme> findByIdeaIdAndRegionState(Long ideaId, String regionState);
    
    List<IdeaScheme> findByIdeaIdAndSchemeCategory(Long ideaId, String schemeCategory);
} 