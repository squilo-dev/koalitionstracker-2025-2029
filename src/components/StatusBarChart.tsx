
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Initiative, InitiativeStatus, ThemeCategory, statusLabels, getStatusCountsByCategory, themeLabels } from '@/data/coalitionData';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface StatusBarChartProps {
  initiatives: Initiative[];
  category?: ThemeCategory;
  title?: string;
  className?: string;
  showPercentages?: boolean;
}

const StatusBarChart: React.FC<StatusBarChartProps> = ({ 
  initiatives, 
  category, 
  title, 
  className,
  showPercentages = false
}) => {
  const statusCounts = getStatusCountsByCategory(initiatives, category);
  const total = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);

  // Generate title if not provided
  const generateTitle = () => {
    if (title) return title;
    
    if (category) {
      return `Fortschritt im Bundesministerium für ${themeLabels[category]}`;
    }
    
    return "Gesamtfortschritt";
  };

  // Order of statuses in the bar
  const statusOrder: InitiativeStatus[] = [
    'umgesetzt',
    'teilweise-umgesetzt',
    'begonnen',
    'nicht-begonnen',
    'verschoben'
  ];

  // Calculate percentages for each status
  const statusPercentages = statusOrder.reduce((acc, status) => {
    acc[status] = total > 0 ? (statusCounts[status] / total) * 100 : 0;
    return acc;
  }, {} as Record<InitiativeStatus, number>);

  const getStatusColor = (status: InitiativeStatus) => {
    return `bg-status-${status}`;
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{generateTitle()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden flex">
                {statusOrder.map((status) => {
                  const percentage = statusPercentages[status];
                  
                  return percentage > 0 ? (
                    <div
                      key={status}
                      className={cn(
                        getStatusColor(status),
                        "h-full transition-all duration-500"
                      )}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  ) : null;
                })}
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto p-2">
              <div className="text-xs space-y-1">
                {statusOrder.map((status) => {
                  const count = statusCounts[status];
                  const percentage = statusPercentages[status];
                  
                  return percentage > 0 ? (
                    <div key={status} className="flex items-center gap-1.5">
                      <div className={cn("w-2 h-2 rounded-sm", getStatusColor(status))}></div>
                      <span>
                        {statusLabels[status]}: {percentage.toFixed(1)}% ({count})
                      </span>
                    </div>
                  ) : null;
                })}
              </div>
            </HoverCardContent>
          </HoverCard>
          
          <div className="flex flex-wrap gap-3">
            {statusOrder.map((status) => {
              const count = statusCounts[status];
              const percentage = total > 0 ? (count / total) * 100 : 0;
              
              return count > 0 ? (
                <div key={status} className="flex items-center gap-1.5">
                  <div className={cn("w-3 h-3 rounded-sm", getStatusColor(status))}></div>
                  <span className="text-sm">
                    {statusLabels[status]} {showPercentages 
                      ? `(${percentage.toFixed(1)}%)` 
                      : `(${count})`}
                  </span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusBarChart;
