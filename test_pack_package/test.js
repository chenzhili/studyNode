/**
 * Created by YK on 2017/9/11.
 */
console.log(process.cwd());/*这个可以获取，当前的文件的绝对路径*/
let fs = require('fs');

let file = "config.xml";
/*相对正则表达式*/
let packageIdReg = /<widget id="[a-zA-Z0-9.]+"/g;
let packageName = /<name>[\w\W]+<\/name>/g;
let packageDescription = /<description>[\w\W]+<\/description>/g;
let packageAuthor = /<author email="you@example.com" href="http:\/\/example.com\/">[\w\W]+<\/author>/g;

/*修改的文字*/
let replaceId = "com.test.apk";
let replaceName = "测试机器绝对路径";
let replaceDescription = "测试";
let replaceAuthor = "测试作者";

/*文件对应的绝对路径*/
let absoluteUrl = process.cwd();

/*readFile(absoluteUrl+"\\"+file);*/

let test = "握草";
/*console.log(new Buffer(test));
console.log(new Buffer(test).toString());*/

function readFile(file){
    fs.readFile(file,function(err,data){
        if(err){
            console.log(`fail:${err}`);
        }else{
            let json = data.toString("utf-8");
            json = json.replace(packageIdReg,function(a,b){
                /*let bEXP = new RegExp(b,"g");
                json = json.replace(bEXP,"com.test.apk");
                return json;*/
                return `<widget id="${replaceId}"`;
            });
            json = json.replace(packageName,function(){
                return `<name>${replaceName}</name>`;
            });
            json = json.replace(packageDescription,function(){
                return `<description>\n${replaceDescription}\n</description>`;
            });
            json = json.replace(packageAuthor,function(){
                return `<author>\n${replaceAuthor}\n</author>`;
            });
            /*console.log(json);*/
            /*console.log(packageName.test(json));*/
            /*console.log(json);*/
            fs.unlink(file,function(err){
                if(err){
                    console.log(`fail:${err}`);
                }else{
                    console.log("删除成功");
                    writeFile(file,json);
                }
            });
        }
    });
}
function writeFile(file,data){
    fs.writeFile(file,data,function(err,data){
        if(err){
            console.log(`fail:${err}`);
        }else{
            console.log("保存好了");
        }
    });
}

readDir(absoluteUrl+"\\"+"reset-toolbar");
function readDir(fileDir){
    fs.readdir(fileDir,function(err,files){
        if(err) return console.log(err);
        files.forEach(function(file){
            let filePath = fileDir+'/'+file;
            fs.stat(filePath,function(err,stats){
                if(stats.isDirectory()){
                    readDir(filePath)
                }else{
                    if(/(\.jpg|\.png)$/i.test(filePath)){
                        /*做操作*/
                        console.log(filePath);
                    }
                }
            })
        })
    })
}

