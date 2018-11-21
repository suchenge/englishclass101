import * as path from "path";
import * as selenium from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";

import { CourseList } from './module/course-list';

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

    public async run(): Promise<void>{
        let courses = new CourseList().items.splice(0,3);
        for(let course of courses){
            await course.resolve(this.driver);
        }
        return new Promise<void>((reslove,reject) => reslove(this.driver.close()));
    }
}

new Runner().run();

