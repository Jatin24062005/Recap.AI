const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// joinMeetBot.js
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('dotenv').config();


const joinMeetBot = async (driver ,meetUrl) => {
  const email = process.env.GOOGLE_EMAIL;
  const password = process.env.GOOGLE_PASSWORD;


  try {
    await driver.get('https://accounts.google.com/signin');

    await driver.findElement(By.id('identifierId')).sendKeys(email);
    await driver.findElement(By.id('identifierNext')).click();
    try {
      await driver.wait(until.elementLocated(By.name('password')), 20000);
    } catch (error) {

      console.log("here is the error", error);

    }

    await driver.findElement(By.name('Passwd')).sendKeys(password);
    await driver.findElement(By.id('passwordNext')).click();

    await driver.sleep(5000);

    await driver.get(meetUrl);
  
    await driver.sleep(3000);

    try {
      // Wait for the pre-join popup to appear
      const noMediaBtn = await driver.wait(
        until.elementLocated(By.xpath("//span[contains(text(),'Continue without microphone and camera')]/parent::button")),
        8000
      );
      await driver.executeScript("arguments[0].click();", noMediaBtn);
      console.log("🔇 Selected 'Continue without microphone and camera'");
    } catch (err) {
      console.log("ℹ️ 'Continue without mic/cam' option not shown or already skipped.");
    }
    await driver.wait(until.elementLocated(By.tagName('body')), 10000);
    await driver.sleep(8000);

    try {
      const joinBtn = await driver.wait(until.elementLocated(By.xpath("//span[contains(text(),'Join now')]/ancestor::button")), 10000);
      await joinBtn.click();
      console.log("✅ Joined the meeting.");
    } catch {
      const askBtn = await driver.findElement(By.xpath("//span[contains(text(),'Ask to join')]/ancestor::button"));
      await askBtn.click();
      console.log("🕓 Asked to join. Waiting for host approval...");
    }

    return { "status": "success", "message": "Bot launched and joined the meeting." };

  } catch (err) {
    console.error("🚨 Error in joinMeetBot:", err);
  } finally {
    // Do not quit if you want to keep the bot in meeting
    // await driver.quit();
  }
};


const RECORDINGS_DIR = path.join(__dirname, '../recordings');
if (!fs.existsSync(RECORDINGS_DIR)) fs.mkdirSync(RECORDINGS_DIR);

function startScreenRecording(filename = `recording-${Date.now()}.mkv`) {
  const filePath = path.join(RECORDINGS_DIR, filename);

 const ffmpegProcess = spawn('ffmpeg', [
  '-y',
  '-f', 'gdigrab',
  '-framerate', '30',
  '-i', 'desktop', // This should capture the full screen
  '-vcodec', 'libx264',               // ✅ Standard codec
  '-preset', 'veryfast',
  '-pix_fmt', 'yuv420p',              // ✅ Required for compatibility
  '-r', '30',
  '-crf', '23',
  '-t', '00:10:00',                   // Optional duration cap
  filePath,
]);
 // fallback: max 1 hour
   

  ffmpegProcess.stderr.on('data', (data) => {
    console.log(`🎥 ffmpeg: ${data}`);
  });

  return { ffmpegProcess, filePath };
}

module.exports = { startScreenRecording, joinMeetBot };


