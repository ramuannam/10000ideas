import { FilterData, IdeaCard } from '../types/allIdeas.ts';
import { CATEGORIES_CONFIG } from './categories.ts';

// Generate categories from the CATEGORIES_CONFIG
const generateCategoriesFromConfig = () => {
  const categories = [{ value: '', label: 'All Categories' }];
  
  Object.keys(CATEGORIES_CONFIG).forEach(category => {
    // Convert category name to a value (lowercase, hyphenated)
    const categoryValue = category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
    categories.push({
      value: categoryValue,
      label: category
    });
  });
  
  return categories;
};

// Generate subcategories for filtering
const generateSubcategoriesFromConfig = () => {
  const subcategories = [{ value: '', label: 'All Subcategories' }];
  
  Object.entries(CATEGORIES_CONFIG).forEach(([category, subs]) => {
    subs.forEach(sub => {
      const categoryValue = category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
      const subValue = `${categoryValue}-${sub.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and').replace(/[()]/g, '')}`;
      subcategories.push({
        value: subValue,
        label: sub // Show only the subcategory name for cleaner display
      });
    });
  });
  
  return subcategories;
};

export const FILTER_DATA: FilterData = {
  categories: generateCategoriesFromConfig(),
  subcategories: generateSubcategoriesFromConfig(),
  investmentRanges: [
    { value: '', label: 'Any Range' },
    { value: '0-50000', label: '₹0 - ₹50,000' },
    { value: '50000-500000', label: '₹50,000 - ₹5,00,000' },
    { value: '500000-2500000', label: '₹5,00,000 - ₹25,00,000' },
    { value: '2500000-8000000', label: '₹25,00,000 - ₹80,00,000' },
    { value: '8000000-40000000', label: '₹80,00,000 - ₹4,00,00,000' },
    { value: '40000000+', label: '₹4,00,00,000+' }
  ],
  buildDifficulties: [
    { value: '', label: 'Any Difficulty' },
    { value: 'easy', label: 'Easy' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'challenging', label: 'Challenging' }
  ],
  marketScoreOptions: [
    { value: '', label: 'Any Score' },
    { value: '5-6', label: '5-6 (Average)' },
    { value: '7-8', label: '7-8 (Good)' },
    { value: '9-10', label: '9+ (Exceptional)' }
  ],
  painPointScoreOptions: [
    { value: '', label: 'Any Score' },
    { value: '5-6', label: '5-6 (Moderate)' },
    { value: '7-8', label: '7-8 (Important)' },
    { value: '9-10', label: '9+ (Critical)' }
  ],
  timingScoreOptions: [
    { value: '', label: 'Any Score' },
    { value: '5-6', label: '5-6 (Okay)' },
    { value: '7-8', label: '7-8 (Good)' },
    { value: '9-10', label: '9+ (Perfect)' }
  ],
  scoreOptions: [
    { value: '', label: 'Any Score' },
    { value: '0-3', label: '1-3' },
    { value: '4-6', label: '4-6' },
    { value: '7-8', label: '7-8' },
    { value: '9-10', label: '9-10' }
  ],
  ideaTypes: [
    { value: '', label: 'Any Type' },
    { value: 'new-tech', label: 'New Tech' },
    { value: 'women-focused', label: 'Women Focused' },
    { value: 'unicorn-ideas', label: 'Unicorn Ideas' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'service-ideas', label: 'Service Ideas' },
    { value: 'middle-class', label: 'Middle Class' },
    { value: 'rural-focused', label: 'Rural Focused' }
  ]
};

export const INITIAL_FILTERS = {
  searchTerm: '',
  category: '',
  subcategory: '',
  investmentRange: '',
  buildDifficulty: '',
  marketScore: '',
  painPointScore: '',
  timingScore: '',
  ideaType: ''
};

export const HARDCODED_IDEAS: IdeaCard[] = [
  {
    id: '1',
    title: 'Smart Vertical Farming for Urban Areas',
    description: 'Automated vertical farming system using IoT sensors and AI for optimal crop management in limited urban spaces.',
    category: 'agriculture',
    subcategory: 'agriculture-agri-tech-solutions',
    tags: ['Massive market', 'Perfect timing'],
    investment: {
      min: 4000000,
      max: 16000000,
      currency: '₹'
    },
    difficulty: 'Moderate',
    marketScore: 9,
    painPointScore: 8,
    timingScore: 9,
    ideaType: 'New Tech',
    specialAdvantages: ['Rural entrepreneurs can leverage traditional farming knowledge'],
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=250&fit=crop',
    isFavorite: false
  },
  {
    id: '2',
    title: 'Women-Only Co-working Spaces',
    description: 'Safe, supportive co-working spaces designed specifically for women entrepreneurs and professionals.',
    category: 'for-women',
    subcategory: 'for-women-others',
    tags: ['Clear distribution', 'Organic growth'],
    investment: {
      min: 2500000,
      max: 8000000,
      currency: '₹'
    },
    difficulty: 'Moderate',
    marketScore: 7,
    painPointScore: 9,
    timingScore: 8,
    ideaType: 'Women Focused',
    specialAdvantages: ['Single mothers get childcare support and flexible hours'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop',
    isFavorite: false
  },
  {
    id: '3',
    title: 'AI-Powered Personal Finance Assistant',
    description: 'Intelligent personal finance app that uses AI to provide personalized budgeting, investment advice, and financial planning.',
    category: 'technology',
    subcategory: 'technology-fintech',
    tags: ['10x better', 'Massive market'],
    investment: {
      min: 16000000,
      max: 80000000,
      currency: '₹'
    },
    difficulty: 'Challenging',
    marketScore: 10,
    painPointScore: 9,
    timingScore: 9,
    ideaType: 'Unicorn Ideas',
    specialAdvantages: ['Accessible to lower middle class with micro-investment features'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    isFavorite: false
  },
  {
    id: '4',
    title: 'Organic Food Processing Unit',
    description: 'Small-scale organic food processing unit for rural farmers to add value to their produce and reduce wastage.',
    category: 'manufacturing',
    subcategory: 'manufacturing-food-processing',
    tags: ['High margins', 'Proven'],
    investment: {
      min: 8000000,
      max: 40000000,
      currency: '₹'
    },
    difficulty: 'Moderate',
    marketScore: 8,
    painPointScore: 7,
    timingScore: 8,
    ideaType: 'Manufacturing',
    specialAdvantages: ['Rural communities can directly benefit from local produce'],
    image: 'https://images.unsplash.com/photo-1594824883197-f75c3b6d5c72?w=400&h=250&fit=crop',
    isFavorite: false
  },
  {
    id: '5',
    title: 'Mobile Repair & Electronics Service',
    description: 'Door-to-door mobile and electronics repair service targeting middle-class households and small businesses.',
    category: 'professional-services',
    subcategory: 'professional-services-consulting',
    tags: ['Clear distribution', 'Solo founder friendly'],
    investment: {
      min: 400000,
      max: 1200000,
      currency: '₹'
    },
    difficulty: 'Easy',
    marketScore: 6,
    painPointScore: 8,
    timingScore: 7,
    ideaType: 'Service Ideas',
    specialAdvantages: ['Specially abled individuals can work from home doing remote diagnostics'],
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=250&fit=crop',
    isFavorite: false
  },
  {
    id: '6',
    title: 'Affordable Solar Water Heaters',
    description: 'Cost-effective solar water heating solutions designed for middle-class households with government subsidy support.',
    category: 'manufacturing',
    subcategory: 'manufacturing-renewable-energy',
    tags: ['Perfect timing', 'Massive market'],
    investment: {
      min: 1600000,
      max: 6400000,
      currency: '₹'
    },
    difficulty: 'Moderate',
    marketScore: 7,
    painPointScore: 6,
    timingScore: 9,
    ideaType: 'Middle Class',
    specialAdvantages: ['Government solar subsidies reduce customer costs significantly'],
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop',
    isFavorite: false
  },
  {
    id: '7',
    title: 'Online Language Learning Platform',
    description: 'Interactive online platform for learning regional Indian languages with AI-powered pronunciation coaching.',
    category: 'education',
    subcategory: 'education-language-learning',
    tags: ['Scalable', 'Growing market'],
    investment: {
      min: 800000,
      max: 5000000,
      currency: '₹'
    },
    difficulty: 'Moderate',
    marketScore: 8,
    painPointScore: 7,
    timingScore: 8,
    ideaType: 'New Tech',
    specialAdvantages: ['Rural students can access quality language education'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
    isFavorite: false
  },
  {
    id: '8',
    title: 'Eco-Tourism Adventure Packages',
    description: 'Sustainable tourism packages focusing on local culture, wildlife, and environmental conservation.',
    category: 'travel-and-tourism',
    subcategory: 'travel-and-tourism-eco-tourism',
    tags: ['Sustainable', 'Experience-based'],
    investment: {
      min: 1200000,
      max: 4500000,
      currency: '₹'
    },
    difficulty: 'Easy',
    marketScore: 6,
    painPointScore: 5,
    timingScore: 7,
    ideaType: 'Service Ideas',
    specialAdvantages: ['Rural communities benefit from tourism revenue'],
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop',
    isFavorite: false
  },
  {
    id: '9',
    title: 'Fitness Training Studio for Women',
    description: 'Women-only fitness studio with personalized training programs, childcare facilities, and wellness coaching.',
    category: 'for-women',
    subcategory: 'for-women-fitness',
    tags: ['Niche market', 'Community building'],
    investment: {
      min: 1500000,
      max: 6000000,
      currency: '₹'
    },
    difficulty: 'Easy',
    marketScore: 7,
    painPointScore: 8,
    timingScore: 8,
    ideaType: 'Women Focused',
    specialAdvantages: ['Safe space for women with cultural considerations'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
    isFavorite: false
  },
  {
    id: '10',
    title: 'Food Truck Network',
    description: 'Network of gourmet food trucks serving regional cuisines at corporate areas and events.',
    category: 'food-and-beverage',
    subcategory: 'food-and-beverage-food-truck',
    tags: ['Low overhead', 'Flexible location'],
    investment: {
      min: 800000,
      max: 2500000,
      currency: '₹'
    },
    difficulty: 'Easy',
    marketScore: 6,
    painPointScore: 6,
    timingScore: 7,
    ideaType: 'Service Ideas',
    specialAdvantages: ['Local chefs can showcase regional specialties'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
    isFavorite: false
  },
  {
    id: '11',
    title: 'EdTech for Rural Schools',
    description: 'Digital learning platform designed for rural schools with offline capabilities and vernacular language support.',
    category: 'technology',
    subcategory: 'technology-edtech',
    tags: ['Social impact', 'Government support'],
    investment: {
      min: 5000000,
      max: 25000000,
      currency: '₹'
    },
    difficulty: 'Challenging',
    marketScore: 9,
    painPointScore: 10,
    timingScore: 8,
    ideaType: 'Rural Focused',
    specialAdvantages: ['Government education initiatives provide funding opportunities'],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop',
    isFavorite: false
  },
  {
    id: '12',
    title: 'Sustainable Fashion Brand',
    description: 'Ethical fashion brand using organic materials and traditional Indian craftsmanship techniques.',
    category: 'fashion',
    subcategory: 'fashion-sustainable-fashion',
    tags: ['Trending', 'Export potential'],
    investment: {
      min: 2000000,
      max: 8000000,
      currency: '₹'
    },
    difficulty: 'Moderate',
    marketScore: 7,
    painPointScore: 6,
    timingScore: 9,
    ideaType: 'Manufacturing',
    specialAdvantages: ['Artisan communities get direct employment opportunities'],
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=250&fit=crop',
    isFavorite: false
  },
  {
    id: '13',
    title: 'Telemedicine Platform for Rural Areas',
    description: 'Digital healthcare platform connecting rural patients with specialists through video consultations and health monitoring.',
    category: 'technology',
    subcategory: 'technology-software',
    tags: ['Healthcare access', 'Government backing'],
    investment: {
      min: 3000000,
      max: 15000000,
      currency: '₹'
    },
    difficulty: 'Challenging',
    marketScore: 9,
    painPointScore: 10,
    timingScore: 10,
    ideaType: 'Rural Focused',
    specialAdvantages: ['Government healthcare initiatives provide support and funding'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
    isFavorite: false
  },
  {
    id: '14',
    title: 'Local Handicrafts E-commerce Platform',
    description: 'Online marketplace exclusively for local artisans and handicraft makers to sell directly to consumers.',
    category: 'technology',
    subcategory: 'technology-e-commerce',
    tags: ['Artisan support', 'Cultural preservation'],
    investment: {
      min: 1000000,
      max: 5000000,
      currency: '₹'
    },
    difficulty: 'Moderate',
    marketScore: 6,
    painPointScore: 7,
    timingScore: 6,
    ideaType: 'Rural Focused',
    specialAdvantages: ['Direct income for rural artisans and cultural preservation'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
    isFavorite: false
  }
]; 