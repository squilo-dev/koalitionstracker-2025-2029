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
  const progressPercentage = total > 0 ? Math.round((implemented + partiallyImplemented) / total * 100) : 0;

  // Calculate individual status percentages for tooltip
  const getStatusPercentage = (status: keyof typeof statusLabels) => {
    return total > 0 ? Math.round(statusCounts[status] / total * 100) : 0;
  };
  return;
};
export default OverallProgress;