export interface GrammarExample {
  japanese: string;
  hiragana: string;
  tamilTranslation: string;
  tamilPronunciation: string;
}

export interface GrammarPoint {
  id: string;
  pattern: string;
  hiragana: string;
  level: string;
  tamilExplanation: string;
  commonMistakes: string;
  examples: GrammarExample[];
}

import allGrammar from './grammar_all.json';

export const grammarData: GrammarPoint[] = allGrammar as GrammarPoint[];
