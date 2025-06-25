const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { startScreenRecording, joinMeetBot } = require('../services/meetingbot');

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
      console.log('🔴 Recording process ID:', ffmpegProcess);

    const interval = setInterval(async () => {
      try {
        const url = await driver.getCurrentUrl();
        if (!url.includes('meet.google.com') || url.includes('landing')) {
          console.log('🚪 Bot exited meeting.');
          ffmpegProcess.kill('SIGINT');
          await driver.quit();
          clearInterval(interval);
        }
      } catch (err) {
        console.log('⚠️ Browser probably closed unexpectedly.');
        ffmpegProcess.kill('SIGINT');
        clearInterval(interval);
      }
    }, 15000);

    console.log("🎬 Recording started.");
  } else {
    await driver.quit();
    console.log("❌ Could not join meeting.");
  }
};

module.exports = RecapAI;
