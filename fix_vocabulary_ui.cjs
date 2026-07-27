const fs = require('fs');

let content = fs.readFileSync('src/views/VocabularyView.tsx', 'utf-8');

// The original Vocabulary view may not have the warning but let's check
if (content.includes("english")) {
  console.log("English found in Vocabulary");
}
