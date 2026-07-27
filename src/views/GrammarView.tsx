import React, { useState, useMemo } from 'react';
import { grammarData, GrammarPoint } from '../data/grammar';
import { Card } from '../components/Card';
import { useStore } from '../store';
import { cn } from '../lib/utils';
import { ArrowLeft, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export function GrammarView() {
  const { theme, playAudio } = useStore();
  const [filter, setFilter] = useState('N5');
  const [selected, setSelected] = useState<GrammarPoint | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const filteredGrammar = useMemo(() => {
    return grammarData.filter(g => g.level === filter);
  }, [filter]);

  const totalPages = Math.ceil(filteredGrammar.length / itemsPerPage);
  
  const currentGrammar = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredGrammar.slice(start, start + itemsPerPage);
  }, [filteredGrammar, currentPage]);

  // Reset page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  if (selected) {
    return (
      <div className="flex flex-col md:flex-row h-full">
        <div className="flex-1 p-4 md:p-6 w-full max-w-4xl mx-auto">
          <button 
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 mb-6 hover:underline text-sm font-medium"
          >
            <ArrowLeft size={16} /> இலக்கணத்திற்குத் திரும்பு
          </button>
          
          <h1 className="text-3xl font-bold mb-2">{selected.pattern}</h1>
          <p className="text-xl text-gray-500 mb-8">{selected.hiragana}</p>
          
          <div className={cn(
            "p-6 rounded-xl border mb-8",
            theme === 'dark' ? "bg-[#272727] border-gray-700" : "bg-gray-50 border-gray-200"
          )}>
            <h3 className="font-bold mb-2 uppercase text-xs tracking-wider text-gray-500">விளக்கம்</h3>
            <p className="text-lg leading-relaxed">{selected.tamilExplanation}</p>
          </div>
          
          <div className={cn(
            "p-6 rounded-xl border mb-8",
            theme === 'dark' ? "bg-red-900/20 border-red-900/50" : "bg-red-50 border-red-200"
          )}>
            <h3 className="font-bold mb-2 uppercase text-xs tracking-wider text-red-500 flex items-center gap-2">
              <AlertCircle size={16} /> பொதுவான தவறுகள்
            </h3>
            <p className="text-base text-red-600 dark:text-red-400">{selected.commonMistakes}</p>
          </div>
          
          <h3 className="font-bold mb-4 uppercase text-xs tracking-wider text-gray-500">உதாரணங்கள்</h3>
          <div className="flex flex-col gap-4 sm:gap-6 mb-10">
            {selected.examples.map((ex, i) => (
              <div key={i} className={cn(
                "p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6",
                theme === 'dark' ? "bg-[#272727] border-gray-700" : "bg-white border-gray-200"
              )}>
                <div>
                  <p className="text-xl font-bold mb-1">{ex.japanese}</p>
                  <p className="text-sm text-gray-500 mb-2">{ex.hiragana} • {ex.tamilPronunciation}</p>
                  
                  <p className="text-base font-medium">{ex.tamilTranslation}</p>
                </div>
                <button 
                  onClick={() => playAudio(ex.japanese, ex.tamilTranslation)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors border whitespace-nowrap",
                    theme === 'dark' ? "bg-[#333] border-gray-600 hover:bg-[#444]" : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                  )}
                >
                  கேட்க
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className={cn(
          "w-full md:w-80 p-4 border-t md:border-t-0 md:border-l overflow-y-auto",
          theme === 'dark' ? "border-gray-800 bg-[#0f0f0f]" : "border-gray-200 bg-white"
        )}>
          <h3 className="font-bold mb-4">மேலும் N5 இலக்கணம்</h3>
          <div className="flex flex-col gap-3">
            {grammarData.filter(g => g.id !== selected.id && g.level === 'N5').slice(0, 5).map(g => (
              <Card
                key={g.id}
                title={g.pattern}
                subtitle={g.tamilExplanation}
                onClick={() => setSelected(g)}
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
        <h1 className="text-2xl font-bold">இலக்கணம் <span className="text-sm font-normal text-gray-500 ml-2">({filteredGrammar.length} தலைப்புகள்)</span></h1>
        
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
      
      <div className={cn(
        "mb-8 p-6 rounded-xl border",
        theme === 'dark' ? "bg-[#272727] border-gray-700" : "bg-gray-50 border-gray-200"
      )}>
        <h2 className="text-xl font-bold mb-4">ஜப்பானிய இலக்கணம் எவ்வாறு செயல்படுகிறது</h2>
        <p className="mb-4 text-sm md:text-base leading-relaxed">
          ஆங்கிலத்தைப் போல கடுமையான "விதிகள்" (சொற்களின் வரிசை) இல்லாமல், ஜப்பானிய இலக்கணம் மூன்று முக்கிய கருத்துகளைச் சுற்றி வருகிறது:
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-2 text-sm md:text-base">
          <li><strong>உருபுகள்:</strong> வினைச்சொல்லுடனான தொடர்பைக் காட்ட பெயர்ச்சொற்களுடன் இணைக்கப்படும் சிறிய சொற்கள் (எ.கா: ஒரு சொல் எழுவாயா, செயப்படுபொருளா அல்லது இடமா என்பதைக் காட்ட).</li>
          <li><strong>வினைச்சொல் வடிவங்கள்:</strong> காலம், மரியாதை அல்லது "செய்ய விரும்புகிறேன்", "செய்ய முடியும்" போன்ற கருத்துகளை வெளிப்படுத்த வினைச்சொல்லின் முடிவை மாற்றுதல்.</li>
          <li><strong>வாக்கிய முடிவுகள் / அமைப்புகள்:</strong> வாக்கியத்தின் முடிவில் குறிப்பிட்ட சொற்றொடர்களைச் சேர்த்து அர்த்தத்தை நுணுக்கமாக்குதல் (எ.கா: "இருக்கலாம்" என்று கூற ~கமோஷிரெனை சேர்ப்பது).</li>
        </ul>
        <p className="text-sm md:text-base font-medium text-red-600 dark:text-red-400 mb-6">
          N5 மற்றும் N4 நிலைகளில் உள்ள ~200 தலைப்புகளை நீங்கள் கற்றுக்கொண்டால், ஜப்பானில் தடையின்றி உரையாட தேவையான அடிப்படை இலக்கணம் உங்களுக்கு கிடைத்துவிடும்!
        </p>

        <h3 className="font-bold mb-3">JLPT இலக்கணப் பகுப்பாய்வு</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className={theme === 'dark' ? "bg-[#1f1f1f]" : "bg-gray-200"}>
                <th className="p-3 border-b border-gray-300 dark:border-gray-600">நிலை</th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-600">கடினம்</th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-600">தலைப்புகள்</th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-600">கற்பவை</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-bold">N5</td>
                <td className="p-3">ஆரம்பம்</td>
                <td className="p-3">~80 - 100</td>
                <td className="p-3">அடிப்படை உருபுகள், நிகழ்காலம்/கடந்த காலம், எளிய கோரிக்கைகள்.</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-bold">N4</td>
                <td className="p-3">தொடக்க நிலை</td>
                <td className="p-3">~100 - 150</td>
                <td className="p-3">கொடுக்கும்/பெறும் வினைச்சொற்கள், சாத்தியக்கூறுகள், திட்டங்களை வெளிப்படுத்துதல்.</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-bold">N3</td>
                <td className="p-3">இடைநிலை</td>
                <td className="p-3">~150 - 200</td>
                <td className="p-3">செயப்பாட்டு/காரண வினைச்சொற்கள், உரையாடல் குறுக்குவழிகள்.</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-bold">N2</td>
                <td className="p-3">மேம்பட்ட ஆரம்பம்</td>
                <td className="p-3">~200</td>
                <td className="p-3">முறையான சொலவடைகள், வணிக ஜப்பானியம்.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">N1</td>
                <td className="p-3">மேம்பட்ட நிலை</td>
                <td className="p-3">~200+</td>
                <td className="p-3">அகாடமிக் அமைப்புகள், இலக்கிய வாக்கியங்கள்.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 snap-x">
        {['N5', 'N4', 'N3', 'N2', 'N1'].map(lvl => (
          <button
            key={lvl}
            onClick={() => setFilter(lvl)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap snap-start transition-colors border",
              filter === lvl 
                ? (theme === 'dark' ? "bg-white text-black border-white" : "bg-black text-white border-black")
                : (theme === 'dark' ? "bg-[#272727] text-gray-300 border-gray-700 hover:bg-[#3f3f3f]" : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200")
            )}
          >
            {lvl}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4 sm:gap-6 pb-12">
        {currentGrammar.map(grammar => (
          <Card
            key={grammar.id}
            title={grammar.pattern}
            subtitle={grammar.tamilExplanation}
            badge={grammar.level}
            onClick={() => setSelected(grammar)}
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-auto pt-6 pb-4">
          <div className="flex gap-1 overflow-x-auto max-w-[90vw] md:max-w-md scrollbar-hide py-2">
            {Array.from({ length: Math.min(totalPages, 10) }).map((_, i) => {
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
