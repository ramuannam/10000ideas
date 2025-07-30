package com.ideafactory.repository;

import com.ideafactory.model.Idea;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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
    
    // Find all active ideas
    @Query("SELECT i FROM Idea i WHERE i.active = true")
    List<Idea> findAllActive();
    
    @Query("SELECT i FROM Idea i WHERE " +
           "(:category IS NULL OR i.category = :category) AND " +
           "(:sector IS NULL OR i.sector = :sector) AND " +
           "(:difficultyLevel IS NULL OR i.difficultyLevel = :difficultyLevel) AND " +
           "(:location IS NULL OR i.location = :location) AND " +
           "(:maxInvestment IS NULL OR i.investmentNeeded <= :maxInvestment) AND " +
           "i.active = true")
    List<Idea> findWithFilters(@Param("category") String category,
                              @Param("sector") String sector,
                              @Param("difficultyLevel") String difficultyLevel,
                              @Param("location") String location,
                              @Param("maxInvestment") BigDecimal maxInvestment);
    
    // Pagination methods for admin panel
    Page<Idea> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String title, String description, Pageable pageable);
    
    Page<Idea> findByCategoryAndSector(String category, String sector, Pageable pageable);
    
    Page<Idea> findByCategory(String category, Pageable pageable);
    
    Page<Idea> findBySector(String sector, Pageable pageable);
    
    // Count methods for dashboard statistics
    long countByActiveTrue();
    
    @Query("SELECT COUNT(i) FROM Idea i WHERE i.active = true")
    long countActiveIdeas();

    @Modifying
    @Query("DELETE FROM Idea i WHERE i.uploadBatchId = :batchId")
    void deleteByUploadBatchId(@Param("batchId") String batchId);

    @Query("SELECT COUNT(i) FROM Idea i WHERE i.uploadBatchId = :batchId")
    long countByUploadBatchId(@Param("batchId") String batchId);
    
    // Enhanced pagination methods for admin panel with comprehensive filtering
    @Query("SELECT i FROM Idea i WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(i.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(i.description) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:category IS NULL OR :category = '' OR i.category = :category) AND " +
           "(:sector IS NULL OR :sector = '' OR i.sector = :sector) AND " +
           "(:difficultyLevel IS NULL OR :difficultyLevel = '' OR i.difficultyLevel = :difficultyLevel) AND " +
           "(:location IS NULL OR :location = '' OR i.location = :location) AND " +
           "(:maxInvestment IS NULL OR i.investmentNeeded <= :maxInvestment) AND " +
           "(:targetAudience IS NULL OR :targetAudience = '' OR " +
           "EXISTS (SELECT ta FROM i.targetAudience ta WHERE ta = :targetAudience)) AND " +
           "(:specialAdvantage IS NULL OR :specialAdvantage = '' OR " +
           "EXISTS (SELECT sa FROM i.specialAdvantages sa WHERE sa = :specialAdvantage))")
    Page<Idea> findBySearchWithFilters(@Param("search") String search,
                                     @Param("category") String category,
                                     @Param("sector") String sector,
                                     @Param("difficultyLevel") String difficultyLevel,
                                     @Param("location") String location,
                                     @Param("maxInvestment") BigDecimal maxInvestment,
                                     @Param("targetAudience") String targetAudience,
                                     @Param("specialAdvantage") String specialAdvantage,
                                     Pageable pageable);
    
    @Query("SELECT i FROM Idea i WHERE " +
           "(:category IS NULL OR :category = '' OR i.category = :category) AND " +
           "(:sector IS NULL OR :sector = '' OR i.sector = :sector) AND " +
           "(:difficultyLevel IS NULL OR :difficultyLevel = '' OR i.difficultyLevel = :difficultyLevel) AND " +
           "(:location IS NULL OR :location = '' OR i.location = :location) AND " +
           "(:maxInvestment IS NULL OR i.investmentNeeded <= :maxInvestment) AND " +
           "(:targetAudience IS NULL OR :targetAudience = '' OR " +
           "EXISTS (SELECT ta FROM i.targetAudience ta WHERE ta = :targetAudience)) AND " +
           "(:specialAdvantage IS NULL OR :specialAdvantage = '' OR " +
           "EXISTS (SELECT sa FROM i.specialAdvantages sa WHERE sa = :specialAdvantage))")
    Page<Idea> findWithAllFilters(@Param("category") String category,
                                @Param("sector") String sector,
                                @Param("difficultyLevel") String difficultyLevel,
                                @Param("location") String location,
                                @Param("maxInvestment") BigDecimal maxInvestment,
                                @Param("targetAudience") String targetAudience,
                                @Param("specialAdvantage") String specialAdvantage,
                                Pageable pageable);
                                
    // Methods to get unique filter values for dropdowns
    @Query("SELECT DISTINCT ta FROM Idea i JOIN i.targetAudience ta ORDER BY ta")
    List<String> findAllTargetAudiences();
    
    @Query("SELECT DISTINCT sa FROM Idea i JOIN i.specialAdvantages sa ORDER BY sa")
    List<String> findAllSpecialAdvantages();
    
    // Force update all ideas to be active
    @Modifying
    @Query("UPDATE Idea SET active = true WHERE active = false OR active IS NULL")
    void updateAllIdeasToActive();
} 