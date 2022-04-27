const { Builder, By, Key, until } = require("selenium-webdriver");
const SauceLabs = require("saucelabs").default;
const assert = require("assert");
const utils = require("./utils");

const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;
const region = process.env.REGION;
// const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.saucelabs.com:443/wd/hub`;
// NOTE: Use the URL below if using our EU datacenter (e.g. logged in to app.eu-central-1.saucelabs.com)
const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;

/**
 * Task I: Update the test code so when it runs, the test clicks the "I am a link" link.
 *
 * Task II - Comment out the code from Task I. Update the test code so when it runs,
 * the test is able to write "Sauce" in the text box that currently says "I has no focus".
 *
 * Task III - Update the test code so when it runs,
 * 1. it adds an email to the email field,
 * 2. adds text to the comments field,
 * 3. and clicks the "Send" button.
 * Note that email will not actually be sent!
 *
 * Task IV - Add a capability that adds a tag to each test that is run.
 * See this page for instructions: https://wiki.saucelabs.com/display/DOCS/Test+Configuration+Options
 *
 * Bonus: Set the status of the test so it shows as "passed" instead of "complete".
 * Use annotations https://docs.saucelabs.com/basics/test-config-annotation/test-annotation/#selenium-javascript-executor
 * Or use the already imported node-saucelabs package. For more info see:
 * https://github.com/saucelabs/node-saucelabs
 */

describe("Working Sauce", function () {
  it("should go to Google and click Sauce", async function () {
    // let driver = await new Builder().forBrowser("chrome").build();
    let driver = await new Builder()
      .usingServer(ONDEMAND_URL)
      .withCapabilities(utils.workingCapabilities)
      .build();

    /**
     * Goes to Sauce Lab's guinea-pig page and verifies the title
     */

    await driver.get("https://saucelabs.com/test/guinea-pig");

    assert.strictEqual(
      "I am a page title - Sauce Labs",
      await driver.getTitle()
    );

    // Task I
    // await driver.findElement(By.id("i am a link")).click();
    // await driver.executeScript("sauce:context=Task I");
    // Task II
    await driver.findElement(By.id("i_am_a_textbox")).clear();
    await driver.findElement(By.id("i_am_a_textbox")).sendKeys("Sauce");
    await driver.executeScript("sauce:context=Task II");
    // Task III
    await driver.findElement(By.id("fbemail")).sendKeys("admin@example.com");
    await driver.findElement(By.id("comments")).sendKeys("I am a comment");
    await driver.findElement(By.id("submit")).click();
    await driver.executeScript("sauce:context=Task III");
    // Task IV  - Add a tag to each test that is run.
    await driver.executeScript("sauce:context=Task IV");

    // Bonus
    await driver.executeScript("sauce:job-result=passed");
    await driver.executeScript("sauce:context=Bonus");

    await driver.quit();
  });
});
