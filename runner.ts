import * as path from "path";
import * as selenium from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";

import { CourseList } from './module/course-list';

class Runner{
    private chromePath: string = path.resolve("../chrome");
    private chromDriverPath: string = `${this.chromePath}/chromedriver.exe`;

    private driver: selenium.WebDriver;
    private findBy: selenium.By = selenium.By;

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
        courses[1].resolve(this.driver, this.findBy);
    }
}

new Runner().run();

