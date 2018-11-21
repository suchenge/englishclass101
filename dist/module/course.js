"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const utilites_1 = require("./utilites");
const note_1 = require("./note");
const dialog_1 = require("./dialog");
const dialogue_1 = require("./dialogue");
const vocabulary_1 = require("./vocabulary");
const example_1 = require("./example");
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
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(this._path))
                fs.mkdirSync(this._path);
            driver.get(this._url).then(() => console.log(`open:${this._url}`))
                .then(() => new note_1.Note(driver, this).build())
                .then(() => new dialog_1.Dialog(driver, this).build())
                .then(() => new dialogue_1.Dialogue(driver, this).build())
                .then(() => new vocabulary_1.Vocabulary(driver, this).build())
                .then(info => new example_1.Example(driver, this, info).build())
                .then(() => resolve());
        });
    }
}
exports.Course = Course;
//# sourceMappingURL=course.js.map