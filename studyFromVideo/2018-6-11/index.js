const http = require("http");
const path = require("path");
const urlLib = require("url");
const querystring = require("querystring");

var user = {};

http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // 数据判断
    function judge(method){
        var obj = urlLib.parse(req.url, true);
    
            const url = obj.pathname;
            const GET = obj.query;
            const POST = querystring.parse(str);
    
            // 区分是文件还是接口
            if (url == "/user") {
                switch(GET.act){
                    case "reg":
                    if(user[GET.user]){
                        res.write('{"ok":"false","msg":"此用户存在"}');
                    }else{
                        user[GET.user] = GET.pass;
                        res.write('{"ok":true,"msg":"注册成功"}');
                    }
                    break;
                    case "login":
                    if(!user[GET.name]){
                        console.log("进来没");
                        res.write('{"ok":"false","msg":"此用户不存在"}');
                    }else if(user[GET.user] != GET.pass){
                        res.write('{"ok":"false","msg":"用户名或密码错误"}');
                        
                    }else{
                        user[GET.user] = GET.pass;
                        res.write('{"ok":"true","msg":"登录成功"}');
                    }
                    break;
                    default:
                    res.write('{"ok":"false","msg":"未知的act"}');
                }
            } else {
                // 读取文件
                let file_name = "./www" + url;
                fs.readFile(file_name, (err, data) => {
                    if (err) {
                        res.write("404");
                        return;
                    }
                    res.write(data);
                });
            }
    }
    var str = ""
    console.log(req.method);
    console.log(req.url);
    // 实际测试，post 和 get的接受数据的方式不是同一个
    if(req.method == "GET"){
        judge();
    }else if(req.method == "POST"){
        req.on("data", function (data) {
            console.log("get方法会调用这个监听不");
            str += data;
        });
        res.on("end", function () {
            judge();
        });
    }else{
        res.write("请使用常规请求");
    }
    res.end();


    
}).listen(3030);