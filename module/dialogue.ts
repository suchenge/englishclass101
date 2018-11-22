import * as fs from "fs";
import * as webdriver from 'selenium-webdriver';

import { Ware } from './ware';
import { Course } from './course';
import { Utilites } from './utilites';

export class Dialogue extends Ware{
    constructor(driver: webdriver.WebDriver, course: Course){
        super(driver, course);
    }

    private get(webElements: webdriver.WebElement[], path: string, callback: any): void{
        let index: number = webElements.length;
        let element: webdriver.WebElement = webElements[webElements.length - 1];
    
        element.findElements(webdriver.By.tagName("td")).then(tds => {
            if (tds.length < 4){
                webElements.pop();
                if (webElements.length == 0) callback();
                else this.get(webElements, path, callback);
            }
            else{
                tds[1].findElement(webdriver.By.tagName("button")).then(button => {
                    button.getAttribute("data-src").then(mp3 => {
                        tds[2].getText().then(sufix => {
                            tds[3].getText().then(title => {
                                this._name = `${index}.${sufix.replace(":","_")}${Utilites.formatTitle(title)}`;
                                this._url = mp3;
                                this._path = path + this._name + ".mp3";
                                this.save();

                                webElements.pop();
                                if (webElements.length == 0) callback();
                                else this.get(webElements, path, callback);
                            });
                        });
                    });
                });
            }
        });
    }

    public build(): Promise<void>{
        return new Promise<void>((resolve, reject) => {
            let path = `${this._course.path}/dialogue/`;
            if (!fs.existsSync(path)) fs.mkdirSync(path);
            
            let xpath = "//section[@aria-labelledby='dialogue_tab_1']/table/tbody/tr";
            
            this._driver.findElements(webdriver.By.xpath(xpath)).then(list => this.get(list, path, resolve));
        });
    }
}