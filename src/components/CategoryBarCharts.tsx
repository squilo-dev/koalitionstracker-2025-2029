import React from 'react';
import { Initiative, ThemeCategory, getCategoriesWithStatusCounts } from '@/data/coalitionData';
import StatusBarChart from './StatusBarChart';

interface CategoryBarChartsProps {
  initiatives: Initiative[];
  selectedCategory?: ThemeCategory | null;
}

const CategoryBarCharts: React.FC<CategoryBarChartsProps> = ({ 
  initiatives, 
  selectedCategory 
}) => {
  // If a category is selected, only show that category's chart
  if (selectedCategory) {
    const filteredInitiatives = initiatives.filter(
      initiative => initiative.category === selectedCategory
    );
    
    return (
      <div className="w-full">
        <StatusBarChart 
          initiatives={filteredInitiatives}
          category={selectedCategory}
          title={`Statusverteilung: ${selectedCategory}`}
        />
      </div>
    );
  }
  
  // Otherwise show all category charts
  const categoriesWithCounts = getCategoriesWithStatusCounts(initiatives);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {categoriesWithCounts.map(({ category, total }) => {
        if (total === 0) return null;
        
        const categoryInitiatives = initiatives.filter(
          initiative => initiative.category === category
        );
        
        return (
          <StatusBarChart
            key={category}
            initiatives={categoryInitiatives}
            category={category}
            title={`${category} (${total})`}
          />
        );
      })}
    </div>
  );
};

export default CategoryBarCharts;
