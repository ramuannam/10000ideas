export const CATEGORIES_CONFIG = {
  "For Women": [
    "Beauty", "Fashion", "Event Planning", "Eco-Friendly Products", "Home Decor", 
    "Fitness", "Creative Arts", "Personal Development", "Social Impact", "Childcare", 
    "Health", "Online Retail", "Education", "Coaching/Mentoring", "Others"
  ],
  "Technology": [
    "Software", "E-commerce", "Mobile Apps", "Cybersecurity", "Artificial Intelligence (AI)", 
    "Data Analytics", "Robotics", "Blockchain", "Digital Marketing", "Edtech", "Fintech", "Saas"
  ],
  "Agriculture": [
    "Organic Farming", "Precision Agriculture", "Agri-Tourism", "Agri-Tech Solutions", 
    "Livestock Farming", "Data Analytics", "Agricultural Consulting", "Equipment Manufacturing", 
    "Agroforestry", "Agricultural Education and Training"
  ],
  "Fashion": [
    "Clothing & Accessories", "Ethical Fashion", "Sustainable Fashion", "Fashion Consulting", 
    "Blogging", "Fashion Styling", "Event Management", "Fashion label/studio"
  ],
  "Manufacturing": [
    "Electronics", "Textile", "Automotive", "Food Processing", "Pharmaceutical", "Furniture", 
    "Chemical", "Metal Fabrication", "Printing and Publishing", "Consumer goods", 
    "Renewable energy", "Construction materials", "Jewelry", "Others"
  ],
  "Food & Beverage": [
    "Restaurant", "Food Truck", "Craft Brewery", "Ice cream parlour", "Catering services", 
    "Gourmet Food products"
  ],
  "Startup Ideas": [
    "Tech Startups", "Social Impact Startups", "Green Startups", "FinTech Startups", 
    "HealthTech Startups", "EdTech Startups", "E-commerce Startups", "AI/ML Startups", 
    "Food Tech Startups", "Travel Tech Startups"
  ],
  "Sports": [
    "Fitness Training", "Sports Equipment", "Athletic Coaching", "Sports Analytics", 
    "Sports Medicine", "Event Management", "Sports Marketing", "Youth Sports Programs", 
    "Professional Sports Services", "Sports Nutrition"
  ],
  "Entertainment & Media": [
    "Content Creation", "Video Production", "Music Industry", "Gaming", "Event Planning", 
    "Social Media Management", "Podcasting", "Streaming Services", "Digital Art", 
    "Photography Services"
  ],
  "Travel & Tourism": [
    "Tour Operations", "Travel Planning", "Hospitality Services", "Adventure Tourism", 
    "Cultural Tourism", "Eco-Tourism", "Travel Technology", "Accommodation Services", 
    "Transportation Services", "Travel Consulting"
  ],
  "Professional Services": [
    "Consulting", "Legal Services", "Accounting & Finance", "Marketing Services", 
    "HR Services", "Business Coaching", "Project Management", "Real Estate Services", 
    "Insurance Services", "Training & Development"
  ],
  "Education": [
    "Online Learning", "Tutoring Services", "Educational Technology", "Language Learning", 
    "Skill Development", "Professional Training", "Educational Content", "Learning Management", 
    "Educational Consulting", "Special Education Services"
  ]
} as const;

export const MAIN_CATEGORIES = [
  { icon: "IoWomanOutline", title: "For women", color: "bg-pink-100" },
  { icon: "FaRocket", title: "Startup Ideas", color: "bg-blue-100" },
  { icon: "FaLaptopCode", title: "Technology", color: "bg-green-100" },
  { icon: "MdEngineering", title: "Manufacturing", color: "bg-orange-100" },
  { icon: "GiFarmTractor", title: "Agriculture", color: "bg-yellow-100" },
  { icon: "IoRestaurantOutline", title: "Food and Beverage", color: "bg-red-100" },
  { icon: "GiDress", title: "Fashion", color: "bg-purple-100" }
] as const;

export const NAVIGATION_ITEMS = [
  'All Ideas', 'Submit an Idea', 'Fundraising', 'Advisory', 'Blog', 'About us'
] as const; 