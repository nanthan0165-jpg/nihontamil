import React from 'react';
import { useStore } from '../store';
import { cn } from '../lib/utils';
import { PlayCircle, Type, CheckCircle } from 'lucide-react';

export function Onboarding() {
  const { theme, hasSeenOnboarding, completeOnboarding } = useStore();

  if (hasSeenOnboarding) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
      <div className={cn(
        "max-w-md w-full rounded-2xl p-6 md:p-8 shadow-2xl relative",
        theme === 'dark' ? "bg-[#212121] text-white" : "bg-white text-black"
      )}>
        <h2 className="text-2xl font-bold mb-2">நிஹோன்தமிழ்-க்கு வரவேற்கிறோம்! 🎉</h2>
        <p className={cn("mb-6", theme === 'dark' ? "text-gray-300" : "text-gray-600")}>
          உங்களுடைய ஜப்பானிய கற்றல் பயணம் இங்கே தொடங்குகிறது. நீங்கள் தெரிந்து கொள்ள வேண்டியவை:
        </p>

        <div className="flex flex-col gap-5 mb-8">
          <div className="flex gap-4 items-start">
            <div className="p-2 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 mt-1">
              <PlayCircle size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base mb-1">AI உச்சரிப்பு</h3>
              <p className={cn("text-sm font-medium leading-relaxed", theme === 'dark' ? "text-gray-200" : "text-gray-800")}>
                AI மூலம் ஜப்பானிய உச்சரிப்பு மற்றும் தமிழ் விளக்கத்தைக் கேட்க எந்த ஒரு 'கேட்க' பொத்தானையும் அழுத்தவும்.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mt-1">
              <Type size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base mb-1">தமிழ் எழுத்துப்பெயர்ப்பு</h3>
              <p className={cn("text-sm font-medium leading-relaxed", theme === 'dark' ? "text-gray-200" : "text-gray-800")}>
                உச்சரிப்பிற்கு தமிழ் எழுத்துக்களைப் பயன்படுத்தவும், ஆனால் சரியான உச்சரிப்பிற்கு ஒலியைக் கேட்கவும்.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="p-2 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 mt-1">
              <CheckCircle size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base mb-1">முன்னேற்றத்தைக் கண்காணிக்க</h3>
              <p className={cn("text-sm font-medium leading-relaxed", theme === 'dark' ? "text-gray-200" : "text-gray-800")}>
                எல்லாமே உங்கள் சாதனத்தில் பாதுகாப்பாக சேமிக்கப்படும். நீங்கள் கற்கும் போது உங்கள் தொடர் நாட்களைக் காணுங்கள்!
              </p>
            </div>
          </div>
        </div>

        <button 
          onClick={completeOnboarding}
          className="w-full py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold transition-colors"
        >
          கற்கத் தொடங்கு
        </button>
      </div>
    </div>
  );
}
