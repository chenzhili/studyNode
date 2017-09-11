/**
 * Created by YK on 2017/9/11.
 */
/*
模块初始化

 一个模块中的JS代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象。之后，缓存起来的导出对象被重复利用。

同一个模块只会初始化一次
 */
let counter1 = require("./utils/counter");
let counter2 = require("./utils/counter");
console.log(counter2());
console.log(counter1());
let bin = new Buffer("heeh");
let fs = require("fs");
let path = require("path");
console.log(path.join("foo/","/bar","aa"));
console.log(bin);
console.log(bin.toString("utf-8"));
console.log(new Buffer("握草"),"utf-8");
/*fs.mkdirSync("aa",function(err,data){
    console.log(1);
});
console.log("异步还是同步");*/
/*同步遍历文件的方式*/
function travelSync(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        let pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}
/*异步遍历文件的方法*/
function travel1Async(dir, callback, finish) {
    fs.readdir(dir, function (err, files) {
        (function next(i) {
            if (i < files.length) {
                var pathname = path.join(dir, files[i]);

                fs.stat(pathname, function (err, stats) {
                    if (stats.isDirectory()) {
                        travel(pathname, callback, function () {
                            next(i + 1);
                        });
                    } else {
                        callback(pathname, function () {
                            next(i + 1);
                        });
                    }
                });
            } else {
                finish && finish();
            }
        }(0));
    });
}



