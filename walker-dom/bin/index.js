#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import axios from "axios";
import { existsSync, mkdirSync} from "fs";

import { walker } from "./walker.js";
import { Constants, getFileName, writer } from "./utils.js";

const options = yargs(hideBin(process.argv))
  .usage("Usage: node . -n <url>")
  .option("n", {
    alias: "url",
    describe: "An url",
    type: "string",
    demandOption: true,
  }).argv;

const url = options.url;

console.log(`Url: ${url}!`);

axios
  .get(url, {
    headers: {
      Accept: "application/html",
      "User-Agent": "axios 0.22.0",
    },
  })
  .then((res) => {
    const htmlContent = res.data;

    const result = walker(htmlContent, url);

    if (!existsSync(Constants.OUT_FOLDER)) {
      mkdirSync(Constants.OUT_FOLDER);
    }

    const fileName = getFileName();
    writer(fileName, result);
  })
  .catch((err) => {
    console.log(err);
  });
