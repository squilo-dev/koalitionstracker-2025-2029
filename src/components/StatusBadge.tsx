
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { InitiativeStatus } from '@/types/supabase';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  statusMap: Record<string, InitiativeStatus>;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, statusMap, className }) => {
  const statusInfo = statusMap[status];
  
  if (!statusInfo) {
    return null;
  }
  
  return (
    <Badge 
      className={cn(
        'text-white font-medium', 
        className
      )}
      style={{ backgroundColor: statusInfo.color }}
    >
      {statusInfo.label}
    </Badge>
  );
};

export default StatusBadge;
