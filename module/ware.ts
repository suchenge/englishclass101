import * as fs from "fs";
import * as webdriver from 'selenium-webdriver';
import * as URL from "url";

import { Course } from './course';
import { Utilites } from './utilites';

export class Ware {
    protected _name: string;
    protected _url: string;
    protected _path: string;
    protected _course: Course;
    protected _driver: webdriver.WebDriver;
    protected _domanin: string;

    constructor(driver: webdriver.WebDriver, course: Course){
        this._course = course;
        this._driver = driver;
        let urlInfo: URL.UrlWithStringQuery = URL.parse(this._course.url);
        this._domanin = `${urlInfo.protocol}//${urlInfo.hostname}`;
    }

    protected save(): void{
        let path = this._course.path + "/" + this._name;

        if (this._path) path = this._path;
        if (!this._url.startsWith("http")) this._url = this._domanin + this._url;
        if (fs.existsSync(path)) fs.unlinkSync(path);

        console.log("download:" + this._url);

        let fileBody = Utilites.getUrl(this._url);
        
        fs.writeFileSync(path, fileBody);
        console.log("save:" + path);
    }
}