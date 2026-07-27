import React, { useState } from 'react';
import { useStore } from '../store';
import { cn } from '../lib/utils';
import { 
  BookOpen, Type, List, Languages, Globe, 
  Sparkles, ChevronRight, CheckCircle2, ArrowRight, BookMarked
} from 'lucide-react';

interface LearningRoadmapProps {
  setTab: (tab: string) => void;
}

export function LearningRoadmap({ setTab }: LearningRoadmapProps) {
  const { theme } = useStore();
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 'kana',
      title: 'படி 1: ஜப்பானிய எழுத்துக்கள் (Kana Mastery)',
      tamilSubtitle: 'புதிய ஒலி வடிவங்கள் மற்றும் உச்சரிப்புகள்',
      icon: <Type className="w-5 h-5" />,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-500/10 dark:bg-purple-500/20',
      textColor: 'text-purple-600 dark:text-purple-400',
      borderClass: 'border-purple-200 dark:border-purple-800',
      targetTab: 'kana',
      description: 'ஜப்பானிய மொழியின் அடிப்படை தூண்களான ஹிரகானா (Hiragana) மற்றும் கடகானா (Katakana) ஆகியவற்றை ஒலி வடிவங்களுடன் கற்றுக்கொள்ளுங்கள்.',
      tamilBenefit: 'தமிழ் எழுத்துக்களைப் போல ஜப்பானிய எழுத்துக்களும் பெரும்பாலும் ஒலிப்பு சார்ந்தவை (Phonetic). தமிழ் மெய்யெழுத்துக்கள் ஜப்பானிய ஒலிகளுடன் எவ்வாறு ஒத்துப்போகின்றன என்பதை அறியவும்.',
      actionLabel: 'எழுத்துக்கள் பயில்க (Practice Kana)',
      tips: [
        'ஹிரகானா (Hiragana): ஜப்பானிய பூர்வீக சொற்களுக்கு பயன்படுகிறது.',
        'கடகானா (Katakana): பிற நாட்டு சொற்களை எழுத பயன்படுகிறது (உதாரணமாக உங்கள் பெயரை எழுத).',
        'ஒவ்வொரு எழுத்தின் உச்சரிப்பையும் ஆடியோ மூலம் கேட்டு பயிற்சி செய்யுங்கள்.'
      ]
    },
    {
      id: 'vocabulary',
      title: 'படி 2: N5 சொற்களஞ்சியம் (N5 Vocabulary)',
      tamilSubtitle: 'அன்றாட வாழ்வியல் வார்த்தைகள்',
      icon: <List className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10 dark:bg-blue-500/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      borderClass: 'border-blue-200 dark:border-blue-800',
      targetTab: 'vocabulary',
      description: 'ஆரம்ப நிலை (JLPT N5) தேர்வுக்கு தேவையான 800+ அத்தியாவசிய வார்த்தைகளை தமிழ் அர்த்தங்களுடன் மனனம் செய்யுங்கள்.',
      tamilBenefit: 'நம்முடைய ஒட்டும் ஒலிப் பிளேயரை (Sticky Audio Player) பயன்படுத்தி சொற்களின் தமிழ் விளக்கத்தை ஒலியுடன் கேட்டு, வேலை செய்யும் போதோ அல்லது நடக்கும் போதோ எளிதாகக் கற்கலாம்.',
      actionLabel: 'சொற்கள் கற்க (Explore Vocab)',
      tips: [
        'தினமும் 5 முதல் 10 புதிய வார்த்தைகளை கற்றுக்கொள்ள இலக்கு வையுங்கள்.',
        'வார்த்தைகளை வெறும் எழுத்துக்களாகப் பார்க்காமல், அதன் ஒலி அழுத்தத்தை (Pitch Accent) கேட்டுப் பழகுங்கள்.',
        'உங்களுக்கு பிடித்த வார்த்தைகளை புக்மார்க் செய்து அடிக்கடி திருப்புதல் செய்யுங்கள்.'
      ]
    },
    {
      id: 'grammar',
      title: 'படி 3: N5 இலக்கணம் (N5 Grammar)',
      tamilSubtitle: 'தமிழும் ஜப்பானியமும் ஒன்றே!',
      icon: <Languages className="w-5 h-5" />,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      borderClass: 'border-emerald-200 dark:border-emerald-800',
      targetTab: 'grammar',
      description: 'தமிழுக்கும் ஜப்பானிய மொழிக்கும் இடையே இருக்கும் மிகப்பெரிய ஒற்றுமை இலக்கணம் மற்றும் வாக்கிய வடிவமைப்பு ஆகும்.',
      tamilBenefit: 'இரண்டு மொழிகளுமே SOV (Subject-Object-Verb) கட்டமைப்பைக் கொண்டவை! தமிழ் வேற்றுமை உருபுகள் (ஐ, ஆல், கு, இல்) போலவே ஜப்பானிய மொழியிலும் இடைச்சொற்கள் (Particles - は, を, に, で) பயன்படுகின்றன. இதனால் தமிழ் பேசுபவர்களால் ஜப்பானிய இலக்கணத்தை மிக எளிதாக புரிந்துகொள்ள முடியும்.',
      actionLabel: 'இலக்கணம் கற்க (Study Grammar)',
      tips: [
        'தமிழ்: "நான் பழம் சாப்பிடுகிறேன்" ➔ ஜப்பானியம்: "நான் பழம் சாப்பிடுகிறேன்" (Watashi wa kudamono o tabemasu).',
        'வாக்கியங்களின் இறுதியில் வரும் மரியாதையான வினை வடிவங்களை (~ます / ~です) கவனியுங்கள்.',
        'இலக்கண விதிகளுக்கு கீழே கொடுக்கப்பட்டுள்ள தமிழ் ஒப்பீடுகளை முழுமையாகப் படியுங்கள்.'
      ]
    },
    {
      id: 'kanji',
      title: 'படி 4: கஞ்சி சித்திர எழுத்துக்கள் (Kanji Training)',
      tamilSubtitle: 'பொருள் பொதிந்த சீன-ஜப்பானிய குறியீடுகள்',
      icon: <BookMarked className="w-5 h-5" />,
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-500/10 dark:bg-orange-500/20',
      textColor: 'text-orange-600 dark:text-orange-400',
      borderClass: 'border-orange-200 dark:border-orange-800',
      targetTab: 'kanji',
      description: 'கருத்துக்களைக் குறிக்கும் சித்திர எழுத்துக்களைக் கற்றுக்கொள்ளுங்கள். ஒவ்வொரு கஞ்சிக்கும் ஒரு தனித்துவமான கதையும் பொருளும் உண்டு.',
      tamilBenefit: 'கஞ்சி பக்கத்தில் உள்ள தமிழ் ஒலிபெயர்ப்பு அமைப்பை (Phonetic Toggle) பயன்படுத்தி, கஞ்சியின் ஒலி மற்றும் அர்த்தத்தை தமிழ் வடிவிலேயே மிக விரைவாக நினைவில் நிறுத்தலாம்.',
      actionLabel: 'கஞ்சி கற்க (Train Kanji)',
      tips: [
        'கஞ்சியை வெறும் வரைபடமாகப் பார்க்காமல், அதன் மூலக்கூறுகளை (Radicals) புரிந்துகொள்ளுங்கள்.',
        'JLPT N5 தேர்வுக்கு சுமார் 100 கஞ்சிகள் மட்டுமே தேவை.',
        'ஒவ்வொரு கஞ்சியின் எழுதுமுறை வரிசையை (Stroke Order) கவனியுங்கள்.'
      ]
    },
    {
      id: 'culture',
      title: 'படி 5: கலாச்சார அறிமுகம் (Cultural Immersion)',
      tamilSubtitle: 'மொழி என்பது பண்பாட்டின் கண்ணாடி',
      icon: <Globe className="w-5 h-5" />,
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-red-500/10 dark:bg-red-500/20',
      textColor: 'text-red-600 dark:text-red-400',
      borderClass: 'border-red-200 dark:border-red-800',
      targetTab: 'culture',
      description: 'ஜப்பானிய மக்களின் பண்பாடு, பழக்கவழக்கங்கள், மரியாதை முறைகள் ஆகியவற்றைக் கற்று, உண்மையான சூழலில் மொழியைப் பயன்படுத்தத் தயாராக்குங்கள்.',
      tamilBenefit: 'பெரியோரை மதிப்பது, விருந்தோம்பல், கைகூப்பி அல்லது குனிந்து வணங்குவது போன்ற ஜப்பானியப் பண்பாடுகள் நம் தமிழ் பண்பாட்டுடன் நெருங்கிய தொடர்புடையவை. இந்த ஒற்றுமைகளை அறிந்து மகிழ்ச்சியுடன் கற்றுக்கொள்ளுங்கள்.',
      actionLabel: 'கலாச்சாரம் அறிக (Explore Culture)',
      tips: [
        'வணக்கம் (Aisatsu) மற்றும் நன்றி கூறும் முறைகளின் பின்னணியைப் படியுங்கள்.',
        'சமூக ஊடகப் பகிர்வுகள், பிற தமிழ் கற்பவர்களின் சந்தேகங்கள் மற்றும் வீடியோ பாடங்களை உற்றுநோக்குங்கள்.',
        'மொழியைப் பேசுவதில் உள்ள நுட்பமான கலாச்சார வேறுபாடுகளைப் புரிந்துகொள்ளுங்கள்.'
      ]
    }
  ];

  return (
    <div className={cn(
      "p-5 sm:p-6 rounded-2xl border transition-all duration-300 w-full mb-6",
      theme === 'dark' 
        ? "bg-[#18181b] border-gray-800 text-white" 
        : "bg-white border-gray-200 text-black shadow-sm"
    )}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold flex items-center gap-2">
            <Sparkles className="text-red-500 shrink-0" size={20} />
            ஜப்பானிய மொழி கற்றல் பாதை (Learning Roadmap)
          </h2>
          <p className={cn("text-xs mt-1", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>
            தமிழ் வழியாக ஜப்பானிய மொழியை மிக எளிதாகக் கற்று தேர்ச்சி பெற வழிகாட்டிப் பலகை.
          </p>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-center px-3 py-1 bg-red-500/10 text-red-500 text-xs font-bold rounded-full">
          <span>5 எளிய படிகள்</span>
        </div>
      </div>

      {/* Grid Layout for Roadmap: Steps left, Details right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Timeline Path Column */}
        <div className="lg:col-span-5 space-y-3 relative">
          {/* Vertical line connector (desktop only, to connect buttons nicely) */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200 dark:bg-gray-800 hidden sm:block -z-0" />

          {steps.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border flex items-start gap-4 transition-all duration-300 relative z-10 hover:scale-[1.01]",
                  isActive 
                    ? (theme === 'dark' ? "bg-zinc-900 border-red-500 ring-1 ring-red-500/20" : "bg-red-50/40 border-red-500 ring-1 ring-red-500/10 shadow-sm")
                    : (theme === 'dark' ? "bg-black/20 border-zinc-800 hover:bg-zinc-900/60" : "bg-gray-50/50 border-gray-100 hover:bg-gray-50")
                )}
              >
                {/* Numeric Indicator & Icon */}
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm transition-all shadow-sm",
                  isActive 
                    ? "bg-red-600 text-white" 
                    : theme === 'dark' ? "bg-zinc-800 text-gray-300" : "bg-gray-200 text-gray-600"
                )}>
                  {step.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn(
                      "text-xs font-bold uppercase tracking-wider",
                      isActive ? "text-red-500" : "text-gray-400"
                    )}>
                      படி {index + 1}
                    </span>
                    {isActive && (
                      <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                    )}
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base mt-0.5 truncate">{step.title.split(': ')[1]}</h3>
                  <p className={cn("text-xs truncate mt-0.5", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>
                    {step.tamilSubtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detailed Card Panel */}
        <div className="lg:col-span-7 h-full">
          <div className={cn(
            "p-5 sm:p-6 rounded-2xl border transition-all duration-300 h-full flex flex-col justify-between",
            theme === 'dark' ? "bg-[#1f1f23] border-gray-800" : "bg-zinc-50/50 border-gray-200 shadow-sm"
          )}>
            <div>
              {/* Header inside Panel */}
              <div className="flex items-start gap-3.5 pb-4 border-b border-gray-200 dark:border-gray-800 mb-4">
                <div className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                  steps[activeStep].bgColor,
                  steps[activeStep].textColor
                )}>
                  {steps[activeStep].icon}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold tracking-tight">
                    {steps[activeStep].title}
                  </h3>
                  <p className={cn("text-xs font-medium", steps[activeStep].textColor)}>
                    {steps[activeStep].tamilSubtitle}
                  </p>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">விளக்கம் (What to learn):</h4>
                  <p className={cn("text-sm leading-relaxed", theme === 'dark' ? "text-gray-200" : "text-gray-800")}>
                    {steps[activeStep].description}
                  </p>
                </div>

                <div className={cn(
                  "p-3 rounded-xl border",
                  theme === 'dark' ? "bg-black/30 border-zinc-800" : "bg-white border-gray-200/60"
                )}>
                  <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    💡 தமிழ் வழிச் சிறப்பு அம்சம் (Tamil Speaker Edge):
                  </h4>
                  <p className={cn("text-xs sm:text-sm leading-relaxed", theme === 'dark' ? "text-gray-300" : "text-gray-700")}>
                    {steps[activeStep].tamilBenefit}
                  </p>
                </div>

                {/* Practical Tips List */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">முக்கிய குறிப்புகள் (Quick Tips):</h4>
                  <ul className="space-y-2">
                    {steps[activeStep].tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                        <span className={theme === 'dark' ? "text-gray-300" : "text-gray-600"}>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Navigation Action Button */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-[11px] text-gray-400 font-medium">
                எங்கள் செயலியின் பிரத்யேகப் பகுதியைத் தொடங்குங்கள்.
              </span>
              <button
                onClick={() => setTab(steps[activeStep].targetTab)}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 shrink-0 self-stretch sm:self-auto"
              >
                <span>{steps[activeStep].actionLabel}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
