
import React from 'react';
import { Initiative } from '@/data/coalitionData';
import InitiativeCard from './InitiativeCard';

interface InitiativesListProps {
  initiatives: Initiative[];
  isLoading?: boolean;
}

const InitiativesList: React.FC<InitiativesListProps> = ({ initiatives, isLoading = false }) => {
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
        <p className="text-muted-foreground">Keine Initiativen gefunden.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {initiatives.map((initiative) => (
        <InitiativeCard key={initiative.id} initiative={initiative} />
      ))}
    </div>
  );
};

export default InitiativesList;
