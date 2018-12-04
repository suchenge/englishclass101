import * as fs from "fs";
import * as path from "path";

export class TimeOutItem{
    public get fileName(): string{
        return path.basename(this.url);
    }

    constructor(public url: string, public path:string){

    }
}

export class TimeOutAddition{
    private _items: TimeOutItem[] = new Array<TimeOutItem>();
    private _downLoadPath: string = path.resolve("/Users/Vito/Downloads/");
    private _timeOutLogPath: string = path.resolve("timeout.log");

    constructor(){
        if (fs.existsSync(this._timeOutLogPath)){

            let logContent = fs.readFileSync(this._timeOutLogPath, "utf-8");
            let logs = logContent.match(/\{.*?\}/gs);

            this._items = logs.map(log => {
                let logObj = JSON.parse(log);
                return new TimeOutItem(logObj.url, logObj.filePath);
            })

        }
    }

    public removeToCourse(): void{
        this._items.forEach(item => fs.renameSync(this._downLoadPath + "/" + item.fileName, item.path));
    }
}