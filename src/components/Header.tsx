
import React, { useState, useEffect } from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import SuggestionForm from './SuggestionForm';

const germanFlag = (
  <div className="h-8 w-12 flex flex-col mr-3">
    <div className="h-1/3 bg-black"></div>
    <div className="h-1/3 bg-red-600"></div>
    <div className="h-1/3 bg-[#FFCC00]"></div>
  </div>
);

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showDonation, setShowDonation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className={`bg-white sticky top-0 z-30 shadow transition-all duration-200 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center cursor-pointer" onClick={scrollToTop}>
          {germanFlag}
          <h1 className={`font-bold transition-all duration-200 ${scrolled ? 'text-2xl' : 'text-3xl'} text-coalition-dark`}>
            Koalitionstracker 2025–2029
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <AlertDialog open={showFeedback} onOpenChange={setShowFeedback}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4" /> Feedback geben
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md">
              <SuggestionForm type="bug" onSuccess={() => setShowFeedback(false)} />
            </AlertDialogContent>
          </AlertDialog>
          
          <AlertDialog open={showDonation} onOpenChange={setShowDonation}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1.5">
                <Heart className="h-4 w-4" /> Unterstützen
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md">
              <div className="p-4 text-center">
                <Heart className="h-16 w-16 mx-auto mb-4 text-red-500" />
                <h2 className="text-xl font-bold mb-4">Unterstütze uns</h2>
                <p className="text-muted-foreground mb-6">
                  Ihre Unterstützung schafft Transparenz. Helfen Sie uns, diese wichtige Plattform für die Dokumentation der Aktivitäten dieser Regierung zu erhalten und aus Rohdaten öffentliche Informationen zu machen.
                </p>
                <Button asChild>
                  <a href="https://buymeacoffee.com/koalitionstracker" target="_blank" rel="noopener noreferrer">
                    Unterstützen
                  </a>
                </Button>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </header>
  );
};

export default Header;
