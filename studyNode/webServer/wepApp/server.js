/**
 * Created by YK on 2017/11/23.
 */
const http = require("http");
const url = require("url");

function start(route,handle){
    http.createServer((request,response)=>{
        let pathname = url.parse(request.url).pathname;

        /*路由的管理方法以 依赖注入的方式*/
        /*if(pathname != "/favicon.ico"){
            if(request.method == "GET"){
                route(handle,pathname,response);
            }
            if(request.method == "POST"){
                request.setEncoding("utf-8");

                request.addListener("data",data=>{
                    console.log(data);
                });
                request.addListener("end",()=>{
                    /!*路由的管理方法以 依赖注入的方式*!/
                    if(pathname != "/favicon.ico"){
                        route(handle,pathname,response);
                    }
                })
            }
        }*/
        let content = "";
        if(pathname != "/favicon.ico"){
            request.setEncoding("utf-8");

            request.addListener("data",data=>{
                content += data;/*这个只要传入的内容比较多的时候才会多次触发，不然只会触发一次就完成了*/
            });
            request.addListener("end",()=>{
                console.log("是不是都能监听");
                /*路由的管理方法以 依赖注入的方式*/
                route(handle,pathname,response,content);
            })
        }
    }).listen(8989);
}
/*module.exports=start;*//*这种写法，可以把文件输出进行 重写为 start*/
exports.start = start;/*这个向外暴露的是 exports 这个对象，不只是 start 这个方法*/
