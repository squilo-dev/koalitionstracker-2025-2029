
import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark } from 'lucide-react';

const InfoBar: React.FC = () => {
  return (
    <div className="bg-gray-200 py-1.5 text-sm text-center text-gray-700">
      <p className="flex items-center justify-center gap-1.5">
        <Landmark className="h-4 w-4 text-gray-700 line-through" />
        <span><strong>Keine</strong> offizielle Website der Bundesregierung. Mehr über das Projekt erfahren Sie{' '}
        <Link to="/about" className="border-b border-dotted border-gray-700">
          hier
        </Link>.</span>
      </p>
    </div>
  );
};

export default InfoBar;
