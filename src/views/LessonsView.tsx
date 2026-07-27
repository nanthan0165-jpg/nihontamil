import React, { useState, useMemo } from 'react';
import { useStore } from '../store';
import { lessonsData, Lesson, LessonItem } from '../data/lessons';
import { Card } from '../components/Card';
import { cn } from '../lib/utils';
import { ChevronRight, ArrowLeft, Volume2, Info } from 'lucide-react';

export function LessonsView() {
  const { theme, playAudio } = useStore();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedItem, setSelectedItem] = useState<LessonItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;

  const totalPages = Math.ceil(lessonsData.length / itemsPerPage);
  const currentLessons = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return lessonsData.slice(start, start + itemsPerPage);
  }, [currentPage]);

  if (selectedLesson) {
    return (
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-3.5rem)]">
        <div className="flex-1 p-4 md:p-6 w-full max-w-4xl mx-auto">
          <button 
            onClick={() => {
              if (selectedItem) setSelectedItem(null);
              else setSelectedLesson(null);
            }}
            className="flex items-center gap-2 mb-6 hover:underline text-sm font-medium"
          >
            <ArrowLeft size={16} /> {selectedItem ? 'பாடத்திற்குத் திரும்பு' : 'பாடங்களுக்குத் திரும்பு'}
          </button>
          
          {selectedItem ? (
            <div className="flex flex-col md:flex-row gap-6">
              <div className={cn(
                "w-48 h-48 md:w-64 md:h-64 flex items-center justify-center text-5xl md:text-7xl rounded-2xl shadow-sm border mx-auto md:mx-0 flex-shrink-0 text-center p-4",
                theme === 'dark' ? "bg-[#272727] border-gray-700" : "bg-white border-gray-200"
              )}>
                {selectedItem.kanjiKana}
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{selectedItem.tamilMeaning}</h1>
                <div className="flex gap-2 flex-wrap mb-6">
                  {selectedItem.hiragana && selectedItem.hiragana !== selectedItem.kanjiKana && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                      உச்சரிப்பு: {selectedItem.hiragana}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                    தமிழ்: {selectedItem.tamilPronunciation}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">விளக்கம்</h3>
                  <p className="text-lg leading-relaxed">
                    {selectedItem.explanationTamil || "இந்த வார்த்தையை நன்கு பயிற்சி செய்யவும்."}
                  </p>
                </div>
                
                <button 
                  onClick={() => playAudio(selectedItem.kanjiKana, selectedItem.tamilMeaning)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold transition-colors shadow-lg"
                >
                  <Volume2 size={20} /> ஒலியைக் கேட்க
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-2">{selectedLesson.title}</h1>
              <p className={cn("mb-6", theme === 'dark' ? "text-gray-400" : "text-gray-600")}>
                {selectedLesson.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                {selectedLesson.items.map((item, idx) => (
                  <Card
                    key={idx}
                    title={item.kanjiKana}
                    subtitle={`${item.tamilPronunciation} • ${item.tamilMeaning}`}
                    onClick={() => setSelectedItem(item)}
                    onPlayAudio={(e) => {
                      e.stopPropagation();
                      playAudio(item.kanjiKana, item.tamilMeaning);
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 w-full max-w-7xl mx-auto flex flex-col h-full">
      <div className="flex justify-between items-center mb-6 mt-4 flex-wrap gap-4 sm:gap-6">
        <h1 className="text-2xl font-bold">பாடங்கள் <span className="text-sm font-normal text-gray-500 ml-2">({lessonsData.length} பாடங்கள்)</span></h1>
        
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 mr-2">பக்கம் {currentPage} / {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={cn("p-2 rounded-full border transition-colors", 
                currentPage === 1 ? "opacity-50 cursor-not-allowed border-gray-200" : (theme === 'dark' ? "hover:bg-[#333] border-gray-600" : "hover:bg-gray-100 border-gray-300")
              )}
            >
              <ArrowLeft size={16} />
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={cn("p-2 rounded-full border transition-colors", 
                currentPage === totalPages ? "opacity-50 cursor-not-allowed border-gray-200" : (theme === 'dark' ? "hover:bg-[#333] border-gray-600" : "hover:bg-gray-100 border-gray-300")
              )}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 sm:gap-6 flex-1">
        {currentLessons.map(lesson => (
          <Card
            key={lesson.id}
            title={lesson.title}
            subtitle={lesson.description}
            badge={lesson.level}
            onClick={() => setSelectedLesson(lesson)}
          />
        ))}
      </div>
    </div>
  );
}
