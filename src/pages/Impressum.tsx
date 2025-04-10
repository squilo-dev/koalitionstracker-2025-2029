import React from 'react';
import { Link } from 'react-router-dom';
import InfoBar from '@/components/InfoBar';
import Header from '@/components/Header';
import { ArrowLeft } from 'lucide-react';

const Impressum: React.FC = () => {
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

          <h1 className="text-3xl font-bold mb-8">Impressum & Datenschutz</h1>
          
          <section className="mt-4">
            <h2 className="text-2xl font-semibold mb-4">Impressum</h2>
            <div className="space-y-4">
              <p>
                Der Koalitionstracker ist ein unabhängiges Projekt, das von engagierten Bürgerinnen und Bürgern betrieben wird. Wir setzen uns für politische Transparenz und die Nachvollziehbarkeit von Regierungsarbeit ein.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Kontakt</h3>
                <p className="text-sm text-muted-foreground">
                  E-Mail: kontakt@koalitionstracker.de<br />
                  Telefon: +49 (0) 30 1234567
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Verantwortlich für den Inhalt</h3>
                <p className="text-sm text-muted-foreground">
                  Max Mustermann<br />
                  Musterstraße 123<br />
                  10115 Berlin
                </p>
              </div>
            </div>
          </section>
          
          <section className="mt-4">
            <h2 className="text-2xl font-semibold mb-4">Datenschutz</h2>
            <div className="space-y-4">
              <p>
                Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Nachfolgend informieren wir Sie über die Erhebung und Verarbeitung personenbezogener Daten bei der Nutzung unserer Website.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Datenerhebung und -verarbeitung</h3>
                <p className="text-sm text-muted-foreground">
                  Bei jedem Zugriff auf unsere Website werden automatisch Daten gespeichert, die Ihr Browser an uns übermittelt. Diese Daten umfassen:
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                  <li>IP-Adresse</li>
                  <li>Datum und Uhrzeit der Anfrage</li>
                  <li>Browsertyp und -version</li>
                  <li>Betriebssystem</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Wir verwenden Cookies, um die Nutzung unserer Website zu analysieren und zu verbessern. Sie können die Speicherung von Cookies in Ihren Browsereinstellungen deaktivieren.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Ihre Rechte</h3>
                <p className="text-sm text-muted-foreground">
                  Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit Ihrer gespeicherten Daten. Bei Fragen wenden Sie sich bitte an unsere Kontaktadresse.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mt-4">
            <h2 className="text-2xl font-semibold mb-4">Haftungsausschluss</h2>
            <div className="space-y-4">
              <p>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Externe Links</h3>
                <p className="text-sm text-muted-foreground">
                  Unser Angebot enthält Links zu externen Websites Dritter. Für die Inhalte der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
                </p>
              </div>
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Impressum; 