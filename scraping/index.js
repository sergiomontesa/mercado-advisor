import * as cheerio from 'cheerio'

const URL = 'https://kingsleague.pro/estadisticas/clasificacion/'

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
  console.log($.text)
  const $row = $('table tbody tr')
  $row.each((index, el) => {
    const equipo = $(el).find('.fs-table-text_3').text().trim()
    console.log(cleanText(equipo))
  })
}

await get()
