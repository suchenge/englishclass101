import * as selenium from 'selenium-webdriver';

export class Course{
    private _level: string;
    private _name: string;
    private _url: string;
    private _index: number;

    constructor(courseInfo: {level:string, name:string, url: string, index:number}){
        this._level = courseInfo.level;
        this._name = courseInfo.name;
        this._url = courseInfo.url;
        this._index = courseInfo.index;
    }

    public resolve(driver: selenium.WebDriver, by: selenium.By): void{
        driver.get(this._url).then(() => {

        });
    }
}