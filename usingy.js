const express = require('express');

const { Builder, By,until } = require('selenium-webdriver');
const fs = require('fs');
const app = express();
const port = 4000;
const chrome = require('selenium-webdriver/chrome');
require('dotenv').config();

// Load the config file

async function example() {
  // const config = JSON.parse(fs.readFileSync('data.json', 'utf8'));

  // let driver = await new Builder().forBrowser('chrome').build();
  const config = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  let chromeOptions = new chrome.Options();
    // chromeOptions.setBrowserVersion("116")

  chromeOptions.addArguments('--disable-popup-blocking'); // To avoid any popup issues
  // chromeOptions.add_experimental_option("prefs", {"profile.managed_default_content_settings.images": 2}) 
chromeOptions.addArguments("--no-sandbox") 
chromeOptions.addArguments("--disable-setuid-sandbox") 
chromeOptions.addArguments("--remote-debugging-port=9222") 
chromeOptions.addArguments('--verbose');
// chromeOptions.addArguments('--headless'); // Run Chrome in headless mode
chromeOptions.addArguments('--disable-gpu'); // Disable GPU acceleration
chromeOptions.addArguments('--disable-dev-shm-usage'); // Overcome limited resource problems
chromeOptions.addArguments('--disable-software-rasterizer'); // Avoid issues with GPU rendering
chromeOptions.addArguments("--disable-extensions") 
chromeOptions.addArguments("start-maximized") 
chromeOptions.addArguments("disable-infobars")
// chromeOptions.addArguments(r"user-data-dir=.\cookies\\test") 


  // let driver = await new Builder()
  //     .forBrowser('chrome')
  //     .setChromeOptions(new chrome.Options().addArguments('--disable-popup-blocking'))
  //     .build();
      let driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
  try {
    await driver.get('about:blank');
    // Open a new tab with the Razorpay dashboard URL
    await driver.executeScript('window.open("https://dashboard.razorpay.com/?screen=sign_in");');
    // Wait for a short moment to ensure the new tab opens
    await driver.sleep(2000);
    // Switch to the new tab
    let handles = await driver.getAllWindowHandles();
    await driver.switchTo().window(handles[1]);

    // await driver.get('https://dashboard.razorpay.com/?screen=sign_in');
    // await driver.get('about:blank');

    // // Open a new tab with the Razorpay dashboard
    // await driver.executeScript('window.open(arguments[0])', 'https://dashboard.razorpay.com/?screen=sign_in');

    // // Switch to the new tab
    // const windows = await driver.getAllWindowHandles();
    // await driver.switchTo().window(windows[1]);

    //login and password start
    // Use XPath to find the email input element
    let emailinput = await driver.wait(until.elementLocated(By.xpath('//*[@id="Email or Mobile Number"]')),30000000);
    await emailinput.sendKeys(process.env.email);
        await driver.sleep(2000);

  console.log("email input",emailinput);
    // Use XPath to find and click the submit button
    let emailsubmit = await driver.wait(until.elementLocated(By.xpath('//*[@id="react-root"]/div/div/div[3]/div[2]/div[1]/div[1]/form/div/div/div[3]/button')),30000000);
    await emailsubmit.click();
        await driver.sleep(2000);

  console.log("email submit",emailsubmit);
    // Use XPath to find the password input element
    let passwordinput = await driver.wait(until.elementLocated(By.xpath('//*[@id="Password"]')),30000000);
      await passwordinput.sendKeys(process.env.password);
        await driver.sleep(2000);

    console.log("password input",passwordinput)
      let submitbuttom = await driver.wait(until.elementLocated(By.xpath('//*[@id="react-root"]/div/div/div[3]/div[2]/div[1]/div[1]/form/div/div/div[4]/button')),30000000);
      await submitbuttom.click();
    //login and password end
    console.log("submit button",submitbuttom)
        await driver.sleep(2000);

    // await driver.setTimeout(() => {
      
    // }, 2000);
    let offerlink = await driver.wait(until.elementLocated(By.xpath('//*[@id="react-root"]/div/div[2]/div[1]/div[2]/nav/div/div[6]/a[1]')), 30000000);
console.log("offer link",offerlink)
    //going to offer page
    // let offerlink = await driver.wait(until.elementLocated(By.xpath('//*[@id="react-root"]/div/div[2]/div[1]/div[2]/nav/div/div[6]/a[1]')),30000000);
    await offerlink.click();
    // await driver.setTimeout(() => {
      
    // }, 2000);
    await driver.sleep(2000);

    //creating new offer
    let createnewofferbutton = await driver.wait(until.elementLocated(By.xpath('/html/body/div[7]/div/button[1]')),30000000);
    await createnewofferbutton.click();
        await driver.sleep(2000);

    console.log("offer create",createnewofferbutton);
    let discountcard = await driver.wait(until.elementLocated(By.xpath('//*[@id="react-root"]/div/div[2]/div[1]/main/div[2]/div/div[1]/div/div/div/div/div[2]/div[1]/div')),30000000);
    await discountcard.click();
        await driver.sleep(3000);

console.log("discountcard",discountcard);
    let offername = await driver.wait(until.elementLocated(By.xpath('//*[@id="textinput-1-input-2"]')),30000000);
    await offername.sendKeys(config.offerdetails.offername);
        await driver.sleep(2000);

    console.log("offername");
    let offerdisplay = await driver.wait(until.elementLocated(By.xpath('//*[@id="textinput-7-input-8"]')),30000000);
    await offerdisplay.sendKeys(config.offerdetails.offerdisplay);  
    await driver.sleep(2000);

    console.log("offerdisplay");
    let offerterms = await driver.wait(until.elementLocated(By.xpath('//*[@id="textarea-13-input-14"]')),30000000);
    await offerterms.sendKeys(JSON.stringify(config.offerdetails.offerterms));
    console.log("offerterms")
        await driver.sleep(2000);

    let offertype = await driver.wait(until.elementLocated(By.xpath('//*[@id="dropdown-25-trigger-19-input-20"]')),30000000);
    await offertype.click();
    console.log("offertype");
        await driver.sleep(2000);

    let offertypeoptions = await driver.wait(until.elementLocated(By.xpath('//*[@id="dropdown-25-actionlist"]/div')),30000000);
    let offertypeoption;
    {
      config.offerdetails.offertype === 'instant' ? offertypeoption = await driver.wait(until.elementLocated(By.xpath('//*[@id="dropdown-25-1"]')),30000000)
      : offertypeoption=await driver.wait(until.elementLocated(By.xpath('//*[@id="dropdown-25-2"]')),30000000)
    }
    await offertypeoption.click();
        await driver.sleep(3000);

    let nextbutton1 = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[2]/div[2]/div/button')),30000000);
    await nextbutton1.click();
console.log("nextbutton1");
        await driver.sleep(1000);

    //next page start for discount type
    
    let discounttype = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button')),30000000);
    await discounttype.click(); 
    await driver.sleep(3000);

    // let discountoptions = await driver.wait(until.elementLocated(By.xpath('//*[@id="dropdown-2213-actionlist"]/div')),30000000);
    let discountbutton=await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div/div/div[2]/div/div/div/button[2]')),30000000);
    
    discountbutton.click();
    await driver.sleep(2000);

    let minimumorder = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div[2]/div[1]/div[2]/div/input')),30000000);
    await minimumorder.sendKeys(config.discount.mov);
        await driver.sleep(2000);

    let discountworth = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div[4]/div[1]/div[2]/div/input')),30000000);
    await discountworth.sendKeys(config.discount.discountworth);
        await driver.sleep(3000);

    let nextbutton2 = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[2]/div[2]/div/button[2]')),30000000);
    await nextbutton2.click();
    await driver.sleep(2000);

    //payment page
    let paymentmethod = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button')),30000000);
    await paymentmethod.click();
        await driver.sleep(2000);

    let cardoption = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div/div[2]/div/div/div/button[2]')),30000000);
    await cardoption.click();
        await driver.sleep(2000);

    let cardtype = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div[2]/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button')),30000000);
    await cardtype.click();
        await driver.sleep(2000);

    let cardtypeselect = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div[2]/div/div[2]/div/div/div/button[2]')),30000000);
    await cardtypeselect.click();
        await driver.sleep(2000);

    let bankname = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div[3]/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button')),30000000);
    await bankname.click();
        await driver.sleep(2000);

    let icicibank = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div[3]/div/div[2]/div/div/div/button[4]')),30000000);
    await icicibank.click();
        await driver.sleep(3000);

    let cardnetwork = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div[4]/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button')),30000000);
    await cardnetwork.click();
        await driver.sleep(2000);

    let visacard = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div[4]/div/div[2]/div/div/div/button[2]')),30000000);
    await visacard.click();
        await driver.sleep(2000);

    let maxusage = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div[5]/div[1]/div[2]/div/input')),30000000);
    await maxusage.sendKeys(3);
        await driver.sleep(2000);

    let iin = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div[6]/div[1]/div[2]/div/input')),30000000);
    await iin.sendKeys(235635);
    await driver.sleep(4000);

    let nextbutton3 = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[2]/div[2]/div/button[2]')),30000000);
    await nextbutton3.click();
        await driver.sleep(2000);

    let checkbox = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div[1]/div[2]/div/label/div[2]')),30000000);
    await checkbox.click();
        await driver.sleep(2000);

    let inputdate = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div[2]/div/div[1]/div/div/input')),30000000);
    // inputdate.sendKeys("15/08/2024")
    await driver.sleep(2000);

    inputdate.click();
    let selectdate = await driver.wait(until.elementLocated(By.xpath('/html/body/div[10]/div/div/div/div/div[2]/div[2]/table/tbody/tr[3]/td[2]/div')), 30000000);
    // inputdate.sendKeys('2024-08-12');
    let startdate = await driver.wait(until.elementLocated(By.css(`[title="August 28, 2024"]`)), 30000000);
    startdate.click();
        await driver.sleep(2000);

    let enddate = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div[3]/div[2]/div[1]/div/div/input')), 30000000);
    enddate.click();
        await driver.sleep(2000);

    // enddate.sendKeys("20/08/2024");
    let selectenddate = await driver.wait(until.elementLocated(By.css(`[title="August 30, 2024"]`)), 30000000);
    selectenddate.click();
    let payfail = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div[4]/div/div[1]/div[2]/div[1]/div[2]/div/div[1]/div/button')),30000000);
    await payfail.click();
        await driver.sleep(2000);

    let payfailoption = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div[4]/div/div[2]/div/div/div/button[3]')),30000000);
    await payfailoption.click();
        await driver.sleep(2000);

    let checkboxpay = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div[6]/div/div/div[1]/div/div/label/div/div/div[1]')),30000000);
    await checkboxpay.click();
        await driver.sleep(2000);

    let nextbutton4 = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[2]/div[2]/div/button[2]')),30000000);
    await nextbutton4.click();
        await driver.sleep(2000);

    let finalbox = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[1]/div/main/form/div/div/div/div/div/div/div/div/label/div/div/div[1]')),30000000);
    await finalbox.click();
    await driver.sleep(2000);

    let createoffer = await driver.wait(until.elementLocated(By.xpath('/html/body/div[9]/div/div[2]/div[2]/div[2]/div/button[2]')),30000000);
    await createoffer.click();
        await driver.sleep(2000);

    let ofid=await driver.wait(until.elementsLocated(By.xpath('/html/body/div[1]/div/div[2]/div[1]/main/tabbed-container/content/div/div[2]/div[1]/table/tbody/tr[1]/td[1]/div/div/div/div/a/code')),30000000)
      // await driver.setTimeout(() => {
      let text = await ofid[0].getText();
      console.log("the offer id is ",text);
    
  } finally {
    
    console.log("automation complete");
    await driver.quit();

  }
};

app.get('/start-automation', async (req, res) => {
  console.log('automations start');
  await example();
  res.send('Automation started!');
});
app.get('/', async (req, res) => {
  res.send('running the server')
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});