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
        
        if(str.length > 50) str = str.slice(0, 50);
        
        return str.trim();
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
            timeout: 200000,
            retry: true,
            retryDelay: 100000,
            maxRetries: 5
        });
        if (res.statusCode == 200) {
            let body = res.body;
            res = null;
            return body;
        }
    }

    public static findFile(path: string, numberMillis: number): void{
        Utilites.sleep(numberMillis);
        while(true){
            if (fs.existsSync(path)) return;
            else Utilites.findFile(path, numberMillis);
        }
    }

    public static sleep(numberMillis: number): void{
        let now = new Date();
        let exitTime = now.getTime() + numberMillis;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime) return;
        }
    }
}