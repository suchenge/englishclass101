import * as path from "path";
import * as selenium from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";

export class Browser{
    private chromePath: string = path.resolve("../chrome");
    private chromeDriverPath: string = this.chromePath + "/chromedriver.exe";

    constructor(private index: number = 0){
        
    }

    public get driver(): selenium.WebDriver{
        return new selenium.Builder()
                           .forBrowser("chrome")
                           .setChromeService(new chrome.ServiceBuilder(this.chromeDriverPath))
                           .setChromeOptions(
                                                new chrome.Options().addArguments(`--user-data-dir=${this.chromePath}/${this.index}`)
                                                                    .addArguments('--no-sandbox')
                                                                    .addArguments('--disable-dev-shm-usage')
                                                                    .addArguments('blink-settings=imagesEnabled=false')
                                                                    .addArguments('--headless')
                                                                    .addArguments('--disable-gpu')
                                            )
                            .build();
    }
}