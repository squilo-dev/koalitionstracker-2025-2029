
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Initiative } from '@/data/coalitionData';
import StatusBadge from './StatusBadge';
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from 'lucide-react';

interface InitiativeCardProps {
  initiative: Initiative;
}

const InitiativeCard: React.FC<InitiativeCardProps> = ({ initiative }) => {
  const { title, description, status, category, lastUpdated } = initiative;

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="outline" className="bg-coalition-light text-coalition-primary font-medium">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <StatusBadge status={status} />
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground pt-2 flex items-center">
        <CalendarIcon className="h-3 w-3 mr-1" />
        Letzte Aktualisierung: {new Date(lastUpdated).toLocaleDateString('de-DE')}
      </CardFooter>
    </Card>
  );
};

export default InitiativeCard;
