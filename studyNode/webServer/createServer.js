let http = require('http');
let url = require("url");

/*
http.createServer(function(req,res){
	console.log(req.url);
	console.log(url.parse("http://nqdeng.github.io/7-days-nodejs/?spm=0.0.0.0.B56hm1"));
	res.writeHead(200,{"content-type":"text-plain"});
	res.end("hello world sdfsd ");
}).listen(8888);*/
let options = {
	host:"localhost",
	port:"8081",
	path:"/index.html"
};
let req = http.request(options,function(res){
	let body = "";
	res.on("data",function(data){
		body += data;
	});
	res.on("end",function(){
		console.log(body);
	});
});
req.on("error",(e)=>{
	console.log(e);
});
req.end();