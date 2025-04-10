
import React from 'react';
import { Link } from 'react-router-dom';
import InfoBar from '@/components/InfoBar';
import Header from '@/components/Header';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col" id="top">
      <InfoBar />
      <Header />
      
      <main className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Über den Koalitionstracker</h1>
        
        <div className="prose max-w-3xl">
          <p>
            Der Koalitionstracker 2025-2029 ist ein unabhängiges Projekt, das die Umsetzung der Vorhaben aus dem Koalitionsvertrag der Bundesregierung zwischen CDU/CSU und SPD dokumentiert.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Unsere Mission</h2>
          <p>
            Wir möchten politische Transparenz fördern und den Bürgerinnen und Bürgern ermöglichen, den Fortschritt der Regierungsarbeit nachzuvollziehen. Dieser Tracker ist ein unparteiisches Werkzeug zur Beobachtung der Umsetzung von Regierungsvorhaben.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Wir sind auf Unterstützung angewiesen</h2>
          <p>
            Aus einem leidenschaftlichen Projekt ist eine gemeinschaftlich getragene Plattform entstanden – für alle, die offene und nachvollziehbare Politik wichtig finden. Jeder Beitrag hilft dabei, den Betrieb dieser Seite zu sichern.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Methodik</h2>
          <p>
            Die auf diesem Portal gelisteten Vorhaben wurden aus dem Koalitionsvertrag extrahiert. Der Fortschritt wird anhand öffentlich verfügbarer Informationen bewertet und in folgende Kategorien eingeordnet:
          </p>
          <ul className="list-disc pl-5 my-4 space-y-2">
            <li><span className="font-medium">Umgesetzt:</span> Das Vorhaben wurde vollständig wie im Koalitionsvertrag beschrieben umgesetzt.</li>
            <li><span className="font-medium">Teilweise umgesetzt:</span> Wesentliche Teile des Vorhabens wurden realisiert, andere stehen noch aus.</li>
            <li><span className="font-medium">Begonnen:</span> Die Umsetzung des Vorhabens wurde begonnen, aber wesentliche Schritte stehen noch aus.</li>
            <li><span className="font-medium">Nicht begonnen:</span> Es sind keine konkreten Schritte zur Umsetzung erkennbar.</li>
            <li><span className="font-medium">Verschoben:</span> Das Vorhaben wurde offiziell auf unbestimmte Zeit verschoben oder aufgegeben.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Inspiration</h2>
          <p>
            SPIEGEL, FragDenStaat und Süddeutsche Zeitung haben in der Vergangenheit ähnliche Tracker erstellt. Dieser Tracker hat Inspiration aus diesen Projekten gezogen.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Kontakt</h2>
          <p>
            Für Feedback, Korrekturen oder Anfragen können Sie uns über die "Feedback geben"-Funktion kontaktieren.
          </p>
          
          <div className="mt-8 pt-4 border-t">
            <Link to="/" className="dotted-link">Zurück zur Startseite</Link>
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
