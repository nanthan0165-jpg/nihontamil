const fs = require('fs');
const data = require('./src/data/grammar_all.json');

async function translate(text) {
  if (!text) return text;
  if (!/[a-zA-Z]/.test(text)) return text; // Already translated or no English

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ta&dt=t&q=${encodeURIComponent(text)}`;
  
  let retries = 3;
  while (retries > 0) {
    try {
      const res = await fetch(url);
      if (res.status === 429) {
        console.log("Rate limited. Waiting 2s...");
        await new Promise(r => setTimeout(r, 2000));
        retries--;
        continue;
      }
      const json = await res.json();
      return json[0].map(item => item[0]).join('');
    } catch(e) {
      retries--;
      if (retries === 0) return text;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  return text;
}

async function processAll() {
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    
    // Check if it needs translation
    let needsTranslation = /[a-zA-Z]/.test(item.tamilExplanation) || /[a-zA-Z]/.test(item.commonMistakes);
    if (item.examples) {
      for (const ex of item.examples) {
        if (/[a-zA-Z]/.test(ex.tamilTranslation)) needsTranslation = true;
      }
    }
    
    if (needsTranslation) {
      item.tamilExplanation = await translate(item.tamilExplanation);
      item.commonMistakes = await translate(item.commonMistakes);
      
      if (item.examples) {
        for (const ex of item.examples) {
          ex.tamilTranslation = await translate(ex.tamilTranslation);
        }
      }
      
      count++;
      if (count % 10 === 0) {
        console.log(`Translated another ${count} items...`);
        fs.writeFileSync('./src/data/grammar_all.json', JSON.stringify(data, null, 2));
      }
      
      await new Promise(r => setTimeout(r, 20)); // ultra fast
    }
  }
  
  fs.writeFileSync('./src/data/grammar_all.json', JSON.stringify(data, null, 2));
  console.log(`Finished translating remaining items.`);
}

processAll();
