const express = require("express");
const bodyparser = require("body-parser");

const server = express();

//post请求 需要 用到 这个 中间件 来 定义 body
server.use(bodyparser.urlencoded({
    extended:false, //扩展模式
    limit:2*1024  //限制
}));

server.use("/",(req,res)=>{
    console.log(req.body);
    
});
server.listen(8080);