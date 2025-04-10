import React from 'react';
import { Link } from 'react-router-dom';
import InfoBar from '@/components/InfoBar';
import Header from '@/components/Header';
import { ArrowLeft } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col" id="top">
      <InfoBar />
      <Header />
      
      <main className="container mx-auto py-8 px-4 flex-grow">
        <div className="max-w-3xl mx-auto prose prose-left">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors border-b border-dotted border-gray-700 hover:border-gray-900 pb-0.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Zurück zur Startseite</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-8">Über den Koalitionstracker</h1>
          
          <section>
            <p>
              Der Koalitionstracker 2025-2029 ist ein unabhängiges Projekt, das die Umsetzung der Vorhaben aus dem Koalitionsvertrag der Bundesregierung zwischen CDU/CSU und SPD dokumentiert.
            </p>
          </section>
          
          <section className="mt-4">
            <h2 className="text-2xl font-semibold mb-4">Unsere Mission</h2>
            <div className="space-y-4">
              <p>
                Wir möchten politische Transparenz fördern und den Bürgerinnen und Bürgern ermöglichen, den Fortschritt der Regierungsarbeit nachzuvollziehen. Dieser Tracker ist ein unparteiisches Werkzeug zur Beobachtung der Umsetzung von Regierungsvorhaben.
              </p>
            </div>
          </section>
          
          <section className="mt-4">
            <h2 className="text-2xl font-semibold mb-4">Wir sind auf Unterstützung angewiesen</h2>
            <div className="space-y-4">
              <p>
                Aus einem leidenschaftlichen Projekt ist eine gemeinschaftlich getragene Plattform entstanden – für alle, die offene und nachvollziehbare Politik wichtig finden. Jeder Beitrag hilft dabei, den Betrieb dieser Seite zu sichern.
              </p>
            </div>
          </section>
          
          <section className="mt-4">
            <h2 className="text-2xl font-semibold mb-4">Methodik</h2>
            <div className="space-y-4">
              <p>
                Die auf diesem Portal gelisteten Vorhaben wurden aus dem Koalitionsvertrag extrahiert. Der Fortschritt wird anhand öffentlich verfügbarer Informationen bewertet und in folgende Kategorien eingeordnet:
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-md bg-white shadow-sm">
                  <div className="w-3 h-12 rounded-md bg-[#4CAF50]"></div>
                  <div>
                    <h3 className="font-medium">Umgesetzt</h3>
                    <p className="text-sm text-muted-foreground">Das Vorhaben wurde vollständig wie im Koalitionsvertrag beschrieben umgesetzt.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-md bg-white shadow-sm">
                  <div className="w-3 h-12 rounded-md bg-[#FFC107]"></div>
                  <div>
                    <h3 className="font-medium">Teilweise umgesetzt</h3>
                    <p className="text-sm text-muted-foreground">Wesentliche Teile des Vorhabens wurden realisiert, andere stehen noch aus.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-md bg-white shadow-sm">
                  <div className="w-3 h-12 rounded-md bg-[#2196F3]"></div>
                  <div>
                    <h3 className="font-medium">Begonnen</h3>
                    <p className="text-sm text-muted-foreground">Die Umsetzung des Vorhabens wurde begonnen, aber wesentliche Schritte stehen noch aus.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-md bg-white shadow-sm">
                  <div className="w-3 h-12 rounded-md bg-[#aaadb0]"></div>
                  <div>
                    <h3 className="font-medium">Nicht begonnen</h3>
                    <p className="text-sm text-muted-foreground">Es sind keine konkreten Schritte zur Umsetzung erkennbar.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 rounded-md bg-white shadow-sm">
                  <div className="w-3 h-12 rounded-md bg-[#F44336]"></div>
                  <div>
                    <h3 className="font-medium">Verschoben</h3>
                    <p className="text-sm text-muted-foreground">Das Vorhaben wurde offiziell auf unbestimmte Zeit verschoben oder aufgegeben.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mt-4">
            <h2 className="text-2xl font-semibold mb-4">Inspiration</h2>
            <div className="space-y-4">
              <p>
                SPIEGEL, FragDenStaat und Süddeutsche Zeitung haben in der Vergangenheit ähnliche Tracker erstellt. Dieser Tracker hat Inspiration aus diesen Projekten gezogen.
              </p>
            </div>
          </section>
          
          <section className="mt-4">
            <h2 className="text-2xl font-semibold mb-4">Kontakt</h2>
            <div className="space-y-4">
              <p>
                Für Feedback, Korrekturen oder Anfragen können Sie uns über die "Feedback geben"-Funktion kontaktieren.
              </p>
            </div>
          </section>
          
          <div className="mt-8 pt-4 border-t">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors border-b border-dotted border-gray-700 hover:border-gray-900 pb-0.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Zurück zur Startseite</span>
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-4 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">Entwickelt in Deutschland 🇩🇪</p>
            <div className="flex items-center gap-4">
              <Link to="/about#top" className="text-sm text-muted-foreground hover:text-coalition-primary dotted-link">
                Über das Projekt
              </Link>
              <Link to="/impressum#top" className="text-sm text-muted-foreground hover:text-coalition-primary dotted-link">
                Impressum & Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
