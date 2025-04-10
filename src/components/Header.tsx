import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import SuggestionForm from './SuggestionForm';
import { X, Menu, Heart, MessageSquare } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const GermanFlag: React.FC = () => {
  return (
    <>
      {/* Horizontal flag for larger screens */}
      <div className="hidden md:flex h-6 w-9 flex-col mr-2">
        <div className="h-1/3 bg-black"></div>
        <div className="h-1/3 bg-red-600"></div>
        <div className="h-1/3 bg-[#FFCC00]"></div>
      </div>
      
      {/* Vertical flag for smaller screens */}
      <div className="md:hidden h-6 w-1 flex flex-col mr-2">
        <div className="h-1/3 bg-black"></div>
        <div className="h-1/3 bg-red-600"></div>
        <div className="h-1/3 bg-[#FFCC00]"></div>
      </div>
    </>
  );
};

const Header: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsSheetOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center gap-8">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavigation('/')}>
            <GermanFlag />
            <span className="font-bold text-xl">Koalitionstracker 2025–2029</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <button 
              onClick={() => handleNavigation('/statistics')}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Statistiken
            </button>
            <button 
              onClick={() => handleNavigation('/about')}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Über uns
            </button>
            <button 
              onClick={() => handleNavigation('/impressum')}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Impressum
            </button>
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="hidden md:flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4" /> Feedback geben
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Feedback geben</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(false)}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Schließen</span>
                </Button>
              </div>
              <SuggestionForm type="feedback" onSuccess={() => {
                setIsDialogOpen(false);
                setIsSheetOpen(false);
              }} showTitle={false} />
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={showDonation} onOpenChange={setShowDonation}>
            <AlertDialogTrigger asChild>
              <Button className="hidden md:flex items-center gap-1.5 bg-yellow-500 hover:bg-yellow-600 text-white">
                <Heart className="h-4 w-4" /> Unterstützen
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <div className="p-4 text-center">
                <Heart className="h-16 w-16 mx-auto mb-4 text-red-500" />
                <h2 className="text-xl font-bold mb-4">Unterstützen Sie unsere Arbeit</h2>
                <p className="text-muted-foreground mb-6">
                  Der Koalitionstracker ist ein unabhängiges Projekt für mehr Transparenz in der Politik. 
                  Mit Ihrer Unterstützung können wir die Plattform weiterentwickeln und aktuell halten.
                </p>
                <Button asChild className="w-full mb-4">
                  <a href="https://www.betterplace.org/de/projects/134123-koalitionstracker-2025-2029" target="_blank" rel="noopener noreferrer">
                    Jetzt unterstützen
                  </a>
                </Button>
                <button 
                  onClick={() => {
                    setShowDonation(false);
                    setIsSheetOpen(false);
                  }} 
                  className="text-sm text-muted-foreground hover:text-gray-900"
                >
                  Vielleicht später
                </button>
              </div>
            </AlertDialogContent>
          </AlertDialog>

          {/* Mobile Menu Button */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6 transition-transform duration-200 hover:scale-110" />
                <span className="sr-only">Menü öffnen</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white dark:bg-gray-900">
              <div className="flex flex-col h-full">
                <div className="flex flex-col space-y-4 py-6">
                  <nav className="flex flex-col space-y-2">
                    <Link to="/statistics" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      Statistiken
                    </Link>
                    <Link to="/about" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      Über uns
                    </Link>
                    <Link to="/impressum" className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      Impressum
                    </Link>
                  </nav>
                  <div className="border-t pt-4 space-y-4">
                    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="w-full items-center gap-1.5">
                          <MessageSquare className="h-4 w-4" /> Feedback geben
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-lg font-semibold">Feedback geben</h2>
                          <Button variant="ghost" size="icon" onClick={() => {
                            setIsDialogOpen(false);
                            setIsSheetOpen(false);
                          }}>
                            <X className="h-4 w-4" />
                            <span className="sr-only">Schließen</span>
                          </Button>
                        </div>
                        <SuggestionForm type="feedback" onSuccess={() => {
                          setIsDialogOpen(false);
                          setIsSheetOpen(false);
                        }} showTitle={false} />
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog open={showDonation} onOpenChange={setShowDonation}>
                      <AlertDialogTrigger asChild>
                        <Button className="w-full items-center gap-1.5 bg-yellow-500 hover:bg-yellow-600 text-white">
                          <Heart className="h-4 w-4" /> Unterstützen
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <div className="p-4 text-center">
                          <Heart className="h-16 w-16 mx-auto mb-4 text-red-500" />
                          <h2 className="text-xl font-bold mb-4">Unterstützen Sie unsere Arbeit</h2>
                          <p className="text-muted-foreground mb-6">
                            Der Koalitionstracker ist ein unabhängiges Projekt für mehr Transparenz in der Politik. 
                            Mit Ihrer Unterstützung können wir die Plattform weiterentwickeln und aktuell halten.
                          </p>
                          <Button asChild className="w-full mb-4">
                            <a href="https://www.betterplace.org/de/projects/134123-koalitionstracker-2025-2029" target="_blank" rel="noopener noreferrer">
                              Jetzt unterstützen
                            </a>
                          </Button>
                          <button 
                            onClick={() => {
                              setShowDonation(false);
                              setIsSheetOpen(false);
                            }} 
                            className="text-sm text-muted-foreground hover:text-gray-900"
                          >
                            Vielleicht später
                          </button>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
