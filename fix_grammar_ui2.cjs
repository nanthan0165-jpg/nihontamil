const fs = require('fs');

let content = fs.readFileSync('src/views/GrammarView.tsx', 'utf-8');

const banner = `{/[a-zA-Z]/.test(selected.tamilExplanation || '') && (
              <div className={cn("text-sm p-3 rounded-lg mb-4", theme === 'dark' ? 'bg-yellow-900/30 text-yellow-200' : 'bg-yellow-50 text-yellow-700')}>
                இந்த இலக்கணத்திற்கான தமிழ் விளக்கம் விரைவில் சேர்க்கப்படும். ஆங்கில விளக்கம் கீழே கொடுக்கப்பட்டுள்ளது.
              </div>
            )}`;

content = content.replace(
  '<p className="text-lg leading-relaxed">{selected.tamilExplanation}</p>',
  `${banner}\n            <p className="text-lg leading-relaxed whitespace-pre-wrap">{selected.tamilExplanation}</p>`
);

// We should also replace the translation for examples if it has English text
const bannerExamples = `{/[a-zA-Z]/.test(ex.tamilTranslation || '') && (
                      <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">(தமிழில் மொழிபெயர்ப்பு விரைவில்)</div>
                    )}`;
// Look for ex.tamilTranslation
// In GrammarView, it usually looks like:
// <div className="text-md">{ex.tamilTranslation}</div>
// Let's find it.
