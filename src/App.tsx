/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useStore } from './store';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { AudioPlayer } from './components/AudioPlayer';
import { Onboarding } from './components/Onboarding';
import { cn } from './lib/utils';
import { HomeView } from './views/HomeView';
import { LessonsView } from './views/LessonsView';
import { KanjiView } from './views/KanjiView';
import { KanaView } from './views/KanaView';
import { VocabularyView } from './views/VocabularyView';
import { GrammarView } from './views/GrammarView';
import { CultureView } from './views/CultureView';
import { ProgressView } from './views/ProgressView';

export default function App() {
  const { theme, sidebarOpen, updateStreak } = useStore();
  const [currentTab, setCurrentTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['home', 'lessons', 'kana', 'kanji', 'vocabulary', 'grammar', 'culture', 'progress'];
      if (validTabs.includes(hash)) {
        return hash;
      }
    }
    return 'home';
  });

  useEffect(() => {
    // Ensure the initial tab is set in history state
    window.history.replaceState({ tab: currentTab }, '', `#${currentTab}`);

    const handlePopState = (event: PopStateEvent) => {
      const validTabs = ['home', 'lessons', 'kana', 'kanji', 'vocabulary', 'grammar', 'culture', 'progress'];
      if (event.state && event.state.tab) {
        setCurrentTab(event.state.tab);
      } else {
        const currentHash = window.location.hash.replace('#', '');
        if (validTabs.includes(currentHash)) {
          setCurrentTab(currentHash);
        } else {
          setCurrentTab('home');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleTabChange = (newTab: string) => {
    if (newTab !== currentTab) {
      setCurrentTab(newTab);
      window.history.pushState({ tab: newTab }, '', `#${newTab}`);
    }
  };

  useEffect(() => {
    updateStreak?.();
    
    // Setup theme class on body
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0f0f0f';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
    }
  }, [theme, updateStreak]);

  const renderView = () => {
    switch (currentTab) {
      case 'home': return <HomeView setTab={handleTabChange} />;
      case 'lessons': return <LessonsView />;
      case 'kana': return <KanaView />;
      case 'kanji': return <KanjiView />;
      case 'vocabulary': return <VocabularyView />;
      case 'grammar': return <GrammarView />;
      case 'culture': return <CultureView />;
      case 'progress': return <ProgressView />;
      default: return <HomeView setTab={handleTabChange} />;
    }
  };

  return (
    <div className={cn(
      "min-h-screen w-full font-sans antialiased text-base",
      theme === 'dark' ? "bg-[#0f0f0f] text-white" : "bg-white text-black"
    )}>
      <Onboarding />
      <Topbar />
      <Sidebar currentTab={currentTab} setTab={handleTabChange} />
      
      <main className={cn(
        "pt-14 pb-20 md:pb-6 transition-all duration-200 min-h-screen",
        sidebarOpen ? "md:ml-60" : "md:ml-[72px]"
      )}>
        {renderView()}
      </main>

      <BottomNav currentTab={currentTab} setTab={handleTabChange} />
      <AudioPlayer />
    </div>
  );
}
