package com.ideafactory.config;

import com.ideafactory.model.Idea;
import com.ideafactory.repository.IdeaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private IdeaRepository ideaRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Only initialize if no data exists
        if (ideaRepository.count() == 0) {
            initializeSampleData();
        }
    }
    
    private void initializeSampleData() {
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
        idea.setCategory("Business");
        idea.setSector("Agriculture");
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
        return idea;
    }
    
    private Idea createDigitalMarketingAgencyIdea() {
        Idea idea = new Idea();
        idea.setTitle("Digital Marketing Agency");
        idea.setDescription("Start a digital marketing agency offering services like social media management, SEO, and content creation for small businesses.");
        idea.setCategory("Service");
        idea.setSector("Technology");
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
        return idea;
    }
    
    private Idea createEcoFriendlyProductsIdea() {
        Idea idea = new Idea();
        idea.setTitle("Eco-Friendly Products Manufacturing");
        idea.setDescription("Manufacture eco-friendly products like bamboo toothbrushes, cloth bags, and biodegradable packaging.");
        idea.setCategory("Manufacturing");
        idea.setSector("Environment");
        idea.setInvestmentNeeded(new BigDecimal("200000"));
        idea.setExpertiseNeeded("Product design, manufacturing processes, eco-friendly materials");
        idea.setTrainingNeeded("Manufacturing techniques, quality control, certification processes");
        idea.setResources("Small manufacturing unit, raw materials, packaging equipment");
        idea.setSuccessExamples("Companies like Bamboo India have successfully built eco-friendly product businesses");
        idea.setVideoUrl("https://youtube.com/watch?v=eco-friendly-manufacturing");
        idea.setGovernmentSubsidies("Green manufacturing subsidies, MSME benefits");
        idea.setFundingOptions("Green business loans, venture capital, crowdfunding");
        idea.setBankAssistance("Green business loans with preferential rates, MSME support");
        idea.setTargetAudience(Arrays.asList("Middle Class", "Urban"));
        idea.setSpecialAdvantages(Arrays.asList("Growing market", "Environmental impact", "Government support"));
        idea.setDifficultyLevel("Medium");
        idea.setTimeToMarket("6-12 months");
        idea.setLocation("Urban");
        idea.setImageUrl("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400");
        return idea;
    }
    
    private Idea createRuralTechHubIdea() {
        Idea idea = new Idea();
        idea.setTitle("Rural Technology Hub");
        idea.setDescription("Create a technology hub in rural areas offering computer training, internet services, and digital literacy programs.");
        idea.setCategory("Service");
        idea.setSector("Technology");
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
        return idea;
    }
    
    private Idea createWomenEmpowermentIdea() {
        Idea idea = new Idea();
        idea.setTitle("Women's Handicraft Business");
        idea.setDescription("Start a handicraft business focusing on traditional crafts, empowering women artisans and preserving cultural heritage.");
        idea.setCategory("Business");
        idea.setSector("Handicrafts");
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
        return idea;
    }
    
    private Idea createSpeciallyAbledIdea() {
        Idea idea = new Idea();
        idea.setTitle("Accessible Technology Solutions");
        idea.setDescription("Develop and provide technology solutions for specially abled people, including assistive devices and software.");
        idea.setCategory("Business");
        idea.setSector("Technology");
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
        return idea;
    }
    
    private Idea createMiddleClassIdea() {
        Idea idea = new Idea();
        idea.setTitle("Home-Based Food Business");
        idea.setDescription("Start a home-based food business selling homemade snacks, meals, or specialty foods to local customers.");
        idea.setCategory("Business");
        idea.setSector("Food");
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
        return idea;
    }
    
    private Idea createUnicornTechIdea() {
        Idea idea = new Idea();
        idea.setTitle("AI-Powered Healthcare Platform");
        idea.setDescription("Develop an AI-powered healthcare platform that provides telemedicine, health monitoring, and personalized health recommendations.");
        idea.setCategory("Unicorn");
        idea.setSector("Healthcare");
        idea.setInvestmentNeeded(new BigDecimal("5000000"));
        idea.setExpertiseNeeded("AI/ML, healthcare domain knowledge, software development");
        idea.setTrainingNeeded("AI development, healthcare regulations, business scaling");
        idea.setResources("Development team, cloud infrastructure, healthcare partnerships");
        idea.setSuccessExamples("Companies like Practo and 1mg have built successful healthcare platforms");
        idea.setVideoUrl("https://youtube.com/watch?v=ai-healthcare-platform");
        idea.setGovernmentSubsidies("Digital health mission, startup India benefits");
        idea.setFundingOptions("Venture capital, angel investors, corporate partnerships");
        idea.setBankAssistance("Startup loans, technology development funds");
        idea.setTargetAudience(Arrays.asList("Urban", "Middle Class"));
        idea.setSpecialAdvantages(Arrays.asList("High growth potential", "Government support", "Social impact"));
        idea.setDifficultyLevel("Hard");
        idea.setTimeToMarket("1+ years");
        idea.setLocation("Urban");
        idea.setImageUrl("https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400");
        return idea;
    }
    
    private Idea createManufacturingIdea() {
        Idea idea = new Idea();
        idea.setTitle("Small Scale Electronics Manufacturing");
        idea.setDescription("Manufacture small electronic components or devices like phone chargers, LED lights, or basic electronic kits.");
        idea.setCategory("Manufacturing");
        idea.setSector("Electronics");
        idea.setInvestmentNeeded(new BigDecimal("500000"));
        idea.setExpertiseNeeded("Electronics knowledge, manufacturing processes, quality control");
        idea.setTrainingNeeded("Electronics manufacturing, quality standards, safety protocols");
        idea.setResources("Manufacturing equipment, components, testing tools, workspace");
        idea.setSuccessExamples("Many small manufacturers have successfully built electronics businesses");
        idea.setVideoUrl("https://youtube.com/watch?v=electronics-manufacturing");
        idea.setGovernmentSubsidies("Make in India benefits, MSME manufacturing subsidies");
        idea.setFundingOptions("Manufacturing loans, equipment financing, working capital loans");
        idea.setBankAssistance("Manufacturing sector loans with 8% interest, equipment financing");
        idea.setTargetAudience(Arrays.asList("Middle Class", "Urban"));
        idea.setSpecialAdvantages(Arrays.asList("Government support", "Growing market", "Export potential"));
        idea.setDifficultyLevel("Medium");
        idea.setTimeToMarket("6-12 months");
        idea.setLocation("Urban");
        idea.setImageUrl("https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400");
        return idea;
    }
    
    private Idea createServiceIdea() {
        Idea idea = new Idea();
        idea.setTitle("Professional Cleaning Services");
        idea.setDescription("Start a professional cleaning service for homes and offices, offering regular and deep cleaning services.");
        idea.setCategory("Service");
        idea.setSector("Cleaning");
        idea.setInvestmentNeeded(new BigDecimal("50000"));
        idea.setExpertiseNeeded("Cleaning techniques, customer service, business management");
        idea.setTrainingNeeded("Professional cleaning certification, safety protocols, customer service");
        idea.setResources("Cleaning equipment, supplies, transportation, insurance");
        idea.setSuccessExamples("Many cleaning service businesses have grown from 1-2 employees to large teams");
        idea.setVideoUrl("https://youtube.com/watch?v=cleaning-service-business");
        idea.setGovernmentSubsidies("Service sector benefits, MSME support");
        idea.setFundingOptions("Small business loans, equipment financing, personal savings");
        idea.setBankAssistance("Service sector loans with 9% interest, easy documentation");
        idea.setTargetAudience(Arrays.asList("Lower Middle Class", "Urban"));
        idea.setSpecialAdvantages(Arrays.asList("Low investment", "High demand", "Recurring revenue"));
        idea.setDifficultyLevel("Easy");
        idea.setTimeToMarket("1-3 months");
        idea.setLocation("Urban");
        idea.setImageUrl("https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400");
        return idea;
    }
} 