package com.ideafactory.repository;

import com.ideafactory.model.Idea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface IdeaRepository extends JpaRepository<Idea, Long> {
    
    List<Idea> findByCategory(String category);
    
    List<Idea> findBySector(String sector);
    
    List<Idea> findByDifficultyLevel(String difficultyLevel);
    
    List<Idea> findByLocation(String location);
    
    List<Idea> findByInvestmentNeededLessThanEqual(BigDecimal maxInvestment);
    
    List<Idea> findByInvestmentNeededBetween(BigDecimal minInvestment, BigDecimal maxInvestment);
    
    @Query("SELECT DISTINCT i.category FROM Idea i")
    List<String> findAllCategories();
    
    @Query("SELECT DISTINCT i.sector FROM Idea i")
    List<String> findAllSectors();
    
    @Query("SELECT DISTINCT i.difficultyLevel FROM Idea i")
    List<String> findAllDifficultyLevels();
    
    @Query("SELECT DISTINCT i.location FROM Idea i")
    List<String> findAllLocations();
    
    @Query("SELECT i FROM Idea i WHERE i.targetAudience LIKE %:audience%")
    List<Idea> findByTargetAudienceContaining(@Param("audience") String audience);
    
    @Query("SELECT i FROM Idea i WHERE i.specialAdvantages LIKE %:advantage%")
    List<Idea> findBySpecialAdvantagesContaining(@Param("advantage") String advantage);
    
    @Query("SELECT i FROM Idea i WHERE i.isActive = true")
    List<Idea> findAllActive();
    
    @Query("SELECT i FROM Idea i WHERE " +
           "(:category IS NULL OR i.category = :category) AND " +
           "(:sector IS NULL OR i.sector = :sector) AND " +
           "(:difficultyLevel IS NULL OR i.difficultyLevel = :difficultyLevel) AND " +
           "(:location IS NULL OR i.location = :location) AND " +
           "(:maxInvestment IS NULL OR i.investmentNeeded <= :maxInvestment) AND " +
           "i.isActive = true")
    List<Idea> findWithFilters(
            @Param("category") String category,
            @Param("sector") String sector,
            @Param("difficultyLevel") String difficultyLevel,
            @Param("location") String location,
            @Param("maxInvestment") BigDecimal maxInvestment
    );
} 