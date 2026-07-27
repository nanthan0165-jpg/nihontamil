const fs = require('fs');

// Fix vocabulary.ts
let vocab = fs.readFileSync('src/data/vocabulary.ts', 'utf-8');
vocab = vocab.replace(/"Noun"/g, '"பெயர்ச்சொல்"');
vocab = vocab.replace(/"Verb"/g, '"வினைச்சொல்"');
vocab = vocab.replace(/"I-adjective"/g, '"I-பெயரடை"');
vocab = vocab.replace(/"Na-adjective"/g, '"Na-பெயரடை"');
vocab = vocab.replace(/"Adverb"/g, '"வினையுரிச்சொல்"');
fs.writeFileSync('src/data/vocabulary.ts', vocab, 'utf-8');

// Fix culture.ts
let culture = fs.readFileSync('src/data/culture.ts', 'utf-8');
culture = culture.replace(/"Onsen \(Hot Springs\)"/g, '"ஒன்சென் (வெந்நீர் ஊற்று)"');
culture = culture.replace(/"Bow \(Ojigi\)"/g, '"தலைவணங்குதல் (ஓஜிகி)"');
culture = culture.replace(/"Sushi"/g, '"சுஷி (Sushi)"');
culture = culture.replace(/"Cherry Blossoms \(Sakura\)"/g, '"செர்ரி மலர்கள் (சகுரா)"');
fs.writeFileSync('src/data/culture.ts', culture, 'utf-8');

console.log("Fixed vocabulary and culture data.");
