import * as webdriver from 'selenium-webdriver';
import * as fs from "fs";

import { Ware } from './ware';
import { Course } from './course';
import { Utilites } from './utilites';

export class Note extends Ware{
    constructor(driver: webdriver.WebDriver, course: Course){
        super(driver, course);
    }

    public build(): void{
        this._driver.findElement(webdriver.By.xpath("//div[@id='pdfs']/ul/li[1]/a")).then(a => {
            a.click().then(() => {
                
            });
            /*li.getAttribute("href").then(href => {
                this._url = href;
                this._name = this._course.title + ".pdf";
                this.save();
            });*/
        });
    }
}