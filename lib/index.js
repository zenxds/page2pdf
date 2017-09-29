const puppeteer = require('puppeteer')

const delay = t => new Promise((resolve, reject) => {
  setTimeout(resolve, t)
})

const toPDF = async(options) => {
  const browser = await puppeteer.launch({
    args: [
      options.sandbox ? '' : '--no-sandbox'
    ]
  })
  const page = await browser.newPage()
  await page.goto(options.url, {
    waitUntil: 'networkidle'
  })
  await delay(options.delay)

  await page.pdf({
    path: options.output,
    format: 'A4'
  })

  await browser.close()
}

module.exports = (options={}) => {
  options.delay = options.delay || 2000
  options.output = options.output || 'page2pdf.pdf'

  return toPDF(options)
}