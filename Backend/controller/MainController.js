import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import { startScreenRecording, joinMeetBot } from '../services/meetingbot.js';
import { uploadRecordingToCloudinary,getVideoDuration } from '../utils/cloudinary.js';
import { Recording } from '../models/recording.model.js';
import { User } from '../models/user.model.js';

const RecapAI = async (meetUrl, userId) => {
  const options = new chrome.Options();

  options.setUserPreferences({
    'profile.default_content_setting_values.media_stream_mic': 2,
    'profile.default_content_setting_values.media_stream_camera': 2,
    'profile.default_content_setting_values.notifications': 2
  });

  options.addArguments(
    '--disable-notifications',
    '--disable-infobars',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-blink-features=AutomationControlled',
    '--disable-gpu',
    '--start-maximized'
  );

  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  const joinStatus = await joinMeetBot(driver, meetUrl);

  if (joinStatus.status === 'success') {
    const { ffmpegProcess, filePath } = startScreenRecording();
    console.log('🎥 Screen recording started.');
    console.log('📂 Recording saved at:', filePath);

    const stopAndSaveRecording = async () => {
      try {
        ffmpegProcess.kill('SIGINT');
        await driver.quit();

        const videoUrl = await uploadRecordingToCloudinary(filePath, userId);
        const duration = await getVideoDuration(filePath);

        const savedRecording = await Recording.create({
          title: 'Meeting Recording',
          meetUrl,
          videoUrl,
          duration,
          user: userId,
        });

        await User.findByIdAndUpdate(userId, {
          $push: { recordings: savedRecording._id }
        }, { new: true });

        console.log('✅ Recording saved & user updated.');
      } catch (err) {
        console.error('❌ Failed to process recording:', err);
      }
    };

    const interval = setInterval(async () => {
      try {
        const url = await driver.getCurrentUrl();
        if (!url.includes('meet.google.com') || url.includes('landing')) {
          console.log('🚪 Bot exited meeting.');
          clearInterval(interval);
          await stopAndSaveRecording();
        }
      } catch (err) {
        console.log('⚠️ Browser probably closed unexpectedly.');
        clearInterval(interval);
        await stopAndSaveRecording();
      }
    }, 15000);

    console.log("🎬 Recording monitoring started.");
  } else {
    await driver.quit();
    console.log("❌ Could not join meeting.");
  }
};

export default RecapAI;
