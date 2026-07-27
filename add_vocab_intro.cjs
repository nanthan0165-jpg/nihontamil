const fs = require('fs');

let content = fs.readFileSync('src/views/VocabularyView.tsx', 'utf-8');

const intro = `
      <div className={cn(
        "p-6 rounded-xl border mb-8",
        theme === 'dark' ? "bg-[#272727] border-gray-700" : "bg-gray-50 border-gray-200"
      )}>
        <h2 className="text-xl font-bold mb-4">ஜப்பானிய சொற்களஞ்சியம்</h2>
        <p className="mb-4 text-sm md:text-base leading-relaxed">
          ஜப்பானிய சொற்களஞ்சியம் JLPT (ஜப்பானிய மொழித் திறன் தேர்வு) அடிப்படையில் முறையாக வகைப்படுத்தப்பட்டுள்ளது. மொத்தமாக சுமார் 1,000 இலக்கண விதிகளை மட்டுமே கற்க வேண்டியிருந்தாலும், சொற்களஞ்சியத்தின் எண்ணிக்கை மிக வேகமாக வளர்கிறது.
        </p>
        <p className="mb-6 text-sm md:text-base leading-relaxed">
          அடிப்படை உரையாடல் திறனை (N3) அடைய, உங்களுக்கு சுமார் 3,000 முதல் 4,000 சொற்கள் தெரிந்திருக்க வேண்டும். ஜப்பானிய செய்தித்தாள் படிக்க அல்லது முழுமையான ஜப்பானிய வணிகச் சூழலில் பணிபுரிய (N1), உங்களுக்கு சுமார் 10,000 சொற்கள் தேவைப்படும்.
        </p>
        
        <h3 className="font-bold mb-3">JLPT சொற்களஞ்சியப் பகுப்பாய்வு</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className={theme === 'dark' ? "bg-[#1f1f1f]" : "bg-gray-200"}>
                <th className="p-3 border-b border-gray-300 dark:border-gray-600">JLPT நிலை</th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-600">கடினம்</th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-600">மொத்த எண்ணிக்கை</th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-600">புதிய சொற்கள்</th>
                <th className="p-3 border-b border-gray-300 dark:border-gray-600">உங்களால் என்ன செய்ய முடியும்?</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-bold">N5</td>
                <td className="p-3">ஆரம்பம்</td>
                <td className="p-3">~800</td>
                <td className="p-3">800</td>
                <td className="p-3">அடிப்படைத் தேவைகள்: வாழ்த்துகள், எண்கள், நாட்கள், உணவு, எளிய வினைச்சொற்கள்.</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-bold">N4</td>
                <td className="p-3">தொடக்க நிலை</td>
                <td className="p-3">~1,500</td>
                <td className="p-3">+ 700</td>
                <td className="p-3">அன்றாட வாழ்க்கை: ஷாப்பிங், வழிகேட்பது, உணர்வுகளை வெளிப்படுத்துவது.</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-bold">N3</td>
                <td className="p-3">இடைநிலை</td>
                <td className="p-3">~3,700</td>
                <td className="p-3">+ 2,200</td>
                <td className="p-3">தினசரி சரளம்: எளிய செய்திகளைப் புரிந்துகொள்வது, சாதாரண உரையாடல்கள்.</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-3 font-bold">N2</td>
                <td className="p-3">மேம்பட்ட ஆரம்பம்</td>
                <td className="p-3">~6,000</td>
                <td className="p-3">+ 2,300</td>
                <td className="p-3">தொழில்முறை: பொது வணிகம், பத்திரிகைகள் வாசிப்பது, சிக்கலான தலைப்புகள்.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">N1</td>
                <td className="p-3">மேம்பட்ட நிலை</td>
                <td className="p-3">~10,000+</td>
                <td className="p-3">+ 4,000+</td>
                <td className="p-3">முழுமையான சரளம்: செய்தித்தாள்கள் வாசிப்பது, மேம்பட்ட வணிக உரையாடல்கள்.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
`;

content = content.replace(
  '        <div className="flex gap-2">\n          <button \n            onClick={() => setViewMode(\'grid\')}',
  `      </div>\n\n${intro}\n\n      <div className="flex justify-end mb-6">\n        <div className="flex gap-2">\n          <button \n            onClick={() => setViewMode('grid')}`
);

// We need to also remove the original header flex container's right part since we moved the view mode buttons down
content = content.replace(
  '      <div className="flex justify-between items-center mb-6 mt-4">\n        <h1 className="text-2xl font-bold">சொற்களஞ்சியம்</h1>\n      </div>',
  '      <div className="flex justify-between items-center mb-6 mt-4">\n        <h1 className="text-2xl font-bold">சொற்களஞ்சியம்</h1>\n      </div>'
);

// Actually, wait, replacing like this might be messy. Let's do it safely.
