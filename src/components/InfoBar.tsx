
import React from 'react';
import { Link } from 'react-router-dom';

const InfoBar: React.FC = () => {
  return (
    <div className="bg-gray-200 py-1.5 text-sm text-center text-gray-700">
      <p>
        Keine offizielle Website der Bundesregierung. Mehr über das Projekt erfahren Sie{' '}
        <Link to="/about" className="border-b border-dotted border-gray-700">
          hier
        </Link>.
      </p>
    </div>
  );
};

export default InfoBar;
