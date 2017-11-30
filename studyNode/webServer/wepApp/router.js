/**
 * Created by YK on 2017/11/29.
 */
function route(handle,pathname,response,content){
    if(typeof handle[pathname] == "function"){
        console.log(`content=${content}`);
        // content?handle[pathname](response,content):handle[pathname](response);
        (content && handle[pathname](response,content)) || handle[pathname](response); //这个表现最后会 执行两次 数据处理函数，不知道为啥
        /**
         * 这问题不是 这个表达式本身逻辑有问题，而是 handle[pathname](response,content))的返回 不存在导致 当 content 存在的时候 ，前面部分 还是 false，导致执行了后面
         * 相当于 执行了 两次 handle 函数
         */

    }else{
        response.writeHead(404,{"Content-type":"text/plain"});
        response.write("404 not found");
        response.end();
    }
}
exports.route = route;