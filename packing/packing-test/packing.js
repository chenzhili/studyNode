/**
 * Created by YK on 2017/9/12.
 */
let fs = require('fs');
let execSync = require('child_process').execSync;

let absoluteUrl = process.cwd();/*如果需要这个当前目录的绝对路径的时候用*/
/**
 * 这是个用来 一条命令 打包android的开发过程
 */
/*要修改的文件内容的url*/
let reviseUrl = {
    config:"config.xml", /*这是用于修改包名之类的*/
    index:"www/index.html", /*用于修改id的*/
    pre:"www/pre.html", /*用于修改配置也页面的*/
    icon:"resources/icon.png",
    /*这种改法复杂了，直接改变plugin的内容*/
    /*androidJson:"platforms/android/android.json", /!*修改极光的channel*!/
     androidManifest:"platforms/android/AndroidManifest.xml"*/
    pluginJpush:"plugins/jpush-phonegap-plugin/plugin.xml"
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
    preAllReg:/var[\w\W]*dataObj[\s]*=[\s]*\{[\w\W]*?}/g,
    /*这种改法复杂了，直接改变plugin的内容*/
    /* /!*极光的channel值*!/
     jpushChannelReg:/<meta-data[\s]*android:name=\\"JPUSH_CHANNEL\\"[\s]*android:value=\\"[\w\W]*\\" \/>/g,
     androidManifestReg:/<meta-data[\s]*android:name="JPUSH_CHANNEL"[\s]*android:value="[\w\W]*?" \/>/g*/
    pluginJpushReg:/<meta-data[\s]*android:name="JPUSH_CHANNEL"[\s]*android:value="[\w\W]*?" \/>/g
};
/*需要修改的文字以及图片的资源路径*/
let reviseText = {
    packageId:"com.test.apk",
    name:"perfect",
    description:"perfect",
    author:"test",
    /*index页面*/
    WX_ID:14,
    /*pre页面*/
    preUrl:"https://vest.perfect.cn/api",
    prebar:"#f3f3f3",
    preAppId:"perfect",
    preVersion:"3.0.0",
    preBundleId:"com.perfect.apk",
    /*资源图片的绝对路径*/
    absoluteIconUrl:"C:\\Users\\YK\\Desktop\\08100554095898ec.png",
    /*激光推送的appkey*/
    jpushAppKey:"f7e0978006d939487442d64f",
    /*这种改法复杂了，直接改变plugin的内容*/
    /*/!*极光的channel参数*!/
     jpushChannel:"test333"*/
    pluginJpushChannel:"test333"
};
/*需要运行的命令行*/
let cmd = {
    removePlatforms:"ionic platform remove android",
    addPlatforms:"ionic platform add android",
    build:"cordova build --release android",
    addIcon:"ionic resources --icon",
    removeJpush:"ionic plugin remove jpush-phonegap-plugin",
    addJpush:`ionic plugin add jpush-phonegap-plugin --variable APP_KEY=${reviseText.jpushAppKey}`,
    pluginSave:"ionic plugin --save"
};

let Package = (function(){
    /*打包的构造函数*/
    function Package(){

    }
    /*修改文件内的内容*/
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
            /*plugin的jpush*/
            if(judgeFile == "jpush"){
                json = json.replace(regExp.pluginJpushReg,`<meta-data android:name="JPUSH_CHANNEL" android:value="${reviseText.pluginJpushChannel}" />`);
            }
            /*这种改法复杂了，直接改变plugin的内容*/
            /*/!*android.json页面*!/
             if(judgeFile == "android"){
             json = json.replace(regExp.jpushChannelReg,`<meta-data android:name=\\"JPUSH_CHANNEL\\" android:value=\\"${reviseText.jpushChannel}\\" />`);
             }
             /!*androidManifest页面*!/
             if(judgeFile == "androidManifest"){
             json = json.replace(regExp.androidManifestReg,"");
             }*/
            /*删除和添加*/
            fs.unlinkSync(file);
            console.log(file+"删除成功");
            fs.writeFileSync(file,json);
            console.log(file+"修改成功");
            return 1;
        }
    };
    /*修改icon图片并且生成对应的资源*/
    function generateIcon(url,dist){
        let rs = fs.readFileSync(url,{encoding:'hex',flag:'r'});
        fs.writeFileSync(dist,rs,{encoding:'hex',flag:'w'});
        let addIcon = execSync(cmd.addIcon);
        console.log(addIcon.toString());
    }
    /*生成platform并且打包成功的方法*/
    function platformsAndAndroid(){
        /*切换极光推送的插件*/
        let removeJpush = execSync(cmd.removeJpush);
        console.log(removeJpush.toString());
        let addJpush = execSync(cmd.addJpush);
        console.log(addJpush.toString());
        let pluginSave = execSync(cmd.pluginSave);
        console.log(pluginSave.toString());
        /*这里对于插件内容进行一定的修改*/

        let add = execSync(cmd.addPlatforms);
        if(add){
            console.log(add.toString());
            console.log("platform增加成功");
            /*生成icon资源*/
            generateIcon(reviseText.absoluteIconUrl,reviseUrl.icon);
            /*开始打包*/
            let pack = execSync(cmd.build);
            console.log(pack.toString());
            /*签名命令有问题*/
        }
    }
    /*添加android平台,打包并且签名*/
    Package.prototype.addPlatformAndPacking = function(){
        fs.readdir(absoluteUrl,(err,files)=>{
            if(regExp.isPlatform.test(files.join(","))){
                fs.readdir(absoluteUrl+"\\platforms",(err,files)=>{
                    if(regExp.isAndroid.test(files.join(","))){
                        /*先删除platform，成功后在安装*/
                        let remove = execSync(cmd.removePlatforms);
                        if(remove){
                            console.log(remove.toString());
                            /*添加并且打包*/
                            platformsAndAndroid();
                        }
                    }else{
                        /*添加并且打包*/
                        platformsAndAndroid();
                    }
                });
            }else{
                /*添加并且打包*/
                platformsAndAndroid();
            }
        });
    };
    return Package;
})();
let pack = new Package();
/*let config = pack.reviseFileContent(reviseUrl.config,"config");
 let pre = pack.reviseFileContent(reviseUrl.pre,"pre");
 let index = pack.reviseFileContent(reviseUrl.index,"index");
 if(config){
 pack.addPlatformAndPacking();
 }else{
 console.log("异步行不行");
 }*/

