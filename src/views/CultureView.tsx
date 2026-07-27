import React from 'react';
import { CultureFeed } from '../components/CultureFeed';

export function CultureView() {
  return (
    <div className="py-4">
      <div className="max-w-lg mx-auto px-4 sm:px-6 mb-4">
        <h1 className="text-2xl font-black tracking-tight mt-4">ஜப்பானிய கலாச்சாரம் (Culture Feed)</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
          ஜப்பானிய கலாச்சாரம், உணவு முறைகள் மற்றும் பழக்கவழக்கங்களை சமூக ஊடகப் பாணியில் சுவாரஸ்யமாகக் கற்றுக்கொள்ளுங்கள்.
        </p>
      </div>
      <CultureFeed />
    </div>
  );
}

