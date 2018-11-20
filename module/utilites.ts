import * as fs from "fs";
import * as syncRequest from 'sync-request';

export class Utilites{
    constructor(){
    }

    public static formatTitle(title: string): string{
        let str = title;
        str = str.replace(/\?/g, '');
        str = str.replace(/\:/g, '');
        str = str.replace(/\*/g, '');
        str = str.replace(/\"/g, '');
        str = str.replace(/\</g, '');
        str = str.replace(/\>/g, '');
        str = str.replace(/\\/g, '');
        str = str.replace(/\//g, '');
        str = str.replace(/\|/g, '');
        str = str.replace(/\./g, '');
        str = str.replace(/\？/g, '');
        return str;
    }

    public static deleteDir(path: string): void{
        let list: string[] = fs.readdirSync(path);
        if (list.length > 0){
            for (let f of list){
                let fPath = path + "/" + f;
                let info : fs.Stats = fs.statSync(fPath);
                if (info.isDirectory()){
                    Utilites.deleteDir(fPath);
                } else fs.unlinkSync(fPath);
            }
        }else fs.mkdirSync(path);
    }

    public static getUrl(url: string): any{
        let res = syncRequest.default('GET', url, {
            timeout: 20000,
            retry: true,
            retryDelay: 10000,
            maxRetries: 3
        });
        if (res.statusCode == 200) {
            let body = res.body;
            res = null;
            return body;
        }
    }
}