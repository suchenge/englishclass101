"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const course_1 = require("./course");
class CourseList {
    constructor() {
        this._items = new Map();
        let courseLinePattern = /\d+ .*?[\r|\n]{1}https.*[\r|\n]{0,1}/g;
        let courseInfoPattern = /(\d+) (.*?)[\r|\n](https.*?)[\r|\n]/;
        let courseLevelsPath = `${path.resolve("")}//course`;
        let courseLevels = fs.readdirSync(courseLevelsPath);
        courseLevels.filter(file => file.endsWith(".txt")).forEach(courseLevel => {
            let level = courseLevel.replace(".txt", "");
            let levelPath = `${path.resolve("")}/course/${level}`;
            if (!fs.existsSync(levelPath))
                fs.mkdirSync(levelPath);
            let courseListContent = fs.readFileSync(`${courseLevelsPath}//${courseLevel}`, 'utf-8');
            let courseList = courseListContent.match(courseLinePattern);
            courseList.forEach(courseContent => {
                let courseInfo = courseContent.match(courseInfoPattern);
                this.addItem(level, new course_1.Course({
                    level: level,
                    name: courseInfo[2],
                    url: courseInfo[3],
                    index: Number(courseInfo[1])
                }));
            });
        });
    }
    addItem(level, course) {
        if (this._items.has(level))
            this._items.get(level).push(course);
        else {
            let courses = new Array();
            courses.push(course);
            this._items.set(level, courses);
        }
    }
    get items() {
        return this._items;
    }
}
exports.CourseList = CourseList;
//# sourceMappingURL=course-list.js.map