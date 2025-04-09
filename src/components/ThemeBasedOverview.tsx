
import React from 'react';
import { Initiative, ThemeCategory, themeLabels } from '@/data/coalitionData';
import ThemeOverviewCard from './ThemeOverviewCard';

interface ThemeBasedOverviewProps {
  initiatives: Initiative[];
  selectedCategory: ThemeCategory | 'all';
  onCategorySelect: (category: ThemeCategory | 'all') => void;
}

const ThemeBasedOverview: React.FC<ThemeBasedOverviewProps> = ({
  initiatives,
  selectedCategory,
  onCategorySelect
}) => {
  // Get all unique categories from initiatives
  const categories = Object.keys(themeLabels) as ThemeCategory[];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Themenbasierte Übersicht</h2>
        <button 
          onClick={() => onCategorySelect('all')}
          className="text-sm text-coalition-primary hover:underline"
        >
          Alle anzeigen
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const categoryInitiatives = initiatives.filter(i => i.category === category);
          if (categoryInitiatives.length === 0) return null;
          
          return (
            <ThemeOverviewCard
              key={category}
              category={category}
              initiatives={initiatives}
              onClick={() => onCategorySelect(category)}
              isActive={selectedCategory === category}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ThemeBasedOverview;
