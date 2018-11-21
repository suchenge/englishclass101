import * as webdriver from 'selenium-webdriver';

import { Ware } from './ware';
import { Course } from './course';
import { Utilites } from './utilites';
import { WebElement } from 'selenium-webdriver';

export class Example extends Ware{
    private _exampleInfos: any[];

    constructor(driver: webdriver.WebDriver, course: Course, exampleInfos: any[]){
        super(driver, course);
        this._exampleInfos = exampleInfos;
    }

    private get(exampleInfos: any[], callback: any): void{
        let exampleInfo: any = exampleInfos[exampleInfos.length - 1];
        let element: WebElement = exampleInfo.element;
        let parentPath: string = exampleInfo.parentPath;

        element.findElements(webdriver.By.tagName("td")).then(exampleInfo => {
            exampleInfo[1].findElement(webdriver.By.tagName("button")).then(exampleButton => {
                exampleButton.getAttribute("data-src").then(exampleMp3 => {
                    exampleInfo[2].findElement(webdriver.By.tagName("span")).then(exampleSpan => {
                        exampleSpan.getAttribute("innerHTML").then(exampleText => {
                            this._name = Utilites.formatTitle(exampleText);
                            this._url = exampleMp3;
                            this._path = parentPath + this._name + ".mp3";

                            this.save();

                            exampleInfos.pop();
                            if (exampleInfos.length == 0) callback();
                            else this.get(exampleInfos, callback);
                        });
                    });
                });
            });
        });
    }

    public build(): Promise<void>{
        return new Promise<void>((resolve, reject) => {
            if (this._exampleInfos.length > 0) this.get(this._exampleInfos, resolve);
            else resolve();
        });
    }
}