export const IDEA_CATEGORIES = [
  { value: '', label: 'Select a category' },
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'environment', label: 'Environment' },
  { value: 'social-impact', label: 'Social Impact' },
  { value: 'business', label: 'Business' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'food-beverage', label: 'Food & Beverage' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'sports', label: 'Sports' },
  { value: 'entertainment', label: 'Entertainment & Media' },
  { value: 'travel', label: 'Travel & Tourism' },
  { value: 'other', label: 'Other' }
] as const;

export const TIMEFRAME_OPTIONS = [
  { value: '', label: 'Select timeframe' },
  { value: '3-6-months', label: '3-6 months' },
  { value: '6-12-months', label: '6-12 months' },
  { value: '1-2-years', label: '1-2 years' },
  { value: '2-years', label: '2+ years' }
] as const;

export const FORM_STEPS = [
  { 
    id: 'wind-rose', 
    name: 'Wind Rose',
    description: 'Your idea has the power to ignite change, so don\'t hesitate to submit it and let the world witness your brilliance'
  },
  { 
    id: 'albert-einstein', 
    name: 'Albert Einstein',
    description: 'Innovation distinguishes between a leader and a follower'
  },
  { 
    id: 'walt-disney', 
    name: 'Walt Disney',
    description: 'The way to get started is to quit talking and begin doing'
  },
  { 
    id: 'steve-jobs', 
    name: 'Steve Jobs',
    description: 'Innovation distinguishes between a leader and a follower'
  },
  { 
    id: 'bill-gates', 
    name: 'Bill Gates',
    description: 'Your most unhappy customers are your greatest source of learning'
  },
  { 
    id: 'mark-zuckerberg', 
    name: 'Mark Zuckerberg',
    description: 'The biggest risk is not taking any risk'
  },
  { 
    id: 'guy-kawasaki', 
    name: 'Guy Kawasaki',
    description: 'Ideas are easy. Implementation is hard'
  },
  { 
    id: 'paul-graham', 
    name: 'Paul Graham',
    description: 'A startup is a company designed to grow fast'
  }
] as const;

export const INITIAL_FORM_DATA = {
  title: '',
  category: '',
  description: '',
  investmentNeeded: '',
  targetMarket: '',
  expectedROI: '',
  timeframe: '',
  resources: '',
  expertise: '',
  challenges: '',
  contactEmail: '',
  contactPhone: '',
  name: ''
} as const; 