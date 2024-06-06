import * as cheerio from 'cheerio'
import playwright, { devices } from 'playwright'

const URL_AMAZON = 'https://www.amazon.es'

const URL_AMAZON_FRESH = 'https://www.amazon.es/alm/storefront/ref=grocery_amazonfresh?almBrandId=QW1hem9uIEZyZXNo'

const URL_AMAZON_DIA = 'https://www.amazon.es/alm/storefront/ref=grocery_dia?almBrandId=TGEgUGxhemEgZGUgRGlh'

// async function scrape(url) {
const scrape = async (url) => {
  const res = await fetch(url)
  const html = await res.text()
  return cheerio.load(html)
}

const cleanText = text => text
  .replace(/\t|\n|\s:/g, '')
  .replace(/.*:/g, ' ')

const get = async () => {
  const $ = await scrape(URL)
  console.log($.text())
  // console.log($('form').text())
  /*
  const $row = $('table tbody tr')
  $row.each((index, el) => {
    const equipo = $(el).find('.fs-table-text_3').text().trim()
    console.log(cleanText(equipo))
  })
  */
}

// await get()

const getAmazon = async () => {
  const browser = await playwright.chromium.launch({
    headless: false
  })
  const context = await browser.newContext(devices['iPhone 11'])
  await context.route('**.jpg', route => route.abort())
  const page = await browser.newPage()
  await page.goto(URL_AMAZON)
  await page.waitForTimeout(2000)
  await page.getByLabel('Aceptar cookies').click()
  await page.getByLabel('Todos los departamentos').selectOption('Amazon Fresh')
  // await page.getByLabel('Buscar').fill('cervezas ambar')
  // await page.screenshot({ path: 'example.png' })
  const market = await page.$eval('#searchDropdownBox', headerElm => {
    const listElms = headerElm.getElementsByTagName('option')
    console.log(listElms)
    let s = ''
    listElms.forEach(elm => {
      s += elm.innerText
    })
    return s
    /*
    const data = []
    listElms.forEach(elm => {
      data.push(elm.innerText.split('\n'))
    })
    return data
    */
  })
  console.log('Market--->>>>', market)
  await page.waitForTimeout(2000)
  await context.close()
  await browser.close()
}

getAmazon()
