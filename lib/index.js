const path = require('path')
const defaults = require('lodash.defaults')
const puppeteer = require('puppeteer')
const getPlatform = require('chrome-launcher/utils').getPlatform
const chromeFinder = require('chrome-launcher/chrome-finder')
let installations

const isLinux = getPlatform() === 'linux'

const delay = t => new Promise((resolve, reject) => {
  setTimeout(resolve, t)
})

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
    args: args
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
  options = defaults(options, {
    delay: 2000,
    output: 'page2pdf.pdf',
    sandbox: isLinux ? false : true
  })

  return toPDF(options)
}