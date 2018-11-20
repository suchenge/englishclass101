"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const course_1 = require("./course");
class CourseList {
    constructor() {
    }
    static get items() {
        let result = [];
        let classLinePattern = /\d+ .*?\nhttps.*?\n/g;
        let classInfoPattern = /(\d+) (.*?)\n(https.*?)\n/;
        let classLevelPath = `${path.resolve("")}//class-list`;
        let classLevels = fs.readdirSync(classLevelPath);
        classLevels.forEach(classLevel => {
            let classListContent = fs.readFileSync(`${classLevelPath}//${classLevel}`, 'utf-8');
            let classList = classListContent.match(classLinePattern);
            classList.forEach(classInfo => {
                let courseInfo = classInfo.match(classInfoPattern);
                result.push(new course_1.Course({
                    level: classLevel.replace(".txt", ""),
                    name: courseInfo[2],
                    url: courseInfo[3],
                    index: Number(courseInfo[1])
                }));
            });
        });
        return result;
    }
}
exports.CourseList = CourseList;
//# sourceMappingURL=course-list.js.map