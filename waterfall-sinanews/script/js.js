var page = 1;
var isFinish = false;

function getData(callback){
	if(isFinish){
		$('#load>.iconfont').hide();
		return;
	}
	$.ajax({
		url: "http://platform.sina.com.cn/slide/album_tech",
		method: "GET",
		data: {
			app_key: '1271687855',
			num: 30,
			page: page
		},
		dataType: "jsonp",
		jsonp: "jsoncallback"
		}).done(function(databack){
			// console.log(databack,databack.total);
			callback&&callback(databack);
			if(page*30 > databack.total){
				isFinish = true;
			}
			page++;
		}).fail(function(){
			console.log("服务器异常");
		});
}
getData(function(data){
	$node = setData(data);
	waterfall($node);
});
function isShow(){
	return $("#load").offset().top < $(window).scrollTop() + $(window).height();
}

var clock;
$(window).on("scroll",function(){
	if(clock){
		clearTimeout(clock);
	}
		
	clock = setTimeout(function(){
		if(isShow()){
			getData(function(data){
				$node = setData(data);
				waterfall($node);
			});
		}
	},300);		

});
function setData(data){
	var html = '<li>\
				<a target="_blank"><img alt=""></a>\
				<h4></h4>\
				<p></p>\
			</li>';
	if(data.status.code === "0"){
		data.data.forEach(function(ele){
			$node = $(html);
			$node.find("a").attr("href",ele.url);
			$node.find("img").attr("src",ele.img_url);
			$node.find("h4").text(ele.name);
			$node.find("p").text(ele.short_intro);
			$(".news ul").append($node);		
		});
	}
	return $(".news ul").children();
}

var colCount = parseInt($(".news ul").width()/$(".news li").outerWidth(true));
var colHeightArray = [];
for(var i=0;i<colCount;i++){
	colHeightArray[i] = 0;
}

function waterfall($node){
	$.each($node,function(){
		var _this = $(this);
		$(this).not(".hide").find("img").on("load",function(){
			var minValue = colHeightArray[0];
			var minIndex = 0;
			for(var i=0;i<colCount;i++){
				if(colHeightArray[i]<minValue){
					minValue = colHeightArray[i];
					minIndex = i;
				}
			}
			_this.css({
				left: minIndex*$(".news li").outerWidth(true),
				top: minValue
			});

			colHeightArray[minIndex] += _this.outerHeight(true);
			$(".news ul").height(Math.max.apply(null,colHeightArray));
		});		
	});
}