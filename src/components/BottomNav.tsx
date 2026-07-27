import React from 'react';
import { Home, BookOpen, Type, BarChart2, Menu } from 'lucide-react';
import { useStore } from '../store';
import { cn } from '../lib/utils';

interface BottomNavProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export function BottomNav({ currentTab, setTab }: BottomNavProps) {
  const { theme, toggleSidebar } = useStore();

  const navItems = [
    { id: 'home', label: 'முகப்பு', icon: <Home size={20} /> },
    { id: 'lessons', label: 'பாடங்கள்', icon: <BookOpen size={20} /> },
    { id: 'kanji', label: 'கஞ்சி', icon: <Type size={20} /> },
    { id: 'progress', label: 'முன்னேற்றம்', icon: <BarChart2 size={20} /> },
  ];

  const isSecondaryActive = ['kana', 'vocabulary', 'grammar', 'culture'].includes(currentTab);

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 h-16 md:hidden flex items-center justify-around z-40 border-t px-2",
      theme === 'dark' ? "bg-[#0f0f0f] border-gray-800 text-white" : "bg-white border-gray-200 text-black"
    )}>
      {navItems.map(item => {
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              "flex flex-col items-center justify-center w-16 h-14 rounded-lg space-y-1 transition-colors",
              isActive 
                ? (theme === 'dark' ? "text-red-500" : "text-red-600") 
                : (theme === 'dark' ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black")
            )}
          >
            <div className={cn("flex-shrink-0", isActive && "text-red-500")}>
              {item.icon}
            </div>
            <span className="text-[10px] font-medium whitespace-nowrap">{item.label}</span>
          </button>
        )
      })}
      
      {/* Menu / More button to toggle the sidebar drawer */}
      <button
        onClick={toggleSidebar}
        className={cn(
          "flex flex-col items-center justify-center w-16 h-14 rounded-lg space-y-1 transition-colors",
          isSecondaryActive 
            ? (theme === 'dark' ? "text-red-500" : "text-red-600") 
            : (theme === 'dark' ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black")
        )}
      >
        <div className={cn("flex-shrink-0", isSecondaryActive && "text-red-500")}>
          <Menu size={20} />
        </div>
        <span className="text-[10px] font-medium whitespace-nowrap">மெனு</span>
      </button>
    </div>
  );
}
