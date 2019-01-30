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
    args: args,
    defaultViewport: options.defaultViewport
  })
  const page = await browser.newPage()

  await page.goto(options.url, {
    waitUntil: 'networkidle2'
  })
  await delay(options.delay)

  // 所有内容显示在一页上
  if (options.isSingleMode) {
    delete options.pdf.format

    const { width, height } = await page.evaluate(() => {
      return {
        width: document.body.scrollWidth,
        height: document.body.scrollHeight
      }
    })

    options.pdf.width = width
    options.pdf.height = height + 20
  }

  await page.pdf(options.pdf)
  await browser.close()
}

module.exports = (options={}) => {
  const isSingleMode = options.mode === 'single'

  options = extend(true, {
    isSingleMode,
    defaultViewport: {
      width: 1200,
      height: isSingleMode ? 100 : 800
    },
    delay: 2000,
    pdf: {
      path: 'page2pdf.pdf',
      format: 'A4',
      printBackground: true
    },
    sandbox: isLinux ? false : true
  }, options)

  return toPDF(options)
}