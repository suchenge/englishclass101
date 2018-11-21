import * as fs from "fs";
import * as webdriver from 'selenium-webdriver';

import { Ware } from './ware';
import { Course } from './course';
import { Utilites } from './utilites';

export class Vocabulary extends Ware{
    private exampleElements: any[] = [];

    constructor(driver: webdriver.WebDriver, course: Course){
        super(driver, course);
    }

    private get(webElements: webdriver.WebElement[], path: string, callback: any): void{
        let element: webdriver.WebElement = webElements[webElements.length - 1];

        element.findElements(webdriver.By.tagName("td")).then(tds => {
            tds[2].findElement(webdriver.By.tagName("button")).then(button => {
                button.getAttribute("data-src").then(mp3 => {
                    tds[4].findElements(webdriver.By.tagName("span")).then(span => {
                        span[0].getText().then(name => {
                            this._name = Utilites.formatTitle(name).replace(/\(.*?\)/,"");
                            this._url = mp3;
                            
                            let wordPath = path + this._name + "/";
                            if (!fs.existsSync(wordPath)) fs.mkdirSync(wordPath);
                            this._path = wordPath + this._name + ".mp3";

                            //this.save();

                            span[3].findElements(webdriver.By.xpath("table/tbody/tr")).then(examples => {
                                this.exampleElements = this.exampleElements.concat({elements:examples, parentPath:wordPath});

                                webElements.pop();
                                if (webElements.length == 0) callback(this.exampleElements);
                                else this.get(webElements, path, callback);
                            });
                        });
                    });
                });
            });
        });
    }

    public build(): Promise<void>{
        return new Promise<void>((resolve, reject) => {
            let path = `${this._course.path}/vocabulary/`;
            if (!fs.existsSync(path)) fs.mkdirSync(path);

            let xpath = "//section[@id='vocabulary']/div/div/div/section/table/tbody/tr";
            this._driver.findElements(webdriver.By.xpath(xpath)).then(list => {
                list.shift();
                this.get(list, path, resolve);
            });
        });
    }
}