/**
 * Created by YK on 2017/11/29.
 */
function route(handle,pathname,response){
    if(typeof handle[pathname] == "function"){
        handle[pathname](response);
    }else{
        response.writeHead(404,{"Content-type":"text/plain"});
        response.write("404 not found");
        response.end();
    }
}
exports.route = route;