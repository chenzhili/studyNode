/**
 * Created by YK on 2017/11/29.
 */
const exec = require("child_process").exec;
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
        '<form action="/upload" method="post">'+
        '<textarea name="text" rows="20" cols="60"></textarea>'+
        '<input type="submit" value="Submit text" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}
function upload(response){
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello Upload");
    response.end();
}
module.exports = {
    start:start,
    upload:upload
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