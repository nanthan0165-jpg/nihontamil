const fs = require('fs');
let content = fs.readFileSync('src/views/GrammarView.tsx', 'utf-8');

const bannerExamples = `{/[a-zA-Z]/.test(ex.tamilTranslation || '') && (
                    <div className="text-xs text-yellow-600 dark:text-yellow-500 mt-1 mb-1 font-medium">※ தமிழ் மொழிபெயர்ப்பு நிலுவையில் உள்ளது</div>
                  )}`;

content = content.replace(
  '<p className="text-base font-medium">{ex.tamilTranslation}</p>',
  `${bannerExamples}\n                  <p className="text-base font-medium">{ex.tamilTranslation}</p>`
);

fs.writeFileSync('src/views/GrammarView.tsx', content, 'utf-8');
console.log("Replaced examples");
