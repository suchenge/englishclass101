"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const course_1 = require("./course");
class CourseList {
    constructor() {
        this._item = [];
        let classLinePattern = /\d+ .*?[\r|\n]{1}https.*[\r|\n]{0,1}/m;
        let classInfoPattern = /(\d+) (.*?)[\r|\n](https.*?)[\r|\n]/;
        let classLevelPath = `${path.resolve("")}//class-list`;
        let classLevels = fs.readdirSync(classLevelPath);
        classLevels.forEach(classLevel => {
            let level = classLevel.replace(".txt", "");
            let levelPath = `${path.resolve("")}/course/${level}`;
            if (!fs.existsSync(levelPath))
                fs.mkdirSync(levelPath);
            let classListContent = fs.readFileSync(`${classLevelPath}//${classLevel}`, 'utf-8');
            let classList = classListContent.match(classLinePattern);
            classList.forEach(classInfo => {
                let courseInfo = classInfo.match(classInfoPattern);
                this._item.push(new course_1.Course({
                    level: level,
                    name: courseInfo[2],
                    url: courseInfo[3],
                    index: Number(courseInfo[1])
                }));
            });
        });
    }
    get items() {
        return this._item;
    }
}
exports.CourseList = CourseList;
//# sourceMappingURL=course-list.js.map