const fs = require('fs');
let content = fs.readFileSync('src/views/GrammarView.tsx', 'utf-8');

// Remove the banner block
content = content.replace(
  /\{.*?test\(selected\.tamilExplanation[\s\S]*?<\/div>\n\s*\)\}/,
  ''
);

// Remove the banner from examples
content = content.replace(
  /\{.*?test\(ex\.tamilTranslation[\s\S]*?<\/div>\n\s*\)\}/,
  ''
);

fs.writeFileSync('src/views/GrammarView.tsx', content, 'utf-8');
console.log("Cleaned Grammar UI banners");
