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
const browser_1 = require("./module/browser");
const course_list_1 = require("./module/course-list");
class Runner {
    constructor() { }
    run() {
        let courses = new course_list_1.CourseList().items;
        let count = 0;
        courses.forEach((value, key) => {
            this.grab(new browser_1.Browser(count).driver, value);
            count++;
        });
    }
    grab(browser, courses) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let course of courses) {
                yield course.resolve(browser);
            }
            yield browser.close();
        });
    }
}
new Runner().run();
//# sourceMappingURL=runner.js.map