const CDP = require('chrome-remote-interface')
const chromeLauncher = require('chrome-launcher')
const _ = require('lodash')
const fs = require('fs')

Promise.defer = () => {
  const deferred = {}
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })
  return deferred
}

const delay = (t) => new Promise((resolve, reject) => {
  setTimeout(resolve, t)
})

const start = async(options) => {
  const chrome = await launchChrome(options)
  const protocol = await CDP({ port: chrome.port })
  const { Page } = protocol
  const defer = Promise.defer()

  await Page.enable()

  Page.navigate({ url: options.url })
  Page.loadEventFired(async () => {
    await delay(options.delay)

    const pdf = await Page.printToPDF({})
    fs.writeFileSync(options.output, Buffer.from(pdf.data, 'base64'))

    protocol.close()
    chrome.kill()
    defer.resolve()
  })

  return defer.promise
}

function launchChrome(options) {
  // chromePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'  
  const opt = {
    chromeFlags: [
      options.disableGpu ? '--disable-gpu' : '',
      // options.windowSize ? `--window-size=${options.windowSize}` : '',
      '--headless'
    ].filter(item => !!item)
  }
  if (options.chromePath) {
    opt.chromePath = options.chromePath
  }

  return chromeLauncher.launch(opt)
}

module.exports = (options={}) => {
  options = _.defaults(options, {
    disableGpu: false,
    delay: 2000,
    output: 'page2pdf.pdf'
  })

  return start(options)
}