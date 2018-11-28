import * as fs from "fs";
import * as path from "path";
import { Course } from './course';

export class CourseList {
    private _item: Course[] = [];

    constructor(){
        let classLinePattern: RegExp = /\d+ .*?[\r|\n]{1}https.*[\r|\n]{0,1}/g;
        let classInfoPattern: RegExp = /(\d+) (.*?)[\r|\n](https.*?)[\r|\n]/;
        let classLevelPath: string = `${path.resolve("")}//class-list`;
        let classLevels: string[] = fs.readdirSync(classLevelPath);
        
        classLevels.forEach(classLevel => { 
            let level = classLevel.replace(".txt", "");
            let levelPath = `${path.resolve("")}/course/${level}`;
            if (!fs.existsSync(levelPath)) fs.mkdirSync(levelPath);

            let classListContent: string = fs.readFileSync(`${classLevelPath}//${classLevel}`,'utf-8');
            let classList: RegExpMatchArray = classListContent.match(classLinePattern);
            classList.forEach(classInfo => {
                let courseInfo: RegExpMatchArray = classInfo.match(classInfoPattern);
                this._item.push(new Course({
                    level:level,
                    name:courseInfo[2],
                    url:courseInfo[3],
                    index:Number(courseInfo[1])
                }));
            });
        });
    }

    public get items(): Course[]{
        return this._item;
    }
}