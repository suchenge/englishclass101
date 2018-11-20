"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const selenium = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const course_list_1 = require("./module/course-list");
class Runner {
    constructor() {
        this.chromePath = path.resolve("../chrome");
        this.chromDriverPath = `${this.chromePath}/chromedriver.exe`;
        this.findBy = selenium.By;
        chrome.setDefaultService(new chrome.ServiceBuilder(this.chromDriverPath).build());
        this.driver = new selenium.Builder()
            .withCapabilities(selenium.Capabilities.chrome())
            .setChromeOptions(new chrome.Options().addArguments(`--user-data-dir=${path.resolve("../chrome")}`))
            .build();
    }
    run() {
        let count = 0;
        let courses = new course_list_1.CourseList().items;
        courses[1].resolve(this.driver, this.findBy);
    }
}
new Runner().run();
//# sourceMappingURL=runner.js.map