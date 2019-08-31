const { JSDOM } = require("jsdom");
const fetch = require("node-fetch");
const fs = require("fs");

const Config = require("./config.js");
const { Parser } = require("./lib/parser.js");
const TypeScriptPrinter = require("./lib/printers/typescript.js");
const FlowPrinter = require("./lib/printers/flow.js");

const URL_BOTS_API = `https://core.telegram.org/bots/api`;

const printerMap = {
  typescript: TypeScriptPrinter,
  flow: FlowPrinter
};

(async () => {
  console.log(`Load html data from '${URL_BOTS_API}'`);
  let html;
  try {
    html = fs.readFileSync("../_dev_m/core.telegram.org-bots-api.html");
  } catch (e) {
    html = await (await fetch(URL_BOTS_API)).text();
  }

  console.log(`Create dom from html data`);
  const dom = new JSDOM(html);

  console.log(`Parse types from dom`);
  const types = new Parser().parse(dom.window);
  console.log(`Successfully parsed ${types.size} types`);

  for (const options of Config) {
    console.log(``);
    console.log(`Create '${options.lang}' code`);
    const code = new printerMap[options.printer.lang](
      options.printer.options
    ).printer(types);

    console.log(`Save '${options.lang}' code`);
    fs.writeFileSync(options.path, code);
  }

  require("./test/testSyntax.js");
})();
