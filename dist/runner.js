"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return __awaiter(this, void 0, void 0, function* () {
            let courses = new course_list_1.CourseList().items;
            for (let course of courses) {
                yield course.resolve(this.driver);
            }
            return new Promise((reslove, reject) => reslove(this.driver.close()));
        });
    }
}
new Runner().run();
//# sourceMappingURL=runner.js.map