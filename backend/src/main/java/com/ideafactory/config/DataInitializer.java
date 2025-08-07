package com.ideafactory.config;

import com.ideafactory.model.Idea;
import com.ideafactory.model.Category;
import com.ideafactory.model.User;
import com.ideafactory.model.Admin;
import com.ideafactory.repository.IdeaRepository;
import com.ideafactory.repository.UserRepository;
import com.ideafactory.repository.CategoryRepository;
import com.ideafactory.repository.AdminRepository;

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
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DataInitializer(
            IdeaRepository ideaRepository,
            UserRepository userRepository,
            CategoryRepository categoryRepository,
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder) {
        this.ideaRepository = ideaRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            // Initialize categories
            initializeCategories();
            
            // Initialize sample ideas
            initializeSampleIdeas();
            
            // Initialize default users
            initializeDefaultUsers();
            
            // Initialize default admin
            initializeDefaultAdmin();
        } catch (Exception e) {
            System.err.println("Error during data initialization: " + e.getMessage());
        }
    }

    private void initializeCategories() {
        if (categoryRepository.count() == 0) {
            List<Category> categories = Arrays.asList(
                new Category("Manufacturing", "Textiles"),
                new Category("Manufacturing", "Food Processing"),
                new Category("Services", "IT & Software"),
                new Category("Services", "Healthcare"),
                new Category("Retail", "E-commerce"),
                new Category("Agriculture", "Organic Farming")
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
                    "Food",
                    new java.math.BigDecimal("500000")
                ),
                new Idea(
                    "Digital Marketing Agency",
                    "Provide comprehensive digital marketing services including SEO, social media management.",
                    "Services",
                    "Technology",
                    new java.math.BigDecimal("200000")
                )
            );
            
            ideaRepository.saveAll(ideas);
            System.out.println("Sample ideas initialized in database");
        }
    }

    private void initializeDefaultUsers() {
        if (userRepository.count() == 0) {
            // Create regular user
            User regularUser = new User();
            regularUser.setUsername("user");
            regularUser.setEmail("user@10000ideas.com");
            regularUser.setBio("Regular User");
            regularUser.setPasswordHash(passwordEncoder.encode("user123"));
            regularUser.setPasswordSalt("user_salt");
            regularUser.setRole(User.UserRole.USER);
            regularUser.setActive(true);
            regularUser.setEmailVerified(true);
            regularUser.setCreatedAt(LocalDateTime.now());
            regularUser.setUpdatedAt(LocalDateTime.now());
            
            userRepository.save(regularUser);
            
            System.out.println("===========================================");
            System.out.println("DEFAULT REGULAR USER CREATED:");
            System.out.println("Username: user");
            System.out.println("Password: user123");
            System.out.println("Email: user@10000ideas.com");
            System.out.println("===========================================");
        }
    }

    private void initializeDefaultAdmin() {
        if (adminRepository.count() == 0) {
            // Create admin user
            Admin admin = new Admin();
            admin.setUsername("admin");
            admin.setEmail("admin@10000ideas.com");
            admin.setFullName("System Administrator");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Admin.Role.ADMIN);
            admin.setActive(true);
            admin.setCreatedAt(LocalDateTime.now());
            
            adminRepository.save(admin);
            
            System.out.println("===========================================");
            System.out.println("DEFAULT ADMIN CREATED:");
            System.out.println("Username: admin");
            System.out.println("Password: admin123");
            System.out.println("Email: admin@10000ideas.com");
            System.out.println("===========================================");
        }
    }
} 