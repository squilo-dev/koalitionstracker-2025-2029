
import React from 'react';
import { getStatusCountsByCategory, Initiative, statusLabels } from '@/data/coalitionData';
import { cn } from '@/lib/utils';
import { Progress } from "@/components/ui/progress";

interface OverallProgressProps {
  initiatives: Initiative[];
  className?: string;
}

const OverallProgress: React.FC<OverallProgressProps> = ({
  initiatives,
  className
}) => {
  const statusCounts = getStatusCountsByCategory(initiatives);
  const total = initiatives.length;

  // Calculate progress percentage
  const implemented = statusCounts['umgesetzt'];
  const partiallyImplemented = statusCounts['teilweise-umgesetzt'] * 0.5; // Count partially implemented as half
  const progressPercentage = total > 0 ? Math.round((implemented + partiallyImplemented) / total * 100) : 0;

  // Calculate individual status percentages for tooltip
  const getStatusPercentage = (status: keyof typeof statusLabels) => {
    return total > 0 ? Math.round(statusCounts[status] / total * 100) : 0;
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gesamtfortschritt</h2>
        <span className="text-muted-foreground">{progressPercentage}% abgeschlossen</span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
      <div className="text-sm text-muted-foreground">
        {Object.entries(statusLabels).map(([status, label]) => (
          <span key={status} className="mr-4">
            {label}: {getStatusPercentage(status as keyof typeof statusLabels)}%
          </span>
        ))}
      </div>
    </div>
  );
};

export default OverallProgress;
