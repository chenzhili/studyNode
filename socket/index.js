const express = require("express");
const path = require("path");

const app = express();

// const server = require("http").Server(app);
const server = app.listen(8000,()=>{
    console.log("listening on 8000");
});
const io = require("socket.io").listen(server);

// server.listen(8000, () => {
//     console.log("listening on 3000");
// });

/**
    总结下：使用 socket.io时，他是基于 http 模块的 服务器 作为参数 传入，进行使用的；
    注意：
    1、express 中 的实例，只是一个 对象，里面包含了对应的 封装的东西 包括 生成服务器的方法；
    2、原声 和 express 的 listen 方法（自认为是同一个）,这个方法 默认 返回 服务器实例

    要用 io，有三种写法：
     1、const http =  require("http");
     http.Server(app); //就是 express的实例
    const io = require("socket.io")(server);
     2、
        const server = app.listen(8000);//这里就返回了 服务器实例
        const io = require("socket.io")(server);
    3、
        const server = app.listen(8000);//这里就返回了 服务器实例
        const io = require("socket.io").listen(server);

  
 */

app.use(express.static(path.join(__dirname, "www")));
io.on("connection", (socket) => {
    io.local.emit('an event', "这是什么用");
    io.sockets.emit("welcome","欢迎进入");
    socket.on("hello",(data)=>{
        socket.emit("c_hello",`收到了${data}`);
        
    });
    
    socket.on("disconnect",()=>{
        console.log(socket.id+":断开");
    });
})
app.use("/index/aa.html", (req, res) => {
    res.send("这种监听接口行不");
});

/***
 * express 创建服务器的两种方法和区别
 * 第一种
    var express =  require('express');
    var app = express();
    app.listen('3000', function () {
        console.log("The server is running at *: 3000");
    });
 * 第二种
    var express = require('express');
    var app = express();
    var server = require('http').Server(app);
    // 或者是 var server = require('http').createServer(app);
    server.listen('3000', function () {
        console.log('The server is running at *:3000');
    });



    区别：
    
        The second form (creating an HTTP server yourself, instead of having Express create one for you) is useful if you want to reuse the HTTP server, for example to run socket.io within the same HTTP server instance:

        var express = require('express');
        var app     = express();
        var server  = require('http').createServer(app);
        var io      = require('socket.io').listen(server);
        ...
        server.listen(1234);
        However, app.listen() also returns the HTTP server instance, so with a bit of rewriting you can achieve something similar without creating an HTTP server yourself:

        var express   = require('express');
        var app       = express();

        // app.use/routes/etc...

        var server    = app.listen(3033);
        var io        = require('socket.io').listen(server);

        io.sockets.on('connection', function (socket) {
        ...
        });
 */