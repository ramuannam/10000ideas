export interface IdeaFormData {
  title: string;
  category: string;
  description: string;
  investmentNeeded: string;
  targetMarket: string;
  expectedROI: string;
  timeframe: string;
  resources: string;
  expertise: string;
  challenges: string;
  contactEmail: string;
  contactPhone: string;
  name: string;
}

export interface StepData {
  id: string;
  name: string;
  description?: string;
}

export interface FormSectionProps {
  formData: IdeaFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
} 