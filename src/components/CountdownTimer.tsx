
import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from 'lucide-react';

const END_DATE = new Date('2029-03-25T23:59:59');

interface TimeLeft {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    years: 0,
    months: 0,
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
        const days = Math.floor(difference / (1000 * 60 * 60 * 24) % 30);
        const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30) % 12);
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
        
        setTimeLeft({ years, months, days, hours, minutes, seconds });
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
      <div className="text-2xl font-bold mb-2">
        {timeLeft.years} Jahre, {timeLeft.months} Monate, {timeLeft.days} Tage, {timeLeft.hours} Stunden, {timeLeft.minutes} Minuten
      </div>
      
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <button className="text-sm text-muted-foreground border-b border-dotted border-muted-foreground">
            Zeit bis Ende der Legislaturperiode
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[500px]">
          <AlertDialogHeader className="flex justify-between items-start">
            <AlertDialogTitle>Zur Berechnung des Countdowns</AlertDialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </AlertDialogHeader>
          <AlertDialogDescription className="space-y-4">
            <p>
              Wie berechnet sich dieser Countdown? Die angezeigte Restzeit basiert auf dem spätestmöglichen regulären Wahltag der aktuellen Legislaturperiode gemäß Artikel 39 Absatz 1 des Grundgesetzes. Die Wahlperiode beträgt vier Jahre und beginnt mit dem ersten Zusammentritt des Bundestags (hier: 25. März 2025). Eine Neuwahl muss spätestens 48 Monate nach Beginn erfolgen.
            </p>
            
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Hinweis</AlertTitle>
              <AlertDescription>
                Dieses Datum gilt nicht, wenn der Bundestag vorzeitig aufgelöst wird. In diesem Fall muss eine Neuwahl innerhalb von 60 Tagen stattfinden (Art. 39 Abs. 1 GG). Auch bei einem Rücktritt des Bundeskanzlers oder einem erfolgreichen konstruktiven Misstrauensvotum kann sich die Regierungszeit faktisch verkürzen.
              </AlertDescription>
            </Alert>
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CountdownTimer;
