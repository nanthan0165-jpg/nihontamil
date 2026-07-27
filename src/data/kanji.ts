export interface KanjiExample {
  japanese: string;
  hiragana: string;
  tamilPronunciation: string;
  tamilMeaning: string;
}

export interface Kanji {
  id: string;
  character: string;
  level: string;
  strokeCount: number;
  meaningEnglish: string;
  meaningTamil: string;
  onyomi: string;
  kunyomi: string;
  tamilPronunciationInfo: string;
  examples?: KanjiExample[];
}

import allKanji from './kanji_all.json';

// We map it to ensure it matches the interface
export const kanjiData: Kanji[] = allKanji as Kanji[];
