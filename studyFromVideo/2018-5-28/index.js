const http = require("http");
const fs = require("fs");
const urlLib = require("url");
const querystring = require("querystring");

http.createServer((req,res)=>{
    
    let obj = urlLib.parse(req.url,true);
    let url = obj.pathname;
    // 判断当前的url是否为 favicon.ico
    if(url == "/favicon.ico")return;
    // GET
    const Get = obj.query;
    // POST 就是为 数据块 流的方式 发送的
    let str = "";
    req.on("data",res=>{
        str += res;
    });
    req.on("end",()=>{
        console.log("获取数据完毕");
        str = querystring.parse(str);
        console.log(url,Get,str);


        // 返回的文件数据
        let resourceUrl = "./www"+url;
        fs.readFile(resourceUrl,(err,data)=>{
            if(err){
                res.write(404);
            }
            res.write(data);
            res.end();
        });
    });
}).listen(3000);