import * as path from "path";
import * as webdriver from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";

const findBy = webdriver.By;
const chromePath = path.resolve("../chrome");
const chromDriverPath = `${chromePath}/chromedriver.exe`;

chrome.setDefaultService(new chrome.ServiceBuilder(chromDriverPath).build());

const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(new chrome.Options().addArguments(`--user-data-dir=${path.resolve("../chrome")}`))
    .build();

