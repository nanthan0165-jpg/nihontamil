import React, { useState, useMemo } from 'react';
import { kanjiData, Kanji } from '../data/kanji';
import { Card } from '../components/Card';
import { useStore } from '../store';
import { cn } from '../lib/utils';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

export function KanjiView() {
  const { theme, playAudio } = useStore();
  const [selected, setSelected] = useState<Kanji | null>(null);
  const [filter, setFilter] = useState('All');
  const [showTamilPronunciation, setShowTamilPronunciation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 60;

  const filteredKanji = useMemo(() => {
    return filter === 'All' ? kanjiData : kanjiData.filter(k => k.level === filter);
  }, [filter]);

  const totalPages = Math.ceil(filteredKanji.length / itemsPerPage);
  const currentKanji = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredKanji.slice(start, start + itemsPerPage);
  }, [filteredKanji, currentPage]);

  // Reset page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  if (selected) {
    return (
      <div className="flex flex-col md:flex-row h-full">
        <div className="flex-1 p-4 md:p-6 w-full max-w-4xl mx-auto">
          <button 
            onClick={() => { setSelected(null); setShowTamilPronunciation(false); }}
            className="flex items-center gap-2 mb-6 hover:underline text-sm font-medium"
          >
            <ArrowLeft size={16} /> கஞ்சிக்குத் திரும்பு
          </button>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className={cn(
              "w-48 h-48 md:w-64 md:h-64 flex items-center justify-center text-7xl md:text-9xl rounded-2xl shadow-sm border mx-auto md:mx-0 flex-shrink-0",
              theme === 'dark' ? "bg-[#272727] border-gray-700" : "bg-white border-gray-200"
            )}>
              {selected.character}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{selected.meaningTamil || 'தமிழ் அர்த்தம் இல்லை'}</h1>
              {/* Removed English meaning display */}
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">ஒன்யோமி (சீன உச்சரிப்பு)</h3>
                  <p className="text-lg flex items-center gap-4 sm:gap-6">
                    {selected.onyomi || 'N/A'}
                    {selected.onyomi && (
                      <button 
                        onClick={() => playAudio(selected.onyomi, "Onyomi reading")}
                        className="text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded"
                      >கேட்க</button>
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">குன்யோமி (ஜப்பானிய உச்சரிப்பு)</h3>
                  <p className="text-lg flex items-center gap-4 sm:gap-6">
                    {selected.kunyomi || 'N/A'}
                    {selected.kunyomi && (
                      <button 
                        onClick={() => playAudio(selected.kunyomi, "Kunyomi reading")}
                        className="text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded"
                      >கேட்க</button>
                    )}
                  </p>
                </div>
                
                <div className="pt-4">
                  <button 
                    onClick={() => setShowTamilPronunciation(!showTamilPronunciation)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                      theme === 'dark' ? "bg-[#333] border-gray-600 hover:bg-[#444]" : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                    )}
                  >
                    தமிழ் உச்சரிப்பைக் காட்டு
                  </button>
                  
                  {showTamilPronunciation && (
                    <div className={cn(
                      "mt-4 p-4 rounded-lg",
                      theme === 'dark' ? "bg-[#272727]" : "bg-gray-50"
                    )}>
                      {selected.tamilPronunciationInfo || "மொழிபெயர்ப்பு நிலுவையில் உள்ளது"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {selected.examples && selected.examples.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2 dark:border-gray-800">உதாரண வாக்கியங்கள்</h2>
              <div className="space-y-4">
                {selected.examples.map((ex, i) => (
                  <div key={i} className={cn(
                    "p-5 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4",
                    theme === 'dark' ? "bg-[#272727] border-gray-700" : "bg-white border-gray-200"
                  )}>
                    <div className="flex-1">
                      <div className="text-xl font-medium mb-1">{ex.japanese}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{ex.hiragana}</div>
                      <div className="text-sm text-red-600 dark:text-red-400 mb-1 font-medium">{ex.tamilPronunciation}</div>
                      <div className="text-md">{ex.tamilMeaning}</div>
                    </div>
                    <button 
                      onClick={() => playAudio(ex.japanese, ex.tamilMeaning)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors border whitespace-nowrap self-start md:self-center",
                        theme === 'dark' ? "bg-[#333] border-gray-600 hover:bg-[#444]" : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                      )}
                    >
                      ஒலியைக் கேட்க
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Sidebar for Up Next / Related (YouTube Style) */}
        <div className={cn(
          "w-full md:w-80 p-4 border-t md:border-t-0 md:border-l overflow-y-auto",
          theme === 'dark' ? "border-gray-800 bg-[#0f0f0f]" : "border-gray-200 bg-white"
        )}>
          <h3 className="font-bold mb-4">தொடர்புடைய கஞ்சி ({selected.level})</h3>
          <div className="flex flex-col gap-3">
            {kanjiData.filter(k => k.id !== selected.id && k.level === selected.level).slice(0, 10).map(k => (
              <Card
                key={k.id}
                title={k.character}
                subtitle={k.meaningTamil || 'தமிழ் அர்த்தம் இல்லை'}
                badge={k.level}
                onClick={() => {
                  setSelected(k);
                  setShowTamilPronunciation(false);
                }}
                className="text-sm"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 w-full max-w-7xl mx-auto flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 mt-4 flex-wrap gap-4 sm:gap-6">
        <h1 className="text-2xl font-bold">கஞ்சி <span className="text-sm font-normal text-gray-500 ml-2">({filteredKanji.length} எழுத்துக்கள்)</span></h1>
        
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 mr-2">பக்கம் {currentPage} / {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full border disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full border disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
      
      {/* YouTube-style filter chips */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 snap-x">
        {['அனைத்தும்', 'N5', 'N4', 'N3', 'N2', 'N1'].map(lvl => (
          <button
            key={lvl}
            onClick={() => setFilter(lvl === 'அனைத்தும்' ? 'All' : lvl)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap snap-start transition-colors border",
              (filter === lvl || (filter === 'All' && lvl === 'அனைத்தும்'))
                ? (theme === 'dark' ? "bg-white text-black border-white" : "bg-black text-white border-black")
                : (theme === 'dark' ? "bg-[#272727] text-gray-300 border-gray-700 hover:bg-[#3f3f3f]" : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200")
            )}
          >
            {lvl}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 sm:gap-6 pb-12">
        {currentKanji.map(kanji => (
          <Card
            key={kanji.id}
            title={kanji.character}
            subtitle={kanji.meaningTamil || 'தமிழ் அர்த்தம் இல்லை'}
            badge={kanji.level}
            onClick={() => setSelected(kanji)}
            className="text-center"
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-auto pt-6 pb-4">
          <div className="flex gap-1 overflow-x-auto max-w-[90vw] md:max-w-md scrollbar-hide py-2">
            {Array.from({ length: Math.min(totalPages, 10) }).map((_, i) => {
              // Simple logic for showing pages
              let pageToShow = i + 1;
              if (totalPages > 10 && currentPage > 5) {
                pageToShow = currentPage - 5 + i;
                if (pageToShow > totalPages) return null;
              }
              
              return (
                <button
                  key={pageToShow}
                  onClick={() => setCurrentPage(pageToShow)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors flex-shrink-0",
                    currentPage === pageToShow
                      ? (theme === 'dark' ? "bg-white text-black" : "bg-black text-white")
                      : (theme === 'dark' ? "bg-[#272727] hover:bg-[#3f3f3f]" : "bg-gray-100 hover:bg-gray-200")
                  )}
                >
                  {pageToShow}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
