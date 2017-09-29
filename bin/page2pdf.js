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
  .option('--no-sandbox', 'no sandbox for chrome')
  .parse(process.argv)

const args = program.args
if (args.length == 0) {
  process.exit(1)
}

const options = {
  url: args[0],
  output: program.output,
  delay: program.delay,
  sandbox: program.sandbox
}

page2pdf(options).then(() => {
  process.exit(0)
}).catch((e) => {
  console.log(e)
  process.exit(1)
})