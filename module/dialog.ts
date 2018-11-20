import { Ware } from './ware';
import * as webdriver from 'selenium-webdriver';
import { Course } from './course';

export class Dialog extends Ware{
    constructor(driver: webdriver.WebDriver, course: Course){
        super(driver, course);
    }

    public build(): Promise<void>{
        return new Promise<void>((resolve, reject) => {
            this._driver.findElement(webdriver.By.xpath("//div[@id='download-center']/ul/li[3]/a")).then(li => {
                li.getAttribute("href").then(href => {
                    this._url = href;
                    this._name = this._course.title + ".mp3";
                    this.save();
                    resolve();
                });
            });
        });
    }
}