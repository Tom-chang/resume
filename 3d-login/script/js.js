function $(selector){
	return document.querySelector(selector);
}

//点击头像弹出登录框
$("#login").addEventListener("click",function(e){
	e.stopPropagation();	//防止冒泡到document
	$(".flip-modal").style.display = "block";
})

//点击空白地方登录弹框消失

function modalHide(){
	$(".flip-modal").style.display = "none";
}

function documentClick(){
	document.addEventListener("click",modalHide);
}

document.addEventListener("transitionend",documentClick); //过渡完成之后执行documentClick函数

// 点击注册和登录切换
$(".flip-modal").addEventListener("click",function(e){
	e.stopPropagation();	//防止冒泡到document
	if(e.target.classList.contains("reg")){
		$(".flip-modal").classList.remove("login");
		$(".flip-modal").classList.add("register");
		document.removeEventListener("click",modalHide);
	}
	if(e.target.classList.contains("login")){
		$(".flip-modal").classList.remove("register");
		$(".flip-modal").classList.add("login");
		document.removeEventListener("click",modalHide);
	}
	if(e.target.classList.contains("close")){
		$(".flip-modal").style.display = "none";
	}
});

//表单验证
$(".modal-login form").addEventListener("submit",function(e){
	e.preventDefault();
	if(!(/^\w{3,8}$/).test($(".modal-login input[name=username]").value)){
		$(".modal-login .errormsg").innerText = "用户名需输入3-8个字符，包括字母数字下划线";
		return false;
	}
	if(!(/^\w{6,10}$/).test($(".modal-login input[name=pwd]").value)){
		$(".modal-login .errormsg").innerText = "密码需输入6-10个字符，包括字母数字下划线";
		return false;
	}
	this.submit();
});

$(".modal-reg form").addEventListener("submit",function(e){
	e.preventDefault();
	if(!(/^\w{3,8}$/).test($(".modal-reg input[name=username]").value)){
		$(".modal-reg .errormsg").innerText = "用户名需输入3-8个字符，包括字母数字下划线";
		return false;
	}
	if(!(/^\w{6,10}$/).test($(".modal-reg input[name=pwd]").value)){
		$(".modal-reg .errormsg").innerText = "密码需输入6-10个字符，包括字母数字下划线";
		return false;
	}
	if(!(/^\w{6,10}$/).test($(".modal-reg input[name=repwd]").value)){
		$(".modal-reg .errormsg").innerText = "请确认密码";
		return false;
	}
	if($(".modal-reg input[name=repwd]").value !== $(".modal-reg input[name=pwd]").value){
		$(".modal-reg .errormsg").innerText = "两次密码输入不一致";
		return false;
	}
	this.submit();
});
