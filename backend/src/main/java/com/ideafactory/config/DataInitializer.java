package com.ideafactory.config;

import com.ideafactory.model.Admin;
import com.ideafactory.model.Idea;
import com.ideafactory.model.Category;
import com.ideafactory.repository.AdminRepository;
import com.ideafactory.repository.IdeaRepository;
import com.ideafactory.repository.CategoryRepository;
import com.ideafactory.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private IdeaRepository ideaRepository;
    
    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        initializeCategories();
        
        if (ideaRepository.count() == 0) {
            initializeSampleIdeas();
        }
        
        // Ensure all existing ideas are set to active by default
        ensureAllIdeasAreActive();
        
        // Create default admin user in a separate thread with delay to avoid circular dependency
        new Thread(() -> {
            try {
                Thread.sleep(2000); // Wait for Spring context to fully initialize
                createDefaultAdminLater();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }
    
    @Transactional
    private void ensureAllIdeasAreActive() {
        // FORCE UPDATE all existing ideas to be active by default
        List<Idea> allIdeas = ideaRepository.findAll();
        int updatedCount = 0;
        
        System.out.println("🔄 Checking " + allIdeas.size() + " ideas to ensure they are ACTIVE by default...");
        
        for (Idea idea : allIdeas) {
            if (!idea.isActive()) {
                idea.setActive(true);
                ideaRepository.save(idea);
                updatedCount++;
                System.out.println("  ✅ Updated idea ID " + idea.getId() + " (" + idea.getTitle() + ") to ACTIVE");
            }
        }
        
        if (updatedCount > 0) {
            System.out.println("✅ COMPLETED: Updated " + updatedCount + " ideas to be ACTIVE by default");
        } else {
            System.out.println("✅ All " + allIdeas.size() + " ideas are already ACTIVE by default");
        }
        
        // Also run direct SQL update as backup
        try {
            // This will catch any ideas that might not be updated by the above method
            ideaRepository.updateAllIdeasToActive();
            System.out.println("✅ Database-level update completed to ensure all ideas are ACTIVE");
        } catch (Exception e) {
            System.out.println("⚠️ Database update note: " + e.getMessage());
        }
    }
    
    private void initializeCategories() {
        if (categoryRepository.count() == 0) {
            // Category hierarchy data - stored in database instead of hardcoded
            Map<String, List<String>> categoriesConfig = new HashMap<>();
            
            categoriesConfig.put("For Women", Arrays.asList(
                "Beauty", "Fashion", "Event Planning", "Eco-Friendly Products", "Home Decor",
                "Fitness", "Creative Arts", "Personal Development", "Social Impact", "Childcare",
                "Health", "Online Retail", "Education", "Coaching/Mentoring", "Others"
            ));
            
            categoriesConfig.put("Technology", Arrays.asList(
                "Software", "E-commerce", "Mobile Apps", "Cybersecurity", "Artificial Intelligence (AI)",
                "Data Analytics", "Robotics", "Blockchain", "Digital Marketing", "Edtech", "Fintech", "Saas"
            ));
            
            categoriesConfig.put("Agriculture", Arrays.asList(
                "Organic Farming", "Precision Agriculture", "Agri-Tourism", "Agri-Tech Solutions",
                "Livestock Farming", "Data Analytics", "Agricultural Consulting", "Equipment Manufacturing",
                "Agroforestry", "Agricultural Education and Training"
            ));
            
            categoriesConfig.put("Fashion", Arrays.asList(
                "Clothing & Accessories", "Ethical Fashion", "Sustainable Fashion", "Fashion Consulting",
                "Blogging", "Fashion Styling", "Event Management", "Fashion label/studio"
            ));
            
            categoriesConfig.put("Manufacturing", Arrays.asList(
                "Electronics", "Textile", "Automotive", "Food Processing", "Pharmaceutical", "Furniture",
                "Chemical", "Metal Fabrication", "Printing and Publishing", "Consumer goods",
                "Renewable energy", "Construction materials", "Jewelry", "Others"
            ));
            
            categoriesConfig.put("Food & Beverage", Arrays.asList(
                "Restaurant", "Food Truck", "Craft Brewery", "Ice cream parlour", "Catering services",
                "Gourmet Food products"
            ));
            
            categoriesConfig.put("Startup Ideas", Arrays.asList(
                "Tech Startups", "Social Impact Startups", "Green Startups", "FinTech Startups",
                "HealthTech Startups", "EdTech Startups", "E-commerce Startups", "AI/ML Startups",
                "Food Tech Startups", "Travel Tech Startups"
            ));
            
            categoriesConfig.put("Sports", Arrays.asList(
                "Fitness Training", "Sports Equipment", "Athletic Coaching", "Sports Analytics",
                "Sports Medicine", "Event Management", "Sports Marketing", "Youth Sports Programs",
                "Professional Sports Services", "Sports Nutrition"
            ));
            
            categoriesConfig.put("Entertainment & Media", Arrays.asList(
                "Content Creation", "Video Production", "Music Industry", "Gaming", "Event Planning",
                "Social Media Management", "Podcasting", "Streaming Services", "Digital Art",
                "Photography Services"
            ));
            
            categoriesConfig.put("Travel & Tourism", Arrays.asList(
                "Tour Operations", "Travel Planning", "Hospitality Services", "Adventure Tourism",
                "Cultural Tourism", "Eco-Tourism", "Travel Technology", "Accommodation Services",
                "Transportation Services", "Travel Consulting"
            ));
            
            categoriesConfig.put("Professional Services", Arrays.asList(
                "Consulting", "Legal Services", "Accounting & Finance", "Marketing Services",
                "HR Services", "Business Coaching", "Project Management", "Real Estate Services",
                "Insurance Services", "Training & Development"
            ));
            
            categoriesConfig.put("Education", Arrays.asList(
                "Online Learning", "Tutoring Services", "Educational Technology", "Language Learning",
                "Skill Development", "Professional Training", "Educational Content", "Learning Management",
                "Educational Consulting", "Special Education Services"
            ));
            
            // Save categories to database
            for (Map.Entry<String, List<String>> entry : categoriesConfig.entrySet()) {
                String mainCategory = entry.getKey();
                List<String> subCategories = entry.getValue();
                
                for (String subCategory : subCategories) {
                    Category category = new Category(mainCategory, subCategory);
                    categoryRepository.save(category);
                }
            }
            
            System.out.println("Categories initialized in database");
        }
    }
    
    private void createDefaultAdminLater() {
        // This will create admin without circular dependency issues
        new Thread(() -> {
            try {
                Thread.sleep(2000); // Wait for application to fully start
                if (adminRepository.count() == 0) {
                    Admin admin = new Admin();
                    admin.setUsername("admin");
                    admin.setEmail("admin@10000ideas.com");
                    admin.setPassword(passwordEncoder.encode("admin123"));
                    admin.setFullName("Admin User");
                    admin.setRole(Admin.Role.ADMIN);
                    admin.setActive(true);
                    
                    adminRepository.save(admin);
                    
                    System.out.println("===========================================");
                    System.out.println("DEFAULT ADMIN CREATED:");
                    System.out.println("Username: admin");
                    System.out.println("Password: admin123");
                    System.out.println("Email: admin@10000ideas.com");
                    System.out.println("===========================================");
                }
            } catch (Exception e) {
                System.err.println("Failed to create default admin: " + e.getMessage());
            }
        }).start();
    }
    
    private void initializeSampleIdeas() {
        // Sample Ideas
        List<Idea> sampleIdeas = Arrays.asList(
            createOrganicFarmingIdea(),
            createDigitalMarketingAgencyIdea(),
            createEcoFriendlyProductsIdea(),
            createRuralTechHubIdea(),
            createWomenEmpowermentIdea(),
            createSpeciallyAbledIdea(),
            createMiddleClassIdea(),
            createUnicornTechIdea(),
            createManufacturingIdea(),
            createServiceIdea()
        );
        
        ideaRepository.saveAll(sampleIdeas);
    }
    
    private Idea createOrganicFarmingIdea() {
        Idea idea = new Idea();
        idea.setTitle("Organic Vegetable Farming");
        idea.setDescription("Start an organic vegetable farming business using sustainable practices. Focus on high-demand vegetables like tomatoes, cucumbers, and leafy greens.");
        idea.setCategory("Agriculture");           // Main category from CATEGORIES_CONFIG
        idea.setSector("Organic Farming");         // Sub-category from CATEGORIES_CONFIG
        idea.setInvestmentNeeded(new BigDecimal("50000"));
        idea.setExpertiseNeeded("Basic farming knowledge, organic farming techniques");
        idea.setTrainingNeeded("Organic farming certification, soil management");
        idea.setResources("Land (1-2 acres), seeds, organic fertilizers, irrigation system");
        idea.setSuccessExamples("Many farmers in rural areas have successfully transitioned to organic farming with 40-60% higher profits");
        idea.setVideoUrl("https://youtube.com/watch?v=organic-farming-guide");
        idea.setGovernmentSubsidies("PM-KISAN scheme, organic farming subsidies up to 50%");
        idea.setFundingOptions("NABARD loans, Kisan Credit Card, cooperative bank loans");
        idea.setBankAssistance("Special agricultural loans with 7% interest rate, no collateral for small amounts");
        idea.setTargetAudience(Arrays.asList("Rural", "Lower Middle Class"));
        idea.setSpecialAdvantages(Arrays.asList("Low initial investment", "Government support", "Growing market demand"));
        idea.setDifficultyLevel("Easy");
        idea.setTimeToMarket("3-6 months");
        idea.setLocation("Rural");
        idea.setImageUrl("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400");
        idea.setActive(true);  // Ensure idea is active by default
        return idea;
    }
    
    private Idea createDigitalMarketingAgencyIdea() {
        Idea idea = new Idea();
        idea.setTitle("Digital Marketing Agency");
        idea.setDescription("Start a digital marketing agency offering services like social media management, SEO, and content creation for small businesses.");
        idea.setCategory("Technology");            // Main category from CATEGORIES_CONFIG  
        idea.setSector("Digital Marketing");       // Sub-category from CATEGORIES_CONFIG
        idea.setInvestmentNeeded(new BigDecimal("100000"));
        idea.setExpertiseNeeded("Digital marketing skills, social media management, basic design");
        idea.setTrainingNeeded("Digital marketing courses, Google Ads certification");
        idea.setResources("Computer, internet, design software, marketing tools");
        idea.setSuccessExamples("Many freelancers have built successful agencies starting with just 2-3 clients");
        idea.setVideoUrl("https://youtube.com/watch?v=digital-marketing-guide");
        idea.setGovernmentSubsidies("Startup India scheme, MSME benefits");
        idea.setFundingOptions("Personal savings, small business loans, angel investors");
        idea.setBankAssistance("MSME loans with 8.5% interest, no collateral for amounts under 10 lakhs");
        idea.setTargetAudience(Arrays.asList("Women", "Middle Class", "Urban"));
        idea.setSpecialAdvantages(Arrays.asList("Work from home", "Flexible hours", "High earning potential"));
        idea.setDifficultyLevel("Medium");
        idea.setTimeToMarket("1-3 months");
        idea.setLocation("Urban");
        idea.setImageUrl("https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400");
        idea.setActive(true);  // Ensure idea is active by default
        return idea;
    }
    
    private Idea createEcoFriendlyProductsIdea() {
        Idea idea = new Idea();
        idea.setTitle("Eco-Friendly Products Manufacturing");
        idea.setDescription("Manufacture eco-friendly products like bamboo toothbrushes, cloth bags, and biodegradable packaging.");
        idea.setCategory("Manufacturing");         // Main category from CATEGORIES_CONFIG
        idea.setSector("Consumer goods");          // Sub-category from CATEGORIES_CONFIG
        idea.setInvestmentNeeded(new BigDecimal("200000"));
        idea.setExpertiseNeeded("Product design, manufacturing processes, eco-friendly materials");
        idea.setTrainingNeeded("Manufacturing techniques, quality control, certification processes");
        idea.setResources("Small manufacturing unit, raw materials, packaging equipment");
        idea.setSuccessExamples("Companies like Bamboo India have successfully built eco-friendly product businesses");
        idea.setVideoUrl("https://youtube.com/watch?v=eco-friendly-manufacturing");
        idea.setGovernmentSubsidies("Green manufacturing subsidies, MSME benefits");
        idea.setFundingOptions("Green business loans, venture capital, crowdfunding");
        idea.setBankAssistance("Green business loans with preferential rates, MSME support");
        idea.setTargetAudience(Arrays.asList("Environment conscious", "Middle Class"));
        idea.setSpecialAdvantages(Arrays.asList("Growing market", "Government incentives", "Social impact"));
        idea.setDifficultyLevel("Hard");
        idea.setTimeToMarket("6-12 months");
        idea.setLocation("Both");
        idea.setImageUrl("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400");
        idea.setActive(true);  // Ensure idea is active by default
        return idea;
    }
    
    private Idea createRuralTechHubIdea() {
        Idea idea = new Idea();
        idea.setTitle("Rural Technology Hub");
        idea.setDescription("Create a technology hub in rural areas offering computer training, internet services, and digital literacy programs.");
        idea.setCategory("Technology");            // Main category from CATEGORIES_CONFIG
        idea.setSector("Digital Literacy");        // Sub-category from CATEGORIES_CONFIG
        idea.setInvestmentNeeded(new BigDecimal("150000"));
        idea.setExpertiseNeeded("Basic computer skills, teaching ability, business management");
        idea.setTrainingNeeded("Computer training certification, teaching methodologies");
        idea.setResources("Computers, internet connection, training materials, space");
        idea.setSuccessExamples("Many rural entrepreneurs have successfully run computer training centers");
        idea.setVideoUrl("https://youtube.com/watch?v=rural-tech-hub");
        idea.setGovernmentSubsidies("Digital India program, rural development schemes");
        idea.setFundingOptions("Rural development loans, government grants, self-help groups");
        idea.setBankAssistance("Rural development loans with 6% interest, special schemes for rural entrepreneurs");
        idea.setTargetAudience(Arrays.asList("Rural", "Lower Middle Class"));
        idea.setSpecialAdvantages(Arrays.asList("High demand", "Government support", "Community impact"));
        idea.setDifficultyLevel("Easy");
        idea.setTimeToMarket("3-6 months");
        idea.setLocation("Rural");
        idea.setImageUrl("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400");
        idea.setActive(true);  // Ensure idea is active by default
        return idea;
    }
    
    private Idea createWomenEmpowermentIdea() {
        Idea idea = new Idea();
        idea.setTitle("Women's Handicraft Business");
        idea.setDescription("Start a handicraft business focusing on traditional crafts, empowering women artisans and preserving cultural heritage.");
        idea.setCategory("Handicrafts");            // Main category from CATEGORIES_CONFIG
        idea.setSector("Traditional Crafts");       // Sub-category from CATEGORIES_CONFIG
        idea.setInvestmentNeeded(new BigDecimal("75000"));
        idea.setExpertiseNeeded("Handicraft skills, business management, marketing");
        idea.setTrainingNeeded("Craft techniques, quality control, business skills");
        idea.setResources("Raw materials, tools, workspace, marketing materials");
        idea.setSuccessExamples("Many women's self-help groups have built successful handicraft businesses");
        idea.setVideoUrl("https://youtube.com/watch?v=women-handicraft-business");
        idea.setGovernmentSubsidies("Women entrepreneurship schemes, handicraft development programs");
        idea.setFundingOptions("Women's self-help group loans, microfinance, government grants");
        idea.setBankAssistance("Special women entrepreneur loans with 6% interest, no collateral required");
        idea.setTargetAudience(Arrays.asList("Women", "Rural", "Lower Middle Class"));
        idea.setSpecialAdvantages(Arrays.asList("Empowering women", "Cultural preservation", "Flexible work hours"));
        idea.setDifficultyLevel("Easy");
        idea.setTimeToMarket("1-3 months");
        idea.setLocation("Both");
        idea.setImageUrl("https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400");
        idea.setActive(true);  // Ensure idea is active by default
        return idea;
    }
    
    private Idea createSpeciallyAbledIdea() {
        Idea idea = new Idea();
        idea.setTitle("Accessible Technology Solutions");
        idea.setDescription("Develop and provide technology solutions for specially abled people, including assistive devices and software.");
        idea.setCategory("Technology");            // Main category from CATEGORIES_CONFIG
        idea.setSector("Assistive Technology");   // Sub-category from CATEGORIES_CONFIG
        idea.setInvestmentNeeded(new BigDecimal("300000"));
        idea.setExpertiseNeeded("Technology development, accessibility knowledge, business skills");
        idea.setTrainingNeeded("Accessibility standards, assistive technology development");
        idea.setResources("Development tools, testing equipment, office space");
        idea.setSuccessExamples("Companies like Enable India have successfully built accessible technology businesses");
        idea.setVideoUrl("https://youtube.com/watch?v=accessible-technology");
        idea.setGovernmentSubsidies("Disability entrepreneurship schemes, technology development grants");
        idea.setFundingOptions("Social impact funds, government grants, corporate partnerships");
        idea.setBankAssistance("Special loans for disability entrepreneurs, reduced interest rates");
        idea.setTargetAudience(Arrays.asList("Specially Abled", "Urban"));
        idea.setSpecialAdvantages(Arrays.asList("Social impact", "Government support", "Growing market"));
        idea.setDifficultyLevel("Hard");
        idea.setTimeToMarket("1+ years");
        idea.setLocation("Urban");
        idea.setImageUrl("https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400");
        idea.setActive(true);  // Ensure idea is active by default
        return idea;
    }
    
    private Idea createMiddleClassIdea() {
        Idea idea = new Idea();
        idea.setTitle("Home-Based Food Business");
        idea.setDescription("Start a home-based food business selling homemade snacks, meals, or specialty foods to local customers.");
        idea.setCategory("Food");                    // Main category from CATEGORIES_CONFIG
        idea.setSector("Home Cooking");             // Sub-category from CATEGORIES_CONFIG
        idea.setInvestmentNeeded(new BigDecimal("25000"));
        idea.setExpertiseNeeded("Cooking skills, food safety, basic business management");
        idea.setTrainingNeeded("Food safety certification, business registration, marketing");
        idea.setResources("Kitchen equipment, ingredients, packaging materials");
        idea.setSuccessExamples("Many home chefs have built successful food businesses starting from their kitchens");
        idea.setVideoUrl("https://youtube.com/watch?v=home-food-business");
        idea.setGovernmentSubsidies("FSSAI registration support, MSME benefits");
        idea.setFundingOptions("Personal savings, small business loans, family support");
        idea.setBankAssistance("Small business loans with 9% interest, easy documentation");
        idea.setTargetAudience(Arrays.asList("Middle Class", "Women", "Urban"));
        idea.setSpecialAdvantages(Arrays.asList("Low investment", "Work from home", "Flexible hours"));
        idea.setDifficultyLevel("Easy");
        idea.setTimeToMarket("1-3 months");
        idea.setLocation("Urban");
        idea.setImageUrl("https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400");
        idea.setActive(true);  // Ensure idea is active by default
        return idea;
    }
    
    private Idea createUnicornTechIdea() {
        Idea idea = new Idea();
        idea.setTitle("AI-Powered Personal Finance Assistant");
        idea.setDescription("Intelligent personal finance app that uses AI to provide personalized budgeting, investment advice, and financial planning.");
        idea.setCategory("Technology");            // Main category
        idea.setSector("Artificial Intelligence (AI)"); // Sub-category from CATEGORIES_CONFIG
        idea.setInvestmentNeeded(new BigDecimal("5000000"));
        idea.setExpertiseNeeded("AI/ML expertise, financial domain knowledge, mobile development");
        idea.setTrainingNeeded("Machine learning, financial regulations, app development");
        idea.setResources("Development team, cloud infrastructure, financial data sources");
        idea.setSuccessExamples("Apps like Mint and YNAB have successfully captured millions of users");
        idea.setVideoUrl("https://youtube.com/watch?v=ai-finance-guide");
        idea.setGovernmentSubsidies("Startup India scheme, AI mission funding");
        idea.setFundingOptions("Venture capital, angel investors, government grants");
        idea.setBankAssistance("Technology startup loans, collateral-free funding");
        idea.setTargetAudience(Arrays.asList("Middle Class", "Urban", "Tech Savvy"));
        idea.setSpecialAdvantages(Arrays.asList("High scalability", "Recurring revenue", "Growing fintech market"));
        idea.setDifficultyLevel("Hard");
        idea.setTimeToMarket("1+ years");
        idea.setLocation("Urban");
        idea.setImageUrl("https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400");
        idea.setActive(true);  // Ensure idea is active by default
        return idea;
    }
    
    private Idea createManufacturingIdea() {
        Idea idea = new Idea();
        idea.setTitle("Handmade Jewelry Business");
        idea.setDescription("Create and sell handcrafted jewelry using traditional techniques and modern designs for both local and online markets.");
        idea.setCategory("Manufacturing");         // Main category  
        idea.setSector("Jewelry");                 // Sub-category from CATEGORIES_CONFIG
        idea.setInvestmentNeeded(new BigDecimal("75000"));
        idea.setExpertiseNeeded("Jewelry making skills, design creativity, basic business management");
        idea.setTrainingNeeded("Jewelry making workshops, gemology basics, online marketing");
        idea.setResources("Tools and equipment, raw materials (metals, stones), workspace");
        idea.setSuccessExamples("Many artisans have built successful jewelry brands with 300-500% profit margins");
        idea.setVideoUrl("https://youtube.com/watch?v=jewelry-making-business");
        idea.setGovernmentSubsidies("Handicrafts promotion schemes, MSME benefits");
        idea.setFundingOptions("Personal savings, MSME loans, artisan development schemes");
        idea.setBankAssistance("Artisan credit schemes, small business loans with low interest");
        idea.setTargetAudience(Arrays.asList("Women", "Rural", "Artisans"));
        idea.setSpecialAdvantages(Arrays.asList("Creative work", "Flexible hours", "High profit margins", "Online sales potential"));
        idea.setDifficultyLevel("Medium");
        idea.setTimeToMarket("3-6 months");
        idea.setLocation("Both");
        idea.setImageUrl("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400");
        idea.setActive(true);  // Ensure idea is active by default
        return idea;
    }
    
    private Idea createServiceIdea() {
        Idea idea = new Idea();
        idea.setTitle("Women-Only Fitness Studio");
        idea.setDescription("A fitness studio exclusively for women, offering yoga, pilates, strength training, and wellness programs in a comfortable environment.");
        idea.setCategory("For Women");             // Main category from CATEGORIES_CONFIG
        idea.setSector("Fitness");                 // Sub-category from CATEGORIES_CONFIG  
        idea.setInvestmentNeeded(new BigDecimal("300000"));
        idea.setExpertiseNeeded("Fitness training certifications, business management, customer service");
        idea.setTrainingNeeded("Fitness instructor certification, yoga training, business development");
        idea.setResources("Studio space, fitness equipment, sound system, changing rooms");
        idea.setSuccessExamples("Women-only gyms like Curves have shown strong member retention and community building");
        idea.setVideoUrl("https://youtube.com/watch?v=women-fitness-studio");
        idea.setGovernmentSubsidies("Women entrepreneur schemes, sports development programs");
        idea.setFundingOptions("Women-focused business loans, fitness franchise opportunities");
        idea.setBankAssistance("Priority lending for women entrepreneurs, collateral-free loans under women schemes");
        idea.setTargetAudience(Arrays.asList("Women", "Middle Class", "Urban"));
        idea.setSpecialAdvantages(Arrays.asList("Growing health awareness", "Women-safe environment", "Community building", "Multiple revenue streams"));
        idea.setDifficultyLevel("Medium");
        idea.setTimeToMarket("3-6 months");
        idea.setLocation("Urban");
        idea.setImageUrl("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400");
        idea.setActive(true);  // Ensure idea is active by default
        return idea;
    }
} 