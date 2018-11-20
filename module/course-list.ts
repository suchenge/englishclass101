import * as fs from "fs";
import * as path from "path";
import { Course } from './course';

export class CourseList {
    constructor(){
    }

    public static get items(): Course[]{
        let result: Course[] = [];
        let classLinePattern: RegExp = /\d+ .*?\nhttps.*?\n/g;
        let classInfoPattern: RegExp = /(\d+) (.*?)\n(https.*?)\n/;
        let classLevelPath: string = `${path.resolve("")}//class-list`;
        let classLevels: string[] = fs.readdirSync(classLevelPath);
        
        classLevels.forEach(classLevel => {
            let classListContent: string = fs.readFileSync(`${classLevelPath}//${classLevel}`,'utf-8');
            let classList: RegExpMatchArray = classListContent.match(classLinePattern);
            classList.forEach(classInfo => {
                let courseInfo: RegExpMatchArray = classInfo.match(classInfoPattern);
                result.push(new Course({
                    level:classLevel.replace(".txt",""),
                    name:courseInfo[2],
                    url:courseInfo[3],
                    index:Number(courseInfo[1])
                }));
            });
        });

        return result;
    }
}