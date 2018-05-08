var http = require("http");
var path = require("path");
var fs = require("fs");
var url = require("url");

var server = http.createServer(function(req,res){
	routePath(req,res);
});

server.listen(9090);

var routers = {
	"/getWeather": function(req,res){
		res.end(JSON.stringify(req.query));
	},
	"/search": function(req,res){
		res.end("username: "+req.body.username+",password: "+req.body.password);
	}
}

function routePath(req,res){
	var pathObj = url.parse(req.url,true);
	// console.log(req.body);
	var handleFn = routers[pathObj.pathname];
	if(handleFn){
		req.query = pathObj.query;

		var body = "";
		req.on("data",function(postDataChunk){
			body += postDataChunk;
		}).on("end",function(){
			req.body = parseBody(body);
			handleFn(req,res);
		});
	}else{
		staticRoot(req,res);
	}
}

function staticRoot(req,res){
	var pathObj = url.parse(req.url,true);
	var filePath = path.join(__dirname,pathObj.pathname);

	if(fs.existsSync(filePath)){
		var pathnameDir = fs.lstatSync(filePath);
		if(pathnameDir.isDirectory()){
			filePath = path.join(filePath,"index.html");
		}
	}

	fs.readFile(filePath,"binary",function(error,fileContent){
		if(error){
			res.writeHead(404,"not found");
			res.write("<h1>404 Not Found</h1>");
			res.end();
		}else{
			res.writeHead(200,"OK");
			res.write(fileContent,"binary");
			res.end();
		}
	});

}

function parseBody(body){
	// console.log(body);
	var obj = {};
	body.split("&").forEach(function(ele){
		obj[ele.split("=")[0]] = ele.split("=")[1];
	});
	return obj;
}