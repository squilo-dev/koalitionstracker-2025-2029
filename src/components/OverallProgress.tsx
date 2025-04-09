
import React from 'react';
import { getStatusCountsByCategory, Initiative, statusLabels } from '@/data/coalitionData';
import { cn } from '@/lib/utils';
import { Progress } from "@/components/ui/progress";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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
        <h2 className="text-lg font-semibold">Koalitionsvertrag Umsetzung</h2>
        <span className="text-sm font-medium">{progressPercentage}%</span>
      </div>
      
      <HoverCard>
        <HoverCardTrigger asChild>
          <div>
            <Progress value={progressPercentage} className="h-2.5" />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto p-2">
          <div className="text-xs space-y-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm bg-status-umgesetzt"></div>
              <span>Umgesetzt: {getStatusPercentage('umgesetzt')}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm bg-status-teilweise-umgesetzt"></div>
              <span>Teilweise umgesetzt: {getStatusPercentage('teilweise-umgesetzt')}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm bg-status-begonnen"></div>
              <span>Begonnen: {getStatusPercentage('begonnen')}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm bg-status-nicht-begonnen"></div>
              <span>Nicht begonnen: {getStatusPercentage('nicht-begonnen')}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm bg-status-verschoben"></div>
              <span>Verschoben: {getStatusPercentage('verschoben')}%</span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default OverallProgress;
