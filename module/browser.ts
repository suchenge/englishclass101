import * as selenium from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";

import { PathSetting } from './path-setting';

export class Browser{
    constructor(private index: number){
        
    }

    public get driver(): selenium.WebDriver{
        return new selenium.Builder()
                           .forBrowser("chrome")
                           .setChromeService(new chrome.ServiceBuilder(PathSetting.BrowserPath.chromeDriver))
                           .setChromeOptions(new chrome.Options().addArguments(`--user-data-dir=${PathSetting.BrowserPath.chrome}/${this.index}`)).build();
    }
}