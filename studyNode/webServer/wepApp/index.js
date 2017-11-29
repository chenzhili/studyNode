/**
 * Created by YK on 2017/11/28.
 */
const start = require("./server");
const route = require("./router");
const requestHandlers = require("./requestHandlers");



let handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;


start.start(route.route,handle);