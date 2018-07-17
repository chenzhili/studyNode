const express = require("express");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const cookiesession = require("cookie-session");

const server = express();

//post请求 需要 用到 这个 中间件 来 定义 body
server.use(bodyparser.urlencoded({
    extended:false, //扩展模式
    limit:2*1024  //限制
}));

// 2018/7/16
/* server.use("/",(req,res)=>{
    console.log(req.body);
    
}); */

server.use(cookieparser("aavdsfsfe"));//注意这里的顺序，用session这个 中间件需要 县解析 cookie
server.use(cookiesession({
    name:"sess",
    keys:["aaa","bbb","cccc"], //回去循环这里的签名秘钥
    maxAge:2*3600*1000
}));

server.use("/aaa/index.html",(req,res)=>{
    // 签名 和 加密 是两回事
    // req.secret = 'aavdsfsfe'; 这里不需要了，中间件 里面做了这个了
    res.cookie("test","aaa",{
        path:"/aaa",
        maxAge:24*3600*1000,
        signed:true
    });
    console.log("未签名的cookie",req.cookies);
    console.log("签名的cookie",req.signedCookies);
    //res.clearCookie("名字");//删除cookie
    
    //session
    // console.log(req.session);
    if(!req.session["count"]){
        req.session["count"] = 1
    }else{
        req.session["count"]++;
    }
    res.send("ok");
});
// 就是在 上面路由下 种下的 cookie 在 父级 目录上也能读取
/* server.use("/",(req,res)=>{
    console.log(req.cookies);
    res.send("ok");
}); */
server.listen(8080);
