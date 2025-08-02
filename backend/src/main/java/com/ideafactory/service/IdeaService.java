package com.ideafactory.service;

import com.ideafactory.model.Idea;
import com.ideafactory.repository.IdeaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class IdeaService {
    
    @Autowired
    private IdeaRepository ideaRepository;
    
    public List<Idea> getAllIdeas() {
        return ideaRepository.findAllActive();
    }
    
    // Add pagination support for better performance
    public Page<Idea> getAllIdeasPaginated(Pageable pageable) {
        return ideaRepository.findAllActivePaginated(pageable);
    }
    
    public Optional<Idea> getIdeaById(Long id) {
        return ideaRepository.findById(id);
    }
    
    public List<Idea> getIdeasByCategory(String category) {
        return ideaRepository.findByCategory(category);
    }
    
    public List<Idea> getIdeasBySector(String sector) {
        return ideaRepository.findBySector(sector);
    }
    
    public List<Idea> getIdeasByDifficultyLevel(String difficultyLevel) {
        return ideaRepository.findByDifficultyLevel(difficultyLevel);
    }
    
    public List<Idea> getIdeasByLocation(String location) {
        return ideaRepository.findByLocation(location);
    }
    
    public List<Idea> getIdeasByInvestmentRange(BigDecimal minInvestment, BigDecimal maxInvestment) {
        return ideaRepository.findByInvestmentNeededBetween(minInvestment, maxInvestment);
    }
    
    public List<Idea> getIdeasByMaxInvestment(BigDecimal maxInvestment) {
        return ideaRepository.findByInvestmentNeededLessThanEqual(maxInvestment);
    }
    
    public List<Idea> getIdeasByTargetAudience(String audience) {
        return ideaRepository.findByTargetAudienceContaining(audience);
    }
    
    public List<Idea> getIdeasBySpecialAdvantage(String advantage) {
        return ideaRepository.findBySpecialAdvantagesContaining(advantage);
    }
    
    public List<Idea> getIdeasWithFilters(String category, String sector, String difficultyLevel, 
                                        String location, BigDecimal maxInvestment) {
        return ideaRepository.findWithFilters(category, sector, difficultyLevel, location, maxInvestment);
    }
    
    @Cacheable("categories")
    public List<String> getAllCategories() {
        return ideaRepository.findAllCategories();
    }
    
    @Cacheable("sectors")
    public List<String> getAllSectors() {
        return ideaRepository.findAllSectors();
    }
    
    @Cacheable("difficultyLevels")
    public List<String> getAllDifficultyLevels() {
        return ideaRepository.findAllDifficultyLevels();
    }
    
    @Cacheable("locations")
    public List<String> getAllLocations() {
        return ideaRepository.findAllLocations();
    }
    
    public Idea saveIdea(Idea idea) {
        return ideaRepository.save(idea);
    }
    
    public void deleteIdea(Long id) {
        ideaRepository.deleteById(id);
    }
    
    // Pagination method for admin panel
    public Page<Idea> getAllIdeasPaginated(Pageable pageable, String search, String category, String sector, 
                                         String difficultyLevel, String location, BigDecimal maxInvestment, 
                                         String targetAudience, String specialAdvantage) {
        
        if (search != null && !search.trim().isEmpty()) {
            // If search term provided, use search with filters
            return ideaRepository.findBySearchWithFilters(search, category, sector, difficultyLevel, 
                                                         location, maxInvestment, targetAudience, specialAdvantage, pageable);
        } else {
            // Use comprehensive filtering
            return ideaRepository.findWithAllFilters(category, sector, difficultyLevel, location, 
                                                   maxInvestment, targetAudience, specialAdvantage, pageable);
        }
    }
    
    // Count methods for dashboard statistics
    public long getTotalIdeasCount() {
        return ideaRepository.count();
    }
    
    public long getActiveIdeasCount() {
        return ideaRepository.countByActiveTrue();
    }
} 