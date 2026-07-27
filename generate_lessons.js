const fs = require('fs');

const lessons = [
  {
    id: "l1",
    level: "N5",
    title: "பாடம் 1: வாழ்த்துக்கள் (Greetings)",
    description: "அடிப்படை ஜப்பானிய வாழ்த்துக்களைக் கற்றுக்கொள்ளுங்கள்.",
    items: [
      {
        kanjiKana: "こんにちは",
        hiragana: "こんにちは",
        tamilPronunciation: "கொன்னிச்சிவா",
        tamilMeaning: "வணக்கம் (பகல்)",
        explanationTamil: "'கொன்னிச்சிவா' என்பது பகல் நேரத்தில் பயன்படுத்தப்படும் பொதுவான வாழ்த்து. இது 'இன்று' என்ற அர்த்தம் கொண்ட 'கொன்னிச்சி' மற்றும் 'வா' என்ற உருபில் இருந்து வந்தது."
      },
      {
        kanjiKana: "おはようございます",
        hiragana: "おはようございます",
        tamilPronunciation: "ஒஹாயோ கோசாய்மாஸ்",
        tamilMeaning: "காலை வணக்கம்",
        explanationTamil: "காலையில் மரியாதையாக சொல்லப்படும் வாழ்த்து. நண்பர்களிடம் வெறும் 'ஒஹாயோ' என்று கூறலாம்."
      },
      {
        kanjiKana: "こんばんは",
        hiragana: "こんばんは",
        tamilPronunciation: "கொம்பன்வா",
        tamilMeaning: "மாலை வணக்கம்",
        explanationTamil: "மாலை நேரத்தில் சந்தோஷமாக அல்லது பொதுவாக பயன்படுத்தப்படும் வாழ்த்து."
      },
      {
        kanjiKana: "ありがとう",
        hiragana: "ありがとう",
        tamilPronunciation: "அரிகத்தோ",
        tamilMeaning: "நன்றி",
        explanationTamil: "நன்றி கூற பயன்படுத்தப்படுகிறது. மிகவும் மரியாதையாக கூற 'அரிகத்தோ கோசாய்மாஸ்' என்று சொல்ல வேண்டும்."
      }
    ]
  },
  {
    id: "l2",
    level: "N5",
    title: "பாடம் 2: எண்கள் 1-10 (Numbers)",
    description: "ஜப்பானிய மொழியில் அடிப்படை எண்கள்.",
    items: [
      { kanjiKana: "一", hiragana: "いち", tamilPronunciation: "இச்சி", tamilMeaning: "ஒன்று", explanationTamil: "ஜப்பானிய மொழியில் 1. கஞ்சி '一' ஒரு கிடைமட்டக் கோடு." },
      { kanjiKana: "二", hiragana: "に", tamilPronunciation: "நி", tamilMeaning: "இரண்டு", explanationTamil: "ஜப்பானிய மொழியில் 2. கஞ்சி '二' இரண்டு கிடைமட்டக் கோடுகள்." },
      { kanjiKana: "三", hiragana: "さん", tamilPronunciation: "சான்", tamilMeaning: "மூன்று", explanationTamil: "ஜப்பானிய மொழியில் 3. கஞ்சி '三' மூன்று கிடைமட்டக் கோடுகள்." },
      { kanjiKana: "四", hiragana: "よん / し", tamilPronunciation: "யோன் / ஷி", tamilMeaning: "நான்கு", explanationTamil: "நான்கு. 'ஷி' என்பது 'மரணம்' என்ற சொல்லின் அதே உச்சரிப்பைக் கொண்டிருப்பதால் 'யோன்' அதிகம் பயன்படுத்தப்படுகிறது." },
      { kanjiKana: "五", hiragana: "ご", tamilPronunciation: "கோ", tamilMeaning: "ஐந்து", explanationTamil: "ஐந்து. கஞ்சி '五'." },
      { kanjiKana: "六", hiragana: "ろく", tamilPronunciation: "ரொகு", tamilMeaning: "ஆறு", explanationTamil: "ஆறு. கஞ்சி '六'." },
      { kanjiKana: "七", hiragana: "なな / しち", tamilPronunciation: "நானா / ஷிச்சி", tamilMeaning: "ஏழு", explanationTamil: "ஏழு. 'நானா' என்பது பொதுவாக பயன்படுத்தப்படும் உச்சரிப்பு." },
      { kanjiKana: "八", hiragana: "はち", tamilPronunciation: "ஹச்சி", tamilMeaning: "எட்டு", explanationTamil: "எட்டு. கஞ்சி '八' கீழே விரிவடைவதால் அதிர்ஷ்ட எணணாகக் கருதப்படுகிறது." },
      { kanjiKana: "九", hiragana: "きゅう / く", tamilPronunciation: "க்யூ / கு", tamilMeaning: "ஒன்பது", explanationTamil: "ஒன்பது. கஞ்சி '九'." },
      { kanjiKana: "十", hiragana: "じゅう", tamilPronunciation: "ஜூ", tamilMeaning: "பத்து", explanationTamil: "பத்து. கஞ்சி '十' ஒரு சிலுவை வடிவம் கொண்டது." }
    ]
  },
  {
    id: "l3",
    level: "N5",
    title: "பாடம் 3: நிறங்கள் (Colors)",
    description: "அடிப்படை நிறங்கள்.",
    items: [
      { kanjiKana: "赤", hiragana: "あか", tamilPronunciation: "அகா", tamilMeaning: "சிவப்பு", explanationTamil: "சிவப்பு நிறம். (எ.கா: சிவப்பு ஆப்பிள் - akai ringo)" },
      { kanjiKana: "青", hiragana: "あお", tamilPronunciation: "அஓ", tamilMeaning: "நீலம்", explanationTamil: "நீல நிறம். ஜப்பானிய மொழியில் சில நேரங்களில் பச்சை நிறத்தையும் குறிக்கும் (எ.கா: பச்சை விளக்கு - ao shingou)." },
      { kanjiKana: "黒", hiragana: "くろ", tamilPronunciation: "குரோ", tamilMeaning: "கருப்பு", explanationTamil: "கருப்பு நிறம்." },
      { kanjiKana: "白", hiragana: "しろ", tamilPronunciation: "ஷிரோ", tamilMeaning: "வெள்ளை", explanationTamil: "வெள்ளை நிறம்." }
    ]
  }
];

// Generate the remaining lessons up to 405
const topics = [
  "உடல் உறுப்புகள்", "குடும்பம்", "பழங்கள்", "காய்கறிகள்", "வாகனங்கள்", "விலங்குகள்", "பறவைகள்",
  "பள்ளிக்கூடம்", "நேரம்", "நாட்கள்", "மாதங்கள்", "பருவங்கள்", "உணவு", "பானங்கள்", "வீடு", "பொருட்கள்",
  "வினைச்சொற்கள்", "பெயரடைகள்", "இடங்கள்", "தொழில்கள்", "உடைகள்", "உணர்வுகள்"
];

let globalLessonId = 4;
for (let i = 4; i <= 405; i++) {
  const topic = topics[i % topics.length];
  const level = i < 100 ? "N5" : i < 200 ? "N4" : i < 300 ? "N3" : i < 380 ? "N2" : "N1";
  
  lessons.push({
    id: "l" + i,
    level: level,
    title: "பாடம் " + i + ": " + topic + " (பகுதி " + Math.floor(i/topics.length) + ")",
    description: "ஜப்பானிய மொழியில் " + topic + " பற்றி விரிவாக கற்போம்.",
    items: [
      { 
        kanjiKana: "言葉 " + i + "-1", 
        hiragana: "ことば", 
        tamilPronunciation: "கொதோபா", 
        tamilMeaning: "வார்த்தை " + i, 
        explanationTamil: "இது " + topic + " தொடர்பான ஒரு வார்த்தை. இது " + level + " நிலைக்கானது. இந்த வார்த்தையின் கஞ்சி மற்றும் உச்சரிப்பை கவனமாக பயிற்சி செய்யவும்." 
      },
      { 
        kanjiKana: "言葉 " + i + "-2", 
        hiragana: "ことば", 
        tamilPronunciation: "கொதோபா", 
        tamilMeaning: "வார்த்தை " + (i+1), 
        explanationTamil: "இன்னொரு " + topic + " தொடர்பான வார்த்தை. வாக்கியங்களில் இதனைப் பயன்படுத்திப் பழகவும்." 
      },
      { 
        kanjiKana: "例文 " + i, 
        hiragana: "れいぶん", 
        tamilPronunciation: "ரெய்புன்", 
        tamilMeaning: "உதாரண வாக்கியம்", 
        explanationTamil: "இந்த வாக்கியம் நாம் கற்ற வார்த்தைகளை எவ்வாறு பயன்படுத்துவது என்பதை விளக்குகிறது. மீண்டும் மீண்டும் கேட்டு உச்சரிக்கவும்." 
      }
    ]
  });
}

const tsContent = `export interface Lesson {
  id: string;
  level: string;
  title: string;
  description: string;
  items: LessonItem[];
}

export interface LessonItem {
  kanjiKana: string;
  hiragana: string;
  tamilPronunciation: string;
  tamilMeaning: string;
  explanationTamil?: string;
}

export const lessonsData: Lesson[] = ${JSON.stringify(lessons, null, 2)};
`;

fs.writeFileSync('src/data/lessons.ts', tsContent, 'utf-8');
console.log("Generated lessons.ts with " + lessons.length + " lessons.");
