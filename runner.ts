import * as selenium from "selenium-webdriver";

import { Browser } from './module/browser';
import { Course } from "./module/course";
import { CourseList } from './module/course-list';

class Runner{
    constructor(private paialler: boolean = false){}

    public run(): void{
        let courses = new CourseList().items;
        if (paiallel){
            let count = 0;
            courses.forEach(value => {
                this.grab(new Browser(count).driver, value);
                count ++;
            });
        }else{
            let allCourses: Course[] = new Array<Course>();
            courses.forEach(value => allCourses = allCourses.concat(value));
            this.grab(new Browser().driver, allCourses);
        }
    }

    private async grab(browser: selenium.WebDriver, courses: Course[]){
        for(let course of courses){
            await course.resolve(browser);
        }
        await browser.close();
    }
}

let paiallel: boolean = false;
new Runner().run();

