import * as fs from "fs";
import * as path from "path";
import * as webdriver from 'selenium-webdriver';

import { Ware } from './ware';
import { Course } from './course';
import { Utilites } from './utilites';

export class Note extends Ware{
    private downLoadPath: string = path.resolve("/Users/Vito/Downloads");

    constructor(driver: webdriver.WebDriver, course: Course){
        super(driver, course);
    }

    public build(): Promise<void>{
        return new Promise<void>((resolve, reject) => {
            this._driver.findElement(webdriver.By.xpath("//div[@id='pdfs']/ul/li[1]/a")).then(a => {
                let noteName = this._course.title + ".pdf";
                let notePath = this._course.path + "/" + noteName;

                if (!fs.existsSync(notePath)){
                    this._driver.executeScript("arguments[0].click()", a).then(() => {
                        Utilites.sleep(1000);
                        a.getAttribute("href").then(href => {
                            let downloadFileNameArray = href.split("/");
                            let downloadFileName = downloadFileNameArray[downloadFileNameArray.length - 1];
                            let downloadFilePath = this.downLoadPath + "/" + downloadFileName;
            
                            Utilites.findFile(downloadFilePath, 1000);
            
                            if (fs.existsSync(notePath)) fs.unlinkSync(notePath);
                            fs.renameSync(downloadFilePath, notePath);
                        });
                    });
                }
                resolve();
            });
        });
    }
}