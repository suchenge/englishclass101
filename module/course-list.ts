import * as fs from "fs";
import * as path from "path";
import { Course } from './course';

export class CourseList {
    private _items: Map<string, Course[]> = new Map<string, Course[]>();

    constructor(){
        let courseLinePattern: RegExp = /\d+ .*?[\r|\n]{1}https.*[\r|\n]{0,1}/g;
        let courseInfoPattern: RegExp = /(\d+) (.*?)[\r|\n](https.*?)[\r|\n]/;

        let courseLevelsPath: string = `${path.resolve("")}//course`;
        let courseLevels: string[] = fs.readdirSync(courseLevelsPath);
        
        courseLevels.filter(file => file.endsWith(".txt")).forEach(courseLevel => { 
            let level = courseLevel.replace(".txt", "");
            let levelPath = `${path.resolve("")}/course/${level}`;
        
            if (!fs.existsSync(levelPath)) fs.mkdirSync(levelPath);

            let courseListContent: string = fs.readFileSync(`${courseLevelsPath}//${courseLevel}`,'utf-8');
            let courseList: RegExpMatchArray = courseListContent.match(courseLinePattern);

            courseList.forEach(courseContent => {
                let courseInfo: RegExpMatchArray = courseContent.match(courseInfoPattern);
                this.addItem(level, new Course({
                    level: level,
                    name: courseInfo[2],
                    url: courseInfo[3],
                    index: Number(courseInfo[1])
                }));
            });
        });
    }

    private addItem(level: string, course: Course): void{
        if(this._items.has(level)) this._items.get(level).push(course);
        else {
            let courses: Course[] = new Array<Course>();
            courses.push(course);
            this._items.set(level, courses);
        }
    }

    public get items(): Map<string, Course[]>{
        return this._items;
    }
}