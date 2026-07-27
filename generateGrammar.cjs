const fs = require('fs');

const grammarList = [
  {
    id: "g_n5_1", pattern: "〜は〜です", hiragana: "〜は〜です", level: "N5",
    tamilExplanation: "'A என்பது B ஆகும்' என்று கூற இது பயன்படுகிறது. 'は' (wa) என்பது தலைப்பைக் குறிக்கும், 'です' (desu) என்பது வாக்கியத்தை மரியாதையாக முடிக்கும்.",
    commonMistakes: "தமிழ் பேசுபவர்கள் பெரும்பாலும் 'は' ஐ 'ha' என்று தவறாக உச்சரிப்பார்கள். இலக்கணத்தில் வரும்போது இதை 'wa' என்று தான் உச்சரிக்க வேண்டும்.",
    examples: [
      { japanese: "私は学生です。", hiragana: "わたし は がくせい です。", tamilTranslation: "நான் ஒரு மாணவன்.", tamilPronunciation: "வதாஷி வா ககுசே தேஸ்." },
      { japanese: "彼は先生です。", hiragana: "かれ は せんせい です。", tamilTranslation: "அவர் ஒரு ஆசிரியர்.", tamilPronunciation: "கரே வா சென்சே தேஸ்." }
    ]
  },
  {
    id: "g_n5_2", pattern: "〜を", hiragana: "〜を", level: "N5",
    tamilExplanation: "'を' (wo/o) என்பது செயலின் இலக்கைக் (Object) குறிக்கிறது.",
    commonMistakes: "தமிழில் 'ஐ' என்ற வேற்றுமை உருபுக்கு நிகரானது.",
    examples: [
      { japanese: "ご飯を食べます。", hiragana: "ごはん を たべます。", tamilTranslation: "சாதம் சாப்பிடுகிறேன்.", tamilPronunciation: "கொஹான் ஓ தபேமாஸ்." }
    ]
  },
  {
    id: "g_n5_3", pattern: "〜も", hiragana: "〜も", level: "N5",
    tamilExplanation: "'も' (mo) என்பது 'உம்' (also/too) என்ற பொருளைத் தரும்.",
    commonMistakes: "பொதுவாக は, が, を போன்ற உருபுகளுக்கு பதிலாக வரும்.",
    examples: [
      { japanese: "私も行きます。", hiragana: "わたし も いきます。", tamilTranslation: "நானும் போகிறேன்.", tamilPronunciation: "வதாஷி மோ இகிமாஸ்." }
    ]
  },
  {
    id: "g_n5_4", pattern: "〜に", hiragana: "〜に", level: "N5",
    tamilExplanation: "'に' (ni) என்பது நேரம், இடம், அல்லது இலக்கைக் குறிக்கப் பயன்படுகிறது (இல், க்கு).",
    commonMistakes: "நேரத்தைக் குறிக்கும் போது சில நேரங்களில் に வராது (உம்: 明日 - நாளை).",
    examples: [
      { japanese: "東京に行きます。", hiragana: "とうきょう に いきます。", tamilTranslation: "டோக்கியோவுக்குப் போகிறேன்.", tamilPronunciation: "தோக்யோ நி இகிமாஸ்." },
      { japanese: "３時に終わります。", hiragana: "さんじ に おわります。", tamilTranslation: "3 மணிக்கு முடியும்.", tamilPronunciation: "சான்ஜி நி ஓவாரிமாஸ்." }
    ]
  },
  {
    id: "g_n5_5", pattern: "〜で", hiragana: "〜で", level: "N5",
    tamilExplanation: "'で' (de) என்பது ஒரு செயல் நடைபெறும் இடம் அல்லது ஒரு செயலைச் செய்யப் பயன்படும் கருவியைக் குறிக்கிறது (ஆல், இல்).",
    commonMistakes: "இருப்பைக் குறிக்க 'に' வரும், செயலைக் குறிக்க 'で' வரும்.",
    examples: [
      { japanese: "バスで行きます。", hiragana: "ばす で いきます。", tamilTranslation: "பேருந்தில் (பேருந்தால்) போகிறேன்.", tamilPronunciation: "பாசு தே இகிமாஸ்." },
      { japanese: "レストランで食べます。", hiragana: "れすとらん で たべます。", tamilTranslation: "உணவகத்தில் சாப்பிடுகிறேன்.", tamilPronunciation: "ரெசுதொரான் தே தபேமாஸ்." }
    ]
  },
  {
    id: "g_n4_1", pattern: "〜ことができます", hiragana: "〜こと が できます", level: "N4",
    tamilExplanation: "ஒரு செயலைச் செய்ய முடியும் (can do) என்பதைக் குறிக்கிறது. வினைச்சொல்லின் அகராதி வடிவத்துடன் (Dictionary form) 'ことができます' சேரும்.",
    commonMistakes: "வினைச்சொல்லை மாற்றுவதில் குழப்பம் ஏற்படலாம்.",
    examples: [
      { japanese: "日本語を話すことができます。", hiragana: "にほんご を はなす こと が できます。", tamilTranslation: "ஜப்பானிய மொழி பேச முடியும்.", tamilPronunciation: "நிஹொங்கோ ஓ ஹனாசு கோதோ கா தெகிமாஸ்." }
    ]
  },
  {
    id: "g_n4_2", pattern: "〜つもりです", hiragana: "〜つもり です", level: "N4",
    tamilExplanation: "ஒரு செயலைச் செய்யும் எண்ணம் அல்லது திட்டம் உள்ளது என்பதைக் குறிக்கிறது (plan to do).",
    commonMistakes: "திட்டம் உறுதியாக இல்லாதபோது இதைப் பயன்படுத்தக் கூடாது.",
    examples: [
      { japanese: "日本に行くつもりです。", hiragana: "にほん に いく つもり です。", tamilTranslation: "ஜப்பானுக்குப் போகத் திட்டமிட்டுள்ளேன்.", tamilPronunciation: "நிஹொன் நி இகு சுமோரி தேஸ்." }
    ]
  },
  {
    id: "g_n4_3", pattern: "〜ほうがいいです", hiragana: "〜ほう が いい です", level: "N4",
    tamilExplanation: "அறிவுரை அல்லது பரிந்துரை வழங்கப் பயன்படுகிறது (had better). கடந்த கால வினைச்சொல்லுடன் (た-form) அல்லது எதிர்மறை வடிவத்துடன் (ない-form) சேரும்.",
    commonMistakes: "அகராதி வடிவத்துடன் (Dictionary form) சேர்க்கக் கூடாது.",
    examples: [
      { japanese: "早く寝たほうがいいです。", hiragana: "はやく ねた ほう が いい です。", tamilTranslation: "சீக்கிரம் தூங்குவது நல்லது.", tamilPronunciation: "ஹயகு நெதா ஹோ கா ஈ தேஸ்." }
    ]
  },
  {
    id: "g_n3_1", pattern: "〜ように", hiragana: "〜ように", level: "N3",
    tamilExplanation: "ஒரு நோக்கம் அல்லது எதிர்பார்ப்பைக் குறிக்கப் பயன்படுகிறது (in order to, so that).",
    commonMistakes: "ために மற்றும் ように ஆகியவற்றுக்கு இடையேயான வேறுபாட்டைப் புரிந்துகொள்வது கடினம். ように என்பது பொதுவாக ஒரு நிலை மாறுவதைக் குறிக்கும்.",
    examples: [
      { japanese: "忘れないように、メモをします。", hiragana: "わすれない ように、めも を します。", tamilTranslation: "மறக்காமல் இருக்க, குறிப்பு எழுதுகிறேன்.", tamilPronunciation: "வசுரேனாய் யோனி, மெமோ ஓ ஷிமாஸ்." }
    ]
  },
  {
    id: "g_n3_2", pattern: "〜ために", hiragana: "〜ために", level: "N3",
    tamilExplanation: "ஒரு குறிப்பிட்ட நோக்கத்திற்காக ஒரு செயலைச் செய்வதைக் குறிக்கிறது (for the sake of, in order to).",
    commonMistakes: "ように-யுடன் குழப்பம் ஏற்படலாம். ために என்பது நேரடி கட்டுப்பாட்டில் உள்ள செயல்களுக்கு வரும்.",
    examples: [
      { japanese: "健康のために、走っています。", hiragana: "けんこう の ために、はしって います。", tamilTranslation: "ஆரோக்கியத்திற்காக ஓடுகிறேன்.", tamilPronunciation: "கென்கோ நோ தமேனி, ஹாஷித்தே இமாஸ்." }
    ]
  },
  {
    id: "g_n3_3", pattern: "〜てしまう", hiragana: "〜て しまう", level: "N3",
    tamilExplanation: "ஒரு செயல் முழுமையாக முடிந்துவிட்டது என்பதையோ அல்லது அதைப் பற்றிய வருத்தத்தையோ குறிக்கிறது.",
    commonMistakes: "பேச்சுவழக்கில் இது '〜ちゃう' (chau) என்று மாறும்.",
    examples: [
      { japanese: "ケーキを全部食べてしまった。", hiragana: "けーき を ぜんぶ たべて しまった。", tamilTranslation: "கேக் முழுவதையும் சாப்பிட்டுவிட்டேன் (வருத்தம்/முழுமை).", tamilPronunciation: "கேகி ஓ சென்பு தபேதே ஷிமத்தா." }
    ]
  },
  {
    id: "g_n2_1", pattern: "〜にちがいない", hiragana: "〜に ちがいない", level: "N2",
    tamilExplanation: "ஒரு விஷயம் நிச்சயமாக இப்படித்தான் இருக்கும் என்று உறுதியாக நம்பும் போது பயன்படுத்தப்படுகிறது (must be, without a doubt).",
    commonMistakes: "பேச்சுவழக்கை விட சற்று முறையானது.",
    examples: [
      { japanese: "彼は嘘をついているにちがいない。", hiragana: "かれ は うそ を ついている に ちがいない。", tamilTranslation: "அவன் நிச்சயமாக பொய் சொல்கிறான்.", tamilPronunciation: "கரே வா உசோ ஓ சுஇதேஇரு நி சிகாய்நாய்." }
    ]
  },
  {
    id: "g_n2_2", pattern: "〜わけがない", hiragana: "〜わけ が ない", level: "N2",
    tamilExplanation: "ஒரு விஷயம் நடக்க வாய்ப்பே இல்லை என்று வலுவாக மறுக்கப் பயன்படுகிறது (there is no way that).",
    commonMistakes: "はずがない (hazu ga nai) என்பதை விட மிகவும் வலுவானது.",
    examples: [
      { japanese: "そんなこと、あるわけがない。", hiragana: "そんな こと、ある わけ が ない。", tamilTranslation: "அப்படி நடக்க வாய்ப்பே இல்லை.", tamilPronunciation: "சொன்னா கோதோ, அரு வாகே கா நாய்." }
    ]
  },
  {
    id: "g_n1_1", pattern: "〜ゆえに", hiragana: "〜ゆえに", level: "N1",
    tamilExplanation: "'〜காரணமாக' அல்லது '〜ஆதலால்' என்று பொருள்படும் மிகவும் முறையான (formal) எழுத்துவழக்குச் சொல்.",
    commonMistakes: "தினசரி பேச்சில் பயன்படுத்தக் கூடாது.",
    examples: [
      { japanese: "悪天候ゆえに、試合は中止となった。", hiragana: "あくてんこう ゆえに、しあい は ちゅうし と なった。", tamilTranslation: "மோசமான வானிலை காரணமாக, போட்டி ரத்து செய்யப்பட்டது.", tamilPronunciation: "அகுதென்கோ யுஎனி, ஷிஐ வா சூஷி தோ நத்தா." }
    ]
  },
  {
    id: "g_n1_2", pattern: "〜を皮切りに", hiragana: "〜を かわきりに", level: "N1",
    tamilExplanation: "ஒன்றைத் தொடக்கமாகக் கொண்டு, அதே போன்ற செயல்கள் தொடர்ந்து நடைபெறும் என்பதைக் குறிக்கப் பயன்படுகிறது (starting with).",
    commonMistakes: "ஒரே ஒரு முறை நடக்கும் செயல்களுக்குப் பயன்படுத்தக் கூடாது.",
    examples: [
      { japanese: "東京公演を皮切りに、全国ツアーが始まる。", hiragana: "とうきょう こうえん を かわきりに、ぜんこく つあー が はじまる。", tamilTranslation: "டோக்கியோ கச்சேரியைத் தொடக்கமாகக் கொண்டு, தேசியச் சுற்றுப்பயணம் தொடங்குகிறது.", tamilPronunciation: "தோக்யோ கோஎன் ஓ கவாகிரினி, சென்கொகு சுஆ கா ஹாஜிமாரு." }
    ]
  }
];

fs.writeFileSync('src/data/grammar_all.json', JSON.stringify(grammarList, null, 2));
console.log('Grammar generated.');
