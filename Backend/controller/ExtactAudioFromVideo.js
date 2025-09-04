// /utils/extractAudio.js

import { spawn } from 'child_process';
import path from 'path';

export function extractAudioFromVideo(videoPath, outputFileName) {
  return new Promise((resolve, reject) => {
    const audioPath = path.join(
      path.dirname(videoPath),
      outputFileName || `audio-${Date.now()}.mp3`
    );

    const ffmpeg = spawn('ffmpeg', [
      '-i', videoPath,
      '-vn',               // no video
      '-acodec', 'libmp3lame',
      '-q:a', '2',         // good quality
      audioPath
    ]);

    ffmpeg.stderr.on('data', (data) => {
      console.log(`🎧 ffmpeg: ${data}`);
    });

    ffmpeg.on('exit', (code) => {
      if (code === 0) {
        console.log(`✅ Audio saved at: ${audioPath}`);
        resolve(audioPath);
      } else {
        reject(new Error(`❌ Audio extraction failed with code ${code}`));
      }
    });
  });
}
