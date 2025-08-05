import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Idea } from '../types/index';
import { ideaService } from '../services/api';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { FaArrowLeft, FaStar, FaThumbsUp, FaThumbsDown, FaShare, FaBookmark, FaChartLine, FaUsers, FaDollarSign, FaLightbulb, FaRocket, FaCheckCircle, FaExclamationTriangle, FaQuestionCircle, FaBullseye, FaChartBar, FaEye, FaChevronRight, FaChevronDown, FaInfoCircle, FaShieldAlt, FaHandshake, FaCrown, FaGem, FaThLarge, FaBrain, FaCog, FaChartPie, FaFileAlt, FaPlay, FaDownload, FaExternalLinkAlt, FaGlobe, FaBuilding, FaTools, FaGraduationCap, FaComments, FaSearch, FaIndustry, FaMoneyBillWave, FaUniversity, FaUserTie, FaUsers as FaCrowd } from 'react-icons/fa';

interface IdeaDetailPageProps {
  onBack: () => void;
}

interface VisionData {
  ideaDevelopment: {
    concept: string;
    innovation: string;
    differentiation: string;
    timeline: string;
  };
  marketSize: {
    totalAddressable: string;
    serviceable: string;
    obtainable: string;
    growthRate: string;
  };
  industryStructure: {
    competitors: string[];
    barriers: string[];
    trends: string[];
    opportunities: string[];
  };
}

interface ProductData {
  usersAndJobs: {
    targetUsers: string[];
    painPoints: string[];
    jobsToBeDone: string[];
    userJourney: string[];
  };
  productExplanation: {
    features: string[];
    benefits: string[];
    technology: string;
    roadmap: string[];
  };
  valueProposition: {
    primary: string;
    secondary: string[];
    uniqueValue: string;
    competitiveAdvantage: string;
  };
}

interface BusinessData {
  businessModels: {
    revenueStreams: string[];
    costStructure: string[];
    partnerships: string[];
    pricing: string;
  };
  pathTo100M: {
    milestones: string[];
    fundingRounds: string[];
    expansion: string[];
    timeline: string;
  };
  businessMoats: {
    networkEffects: string;
    switchingCosts: string;
    economiesOfScale: string;
    intellectualProperty: string;
  };
}

interface PerformanceData {
  dataOrientation: {
    keyMetrics: string[];
    trackingTools: string[];
    analytics: string[];
  };
  productMetrics: {
    userMetrics: string[];
    engagementMetrics: string[];
    retentionMetrics: string[];
  };
  financialMetrics: {
    revenueMetrics: string[];
    costMetrics: string[];
    profitabilityMetrics: string[];
  };
}

interface PitchData {
  story: {
    problem: string;
    solution: string;
    market: string;
    traction: string;
    team: string;
  };
  pitchDeck: {
    slides: string[];
    keyPoints: string[];
    demo: string;
  };
}

interface InvestmentData {
  machinery: {
    equipment: string[];
    costs: string[];
    suppliers: string[];
    maintenance: string;
  };
  rawMaterials: {
    materials: string[];
    costs: string[];
    suppliers: string[];
    logistics: string;
  };
  labour: {
    roles: string[];
    salaries: string[];
    skills: string[];
    training: string;
  };
  marketing: {
    channels: string[];
    budget: string;
    strategies: string[];
    timeline: string;
  };
  permits: {
    licenses: string[];
    costs: string[];
    requirements: string[];
    timeline: string;
  };
}

interface FundingData {
  selfFunding: {
    amount: string;
    sources: string[];
    timeline: string;
    advantages: string[];
    disadvantages: string[];
  };
  bankLoans: {
    types: string[];
    amounts: string[];
    requirements: string[];
    interestRates: string[];
    terms: string[];
  };
  governmentGrants: {
    schemes: string[];
    amounts: string[];
    eligibility: string[];
    applicationProcess: string[];
  };
  angelInvestors: {
    investmentRange: string;
    equity: string;
    requirements: string[];
    benefits: string[];
  };
  ventureCapital: {
    investmentRange: string;
    equity: string;
    requirements: string[];
    process: string[];
  };
  crowdfunding: {
    platforms: string[];
    targetAmount: string;
    rewards: string[];
    timeline: string;
  };
}

interface SkillsData {
  technical: {
    required: string[];
    preferred: string[];
    training: string[];
    certifications: string[];
  };
  business: {
    required: string[];
    preferred: string[];
    experience: string[];
    networking: string[];
  };
  soft: {
    required: string[];
    preferred: string[];
    development: string[];
    assessment: string[];
  };
}

interface ReviewData {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
  };
  reviews: {
    id: string;
    user: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
    helpful: number;
    unhelpful: number;
  }[];
}

interface RelatedIdeasData {
  similar: {
    id: string;
    title: string;
    category: string;
    investment: string;
    similarity: number;
  }[];
  trending: {
    id: string;
    title: string;
    category: string;
    trend: string;
    growth: number;
  }[];
  recommended: {
    id: string;
    title: string;
    category: string;
    reason: string;
    match: number;
  }[];
}

const IdeaDetailPage: React.FC<IdeaDetailPageProps> = ({ onBack }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('vision');
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  // Filter states for Investment Breakdown
  const [activeFilterTab, setActiveFilterTab] = useState<'funding' | 'category'>('funding');
  const [selectedFundingOption, setSelectedFundingOption] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Sample data for the detailed sections
  const [visionData] = useState<VisionData>({
    ideaDevelopment: {
      concept: "Revolutionary AI-powered platform that transforms traditional business processes through intelligent automation and predictive analytics.",
      innovation: "First-to-market solution combining machine learning with industry-specific workflows.",
      differentiation: "Proprietary algorithm that reduces processing time by 80% while improving accuracy by 95%.",
      timeline: "MVP in 6 months, beta launch in 12 months, full market release in 18 months."
    },
    marketSize: {
      totalAddressable: "₹50,000 Crore (Global market for business automation)",
      serviceable: "₹5,000 Crore (Target segment in India)",
      obtainable: "₹500 Crore (Realistic market capture in 5 years)",
      growthRate: "25% annual growth rate in the automation sector"
    },
    industryStructure: {
      competitors: ["Established players with 60% market share", "3-5 direct competitors", "Emerging startups with innovative approaches"],
      barriers: ["High initial development costs", "Regulatory compliance requirements", "Technology infrastructure needs"],
      trends: ["AI/ML adoption acceleration", "Remote work driving automation", "Digital transformation initiatives"],
      opportunities: ["Untapped SME market", "Industry-specific solutions", "Integration with existing systems"]
    }
  });

  const [productData] = useState<ProductData>({
    usersAndJobs: {
      targetUsers: ["Small to Medium Enterprises", "Operations Managers", "Business Process Owners"],
      painPoints: ["Manual processes consuming 40% of work time", "Error rates of 15% in data entry", "Lack of real-time insights"],
      jobsToBeDone: ["Automate repetitive tasks", "Generate actionable insights", "Improve decision-making speed"],
      userJourney: ["Awareness → Interest → Trial → Adoption → Advocacy"]
    },
    productExplanation: {
      features: ["AI-powered automation", "Real-time analytics dashboard", "Custom workflow builder", "Integration APIs"],
      benefits: ["80% time savings", "95% accuracy improvement", "Real-time insights", "Scalable solution"],
      technology: "Built on modern cloud architecture with microservices, using Python for AI/ML and React for frontend",
      roadmap: ["Q1: Core automation features", "Q2: Analytics dashboard", "Q3: Advanced AI capabilities", "Q4: Enterprise features"]
    },
    valueProposition: {
      primary: "Transform your business operations with AI-powered automation that saves time and improves accuracy",
      secondary: ["Reduce operational costs by 60%", "Improve process efficiency by 80%", "Enable data-driven decisions"],
      uniqueValue: "Only solution combining industry-specific workflows with advanced AI capabilities",
      competitiveAdvantage: "Proprietary algorithms and deep domain expertise in business process optimization"
    }
  });

  const [businessData] = useState<BusinessData>({
    businessModels: {
      revenueStreams: ["SaaS subscription model", "Enterprise licensing", "Professional services", "Training and support"],
      costStructure: ["R&D and product development", "Sales and marketing", "Customer support", "Infrastructure costs"],
      partnerships: ["Technology partners for integrations", "Channel partners for distribution", "Industry consultants"],
      pricing: "Tiered pricing: Basic ₹10K/month, Professional ₹50K/month, Enterprise ₹200K/month"
    },
    pathTo100M: {
      milestones: ["₹1M ARR in Year 1", "₹10M ARR in Year 2", "₹50M ARR in Year 3", "₹100M ARR in Year 5"],
      fundingRounds: ["Seed: ₹5 Crore for MVP", "Series A: ₹25 Crore for growth", "Series B: ₹100 Crore for expansion"],
      expansion: ["Geographic expansion to tier-2 cities", "Product line extensions", "International markets"],
      timeline: "5-year roadmap to ₹100M ARR with strategic funding and market expansion"
    },
    businessMoats: {
      networkEffects: "User data improves AI algorithms, creating stronger value proposition for new users",
      switchingCosts: "Deep integration with existing systems makes migration difficult and expensive",
      economiesOfScale: "Cloud infrastructure and AI models become more efficient with scale",
      intellectualProperty: "Proprietary algorithms and patents protect core technology"
    }
  });

  const [performanceData] = useState<PerformanceData>({
    dataOrientation: {
      keyMetrics: ["Customer Acquisition Cost (CAC)", "Lifetime Value (LTV)", "Monthly Recurring Revenue (MRR)", "Churn Rate"],
      trackingTools: ["Google Analytics", "Mixpanel", "Amplitude", "Custom dashboard"],
      analytics: ["User behavior analysis", "Feature usage tracking", "Performance monitoring", "A/B testing"]
    },
    productMetrics: {
      userMetrics: ["Daily Active Users (DAU)", "Monthly Active Users (MAU)", "User engagement time", "Feature adoption rate"],
      engagementMetrics: ["Session duration", "Pages per session", "Return visit rate", "Feature usage frequency"],
      retentionMetrics: ["7-day retention", "30-day retention", "90-day retention", "Annual retention"]
    },
    financialMetrics: {
      revenueMetrics: ["Monthly Recurring Revenue (MRR)", "Annual Recurring Revenue (ARR)", "Average Revenue Per User (ARPU)", "Revenue growth rate"],
      costMetrics: ["Customer Acquisition Cost (CAC)", "Customer Support Cost", "Infrastructure costs", "Marketing spend"],
      profitabilityMetrics: ["Gross margin", "Net margin", "Unit economics", "Break-even analysis"]
    }
  });

  const [pitchData] = useState<PitchData>({
    story: {
      problem: "Businesses waste 40% of their time on manual, repetitive tasks that could be automated, leading to inefficiency and errors.",
      solution: "AI-powered automation platform that reduces manual work by 80% while improving accuracy by 95%.",
      market: "₹50,000 Crore global market growing at 25% annually, with significant opportunity in the SME segment.",
      traction: "Pilot program with 10 companies showing 80% time savings and 95% accuracy improvement.",
      team: "Experienced team with 15+ years in AI/ML and business process optimization."
    },
    pitchDeck: {
      slides: ["Problem & Solution", "Market Opportunity", "Product Demo", "Business Model", "Financial Projections", "Team", "Ask"],
      keyPoints: ["Clear problem statement", "Compelling solution", "Large market opportunity", "Strong traction", "Experienced team"],
      demo: "Live product demonstration showing automation in action"
    }
  });

  const [investmentData] = useState<InvestmentData>({
    machinery: {
      equipment: ["AI servers and GPUs", "Cloud infrastructure", "Development workstations", "Testing equipment"],
      costs: ["₹50 Lakhs for AI infrastructure", "₹20 Lakhs for cloud setup", "₹10 Lakhs for development tools"],
      suppliers: ["AWS/Google Cloud for infrastructure", "NVIDIA for GPUs", "Local vendors for workstations"],
      maintenance: "₹5 Lakhs annually for maintenance and upgrades"
    },
    rawMaterials: {
      materials: ["Software licenses", "API subscriptions", "Data storage", "Security tools"],
      costs: ["₹10 Lakhs for software licenses", "₹5 Lakhs for API services", "₹3 Lakhs for data storage"],
      suppliers: ["Microsoft, Adobe for software", "OpenAI, Google for APIs", "AWS for storage"],
      logistics: "Cloud-based delivery with minimal physical logistics"
    },
    labour: {
      roles: ["AI/ML Engineers", "Full-stack Developers", "Product Managers", "Sales Team"],
      salaries: ["₹15-25 Lakhs for engineers", "₹8-12 Lakhs for developers", "₹10-15 Lakhs for PMs"],
      skills: ["Python, TensorFlow, React", "JavaScript, Node.js, AWS", "Product strategy, Agile"],
      training: "₹2 Lakhs annually for skill development and certifications"
    },
    marketing: {
      channels: ["Digital marketing", "Content marketing", "LinkedIn advertising", "Industry events"],
      budget: "₹20 Lakhs annually for marketing and sales",
      strategies: ["SEO optimization", "Thought leadership content", "Partner marketing", "Direct sales"],
      timeline: "6-month ramp-up period with quarterly campaigns"
    },
    permits: {
      licenses: ["Software development license", "Data protection compliance", "ISO certifications", "Industry-specific permits"],
      costs: ["₹2 Lakhs for initial licenses", "₹1 Lakh annually for renewals"],
      requirements: ["Company registration", "GST registration", "Data protection policies", "Security audits"],
      timeline: "3-6 months for all permits and compliance"
    }
  });

  const [fundingData] = useState<FundingData>({
    selfFunding: {
      amount: "₹50 Lakhs initial investment",
      sources: ["Personal savings", "Family investment", "Business loans"],
      timeline: "6 months to secure initial funding",
      advantages: ["Full control over business", "No equity dilution", "Faster decision making"],
      disadvantages: ["Limited capital", "Personal financial risk", "Slower growth potential"]
    },
    bankLoans: {
      types: ["Term loans", "Working capital loans", "Equipment financing"],
      amounts: ["₹25-100 Lakhs depending on collateral"],
      requirements: ["Good credit score", "Business plan", "Collateral", "Cash flow projections"],
      interestRates: ["8-12% for secured loans", "12-18% for unsecured loans"],
      terms: ["3-7 years repayment period", "Monthly/quarterly payments"]
    },
    governmentGrants: {
      schemes: ["Startup India Seed Fund", "MUDRA Yojana", "ASPIRE scheme", "Stand-up India"],
      amounts: ["₹10-50 Lakhs depending on scheme"],
      eligibility: ["First-time entrepreneurs", "Women entrepreneurs", "SC/ST entrepreneurs", "Innovation focus"],
      applicationProcess: ["Online application", "Document submission", "Interview process", "Approval timeline 3-6 months"]
    },
    angelInvestors: {
      investmentRange: "₹25-100 Lakhs",
      equity: "10-25% equity stake",
      requirements: ["Strong team", "Market validation", "Scalable business model", "Clear exit strategy"],
      benefits: ["Mentorship and guidance", "Network access", "Strategic partnerships", "Follow-on funding potential"]
    },
    ventureCapital: {
      investmentRange: "₹1-10 Crores",
      equity: "20-40% equity stake",
      requirements: ["Proven traction", "Large market opportunity", "Strong team", "Clear path to profitability"],
      process: ["Initial pitch", "Due diligence", "Term sheet negotiation", "Investment and board seat"]
    },
    crowdfunding: {
      platforms: ["Ketto", "Milaap", "Wishberry", "Rang De"],
      targetAmount: "₹10-50 Lakhs",
      rewards: ["Early access to product", "Exclusive features", "Recognition in product", "Profit sharing"],
      timeline: "30-60 days campaign duration"
    }
  });

  const [skillsData] = useState<SkillsData>({
    technical: {
      required: ["Python programming", "Machine Learning", "React/JavaScript", "Cloud computing (AWS/Azure)"],
      preferred: ["TensorFlow/PyTorch", "DevOps", "Database management", "API development"],
      training: ["Online courses (Coursera, Udemy)", "Certification programs", "Hackathons and workshops"],
      certifications: ["AWS Certified Developer", "Google Cloud Professional", "Microsoft Azure", "TensorFlow Developer"]
    },
    business: {
      required: ["Business strategy", "Market research", "Financial modeling", "Sales and marketing"],
      preferred: ["Industry experience", "Network building", "Partnership development", "International markets"],
      experience: ["Startup experience", "Industry domain knowledge", "Customer development", "Pitch deck creation"],
      networking: ["Industry conferences", "Startup meetups", "Online communities", "Mentor relationships"]
    },
    soft: {
      required: ["Leadership", "Communication", "Problem-solving", "Adaptability"],
      preferred: ["Creativity", "Emotional intelligence", "Team building", "Conflict resolution"],
      development: ["Leadership workshops", "Communication training", "Mindfulness practices", "Team building exercises"],
      assessment: ["360-degree feedback", "Personality assessments", "Skill gap analysis", "Regular performance reviews"]
    }
  });

  const [reviewData] = useState<ReviewData>({
    averageRating: 4.2,
    totalReviews: 47,
    ratingDistribution: {
      five: 25,
      four: 15,
      three: 5,
      two: 1,
      one: 1
    },
    reviews: [
      {
        id: "1",
        user: "Rahul Sharma",
        rating: 5,
        title: "Excellent business opportunity",
        comment: "This idea has great potential in the current market. The automation aspect is particularly valuable for SMEs.",
        date: "2024-01-15",
        helpful: 12,
        unhelpful: 0
      },
      {
        id: "2",
        user: "Priya Patel",
        rating: 4,
        title: "Well-researched concept",
        comment: "The market analysis is thorough and the technology stack is modern. Good investment potential.",
        date: "2024-01-10",
        helpful: 8,
        unhelpful: 1
      },
      {
        id: "3",
        user: "Amit Kumar",
        rating: 4,
        title: "Innovative approach",
        comment: "The AI integration is impressive. However, execution complexity might be challenging for new entrepreneurs.",
        date: "2024-01-08",
        helpful: 6,
        unhelpful: 2
      }
    ]
  });

  const [relatedIdeasData] = useState<RelatedIdeasData>({
    similar: [
      {
        id: "2",
        title: "Smart Manufacturing Automation",
        category: "Manufacturing",
        investment: "₹75 Lakhs",
        similarity: 85
      },
      {
        id: "3",
        title: "AI-Powered Customer Service",
        category: "Technology",
        investment: "₹60 Lakhs",
        similarity: 78
      },
      {
        id: "4",
        title: "Process Optimization Platform",
        category: "Technology",
        investment: "₹45 Lakhs",
        similarity: 72
      }
    ],
    trending: [
      {
        id: "5",
        title: "Green Energy Solutions",
        category: "Energy",
        trend: "Sustainability focus",
        growth: 35
      },
      {
        id: "6",
        title: "HealthTech Platform",
        category: "Healthcare",
        trend: "Digital health boom",
        growth: 28
      },
      {
        id: "7",
        title: "EdTech Learning Platform",
        category: "Education",
        trend: "Online education growth",
        growth: 22
      }
    ],
    recommended: [
      {
        id: "8",
        title: "E-commerce Automation",
        category: "Technology",
        reason: "Similar tech stack and market",
        match: 92
      },
      {
        id: "9",
        title: "Supply Chain Optimization",
        category: "Logistics",
        reason: "Process improvement focus",
        match: 88
      },
      {
        id: "10",
        title: "Data Analytics Platform",
        category: "Technology",
        reason: "AI/ML expertise alignment",
        match: 85
      }
    ]
  });

  useEffect(() => {
    const fetchIdeaDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const ideaData = await ideaService.getIdeaById(parseInt(id));
        setIdea(ideaData);
        setError(null);
      } catch (err) {
        console.error('Error fetching idea details:', err);
        setError('Failed to load idea details');
      } finally {
        setLoading(false);
      }
    };

    fetchIdeaDetails();
  }, [id]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const openAuthModal = (mode: 'signin' | 'signup') => {
    // Handle auth modal
    console.log('Open auth modal:', mode);
  };

  const handleSignOut = () => {
    setIsUserSignedIn(false);
  };

  const renderMetricCard = (title: string, value: string, description: string, icon: React.ReactNode, color: string) => (
    <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center mb-3">
        <div className={`p-2 rounded-lg ${color} mr-3`}>
          {icon}
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </div>
      <div className="text-xl font-bold text-gray-900 mb-1">{value}</div>
    </div>
  );

  const renderDetailSection = (title: string, items: string[], icon: React.ReactNode, color: string) => (
    <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
      <div className="flex items-center mb-3">
        <div className={`p-2 rounded-lg ${color} mr-3`}>
          {icon}
        </div>
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
            <span className="text-sm text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading idea details...</p>
        </div>
      </div>
    );
  }

  if (error || !idea) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Idea</h2>
          <p className="text-gray-600 mb-4">{error || 'Idea not found'}</p>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab=""
        setActiveTab={() => {}}
        isUserSignedIn={isUserSignedIn}
        openAuthModal={openAuthModal}
        handleSignOut={handleSignOut}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center mb-4">
            <button
              onClick={onBack}
              className="flex items-center text-blue-100 hover:text-white transition-colors mr-6"
            >
              <FaArrowLeft className="mr-2" />
              Back to Ideas
            </button>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-blue-700 text-white text-sm rounded-full">
                {idea.category}
              </span>
              <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">
                {idea.sector}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                             <h1 className="text-3xl font-bold mb-2">{idea.title}</h1>
               <p className="text-lg text-blue-100 mb-4">{idea.description}</p>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {renderMetricCard(
                  "Investment Needed",
                  `₹${idea.investmentNeeded?.toLocaleString()}`,
                  "Total capital required",
                  <FaDollarSign className="text-white text-xl" />,
                  "bg-green-500"
                )}
                {renderMetricCard(
                  "Difficulty Level",
                  idea.difficultyLevel || "Medium",
                  "Implementation complexity",
                  <FaCog className="text-white text-xl" />,
                  "bg-yellow-500"
                )}
                {renderMetricCard(
                  "Time to Market",
                  "6-12 months",
                  "Estimated launch timeline",
                  <FaRocket className="text-white text-xl" />,
                  "bg-purple-500"
                )}
              </div>
            </div>
            
                         <div className="flex flex-col space-y-2">
              <button className="bg-yellow-500 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
                <FaBookmark className="inline mr-2" />
                Save Idea
              </button>
              <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors">
                <FaShare className="inline mr-2" />
                Share Idea
              </button>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-500 transition-colors">
                <FaDownload className="inline mr-2" />
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
                  <div className="flex space-x-8 overflow-x-auto">
          {[
            { id: 'vision', label: 'Your Vision', icon: <FaEye /> },
            { id: 'product', label: 'Your Product', icon: <FaCog /> },
            { id: 'business', label: 'Your Business', icon: <FaChartPie /> },
            { id: 'performance', label: 'Your Performance', icon: <FaChartBar /> },
            { id: 'pitch', label: 'Your Pitch', icon: <FaChartBar /> }
          ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {activeTab === 'vision' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                             <div className="space-y-4">
                 <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                   <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                     <FaLightbulb className="mr-2 text-yellow-500" />
                     Developing Your Idea
                   </h3>
                   <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Concept</h4>
                      <p className="text-gray-700">{visionData.ideaDevelopment.concept}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Innovation</h4>
                      <p className="text-gray-700">{visionData.ideaDevelopment.innovation}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Differentiation</h4>
                      <p className="text-gray-700">{visionData.ideaDevelopment.differentiation}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Timeline</h4>
                      <p className="text-gray-700">{visionData.ideaDevelopment.timeline}</p>
                    </div>
                  </div>
                </div>

                                 <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                   <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                     <FaChartLine className="mr-2 text-blue-500" />
                     Assessing Market Size
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {renderMetricCard("TAM", visionData.marketSize.totalAddressable, "Total Addressable Market", <FaGlobe className="text-blue-600" />, "bg-blue-100")}
                                            {renderMetricCard("SAM", visionData.marketSize.serviceable, "Serviceable Addressable Market", <FaThLarge className="text-green-600" />, "bg-green-100")}
                    {renderMetricCard("SOM", visionData.marketSize.obtainable, "Serviceable Obtainable Market", <FaBullseye className="text-purple-600" />, "bg-purple-100")}
                                          {renderMetricCard("Growth", visionData.marketSize.growthRate, "Annual Growth Rate", <FaChartLine className="text-orange-600" />, "bg-orange-100")}
                  </div>
                </div>
              </div>

                             <div className="space-y-4">
                 <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                   <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                     <FaBuilding className="mr-2 text-green-500" />
                     Industry Structure
                   </h3>
                   <div className="space-y-4">
                    {renderDetailSection("Competitors", visionData.industryStructure.competitors, <FaUsers className="text-red-600" />, "bg-red-100")}
                    {renderDetailSection("Barriers", visionData.industryStructure.barriers, <FaShieldAlt className="text-orange-600" />, "bg-orange-100")}
                    {renderDetailSection("Trends", visionData.industryStructure.trends, <FaChartLine className="text-blue-600" />, "bg-blue-100")}
                    {renderDetailSection("Opportunities", visionData.industryStructure.opportunities, <FaLightbulb className="text-green-600" />, "bg-green-100")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

                 {activeTab === 'product' && (
           <div className="space-y-4">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               <div className="space-y-4">
                                 <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                   <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                     <FaUsers className="mr-2 text-blue-500" />
                     Understanding Users & Jobs
                   </h3>
                   <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Target Users</h4>
                      <ul className="space-y-2">
                        {productData.usersAndJobs.targetUsers.map((user, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{user}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Pain Points</h4>
                      <ul className="space-y-2">
                        {productData.usersAndJobs.painPoints.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaCog className="mr-3 text-green-500" />
                    Explaining Your Product
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                      <ul className="space-y-2">
                        {productData.productExplanation.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Technology Stack</h4>
                      <p className="text-gray-700">{productData.productExplanation.technology}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaGem className="mr-3 text-purple-500" />
                    Value Proposition
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Primary Value</h4>
                      <p className="text-gray-700">{productData.valueProposition.primary}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Secondary Benefits</h4>
                      <ul className="space-y-2">
                        {productData.valueProposition.secondary.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Competitive Advantage</h4>
                      <p className="text-gray-700">{productData.valueProposition.competitiveAdvantage}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'business' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaChartPie className="mr-3 text-blue-500" />
                    Business Models
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Revenue Streams</h4>
                      <ul className="space-y-2">
                        {businessData.businessModels.revenueStreams.map((stream, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{stream}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Pricing Strategy</h4>
                      <p className="text-gray-700">{businessData.businessModels.pricing}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaRocket className="mr-3 text-green-500" />
                    Path to ₹100M
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Milestones</h4>
                      <ul className="space-y-2">
                        {businessData.pathTo100M.milestones.map((milestone, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{milestone}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Timeline</h4>
                      <p className="text-gray-700">{businessData.pathTo100M.timeline}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaShieldAlt className="mr-3 text-purple-500" />
                    Business Moats
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Network Effects</h4>
                      <p className="text-gray-700">{businessData.businessMoats.networkEffects}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Switching Costs</h4>
                      <p className="text-gray-700">{businessData.businessMoats.switchingCosts}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Economies of Scale</h4>
                      <p className="text-gray-700">{businessData.businessMoats.economiesOfScale}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Intellectual Property</h4>
                      <p className="text-gray-700">{businessData.businessMoats.intellectualProperty}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaBrain className="mr-3 text-blue-500" />
                    Data Orientation
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Metrics</h4>
                      <ul className="space-y-2">
                        {performanceData.dataOrientation.keyMetrics.map((metric, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaChartBar className="mr-3 text-green-500" />
                    Product Metrics
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">User Metrics</h4>
                      <ul className="space-y-2">
                        {performanceData.productMetrics.userMetrics.map((metric, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaDollarSign className="mr-3 text-purple-500" />
                    Financial Metrics
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Revenue Metrics</h4>
                      <ul className="space-y-2">
                        {performanceData.financialMetrics.revenueMetrics.map((metric, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pitch' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaFileAlt className="mr-3 text-blue-500" />
                    Your Story
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Problem</h4>
                      <p className="text-gray-700">{pitchData.story.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                      <p className="text-gray-700">{pitchData.story.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Market</h4>
                      <p className="text-gray-700">{pitchData.story.market}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Traction</h4>
                      <p className="text-gray-700">{pitchData.story.traction}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Team</h4>
                      <p className="text-gray-700">{pitchData.story.team}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaChartBar className="mr-3 text-green-500" />
                    Pitch Deck
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Slides</h4>
                      <ul className="space-y-2">
                        {pitchData.pitchDeck.slides.map((slide, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{slide}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex space-x-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <FaPlay className="inline mr-2" />
                        View Demo
                      </button>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        <FaDownload className="inline mr-2" />
                        Download Deck
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Sections Below Main Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* Funding Section */}
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
            <div 
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              onClick={() => toggleSection('funding')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaMoneyBillWave className="mr-3 text-green-500 text-2xl" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Funding Options</h3>
                    <p className="text-gray-600 mt-1">Multiple funding sources available</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">6 Options</div>
                    <div className="text-sm text-gray-500">Available</div>
                  </div>
                  <FaChevronDown className={`text-gray-400 text-xl transition-transform duration-200 ${expandedSections.funding ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </div>
            
            {expandedSections.funding && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                          <FaDollarSign className="mr-2 text-green-500" />
                          Self Funding
                        </h4>
                        <span className="text-lg font-bold text-green-600">₹50L</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Personal Savings</span>
                          <span className="text-sm font-semibold text-gray-900">₹30L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Family Investment</span>
                          <span className="text-sm font-semibold text-gray-900">₹15L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Business Loans</span>
                          <span className="text-sm font-semibold text-gray-900">₹5L</span>
                        </div>
                        <div className="border-t border-green-200 pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-900">Timeline</span>
                            <span className="text-sm font-semibold text-gray-900">6 months</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                          <FaUniversity className="mr-2 text-blue-500" />
                          Bank Loans
                        </h4>
                        <span className="text-lg font-bold text-blue-600">₹25-100L</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Term Loans</span>
                          <span className="text-sm font-semibold text-gray-900">8-12%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Working Capital</span>
                          <span className="text-sm font-semibold text-gray-900">12-18%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Equipment Financing</span>
                          <span className="text-sm font-semibold text-gray-900">10-15%</span>
                        </div>
                        <div className="border-t border-blue-200 pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-900">Repayment Period</span>
                            <span className="text-sm font-semibold text-gray-900">3-7 years</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                          <FaHandshake className="mr-2 text-purple-500" />
                          Government Grants & Schemes
                        </h4>
                        <span className="text-lg font-bold text-purple-600">₹10L-2Cr</span>
                      </div>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Startup India Initiative</span>
                          <span className="text-sm font-semibold text-gray-900">₹25L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Stand-Up India</span>
                          <span className="text-sm font-semibold text-gray-900">₹10L-1Cr</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Startup India Fund of Funds</span>
                          <span className="text-sm font-semibold text-gray-900">₹10,000Cr</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">CGTMSE (Collateral-free)</span>
                          <span className="text-sm font-semibold text-gray-900">₹2Cr</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Atal Innovation Mission</span>
                          <span className="text-sm font-semibold text-gray-900">₹50L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">SAMRIDH Scheme</span>
                          <span className="text-sm font-semibold text-gray-900">₹40L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">SIP-EIT (Patent Protection)</span>
                          <span className="text-sm font-semibold text-gray-900">₹15L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Digital India Bhashini</span>
                          <span className="text-sm font-semibold text-gray-900">₹30L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">GeM Marketplace Access</span>
                          <span className="text-sm font-semibold text-gray-900">Direct</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">MUDRA Banks (PMMY)</span>
                          <span className="text-sm font-semibold text-gray-900">₹50K-10L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">MeitY Startup Hub</span>
                          <span className="text-sm font-semibold text-gray-900">₹50L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Startup India Seed Fund</span>
                          <span className="text-sm font-semibold text-gray-900">₹20-50L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Aatmanirbhar App Challenge</span>
                          <span className="text-sm font-semibold text-gray-900">₹25L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">SPICe+ Registration</span>
                          <span className="text-sm font-semibold text-gray-900">Free</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">STP Scheme (IT Export)</span>
                          <span className="text-sm font-semibold text-gray-900">100% Tax Exempt</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">DIDF (Dairy Processing)</span>
                          <span className="text-sm font-semibold text-gray-900">₹1Cr</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Multiplier Grants Scheme</span>
                          <span className="text-sm font-semibold text-gray-900">₹2-10Cr</span>
                        </div>
                        <div className="border-t border-purple-200 pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-900">Processing Time</span>
                            <span className="text-sm font-semibold text-gray-900">3-6 months</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                          <FaUserTie className="mr-2 text-yellow-500" />
                          Angel Investors
                        </h4>
                        <span className="text-lg font-bold text-yellow-600">₹25-100L</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Investment Range</span>
                          <span className="text-sm font-semibold text-gray-900">₹25-100L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Equity Stake</span>
                          <span className="text-sm font-semibold text-gray-900">10-25%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Mentorship</span>
                          <span className="text-sm font-semibold text-gray-900">Included</span>
                        </div>
                        <div className="border-t border-yellow-200 pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-900">Network Access</span>
                            <span className="text-sm font-semibold text-gray-900">Yes</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                          <FaMoneyBillWave className="mr-2 text-green-500" />
                          Venture Capital
                        </h4>
                        <span className="text-lg font-bold text-green-600">₹1-10Cr</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Investment Range</span>
                          <span className="text-sm font-semibold text-gray-900">₹1-10Cr</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Equity Stake</span>
                          <span className="text-sm font-semibold text-gray-900">20-40%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Board Seat</span>
                          <span className="text-sm font-semibold text-gray-900">Yes</span>
                        </div>
                        <div className="border-t border-green-200 pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-900">Due Diligence</span>
                            <span className="text-sm font-semibold text-gray-900">3-6 months</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg p-4 border border-pink-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                          <FaUsers className="mr-2 text-pink-500" />
                          Crowdfunding
                        </h4>
                        <span className="text-lg font-bold text-pink-600">₹10-50L</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Target Amount</span>
                          <span className="text-sm font-semibold text-gray-900">₹10-50L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Campaign Duration</span>
                          <span className="text-sm font-semibold text-gray-900">30-60 days</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Platforms</span>
                          <span className="text-sm font-semibold text-gray-900">4 Available</span>
                        </div>
                        <div className="border-t border-pink-200 pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-900">Success Rate</span>
                            <span className="text-sm font-semibold text-gray-900">65%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Investments Section */}
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
            <div 
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              onClick={() => toggleSection('investments')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaIndustry className="mr-3 text-blue-500 text-2xl" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Investment Breakdown</h3>
                    <p className="text-gray-600 mt-1">Comprehensive cost analysis with subsidy benefits</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">₹25.0L</div>
                    <div className="text-sm text-gray-500">Total Project Cost</div>
                  </div>
                  <FaChevronDown className={`text-gray-400 text-xl transition-transform duration-200 ${expandedSections.investments ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </div>
            
            {expandedSections.investments && (
              <div className="px-6 pb-6 border-t border-gray-100">
                {/* Filter Bar */}
                <div className="mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Tab Navigation */}
                      <div className="flex space-x-1 bg-white rounded-lg p-1 border border-gray-200">
                        <button
                          onClick={() => setActiveFilterTab('funding')}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                            activeFilterTab === 'funding'
                              ? 'bg-blue-500 text-white shadow-sm'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                        >
                          Funding Option
                        </button>
                        <button
                          onClick={() => setActiveFilterTab('category')}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                            activeFilterTab === 'category'
                              ? 'bg-blue-500 text-white shadow-sm'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                        >
                          Category
                        </button>
                      </div>

                      {/* Dropdown */}
                      <div className="flex-1">
                        {activeFilterTab === 'funding' ? (
                          <select
                            value={selectedFundingOption}
                            onChange={(e) => setSelectedFundingOption(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="all">All Funding Options</option>
                            <option value="self-funding">Self Funding</option>
                            <option value="bank-loans">Bank Loans</option>
                            <option value="government-grants">Government Grants & Schemes</option>
                            <option value="angel-investors">Angel Investors</option>
                            <option value="venture-capital">Venture Capital</option>
                            <option value="crowdfunding">Crowdfunding</option>
                          </select>
                        ) : (
                          <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="all">All Categories</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="services">Services</option>
                            <option value="technology">Technology</option>
                            <option value="agriculture">Agriculture</option>
                            <option value="retail">Retail</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="education">Education</option>
                            <option value="food-processing">Food Processing</option>
                            <option value="textiles">Textiles</option>
                            <option value="automotive">Automotive</option>
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                          <FaIndustry className="mr-2 text-blue-500" />
                          Fixed Capital
                        </h4>
                        <span className="text-lg font-bold text-blue-600">₹18.5L</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Land & Building (Rented)</span>
                          <span className="text-sm font-semibold text-gray-900">₹3.0L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Plant & Machinery</span>
                          <span className="text-sm font-semibold text-gray-900">₹12.0L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Furniture & Fixtures</span>
                          <span className="text-sm font-semibold text-gray-900">₹2.0L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Office Equipment</span>
                          <span className="text-sm font-semibold text-gray-900">₹1.5L</span>
                        </div>
                        <div className="border-t border-blue-200 pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-900">Total Fixed Capital</span>
                            <span className="text-sm font-semibold text-gray-900">₹18.5L</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                          <FaTools className="mr-2 text-green-500" />
                          Working Capital
                        </h4>
                        <span className="text-lg font-bold text-green-600">₹6.5L</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Raw Materials (3 months)</span>
                          <span className="text-sm font-semibold text-gray-900">₹3.0L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Packing Materials</span>
                          <span className="text-sm font-semibold text-gray-900">₹1.0L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Utilities & Rent</span>
                          <span className="text-sm font-semibold text-gray-900">₹1.5L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Contingencies</span>
                          <span className="text-sm font-semibold text-gray-900">₹1.0L</span>
                        </div>
                        <div className="border-t border-green-200 pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-900">Total Working Capital</span>
                            <span className="text-sm font-semibold text-gray-900">₹6.5L</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                          <FaUsers className="mr-2 text-purple-500" />
                          Means of Finance
                        </h4>
                        <span className="text-lg font-bold text-purple-600">₹25.0L</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Promoter's Contribution (10%)</span>
                          <span className="text-sm font-semibold text-gray-900">₹2.5L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">PMEGP Subsidy (35%)</span>
                          <span className="text-sm font-semibold text-gray-900">₹8.75L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Bank Loan (55%)</span>
                          <span className="text-sm font-semibold text-gray-900">₹13.75L</span>
                        </div>
                        <div className="border-t border-purple-200 pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-900">Total Means of Finance</span>
                            <span className="text-sm font-semibold text-gray-900">₹25.0L</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                          <FaChartLine className="mr-2 text-orange-500" />
                          Employment Generation
                        </h4>
                        <span className="text-lg font-bold text-orange-600">8 Persons</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Skilled Workers</span>
                          <span className="text-sm font-semibold text-gray-900">4 Persons</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Semi-skilled Workers</span>
                          <span className="text-sm font-semibold text-gray-900">3 Persons</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Unskilled Workers</span>
                          <span className="text-sm font-semibold text-gray-900">1 Person</span>
                        </div>
                        <div className="border-t border-orange-200 pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-900">Total Employment</span>
                            <span className="text-sm font-semibold text-gray-900">8 Persons</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                          <FaFileAlt className="mr-2 text-red-500" />
                          Bank Loan Details
                        </h4>
                        <span className="text-lg font-bold text-red-600">₹13.75L</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Loan Amount</span>
                          <span className="text-sm font-semibold text-gray-900">₹13.75L</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Interest Rate</span>
                          <span className="text-sm font-semibold text-gray-900">11.5% p.a.</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Repayment Period</span>
                          <span className="text-sm font-semibold text-gray-900">7 years</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Processing Fee</span>
                          <span className="text-sm font-semibold text-gray-900">₹2,750</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PMEGP Financial Summary */}
                <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FaChartBar className="mr-2 text-gray-600" />
                    PMEGP Financial Summary
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-semibold text-gray-900 mb-2">Project Cost Structure</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Fixed Capital</span>
                          <span className="text-sm font-semibold">₹18.5L</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Working Capital</span>
                          <span className="text-sm font-semibold">₹6.5L</span>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between font-semibold">
                            <span>Total Project Cost</span>
                            <span>₹25.0L</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-semibold text-gray-900 mb-2">Funding Pattern</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Promoter's Contribution</span>
                          <span className="text-sm font-semibold">₹2.5L (10%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">PMEGP Subsidy</span>
                          <span className="text-sm font-semibold">₹8.75L (35%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Bank Loan</span>
                          <span className="text-sm font-semibold">₹13.75L (55%)</span>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between font-semibold">
                            <span>Total Funding</span>
                            <span>₹25.0L (100%)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-semibold text-gray-900 mb-2">Project Viability</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Annual Turnover</span>
                          <span className="text-sm font-semibold">₹60.0L</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Net Profit (15%)</span>
                          <span className="text-sm font-semibold">₹9.0L</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Break-even Period</span>
                          <span className="text-sm font-semibold">18 months</span>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between font-semibold text-green-600">
                            <span>ROI</span>
                            <span>36%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PMEGP Eligibility & Benefits */}
                <div className="mt-6 bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FaHandshake className="mr-2 text-blue-600" />
                    PMEGP Benefits & Eligibility
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Eligibility Criteria</h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                          <span>Age: 18-45 years</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                          <span>Educational Qualification: 8th pass</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                          <span>Family income should not exceed ₹3.0L per annum</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                          <span>Should not have availed PMEGP assistance earlier</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">PMEGP Benefits</h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                          <span>35% subsidy on project cost</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                          <span>55% bank loan at concessional rates</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                          <span>10% promoter's contribution</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                          <span>Maximum project cost: ₹25.0L</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>



        {/* Skills Required Section */}
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
            <div 
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              onClick={() => toggleSection('skills')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FaGraduationCap className="mr-3 text-purple-500 text-2xl" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Skills Required</h3>
                    <p className="text-gray-600 mt-1">Essential competencies for success</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-600">15+ Skills</div>
                    <div className="text-sm text-gray-500">Required</div>
                  </div>
                  <FaChevronDown className={`text-gray-400 text-xl transition-transform duration-200 ${expandedSections.skills ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </div>
            
            {expandedSections.skills && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                        <FaCog className="mr-2 text-blue-500" />
                        Technical Skills
                      </h4>
                      <span className="text-lg font-bold text-blue-600">8 Skills</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Python Programming</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Required</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Machine Learning</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Required</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">React/JavaScript</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Required</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Cloud Computing</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Required</span>
                      </div>
                      <div className="border-t border-blue-200 pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-900">Certifications</span>
                          <span className="text-sm font-semibold text-gray-900">4 Available</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                        <FaChartPie className="mr-2 text-green-500" />
                        Business Skills
                      </h4>
                      <span className="text-lg font-bold text-green-600">6 Skills</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Business Strategy</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Required</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Market Research</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Required</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Financial Modeling</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Required</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Sales & Marketing</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Required</span>
                      </div>
                      <div className="border-t border-green-200 pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-900">Networking</span>
                          <span className="text-sm font-semibold text-gray-900">4 Channels</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                        <FaUsers className="mr-2 text-purple-500" />
                        Soft Skills
                      </h4>
                      <span className="text-lg font-bold text-purple-600">4 Skills</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Leadership</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Required</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Communication</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Required</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Problem-solving</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Required</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Adaptability</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Required</span>
                      </div>
                      <div className="border-t border-purple-200 pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-900">Development</span>
                          <span className="text-sm font-semibold text-gray-900">4 Programs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <FaComments className="mr-3 text-yellow-500" />
              Rating & Reviews
            </h2>
            <p className="text-gray-600 mt-2">Community feedback and ratings for this business idea</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <FaStar className="mr-2 text-yellow-500" />
                    Reviews & Ratings
                  </h3>
                  <div className="space-y-4">
                    {reviewData.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900">{review.user}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-1">{review.title}</h4>
                        <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <button className="flex items-center space-x-1 hover:text-blue-600">
                            <FaThumbsUp className="w-3 h-3" />
                            <span>{review.helpful}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-red-600">
                            <FaThumbsDown className="w-3 h-3" />
                            <span>{review.unhelpful}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <FaChartBar className="mr-2 text-blue-500" />
                    Rating Summary
                  </h3>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-gray-900">{reviewData.averageRating}</div>
                    <div className="flex items-center justify-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(reviewData.averageRating) ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{reviewData.totalReviews} reviews</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <FaComments className="mr-2 text-green-500" />
                    Add Your Review
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Rating</label>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <button
                            key={i}
                            className="text-2xl text-gray-300 hover:text-yellow-500 transition-colors"
                          >
                            <FaStar />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Title</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Brief title for your review"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">Comment</label>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        placeholder="Share your thoughts about this idea..."
                      />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Ideas Section */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <FaSearch className="mr-3 text-purple-500" />
              Discover Related Ideas
            </h2>
            <p className="text-gray-600 mt-2">Explore similar and trending business ideas that might interest you</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <FaSearch className="mr-2 text-blue-500" />
                  Similar Ideas
                </h3>
                <div className="space-y-3">
                  {relatedIdeasData.similar.map((idea) => (
                    <div key={idea.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{idea.title}</h4>
                        <span className="text-sm text-blue-600">{idea.similarity}% match</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{idea.category}</p>
                      <p className="text-sm text-gray-700">Investment: {idea.investment}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <FaChartLine className="mr-2 text-green-500" />
                  Trending Ideas
                </h3>
                <div className="space-y-3">
                  {relatedIdeasData.trending.map((idea) => (
                    <div key={idea.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{idea.title}</h4>
                        <span className="text-sm text-green-600">+{idea.growth}%</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{idea.category}</p>
                      <p className="text-sm text-gray-700">{idea.trend}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <FaLightbulb className="mr-2 text-purple-500" />
                  Recommended for You
                </h3>
                <div className="space-y-3">
                  {relatedIdeasData.recommended.map((idea) => (
                    <div key={idea.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{idea.title}</h4>
                        <span className="text-sm text-purple-600">{idea.match}% match</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{idea.category}</p>
                      <p className="text-sm text-gray-700">{idea.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default IdeaDetailPage;