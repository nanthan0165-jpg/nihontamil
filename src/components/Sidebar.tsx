import React from 'react';
import { cn } from '../lib/utils';
import { useStore } from '../store';
import { Home, BookOpen, Type, List, Languages, Globe, BarChart2, X } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export function Sidebar({ currentTab, setTab }: SidebarProps) {
  const { sidebarOpen, setSidebarOpen, theme } = useStore();

  const menuItems = [
    { id: 'home', label: 'முகப்பு (Home)', icon: <Home size={20} /> },
    { id: 'lessons', label: 'பாடங்கள் (Lessons)', icon: <BookOpen size={20} /> },
    { id: 'kana', label: 'எழுத்துக்கள் (Kana)', icon: <Type size={20} /> },
    { id: 'kanji', label: 'கஞ்சி (Kanji)', icon: <Type size={20} /> },
    { id: 'vocabulary', label: 'சொற்கள் (Vocabulary)', icon: <List size={20} /> },
    { id: 'grammar', label: 'இலக்கணம் (Grammar)', icon: <Languages size={20} /> },
    { id: 'culture', label: 'கலாச்சாரம் (Culture)', icon: <Globe size={20} /> },
    { id: 'progress', label: 'முன்னேற்றம் (Progress)', icon: <BarChart2 size={20} /> },
  ];

  const handleItemClick = (id: string) => {
    setTab(id);
    if (window.innerWidth < 768) {
      setSidebarOpen?.(false);
    }
  };

  return (
    <>
      {/* Mobile Sidebar Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen?.(false)}
        />
      )}

      {/* Mobile Drawer (slides from left on mobile) */}
      <div className={cn(
        "fixed left-0 top-0 bottom-0 z-50 flex flex-col transition-transform duration-300 ease-out overflow-y-auto md:hidden w-72 pt-4 px-4 border-r",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        theme === 'dark' ? "bg-[#0f0f0f] border-gray-800 text-white" : "bg-white border-gray-200 text-black"
      )}>
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 mb-4">
          <span className="text-xl font-bold tracking-tight">நிஹோன்<span className="text-red-500">தமிழ்</span></span>
          <button 
            onClick={() => setSidebarOpen?.(false)}
            className={cn(
              "p-2 rounded-full",
              theme === 'dark' ? "hover:bg-[#272727] text-gray-400" : "hover:bg-gray-100 text-gray-500"
            )}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-1.5 pb-20">
          {menuItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-colors w-full text-left",
                  isActive 
                    ? theme === 'dark' ? "bg-[#272727] text-red-500 font-semibold" : "bg-red-50 text-red-600 font-semibold" 
                    : theme === 'dark' ? "hover:bg-[#272727] text-gray-300" : "hover:bg-gray-50 text-gray-700"
                )}
              >
                <div className={cn("flex-shrink-0", isActive ? "text-red-500" : "text-gray-400")}>
                  {item.icon}
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Desktop Sidebar (unchanged visually for desktop layout) */}
      <div className={cn(
        "fixed left-0 top-14 bottom-0 z-40 hidden md:flex flex-col transition-all duration-200 overflow-y-auto",
        sidebarOpen ? "w-60" : "w-[72px]",
        theme === 'dark' ? "bg-[#0f0f0f] text-white" : "bg-white text-black border-r border-gray-100 dark:border-gray-800"
      )}>
        <div className="flex-1 py-3 px-2 flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = currentTab === item.id;
            const shortLabel = item.label.split(' ')[0]; // E.g. 'முகப்பு' from 'முகப்பு (Home)'
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={cn(
                  "flex items-center gap-4 px-3 py-2.5 rounded-lg transition-colors w-full",
                  sidebarOpen ? "justify-start" : "justify-center flex-col gap-1 py-4",
                  isActive 
                    ? theme === 'dark' ? "bg-[#272727] font-medium text-red-500" : "bg-gray-100 font-medium text-red-600" 
                    : theme === 'dark' ? "hover:bg-[#272727] text-gray-300" : "hover:bg-gray-100 text-gray-600"
                )}
              >
                <div className={cn("flex-shrink-0", isActive && "text-red-500")}>
                  {item.icon}
                </div>
                <span className={cn(
                  "truncate",
                  sidebarOpen ? "text-sm block" : "text-[10px] hidden"
                )}>
                  {shortLabel}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  );
}
