let http = require('http');

http.createServer(function(req,res){
	console.log(res);
	res.writeHead(200,{"content-type":"text-plain"});
	res.end("hello world sdfsd ");
}).listen(8888);