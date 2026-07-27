const fs = require('fs');

let content = fs.readFileSync('src/views/GrammarView.tsx', 'utf-8');

const banner = `              {/[a-zA-Z]/.test(selected.tamilExplanation || '') && (
                <div className={cn("text-sm p-3 rounded-lg mb-4", theme === 'dark' ? 'bg-yellow-900/30 text-yellow-200' : 'bg-yellow-50 text-yellow-700')}>
                  இந்த இலக்கணத்திற்கான தமிழ் விளக்கம் விரைவில் சேர்க்கப்படும். ஆங்கில விளக்கம் கீழே கொடுக்கப்பட்டுள்ளது.
                </div>
              )}`;

content = content.replace(
  '<p className="text-lg md:text-xl leading-relaxed">\n              {selected.tamilExplanation}',
  `${banner}\n              <p className="text-lg md:text-xl leading-relaxed whitespace-pre-wrap">\n                {selected.tamilExplanation}`
);

// also let's check `Level {selected.level}` to `நிலை {selected.level}`
content = content.replace('Level {selected.level}', 'நிலை {selected.level}');
// "Common Mistakes" -> "பொதுவான தவறுகள்" (already done probably? Let's check)

fs.writeFileSync('src/views/GrammarView.tsx', content, 'utf-8');
console.log("Fixed Grammar UI");
