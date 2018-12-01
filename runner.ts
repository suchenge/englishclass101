import * as fs from "fs";
import * as path from "path";
import * as selenium from "selenium-webdriver";

import { Browser } from './module/browser';
import { Course } from "./module/course";
import { CourseList } from './module/course-list';

class Runner{
    constructor(private paiallel: boolean = false
                , private continuous:boolean = true){}

    private donePath: string = path.resolve("") + "/course/.done";

    public run(): void{
        let courses: Map<string, Course[]> = new CourseList().items;
        let doneCourses: string[] = this.readDoneCourse();

        if (this.paiallel){
            let count = 0;
            courses.forEach(value => {
                this.grab(new Browser(count).driver, value, doneCourses);
                count ++;
            });
        }else{
            let allCourses: Course[] = new Array<Course>();
            courses.forEach(value => allCourses = allCourses.concat(value));
            this.grab(new Browser().driver, allCourses, doneCourses);
        }
    }

    private async grab(browser: selenium.WebDriver, courses: Course[], doneUrls: string[] = new Array<string>()){
        for(let course of courses){
            if (doneUrls.some(url => url == course.url)) continue;

            await course.resolve(browser);
            if (this.continuous) this.removeCourse(course);
        }
        await browser.close();
    }

    public removeCourse(course: Course): void{
        if (!fs.existsSync(this.donePath)) fs.createWriteStream(this.donePath);
        fs.appendFileSync(this.donePath, "\n" + course.url);
    }

    public readDoneCourse(): string[]{
        let result: string[] = new Array<string>();

        if (!fs.existsSync(this.donePath)) return result;

        let doneContent: string = fs.readFileSync(this.donePath, "utf-8");
        if (doneContent == "") return result;
        return doneContent.split("\n").map(line => line);
    }
}

let paiallel: boolean = true;
let continuous: boolean = true;
new Runner(paiallel, continuous).run();

