import React, { useState, useEffect } from 'react';
import { vocabularyData, Vocabulary } from '../data/vocabulary';
import { Card } from '../components/Card';
import { useStore } from '../store';
import { cn } from '../lib/utils';
import { LayoutList, LayoutGrid, ArrowLeft, Smartphone, Volume2, Eye, EyeOff, Heart, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

export function VocabularyView() {
  const { theme, playAudio, progress, markVocabMastered } = useStore();
  const [filter, setFilter] = useState('N5');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'shorts'>('shorts');
  const [selected, setSelected] = useState<Vocabulary | null>(null);
  const [visibleCount, setVisibleCount] = useState(40);
  
  // YouTube Shorts layout states
  const [activeShortIndex, setActiveShortIndex] = useState(0);
  const [revealMeaning, setRevealMeaning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const filteredVocab = vocabularyData.filter(v => v.level === filter);
  const visibleVocab = filteredVocab.slice(0, visibleCount);

  const handleFilterChange = (lvl: string) => {
    setFilter(lvl);
    setVisibleCount(40);
    setActiveShortIndex(0);
    setRevealMeaning(false);
  };

  const handleNextShort = () => {
    if (activeShortIndex < filteredVocab.length - 1) {
      setActiveShortIndex(prev => prev + 1);
      setRevealMeaning(false);
    }
  };

  const handlePrevShort = () => {
    if (activeShortIndex > 0) {
      setActiveShortIndex(prev => prev - 1);
      setRevealMeaning(false);
    }
  };

  // Keyboard navigation for Shorts mode
  useEffect(() => {
    if (viewMode !== 'shorts') return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeShortIndex > 0) {
          setActiveShortIndex(prev => prev - 1);
          setRevealMeaning(false);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeShortIndex < filteredVocab.length - 1) {
          setActiveShortIndex(prev => prev + 1);
          setRevealMeaning(false);
        }
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        setRevealMeaning(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [viewMode, activeShortIndex, filteredVocab.length]);

  // Touch swiping handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance) {
      // Swipe Up -> Next
      handleNextShort();
    } else if (distance < -minSwipeDistance) {
      // Swipe Down -> Prev
      handlePrevShort();
    }
  };

  // Trackpad / Mousewheel navigation
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 30) {
      handleNextShort();
    } else if (e.deltaY < -30) {
      handlePrevShort();
    }
  };

  if (selected) {
    return (
      <div className="flex flex-col md:flex-row h-full">
        <div className="flex-1 p-4 md:p-6 w-full max-w-4xl mx-auto">
          <button 
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 mb-6 hover:underline text-sm font-medium"
          >
            <ArrowLeft size={16} /> சொற்களுக்குத் திரும்பு
          </button>
          
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{selected.japanese}</h1>
              <p className="text-xl text-gray-500 mb-2">{selected.hiragana} • <span className="text-red-500">{selected.tamilPronunciation}</span></p>
              <h2 className="text-2xl font-semibold">{selected.tamilMeaning}</h2>
            </div>
            
            <div className={cn(
              "p-6 rounded-xl border",
              theme === 'dark' ? "bg-[#272727] border-gray-700" : "bg-gray-50 border-gray-200"
            )}>
              <h3 className="font-bold mb-4 uppercase text-xs tracking-wider text-gray-500">உதாரண வாக்கியம்</h3>
              <p className="text-lg mb-4">{selected.exampleSentence}</p>
              <button 
                onClick={() => playAudio(selected.exampleSentence, selected.tamilMeaning)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors border flex items-center gap-2",
                  theme === 'dark' ? "bg-[#333] border-gray-600 hover:bg-[#444]" : "bg-white border-gray-300 hover:bg-gray-100"
                )}
              >
                கேட்க
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Sidebar for Up Next */}
        <div className={cn(
          "w-full md:w-80 p-4 border-t md:border-t-0 md:border-l overflow-y-auto",
          theme === 'dark' ? "border-gray-800 bg-[#0f0f0f]" : "border-gray-200 bg-white"
        )}>
          <h3 className="font-bold mb-4">தொடர்புடைய சொற்கள்</h3>
          <div className="flex flex-col gap-3">
            {vocabularyData.filter(v => v.id !== selected.id && v.level === selected.level).slice(0, 5).map(v => (
              <Card
                key={v.id}
                title={v.japanese}
                subtitle={v.tamilMeaning}
                badge={v.partOfSpeech}
                onClick={() => setSelected(v)}
                className="text-sm"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 mt-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            சொற்களஞ்சியம்
          </h1>
          <p className={cn("text-xs mt-1", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>
            {viewMode === 'shorts' ? "ஸ்வைப்பிங் முறையில் எளிதாக சொற்களைக் கற்கவும்" : "முறையாக வகைப்படுத்தப்பட்ட ஜப்பானிய சொற்கள்"}
          </p>
        </div>
        <div className="flex gap-2 self-stretch sm:self-auto justify-end">
          <button 
            onClick={() => setViewMode('shorts')}
            className={cn(
              "p-2 px-3 rounded flex items-center gap-1.5 transition-all text-xs font-semibold border",
              viewMode === 'shorts' 
                ? (theme === 'dark' ? "bg-white text-black border-white" : "bg-black text-white border-black") 
                : (theme === 'dark' ? "bg-[#1f1f1f] border-gray-800 text-gray-400 hover:text-white" : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100")
            )}
            title="Shorts View (ஸ்வைப்பிங் முறை)"
          >
            <Smartphone size={16} />
            <span>Shorts</span>
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-2 px-3 rounded flex items-center gap-1.5 transition-all text-xs font-semibold border",
              viewMode === 'grid' 
                ? (theme === 'dark' ? "bg-white text-black border-white" : "bg-black text-white border-black") 
                : (theme === 'dark' ? "bg-black text-white border-black" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100")
            )}
            title="Grid View (வரிசை முறை)"
          >
            <LayoutGrid size={16} />
            <span>Grid</span>
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={cn(
              "p-2 px-3 rounded flex items-center gap-1.5 transition-all text-xs font-semibold border",
              viewMode === 'list' 
                ? (theme === 'dark' ? "bg-white text-black border-white" : "bg-black text-white border-black") 
                : (theme === 'dark' ? "bg-black text-white border-black" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100")
            )}
            title="List View (பட்டியல் முறை)"
          >
            <LayoutList size={16} />
            <span>List</span>
          </button>
        </div>
      </div>
      
      {viewMode !== 'shorts' && (
        <div className={cn(
          "p-6 rounded-xl border mb-8",
          theme === 'dark' ? "bg-[#272727] border-gray-700" : "bg-gray-50 border-gray-200"
        )}>
          <h2 className="text-xl font-bold mb-4">ஜப்பானிய சொற்களஞ்சியம்</h2>
          <p className="mb-4 text-sm md:text-base leading-relaxed">
            ஜப்பானிய சொற்களஞ்சியம் JLPT (ஜப்பானிய மொழித் திறன் தேர்வு) அடிப்படையில் முறையாக வகைப்படுத்தப்பட்டுள்ளது. மொத்தமாக சுமார் 1,000 இலக்கண விதிகளை மட்டுமே கற்க வேண்டியிருந்தாலும், சொற்களஞ்சியத்தின் எண்ணிக்கை மிக வேகமாக வளர்கிறது.
          </p>
          <p className="mb-6 text-sm md:text-base leading-relaxed">
            அடிப்படை உரையாடல் திறனை (N3) அடைய, உங்களுக்கு சுமார் 3,000 முதல் 4,000 சொற்கள் தெரிந்திருக்க வேண்டும். ஜப்பானிய செய்தித்தாள் படிக்க அல்லது முழுமையான ஜப்பானிய வணிகச் சூழலில் பணிபுரிய (N1), உங்களுக்கு சுமார் 10,000 சொற்கள் தேவைப்படும்.
          </p>
          
          <h3 className="font-bold mb-3">JLPT சொற்களஞ்சியப் பகுப்பாய்வு</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className={theme === 'dark' ? "bg-[#1f1f1f]" : "bg-gray-200"}>
                  <th className="p-3 border-b border-gray-300 dark:border-gray-600">JLPT நிலை</th>
                  <th className="p-3 border-b border-gray-300 dark:border-gray-600">கடினம்</th>
                  <th className="p-3 border-b border-gray-300 dark:border-gray-600">மொத்த எண்ணிக்கை</th>
                  <th className="p-3 border-b border-gray-300 dark:border-gray-600">புதிய சொற்கள்</th>
                  <th className="p-3 border-b border-gray-300 dark:border-gray-600">உங்களால் என்ன செய்ய முடியும்?</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-3 font-bold">N5</td>
                  <td className="p-3">ஆரம்பம்</td>
                  <td className="p-3">~800</td>
                  <td className="p-3">800</td>
                  <td className="p-3">அடிப்படைத் தேவைகள்: வாழ்த்துகள், எண்கள், நாட்கள், உணவு, எளிய வினைச்சொற்கள்.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">N4</td>
                  <td className="p-3">தொடக்க நிலை</td>
                  <td className="p-3">~1,500</td>
                  <td className="p-3">+700</td>
                  <td className="p-3">அன்றாட வாழ்க்கை: ஷாப்பிங் செய்தல், வழிகளைக் கேட்டல், உணர்வுகளை வெளிப்படுத்துதல்.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* YouTube-style filter chips */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 snap-x scrollbar-none">
        {['N5', 'N4', 'N3', 'N2', 'N1'].map(lvl => (
          <button
            key={lvl}
            onClick={() => handleFilterChange(lvl)}
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

      {viewMode === 'shorts' ? (
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto py-2">
          {filteredVocab.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">இந்த பிரிவில் இன்னும் சொற்கள் சேர்க்கப்படவில்லை.</p>
            </div>
          ) : (
            (() => {
              const current = filteredVocab[activeShortIndex];
              const isMastered = progress.masteredVocab.includes(current.id);
              const progressPercentage = ((activeShortIndex + 1) / filteredVocab.length) * 100;
              
              return (
                <div 
                  className={cn(
                    "relative w-full aspect-[9/16] max-w-[380px] h-[550px] rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden border transition-all duration-300",
                    theme === 'dark' 
                      ? "bg-gradient-to-b from-[#1c1c1e] to-[#0a0a0a] border-gray-800 text-white" 
                      : "bg-gradient-to-b from-gray-50 to-gray-200 border-gray-200 text-gray-900"
                  )}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  onWheel={handleWheel}
                >
                  {/* Top Red Youtube-like Progress Scrubber */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800/30 z-20">
                    <div 
                      className="h-full bg-red-600 transition-all duration-300 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  
                  {/* Card Header Info */}
                  <div className="p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/20 to-transparent">
                    <span className={cn(
                      "text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider",
                      theme === 'dark' ? "bg-white/10 text-white" : "bg-black/5 text-gray-700"
                    )}>
                      {current.level} • {activeShortIndex + 1}/{filteredVocab.length}
                    </span>
                    <span className="text-xs font-semibold text-red-600 animate-pulse flex items-center gap-1">
                      <Sparkles size={12} /> SHORTS MODE
                    </span>
                  </div>

                  {/* Main Word Center Content */}
                  <div 
                    onClick={() => {
                      playAudio(current.japanese, current.tamilMeaning);
                    }}
                    className="flex-1 flex flex-col justify-center items-center px-6 text-center select-none cursor-pointer group active:scale-95 transition-transform duration-200"
                  >
                    <h2 className={cn(
                      "font-bold mb-4 tracking-wide break-all transition-all duration-300 drop-shadow-md",
                      current.japanese.length > 8 ? "text-4xl" : "text-5xl md:text-6xl"
                    )}>
                      {current.japanese}
                    </h2>
                    
                    <p className={cn(
                      "text-lg mb-2 opacity-90 transition-all font-semibold",
                      theme === 'dark' ? "text-gray-300" : "text-gray-650"
                    )}>
                      {current.hiragana}
                    </p>
                    
                    <span className="px-3 py-1 bg-red-500/15 border border-red-500/25 text-red-500 rounded-lg text-sm font-bold tracking-wide mt-1">
                      {current.tamilPronunciation}
                    </span>
                    
                    <p className={cn(
                      "text-xs mt-4 opacity-50 italic group-hover:opacity-80 transition-opacity",
                      theme === 'dark' ? "text-gray-400" : "text-gray-550"
                    )}>
                      உச்சரிக்க தட்டவும் (Tap to listen)
                    </p>
                  </div>

                  {/* Bottom Panel (Tamil Meaning and Example Sentence) */}
                  <div className={cn(
                    "p-6 z-10 border-t",
                    theme === 'dark' ? "bg-black/40 border-white/5" : "bg-white/40 border-black/5"
                  )}>
                    {!revealMeaning ? (
                      <div className="flex flex-col items-center justify-center py-2">
                        <button 
                          onClick={() => setRevealMeaning(true)}
                          className="px-6 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-md animate-bounce"
                        >
                          <Eye size={16} /> விடை காண்க (Reveal)
                        </button>
                        <p className={cn(
                          "text-xs mt-2 text-center",
                          theme === 'dark' ? "text-gray-500" : "text-gray-400"
                        )}>
                          பொருளை யோசித்துவிட்டு பார்க்கவும்
                        </p>
                      </div>
                    ) : (
                      <div className="text-center animate-fadeIn">
                        <h3 className="text-xl font-bold text-emerald-500 dark:text-emerald-400 mb-3">
                          {current.tamilMeaning}
                        </h3>
                        <p className={cn(
                          "text-xs font-semibold uppercase tracking-wider mb-2",
                          theme === 'dark' ? "text-gray-500" : "text-gray-400"
                        )}>
                          உதாரணம் (Example)
                        </p>
                        <p className={cn(
                          "text-sm leading-relaxed",
                          theme === 'dark' ? "text-gray-300" : "text-gray-700"
                        )}>
                          {current.exampleSentence}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Side Thumb Navigation Bar (YouTube Shorts Style) */}
                  <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 z-20">
                    {/* Speak Button */}
                    <div className="flex flex-col items-center">
                      <button 
                        onClick={() => playAudio(current.japanese, current.tamilMeaning)}
                        className={cn(
                          "w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90 shadow-md",
                          theme === 'dark' ? "bg-white/10 border border-white/15 text-white hover:bg-white/20" : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
                        )}
                        title="உச்சரிப்பைக் கேட்க"
                      >
                        <Volume2 size={20} />
                      </button>
                      <span className={cn(
                        "text-[10px] font-bold mt-1 shadow-sm",
                        theme === 'dark' ? "text-gray-300" : "text-gray-600"
                      )}>கேட்க</span>
                    </div>

                    {/* Mastered/Learn Button */}
                    <div className="flex flex-col items-center">
                      <button 
                        onClick={() => markVocabMastered(current.id)}
                        className={cn(
                          "w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90 shadow-md",
                          isMastered 
                            ? "bg-amber-500 text-white border border-amber-400"
                            : (theme === 'dark' ? "bg-white/10 border border-white/15 text-white hover:bg-white/20" : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100")
                        )}
                        title={isMastered ? "பயின்ற சொற்களில் இருந்து நீக்குக" : "பயின்ற சொல்லாக சேமி"}
                      >
                        <Heart size={20} className={cn(isMastered ? "fill-white" : "")} />
                      </button>
                      <span className={cn(
                        "text-[10px] font-bold mt-1 shadow-sm",
                        isMastered ? "text-amber-500" : (theme === 'dark' ? "text-gray-300" : "text-gray-600")
                      )}>
                        {isMastered ? "பயின்றேன்" : "பயில்"}
                      </span>
                    </div>

                    {/* Reveal Button */}
                    <div className="flex flex-col items-center">
                      <button 
                        onClick={() => setRevealMeaning(prev => !prev)}
                        className={cn(
                          "w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90 shadow-md",
                          revealMeaning
                            ? "bg-emerald-500 text-white border border-emerald-400"
                            : (theme === 'dark' ? "bg-white/10 border border-white/15 text-white hover:bg-white/20" : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100")
                        )}
                        title="பொருளைக் காட்டு / மறை"
                      >
                        {revealMeaning ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                      <span className={cn(
                        "text-[10px] font-bold mt-1 shadow-sm",
                        theme === 'dark' ? "text-gray-300" : "text-gray-600"
                      )}>பொருள்</span>
                    </div>

                    {/* Up Arrow (Previous Short) */}
                    <div className="flex flex-col items-center">
                      <button 
                        onClick={handlePrevShort}
                        disabled={activeShortIndex === 0}
                        className={cn(
                          "w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md",
                          activeShortIndex === 0
                            ? "opacity-40 cursor-not-allowed"
                            : (theme === 'dark' ? "bg-white/10 border border-white/15 text-white hover:bg-white/20 hover:scale-110 active:scale-90" : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 hover:scale-110 active:scale-90")
                        )}
                        title="முந்தைய சொல்"
                      >
                        <ChevronUp size={20} />
                      </button>
                      <span className={cn(
                        "text-[10px] font-bold mt-1 shadow-sm",
                        theme === 'dark' ? "text-gray-300" : "text-gray-600"
                      )}>முன்பு</span>
                    </div>

                    {/* Down Arrow (Next Short) */}
                    <div className="flex flex-col items-center">
                      <button 
                        onClick={handleNextShort}
                        disabled={activeShortIndex === filteredVocab.length - 1}
                        className={cn(
                          "w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md",
                          activeShortIndex === filteredVocab.length - 1
                            ? "opacity-40 cursor-not-allowed"
                            : (theme === 'dark' ? "bg-white/10 border border-white/15 text-white hover:bg-white/20 hover:scale-110 active:scale-90" : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-100 hover:scale-110 active:scale-90")
                        )}
                        title="அடுத்த சொல்"
                      >
                        <ChevronDown size={20} />
                      </button>
                      <span className={cn(
                        "text-[10px] font-bold mt-1 shadow-sm",
                        theme === 'dark' ? "text-gray-300" : "text-gray-600"
                      )}>அடுத்து</span>
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      ) : (
        <>
          <div className={cn(
            "grid gap-4 sm:gap-6",
            viewMode === 'grid' 
              ? "grid-cols-[repeat(auto-fill,minmax(260px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]" 
              : "grid-cols-1 max-w-4xl mx-auto"
          )}>
            {visibleVocab.map(v => (
              <Card
                key={v.id}
                title={v.japanese}
                subtitle={`${v.hiragana} • ${v.tamilMeaning}`}
                badge={v.partOfSpeech}
                onClick={() => setSelected(v)}
                onPlayAudio={(e) => {
                  e.stopPropagation();
                  playAudio(v.japanese, v.tamilMeaning);
                }}
                className={viewMode === 'list' ? "flex-row items-center justify-between p-4" : ""}
              />
            ))}
          </div>

          {filteredVocab.length > visibleCount && (
            <div className="flex justify-center mt-8 mb-12">
              <button
                onClick={() => setVisibleCount(prev => prev + 40)}
                className={cn(
                  "px-6 py-2.5 rounded-full font-semibold text-sm transition-colors border shadow-sm",
                  theme === 'dark' ? "bg-[#272727] border-gray-700 text-white hover:bg-[#323232]" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                )}
              >
                மேலும் சொற்களைக் காட்டுக (Load More)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
