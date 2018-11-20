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
        chrome.setDefaultService(new chrome.ServiceBuilder(this.chromDriverPath).build());
        this.driver = new selenium.Builder()
            .withCapabilities(selenium.Capabilities.chrome())
            .setChromeOptions(new chrome.Options().addArguments(`--user-data-dir=${path.resolve("../chrome")}`))
            .build();
    }
    run() {
        let courses = new course_list_1.CourseList().items.splice(0, 3);
        courses[0].resolve(this.driver)
            .then(() => courses[1].resolve(this.driver))
            .then(() => this.driver.close());
    }
}
new Runner().run();
//# sourceMappingURL=runner.js.map