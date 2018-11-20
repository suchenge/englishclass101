import { Ware } from './ware';
import * as webdriver from 'selenium-webdriver';
import * as fs from "fs";
import { Course } from './course';
import { Utilites } from './utilites';

export class Dialogue extends Ware{
    constructor(driver: webdriver.WebDriver, course: Course){
        super(driver, course);
    }

    public build(): void{
        let path = `${this._course.path}/dialogue/`;
        if (!fs.existsSync(path)) fs.mkdirSync(path);

        this._driver.findElements(webdriver.By.xpath("//section[@aria-labelledby='dialogue_tab_1']/table/tbody/tr")).then(list => {
            for(let i = 0; i < list.length; i ++){
                list[i].findElements(webdriver.By.tagName("td")).then(tds => {
                    tds[1].findElement(webdriver.By.tagName("button")).then(button => {
                        button.getAttribute("data-src").then(mp3 => {
                            tds[2].getText().then(sufix => {
                                tds[3].getText().then(title => {
                                    this._name = `${i}.${sufix.replace(":","_")}${Utilites.formatTitle(title)}`;
                                    this._url = mp3;
                                    this._path = path + this._name + ".mp3";
                                    this.save();
                                });
                            });
                        });
                    });
                });
            }   
        });
    }
}