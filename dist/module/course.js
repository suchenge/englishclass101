"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Course {
    constructor(courseInfo) {
        this._level = courseInfo.level;
        this._name = courseInfo.name;
        this._url = courseInfo.url;
        this._index = courseInfo.index;
    }
    resolve(driver, by) {
        driver.get(this._url).then(() => {
        });
    }
}
exports.Course = Course;
//# sourceMappingURL=course.js.map