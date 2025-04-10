import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Initiative, InitiativeStatus, ThemeCategory } from '@/types/supabase';
import { getStatusCountsByCategory } from '@/services/initiativeService';
import { 
  BookOpen, 
  Briefcase, 
  Building, 
  Cloud, 
  Database, 
  Globe, 
  Heart, 
  Shield, 
  Truck, 
  Wallet, 
  FileText,
  HeartPulse,
  LifeBuoy,
  Plane,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface ThemeOverviewCardProps {
  categoryId: string;
  initiatives: Initiative[];
  onClick: () => void;
  isActive: boolean;
  categoryMap: Record<string, ThemeCategory>;
  statusMap: Record<string, InitiativeStatus>;
}

const ThemeOverviewCard: React.FC<ThemeOverviewCardProps> = ({
  categoryId,
  initiatives,
  onClick,
  isActive,
  categoryMap,
  statusMap
}) => {
  const filteredInitiatives = initiatives.filter(i => i.category_id === categoryId);
  const statusCounts = getStatusCountsByCategory(initiatives, statusMap, categoryId);
  const total = filteredInitiatives.length;
  
  const implemented = statusCounts['umgesetzt'] || 0;
  const partiallyImplemented = (statusCounts['teilweise-umgesetzt'] || 0) * 0.5; // Count partially implemented as half
  const progressPercentage = total > 0 ? Math.round((implemented + partiallyImplemented) / total * 100) : 0;
  
  const getThemeIcon = () => {
    // Each category has a unique icon
    switch (categoryId) {
      case 'Wirtschaft':
        return <Briefcase className="h-5 w-5" />;
      case 'Klima & Umwelt':
        return <Cloud className="h-5 w-5" />;
      case 'Digitalisierung':
        return <Database className="h-5 w-5" />;
      case 'Bildung & Forschung':
        return <BookOpen className="h-5 w-5" />;
      case 'Soziales':
        return <Users className="h-5 w-5" />;
      case 'Gesundheit':
        return <HeartPulse className="h-5 w-5" />;
      case 'Sicherheit & Verteidigung':
        return <Shield className="h-5 w-5" />;
      case 'Außenpolitik':
        return <Globe className="h-5 w-5" />;
      case 'Migration & Integration':
        return <LifeBuoy className="h-5 w-5" />;
      case 'Mobilität':
        return <Truck className="h-5 w-5" />;
      case 'Finanzen':
        return <Wallet className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  // Order of statuses for display
  const statusOrder = ['umgesetzt', 'teilweise-umgesetzt', 'begonnen', 'nicht-begonnen', 'verschoben'];
  
  // Calculate status percentages
  const statusPercentages: Record<string, number> = {};
  statusOrder.forEach(statusId => {
    statusPercentages[statusId] = total > 0 ? (statusCounts[statusId] || 0) / total * 100 : 0;
  });
  
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md", 
        isActive ? "ring-2 ring-coalition-primary" : ""
      )} 
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-full bg-gray-100 text-gray-900">
            {getThemeIcon()}
          </div>
          <div>
            <h3 className="text-lg font-medium">{categoryMap[categoryId]?.label || categoryId}</h3>
            <p className="text-sm text-muted-foreground">{total} Vorhaben</p>
          </div>
        </div>
        
        <div className="mt-3">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden flex">
                {statusOrder.map(statusId => {
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
                {statusOrder.map(statusId => {
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeOverviewCard;
