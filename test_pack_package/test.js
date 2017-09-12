/**
 * Created by YK on 2017/9/11.
 */
/*console.log(process.cwd());*//*这个可以获取，当前的文件的绝对路径*/
let fs = require('fs');
let execSync = require('child_process').execSync;

/*相对正则表达式*/
let packageIdReg = /<widget id="[a-zA-Z0-9.]+"/g;
let packageName = /<name>[\w\W]+<\/name>/g;
let packageDescription = /<description>[\w\W]+<\/description>/g;
let packageAuthor = /<author email="you@example.com" href="http:\/\/example.com\/">[\w\W]+<\/author>/g;
let isPlatform  = /platform/g;
let isAndroid = /android/g;

let indexReg = /WX_ID[\s]*=[\s]*[0-9]+;/g;

/*pre.html*/
/*var dataObj ={
 getDataUrl:"https://vest.leanapp.cn/api",
 toolbarColor:"#387EF5",
 qq:"",
 appID:"sscp20170907b",
 version:"1.0.0",
 bundleID:"com.sscp20170907b.apk"
 };*/
let preAllReg = /var[\w\W]*dataObj[\s]*=[\s]*\{[\w\W]*?}/g;

let preUrl = "https://vest.test.cn/api";
let prebar = "#fff";
let preAppId = "sscp20170907b";
let preVersion = "2.0.0";
let preBundleId = "com.test.apk";

/*修改的文字*/
let replaceId = "com.test.apk";
let replaceName = "测试机器绝对路径";
let replaceDescription = "测试";
let replaceAuthor = "测试作者";
let wx_id = 4;


/*文件对应的绝对路径*/
let absoluteUrl = process.cwd();

/*需要运行的命令行*/
let removePlatforms = "ionic platform remove android";
let addPlatforms = "ionic platform add android";
let build = "cordova build --release android";
let addIcon = "ionic resources --icon";

/*let file = "config.xml";*/
/*let file = "www/index.html";*/
let file = "www/pre.html";
reviseFileContent(file);

let test = "握草";
/*console.log(new Buffer(test));
console.log(new Buffer(test).toString());*/

function reviseFileContent(file){
    fs.readFile(file,function(err,data){
        if(err){
            console.log(`fail:${err}`);
        }else{
            let json = data.toString("utf-8");

            /*json = json.replace(packageIdReg,function(a,b){
                /!*let bEXP = new RegExp(b,"g");
                json = json.replace(bEXP,"com.test.apk");
                return json;*!/
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
            });*/
            /*json = json.replace(packageIdReg,`<widget id="${replaceId}"`);
            json = json.replace(packageName,`<name>${replaceName}</name>`);
            json = json.replace(packageDescription,`<description>\n${replaceDescription}\n</description>`);
            json = json.replace(packageAuthor,`<author email="you@example.com" href="http:\/\/example.com\/">\n${replaceAuthor}\n<\/author>`);*/
            /*json = json.replace(indexReg,`WX_ID = ${wx_id};`);*/

            /*let preUrl = "https://vest.test.cn/api";
             let prebar = "#fff";
             let preAppId = "sscp20170907b";
             let preVersion = "2.0.0";
             let preBundleId = "com.test.apk";*/
            json = json.replace(preAllReg,
            `var dataObj ={
                 getDataUrl:"${preUrl}",
                 toolbarColor:"${prebar}",
                 qq:"",
                 appID:"${preAppId}",
                 version:"${preVersion}",
                 bundleID:"${preBundleId}"
             }`);


            console.log(json);
            /*console.log(packageName.test(json));*/
            /*console.log(json);*/

            /*fs.unlink(file,function(err){
                if(err){
                    console.log(`fail:${err}`);
                }else{
                    console.log("删除成功");
                    fs.writeFile(file,json,function(err,data){
                        if(err){
                            console.log(`fail:${err}`);
                        }else{
                            console.log(file+"保存好了");
                        }
                    });
                }
            });*/
        }
    });
}

/*readDir(absoluteUrl);*/
/*用于遍历当前目录下的所有文件包括文件夹*/
function readDir(fileDir){
    fs.readdir(fileDir,function(err,files){
        if(err) return console.log(err);
        console.log(files);
        files.forEach(function(file){
            let filePath = fileDir+'/'+file;
            fs.stat(filePath,function(err,stats){
                if(stats.isDirectory()){
                    /*这里是文件夹*/

                }else{
                    /*这里是文件*/
                }
            })
        })
    })
}

/*修改icon和splash的方法*/
function copy(url,dist){
    let rs = fs.readFileSync(url,{encoding:'hex',flag:'r'});
    fs.writeFileSync(dist,rs,{encoding:'hex',flag:'w'})
}
/*判断当前platform中是否有Android，做不同的操作*/
function Platform(rootDir){
    fs.readdir(rootDir,(err,files)=>{
        if(isPlatform.test(files.join(","))){
            fs.readdir(rootDir+"\\platforms",(err,files)=>{
                if(isAndroid.test(files.join(","))){
                    /*先删除platform，成功后在安装*/
                    let remove = execSync(removePlatforms);
                    if(remove){
                        let add = execSync(addPlatforms);
                        if(add){
                            /*开始打包*/
                            let pack = execSync("cordova build --release android");
                            console.log(pack.toString());
                        }
                    }
                }else{
                    /*直接安装命令行安装 platform*/
                    let add = execSync(addPlatforms);
                    if(add){
                        /*开始打包*/
                        console.log(add);
                        let pack = execSync("cordova build --release android");
                        console.log(pack.toString());
                        /*签名好像签不了没找到方法*/
                    }
                }
            });
        }else{
            /*直接安装命令行安装 platform*/
            let add = execSync(addPlatforms);
            if(add){
                /*开始打包*/
                let pack = execSync("cordova build --release android");
                console.log(pack.toString());
            }
        }
    });
}
/*Platform(absoluteUrl);*/
