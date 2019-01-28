const extend = require('extend2')
const puppeteer = require('puppeteer')
const getPlatform = require('chrome-launcher/utils').getPlatform
const chromeFinder = require('chrome-launcher/chrome-finder')

let installations

const isLinux = getPlatform() === 'linux'
const delay = t => new Promise(resolve => setTimeout(resolve, t))
const getInstallations = async() => {
  if (!installations) {
    installations = await chromeFinder[getPlatform()]()
  }
  return installations
}

const toPDF = async(options) => {
  const installations = await getInstallations()
  if (installations.length === 0) {
    throw new Error('No Chrome Installations Found')
  }

  const args = []
  if (!options.sandbox) {
    args.push('--no-sandbox')
  }

  const browser = await puppeteer.launch({
    executablePath: isLinux ? installations[0] : undefined,
    args: args
  })
  const page = await browser.newPage()

  await page.goto(options.url, {
    waitUntil: 'networkidle0'
  })
  await delay(options.delay)

  // 所有内容显示在一页上
  if (options.mode === 'single') {
    delete options.pdf.format

    const height = await page.evaluate(() => document.body.scrollHeight)
    options.pdf.height = height
  }

  await page.pdf(options.pdf)
  await browser.close()
}

module.exports = (options={}) => {
  options = extend(true, {
    delay: 2000,
    pdf: {
      path: 'page2pdf.pdf',
      format: 'A4'
    },
    sandbox: isLinux ? false : true
  }, options)

  return toPDF(options)
}