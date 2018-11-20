"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const findBy = webdriver.By;
const chromePath = path.resolve("../chrome");
const chromDriverPath = `${chromePath}/chromedriver.exe`;
chrome.setDefaultService(new chrome.ServiceBuilder(chromDriverPath).build());
const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(new chrome.Options().addArguments(`--user-data-dir=${path.resolve("../chrome")}`))
    .build();
//# sourceMappingURL=main.js.map