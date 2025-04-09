
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Initiative, InitiativeStatus, ThemeCategory, RecentDevelopment } from '@/types/supabase';
import StatusBadge from './StatusBadge';
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { getRecentDevelopmentsByInitiative } from '@/services/initiativeService';

interface InitiativeCardProps {
  initiative: Initiative;
  statusMap: Record<string, InitiativeStatus>;
  categoryMap: Record<string, ThemeCategory>;
}

const InitiativeCard: React.FC<InitiativeCardProps> = ({ initiative, statusMap, categoryMap }) => {
  const { id, title, description, status_id, category_id, last_updated, koalitionsvertrag_text, koalitionsvertrag_page } = initiative;
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // Fetch recent developments when the dialog is opened
  const { data: recentDevelopments = [], isLoading: isLoadingDevelopments } = useQuery({
    queryKey: ['recentDevelopments', id],
    queryFn: () => getRecentDevelopmentsByInitiative(id),
    enabled: isDialogOpen, // Only fetch when dialog is open
  });

  // Format date to German format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE');
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
            <Badge variant="outline" className="bg-coalition-light text-coalition-primary font-medium">
              {categoryMap[category_id]?.label || category_id}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
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
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          
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
              <h4 className="font-medium mb-2 text-sm text-muted-foreground">Aktuelle Entwicklungen</h4>
              {isLoadingDevelopments ? (
                <div className="space-y-2">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="h-6 bg-gray-100 animate-pulse rounded"></div>
                  ))}
                </div>
              ) : recentDevelopments.length > 0 ? (
                <div className="space-y-3">
                  {recentDevelopments.map(dev => (
                    <div key={dev.id} className="flex justify-between items-center text-sm">
                      <div>
                        <span className="text-xs text-muted-foreground mr-2">{formatDate(dev.date)}</span>
                        <span>{dev.title}</span>
                      </div>
                      {dev.url && (
                        <Button variant="link" size="sm" className="text-xs" asChild>
                          <a href={dev.url} target="_blank" rel="noopener noreferrer">
                            Mehr erfahren
                          </a>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Keine aktuellen Entwicklungen verfügbar.</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InitiativeCard;
