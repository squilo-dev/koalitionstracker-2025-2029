
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ThemeCategory, Initiative, themeLabels, getStatusCountsByCategory } from '@/data/coalitionData';
import StatusBarChart from './StatusBarChart';
import { 
  BookOpen, Briefcase, Building, Cloud, Database, Globe, Heart, 
  Shield, Truck, Wallet, FileText 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from "@/components/ui/progress";

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
  
  // Calculate progress percentage
  const implemented = statusCounts['umgesetzt'];
  const partiallyImplemented = statusCounts['teilweise-umgesetzt'] * 0.5; // Count partially implemented as half
  const progressPercentage = total > 0 ? 
    Math.round(((implemented + partiallyImplemented) / total) * 100) : 0;

  // Get icon for category
  const getThemeIcon = () => {
    switch(category) {
      case 'Wirtschaft': return <Briefcase className="h-5 w-5" />;
      case 'Klima & Umwelt': return <Cloud className="h-5 w-5" />;
      case 'Digitalisierung': return <Database className="h-5 w-5" />;
      case 'Bildung & Forschung': return <BookOpen className="h-5 w-5" />;
      case 'Soziales': return <Heart className="h-5 w-5" />;
      case 'Gesundheit': return <Heart className="h-5 w-5" />;
      case 'Sicherheit & Verteidigung': return <Shield className="h-5 w-5" />;
      case 'Außenpolitik': return <Globe className="h-5 w-5" />;
      case 'Migration & Integration': return <Globe className="h-5 w-5" />;
      case 'Mobilität': return <Truck className="h-5 w-5" />;
      case 'Finanzen': return <Wallet className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
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
          <div className="flex justify-between text-sm mb-1">
            <span>Umsetzungsstand</span>
            <span className="font-medium">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="h-6 mt-3">
          <StatusBarChart 
            initiatives={filteredInitiatives} 
            category={category}
            className="h-3 mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeOverviewCard;
