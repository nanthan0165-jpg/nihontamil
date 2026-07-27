const data = require('./src/data/grammar_all.json');

async function translate(text) {
  if (!text) return text;
  if (!/[a-zA-Z]/.test(text)) return text; 

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ta&dt=t&q=${encodeURIComponent(text)}`;
  
  try {
    const res = await fetch(url);
    if (res.status === 429) {
      console.log("Rate limited 429!");
      return null;
    }
    const json = await res.json();
    return json[0].map(item => item[0]).join('');
  } catch(e) {
    console.log("Error:", e.message);
    return null;
  }
}

async function run() {
  for (let i = 0; i < data.length; i++) {
    if (/[a-zA-Z]/.test(data[i].tamilExplanation)) {
      console.log("Found english at", i);
      const translated = await translate(data[i].tamilExplanation);
      console.log("Translation:", translated);
      break;
    }
  }
}
run();
