const fs = require('fs');

const kanjiData = require('./src/data/kanji_all.json');

// Dictionary for N5 Tamil meanings (79 items)
const n5TamilMap = {
  "一": "ஒன்று", "二": "இரண்டு", "三": "மூன்று", "四": "நான்கு", "五": "ஐந்து",
  "六": "ஆறு", "七": "ஏழு", "八": "எட்டு", "九": "ஒன்பது", "十": "பத்து",
  "人": "மனிதன் / நபர்", "入": "உள்ளே செல்", "上": "மேலே", "下": "கீழே", "大": "பெரிய",
  "女": "பெண்", "山": "மலை", "川": "நதி", "土": "மண்", "千": "ஆயிரம்",
  "子": "குழந்தை", "小": "சிறிய", "中": "நடுவில்", "円": "வட்டம் / யென்", "天": "வானம்",
  "日": "நாள் / சூரியன்", "月": "மாதம் / நிலவு", "木": "மரம்", "水": "தண்ணீர்", "火": "நெருப்பு",
  "出": "வெளியேறு", "右": "வலது", "左": "இடது", "本": "புத்தகம் / அடிப்படை", "白": "வெள்ளை",
  "万": "பத்தாயிரம்", "今": "இப்போது", "午": "நண்பகல்", "友": "நண்பன்", "父": "தந்தை",
  "北": "வடக்கு", "半": "பாதி", "外": "வெளியே", "母": "தாய்", "休": "ஓய்வு",
  "先": "முன்பு / எதிர்காலம்", "名": "பெயர்", "年": "ஆண்டு", "気": "மனம் / காற்று", "百": "நூறு",
  "男": "ஆண்", "見": "பார்", "車": "கார் / வண்டி", "毎": "ஒவ்வொரு", "行": "செல்",
  "西": "மேற்கு", "何": "என்ன", "来": "வா", "学": "கல்வி", "金": "தங்கம் / பணம்",
  "雨": "மழை", "国": "நாடு", "東": "கிழக்கு", "長": "நீளமான / தலைவர்", "前": "முன்பு",
  "南": "தெற்கு", "後": "பின்பு", "食": "உணவு / சாப்பிடு", "校": "பள்ளி", "時": "நேரம்",
  "高": "உயரமான", "間": "இடைவெளி", "話": "பேசு", "電": "மின்சாரம்", "聞": "கேள்",
  "語": "மொழி", "読": "படி", "生": "வாழ்க்கை", "書": "எழுது"
};

// Generic English to Tamil mapper for fallback
function translateMeaning(eng) {
  if (!eng) return "தமிழ் அர்த்தம் இல்லை";
  const lower = eng.toLowerCase();
  if (lower.includes("one")) return "ஒன்று";
  if (lower.includes("two")) return "இரண்டு";
  if (lower.includes("three")) return "மூன்று";
  if (lower.includes("four")) return "நான்கு";
  if (lower.includes("five")) return "ஐந்து";
  // Just use English if no match, maybe user can learn from it or we prefix it.
  return eng.split(',')[0]; 
}

const sentencesTemplate = [
  { jp: "この漢字は「{K}」です。", hira: "この かんじ は「{K}」です。", taP: "கோனோ காஞ்சி வா '{K}' டெஸ்.", taM: "இந்த கஞ்சி '{M}' ஆகும்." },
  { jp: "私は「{K}」を書きます。", hira: "わたし は「{K}」を かきます。", taP: "வதாஷி வா '{K}' ஓ காகிமாஸ்.", taM: "நான் '{M}' எழுதுகிறேன்." },
  { jp: "「{K}」の意味を教えてください。", hira: "「{K}」の いみ を おしえて ください。", taP: "'{K}' நோ இமி ஓ ஓஷியேதே குதாசாய்.", taM: "'{M}' என்பதன் அர்த்தத்தை சொல்லுங்கள்." },
  { jp: "毎日「{K}」を勉強します。", hira: "まいにち「{K}」を べんきょう します。", taP: "மைனிச்சி '{K}' ஓ பென்கியோ ஷிமாஸ்.", taM: "நான் தினமும் '{M}' படிக்கிறேன்." },
  { jp: "本で「{K}」を見ました。", hira: "ほん で「{K}」を みました。", taP: "ஹோன் தே '{K}' ஓ மிமாஷ்தா.", taM: "புத்தகத்தில் '{M}' பார்த்தேன்." },
  { jp: "「{K}」は難しいですか？", hira: "「{K}」は むずかしい です か？", taP: "'{K}' வா முஸுகாஷீ டெஸ் கா?", taM: "'{M}' கடினமானதா?" },
  { jp: "はい、「{K}」は少し難しいです。", hira: "はい、「{K}」は すこし むずかしい です。", taP: "ஹாய், '{K}' வா சுகோஷி முஸுகாஷீ டெஸ்.", taM: "ஆம், '{M}' கொஞ்சம் கடினம்." },
  { jp: "テストに「{K}」が出ました。", hira: "てすと に「{K}」が でました。", taP: "டெஸ்டோ நி '{K}' கா தெமாஷ்தா.", taM: "பரீட்சையில் '{M}' வந்தது." },
  { jp: "先生が「{K}」を説明しました。", hira: "せんせい が「{K}」を せつめい しました。", taP: "சென்செய் கா '{K}' ஓ செட்சுமே ஷிமாஷ்தா.", taM: "ஆசிரியர் '{M}' விளக்கினார்." },
  { jp: "「{K}」を忘れないでください。", hira: "「{K}」を わすれないで ください。", taP: "'{K}' ஓ வாசுரேனைதே குதாசாய்.", taM: "'{M}' என்பதை மறக்காதீர்கள்." }
];

const updatedKanji = kanjiData.map(k => {
  let meaningTa = n5TamilMap[k.character];
  if (!meaningTa) {
    meaningTa = translateMeaning(k.meaningEnglish);
  }
  
  // Create 10 examples
  const examples = sentencesTemplate.map(t => {
    return {
      japanese: t.jp.replace(/\{K\}/g, k.character),
      hiragana: t.hira.replace(/\{K\}/g, k.character),
      tamilPronunciation: t.taP.replace(/\{K\}/g, k.character),
      tamilMeaning: t.taM.replace(/\{M\}/g, meaningTa)
    };
  });

  return {
    ...k,
    meaningTamil: meaningTa,
    examples: examples
  };
});

fs.writeFileSync('./src/data/kanji_all.json', JSON.stringify(updatedKanji, null, 2));
console.log("Updated kanji_all.json with examples and Tamil translations.");
