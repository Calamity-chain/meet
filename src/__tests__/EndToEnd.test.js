import puppeteer from 'puppeteer';

describe('filter a list of events', () => {
  let browser, page;
  beforeAll(async () => {
      jest.setTimeout(30000);
      browser = await puppeteer.launch({
          // headless: false,
          // slowMo: 500,
          // ignoreDefaultArgs: ['--disable-extensions']
      });
      page = await browser.newPage();
      await page.goto('http://localhost:3000/', {
          // waitUntil: 'load',
          // timeout: 0
      });
  });
  afterAll(async () => {
      browser.close();
  });
  test('When a user hasn\'t searched for a city, show upcoming events from all cities.', async () => {
      const searchInput = await page.$('.CitySearch');
      const events = await page.$('.EventList');
      expect(await searchInput.$$eval('.city', el => el.innerText)).toEqual(undefined);
      expect(await events.$$eval('.event-container', el => el.length)).toBe(2);
  });
  test('User should see a list of suggestions when they search for a city.', async () => {
      const query = 'Berlin'
      await page.type('.city', query);
      const suggestions = await page.$('.suggestions');
      expect( await suggestions.$$eval('.suggestions li', el => el.length)).toBe(2);
  });
  test('User can select a city from the suggested list.', async () => {
      const suggestion = 'Berlin, Germany';
      const input = await page.$('.city');
      input.click();
      await page.click('.suggestions li');
      expect(await page.$eval('.city', el => el.value)).toBe(suggestion);
      const events = await page.$('.EventList');
      expect(await events.$$eval('.event-container', el => el.length)).toBe(1);
  })

})


describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch(
    //   {
    //   headless: false,
    //   slowMo: 250,
    //   ignoreDefaultArgs: ['--disable-extensions']
    // }
    );
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event-container');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event-container .event-details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event-container .show-details-btn');

    const eventDetails = await page.$('.event-container .event-details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event-container .show-details-btn');
    const eventDetails = await page.$('.event-container .event-details');
    expect(eventDetails).toBeNull();

  })


});


describe('specify a number of events', () => {
  let browser, page;
  beforeAll(async () => {
      jest.setTimeout(30000);
      browser = await puppeteer.launch();
      page = await browser.newPage();
      await page.goto('http://localhost:3000/');
      await page.waitForSelector('.event-number-input');
      await page.waitForSelector('.EventList');
  });
  afterAll(async () => {
      browser.close();
  });
  test('When the user hasn\'t specified a number of events, 32 will be the default number', async () => {
      expect(await page.$$eval('.event-container', el => el.length)).toBeLessThanOrEqual(32);
  });
  test('A user can change the number of events they want to see', async () => {
      await page.$eval('.event-number', el => el.value = 1);
      expect(await page.$eval('.event-number', el => el.value)).toEqual(1);
  })
})
