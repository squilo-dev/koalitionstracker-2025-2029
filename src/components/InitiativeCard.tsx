
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Initiative, ThemeCategory, themeLabels } from '@/data/coalitionData';
import StatusBadge from './StatusBadge';
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InitiativeCardProps {
  initiative: Initiative;
}

const InitiativeCard: React.FC<InitiativeCardProps> = ({ initiative }) => {
  const { id, title, description, status, category, lastUpdated, koalitionsvertrag = {} } = initiative;
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // Mock data for recent developments (in a real app, this would come from a database)
  const recentDevelopments = [
    {
      id: 1,
      date: '2025-05-10',
      title: 'Gesetzentwurf im Bundestag eingebracht',
      url: 'https://example.com/news/1',
    },
    {
      id: 2,
      date: '2025-06-15',
      title: 'Bundesrat stimmt Gesetz zu',
      url: 'https://example.com/news/2',
    }
  ];

  return (
    <>
      <Card 
        className="h-full flex flex-col hover:shadow-md transition-shadow cursor-pointer" 
        onClick={() => setIsDialogOpen(true)}
      >
        <CardHeader className="pb-2 flex-grow-0">
          <div className="flex justify-between items-start gap-2 mb-2">
            <StatusBadge status={status} />
            <Badge variant="outline" className="bg-coalition-light text-coalition-primary font-medium">
              {themeLabels[category as ThemeCategory]}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground pt-2 mt-auto flex items-center border-t">
          <CalendarIcon className="h-3 w-3 mr-1" />
          Letzte Aktualisierung: {new Date(lastUpdated).toLocaleDateString('de-DE')}
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
              <StatusBadge status={status} />
            </div>
            
            <div>
              <h4 className="font-medium mb-2 text-sm text-muted-foreground">Beschreibung</h4>
              <p>{description}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 text-sm text-muted-foreground">Im Koalitionsvertrag</h4>
              <blockquote className="border-l-2 pl-4 italic text-sm">
                {koalitionsvertrag.text || "Der genaue Wortlaut aus dem Koalitionsvertrag ist nicht verfügbar."}
                {koalitionsvertrag.page && <span className="text-xs block mt-1 text-muted-foreground">Seite {koalitionsvertrag.page}</span>}
              </blockquote>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 text-sm text-muted-foreground">Aktuelle Entwicklungen</h4>
              {recentDevelopments.length > 0 ? (
                <div className="space-y-3">
                  {recentDevelopments.map(dev => (
                    <div key={dev.id} className="flex justify-between items-center text-sm">
                      <span>{dev.title}</span>
                      <Button variant="link" size="sm" className="text-xs" asChild>
                        <a href={dev.url} target="_blank" rel="noopener noreferrer">
                          Mehr erfahren
                        </a>
                      </Button>
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
