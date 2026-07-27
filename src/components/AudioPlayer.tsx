import React, { useEffect, useRef } from 'react';
import { useStore } from '../store';
import { cn } from '../lib/utils';
import { X, Pause, Play, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function AudioPlayer() {
  const { audio: rawAudio, stopAudio, setMinimized, theme } = useStore();
  
  const audio = rawAudio || {
    isPlaying: false,
    currentText: null,
    currentTranslation: null,
    audioUrl: null,
    isMinimized: false,
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const fallbackSpeak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        
        // Find a Japanese voice if available
        const voices = window.speechSynthesis.getVoices();
        const jaVoice = voices.find(v => v.lang.toLowerCase().startsWith('ja'));
        if (jaVoice) {
          utterance.voice = jaVoice;
        }
        
        utterance.onstart = () => {
          useStore.setState({ audio: { ...audio, isPlaying: true } });
        };
        utterance.onend = () => {
          stopAudio();
        };
        utterance.onerror = (e) => {
          console.warn("SpeechSynthesis error, ending audio state:", e);
          stopAudio();
        };
        
        speechSynthesisRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error("SpeechSynthesis failed:", err);
        stopAudio();
      }
    } else {
      stopAudio();
    }
  };

  useEffect(() => {
    if (audio.audioUrl) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      if (!audioRef.current) {
        audioRef.current = new Audio(audio.audioUrl);
        audioRef.current.onended = () => stopAudio();
      } else {
        audioRef.current.src = audio.audioUrl;
      }

      // Handle loading error on the audio element
      audioRef.current.onerror = (e) => {
        console.warn("Audio element failed to load source, trying Web Speech API fallback...", e);
        fallbackSpeak(audio.currentText || '');
      };

      audioRef.current.play().catch(e => {
        console.warn("Audio play failed, trying Web Speech API fallback:", e);
        fallbackSpeak(audio.currentText || '');
      });
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [audio.audioUrl, stopAudio]);

  const togglePlay = () => {
    if (audioRef.current && audio.audioUrl) {
      if (audio.isPlaying) {
        audioRef.current.pause();
        useStore.setState({ audio: { ...audio, isPlaying: false }});
      } else {
        audioRef.current.play().catch(e => {
          console.warn("Play failed on toggle, speaking via Web Speech API:", e);
          fallbackSpeak(audio.currentText || '');
        });
        useStore.setState({ audio: { ...audio, isPlaying: true }});
      }
    } else if (audio.currentText) {
      // If we are playing via Web Speech API
      if (audio.isPlaying) {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        useStore.setState({ audio: { ...audio, isPlaying: false }});
      } else {
        fallbackSpeak(audio.currentText);
      }
    }
  };

  if (!audio.currentText && !audio.audioUrl && !audio.isPlaying) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className={cn(
          "fixed z-50 transition-all duration-300 shadow-xl",
          audio.isMinimized 
            ? "bottom-20 md:bottom-4 right-4 md:right-4 w-72 rounded-lg" 
            : "bottom-16 md:bottom-0 left-0 right-0 md:rounded-t-xl md:left-auto md:right-8 md:w-96",
          theme === 'dark' ? "bg-[#212121] text-white border-gray-700" : "bg-white text-black border-gray-200",
          "border"
        )}
      >
        <div className="flex flex-col p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-500">தற்போது ஒலிக்கிறது</span>
            <div className="flex gap-2">
              <button onClick={() => setMinimized(!audio.isMinimized)} className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                {audio.isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button onClick={stopAudio} className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                <X size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={togglePlay}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white flex-shrink-0"
            >
              {audio.isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="font-bold text-lg truncate">{audio.currentText || 'ஒலியை ஏற்றுகிறது...'}</div>
              {!audio.isMinimized && audio.currentTranslation && (
                <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {audio.currentTranslation}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
