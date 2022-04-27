const { Builder, By, Key, until } = require("selenium-webdriver");
const utils = require("./utils");
const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;
// const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.us-west-1.saucelabs.com:443/wd/hub`;
// NOTE: Use the URL below if using our EU datacenter (e.g. logged in to app.eu-central-1.saucelabs.com)
const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;

/**
 * Run this test before working on the problem.
 * When you view the results on your dashboard, you'll see that the test "Failed".
 * Your job is to figure out why the test failed and make the changes necessary to make the test pass.
 *
 *             Bonus
 * Once you get the test working, update the code so that when the test runs, it
 * can reach the Sauce Labs Documentation from the Resources tab on the https://saucelabs.com page.
 * Hover over the 'Resources' element and then click the 'Documentation' link,
 * but the goal is to reach the docs page.
 * See the W3C Actions API https://appium.io/docs/en/commands/interactions/actions/
 */

describe("Broken Sauce", function () {
  it("should go to Google and click Sauce", async function () {
    let driver = await new Builder()
      .usingServer(ONDEMAND_URL)
      .withCapabilities(utils.brokenCapabilities)
      .build();

    // await driver.get("https://www.google.com");
    // If you see a German or English GDPR modal on google.com you
    // will have to code around that or use the us-west-1 datacenter.
    // You can investigate the modal elements using a Live Test(https://app.saucelabs.com/live/web-testing)

    // let button = await driver.findElement(By.id("L2AGLb"));
    // await button.click();

    // let search = await driver.findElement(By.name("q"));
    // await search.sendKeys("Sauce Labs", Key.RETURN);

    // let page = await driver.findElement(By.partialLinkText("docs"));

    // Bonus, see description above.
    await driver.get("https://saucelabs.com");
    await driver
      .findElement(By.linkText("Resources"))
      .click()
      .then(async () => {
        await driver.findElement(By.linkText("Documentation")).click();
      });
    await driver.findElement(By.id("onetrust-accept-btn-handler")).click();

    //while trying to use xpath in a lot of ways it did not work
    //i will need explanation from your end
    //thanks in advance
    // await driver
    //   .findElement(By.xpath(`//*[@id="__docusaurus"]/nav/div[1]/div[1]/a[2]`))
    //   .click();
  });
});
