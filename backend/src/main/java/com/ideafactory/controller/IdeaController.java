package com.ideafactory.controller;

import com.ideafactory.model.Idea;
import com.ideafactory.service.IdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${spring.web.cors.allowed-origins}")
public class IdeaController {
    
    @Autowired
    private IdeaService ideaService;
    
    @GetMapping("/ideas")
    public ResponseEntity<List<Idea>> getAllIdeas() {
        List<Idea> ideas = ideaService.getAllIdeas();
        return ResponseEntity.ok(ideas);
    }
    
    @GetMapping("/ideas/paginated")
    public ResponseEntity<Page<Idea>> getAllIdeasPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Idea> ideas = ideaService.getAllIdeasPaginated(pageable);
        return ResponseEntity.ok(ideas);
    }
    
    @GetMapping("/ideas/{id}")
    public ResponseEntity<Idea> getIdeaById(@PathVariable Long id) {
        Optional<Idea> idea = ideaService.getIdeaById(id);
        return idea.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/ideas/category/{category}")
    public ResponseEntity<List<Idea>> getIdeasByCategory(@PathVariable String category) {
        List<Idea> ideas = ideaService.getIdeasByCategory(category);
        return ResponseEntity.ok(ideas);
    }
    
    @GetMapping("/ideas/sector/{sector}")
    public ResponseEntity<List<Idea>> getIdeasBySector(@PathVariable String sector) {
        List<Idea> ideas = ideaService.getIdeasBySector(sector);
        return ResponseEntity.ok(ideas);
    }
    
    @GetMapping("/ideas/difficulty/{difficultyLevel}")
    public ResponseEntity<List<Idea>> getIdeasByDifficultyLevel(@PathVariable String difficultyLevel) {
        List<Idea> ideas = ideaService.getIdeasByDifficultyLevel(difficultyLevel);
        return ResponseEntity.ok(ideas);
    }
    
    @GetMapping("/ideas/location/{location}")
    public ResponseEntity<List<Idea>> getIdeasByLocation(@PathVariable String location) {
        List<Idea> ideas = ideaService.getIdeasByLocation(location);
        return ResponseEntity.ok(ideas);
    }
    
    @GetMapping("/ideas/investment")
    public ResponseEntity<List<Idea>> getIdeasByInvestmentRange(
            @RequestParam(required = false) BigDecimal minInvestment,
            @RequestParam(required = false) BigDecimal maxInvestment) {
        List<Idea> ideas;
        if (minInvestment != null && maxInvestment != null) {
            ideas = ideaService.getIdeasByInvestmentRange(minInvestment, maxInvestment);
        } else if (maxInvestment != null) {
            ideas = ideaService.getIdeasByMaxInvestment(maxInvestment);
        } else {
            ideas = ideaService.getAllIdeas();
        }
        return ResponseEntity.ok(ideas);
    }
    
    @GetMapping("/ideas/audience/{audience}")
    public ResponseEntity<List<Idea>> getIdeasByTargetAudience(@PathVariable String audience) {
        List<Idea> ideas = ideaService.getIdeasByTargetAudience(audience);
        return ResponseEntity.ok(ideas);
    }
    
    @GetMapping("/ideas/advantage/{advantage}")
    public ResponseEntity<List<Idea>> getIdeasBySpecialAdvantage(@PathVariable String advantage) {
        List<Idea> ideas = ideaService.getIdeasBySpecialAdvantage(advantage);
        return ResponseEntity.ok(ideas);
    }
    
    @GetMapping("/ideas/filter")
    public ResponseEntity<List<Idea>> getIdeasWithFilters(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String sector,
            @RequestParam(required = false) String difficultyLevel,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) BigDecimal maxInvestment) {
        List<Idea> ideas = ideaService.getIdeasWithFilters(category, sector, difficultyLevel, location, maxInvestment);
        return ResponseEntity.ok(ideas);
    }
    
    @GetMapping("/ideas/performance")
    public ResponseEntity<Object> getPerformanceInfo() {
        long startTime = System.currentTimeMillis();
        List<Idea> ideas = ideaService.getAllIdeas();
        long endTime = System.currentTimeMillis();
        
        return ResponseEntity.ok(Map.of(
            "totalIdeas", ideas.size(),
            "queryTimeMs", endTime - startTime,
            "timestamp", System.currentTimeMillis()
        ));
    }
    
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = ideaService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
    
    @GetMapping("/sectors")
    public ResponseEntity<List<String>> getAllSectors() {
        List<String> sectors = ideaService.getAllSectors();
        return ResponseEntity.ok(sectors);
    }
    
    @GetMapping("/difficulty-levels")
    public ResponseEntity<List<String>> getAllDifficultyLevels() {
        List<String> difficultyLevels = ideaService.getAllDifficultyLevels();
        return ResponseEntity.ok(difficultyLevels);
    }
    
    @GetMapping("/locations")
    public ResponseEntity<List<String>> getAllLocations() {
        List<String> locations = ideaService.getAllLocations();
        return ResponseEntity.ok(locations);
    }
    
    @PostMapping("/ideas")
    public ResponseEntity<Idea> createIdea(@RequestBody Idea idea) {
        Idea savedIdea = ideaService.saveIdea(idea);
        return ResponseEntity.ok(savedIdea);
    }
    
    @PutMapping("/ideas/{id}")
    public ResponseEntity<Idea> updateIdea(@PathVariable Long id, @RequestBody Idea idea) {
        Optional<Idea> existingIdea = ideaService.getIdeaById(id);
        if (existingIdea.isPresent()) {
            idea.setId(id);
            Idea updatedIdea = ideaService.saveIdea(idea);
            return ResponseEntity.ok(updatedIdea);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/ideas/{id}")
    public ResponseEntity<Void> deleteIdea(@PathVariable Long id) {
        Optional<Idea> idea = ideaService.getIdeaById(id);
        if (idea.isPresent()) {
            ideaService.deleteIdea(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
} 