
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { InitiativeStatus, statusLabels } from '@/data/coalitionData';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: InitiativeStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'nicht-begonnen':
        return 'bg-status-nicht-begonnen hover:bg-status-nicht-begonnen/90';
      case 'begonnen':
        return 'bg-status-begonnen hover:bg-status-begonnen/90';
      case 'teilweise-umgesetzt':
        return 'bg-status-teilweise-umgesetzt hover:bg-status-teilweise-umgesetzt/90';
      case 'umgesetzt':
        return 'bg-status-umgesetzt hover:bg-status-umgesetzt/90';
      case 'verschoben':
        return 'bg-status-verschoben hover:bg-status-verschoben/90';
      default:
        return '';
    }
  };

  return (
    <Badge className={cn(getStatusColor(), 'text-white font-medium', className)}>
      {statusLabels[status]}
    </Badge>
  );
};

export default StatusBadge;
