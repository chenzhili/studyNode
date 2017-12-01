/**
 * Created by YK on 2017/11/29.
 */
const exec = require("child_process").exec;
const querystring = require("querystring");
const fs = require("fs");
const formidable = require("formidable");
const path = require("path");
function start(response){
    // function sleep(t){
    //     let time = new Date().getTime();
    //     while(new Date().getTime() < time +t);
    // }
    // sleep(3000);
    /*非阻塞 和 阻塞 的区别，node是属于事件驱动，对事件进行轮训*/
    // exec("dir",function(err,res){
    //     response.writeHead(200,{"content-type":"text/plain"});
    //     if(typeof res != "string"){
    //         res = JSON.stringify(res);
    //     }
    //     response.write(res);
    //     response.end();
    // });
    /*一个简单的运用*/
    let body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" method="post">'+
        '<textarea name="text" rows="20" cols="60"></textarea>'+
        '<input name="username" />'+
        '<input type="file" accept="image/*" name="file">'+
        '<input type="submit" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}
function upload(response,request){
    //使用插件
    let form = new formidable.IncomingForm();
    //这个步骤很重要了，允许下面磁盘跨区 和 权限的 解决
    form.uploadDir='tmp';
    form.parse(request,(err,fields,files)=>{  //这个会将 文件存在 临时文件夹下，需要把它 提到我的项目中来
        console.log("parsing done");
        /*fields 中的是 除了 文件类型的其他 提交的 form 数据 ，（key,value）的形式*/
        fs.renameSync(files.file.path, path.join(__dirname,"tmp/test.png"));
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' style='width:100px;height:100px;' />");
        response.end();
    });
    //这个是实验用的
    /*response.writeHead(200, {"Content-Type": "text/plain"});
    console.log(querystring.parse(content));
    response.write("hello world");
    response.end();*/
    //这个写法只是为了 在 路由模块里 实现一种表达方式而已
    return true;
}
function show(response){
    console.log("Request handler 'show' was called.");
    fs.readFile(path.join(__dirname,"tmp/test.png"), "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}
module.exports = {
    start:start,
    upload:upload,
    show:show
};

/**
 * var a = new Object();//a相当于module.exports
 * var b = a; //b相当于exports
 *
 * 两者的解释
 * exports仅仅是module.exports的一个地址引用。nodejs只会导出module.exports的指向，如果exports指向变了，那就仅仅是exports不在指向module.exports，于是不会再被导出
 *
 *  错误的引用方式：
 *      exports = {
 *          start:start,     //这种赋值后，其实 exports 已经不再指向 module.exports 对象了，而 node 只会导出 module.exports 的指向，所以给 module.exports赋值就不会有问题
            upload:upload
 *      }
 *
 *  一般对于用法：
 *      NodeJs开发者建议导出对象用module.exports,导出多个方法和变量用exports
 **/