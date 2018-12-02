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
const fs = require("fs");
const path = require("path");
const browser_1 = require("./module/browser");
const course_list_1 = require("./module/course-list");
const timeout_addition_1 = require("./module/timeout-addition");
class Runner {
    constructor(paiallel = false, continuous = true) {
        this.paiallel = paiallel;
        this.continuous = continuous;
        this.donePath = path.resolve("") + "/course/.done";
    }
    run() {
        let courses = new course_list_1.CourseList().items;
        let doneCourses = this.readDoneCourse();
        if (this.paiallel) {
            let count = 0;
            courses.forEach(value => {
                this.grab(new browser_1.Browser(count).driver, value, doneCourses);
                count++;
            });
        }
        else {
            let allCourses = new Array();
            courses.forEach(value => allCourses = allCourses.concat(value));
            this.grab(new browser_1.Browser().driver, allCourses, doneCourses);
        }
    }
    grab(browser, courses, doneUrls = new Array()) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let course of courses) {
                if (doneUrls.some(url => url == course.url))
                    continue;
                yield course.resolve(browser);
                if (this.continuous)
                    this.removeCourse(course);
            }
            yield browser.close();
        });
    }
    removeCourse(course) {
        if (!fs.existsSync(this.donePath))
            fs.createWriteStream(this.donePath);
        fs.appendFileSync(this.donePath, "\n" + course.url);
    }
    readDoneCourse() {
        let result = new Array();
        if (!fs.existsSync(this.donePath))
            return result;
        let doneContent = fs.readFileSync(this.donePath, "utf-8");
        if (doneContent == "")
            return result;
        return doneContent.split("\n").map(line => line);
    }
}
let paiallel = false;
let continuous = true;
new timeout_addition_1.TimeOutAddition().removeToCourse();
//# sourceMappingURL=runner.js.map