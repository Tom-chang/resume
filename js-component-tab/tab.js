function Tab (node){
  this.node = node;
  this.tabs = this.node.querySelector(".tabs");
  this.spans = this.tabs.querySelectorAll("span");
  this.contents = this.tabs.nextElementSibling.querySelectorAll(".content");
}

Tab.prototype = {
    constructor: Tab,
    init: function(){
    	this.bind();
    },
    bind: function(){
    	var _this = this;
    	this.tabs.addEventListener("click",function(e){
			var _index;
			_this.spans.forEach(function(ele,index){
				ele.classList.remove("active");
				if(e.target == ele){
					_index = index;
				}
			});
			e.target.classList.add("active");
			_this.contents.forEach(function(ele,index){
				ele.classList.remove("active");
				if(index === _index){
					ele.classList.add("active");
				}
			});
		});
    }
}

var tab1 = new Tab(document.querySelectorAll('.tab-container')[0]);
var tab2 = new Tab(document.querySelectorAll('.tab-container')[1]);

tab1.init();
tab2.init();