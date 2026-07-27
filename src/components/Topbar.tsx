import React from 'react';
import { Menu, Search, Moon, Sun, User, LayoutGrid } from 'lucide-react';
import { useStore } from '../store';
import { cn } from '../lib/utils';

export function Topbar() {
  const { toggleSidebar, toggleTheme, theme } = useStore();

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 h-14 z-50 flex items-center justify-between px-4",
      theme === 'dark' ? "bg-[#0f0f0f] text-white" : "bg-white text-black border-b border-gray-200"
    )}>
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className={cn(
            "p-2 rounded-full",
            theme === 'dark' ? "hover:bg-[#272727]" : "hover:bg-gray-100"
          )}
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-1">
          <div className="bg-red-600 text-white p-1 rounded-md flex items-center justify-center">
            <LayoutGrid size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight ml-1 block">நிஹோன்<span className="text-red-500">தமிழ்</span></span>
        </div>
      </div>

      <div className="flex-1 max-w-2xl px-4 hidden sm:flex items-center justify-center">
        <div className={cn(
          "flex items-center w-full max-w-[600px] border rounded-full overflow-hidden",
          theme === 'dark' ? "border-[#303030] bg-[#121212]" : "border-gray-300 bg-white"
        )}>
          <input 
            type="text" 
            placeholder="தமிழில் தேடுக..." 
            className={cn(
              "flex-1 px-4 py-2 outline-none bg-transparent text-sm",
              theme === 'dark' ? "text-white" : "text-black"
            )}
          />
          <button className={cn(
            "px-5 py-2 border-l transition-colors",
            theme === 'dark' ? "border-[#303030] bg-[#222222] hover:bg-[#303030]" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          )}>
            <Search size={20} className={theme === 'dark' ? "text-gray-400" : "text-gray-600"} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="sm:hidden p-2">
          <Search size={24} />
        </button>
        <button 
          onClick={toggleTheme}
          className={cn(
            "p-2 rounded-full",
            theme === 'dark' ? "hover:bg-[#272727]" : "hover:bg-gray-100"
          )}
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <button className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center bg-red-600 text-white",
        )}>
          <User size={18} />
        </button>
      </div>
    </header>
  );
}
