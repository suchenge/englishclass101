"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Course {
    constructor(courseInfo) {
        this._level = courseInfo.level;
        this._name = courseInfo.name;
        this._url = courseInfo.url;
        this._index = courseInfo.index;
    }
    get level() {
        return this._level;
    }
    get name() {
        return this._name;
    }
    get url() {
        return this._url;
    }
    get index() {
        return this._index;
    }
    resolve(driver, by) {
    }
}
exports.Course = Course;
//# sourceMappingURL=course.js.map