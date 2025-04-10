import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Initiative, InitiativeStatus, ThemeCategory } from '@/types/supabase';
import StatusBadge from './StatusBadge';
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, EditIcon, PlusCircle, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { getRecentDevelopmentsByInitiative } from '@/services/initiativeService';
import SuggestionForm from './SuggestionForm';
import { DialogHeader } from './ui/dialog-header';

interface DevelopmentListProps {
  initiativeId: string;
}

const DevelopmentList: React.FC<DevelopmentListProps> = ({ initiativeId }) => {
  const { data: recentDevelopments = [], isLoading } = useQuery({
    queryKey: ['recentDevelopments', initiativeId],
    queryFn: () => getRecentDevelopmentsByInitiative(initiativeId),
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="h-6 bg-gray-100 animate-pulse rounded"></div>
        ))}
      </div>
    );
  }

  if (recentDevelopments.length === 0) {
    return <p className="text-sm text-muted-foreground">Keine aktuellen Entwicklungen verfügbar.</p>;
  }

  return (
    <div className="space-y-3">
      {recentDevelopments.map(dev => (
        <div key={dev.id} className="flex justify-between items-center text-sm">
          <div>
            <span className="text-xs text-muted-foreground mr-2">{formatDate(dev.date)}</span>
            <span>{dev.title}</span>
          </div>
          {dev.url && (
            <Button variant="link" size="sm" className="text-xs hover:text-[#FFCC00]" asChild>
              <a href={dev.url} target="_blank" rel="noopener noreferrer">
                Mehr erfahren
              </a>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

interface InitiativeFormDialogProps {
  type: 'development' | 'edit';
  initiativeId: string;
  onSuccess: () => void;
}

const InitiativeFormDialog: React.FC<InitiativeFormDialogProps> = ({ type, initiativeId, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);

  const title = type === 'development' ? 'Neue Entwicklung melden' : 'Korrektur vorschlagen';
  const buttonText = type === 'development' ? 'Neue Entwicklung' : 'Korrektur vorschlagen';
  const buttonIcon = type === 'development' ? PlusCircle : EditIcon;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          {React.createElement(buttonIcon, { className: "h-4 w-4" })}
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader title={title} onClose={() => setIsOpen(false)} />
        <SuggestionForm 
          type={type} 
          initiativeId={initiativeId} 
          onSuccess={() => {
            onSuccess();
            setIsOpen(false);
          }}
          showTitle={false}
        />
      </DialogContent>
    </Dialog>
  );
};

interface InitiativeCardProps {
  initiative: Initiative;
  statusMap: Record<string, InitiativeStatus>;
  categoryMap: Record<string, ThemeCategory>;
}

const InitiativeCard: React.FC<InitiativeCardProps> = ({ initiative, statusMap, categoryMap }) => {
  const { id, title, description, status_id, category_id, last_updated, koalitionsvertrag_text, koalitionsvertrag_page } = initiative;
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // Format date to German format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <>
      <Card 
        className="h-full flex flex-col hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardHeader className="pb-2 flex-grow-0">
          <div className="flex justify-between items-start gap-2 mb-2">
            <StatusBadge status={status_id} statusMap={statusMap} />
            <Badge variant="outline" className="bg-gray-100 text-gray-900 font-medium">
              {categoryMap[category_id]?.label || category_id}
            </Badge>
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              {title}
            </h3>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground pt-2 mt-auto flex items-center border-t">
          <CalendarIcon className="h-3 w-3 mr-1" />
          Letzte Aktualisierung: {formatDate(last_updated)}
        </CardFooter>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader title={title} onClose={() => setIsDialogOpen(false)} />
          
          <div className="py-4 space-y-6">
            <div>
              <h4 className="font-medium mb-2 text-sm text-muted-foreground">Status</h4>
              <StatusBadge status={status_id} statusMap={statusMap} />
            </div>
            
            <div>
              <h4 className="font-medium mb-2 text-sm text-muted-foreground">Beschreibung</h4>
              <p>{description}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 text-sm text-muted-foreground">Im Koalitionsvertrag</h4>
              <blockquote className="border-l-2 pl-4 italic text-sm">
                {koalitionsvertrag_text || "Der genaue Wortlaut aus dem Koalitionsvertrag ist nicht verfügbar."}
                {koalitionsvertrag_page && <span className="text-xs block mt-1 text-muted-foreground">Seite {koalitionsvertrag_page}</span>}
              </blockquote>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-sm text-muted-foreground">Aktuelle Entwicklungen</h4>
                <InitiativeFormDialog 
                  type="development" 
                  initiativeId={id} 
                  onSuccess={() => setIsDialogOpen(false)}
                />
              </div>
              <DevelopmentList initiativeId={id} />
            </div>
            
            <div className="flex justify-end gap-2 pt-2 border-t">
              <InitiativeFormDialog 
                type="edit" 
                initiativeId={id} 
                onSuccess={() => setIsDialogOpen(false)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InitiativeCard;
