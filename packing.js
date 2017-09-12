/**
 * Created by YK on 2017/9/12.
 */
let fs = require('fs');
let execSync = require('child_process').execSync;

let absoluteUrl = process.cwd();/*如果需要这个当前目录的绝对路径的时候用*/

/*要修改的文件内容的url*/
let reviseUrl = {
    config:"config.xml", /*这是用于修改包名之类的*/
    index:"www/index.html", /*用于修改id的*/
    pre:"www/pre.html", /*用于修改配置也页面的*/
};
/*对应需要的正则表达式*/
let regExp = {
    //config
    packageIdReg:/<widget id="[a-zA-Z0-9.]+"/g,
    packageName:/<name>[\w\W]+<\/name>/g,
    packageDescription:/<description>[\w\W]+<\/description>/g,
    packageAuthor:/<author email="you@example.com" href="http:\/\/example.com\/">[\w\W]+<\/author>/g,
    //判断是否有android平台的platform
    isPlatform :/platform/g,
    isAndroid:/android/g,
    /*index.html页面*/
    indexReg:/WX_ID[\s]*=[\s]*[0-9]+;/g,
    /*pre.html页面*/
    preAllReg:/var[\w\W]*dataObj[\s]*=[\s]*\{[\w\W]*?}/g
};
/*需要修改的文字*/
let reviseText = {
    packageId:"com.test.apk",
    name:"测试机器绝对路径",
    description:"测试",
    author:"测试作者",
    /*index页面*/
    WX_ID:4,
    /*pre页面*/
    preUrl:"https://vest.test.cn/api",
    prebar:"#fff",
    preAppId:"sscp20170907b",
    preVersion:"2.0.0",
    preBundleId:"com.test.apk",
};
/*需要运行的命令行*/
let cmd = {
    removePlatforms:"ionic platform remove android",
    addPlatforms:"ionic platform add android",
    build:"cordova build --release android",
    addIcon:"ionic resources --icon",
};



/*打包的构造函数*/
function Package(){

}
/*修改文件内的内容*//*异步操作捕获的时候回出问题，在进行add platforms的时候，所以改成同步操作*/
/*Package.prototype.reviseFileContent = function(file,judgeFile){
    fs.readFile(file,function(err,data){
        if(err){
            console.log(`fail:${err}`);
        }else{
            let json = data.toString("utf-8");
            /!*修改config页面*!/
            if(judgeFile == "config"){
                json = json.replace(regExp.packageIdReg,`<widget id="${reviseText.replaceId}"`);
                json = json.replace(regExp.packageName,`<name>${reviseText.name}</name>`);
                json = json.replace(regExp.packageDescription,`<description>\n${reviseText.description}\n</description>`);
                json = json.replace(regExp.packageAuthor,`<author email="you@example.com" href="http:\/\/example.com\/">\n${reviseText.author}\n<\/author>`);
            }
            /!*修改首页*!/
            if(judgeFile == "index"){
                json = json.replace(regExp.indexReg,`WX_ID = ${reviseText.WX_ID};`);
            }
            /!*修改pre页面*!/
            if(judgeFile == "pre"){
                json = json.replace(regExp.preAllReg,
                `var dataObj ={
                     getDataUrl:"${reviseText.preUrl}",
                     toolbarColor:"${reviseText.prebar}",
                     qq:"",
                     appID:"${reviseText.preAppId}",
                     version:"${reviseText.preVersion}",
                     bundleID:"${reviseText.preBundleId}"
                }`);
            }

            fs.unlink(file,function(err){
                if(err){
                    console.log(`fail:${err}`);
                }else{
                    console.log("删除成功");
                    fs.writeFile(file,json,function(err,data){
                        if(err){
                            console.log(`fail:${err}`);
                        }else{
                            console.log(file+"保存好了");
                            return 1;
                        }
                    });
                }
            });
        }
    });
};*/
Package.prototype.reviseFileContent = function(file,judgeFile){
    let data = fs.readFileSync(file);
    if(data){
        let json = data.toString("utf-8");
        /*修改config页面*/
        if(judgeFile == "config"){
            json = json.replace(regExp.packageIdReg,`<widget id="${reviseText.packageId}"`);
            json = json.replace(regExp.packageName,`<name>${reviseText.name}</name>`);
            json = json.replace(regExp.packageDescription,`<description>\n${reviseText.description}\n</description>`);
            json = json.replace(regExp.packageAuthor,`<author email="you@example.com" href="http:\/\/example.com\/">\n${reviseText.author}\n<\/author>`);
        }
        /*修改首页*/
        if(judgeFile == "index"){
            json = json.replace(regExp.indexReg,`WX_ID = ${reviseText.WX_ID};`);
        }
        /*修改pre页面*/
        if(judgeFile == "pre"){
            json = json.replace(regExp.preAllReg,
                `var dataObj ={
                     getDataUrl:"${reviseText.preUrl}",
                     toolbarColor:"${reviseText.prebar}",
                     qq:"",
                     appID:"${reviseText.preAppId}",
                     version:"${reviseText.preVersion}",
                     bundleID:"${reviseText.preBundleId}"
                }`);
        }
        /*删除和添加*/
        fs.unlinkSync(file);
        console.log(file+"删除成功");
        fs.writeFileSync(file,json);
        console.log(file+"修改成功");
        return 1;
    }
};
/*添加android平台,打包并且签名*/
/*这里少了一步生成对应的 icon 和 splash 资源*/
Package.prototype.addPlatformAndPacking = function(){
    fs.readdir(absoluteUrl,(err,files)=>{
        if(regExp.isPlatform.test(files.join(","))){
            fs.readdir(absoluteUrl+"\\platforms",(err,files)=>{
                if(regExp.isAndroid.test(files.join(","))){
                    /*先删除platform，成功后在安装*/
                    let remove = execSync(cmd.removePlatforms);
                    if(remove){
                        console.log("platform删除成功");
                        console.log(remove.toString());
                        let add = execSync(cmd.addPlatforms);
                        if(add){
                            console.log("platform增加成功");
                            console.log(add.toString());
                            /*开始打包*/
                            let pack = execSync(cmd.build);
                            console.log(pack.toString());
                            /*签名命令有问题*/
                        }
                    }
                }else{
                    /*直接安装命令行安装 platform*/
                    let add = execSync(cmd.addPlatforms);
                    if(add){
                        console.log("platform增加成功");
                        console.log(add.toString());
                        /*开始打包*/
                        let pack = execSync(cmd.build);
                        console.log(pack.toString());
                    }
                }
            });
        }else{
            /*直接安装命令行安装 platform*/
            let add = execSync(cmd.addPlatforms);
            if(add){
                console.log("platform增加成功");
                console.log(add.toString());
                /*开始打包*/
                let pack = execSync(cmd.build);
                console.log(pack.toString());
            }
        }
    });
};
/*module.exports = new Package();*/
let pack = new Package();
let config = pack.reviseFileContent("config.xml","config");
let pre = pack.reviseFileContent("www/pre.html","pre");
let index = pack.reviseFileContent("www/index.html","index");
if(config && pre && index){
    pack.addPlatformAndPacking();
}else{
    console.log("异步行不行");
}
