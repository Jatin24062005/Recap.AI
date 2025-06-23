// joinMeetBot.js
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('dotenv').config();

const joinMeetBot = async (meetUrl) => {
  const email = process.env.GOOGLE_EMAIL;
  const password = process.env.GOOGLE_PASSWORD;

  let options = new chrome.Options();
  options.addArguments(
    '--use-fake-ui-for-media-stream',
    '--use-fake-device-for-media-stream',
    '--disable-notifications',
    '--disable-infobars',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-blink-features=AutomationControlled'
  );

  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    await driver.get('https://accounts.google.com/signin');

    await driver.findElement(By.id('identifierId')).sendKeys(email);
    await driver.findElement(By.id('identifierNext')).click();
try {
  await driver.wait(until.elementLocated(By.name('password')), 20000);
} catch (error) {

  console.log("here is the error",error);
  
}

    await driver.findElement(By.name('Passwd')).sendKeys(password);
    await driver.findElement(By.id('passwordNext')).click();

    await driver.sleep(5000);

    await driver.get(meetUrl);
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

  } catch (err) {
    console.error("🚨 Error in joinMeetBot:", err);
  } finally {
    // Do not quit if you want to keep the bot in meeting
    // await driver.quit();
  }
};

module.exports = joinMeetBot;
