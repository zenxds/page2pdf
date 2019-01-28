const fs = require('fs-extra')
const path = require('path')
const page2pdf = require('../lib')

const pdfPath = path.join(__dirname, 'page2pdf.pdf')

afterEach(() => {
  fs.removeSync(pdfPath)
})

test('pdf', done => {
  page2pdf({
    url: 'https://www.baidu.com',
    pdf: {
      path: pdfPath
    },
    sandbox: false
  }).then(() => {
    expect(fs.pathExistsSync(pdfPath)).toBeTruthy()
    done()
  })
})