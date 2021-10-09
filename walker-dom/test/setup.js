import jsdom from "jsdom";
const { JSDOM } = jsdom;
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;