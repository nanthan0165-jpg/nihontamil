import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { get as idbGet, set as idbSet, del as idbDel } from 'idb-keyval';

export interface Progress {
  completedLessons: string[];
  learnedKanji: string[];
  masteredVocab: string[];
  streak: number;
  lastActive: string | null;
}

interface AudioState {
  isPlaying: boolean;
  currentText: string | null;
  currentTranslation: string | null;
  audioUrl: string | null;
  isMinimized: boolean;
}

interface AppState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  progress: Progress;
  audio: AudioState;
  hasSeenOnboarding: boolean;

  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  completeOnboarding: () => void;
  
  // Progress actions
  markLessonComplete: (id: string) => void;
  markKanjiLearned: (id: string) => void;
  markVocabMastered: (id: string) => void;
  resetProgress: () => void;
  updateStreak: () => void;

  // Audio actions
  playAudio: (text: string, translation?: string) => Promise<void>;
  stopAudio: () => void;
  setMinimized: (min: boolean) => void;
}

const initialProgress: Progress = {
  completedLessons: [],
  learnedKanji: [],
  masteredVocab: [],
  streak: 0,
  lastActive: null,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      sidebarOpen: true,
      hasSeenOnboarding: false,
      progress: initialProgress,
      audio: {
        isPlaying: false,
        currentText: null,
        currentTranslation: null,
        audioUrl: null,
        isMinimized: false,
      },

      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      completeOnboarding: () => set({ hasSeenOnboarding: true }),

      markLessonComplete: (id) => set((state) => ({
        progress: {
          ...state.progress,
          completedLessons: state.progress.completedLessons.includes(id) 
            ? state.progress.completedLessons 
            : [...state.progress.completedLessons, id]
        }
      })),
      markKanjiLearned: (id) => set((state) => ({
        progress: {
          ...state.progress,
          learnedKanji: state.progress.learnedKanji.includes(id) 
            ? state.progress.learnedKanji 
            : [...state.progress.learnedKanji, id]
        }
      })),
      markVocabMastered: (id) => set((state) => ({
        progress: {
          ...state.progress,
          masteredVocab: state.progress.masteredVocab.includes(id) 
            ? state.progress.masteredVocab 
            : [...state.progress.masteredVocab, id]
        }
      })),
      resetProgress: () => set({ progress: initialProgress }),
      updateStreak: () => {
        const state = get();
        const today = new Date().toDateString();
        if (state.progress.lastActive !== today) {
          const lastActive = state.progress.lastActive ? new Date(state.progress.lastActive) : null;
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          let newStreak = state.progress.streak;
          if (!lastActive || lastActive.toDateString() === yesterday.toDateString()) {
            newStreak += 1;
          } else {
            newStreak = 1;
          }
          
          set({
            progress: {
              ...state.progress,
              streak: newStreak,
              lastActive: today
            }
          });
        }
      },

      playAudio: async (text, translation) => {
        set((state) => ({
          audio: { ...state.audio, isPlaying: false, currentText: text, currentTranslation: translation || null }
        }));

        try {
          // Check IndexedDB cache first
          const cacheKey = `audio_${text}`;
          let base64Audio = await idbGet(cacheKey);

          if (base64Audio && typeof base64Audio !== 'string') {
            await idbDel(cacheKey);
            base64Audio = null;
          }

          if (!base64Audio) {
            try {
              const res = await fetch("/api/pronounce", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
              });
              if (!res.ok) throw new Error("Server-side pronunciation generation failed");
              const data = await res.json();
              base64Audio = data.audio;
              if (base64Audio) {
                await idbSet(cacheKey, base64Audio); // cache it
              }
            } catch (apiError) {
              console.warn("Server-side pronunciation failed, falling back to Google Translate TTS direct client link:", apiError);
              const fallbackUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encodeURIComponent(text)}`;
              set((state) => ({
                audio: { ...state.audio, isPlaying: true, audioUrl: fallbackUrl }
              }));
              return;
            }
          }

          if (base64Audio) {
            let b64Str = base64Audio as string;
            
            // Normalize base64 string
            b64Str = b64Str.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
            while (b64Str.length % 4) b64Str += '=';

            // Detect format: WAV starts with 'RIFF' (base64 'UklGR'), MP3/MPEG otherwise.
            const mimeType = b64Str.startsWith('UklGR') ? 'audio/wav' : 'audio/mpeg';
            const url = `data:${mimeType};base64,${b64Str}`;
            
            set((state) => ({
              audio: { ...state.audio, isPlaying: true, audioUrl: url }
            }));
          } else {
            // No base64 audio returned, use Google Translate TTS direct client link
            const fallbackUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encodeURIComponent(text)}`;
            set((state) => ({
              audio: { ...state.audio, isPlaying: true, audioUrl: fallbackUrl }
            }));
          }
        } catch (e) {
          console.error("Audio playback error, falling back to Google Translate TTS direct client link:", e);
          const fallbackUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encodeURIComponent(text)}`;
          set((state) => ({
            audio: { ...state.audio, isPlaying: true, audioUrl: fallbackUrl }
          }));
        }
      },
      stopAudio: () => set((state) => ({
        audio: { ...state.audio, isPlaying: false, audioUrl: null, currentText: null, currentTranslation: null }
      })),
      setMinimized: (min) => set((state) => ({
        audio: { ...state.audio, isMinimized: min }
      })),
    }),
    {
      name: 'nihontamil-storage',
      partialize: (state) => ({ progress: state.progress, theme: state.theme, hasSeenOnboarding: state.hasSeenOnboarding }),
    }
  )
);
