import React from 'react';
import { Initiative, ThemeCategory, InitiativeStatus } from '@/types/supabase';
import StatusBarChart from './StatusBarChart';
import { getCategoriesWithStatusCounts } from '@/services/initiativeService';

interface CategoryBarChartsProps {
  initiatives: Initiative[];
  selectedCategory?: string | null;
  categoryMap: Record<string, ThemeCategory>;
  statusMap: Record<string, InitiativeStatus>;
}

const CategoryBarCharts: React.FC<CategoryBarChartsProps> = ({ 
  initiatives, 
  selectedCategory,
  categoryMap,
  statusMap
}) => {
  // If a category is selected, only show that category's chart
  if (selectedCategory && selectedCategory !== 'all') {
    const filteredInitiatives = initiatives.filter(
      initiative => initiative.category_id === selectedCategory
    );
    
    return (
      <div className="w-full">
        <StatusBarChart 
          initiatives={filteredInitiatives}
          categoryId={selectedCategory}
          title={`Statusverteilung: ${categoryMap[selectedCategory]?.label || selectedCategory}`}
          statusMap={statusMap}
          categoryMap={categoryMap}
        />
      </div>
    );
  }
  
  // Otherwise show all category charts
  const categoriesWithCounts = getCategoriesWithStatusCounts(initiatives, statusMap, categoryMap);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {categoriesWithCounts.map(({ category, total }) => {
        if (total === 0) return null;
        
        const categoryInitiatives = initiatives.filter(
          initiative => initiative.category_id === category
        );
        
        return (
          <StatusBarChart
            key={category}
            initiatives={categoryInitiatives}
            categoryId={category}
            title={`${categoryMap[category]?.label || category} (${total})`}
            statusMap={statusMap}
            categoryMap={categoryMap}
          />
        );
      })}
    </div>
  );
};

export default CategoryBarCharts;
