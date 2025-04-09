
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
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gesamtfortschritt</h2>
        <span className="text-2xl font-bold text-coalition-primary">{progressPercentage}%</span>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden relative cursor-help">
              <Progress value={progressPercentage} className="h-full" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="p-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">Umsetzungsstatus:</p>
              <div className="text-xs space-y-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm bg-status-umgesetzt"></div>
                  <span>Umgesetzt: {getStatusPercentage('umgesetzt')}% ({statusCounts['umgesetzt']})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm bg-status-teilweise-umgesetzt"></div>
                  <span>Teilweise umgesetzt: {getStatusPercentage('teilweise-umgesetzt')}% ({statusCounts['teilweise-umgesetzt']})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm bg-status-begonnen"></div>
                  <span>Begonnen: {getStatusPercentage('begonnen')}% ({statusCounts['begonnen']})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm bg-status-nicht-begonnen"></div>
                  <span>Nicht begonnen: {getStatusPercentage('nicht-begonnen')}% ({statusCounts['nicht-begonnen']})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm bg-status-verschoben"></div>
                  <span>Verschoben: {getStatusPercentage('verschoben')}% ({statusCounts['verschoben']})</span>
                </div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <div className="flex flex-wrap gap-3 justify-center">
        {Object.entries(statusLabels).map(([status, label]) => {
          const count = statusCounts[status as keyof typeof statusLabels];
          const percentage = total > 0 ? Math.round(count / total * 100) : 0;
          
          return (
            <div key={status} className="flex items-center gap-1.5">
              <div className={cn("w-3 h-3 rounded-sm", `bg-status-${status}`)}></div>
              <span className="text-sm">{label} ({count})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OverallProgress;
