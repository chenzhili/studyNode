const http = require("http");
const urlLib = require("url");

http.createServer((req,res)=>{
    if(req.url.indexOf("?")!=-1){
        let urlObj = urlLib.parse(req.url,true);
        let Get = urlObj.query;
        console.log(Get);
    }
    res.write("aa");
    res.end();
}).listen(3000);