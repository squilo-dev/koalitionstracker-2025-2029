
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ThemeCategory, Initiative, themeLabels, getStatusCountsByCategory, statusLabels, InitiativeStatus } from '@/data/coalitionData';
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
  category: ThemeCategory;
  initiatives: Initiative[];
  onClick: () => void;
  isActive: boolean;
}

const ThemeOverviewCard: React.FC<ThemeOverviewCardProps> = ({
  category,
  initiatives,
  onClick,
  isActive
}) => {
  const filteredInitiatives = initiatives.filter(i => i.category === category);
  const statusCounts = getStatusCountsByCategory(initiatives, category);
  const total = filteredInitiatives.length;
  
  const implemented = statusCounts['umgesetzt'];
  const partiallyImplemented = statusCounts['teilweise-umgesetzt'] * 0.5; // Count partially implemented as half
  const progressPercentage = total > 0 ? Math.round((implemented + partiallyImplemented) / total * 100) : 0;
  
  const getThemeIcon = () => {
    // Each category has a unique icon
    switch (category) {
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
  
  const statusOrder: InitiativeStatus[] = ['umgesetzt', 'teilweise-umgesetzt', 'begonnen', 'nicht-begonnen', 'verschoben'];
  
  const statusPercentages = statusOrder.reduce((acc, status) => {
    acc[status] = total > 0 ? statusCounts[status] / total * 100 : 0;
    return acc;
  }, {} as Record<InitiativeStatus, number>);
  
  const getStatusColor = (status: InitiativeStatus) => {
    return `bg-status-${status}`;
  };
  
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
          <div className="p-2 rounded-full bg-coalition-light text-coalition-dark">
            {getThemeIcon()}
          </div>
          <div>
            <h3 className="text-lg font-medium">{themeLabels[category]}</h3>
            <p className="text-sm text-muted-foreground">{total} Vorhaben</p>
          </div>
        </div>
        
        <div className="mt-3">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="h-6 w-full bg-gray-100 rounded-full overflow-hidden flex">
                {statusOrder.map(status => {
                  const percentage = statusPercentages[status];
                  return percentage > 0 ? (
                    <div 
                      key={status} 
                      className={cn(getStatusColor(status), "h-full transition-all duration-500")} 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  ) : null;
                })}
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto p-2">
              <div className="text-xs space-y-1">
                {statusOrder.map(status => {
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeOverviewCard;
