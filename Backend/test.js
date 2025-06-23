const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async () => {
  try {
    const options = new chrome.Options();

    // Set correct Chrome binary path
    options.setChromeBinaryPath("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe");

    // Uncomment this line ONLY if you want to run in headless mode
    // options.addArguments('--headless=new');

    // Add this to bypass automation detection
    options.addArguments('--disable-blink-features=AutomationControlled');

    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await driver.get("https://www.google.com");
    await driver.sleep(5000);
    await driver.quit();

    console.log("✅ Chrome launched and closed successfully.");
  } catch (err) {
    console.error("❌ Chrome failed to launch:", err);
  }
})();
