const test = require('ava')
const fs = require('fs-extra')
const path = require('path')
const page2pdf = require('../lib')

const pdfPath = path.join(__dirname, 'page2pdf.pdf')

test.after(() => {
  fs.removeSync(pdfPath)
})

test(async t => {
  await page2pdf({
    url: 'https://www.baidu.com',
    output: pdfPath,
    disableGpu: true,
    noSanbox: true
  })

  t.true(fs.pathExistsSync(pdfPath))
})