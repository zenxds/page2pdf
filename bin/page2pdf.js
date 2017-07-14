#! /usr/bin/env node

const fs = require('fs')
const program = require('commander')
const page2pdf = require('../lib')
const packageJSON = require('../package.json')

program
  .version(packageJSON.version)
  .usage('<url> [options]')
  .option('-o, --output [path]', 'output file, default page2pdf.pdf')  
  .option('--delay [ms]', 'delay ms for js execute, default 2000', parseInt)
  .option('--disable-gpu', 'disable-gpu flag for headless-chrome')
  .option('--chrome-path [path]', 'path for chrome browser')
  // .option('--window-size [size]', 'window size for chrome launcher, such as 412,732')
  // .option('--paper-width [width]', 'Paper width in inches. Defaults to 8.5 inches', parseFloat)
  // .option('--paper-height [height]', 'Paper height in inches. Defaults to 11 inches', parseFloat)
  .parse(process.argv)

const args = program.args
if (args.length == 0) {
  process.exit(1)
}

const options = {
  url: args[0],
  output: program.output,
  delay: program.delay,
  disableGpu: program.disableGpu,
  chromePath: program.chromePath
  // windowSize: program.windowSize,
  // paperWidth: program.paperWidth,
  // paperHeight: program.paperHeight
}

page2pdf(options).then(() => {
  process.exit(0)
}).catch((e) => {
  console.log(e)
  process.exit(1)
})