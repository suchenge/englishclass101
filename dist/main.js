const path = require("path");
const webdriver = require("selenium-webdriver");
const by = webdriver.By;
const chrome = require("selenium-webdriver/chrome");
const chromePath = path.resovle("") + "//chrome";
chrome.setDefaultService(new chrome.ServiceBuilder(`${chromePath}//chromedriver.exe`).build());
const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(new chrome.Options().addArguments(`--user-data-dir='${chromePath}'`))
    .build();
/*const fs = require("fs");
const path = require("path");

const Course = require("./course");

class CourseList{
    constructor() {
        this.items = [];
        let classLinePattern = /\d+ .*?\nhttps.*?\n/g;
        let classInfoPattern = /(\d+) (.*?)\n(https.*?)\n/;
        let classLevelPath = `${path.resolve("")}//class-list`;
        let classLevels = fs.readdirSync(classLevelPath);
        classLevels.forEach(classLevel => {
            let classListContent = fs.readFileSync(`${classLevelPath}//${classLevel}`,'utf-8');
            let classList = classListContent.match(classLinePattern);
            classList.forEach(classInfo => {
                let courseInfo = classInfo.match(classInfoPattern);
                this.items.push(new Course({
                    index:courseInfo[1],
                    name:courseInfo[2],
                    url:courseInfo[3],
                    level:classLevel.replace(".txt")
                }));
            });
        });
    }
}

module.exports = CourseList;*/ 
/*class Course{
    constructor(courseInfo){
        this.level = courseInfo.level;
        this.name = courseInfo.name;
        this.url = courseInfo.url;
        this.index = courseInfo.index;
    }

    resolve(driver, by){
        driver
    }
}

module.exports = Course;*/ 
//# sourceMappingURL=main.js.map