import React from 'react';
import { Link } from 'react-router-dom';

const InfoBar: React.FC = () => {
  return (
    <div className="bg-gray-200 py-1.5 text-sm text-center text-gray-700">
      <p className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
        <span><strong>Keine</strong> offizielle Website der Bundesregierung.</span>
        <span>Mehr über das Projekt erfahren Sie{' '}
        <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors border-b border-dotted border-gray-700 hover:border-gray-900 pb-[0.125rem]">
          hier
        </Link>.</span>
      </p>
    </div>
  );
};

export default InfoBar;
