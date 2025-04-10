
import React from 'react';
import { getStatusCountsByCategory, Initiative, statusLabels } from '@/data/coalitionData';
import { cn } from '@/lib/utils';
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-semibold">Gesamtfortschritt</h2>
        <span className="text-sm font-medium">{progressPercentage}%</span>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full">
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="p-2">
            <div className="space-y-1 text-sm">
              <p className="font-medium">Detaillierte Statusverteilung:</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                {Object.entries(statusLabels).map(([key, label]) => (
                  <div key={key} className="flex justify-between">
                    <span>{label}:</span>
                    <span className="font-medium">{getStatusPercentage(key as keyof typeof statusLabels)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default OverallProgress;
