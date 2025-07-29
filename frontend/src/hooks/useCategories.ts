import { useState, useEffect } from 'react';
import { CATEGORIES_CONFIG } from '../constants/categories.ts';

export const useCategories = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(cat => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  const openCategoriesDropdown = () => {
    setExpandedCategories(Object.keys(CATEGORIES_CONFIG));
    setIsCategoriesOpen(true);
  };

  const closeCategoriesDropdown = () => {
    setIsCategoriesOpen(false);
  };

  const toggleCategoriesDropdown = () => {
    if (!isCategoriesOpen) {
      openCategoriesDropdown();
    } else {
      closeCategoriesDropdown();
    }
  };

  // Close categories dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isCategoriesOpen && !target.closest('.categories-dropdown')) {
        setIsCategoriesOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCategoriesOpen]);

  return {
    isCategoriesOpen,
    expandedCategories,
    toggleCategory,
    openCategoriesDropdown,
    closeCategoriesDropdown,
    toggleCategoriesDropdown,
    allCategories: CATEGORIES_CONFIG
  };
}; 