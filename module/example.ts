import * as webdriver from 'selenium-webdriver';

import { Ware } from './ware';
import { Course } from './course';
import { Utilites } from './utilites';

export class Example extends Ware{
    private _parentPath: string;
    private _webElement: webdriver.WebElement;

    constructor(driver: webdriver.WebDriver, course: Course, webElement: webdriver.WebElement, parentPath: string){
        super(driver, course);
        this._parentPath = parentPath;
        this._webElement = webElement;
    }

    private get(webElements: webdriver.WebElement[], path: string, callback: any): void{
        let element: webdriver.WebElement = webElements[webElements.length - 1];

        element.findElements(webdriver.By.tagName("td")).then(exampleInfo => {
            exampleInfo[1].findElement(webdriver.By.tagName("button")).then(exampleButton => {
                exampleButton.getAttribute("data-src").then(exampleMp3 => {
                    exampleInfo[2].findElement(webdriver.By.tagName("span")).then(exampleSpan => {
                        exampleSpan.getAttribute("innerHTML").then(exampleText => {
                            this._name = Utilites.formatTitle(exampleText);
                            this._url = exampleMp3;
                            this._path = this._parentPath + this._name + ".mp3";

                            this.save();

                            webElements.pop();
                            if (webElements.length == 0) callback();
                            else this.get(webElements, path, callback);
                        });
                    });
                });
            });
        });
    }

    public build(): Promise<void>{
        return new Promise<void>((resolve, reject) => {
            this._webElement.findElements(webdriver.By.xpath("table/tbody/tr")).then(examples => this.get(examples, this._parentPath, resolve));
        });
    }
}