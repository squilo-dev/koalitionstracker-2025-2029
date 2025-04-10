
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Initiative, InitiativeStatus, ThemeCategory } from '@/types/supabase';
import { getStatusCountsByCategory, getStatusPercentages } from '@/services/initiativeService';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface StatusBarChartProps {
  initiatives: Initiative[];
  categoryId?: string;
  title?: string;
  className?: string;
  showPercentages?: boolean;
  statusMap: Record<string, InitiativeStatus>;
  categoryMap: Record<string, ThemeCategory>;
  noCard?: boolean;
}

const StatusBarChart: React.FC<StatusBarChartProps> = ({ 
  initiatives, 
  categoryId, 
  title, 
  className,
  showPercentages = false,
  statusMap,
  categoryMap,
  noCard = false
}) => {
  const statusCounts = getStatusCountsByCategory(initiatives, statusMap, categoryId);
  const total = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);

  // Generate title if not provided
  const generateTitle = () => {
    if (title) return title;
    
    if (categoryId && categoryMap[categoryId]) {
      return `Fortschritt beim Thema ${categoryMap[categoryId].label}`;
    }
    
    return "Gesamtfortschritt";
  };

  // Order statuses for display
  const statusIds = Object.keys(statusMap);
  const statusOrder = [
    'umgesetzt',
    'teilweise-umgesetzt',
    'begonnen',
    'nicht-begonnen',
    'verschoben'
  ].filter(id => statusIds.includes(id));

  // Calculate percentages for each status
  const statusPercentages = getStatusPercentages(statusCounts);

  const content = (
    <div className="space-y-4">
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex">
            {statusOrder.map((statusId) => {
              const percentage = statusPercentages[statusId] || 0;
              const status = statusMap[statusId];
              
              return percentage > 0 ? (
                <div
                  key={statusId}
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: status?.color || '#cbd5e1' 
                  }}
                ></div>
              ) : null;
            })}
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto p-2">
          <div className="text-xs space-y-1">
            {statusOrder.map((statusId) => {
              const count = statusCounts[statusId] || 0;
              const percentage = statusPercentages[statusId] || 0;
              const status = statusMap[statusId];
              
              return percentage > 0 ? (
                <div key={statusId} className="flex items-center gap-1.5">
                  <div 
                    className="w-2 h-2 rounded-sm" 
                    style={{ backgroundColor: status?.color || '#cbd5e1' }}
                  ></div>
                  <span>
                    {status?.label}: {percentage.toFixed(1)}% ({count})
                  </span>
                </div>
              ) : null;
            })}
          </div>
        </HoverCardContent>
      </HoverCard>
      
      <div className="flex flex-wrap gap-3">
        {statusOrder.map((statusId) => {
          const count = statusCounts[statusId] || 0;
          const percentage = total > 0 ? (count / total) * 100 : 0;
          const status = statusMap[statusId];
          
          return count > 0 ? (
            <div key={statusId} className="flex items-center gap-1.5">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: status?.color || '#cbd5e1' }}
              ></div>
              <span className="text-sm">
                {status?.label} {showPercentages 
                  ? `(${percentage.toFixed(1)}%)` 
                  : `(${count})`}
              </span>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );

  if (noCard) {
    return (
      <div className={cn("w-full", className)}>
        <h3 className="text-lg font-medium mb-2">{generateTitle()}</h3>
        {content}
      </div>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{generateTitle()}</CardTitle>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  );
};

export default StatusBarChart;
