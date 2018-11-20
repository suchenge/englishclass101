import * as path from "path";
import * as fs from "fs";
import * as selenium from 'selenium-webdriver';

import { Utilites } from "./utilites";
import { Note } from './note';
import { Dialog } from './dialog';
import { Dialogue } from './dialogue';
import { Vocabulary } from "./vocabulary";

export class Course{
    private _level: string;
    private _name: string;
    private _url: string;
    private _index: number;
    private _title: string;
    private _path: string;

    constructor(courseInfo: {level:string, name:string, url: string, index:number}){
        this._level = courseInfo.level;
        this._name = courseInfo.name;
        this._url = courseInfo.url;
        this._index = courseInfo.index;

        this._title = this._index + "." + Utilites.formatTitle(this._name);
        this._path = path.resolve(`course/${this._level}/${this._title}`);
    }

    public get title(): string {
        return this._title;
    }

    public get path(): string{
        return this._path;
    }

    public get url(): string{
        return this._url;
    }

    public resolve(driver: selenium.WebDriver): void{
        if (!fs.existsSync(this._path)) fs.mkdirSync(this._path);

        driver.get(this._url).then(() => {
            new Note(driver, this).build();
            new Dialog(driver, this).build();
            new Dialogue(driver, this).build();
            new Vocabulary(driver, this).build();
        });
    } 
}