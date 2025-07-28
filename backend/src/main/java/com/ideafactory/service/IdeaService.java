package com.ideafactory.service;

import com.ideafactory.model.Idea;
import com.ideafactory.repository.IdeaRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    
    public List<String> getAllCategories() {
        return ideaRepository.findAllCategories();
    }
    
    public List<String> getAllSectors() {
        return ideaRepository.findAllSectors();
    }
    
    public List<String> getAllDifficultyLevels() {
        return ideaRepository.findAllDifficultyLevels();
    }
    
    public List<String> getAllLocations() {
        return ideaRepository.findAllLocations();
    }
    
    public Idea saveIdea(Idea idea) {
        return ideaRepository.save(idea);
    }
    
    public void deleteIdea(Long id) {
        ideaRepository.deleteById(id);
    }
} 