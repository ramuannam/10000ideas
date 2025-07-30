package com.ideafactory.controller;

import com.ideafactory.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;
    
    @GetMapping("/main-categories")
    public ResponseEntity<List<String>> getAllMainCategories() {
        try {
            List<String> mainCategories = categoryService.getAllMainCategories();
            return ResponseEntity.ok(mainCategories);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/sub-categories")
    public ResponseEntity<List<String>> getSubCategories(@RequestParam String mainCategory) {
        try {
            List<String> subCategories = categoryService.getSubCategoriesByMainCategory(mainCategory);
            return ResponseEntity.ok(subCategories);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/category-hierarchy")
    public ResponseEntity<Map<String, List<String>>> getCategoryHierarchy() {
        try {
            Map<String, List<String>> hierarchy = categoryService.getCategoryHierarchy();
            return ResponseEntity.ok(hierarchy);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
} 