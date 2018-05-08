var xhr = new XMLHttpRequest();
xhr.open("GET","/getWeather?city=beijing",true);
xhr.onload = function(){
	if((xhr.status >=200 && xhr.status < 300) || xhr.status === 304){
		console.log(JSON.parse(xhr.responseText));
		document.querySelector("p").innerText = xhr.responseText;
	}
}
xhr.onerror = function(){
	console.log("网络异常");
}

xhr.send();