**本次搭建服务器是基于node.js，所以请安装nodejs。**

要使用 HTTP 服务器与客户端，需要 `require('http')`。

# 搭建最简单的服务器

新建一个server.js文件
```
var http = require("http");
console.log("http");

var server = http.createServer(request,response){
    response.setHeader("Content-Type","text/html; charset=utf-8");
    response.write("<h1>Hello World</h1>");
    response.end();
}

server.linste(9000);
```
这样就是一个最简单的服务器了。

运行方法：打开终端，切换到server.js所在目，执行`node server.js`，然后打开浏览器，在地址栏中输入`localhost:9000`。

`console.log("http")`的结果会在终端显示。


# 搭建能正常访问网页的服务器

在上面最简单的服务器的基础上搭建一个能正常访问网页的服务器

### 原理是根据地址栏里的访问地址，找到对应的文件，读取后显示在浏览器中。

需要用到nodejs的`fs`模块，`path`模块，`url`模块。

+ `fs`模块：文件系统
+ `path`模块：提供了一些工具函数，用于处理文件与目录的路径
+ `url`模块：提供了一些实用函数，用于 URL 处理与解析

```
var http = require("http");
var path = require("path");
var fs = require("fs");
var url = require("url");

var server = http.createServer(function(req,res){
	staticRoot(req,res);
});

server.listen(9090);

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

```

使用`url.parse()`解析请求的url地址（即地址栏中的地址），返回一个对象：

```
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '',
  query: {},
  pathname: '/',
  path: '/',
  href: '/' }

```
这样就可以把参数和对应的文件夹区分开了，参数保存在query里，也是个对象。

使用`path.join()`把server.js所在路径跟要访问的文件（例如a.html）连接在一起，组成要访问的文件（例如a.html）路径，这样可以确保fs方法可以通过路径读取文件。

使用`fs.readFile()`读取文件，写入响应体，就可以通过浏览器访问了。

# 增加路由功能

什么是路由呢？

可以简单的理解一下，`localhost:9090/example`，localhost:9090后面的就算路由了。

```
var http = require("http");
var path = require("path");
var fs = require("fs");
var url = require("url");

var server = http.createServer(function(req,res){
	routePath(req,res);
});

server.listen(9090);

function routePath(req,res){
	var pathObj = url.parse(req.url,true);

	switch(pathObj.pathname){
		case "/getWeather":
		var ret;
		if(pathObj.query.city == "beijing"){
			ret = {
				"city": "beijing",
				"weather": "sunny"
			}
		}else{
			ret = {
				"city": pathObj.query.city,
				"weather": "Unknow"
			}
		}
		res.end(JSON.stringify(ret));
		break;
		default:
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
```

使用`switch`语句，localhost后面不同的后缀实现不同的功能，这是简单的路由。

