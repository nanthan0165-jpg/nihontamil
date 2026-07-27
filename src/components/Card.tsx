import React from 'react';
import { cn } from '../lib/utils';
import { Volume2 } from 'lucide-react';
import { useStore } from '../store';

export type CardColorScheme = 'red' | 'orange' | 'green' | 'blue' | 'purple' | 'pink' | 'teal' | 'amber' | 'indigo';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  key?: React.Key;
  title: string;
  subtitle: string;
  badge?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  onPlayAudio?: (e: React.MouseEvent) => void;
  className?: string;
  colorScheme?: CardColorScheme;
}

function getDeterministicScheme(title: string): CardColorScheme {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const schemes: CardColorScheme[] = ['red', 'orange', 'green', 'blue', 'purple', 'pink', 'teal', 'amber', 'indigo'];
  return schemes[Math.abs(hash) % schemes.length];
}

const underlyingColors = {
  red: "bg-red-500/80 dark:bg-red-700/80",
  orange: "bg-orange-500/80 dark:bg-orange-700/80",
  green: "bg-emerald-500/80 dark:bg-emerald-700/80",
  blue: "bg-blue-500/80 dark:bg-blue-700/80",
  purple: "bg-purple-500/80 dark:bg-purple-700/80",
  pink: "bg-pink-500/80 dark:bg-pink-700/80",
  teal: "bg-teal-500/80 dark:bg-teal-700/80",
  amber: "bg-amber-500/80 dark:bg-amber-700/80",
  indigo: "bg-indigo-500/80 dark:bg-indigo-700/80"
};

const cardStyles = {
  red: {
    light: "bg-gradient-to-br from-red-50/95 to-rose-50/70 border-red-200 text-red-950",
    dark: "bg-gradient-to-br from-[#2a1717] to-[#1a1111] border-red-900/30 text-red-100",
    textSub: "text-red-850 dark:text-red-300/80",
    iconBg: "bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-900/30",
    hoverShadow: "hover:shadow-red-200/50 dark:hover:shadow-red-950/40"
  },
  orange: {
    light: "bg-gradient-to-br from-orange-50/95 to-amber-50/70 border-orange-200 text-orange-950",
    dark: "bg-gradient-to-br from-[#2d1b12] to-[#1c110b] border-orange-900/30 text-orange-100",
    textSub: "text-orange-850 dark:text-orange-300/80",
    iconBg: "bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 border border-orange-200/50 dark:border-orange-900/30",
    hoverShadow: "hover:shadow-orange-200/50 dark:hover:shadow-orange-950/40"
  },
  green: {
    light: "bg-gradient-to-br from-emerald-50/95 to-teal-50/70 border-emerald-200 text-emerald-950",
    dark: "bg-gradient-to-br from-[#122218] to-[#0b150f] border-emerald-900/30 text-emerald-100",
    textSub: "text-emerald-850 dark:text-emerald-300/80",
    iconBg: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30",
    hoverShadow: "hover:shadow-emerald-200/50 dark:hover:shadow-emerald-950/40"
  },
  blue: {
    light: "bg-gradient-to-br from-blue-50/95 to-indigo-50/70 border-blue-200 text-blue-950",
    dark: "bg-gradient-to-br from-[#111c2a] to-[#0a111a] border-blue-900/30 text-blue-100",
    textSub: "text-blue-850 dark:text-blue-300/80",
    iconBg: "bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/30",
    hoverShadow: "hover:shadow-blue-200/50 dark:hover:shadow-blue-950/40"
  },
  purple: {
    light: "bg-gradient-to-br from-purple-50/95 to-fuchsia-50/70 border-purple-200 text-purple-950",
    dark: "bg-gradient-to-br from-[#1c1328] to-[#110b1a] border-purple-900/30 text-purple-100",
    textSub: "text-purple-850 dark:text-purple-300/80",
    iconBg: "bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-900/30",
    hoverShadow: "hover:shadow-purple-200/50 dark:hover:shadow-purple-950/40"
  },
  pink: {
    light: "bg-gradient-to-br from-pink-50/95 to-rose-50/70 border-pink-200 text-pink-950",
    dark: "bg-gradient-to-br from-[#27121e] to-[#180a12] border-pink-900/30 text-pink-100",
    textSub: "text-pink-850 dark:text-pink-300/80",
    iconBg: "bg-pink-100 dark:bg-pink-950/80 text-pink-600 dark:text-pink-400 border border-pink-200/50 dark:border-pink-900/30",
    hoverShadow: "hover:shadow-pink-200/50 dark:hover:shadow-pink-950/40"
  },
  teal: {
    light: "bg-gradient-to-br from-teal-50/95 to-cyan-50/70 border-teal-200 text-teal-950",
    dark: "bg-gradient-to-br from-[#0c2020] to-[#071313] border-teal-900/30 text-teal-100",
    textSub: "text-teal-850 dark:text-teal-300/80",
    iconBg: "bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 border border-teal-200/50 dark:border-teal-900/30",
    hoverShadow: "hover:shadow-teal-200/50 dark:hover:shadow-teal-950/40"
  },
  amber: {
    light: "bg-gradient-to-br from-amber-50/95 to-yellow-50/70 border-amber-200 text-amber-950",
    dark: "bg-gradient-to-br from-[#261c0d] to-[#171108] border-amber-900/30 text-[#fef3c7]",
    textSub: "text-amber-900/90 dark:text-[#fde68a]/80",
    iconBg: "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/30",
    hoverShadow: "hover:shadow-amber-200/50 dark:hover:shadow-amber-950/40"
  },
  indigo: {
    light: "bg-gradient-to-br from-indigo-50/95 to-blue-50/70 border-indigo-200 text-indigo-950",
    dark: "bg-gradient-to-br from-[#12162d] to-[#0b0d1b] border-indigo-900/30 text-indigo-100",
    textSub: "text-indigo-850 dark:text-indigo-300/80",
    iconBg: "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-900/30",
    hoverShadow: "hover:shadow-indigo-200/50 dark:hover:shadow-indigo-950/40"
  }
};

export function Card({ title, subtitle, badge, icon, onClick, onPlayAudio, className, colorScheme }: CardProps) {
  const theme = useStore(state => state.theme);
  const scheme = colorScheme || getDeterministicScheme(title);
  
  const underlyingClass = underlyingColors[scheme];
  const styleGroup = cardStyles[scheme];
  const activeBg = theme === 'dark' ? styleGroup.dark : styleGroup.light;

  return (
    <div className="relative group w-full">
      {/* Underlying colored plate */}
      <div className={cn(
        "absolute inset-0 rounded-2xl transition-transform duration-300 ease-out translate-x-1.5 translate-y-1.5 group-hover:translate-x-2.5 group-hover:translate-y-2.5 opacity-80",
        underlyingClass
      )} />
      
      {/* Main card */}
      <div 
        onClick={onClick}
        className={cn(
          "relative z-10 rounded-2xl p-4 sm:p-5 md:p-6 cursor-pointer transition-all duration-300 ease-out border",
          "flex flex-col gap-2 md:gap-3",
          "active:scale-[0.98] md:hover:-translate-y-1.5 md:hover:-translate-x-1.5",
          activeBg,
          className
        )}
      >
        <div className="flex justify-between items-start">
          <div className="flex gap-3 sm:gap-4 items-center">
            {icon && (
              <div className={cn(
                "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold transition-all",
                styleGroup.iconBg
              )}>
                {icon}
              </div>
            )}
            <div>
              <h3 className="font-bold text-base sm:text-lg md:text-xl leading-tight line-clamp-2">{title}</h3>
              {badge && (
                <span className={cn(
                  "inline-block mt-1.5 text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full text-white font-medium tracking-wide shadow-sm",
                  badge === "N5" ? "bg-blue-500" : badge === "N4" ? "bg-green-500" : "bg-purple-500"
                )}>
                  {badge}
                </span>
              )}
            </div>
          </div>
          {onPlayAudio && (
            <button 
              onClick={onPlayAudio}
              className={cn(
                "p-2 rounded-full transition-all hover:scale-110",
                theme === 'dark' ? "hover:bg-[#4d4d4d]" : "hover:bg-gray-200 text-gray-600"
              )}
              title="உச்சரிப்பைக் கேட்க"
            >
              <Volume2 size={20} />
            </button>
          )}
        </div>
        <p className={cn(
          "text-sm mt-2 line-clamp-2 font-medium",
          styleGroup.textSub
        )}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
