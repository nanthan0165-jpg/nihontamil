import React from 'react';
import { useStore } from '../store';
import { cn } from '../lib/utils';
import { Flame, CheckCircle, Book, Type, RotateCcw } from 'lucide-react';
import { lessonsData } from '../data/lessons';
import { kanjiData } from '../data/kanji';
import { vocabularyData } from '../data/vocabulary';

export function ProgressView() {
  const { theme, progress, resetProgress } = useStore();

    const stats = [
      { label: "தொடர்ச்சியான நாட்கள்", value: progress.streak, icon: <Flame className="text-orange-500" size={24} />, total: null },
      { label: "பாடங்கள்", value: progress.completedLessons.length, icon: <CheckCircle className="text-blue-500" size={24} />, total: lessonsData.length },
      { label: "கஞ்சி", value: progress.learnedKanji.length, icon: <Type className="text-green-500" size={24} />, total: kanjiData.length },
      { label: "சொற்கள்", value: progress.masteredVocab.length, icon: <Book className="text-purple-500" size={24} />, total: vocabularyData.length },
    ];

    return (
      <div className="p-4 md:p-6 w-full max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 mt-4">முன்னேற்றம்</h1>
        
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 sm:gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className={cn(
              "p-4 rounded-xl border flex flex-col items-center justify-center text-center",
              theme === 'dark' ? "bg-[#272727] border-gray-700" : "bg-white border-gray-200"
            )}>
              <div className="mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold mb-1">
                {stat.value}
                {stat.total !== null && <span className="text-sm font-normal text-gray-500"> / {stat.total}</span>}
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className={cn(
          "p-6 rounded-xl border mb-8",
          theme === 'dark' ? "bg-[#272727] border-gray-700" : "bg-white border-gray-200"
        )}>
          <h2 className="text-lg font-bold mb-4">செயல்பாடு</h2>
          <div className="flex h-32 items-end gap-2 overflow-hidden">
            {/* Mock bar chart */}
            {[2, 5, 3, 7, 4, 6, 8, 3, 5, 2, 8, 4, 6, 9].map((val, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex-1 rounded-t-sm opacity-80",
                  theme === 'dark' ? "bg-red-600" : "bg-red-500"
                )}
                style={{ height: `${(val / 10) * 100}%` }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-12">
          <button 
            onClick={() => {
              if (window.confirm("உங்கள் அனைத்து முன்னேற்றங்களையும் மீட்டமைக்க உறுதியாக உள்ளீர்களா? இதை மாற்றியமைக்க முடியாது.")) {
                resetProgress();
              }
            }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border",
              theme === 'dark' ? "text-red-400 border-red-900/50 hover:bg-red-900/20" : "text-red-600 border-red-200 hover:bg-red-50"
            )}
          >
            <RotateCcw size={16} /> முன்னேற்றத்தை மீட்டமை
          </button>
        </div>
      </div>
    );
}
