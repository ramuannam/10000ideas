package com.ideafactory.config;

import com.ideafactory.model.Idea;
import com.ideafactory.model.Category;
import com.ideafactory.model.User;
import com.ideafactory.repository.IdeaRepository;
import com.ideafactory.repository.UserRepository;
import com.ideafactory.repository.CategoryRepository;
import com.ideafactory.model.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final IdeaRepository ideaRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DataInitializer(
            IdeaRepository ideaRepository,
            UserRepository userRepository,
            CategoryRepository categoryRepository,
            PasswordEncoder passwordEncoder) {
        this.ideaRepository = ideaRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            // Initialize categories
            initializeCategories();
            
            // Initialize sample ideas
            initializeSampleIdeas();
            
            // Initialize default admin user
            initializeDefaultAdmin();
        } catch (Exception e) {
            System.err.println("Error during data initialization: " + e.getMessage());
        }
    }

    private void initializeCategories() {
        if (categoryRepository.count() == 0) {
            List<Category> categories = Arrays.asList(
                new Category("Manufacturing", "Textiles", true),
                new Category("Manufacturing", "Food Processing", true),
                new Category("Services", "IT & Software", true),
                new Category("Services", "Healthcare", true),
                new Category("Retail", "E-commerce", true),
                new Category("Agriculture", "Organic Farming", true)
            );
            
            categoryRepository.saveAll(categories);
            System.out.println("Categories initialized in database");
        }
    }

    private void initializeSampleIdeas() {
        if (ideaRepository.count() == 0) {
            List<Idea> ideas = Arrays.asList(
                new Idea(
                    "Organic Food Delivery Service",
                    "Start a home delivery service for organic fruits, vegetables, and dairy products.",
                    "Services",
                    "Medium",
                    "₹5,00,000 - ₹10,00,000",
                    "Urban areas",
                    "Basic knowledge of organic farming",
                    "6-12 months",
                    "Delivery vehicles, storage facilities",
                    "Yes, through government schemes",
                    "Bank loans, self-funding",
                    "Local farmers",
                    "Whole Foods Market",
                    "High demand for organic products",
                    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
                    "https://example.com/video1.mp4",
                    true
                ),
                new Idea(
                    "Digital Marketing Agency",
                    "Provide comprehensive digital marketing services including SEO, social media management.",
                    "Services",
                    "Low",
                    "₹2,00,000 - ₹5,00,000",
                    "Any location with internet access",
                    "Digital marketing skills",
                    "3-6 months",
                    "Computer, software licenses",
                    "Yes, through MSME schemes",
                    "Self-funding, bank loans",
                    "Marketing tools",
                    "Neil Patel Digital",
                    "Growing demand for digital presence",
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
                    "https://example.com/video2.mp4",
                    true
                )
            );
            
            ideaRepository.saveAll(ideas);
            System.out.println("Sample ideas initialized in database");
        }
    }

    private void initializeDefaultAdmin() {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@10000ideas.com");
            admin.setFullName("System Administrator");
            admin.setPasswordHash(passwordEncoder.encode("admin123"));
            admin.setRole(UserRole.ADMIN);
            admin.setActive(true);
            admin.setEmailVerified(true);
            admin.setCreatedAt(LocalDateTime.now());
            admin.setUpdatedAt(LocalDateTime.now());
            
            userRepository.save(admin);
            
            System.out.println("===========================================");
            System.out.println("DEFAULT ADMIN CREATED:");
            System.out.println("Username: admin");
            System.out.println("Password: admin123");
            System.out.println("Email: admin@10000ideas.com");
            System.out.println("===========================================");
        }
    }
} 