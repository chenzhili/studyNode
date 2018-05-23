const http = require("http");
const fs = require("fs");

const server = http.createServer((req,res)=>{
    console.log(req.url);
    // 第一种识别不同请求api的地方，但是这种东西维护和书写太烦了
    /* switch(req.url){
        case "/1.js":
        res.write("111");
        break;
        case "/2.js":
        res.write("2222");
        break;
        default:
        res.write("404");
        break;
    } 
    res.end();
    */
    let file_name = `./www${req.url}`;

    // 这种方式还有个好处，就是不用重启服务器，一样可以添加新的 api，因为是通过 fs模块 读取 服务器上的磁盘里的内容，不需要中断服务器
    fs.readFile(file_name,(err,data)=>{
        if(err)return;
        res.write(data);
        res.end();
    });
    
});

server.listen(3000);
