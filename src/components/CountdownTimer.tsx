import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { X, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

const END_DATE = new Date('2029-03-25T23:59:59');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = END_DATE.getTime() - new Date().getTime();
      
      if (difference > 0) {
        // Calculate time components
        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };
    
    // Calculate immediately and then set up interval
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center my-6">
      <Card className="bg-white dark:bg-gray-900 max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="text-2xl font-bold mb-2">
            {timeLeft.days} Tage, {timeLeft.hours} Stunden, {timeLeft.minutes} Minuten, {timeLeft.seconds} Sekunden
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Zeit bis Ende der Legislaturperiode
          </p>
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
                <Info className="h-4 w-4 mr-1" />
                Mehr Informationen
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-[500px]">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)} 
                className="absolute right-4 top-4"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Schließen</span>
              </Button>
              
              <AlertDialogHeader>
                <AlertDialogTitle>Zur Berechnung des Countdowns</AlertDialogTitle>
              </AlertDialogHeader>
              
              <AlertDialogDescription className="space-y-4 text-black">
                <p>
                  Die angezeigte Restzeit basiert auf dem spätestmöglichen regulären Wahltag der aktuellen Legislaturperiode gemäß Artikel 39 Absatz 1 des Grundgesetzes. Die Wahlperiode beträgt vier Jahre und beginnt mit dem ersten Zusammentritt des Bundestags (hier: 25. März 2025). Eine Neuwahl muss spätestens 48 Monate nach Beginn erfolgen.
                </p>
                
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Hinweis</AlertTitle>
                  <AlertDescription className="text-muted-foreground">
                    Dieses Datum gilt nicht, wenn der Bundestag vorzeitig aufgelöst wird. In diesem Fall muss eine Neuwahl innerhalb von 60 Tagen stattfinden (Art. 39 Abs. 1 GG). Auch bei einem Rücktritt des Bundeskanzlers oder einem erfolgreichen konstruktiven Misstrauensvotum kann sich die Regierungszeit faktisch verkürzen.
                  </AlertDescription>
                </Alert>
              </AlertDialogDescription>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default CountdownTimer;
