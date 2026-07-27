import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Helper to prepend a WAV header to raw 16-bit PCM (sample rate 24000) so browsers can play it natively
  function pcmToWav(pcmBuffer: Buffer, sampleRate: number = 24000): Buffer {
    if (pcmBuffer.length > 4 && pcmBuffer.toString("ascii", 0, 4) === "RIFF") {
      return pcmBuffer; // Already a WAV file
    }

    const numChannels = 1;
    const bitsPerSample = 16;
    const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
    const blockAlign = numChannels * (bitsPerSample / 8);
    const dataSize = pcmBuffer.length;
    const chunkSize = 36 + dataSize;

    const header = Buffer.alloc(44);

    header.write("RIFF", 0);
    header.writeUInt32LE(chunkSize, 4);
    header.write("WAVE", 8);
    header.write("fmt ", 12);
    header.writeUInt32LE(16, 16);
    header.writeUInt16LE(1, 20); // Linear PCM
    header.writeUInt16LE(numChannels, 22);
    header.writeUInt32LE(sampleRate, 24);
    header.writeUInt32LE(byteRate, 28);
    header.writeUInt16LE(blockAlign, 32);
    header.writeUInt16LE(bitsPerSample, 34);
    header.write("data", 36);
    header.writeUInt32LE(dataSize, 40);

    return Buffer.concat([header, pcmBuffer]);
  }

  // API routes FIRST
  app.post("/api/pronounce", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      // Tier 1: Try premium Gemini TTS
      if (process.env.GEMINI_API_KEY) {
        try {
          console.log(`Generating premium Gemini TTS for: "${text}"`);
          const geminiResponse = await ai.models.generateContent({
            model: "gemini-3.1-flash-tts-preview",
            contents: [{ parts: [{ text: `Read this Japanese text with natural, clear native pronunciation: ${text}` }] }],
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                voiceConfig: {
                  // Prebuilt voice options: 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
                  prebuiltVoiceConfig: { voiceName: "Kore" },
                },
              },
            },
          });

          const rawAudioBase64 = geminiResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
          if (rawAudioBase64) {
            const rawBuffer = Buffer.from(rawAudioBase64, "base64");
            const wavBuffer = pcmToWav(rawBuffer, 24000);
            const base64Audio = wavBuffer.toString("base64");

            console.log("Successfully generated and formatted premium Gemini TTS audio");
            return res.json({
              audio: base64Audio,
              mimeType: "audio/wav",
            });
          }
        } catch (geminiError) {
          console.warn("Gemini TTS failed, attempting Google Translate fallback:", geminiError);
        }
      }

      // Tier 2: Fallback to Google Translate TTS API via backend proxy
      console.log(`Using Google Translate fallback for: "${text}"`);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encodeURIComponent(text)}`;
      
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
          "Referer": "https://translate.google.com/"
        }
      });

      if (!response.ok) {
        throw new Error(`Google Translate TTS returned status ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Audio = buffer.toString("base64");

      res.json({ 
        audio: base64Audio,
        mimeType: "audio/mpeg"
      });
    } catch (error) {
      console.error("Audio generation Server Error:", error);
      res.status(500).json({ error: "Failed to generate server audio" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
