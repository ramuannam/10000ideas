import React from 'react';
import { FaArrowLeft, FaSearch, FaFilter, FaDownload, FaShare, FaBookmark, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { useAuth } from '../contexts/AuthContext';

interface GrantScheme {
  id: string;
  name: string;
  category: string;
  ministry: string;
  eligibilityCriteria: string[];
  applicableBusinesses: string[];
  benefits: string[];
  maxAmount: string;
  applicationDeadline: string;
  status: 'active' | 'upcoming' | 'closed';
  description: string;
  documentsRequired: string[];
  applicationProcess: string[];
  contactInfo: string;
  website: string;
}

const GovernmentGrantsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedStatus, setSelectedStatus] = React.useState('all');
  const [selectedMinistry, setSelectedMinistry] = React.useState('all');
  const [selectedAmountRange, setSelectedAmountRange] = React.useState('all');
  const [expandedSections, setExpandedSections] = React.useState<{[key: string]: Set<string>}>({
    criteria: new Set(),
    benefits: new Set(),
    businesses: new Set()
  });
  
  // Header props
  const [activeTab, setActiveTab] = React.useState('Government Grants');
  const { isUserSignedIn, openAuthModal, logout } = useAuth();
  
  const grantsData: GrantScheme[] = [
    {
      id: '1',
      name: 'PMEGP - Prime Minister\'s Employment Generation Programme',
      category: 'Manufacturing',
      ministry: 'Ministry of MSME',
      eligibilityCriteria: [
        'Age between 18-35 years (relaxed for SC/ST/Women/Physically handicapped)',
        'Minimum 8th standard education',
        'Project cost up to ₹25 lakhs for manufacturing and ₹10 lakhs for service sector',
        'No income ceiling for general category',
        'SC/ST/Women/Physically handicapped/Ex-servicemen can apply',
        'Should not have availed any other government subsidy',
        'Family income should not exceed ₹3 lakhs per annum'
      ],
      applicableBusinesses: [
        'Manufacturing units (textiles, food processing, engineering)',
        'Service sector businesses (IT, tourism, healthcare)',
        'Trading activities (retail, wholesale)',
        'Food processing units (dairy, fruits, grains)',
        'Handicrafts and handlooms (traditional arts)',
        'Agro-based industries',
        'Rural entrepreneurship ventures'
      ],
      benefits: [
        'Subsidy up to 35% of project cost (25% for general, 35% for SC/ST/Women)',
        'Margin money subsidy up to 25% of project cost',
        'Bank loan up to 90% of project cost',
        'Training and skill development support',
        'Marketing assistance and market linkage',
        'Technology upgradation support',
        'Quality certification assistance',
        'Export promotion support'
      ],
      maxAmount: '₹25,00,000',
      applicationDeadline: 'Ongoing',
      status: 'active',
      description: 'PMEGP is a credit-linked subsidy program that aims to generate employment opportunities in rural and urban areas through establishment of micro enterprises. It provides financial assistance to set up new micro enterprises and expand existing ones.',
      documentsRequired: [
        'Aadhaar Card (mandatory)',
        'Educational certificates (8th standard minimum)',
        'Detailed project report with cost estimates',
        'Quotations for machinery and equipment',
        'Land/building documents or rental agreement',
        'Bank statements (last 6 months)',
        'Income certificate (for SC/ST/Women)',
        'Caste certificate (for SC/ST)',
        'Disability certificate (if applicable)',
        'Ex-servicemen certificate (if applicable)'
      ],
      applicationProcess: [
        'Submit application to District Industries Centre (DIC)',
        'DIC forwards application to bank for appraisal',
        'Bank conducts technical and financial appraisal',
        'State Level Committee approves the project',
        'Bank disburses loan and subsidy',
        'Regular monitoring and follow-up by DIC',
        'Completion certificate after project implementation'
      ],
      contactInfo: 'District Industries Centre (DIC), Ministry of MSME',
      website: 'https://www.kviconline.gov.in/pmegp'
    },
    {
      id: '2',
      name: 'ASPIRE - A Scheme for Promotion of Innovation, Rural Entrepreneurship and Agro-industry',
      category: 'Agriculture',
      ministry: 'Ministry of MSME',
      eligibilityCriteria: [
        'Startups and entrepreneurs (registered under Companies Act)',
        'Farmer Producer Organizations (FPOs)',
        'Cooperative societies (agriculture-based)',
        'Self Help Groups (SHGs) with agri-business focus',
        'Agri-entrepreneurs with innovative ideas',
        'Rural youth with technical background',
        'Women entrepreneurs in agriculture sector',
        'Graduates from agricultural universities'
      ],
      applicableBusinesses: [
        'Agro-processing units (fruits, vegetables, grains)',
        'Food processing industries (dairy, meat, poultry)',
        'Rural entrepreneurship ventures (handicrafts, textiles)',
        'Innovation in agriculture (precision farming, organic)',
        'Value addition to agricultural products',
        'Cold storage and warehousing facilities',
        'Agricultural machinery and equipment',
        'Bio-fertilizer and organic farming units'
      ],
      benefits: [
        'Financial support up to ₹1 crore (50% grant, 50% loan)',
        'Technology support and training programs',
        'Market linkage assistance and export promotion',
        'Infrastructure development support',
        'Quality certification assistance (FSSAI, ISO)',
        'Research and development support',
        'Skill development and capacity building',
        'Networking and mentorship opportunities'
      ],
      maxAmount: '₹1,00,00,000',
      applicationDeadline: 'Ongoing',
      status: 'active',
      description: 'ASPIRE aims to promote innovation, rural entrepreneurship and agro-industry through financial and technical support. It focuses on creating employment opportunities in rural areas through agri-business ventures.',
      documentsRequired: [
        'Detailed project proposal with technical specifications',
        'Technical feasibility report from recognized institution',
        'Financial projections for 5 years',
        'Land documents (owned or leased)',
        'Partnership deed/registration certificate',
        'Bank statements (last 12 months)',
        'Technical team credentials',
        'Market research and demand analysis',
        'Environmental clearance (if required)',
        'Quality assurance plan'
      ],
      applicationProcess: [
        'Submit detailed project proposal to State Nodal Agency',
        'Technical evaluation by expert committee',
        'Financial appraisal and viability assessment',
        'Approval by competent authority',
        'Release of funds in installments (40%, 30%, 30%)',
        'Regular monitoring and progress reporting',
        'Final evaluation and completion certificate'
      ],
      contactInfo: 'Ministry of MSME, Government of India',
      website: 'https://www.msme.gov.in/aspire'
    },
    {
      id: '3',
      name: 'MUDRA Yojana - Micro Units Development and Refinance Agency',
      category: 'Micro Enterprises',
      ministry: 'Ministry of Finance',
      eligibilityCriteria: [
        'Micro enterprises with loan requirement up to ₹10 lakhs',
        'Small business owners (18-65 years)',
        'Street vendors and hawkers',
        'Small shop owners and retailers',
        'Artisans and craftsmen',
        'Small service providers',
        'Transport operators (auto, taxi, goods carriers)',
        'Small manufacturing units',
        'Food processing units',
        'Rural entrepreneurs'
      ],
      applicableBusinesses: [
        'Small manufacturing units (textiles, food, engineering)',
        'Retail shops and trading activities',
        'Service providers (beauty, repair, maintenance)',
        'Street vendors and mobile businesses',
        'Artisans and craftsmen (handicrafts, handlooms)',
        'Small transport operators (auto, taxi, goods)',
        'Food processing and packaging units',
        'Small construction contractors',
        'Rural entrepreneurship ventures',
        'Women-led businesses'
      ],
      benefits: [
        'Three loan categories: Shishu (₹50,000), Kishore (₹5 lakhs), Tarun (₹10 lakhs)',
        'Collateral-free loans for amounts up to ₹10 lakhs',
        'Low interest rates (starting from 7.5%)',
        'Quick disbursement (within 15-30 days)',
        'Flexible repayment options (up to 7 years)',
        'No processing fees for loans up to ₹10 lakhs',
        'Credit guarantee coverage',
        'Skill development and training support',
        'Digital payment integration',
        'Insurance coverage for borrowers'
      ],
      maxAmount: '₹10,00,000',
      applicationDeadline: 'Ongoing',
      status: 'active',
      description: 'MUDRA provides financial support to micro enterprises through various loan products. It aims to fund the unfunded and promote financial inclusion.',
      documentsRequired: [
        'Aadhaar Card (mandatory)',
        'PAN Card (mandatory)',
        'Business proof (license, registration, bills)',
        'Bank statements (last 6 months)',
        'Identity and address proof',
        'Income certificate (if applicable)',
        'Caste certificate (for SC/ST)',
        'Business plan and project report',
        'Quotations for machinery/equipment',
        'Property documents (if collateral offered)'
      ],
      applicationProcess: [
        'Approach any scheduled commercial bank, NBFC, or MFI',
        'Submit loan application with required documents',
        'Document verification and credit appraisal',
        'Loan approval and sanction letter',
        'Loan disbursement to borrower account',
        'Regular repayment through EMI',
        'Annual review and renewal if required'
      ],
      contactInfo: 'Any scheduled commercial bank, NBFC, or MFI',
      website: 'https://www.mudra.org.in'
    },
    {
      id: '4',
      name: 'Stand-Up India',
      category: 'Women/SC/ST',
      ministry: 'Ministry of Finance',
      eligibilityCriteria: [
        'Women entrepreneurs (18-65 years)',
        'SC/ST entrepreneurs (18-65 years)',
        'Age above 18 years',
        'Greenfield projects only (new ventures)',
        'Manufacturing, trading or services sector',
        'Should not have defaulted on any bank loan',
        'Should not be a willful defaulter',
        'Should not have been declared bankrupt'
      ],
      applicableBusinesses: [
        'Manufacturing units (textiles, food, engineering)',
        'Trading businesses (retail, wholesale, export)',
        'Service sector enterprises (IT, tourism, healthcare)',
        'Greenfield projects (new business ventures)',
        'SMEs in manufacturing/services',
        'Technology-driven startups',
        'Rural entrepreneurship ventures',
        'Traditional handicrafts and handlooms'
      ],
      benefits: [
        'Loan amount from ₹10 lakhs to ₹1 crore',
        'Composite loan (term loan + working capital)',
        'Collateral-free loans up to ₹10 lakhs',
        'Interest rate as per RBI guidelines (starting from 8.5%)',
        'Handholding support for 7 years',
        'Skill development and training',
        'Market linkage assistance',
        'Technology upgradation support',
        'Quality certification assistance',
        'Export promotion support'
      ],
      maxAmount: '₹1,00,00,000',
      applicationDeadline: 'Ongoing',
      status: 'active',
      description: 'Stand-Up India facilitates bank loans between ₹10 lakh and ₹1 crore to at least one SC/ST borrower and one woman borrower per bank branch. It promotes entrepreneurship among women and SC/ST communities.',
      documentsRequired: [
        'Aadhaar Card (mandatory)',
        'PAN Card (mandatory)',
        'Caste certificate (for SC/ST applicants)',
        'Detailed project report with financial projections',
        'Quotations for machinery and equipment',
        'Land/building documents or rental agreement',
        'Bank statements (last 12 months)',
        'Income certificate (for SC/ST)',
        'Business plan and market analysis',
        'Technical feasibility report',
        'Environmental clearance (if required)',
        'Quality assurance plan'
      ],
      applicationProcess: [
        'Submit application to designated bank branch',
        'Project appraisal by bank officials',
        'Technical and financial evaluation',
        'Loan approval and sanction letter',
        'Disbursement in installments',
        'Regular monitoring and follow-up',
        'Annual review and renewal if required'
      ],
      contactInfo: 'All scheduled commercial banks',
      website: 'https://www.standupmitra.in'
    },
    {
      id: '5',
      name: 'Startup India Seed Fund Scheme',
      category: 'Technology',
      ministry: 'Ministry of Commerce and Industry',
      eligibilityCriteria: [
        'DPIIT-recognized startups (registered under Companies Act)',
        'Incorporated not more than 2 years ago',
        'Innovative business model with technology focus',
        'Technology-driven solutions (AI, ML, IoT, Blockchain)',
        'Scalable business model with market potential',
        'Should not have received funding from other government schemes',
        'Should have innovative product/service',
        'Should be working on proof of concept or prototype'
      ],
      applicableBusinesses: [
        'Technology startups (software, hardware, IoT)',
        'Innovation-driven enterprises (AI, ML, Blockchain)',
        'Digital solutions (fintech, healthtech, edtech)',
        'AI/ML startups (automation, analytics, robotics)',
        'Fintech startups (payments, lending, insurance)',
        'Healthtech startups (telemedicine, diagnostics)',
        'Edtech startups (online learning, skill development)',
        'Clean energy startups (solar, wind, waste management)',
        'Agri-tech startups (precision farming, supply chain)',
        'E-commerce and marketplace platforms'
      ],
      benefits: [
        'Seed funding up to ₹50 lakhs (matching contribution)',
        'Matching contribution from eligible incubators',
        'Support for proof of concept development',
        'Prototype development and testing',
        'Market entry assistance and validation',
        'Mentorship and networking opportunities',
        'Access to incubator infrastructure',
        'Technical and business support',
        'Patent filing assistance',
        'International market access support'
      ],
      maxAmount: '₹50,00,000',
      applicationDeadline: 'Ongoing',
      status: 'active',
      description: 'The scheme provides seed funding to eligible startups through eligible incubators for proof of concept, prototype development, product trials, market entry, and commercialization. It aims to promote innovation and entrepreneurship.',
      documentsRequired: [
        'DPIIT recognition certificate (mandatory)',
        'Detailed business plan with financial projections',
        'Financial projections for 3 years',
        'Team details and credentials',
        'Innovation proof and technical specifications',
        'Incubator recommendation letter',
        'Market research and demand analysis',
        'Intellectual property details (if any)',
        'Technical feasibility report',
        'Competitive analysis and differentiation'
      ],
      applicationProcess: [
        'Register on Startup India portal and get DPIIT recognition',
        'Submit application through eligible incubator',
        'Evaluation by expert committee (technical and business)',
        'Approval and fund disbursement in installments',
        'Regular progress monitoring and reporting',
        'Final evaluation and completion certificate',
        'Post-funding support and mentorship'
      ],
      contactInfo: 'Startup India Team, DPIIT',
      website: 'https://www.startupindia.gov.in'
    },
    {
      id: '6',
      name: 'PM FME - Pradhan Mantri Formalisation of Micro Food Processing Enterprises',
      category: 'Food Processing',
      ministry: 'Ministry of Food Processing Industries',
      eligibilityCriteria: [
        'Micro food processing enterprises (annual turnover < ₹1.5 crore)',
        'Individual entrepreneurs (18-65 years)',
        'Self Help Groups (SHGs) with food processing focus',
        'Producer Cooperatives (agriculture-based)',
        'Farmer Producer Organizations (FPOs)',
        'Small food processing units',
        'Traditional food processors',
        'Women entrepreneurs in food processing'
      ],
      applicableBusinesses: [
        'Food processing units (fruits, vegetables, grains)',
        'Agro-processing industries (dairy, meat, poultry)',
        'Dairy processing (milk, cheese, yogurt)',
        'Fruit and vegetable processing (juices, jams, pickles)',
        'Grain processing (flour, rice, pulses)',
        'Spice processing (powders, pastes, oils)',
        'Beverage processing (tea, coffee, juices)',
        'Bakery and confectionery units',
        'Traditional food processing (pickles, papads)',
        'Organic food processing units'
      ],
      benefits: [
        'Credit-linked subsidy up to 35% of project cost',
        'Support for technology upgradation and modernization',
        'Quality certification assistance (FSSAI, ISO)',
        'Branding and marketing support',
        'Training and capacity building programs',
        'Infrastructure development support',
        'Market linkage assistance',
        'Export promotion support',
        'Cold storage and packaging support',
        'Digital payment integration'
      ],
      maxAmount: '₹10,00,000',
      applicationDeadline: 'Ongoing',
      status: 'active',
      description: 'PM FME aims to enhance the competitiveness of existing individual micro-enterprises in the unorganized segment of the food processing industry. It focuses on formalization and modernization.',
      documentsRequired: [
        'Aadhaar Card (mandatory)',
        'Business registration proof (GST, FSSAI)',
        'Detailed project report with cost estimates',
        'Quotations for machinery and equipment',
        'Land/building documents or rental agreement',
        'Bank statements (last 12 months)',
        'Income certificate (if applicable)',
        'Technical feasibility report',
        'Quality assurance plan',
        'Environmental clearance (if required)',
        'FSSAI license or application'
      ],
      applicationProcess: [
        'Submit application to State Nodal Agency (SNA)',
        'Project appraisal by technical committee',
        'Approval by competent authority',
        'Disbursement of subsidy in installments',
        'Implementation and regular monitoring',
        'Quality certification and compliance',
        'Final evaluation and completion certificate'
      ],
      contactInfo: 'State Nodal Agencies for Food Processing',
      website: 'https://www.mofpi.gov.in/pm-fme'
    },
    {
      id: '7',
      name: 'Atal Innovation Mission (AIM)',
      category: 'Technology',
      ministry: 'NITI Aayog',
      eligibilityCriteria: [
        'Innovative startups and entrepreneurs',
        'Students and young innovators',
        'Research institutions and universities',
        'Technology-driven solutions',
        'Focus on social impact',
        'Scalable business models',
        'Age between 18-35 years for individual applicants'
      ],
      applicableBusinesses: [
        'Technology startups (AI, ML, IoT)',
        'Social impact ventures',
        'Clean energy solutions',
        'Healthcare innovations',
        'Education technology',
        'Agricultural technology',
        'Smart city solutions',
        'Digital governance platforms',
        'Financial inclusion technologies',
        'Environmental sustainability solutions'
      ],
      benefits: [
        'Grant support up to ₹1 crore',
        'Mentorship and incubation support',
        'Access to innovation ecosystem',
        'Technology transfer assistance',
        'Market validation support',
        'International collaboration opportunities',
        'Patent filing assistance',
        'Skill development programs',
        'Networking and events',
        'Research and development support'
      ],
      maxAmount: '₹1,00,00,000',
      applicationDeadline: 'Ongoing',
      status: 'active',
      description: 'AIM promotes innovation and entrepreneurship across India through various programs including Atal Incubation Centers, Atal Community Innovation Centers, and Atal New India Challenges.',
      documentsRequired: [
        'Detailed project proposal',
        'Innovation proof and technical specifications',
        'Financial projections for 3 years',
        'Team credentials and experience',
        'Market research and demand analysis',
        'Social impact assessment',
        'Technical feasibility report',
        'Intellectual property details',
        'Partnership agreements (if any)',
        'Environmental impact assessment'
      ],
      applicationProcess: [
        'Submit application through AIM portal',
        'Initial screening and evaluation',
        'Technical review by expert panel',
        'Pitch presentation and demonstration',
        'Final selection and approval',
        'Grant disbursement in installments',
        'Regular monitoring and progress reporting',
        'Impact assessment and evaluation'
      ],
      contactInfo: 'Atal Innovation Mission, NITI Aayog',
      website: 'https://aim.gov.in'
    },
    {
      id: '8',
      name: 'SAMRIDH Scheme - Startup Accelerators of MeitY for Product Innovation, Development and Growth',
      category: 'Technology',
      ministry: 'Ministry of Electronics and Information Technology',
      eligibilityCriteria: [
        'DPIIT-recognized startups',
        'Technology-driven products/services',
        'Innovative solutions with market potential',
        'Scalable business models',
        'Focus on digital transformation',
        'Should not have received similar funding',
        'Should be in early to growth stage'
      ],
      applicableBusinesses: [
        'Software product startups',
        'Hardware and IoT solutions',
        'Digital transformation services',
        'AI/ML applications',
        'Cybersecurity solutions',
        'Fintech platforms',
        'Healthtech innovations',
        'Edtech platforms',
        'E-commerce solutions',
        'Smart city technologies'
      ],
      benefits: [
        'Grant support up to ₹40 lakhs',
        'Mentorship and acceleration support',
        'Market access and validation',
        'Technology infrastructure access',
        'International market entry support',
        'Patent filing and IP protection',
        'Quality certification assistance',
        'Networking and partnership opportunities',
        'Skill development and training',
        'Export promotion support'
      ],
      maxAmount: '₹40,00,000',
      applicationDeadline: 'Ongoing',
      status: 'active',
      description: 'SAMRIDH aims to accelerate the growth of software product startups by providing funding, mentorship, and market access support.',
      documentsRequired: [
        'DPIIT recognition certificate',
        'Detailed business plan',
        'Technical specifications and innovation proof',
        'Financial projections for 3 years',
        'Team credentials and experience',
        'Market research and competitive analysis',
        'Product roadmap and milestones',
        'Intellectual property details',
        'Customer testimonials and traction',
        'Technical architecture and scalability plan'
      ],
      applicationProcess: [
        'Submit application through SAMRIDH portal',
        'Initial screening and shortlisting',
        'Technical evaluation by expert panel',
        'Pitch presentation and product demo',
        'Final selection and approval',
        'Grant disbursement in milestones',
        'Regular monitoring and progress tracking',
        'Market validation and scaling support'
      ],
      contactInfo: 'MeitY Startup Hub',
      website: 'https://meitystartuphub.in'
    }
  ];

  const categories = ['all', 'Manufacturing', 'Agriculture', 'Micro Enterprises', 'Women/SC/ST', 'Technology', 'Food Processing', 'Innovation', 'Rural Development'];
  const statuses = ['all', 'active', 'upcoming', 'closed'];
  const ministries = ['all', 'Ministry of MSME', 'Ministry of Finance', 'Ministry of Commerce and Industry', 'Ministry of Food Processing Industries', 'NITI Aayog', 'Ministry of Electronics and Information Technology'];
  const amountRanges = ['all', 'Under ₹10L', '₹10L-50L', '₹50L-1Cr', '₹1Cr-5Cr', 'Above ₹5Cr'];

  const filteredGrants = grantsData.filter(grant => {
    const matchesSearch = grant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grant.ministry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grant.applicableBusinesses.some(business => 
                           business.toLowerCase().includes(searchTerm.toLowerCase())
                         ) ||
                         grant.benefits.some(benefit => 
                           benefit.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = selectedCategory === 'all' || grant.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || grant.status === selectedStatus;
    const matchesMinistry = selectedMinistry === 'all' || grant.ministry === selectedMinistry;
    
    // Amount range filtering
    let matchesAmountRange = true;
    if (selectedAmountRange !== 'all') {
      const amount = parseInt(grant.maxAmount.replace(/[^\d]/g, ''));
      switch (selectedAmountRange) {
        case 'Under ₹10L':
          matchesAmountRange = amount < 1000000;
          break;
        case '₹10L-50L':
          matchesAmountRange = amount >= 1000000 && amount <= 5000000;
          break;
        case '₹50L-1Cr':
          matchesAmountRange = amount > 5000000 && amount <= 10000000;
          break;
        case '₹1Cr-5Cr':
          matchesAmountRange = amount > 10000000 && amount <= 50000000;
          break;
        case 'Above ₹5Cr':
          matchesAmountRange = amount > 50000000;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesStatus && matchesMinistry && matchesAmountRange;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Manufacturing': 'bg-blue-100 text-blue-800',
      'Agriculture': 'bg-green-100 text-green-800',
      'Micro Enterprises': 'bg-purple-100 text-purple-800',
      'Women/SC/ST': 'bg-pink-100 text-pink-800',
      'Technology': 'bg-indigo-100 text-indigo-800',
      'Food Processing': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const toggleSectionExpansion = (grantId: string, section: 'criteria' | 'benefits' | 'businesses') => {
    const newExpandedSections = { ...expandedSections };
    const sectionSet = new Set(newExpandedSections[section]);
    
    if (sectionSet.has(grantId)) {
      sectionSet.delete(grantId);
    } else {
      sectionSet.add(grantId);
    }
    
    newExpandedSections[section] = sectionSet;
    setExpandedSections(newExpandedSections);
  };

  const isSectionExpanded = (grantId: string, section: 'criteria' | 'benefits' | 'businesses') => 
    expandedSections[section].has(grantId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaArrowLeft />
              <span>Back</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Government Grants & Schemes</h1>
              <p className="text-gray-600 mt-2">Discover funding opportunities for your business</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FaDownload />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FaShare />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search grants, schemes, benefits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                {categories.filter(cat => cat !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedMinistry}
                onChange={(e) => setSelectedMinistry(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Ministries</option>
                {ministries.filter(ministry => ministry !== 'all').map(ministry => (
                  <option key={ministry} value={ministry}>{ministry.replace('Ministry of ', '')}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedAmountRange}
                onChange={(e) => setSelectedAmountRange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Amounts</option>
                {amountRanges.filter(range => range !== 'all').map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                {statuses.filter(status => status !== 'all').map(status => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredGrants.length}</span> grants and schemes
          </p>
        </div>

        {/* Grants Grid */}
        <div className="columns-1 lg:columns-2 gap-6 space-y-6">
                      {filteredGrants.map((grant) => (
                             <div key={grant.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow break-inside-avoid mb-6">
                               <div className="p-6">
                                 {/* Header */}
                 <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{grant.name}</h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(grant.category)}`}>
                        {grant.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(grant.status)}`}>
                        {grant.status.charAt(0).toUpperCase() + grant.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <FaBookmark />
                  </button>
                </div>

                {/* Ministry */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Ministry:</span> {grant.ministry}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4 line-clamp-3">{grant.description}</p>

                {/* Key Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Maximum Amount</p>
                    <p className="font-semibold text-green-600">{grant.maxAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="font-semibold text-gray-900">{grant.applicationDeadline}</p>
                  </div>
                </div>

                {/* Eligibility Preview */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Key Eligibility Criteria:</h4>
                  <ul className="space-y-1">
                    {grant.eligibilityCriteria.slice(0, 3).map((criteria, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {criteria}
                      </li>
                    ))}
                    {!isSectionExpanded(grant.id, 'criteria') && grant.eligibilityCriteria.length > 3 && (
                      <li 
                        className="text-sm text-blue-600 font-medium cursor-pointer hover:text-blue-800 transition-colors flex items-center"
                        onClick={() => toggleSectionExpansion(grant.id, 'criteria')}
                      >
                        +{grant.eligibilityCriteria.length - 3} more criteria
                        <FaChevronDown className="ml-1 text-xs" />
                      </li>
                    )}
                    {isSectionExpanded(grant.id, 'criteria') && grant.eligibilityCriteria.slice(3).map((criteria, index) => (
                      <li key={index + 3} className="text-sm text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {criteria}
                      </li>
                    ))}
                    {isSectionExpanded(grant.id, 'criteria') && (
                      <li 
                        className="text-sm text-blue-600 font-medium cursor-pointer hover:text-blue-800 transition-colors flex items-center"
                        onClick={() => toggleSectionExpansion(grant.id, 'criteria')}
                      >
                        Show less
                        <FaChevronUp className="ml-1 text-xs" />
                      </li>
                    )}
                  </ul>
                </div>

                {/* Benefits Preview */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {grant.benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-blue-500 mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                    {!isSectionExpanded(grant.id, 'benefits') && grant.benefits.length > 3 && (
                      <li 
                        className="text-sm text-blue-600 font-medium cursor-pointer hover:text-blue-800 transition-colors flex items-center"
                        onClick={() => toggleSectionExpansion(grant.id, 'benefits')}
                      >
                        +{grant.benefits.length - 3} more benefits
                        <FaChevronDown className="ml-1 text-xs" />
                      </li>
                    )}
                    {isSectionExpanded(grant.id, 'benefits') && grant.benefits.slice(3).map((benefit, index) => (
                      <li key={index + 3} className="text-sm text-gray-600 flex items-start">
                        <span className="text-blue-500 mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                    {isSectionExpanded(grant.id, 'benefits') && (
                      <li 
                        className="text-sm text-blue-600 font-medium cursor-pointer hover:text-blue-800 transition-colors flex items-center"
                        onClick={() => toggleSectionExpansion(grant.id, 'benefits')}
                      >
                        Show less
                        <FaChevronUp className="ml-1 text-xs" />
                      </li>
                    )}
                  </ul>
                </div>

                {/* Applicable Businesses Preview */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Suitable For:</h4>
                  <div className="flex flex-wrap gap-1">
                    {grant.applicableBusinesses.slice(0, 4).map((business, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {business}
                      </span>
                    ))}
                    {!isSectionExpanded(grant.id, 'businesses') && grant.applicableBusinesses.length > 4 && (
                      <span 
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium cursor-pointer hover:bg-blue-200 transition-colors flex items-center"
                        onClick={() => toggleSectionExpansion(grant.id, 'businesses')}
                      >
                        +{grant.applicableBusinesses.length - 4} more
                        <FaChevronDown className="ml-1 text-xs" />
                      </span>
                    )}
                    {isSectionExpanded(grant.id, 'businesses') && grant.applicableBusinesses.slice(4).map((business, index) => (
                      <span key={index + 4} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {business}
                      </span>
                    ))}
                    {isSectionExpanded(grant.id, 'businesses') && (
                      <span 
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium cursor-pointer hover:bg-blue-200 transition-colors flex items-center"
                        onClick={() => toggleSectionExpansion(grant.id, 'businesses')}
                      >
                        Show less
                        <FaChevronUp className="ml-1 text-xs" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => window.open(grant.website, '_blank')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply Now
                  </button>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Contact: {grant.contactInfo}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredGrants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No grants found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default GovernmentGrantsPage; 