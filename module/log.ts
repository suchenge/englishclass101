import * as fs from "fs";
import * as path from "path";

export enum LogType{
    Exception,
    TimeOut
}

export class Log{
    public static write(logType: LogType, content: string): void{
        let logPath = path.resolve("") + "/" + LogType[logType].toLowerCase() + ".log";
        if (!fs.existsSync(logPath)) fs.createWriteStream(logPath);
        let logConent: string = new Date().toLocaleString();
        logConent = "\n" + logConent + "--------------------------------------------------------------\n";
        logConent += content;

        fs.appendFileSync(logPath, logConent);
    }
}