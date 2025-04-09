
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Initiative, InitiativeStatus, ThemeCategory, statusLabels, getStatusCountsByCategory } from '@/data/coalitionData';
import { cn } from '@/lib/utils';

interface StatusBarChartProps {
  initiatives: Initiative[];
  category?: ThemeCategory;
  title?: string;
  className?: string;
}

const StatusBarChart: React.FC<StatusBarChartProps> = ({ 
  initiatives, 
  category, 
  title = "Statusverteilung", 
  className 
}) => {
  const statusCounts = getStatusCountsByCategory(initiatives, category);
  const total = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);

  // Order of statuses in the bar
  const statusOrder: InitiativeStatus[] = [
    'umgesetzt',
    'teilweise-umgesetzt',
    'begonnen',
    'nicht-begonnen',
    'verschoben'
  ];

  const getStatusColor = (status: InitiativeStatus) => {
    return `bg-status-${status}`;
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden flex">
            {statusOrder.map((status) => {
              const count = statusCounts[status];
              const percentage = total > 0 ? (count / total) * 100 : 0;
              
              return percentage > 0 ? (
                <div
                  key={status}
                  className={cn(
                    getStatusColor(status),
                    "h-full transition-all duration-500"
                  )}
                  style={{ width: `${percentage}%` }}
                  title={`${statusLabels[status]}: ${count} (${percentage.toFixed(1)}%)`}
                ></div>
              ) : null;
            })}
          </div>
          
          <div className="flex flex-wrap gap-3">
            {statusOrder.map((status) => {
              const count = statusCounts[status];
              const percentage = total > 0 ? (count / total) * 100 : 0;
              
              return (
                <div key={status} className="flex items-center gap-1.5">
                  <div className={cn("w-3 h-3 rounded-sm", getStatusColor(status))}></div>
                  <span className="text-sm">
                    {statusLabels[status]} ({count})
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusBarChart;
