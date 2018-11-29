import * as selenium from "selenium-webdriver";

import { Browser } from './module/browser';
import { Course } from "./module/course";
import { CourseList } from './module/course-list';

class Runner{
    constructor(){}

    public run(): void{
        let courses = new CourseList().items;
        let count = 0;
        courses.forEach((value, key) => {
            this.grab(new Browser(count).driver, value);
            count ++;
        });
    }

    private async grab(browser: selenium.WebDriver, courses: Course[]){
        for(let course of courses){
            await course.resolve(browser);
        }
        await browser.close();
    }
}

new Runner().run();

