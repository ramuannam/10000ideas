package com.ideafactory.repository;

import com.ideafactory.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    // Get all distinct main categories
    @Query("SELECT DISTINCT c.mainCategory FROM Category c WHERE c.active = true ORDER BY c.mainCategory")
    List<String> findAllMainCategories();
    
    // Get subcategories for a specific main category
    @Query("SELECT c.subCategory FROM Category c WHERE c.mainCategory = :mainCategory AND c.active = true ORDER BY c.subCategory")
    List<String> findSubCategoriesByMainCategory(@Param("mainCategory") String mainCategory);
    
    // Get all categories (for admin management)
    List<Category> findByActiveTrueOrderByMainCategoryAscSubCategoryAsc();
    
    // Check if a category combination exists
    boolean existsByMainCategoryAndSubCategoryAndActiveTrue(String mainCategory, String subCategory);
} 