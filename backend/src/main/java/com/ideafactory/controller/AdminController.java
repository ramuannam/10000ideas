package com.ideafactory.controller;

import com.ideafactory.model.Idea;
import com.ideafactory.service.BulkUploadService;
import com.ideafactory.service.IdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.math.BigDecimal;
import com.ideafactory.repository.IdeaRepository;
import com.ideafactory.service.CategoryService;
import com.ideafactory.service.UploadHistoryService;
import com.ideafactory.model.UploadHistory;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
// @PreAuthorize("hasRole('ADMIN')") // Temporarily removed for debugging
public class AdminController {
    
    @Autowired
    private BulkUploadService bulkUploadService;
    
    @Autowired
    private IdeaService ideaService;
    
    @Autowired
    private IdeaRepository ideaRepository;
    
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UploadHistoryService uploadHistoryService;
    
    @PostMapping("/upload-ideas")
    // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UploadResponse> uploadIdeas(@RequestParam("file") MultipartFile file) {
        try {
            // Create upload history record first
            UploadHistory uploadHistory = uploadHistoryService.createUploadRecord(
                file.getOriginalFilename(),
                0, // Will update after processing
                "admin", // TODO: Get from authentication context
                file.getSize(),
                file.getContentType()
            );
            
            List<Idea> processedIdeas = bulkUploadService.processFile(file, uploadHistory.getBatchId());
            List<Idea> savedIdeas = bulkUploadService.saveIdeas(processedIdeas);
            
            // Update the ideas count in upload history
            uploadHistory.setIdeasCount(savedIdeas.size());
            uploadHistoryService.updateUploadRecord(uploadHistory);
            
            return ResponseEntity.ok(new UploadResponse(
                true,
                "Ideas uploaded successfully", 
                savedIdeas.size(),
                savedIdeas.size(),
                null // Don't return the full list to avoid serialization issues
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new UploadResponse(
                false,
                "Failed to upload ideas: " + e.getMessage(),
                0,
                0,
                null
            ));
        }
    }
    
    @GetMapping("/ideas")
    public ResponseEntity<Page<Idea>> getAllIdeas(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String sector,
            @RequestParam(required = false) String difficultyLevel,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) BigDecimal maxInvestment,
            @RequestParam(required = false) String targetAudience,
            @RequestParam(required = false) String specialAdvantage) {
        
        try {
            Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                       Sort.by(sortBy).descending() : 
                       Sort.by(sortBy).ascending();
            
            Pageable pageable = PageRequest.of(page, size, sort);
            
            Page<Idea> ideas = ideaService.getAllIdeasPaginated(pageable, search, category, sector, 
                                                              difficultyLevel, location, maxInvestment, 
                                                              targetAudience, specialAdvantage);
            
            // Debug: Log the active status of returned ideas
            System.out.println("=== ADMIN IDEAS DEBUG ===");
            ideas.getContent().forEach(idea -> {
                System.out.println("Idea ID: " + idea.getId() + 
                                 ", Title: " + idea.getTitle() + 
                                 ", Active: " + idea.isActive());
            });
            System.out.println("=== END DEBUG ===");
            
            return ResponseEntity.ok(ideas);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/filter-options")
    public ResponseEntity<Map<String, Object>> getFilterOptions() {
        try {
            Map<String, Object> filterOptions = new HashMap<>();
            
            // Get dynamic category data from database
            filterOptions.put("mainCategories", categoryService.getAllMainCategories());
            filterOptions.put("categoryHierarchy", categoryService.getCategoryHierarchy());
            
            // Get other filter data from existing repositories
            filterOptions.put("difficultyLevels", ideaRepository.findAllDifficultyLevels());
            filterOptions.put("locations", ideaRepository.findAllLocations());
            filterOptions.put("targetAudiences", ideaRepository.findAllTargetAudiences());
            filterOptions.put("specialAdvantages", ideaRepository.findAllSpecialAdvantages());
            
            return ResponseEntity.ok(filterOptions);
        } catch (Exception e) {
            e.printStackTrace(); // For debugging
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Admin endpoint is working!");
    }
    
    @GetMapping("/test-categories") 
    public ResponseEntity<Map<String, Object>> testCategories() {
        try {
            Map<String, Object> result = new HashMap<>();
            result.put("mainCategories", categoryService.getAllMainCategories());
            result.put("categoryCount", categoryService.getAllMainCategories().size());
            result.put("hierarchy", categoryService.getCategoryHierarchy());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }
    
    @GetMapping("/ideas/{id}")
    public ResponseEntity<Idea> getIdeaById(@PathVariable Long id) {
        Optional<Idea> idea = ideaService.getIdeaById(id);
        return idea.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/ideas/{id}")
    public ResponseEntity<Idea> updateIdea(@PathVariable Long id, @RequestBody Idea ideaDetails) {
        try {
            Optional<Idea> existingIdea = ideaService.getIdeaById(id);
            if (existingIdea.isPresent()) {
                Idea idea = existingIdea.get();
                
                // Update fields
                idea.setTitle(ideaDetails.getTitle());
                idea.setDescription(ideaDetails.getDescription());
                idea.setCategory(ideaDetails.getCategory());
                idea.setSector(ideaDetails.getSector());
                idea.setInvestmentNeeded(ideaDetails.getInvestmentNeeded());
                idea.setExpertiseNeeded(ideaDetails.getExpertiseNeeded());
                idea.setTrainingNeeded(ideaDetails.getTrainingNeeded());
                idea.setResources(ideaDetails.getResources());
                idea.setSuccessExamples(ideaDetails.getSuccessExamples());
                idea.setVideoUrl(ideaDetails.getVideoUrl());
                idea.setGovernmentSubsidies(ideaDetails.getGovernmentSubsidies());
                idea.setFundingOptions(ideaDetails.getFundingOptions());
                idea.setBankAssistance(ideaDetails.getBankAssistance());
                idea.setTargetAudience(ideaDetails.getTargetAudience());
                idea.setSpecialAdvantages(ideaDetails.getSpecialAdvantages());
                idea.setDifficultyLevel(ideaDetails.getDifficultyLevel());
                idea.setTimeToMarket(ideaDetails.getTimeToMarket());
                idea.setLocation(ideaDetails.getLocation());
                idea.setImageUrl(ideaDetails.getImageUrl());
                idea.setActive(ideaDetails.isActive());
                
                Idea updatedIdea = ideaService.saveIdea(idea);
                return ResponseEntity.ok(updatedIdea);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/ideas/{id}")
    public ResponseEntity<?> deleteIdea(@PathVariable Long id) {
        try {
            Optional<Idea> idea = ideaService.getIdeaById(id);
            if (idea.isPresent()) {
                ideaService.deleteIdea(id);
                return ResponseEntity.ok(new ApiResponse(true, "Idea deleted successfully"));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, "Failed to delete idea: " + e.getMessage()));
        }
    }
    
    @PutMapping("/ideas/{id}/toggle-status")
    public ResponseEntity<Idea> toggleIdeaStatus(@PathVariable Long id) {
        try {
            Optional<Idea> existingIdea = ideaService.getIdeaById(id);
            if (existingIdea.isPresent()) {
                Idea idea = existingIdea.get();
                idea.setActive(!idea.isActive());
                Idea updatedIdea = ideaService.saveIdea(idea);
                return ResponseEntity.ok(updatedIdea);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/dashboard/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        try {
            Map<String, Object> stats = new HashMap<>();
            
            stats.put("totalIdeas", ideaService.getTotalIdeasCount());
            stats.put("activeIdeas", ideaService.getActiveIdeasCount());
            stats.put("totalCategories", ideaService.getAllCategories().size());
            stats.put("totalSectors", ideaService.getAllSectors().size());
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Upload History Management Endpoints
    
    @GetMapping("/upload-history")
    public ResponseEntity<List<UploadHistory>> getUploadHistory() {
        try {
            List<UploadHistory> uploadHistory = uploadHistoryService.getAllUploadHistory();
            return ResponseEntity.ok(uploadHistory);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @DeleteMapping("/upload-history/{batchId}")
    public ResponseEntity<Map<String, Object>> deleteUploadBatch(@PathVariable String batchId) {
        try {
            UploadHistory uploadHistory = uploadHistoryService.getUploadByBatchId(batchId);
            if (uploadHistory == null) {
                return ResponseEntity.notFound().build();
            }
            
            long ideasCount = ideaRepository.countByUploadBatchId(batchId);
            boolean deleted = uploadHistoryService.deleteUploadBatch(batchId);
            
            if (deleted) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Upload batch deleted successfully");
                response.put("deletedIdeasCount", ideasCount);
                response.put("filename", uploadHistory.getFilename());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.internalServerError().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to delete upload batch: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
    
    @GetMapping("/upload-history/stats")
    public ResponseEntity<Map<String, Object>> getUploadHistoryStats() {
        try {
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalUploads", uploadHistoryService.getTotalUploads());
            stats.put("totalIdeasUploaded", uploadHistoryService.getTotalIdeasUploaded());
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    // Response DTOs
    public static class UploadResponse {
        private boolean success;
        private String message;
        private int totalProcessed;
        private int successfulSaves;
        private Object data;
        
        public UploadResponse(boolean success, String message, int totalProcessed, int successfulSaves, Object data) {
            this.success = success;
            this.message = message;
            this.totalProcessed = totalProcessed;
            this.successfulSaves = successfulSaves;
            this.data = data;
        }
        
        // Getters
        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public int getTotalProcessed() { return totalProcessed; }
        public int getSuccessfulSaves() { return successfulSaves; }
        public Object getData() { return data; }
    }
    
    public static class ApiResponse {
        private boolean success;
        private String message;
        
        public ApiResponse(boolean success, String message) {
            this.success = success;
            this.message = message;
        }
        
        // Getters and Setters
        public boolean isSuccess() {
            return success;
        }
        
        public void setSuccess(boolean success) {
            this.success = success;
        }
        
        public String getMessage() {
            return message;
        }
        
        public void setMessage(String message) {
            this.message = message;
        }
    }
} 