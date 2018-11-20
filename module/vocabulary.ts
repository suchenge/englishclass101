import * as fs from "fs";
import * as webdriver from 'selenium-webdriver';

import { Ware } from './ware';
import { Course } from './course';
import { Utilites } from './utilites';
import { Example } from './example';

export class Vocabulary extends Ware{
    constructor(driver: webdriver.WebDriver, course: Course){
        super(driver, course);
    }

    public build(): void{
        let path = `${this._course.path}/vocabulary/`;
        if (!fs.existsSync(path)) fs.mkdirSync(path);

        this._driver.findElements(webdriver.By.xpath("//section[@id='vocabulary']/div/div/div/section/table/tbody/tr")).then(list => {
            
            for (let i = 0;i < list.length; i++) {
                if (i > 0){
                    list[i].findElements(webdriver.By.tagName("td")).then(tds => {
                        tds[2].findElement(webdriver.By.tagName("button")).then(button => {
                            button.getAttribute("data-src").then(mp3 => {
                                tds[4].findElements(webdriver.By.tagName("span")).then(span => {
                                    span[0].getText().then(name => {
                                        this._name = Utilites.formatTitle(name);
                                        this._url = mp3;
                                        
                                        let wordPath = path + this._name + "/";
                                        if (!fs.existsSync(wordPath)) fs.mkdirSync(wordPath);
                                        this._path = wordPath + this._name + ".mp3";

                                        //this.save();

                                        span[3].findElements(webdriver.By.xpath("table/tbody/tr")).then(examples => {
                                            for(let example of examples){
                                                new Example(this._driver, this._course, example, wordPath).Build();
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });
                } 
            }  
        });
    }
}