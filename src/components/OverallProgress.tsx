
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
  const progressPercentage = total > 0 ? 
    Math.round(((implemented + partiallyImplemented) / total) * 100) : 0;
  
  // Calculate individual status percentages for tooltip
  const getStatusPercentage = (status: keyof typeof statusLabels) => {
    return total > 0 ? Math.round((statusCounts[status] / total) * 100) : 0;
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">Gesamtfortschritt Koalitionsvertrag</h3>
        <span className="text-sm font-semibold">{progressPercentage}%</span>
      </div>
      
      <div 
        className="relative"
        title={`Umgesetzt: ${getStatusPercentage('umgesetzt')}%, Teilweise umgesetzt: ${getStatusPercentage('teilweise-umgesetzt')}%, Begonnen: ${getStatusPercentage('begonnen')}%, Nicht begonnen: ${getStatusPercentage('nicht-begonnen')}%, Verschoben: ${getStatusPercentage('verschoben')}%`}
      >
        <Progress 
          value={progressPercentage} 
          className="h-3"
        />
      </div>
      
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-status-umgesetzt"></div>
          <span>Umgesetzt: {statusCounts['umgesetzt']}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-status-teilweise-umgesetzt"></div>
          <span>Teilweise: {statusCounts['teilweise-umgesetzt']}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-status-begonnen"></div>
          <span>Begonnen: {statusCounts['begonnen']}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-status-nicht-begonnen"></div>
          <span>Nicht begonnen: {statusCounts['nicht-begonnen']}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-status-verschoben"></div>
          <span>Verschoben: {statusCounts['verschoben']}</span>
        </div>
      </div>
    </div>
  );
};

export default OverallProgress;
