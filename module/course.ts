import * as webdriver from 'selenium-webdriver';

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

    public get level(): string{
        return this._level;
    }

    public get name(): string{
        return this._name;
    }

    public get url(): string {
        return this._url;
    }

    public get index(): number{
        return this._index;
    }

    public resolve(driver: webdriver.WebDriver, by: webdriver.By){
        //driver
    }
}