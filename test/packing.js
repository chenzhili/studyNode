/**
 * Created by YK on 2017/9/12.
 */
let fs = require('fs');
let execSync = require('child_process').execSync;
let path = require("path");

let absoluteUrl = process.cwd();

/*要修改的文件内容的url*/
let reviseUrl = {
    config:"config.xml", /*这是用于修改包名之类的*/
    index:"www/index.html", /*用于修改id的*/
    pre:"www/pre.html", /*用于修改配置也页面的*/
    icon:"resources/icon.png",
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
    pluginJpushReg:/<meta-data[\s]*android:name="JPUSH_CHANNEL"[\s]*android:value="[\w\W]*?" \/>/g
};
/*需要修改的文字以及图片的资源路径*/
let reviseText = {
            packageId:"www.test.test",
            name:"时时彩22",
            description:"<p>ssssss</p>",
            author:"yike",
            /*index页面*/
            WX_ID:30,
            /*pre页面*/
            preUrl:"https://vest.leanapp.cn/api",
            prebar:"#387EF5",
            preAppId:"testhw",
            preVersion:"1.0.0",
            preBundleId:"www.testhw.testhw",
            /*资源图片的绝对路径*/
            absoluteIconUrl:"/Applications/MAMP/htdocs/itclab/public/uploads/images/20171019/c2e1fc874f4e3d2ef648b320d7af4595.png",
            /*激光推送的appkey*/
            jpushAppKey:"ssssss",
            /*极光的channel参数*/
            pluginJpushChannel:"hw",
            isAddPlatform:0 /*是否从头开始打包 1表示 只需要更换 jpush的渠道*/
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
  Package.prototype.init = function(){
    /*这里进行所有的操作*/
    if(parseInt(reviseText.isAddPlatform)){
      /*请求接口的渠道也要改*/
      reviseFileContent(reviseUrl.pre,"pre");
      /*这里对于插件内容进行一定的修改*/
      reviseFileContent(reviseUrl.pluginJpush,"jpush");
      /*删除platform*/
      let remove = execSync(cmd.removePlatforms);
      console.log(remove.toString());
      let add = execSync(cmd.addPlatforms);
      console.log(add.toString());
      let pack = execSync(cmd.build);
      console.log(pack.toString());
        return new Promise(function(resolve,reject){
            resolve(true);
        });
    }else{
      return new Promise(function(resolve,reject){
          reviseFileContent(reviseUrl.config,"config");
          reviseFileContent(reviseUrl.pre,"pre");
          reviseFileContent(reviseUrl.index,"index");
          addPlatformAndPacking(resolve);
      });
    }
  };
  /*修改文件内的内容*/
  function reviseFileContent(file,judgeFile){
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
      /*删除和添加*/
      fs.unlinkSync(file);
      console.log(file+"删除成功");
      fs.writeFileSync(file,json);
      console.log(file+"修改成功");
      return 1;
    }
  }
  // 修改res文件的bug
  function copyRes(url){
      let files = fs.readdir(url);
          files.forEach((file)=>{
              let fileUrl = path.join(url,file);
              if(fs.statSync(fileUrl).isDirectory()){
                  copyRes(fileUrl);
              }else{
                  if(!(/drawable-land-xxhdpi/g.test(fileUrl.replace(/res/g)))){
                      if(!(/drawable-land-xxxhdpi/g.test(fileUrl.replace(/res/g)))){
                          if(!(/drawable-port-xxhdpi/g.test(fileUrl.replace(/res/g)))){
                              if(!(/mipmap-xxhdpi/g.test(fileUrl.replace(/res/g)))){
                                  if(!(/mipmap-xxxhdpi/g.test(fileUrl.replace(/res/g)))){
                                      if(!(/drawable-port-xxxhdpi/g.test(fileUrl.replace(/res/g)))){
                                          let data = fs.readFileSync(path.join(fileUrl),{encoding:'hex',flag:'r'});
                                          fs.writeFileSync(fileUrl.replace(/res/g,"platforms/android/res"),data,{encoding:'hex',flag:'w'});
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          });
  }
  /*修改icon图片并且生成对应的资源*/
  function generateIcon(url,dist){
    let rs = fs.readFileSync(url,{encoding:'hex',flag:'r'});
    fs.writeFileSync(dist,rs,{encoding:'hex',flag:'w'});
    let addIcon = execSync(cmd.addIcon);
    console.log(addIcon.toString());
    copyRes(path.join(absoluteUrl,"res"));
    return true;
  }
  /*生成platform并且打包成功的方法*/
  function platformsAndAndroid(resolve){
    /*切换极光推送的插件*/
    let removeJpush = execSync(cmd.removeJpush);
    console.log(removeJpush.toString());
    let addJpush = execSync(cmd.addJpush);
    console.log(addJpush.toString());
    let pluginSave = execSync(cmd.pluginSave);
    console.log(pluginSave.toString());
    /*这里对于插件内容进行一定的修改*/
    reviseFileContent(reviseUrl.pluginJpush,"jpush");
    let add = execSync(cmd.addPlatforms);
    if(add){
      console.log(add.toString());
      console.log("platform增加成功");
      /*生成icon资源*/
      let isGenerateIcon = generateIcon(reviseText.absoluteIconUrl,reviseUrl.icon);
      /*开始打包*/
      if(isGenerateIcon){
        console.log("运行没");
        let pack = execSync(cmd.build);
        console.log(pack.toString());
        resolve(true);
      }
    }
  }
  /*添加android平台,打包并且签名*/
  function addPlatformAndPacking(resolve){
    fs.readdir(absoluteUrl,(err,files)=>{
      console.log(files);
      if(regExp.isPlatform.test(files.join(","))){
        fs.readdir(absoluteUrl+"\\platforms",(err,files)=>{
          if(regExp.isAndroid.test(files.join(","))){
            /*先删除platform，成功后在安装*/
            let remove = execSync(cmd.removePlatforms);
            if(remove){
              console.log(remove.toString());
              /*添加并且打包*/
              platformsAndAndroid(resolve);
            }
          }else{
            /*添加并且打包*/
            platformsAndAndroid(resolve);
          }
        });
      }else{
        /*添加并且打包*/
        platformsAndAndroid(resolve);
      }
    });
  }
  return Package;
})();
function copyRes(url){
    let files = fs.readdirSync(url);
    files.forEach((file)=>{
        let fileUrl = path.join(url,file);
        if(fs.statSync(fileUrl).isDirectory()){
            copyRes(fileUrl);
        }else{
            if(!(/drawable-land-xxhdpi/g.test(fileUrl.replace(/res/g)))){
                if(!(/drawable-land-xxxhdpi/g.test(fileUrl.replace(/res/g)))){
                    if(!(/drawable-port-xxhdpi/g.test(fileUrl.replace(/res/g)))){
                        if(!(/mipmap-xxhdpi/g.test(fileUrl.replace(/res/g)))){
                            if(!(/mipmap-xxxhdpi/g.test(fileUrl.replace(/res/g)))){
                                if(!(/drawable-port-xxxhdpi/g.test(fileUrl.replace(/res/g)))){
                                    let data = fs.readFileSync(path.join(fileUrl),{encoding:'hex',flag:'r'});
                                    fs.writeFileSync(fileUrl.replace(/res_new/g,"res"),data,{encoding:'hex',flag:'w'});
                                    // fs.readFile(path.join(fileUrl),{encoding:'hex',flag:'r'},(err,data)=>{
                                    //     fs.writeFileSync(fileUrl.replace(/res/g,"platforms/android/res"),data,{encoding:'hex',flag:'w'});
                                    // });
                                }
                            }
                        }
                    }
                }
            }
        }
    });
}
copyRes(path.join(absoluteUrl,"res_new"));
console.log("同步还是异步");






