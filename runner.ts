import * as path from "path";
import * as selenium from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";

import { CourseList } from './module/course-list';
import { Course } from './module/course';

class Runner{
    private chromePath: string = path.resolve("../chrome");
    private chromDriverPath: string = `${this.chromePath}/chromedriver.exe`;

    private driver: selenium.WebDriver;

    constructor(){
        chrome.setDefaultService(new chrome.ServiceBuilder(this.chromDriverPath).build());

        this.driver = new selenium.Builder()
                            .withCapabilities(selenium.Capabilities.chrome())
                            .setChromeOptions(new chrome.Options().addArguments(`--user-data-dir=${path.resolve("../chrome")}`))
                            .build();
    }

    public run(): void{
        let count: number = 0;
        let courses = new CourseList().items;

        courses[0].resolve(this.driver);
    }
}

new Runner().run();

