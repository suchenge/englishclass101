import * as fs from "fs";
import * as path from "path";

export enum LogType{
    Exception,
    TimeOut
}

export class Log{
    public static write(logType: LogType, content: string): void{
        let logPath = path.resolve("") + "/" + LogType[logType] + ".log";
        if (!fs.existsSync(logPath)) fs.createWriteStream(logPath);
        let logConent: string = new Date().toLocaleDateString();
        logConent = "\n" + logConent + "--------------------------------------------------------------\n";
        logConent += content;

        fs.appendFileSync(logPath, logConent);
    }
}