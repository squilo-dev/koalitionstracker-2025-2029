
import React from 'react';
import { Initiative, InitiativeStatus, ThemeCategory } from '@/types/supabase';
import InitiativeCard from './InitiativeCard';

interface InitiativesListProps {
  initiatives: Initiative[];
  isLoading?: boolean;
  categoryMap: Record<string, ThemeCategory>;
  statusMap: Record<string, InitiativeStatus>;
}

const InitiativesList: React.FC<InitiativesListProps> = ({ 
  initiatives, 
  isLoading = false,
  categoryMap,
  statusMap
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-48 bg-gray-100 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (initiatives.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Keine Vorhaben gefunden.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {initiatives.map((initiative) => (
        <InitiativeCard 
          key={initiative.id} 
          initiative={initiative} 
          categoryMap={categoryMap}
          statusMap={statusMap}
        />
      ))}
    </div>
  );
};

export default InitiativesList;
