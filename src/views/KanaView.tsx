import React, { useState } from 'react';
import { useStore } from '../store';
import { cn } from '../lib/utils';

const hiraganaChart = [
  { kana: 'あ', romaji: 'a', tamil: 'அ' }, { kana: 'い', romaji: 'i', tamil: 'இ' }, { kana: 'う', romaji: 'u', tamil: 'உ' }, { kana: 'え', romaji: 'e', tamil: 'எ' }, { kana: 'お', romaji: 'o', tamil: 'ஒ' },
  { kana: 'か', romaji: 'ka', tamil: 'க' }, { kana: 'き', romaji: 'ki', tamil: 'கி' }, { kana: 'く', romaji: 'ku', tamil: 'கு' }, { kana: 'け', romaji: 'ke', tamil: 'கெ' }, { kana: 'こ', romaji: 'ko', tamil: 'கொ' },
  { kana: 'さ', romaji: 'sa', tamil: 'ச' }, { kana: 'し', romaji: 'shi', tamil: 'ஷி' }, { kana: 'す', romaji: 'su', tamil: 'சு' }, { kana: 'せ', romaji: 'se', tamil: 'செ' }, { kana: 'そ', romaji: 'so', tamil: 'சொ' },
  { kana: 'た', romaji: 'ta', tamil: 'த' }, { kana: 'ち', romaji: 'chi', tamil: 'சி' }, { kana: 'つ', romaji: 'tsu', tamil: 'த்சு' }, { kana: 'て', romaji: 'te', tamil: 'தெ' }, { kana: 'と', romaji: 'to', tamil: 'தொ' },
  { kana: 'な', romaji: 'na', tamil: 'ந' }, { kana: 'に', romaji: 'ni', tamil: 'நி' }, { kana: 'ぬ', romaji: 'nu', tamil: 'நு' }, { kana: 'ね', romaji: 'ne', tamil: 'நெ' }, { kana: 'の', romaji: 'no', tamil: 'நொ' },
  { kana: 'は', romaji: 'ha', tamil: 'ஹ' }, { kana: 'ひ', romaji: 'hi', tamil: 'ஹி' }, { kana: 'ふ', romaji: 'fu', tamil: 'பு' }, { kana: 'へ', romaji: 'he', tamil: 'ஹெ' }, { kana: 'ほ', romaji: 'ho', tamil: 'ஹொ' },
  { kana: 'ま', romaji: 'ma', tamil: 'ம' }, { kana: 'み', romaji: 'mi', tamil: 'மி' }, { kana: 'む', romaji: 'mu', tamil: 'மு' }, { kana: 'め', romaji: 'me', tamil: 'மெ' }, { kana: 'も', romaji: 'mo', tamil: 'மொ' },
  { kana: 'や', romaji: 'ya', tamil: 'ய' }, { kana: null, romaji: '', tamil: '' }, { kana: 'ゆ', romaji: 'yu', tamil: 'யு' }, { kana: null, romaji: '', tamil: '' }, { kana: 'よ', romaji: 'yo', tamil: 'யொ' },
  { kana: 'ら', romaji: 'ra', tamil: 'ர' }, { kana: 'り', romaji: 'ri', tamil: 'ரி' }, { kana: 'る', romaji: 'ru', tamil: 'ரு' }, { kana: 'れ', romaji: 're', tamil: 'ரெ' }, { kana: 'ろ', romaji: 'ro', tamil: 'ரொ' },
  { kana: 'わ', romaji: 'wa', tamil: 'வ' }, { kana: null, romaji: '', tamil: '' }, { kana: null, romaji: '', tamil: '' }, { kana: null, romaji: '', tamil: '' }, { kana: 'を', romaji: 'wo', tamil: 'ஒ' },
  { kana: 'ん', romaji: 'n', tamil: 'ன்' }, { kana: null, romaji: '', tamil: '' }, { kana: null, romaji: '', tamil: '' }, { kana: null, romaji: '', tamil: '' }, { kana: null, romaji: '', tamil: '' }
];

const hiraganaDakuten = [
  { kana: 'が', romaji: 'ga', tamil: 'க' }, { kana: 'ぎ', romaji: 'gi', tamil: 'கி' }, { kana: 'ぐ', romaji: 'gu', tamil: 'கு' }, { kana: 'げ', romaji: 'ge', tamil: 'கெ' }, { kana: 'ご', romaji: 'go', tamil: 'கொ' },
  { kana: 'ざ', romaji: 'za', tamil: 'ஜ' }, { kana: 'じ', romaji: 'ji', tamil: 'ஜி' }, { kana: 'ず', romaji: 'zu', tamil: 'ஜு' }, { kana: 'ぜ', romaji: 'ze', tamil: 'ஜெ' }, { kana: 'ぞ', romaji: 'zo', tamil: 'ஜொ' },
  { kana: 'だ', romaji: 'da', tamil: 'ட' }, { kana: 'ぢ', romaji: 'ji', tamil: 'ஜி' }, { kana: 'づ', romaji: 'zu', tamil: 'ஜு' }, { kana: 'で', romaji: 'de', tamil: 'டெ' }, { kana: 'ど', romaji: 'do', tamil: 'டொ' },
  { kana: 'ば', romaji: 'ba', tamil: 'ப' }, { kana: 'び', romaji: 'bi', tamil: 'பி' }, { kana: 'ぶ', romaji: 'bu', tamil: 'பு' }, { kana: 'べ', romaji: 'be', tamil: 'பெ' }, { kana: 'ぼ', romaji: 'bo', tamil: 'பொ' },
  { kana: 'ぱ', romaji: 'pa', tamil: 'ப' }, { kana: 'ぴ', romaji: 'pi', tamil: 'பி' }, { kana: 'ぷ', romaji: 'pu', tamil: 'பு' }, { kana: 'ぺ', romaji: 'pe', tamil: 'பெ' }, { kana: 'ぽ', romaji: 'po', tamil: 'பொ' }
];

const hiraganaYoon = [
  { kana: 'きゃ', romaji: 'kya', tamil: 'க்யா' }, { kana: 'きゅ', romaji: 'kyu', tamil: 'க்யு' }, { kana: 'きょ', romaji: 'kyo', tamil: 'க்யொ' },
  { kana: 'しゃ', romaji: 'sha', tamil: 'ஷா' }, { kana: 'しゅ', romaji: 'shu', tamil: 'ஷு' }, { kana: 'しょ', romaji: 'sho', tamil: 'ஷொ' },
  { kana: 'ちゃ', romaji: 'cha', tamil: 'சா' }, { kana: 'ちゅ', romaji: 'chu', tamil: 'சு' }, { kana: 'ちょ', romaji: 'cho', tamil: 'சொ' },
  { kana: 'にゃ', romaji: 'nya', tamil: 'ன்யா' }, { kana: 'にゅ', romaji: 'nyu', tamil: 'ன்யு' }, { kana: 'にょ', romaji: 'nyo', tamil: 'ன்யொ' },
  { kana: 'ひゃ', romaji: 'hya', tamil: 'ஹ்யா' }, { kana: 'ひゅ', romaji: 'hyu', tamil: 'ஹ்யு' }, { kana: 'ひょ', romaji: 'hyo', tamil: 'ஹ்யொ' },
  { kana: 'みゃ', romaji: 'mya', tamil: 'ம்யா' }, { kana: 'みゅ', romaji: 'myu', tamil: 'ம்யு' }, { kana: 'みょ', romaji: 'myo', tamil: 'ம்யொ' },
  { kana: 'りゃ', romaji: 'rya', tamil: 'ர்யா' }, { kana: 'りゅ', romaji: 'ryu', tamil: 'ர்யு' }, { kana: 'りょ', romaji: 'ryo', tamil: 'ர்யொ' },
  { kana: 'ぎゃ', romaji: 'gya', tamil: 'க்யா' }, { kana: 'ぎゅ', romaji: 'gyu', tamil: 'க்யு' }, { kana: 'ぎょ', romaji: 'gyo', tamil: 'க்யொ' },
  { kana: 'じゃ', romaji: 'ja', tamil: 'ஜா' }, { kana: 'じゅ', romaji: 'ju', tamil: 'ஜு' }, { kana: 'じょ', romaji: 'jo', tamil: 'ஜொ' },
  { kana: 'びゃ', romaji: 'bya', tamil: 'ப்யா' }, { kana: 'びゅ', romaji: 'byu', tamil: 'ப்யு' }, { kana: 'びょ', romaji: 'byo', tamil: 'ப்யொ' },
  { kana: 'ぴゃ', romaji: 'pya', tamil: 'ப்யா' }, { kana: 'ぴゅ', romaji: 'pyu', tamil: 'ப்யு' }, { kana: 'ぴょ', romaji: 'pyo', tamil: 'ப்யொ' }
];

const katakanaChart = [
  { kana: 'ア', romaji: 'a', tamil: 'அ' }, { kana: 'イ', romaji: 'i', tamil: 'இ' }, { kana: 'ウ', romaji: 'u', tamil: 'உ' }, { kana: 'エ', romaji: 'e', tamil: 'எ' }, { kana: 'オ', romaji: 'o', tamil: 'ஒ' },
  { kana: 'カ', romaji: 'ka', tamil: 'க' }, { kana: 'キ', romaji: 'ki', tamil: 'கி' }, { kana: 'ク', romaji: 'ku', tamil: 'கு' }, { kana: 'ケ', romaji: 'ke', tamil: 'கெ' }, { kana: 'コ', romaji: 'ko', tamil: 'கொ' },
  { kana: 'サ', romaji: 'sa', tamil: 'ச' }, { kana: 'シ', romaji: 'shi', tamil: 'ஷி' }, { kana: 'ス', romaji: 'su', tamil: 'சு' }, { kana: 'セ', romaji: 'se', tamil: 'செ' }, { kana: 'ソ', romaji: 'so', tamil: 'சொ' },
  { kana: 'タ', romaji: 'ta', tamil: 'த' }, { kana: 'チ', romaji: 'chi', tamil: 'சி' }, { kana: 'ツ', romaji: 'tsu', tamil: 'த்சு' }, { kana: 'テ', romaji: 'te', tamil: 'தெ' }, { kana: 'ト', romaji: 'to', tamil: 'தொ' },
  { kana: 'ナ', romaji: 'na', tamil: 'ந' }, { kana: 'ニ', romaji: 'ni', tamil: 'நி' }, { kana: 'ヌ', romaji: 'nu', tamil: 'நு' }, { kana: 'ネ', romaji: 'ne', tamil: 'நெ' }, { kana: 'ノ', romaji: 'no', tamil: 'நொ' },
  { kana: 'ハ', romaji: 'ha', tamil: 'ஹ' }, { kana: 'ヒ', romaji: 'hi', tamil: 'ஹி' }, { kana: 'フ', romaji: 'fu', tamil: 'பு' }, { kana: 'ヘ', romaji: 'he', tamil: 'ஹெ' }, { kana: 'ホ', romaji: 'ho', tamil: 'ஹொ' },
  { kana: 'マ', romaji: 'ma', tamil: 'ம' }, { kana: 'ミ', romaji: 'mi', tamil: 'மி' }, { kana: 'ム', romaji: 'mu', tamil: 'மு' }, { kana: 'メ', romaji: 'me', tamil: 'மெ' }, { kana: 'モ', romaji: 'mo', tamil: 'மொ' },
  { kana: 'ヤ', romaji: 'ya', tamil: 'ய' }, { kana: null, romaji: '', tamil: '' }, { kana: 'ユ', romaji: 'yu', tamil: 'யு' }, { kana: null, romaji: '', tamil: '' }, { kana: 'ヨ', romaji: 'yo', tamil: 'யொ' },
  { kana: 'ラ', romaji: 'ra', tamil: 'ர' }, { kana: 'リ', romaji: 'ri', tamil: 'ரி' }, { kana: 'ル', romaji: 'ru', tamil: 'ரு' }, { kana: 'レ', romaji: 're', tamil: 'ரெ' }, { kana: 'ロ', romaji: 'ro', tamil: 'ரொ' },
  { kana: 'ワ', romaji: 'wa', tamil: 'வ' }, { kana: null, romaji: '', tamil: '' }, { kana: null, romaji: '', tamil: '' }, { kana: null, romaji: '', tamil: '' }, { kana: 'ヲ', romaji: 'wo', tamil: 'ஒ' },
  { kana: 'ン', romaji: 'n', tamil: 'ன்' }, { kana: null, romaji: '', tamil: '' }, { kana: null, romaji: '', tamil: '' }, { kana: null, romaji: '', tamil: '' }, { kana: null, romaji: '', tamil: '' }
];

const katakanaDakuten = [
  { kana: 'ガ', romaji: 'ga', tamil: 'க' }, { kana: 'ギ', romaji: 'gi', tamil: 'கி' }, { kana: 'グ', romaji: 'gu', tamil: 'கு' }, { kana: 'ゲ', romaji: 'ge', tamil: 'கெ' }, { kana: 'ゴ', romaji: 'go', tamil: 'கொ' },
  { kana: 'ザ', romaji: 'za', tamil: 'ஜ' }, { kana: 'ジ', romaji: 'ji', tamil: 'ஜி' }, { kana: 'ズ', romaji: 'zu', tamil: 'ஜு' }, { kana: 'ゼ', romaji: 'ze', tamil: 'ஜெ' }, { kana: 'ゾ', romaji: 'zo', tamil: 'ஜொ' },
  { kana: 'ダ', romaji: 'da', tamil: 'ட' }, { kana: 'ヂ', romaji: 'ji', tamil: 'ஜி' }, { kana: 'ヅ', romaji: 'zu', tamil: 'ஜு' }, { kana: 'デ', romaji: 'de', tamil: 'டெ' }, { kana: 'ド', romaji: 'do', tamil: 'டொ' },
  { kana: 'バ', romaji: 'ba', tamil: 'ப' }, { kana: 'ビ', romaji: 'bi', tamil: 'பி' }, { kana: 'ブ', romaji: 'bu', tamil: 'பு' }, { kana: 'ベ', romaji: 'be', tamil: 'பெ' }, { kana: 'ボ', romaji: 'bo', tamil: 'பொ' },
  { kana: 'パ', romaji: 'pa', tamil: 'ப' }, { kana: 'ピ', romaji: 'pi', tamil: 'பி' }, { kana: 'プ', romaji: 'pu', tamil: 'பு' }, { kana: 'ペ', romaji: 'pe', tamil: 'பெ' }, { kana: 'ポ', romaji: 'po', tamil: 'பொ' }
];

const katakanaYoon = [
  { kana: 'キャ', romaji: 'kya', tamil: 'க்யா' }, { kana: 'キュ', romaji: 'kyu', tamil: 'க்யு' }, { kana: 'キョ', romaji: 'kyo', tamil: 'க்யொ' },
  { kana: 'シャ', romaji: 'sha', tamil: 'ஷா' }, { kana: 'シュ', romaji: 'shu', tamil: 'ஷு' }, { kana: 'ショ', romaji: 'sho', tamil: 'ஷொ' },
  { kana: 'チャ', romaji: 'cha', tamil: 'சா' }, { kana: 'チュ', romaji: 'chu', tamil: 'சு' }, { kana: 'チョ', romaji: 'cho', tamil: 'சொ' },
  { kana: 'ニャ', romaji: 'nya', tamil: 'ன்யா' }, { kana: 'ニュ', romaji: 'nyu', tamil: 'ன்யு' }, { kana: 'ニョ', romaji: 'nyo', tamil: 'ன்யொ' },
  { kana: 'ヒャ', romaji: 'hya', tamil: 'ஹ்யா' }, { kana: 'ヒュ', romaji: 'hyu', tamil: 'ஹ்யு' }, { kana: 'ヒョ', romaji: 'hyo', tamil: 'ஹ்யொ' },
  { kana: 'ミャ', romaji: 'mya', tamil: 'ம்யா' }, { kana: 'ミュ', romaji: 'myu', tamil: 'ம்யு' }, { kana: 'ミョ', romaji: 'myo', tamil: 'ம்யொ' },
  { kana: 'リャ', romaji: 'rya', tamil: 'ர்யா' }, { kana: 'リュ', romaji: 'ryu', tamil: 'ர்யு' }, { kana: 'リョ', romaji: 'ryo', tamil: 'ர்யொ' },
  { kana: 'ギャ', romaji: 'gya', tamil: 'க்யா' }, { kana: 'ギュ', romaji: 'gyu', tamil: 'க்யு' }, { kana: 'ギョ', romaji: 'gyo', tamil: 'க்யொ' },
  { kana: 'ジャ', romaji: 'ja', tamil: 'ஜா' }, { kana: 'ジュ', romaji: 'ju', tamil: 'ஜு' }, { kana: 'ジョ', romaji: 'jo', tamil: 'ஜொ' },
  { kana: 'ビャ', romaji: 'bya', tamil: 'ப்யா' }, { kana: 'ビュ', romaji: 'byu', tamil: 'ப்யு' }, { kana: 'ビョ', romaji: 'byo', tamil: 'ப்யொ' },
  { kana: 'ピャ', romaji: 'pya', tamil: 'ப்யா' }, { kana: 'ピュ', romaji: 'pyu', tamil: 'ப்யு' }, { kana: 'ピョ', romaji: 'pyo', tamil: 'ப்யொ' }
];

const kanaGradients = [
  "bg-gradient-to-br from-red-50 to-rose-100 border-red-200 text-red-950 hover:border-red-400 dark:from-[#2a1717] dark:to-[#1a1111] dark:border-red-900/30 dark:text-red-100 dark:hover:border-red-700/50",
  "bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200 text-orange-950 hover:border-orange-400 dark:from-[#2d1b12] dark:to-[#1c110b] dark:border-orange-900/30 dark:text-orange-100 dark:hover:border-orange-700/50",
  "bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-200 text-emerald-950 hover:border-emerald-400 dark:from-[#122218] dark:to-[#0b150f] dark:border-emerald-900/30 dark:text-emerald-100 dark:hover:border-emerald-700/50",
  "bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 text-blue-950 hover:border-blue-400 dark:from-[#111c2a] dark:to-[#0a111a] dark:border-blue-900/30 dark:text-blue-100 dark:hover:border-blue-700/50",
  "bg-gradient-to-br from-purple-50 to-fuchsia-100 border-purple-200 text-purple-950 hover:border-purple-400 dark:from-[#1c1328] dark:to-[#110b1a] dark:border-purple-900/30 dark:text-purple-100 dark:hover:border-purple-700/50",
  "bg-gradient-to-br from-pink-50 to-rose-100 border-pink-200 text-pink-950 hover:border-pink-400 dark:from-[#27121e] dark:to-[#180a12] dark:border-pink-900/30 dark:text-pink-100 dark:hover:border-pink-700/50",
  "bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-200 text-teal-950 hover:border-teal-400 dark:from-[#0c2020] dark:to-[#071313] dark:border-teal-900/30 dark:text-teal-100 dark:hover:border-teal-700/50",
  "bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200 text-indigo-950 hover:border-indigo-400 dark:from-[#12162d] dark:to-[#0b0d1b] dark:border-indigo-900/30 dark:text-indigo-100 dark:hover:border-indigo-700/50"
];

export function KanaView() {
  const { theme, playAudio } = useStore();
  const [activeTab, setActiveTab] = useState<'hiragana' | 'katakana'>('hiragana');
  const [subTab, setSubTab] = useState<'basic' | 'dakuten' | 'yoon'>('basic');

  let currentChart = [];
  let cols = 5;
  if (activeTab === 'hiragana') {
    if (subTab === 'basic') currentChart = hiraganaChart;
    if (subTab === 'dakuten') currentChart = hiraganaDakuten;
    if (subTab === 'yoon') { currentChart = hiraganaYoon; cols = 3; }
  } else {
    if (subTab === 'basic') currentChart = katakanaChart;
    if (subTab === 'dakuten') currentChart = katakanaDakuten;
    if (subTab === 'yoon') { currentChart = katakanaYoon; cols = 3; }
  }

  return (
    <div className="p-4 md:p-6 w-full max-w-5xl mx-auto h-full pb-20">
      <div className="mb-6 mt-4">
        <h1 className="text-2xl font-bold mb-2">கானா எழுத்துக்கள்</h1>
        <p className="text-gray-500 dark:text-gray-400">
          அடிப்படை ஜப்பானிய எழுத்துக்களை கற்றுக்கொள்ளுங்கள்
        </p>
      </div>

      <div className="flex gap-2 mb-4 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab('hiragana')}
          className={cn(
            "px-4 py-2 font-medium border-b-2 transition-colors",
            activeTab === 'hiragana'
              ? "border-red-500 text-red-600 dark:text-red-400"
              : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          )}
        >
          ஹிரகானா
        </button>
        <button
          onClick={() => setActiveTab('katakana')}
          className={cn(
            "px-4 py-2 font-medium border-b-2 transition-colors",
            activeTab === 'katakana'
              ? "border-red-500 text-red-600 dark:text-red-400"
              : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          )}
        >
          கட்டகானா
        </button>
      </div>
      
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setSubTab('basic')}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
            subTab === 'basic'
              ? (theme === 'dark' ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600")
              : (theme === 'dark' ? "bg-[#272727] text-gray-400 hover:bg-[#333]" : "bg-gray-100 text-gray-600 hover:bg-gray-200")
          )}
        >
          அடிப்படை
        </button>
        <button
          onClick={() => setSubTab('dakuten')}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
            subTab === 'dakuten'
              ? (theme === 'dark' ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600")
              : (theme === 'dark' ? "bg-[#272727] text-gray-400 hover:bg-[#333]" : "bg-gray-100 text-gray-600 hover:bg-gray-200")
          )}
        >
          டகுதென்
        </button>
        <button
          onClick={() => setSubTab('yoon')}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
            subTab === 'yoon'
              ? (theme === 'dark' ? "bg-red-900/50 text-red-400" : "bg-red-100 text-red-600")
              : (theme === 'dark' ? "bg-[#272727] text-gray-400 hover:bg-[#333]" : "bg-gray-100 text-gray-600 hover:bg-gray-200")
          )}
        >
          கூட்டெழுத்து
        </button>
      </div>

      <div className={cn(
        "grid gap-2 md:gap-4 sm:gap-6",
        cols === 5 ? "grid-cols-5" : "grid-cols-3"
      )}>
        {currentChart.map((item, index) => (
          item.kana ? (
            <button
              key={index}
              onClick={() => playAudio(item.kana, 'Japanese kana')}
              className={cn(
                "flex flex-col items-center justify-center p-3 md:p-4 rounded-xl border transition-all hover:-translate-y-1 hover:shadow-md",
                kanaGradients[index % kanaGradients.length]
              )}
            >
              <span className={cn("mb-2 font-bold", cols === 5 ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl")}>{item.kana}</span>
              <span className="text-sm md:text-base text-red-600 dark:text-red-400 font-extrabold mb-1">{item.romaji}</span>
              <span className="text-xs md:text-sm font-semibold opacity-80">{item.tamil}</span>
            </button>
          ) : (
            <div key={index} className="opacity-0"></div>
          )
        ))}
      </div>
    </div>
  );
}
