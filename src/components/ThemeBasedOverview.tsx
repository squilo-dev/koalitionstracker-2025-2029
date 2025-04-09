
import React from 'react';
import { Initiative, ThemeCategory, InitiativeStatus } from '@/types/supabase';
import ThemeOverviewCard from './ThemeOverviewCard';

interface ThemeBasedOverviewProps {
  initiatives: Initiative[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  isLoading: boolean;
  categoryMap: Record<string, ThemeCategory>;
  statusMap: Record<string, InitiativeStatus>;
}

const ThemeBasedOverview: React.FC<ThemeBasedOverviewProps> = ({
  initiatives,
  selectedCategory,
  onCategorySelect,
  isLoading,
  categoryMap,
  statusMap
}) => {
  // Get all unique categories from initiatives
  const categories = Object.keys(categoryMap);
  
  // Toggle category selection (if already selected, deselect it)
  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      onCategorySelect('all'); // Deselect if already selected
    } else {
      onCategorySelect(category); // Select if not selected
    }
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(categoryId => {
          const categoryInitiatives = initiatives.filter(i => i.category_id === categoryId);
          if (categoryInitiatives.length === 0) return null;
          
          return (
            <ThemeOverviewCard 
              key={categoryId} 
              categoryId={categoryId} 
              initiatives={initiatives} 
              onClick={() => handleCategoryClick(categoryId)} 
              isActive={selectedCategory === categoryId}
              categoryMap={categoryMap}
              statusMap={statusMap}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ThemeBasedOverview;
