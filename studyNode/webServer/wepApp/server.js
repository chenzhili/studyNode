/**
 * Created by YK on 2017/11/23.
 */
const http = require("http");
const url = require("url");

function start(){
    http.createServer((request,response)=>{
        let pathname = url.parse(request.url).pathname;
        console.log(pathname);
        console.log(request.url);
        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write("hello world");
        response.end();
    }).listen(8989);
}
/*module.exports=start;*//*这种写法，可以把文件输出进行 重写为 start*/
exports.start = start;/*这个向外暴露的是 exports 这个对象，不只是 start 这个方法*/
