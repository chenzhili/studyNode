/**
 * Created by YK on 2017/11/23.
 */
const http = require("http");

http.createServer((request,response)=>{
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("hello world");
    response.end();
}).listen(8989);