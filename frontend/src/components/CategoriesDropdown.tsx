import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useCategories } from '../hooks/useCategories';

interface CategoriesDropdownProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CategoriesDropdown: React.FC<CategoriesDropdownProps> = ({ activeTab, setActiveTab }) => {
  const {
    isCategoriesOpen,
    expandedCategories,
    toggleCategory,
    toggleCategoriesDropdown,
    closeCategoriesDropdown,
    allCategories
  } = useCategories();

  const handleCategoriesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab('Categories');
    toggleCategoriesDropdown();
  };

  const handleSubcategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeCategoriesDropdown();
    // Handle subcategory click logic here
  };

  return (
    <div className="relative categories-dropdown">
      <a
        href="#"
        onClick={handleCategoriesClick}
        className={`transition-colors duration-200 pb-1 ${
          activeTab === 'Categories'
            ? 'text-blue-900 border-b-2 border-yellow-400'
            : 'text-gray-600 hover:text-blue-900'
        }`}
      >
        Categories
      </a>
      
      {/* Categories Dropdown Palette */}
      {isCategoriesOpen && (
        <div 
          className="absolute top-full left-0 mt-2 w-screen max-w-7xl bg-white border border-gray-200 rounded-lg shadow-xl z-50 -ml-96 max-h-[500px] overflow-y-auto"
          onMouseLeave={closeCategoriesDropdown}
        >
          <div className="p-8">
            <div className="grid grid-cols-6 gap-8 items-start auto-rows-min">
              {Object.entries(allCategories).map(([categoryName, subcategories]) => (
                <div key={categoryName} className="space-y-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer group"
                    onClick={() => toggleCategory(categoryName)}
                  >
                    <h3 className="font-bold text-blue-900 text-lg border-b border-gray-200 pb-3 flex-1">
                      {categoryName}
                    </h3>
                    <div className="ml-3 pb-3">
                      {expandedCategories.includes(categoryName) ? (
                        <FaChevronUp className="text-blue-900 text-base group-hover:text-blue-700 transition-colors" />
                      ) : (
                        <FaChevronDown className="text-blue-900 text-base group-hover:text-blue-700 transition-colors" />
                      )}
                    </div>
                  </div>
                  
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    expandedCategories.includes(categoryName) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <ul className="space-y-2 pb-3">
                      {subcategories.map((subcategory, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            className="text-sm text-gray-700 hover:text-blue-900 transition-colors block py-1.5 px-2 font-medium rounded hover:bg-blue-50"
                            onClick={handleSubcategoryClick}
                          >
                            {subcategory}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesDropdown; 