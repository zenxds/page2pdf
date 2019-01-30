#! /usr/bin/env node

const program = require('commander')
const page2pdf = require('../lib')
const packageJSON = require('../package.json')

program
  .version(packageJSON.version)
  .usage('<url> [options]')
  .option('-o, --output [path]', 'output file, default page2pdf.pdf')
  .option('--format [format]', 'output format, default A4')
  .option('--viewport [viewport]', 'viewport size')
  .option('--mode [mode]', 'pdf mode')
  .option('--delay [ms]', 'delay ms for js execute, default 2000', parseInt)
  .parse(process.argv)

const args = program.args
if (args.length == 0) {
  process.exit(1)
}

const options = {
  url: args[0],
  mode: program.mode,
  pdf: {
    format: program.format,
    path: program.output
  },
  delay: program.delay
}

if (program.viewport) {
  const [width, height] = program.viewport.split(',')
  options.defaultViewport = {
    width: parseInt(width),
    height: parseInt(height)
  }
}

page2pdf(options).then(() => {
  process.exit(0)
}).catch((e) => {
  console.log(e)
  process.exit(1)
})