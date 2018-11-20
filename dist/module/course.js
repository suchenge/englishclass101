"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const utilites_1 = require("./utilites");
const vocabulary_1 = require("./vocabulary");
class Course {
    constructor(courseInfo) {
        this._level = courseInfo.level;
        this._name = courseInfo.name;
        this._url = courseInfo.url;
        this._index = courseInfo.index;
        this._title = this._index + "." + utilites_1.Utilites.formatTitle(this._name);
        this._path = path.resolve(`course/${this._level}/${this._title}`);
    }
    get title() {
        return this._title;
    }
    get path() {
        return this._path;
    }
    get url() {
        return this._url;
    }
    resolve(driver) {
        if (!fs.existsSync(this._path))
            fs.mkdirSync(this._path);
        driver.get(this._url).then(() => {
            new vocabulary_1.Vocabulary(driver, this).build();
        });
    }
}
exports.Course = Course;
//# sourceMappingURL=course.js.map