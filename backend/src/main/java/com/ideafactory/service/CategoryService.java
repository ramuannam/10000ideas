package com.ideafactory.service;

import com.ideafactory.model.Category;
import com.ideafactory.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    public List<String> getAllMainCategories() {
        return categoryRepository.findAllMainCategories();
    }
    
    public List<String> getSubCategoriesByMainCategory(String mainCategory) {
        return categoryRepository.findSubCategoriesByMainCategory(mainCategory);
    }
    
    public Map<String, List<String>> getCategoryHierarchy() {
        List<String> mainCategories = getAllMainCategories();
        Map<String, List<String>> hierarchy = new HashMap<>();
        
        for (String mainCategory : mainCategories) {
            List<String> subCategories = getSubCategoriesByMainCategory(mainCategory);
            hierarchy.put(mainCategory, subCategories);
        }
        
        return hierarchy;
    }
    
    public List<Category> getAllCategories() { 
        return categoryRepository.findByActiveTrueOrderByMainCategoryAscSubCategoryAsc(); 
    }
    
    public boolean isValidCategoryCombination(String mainCategory, String subCategory) { 
        return categoryRepository.existsByMainCategoryAndSubCategoryAndActiveTrue(mainCategory, subCategory); 
    }
    
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }
} 