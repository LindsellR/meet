import puppeteer from 'puppeteer'

describe('Filter evensts by City', () => {
  let browser
  let page
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      timeout: 0,
    })
    page = await browser.newPage()
    await page.goto('http://localhost:5173/')
    await page.waitForSelector('.event')
  })
  afterAll(async () => {
    await browser.close()
  })

  test('When user hasn’t searched for a city, show upcoming events from all cities.', async () => {
    await page.waitForSelector('#event-list li') // or use a more specific selector
    const events = await page.$$('#event-list li')
    expect(events.length).toBeGreaterThan(0)
  })

  test('User should see a list of suggestions when they search for a city.', async () => {
    await page.click('.city')
    await page.type('.city', 'Berlin')
    await page.waitForSelector('.suggestions li')

    const suggestions = await page.$$eval('.suggestions li', (items) =>
      items.map((item) => item.textContent)
    )

    expect(suggestions.length).toBeGreaterThan(0)
    expect(suggestions.some((text) => text.includes('Berlin'))).toBe(true)
  })

  test('User can select a city from the suggested list.', async () => {
    await page.click('.city')
    await page.type('.city', 'Berlin')

    await page.waitForSelector('.suggestions li')
    await page.click('.suggestions li') // Click first matching suggestion

    await page.waitForTimeout(1000) // Wait for event list to update

    const eventTexts = await page.$$eval('#event-list li', (items) =>
      items.map((item) => item.textContent)
    )

    expect(eventTexts.length).toBeGreaterThan(0)
    expect(eventTexts.every((text) => text.includes('Berlin'))).toBe(false)
  })
})

describe('show/hide event details', () => {
  let browser
  let page
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      timeout: 0,
    })
    page = await browser.newPage()
    await page.goto('http://localhost:5173/')
    await page.waitForSelector('.event')
  })

  afterAll(() => {
    browser.close()
  })

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details')
    expect(eventDetails).toBeNull()
  })

  test('User can expand an event to see details', async () => {
    await page.click('.event .details-btn')
    const eventDetails = await page.$('.event .details')
    expect(eventDetails).toBeDefined()
  })
  test('User can collapse an event to hide details', async () => {
    await page.click('.event .details-btn')
    const eventDetails = await page.$('.event .details')
    expect(eventDetails).toBeNull()
  })
})