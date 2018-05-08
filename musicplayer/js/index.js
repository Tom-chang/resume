function $(selector){
    return document.querySelector(selector);
}
function getMusicList(callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET","https://www.easy-mock.com/mock/5aee7c7753f838664b1d359f/musicplayer/music",true);
    xhr.onload = function(){
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){            
            callback(JSON.parse(xhr.responseText));
        } else {
            console.log("获取数据失败");
        }
    }
    xhr.onerror = function(){
        console.log("网络异常");
    }
    xhr.send();
}

var currentIndex = 0;
var musicIndex;
var musicList = [];
var interval;
var volHistory;
var audio = new Audio();
audio.autoplay = true;

getMusicList(function(list){   
    musicList = list; 
    loadMusic(list[currentIndex]);
    setPlayList(list);
});

function loadMusic(musicObj){
    audio.src = musicObj.src;    
    $(".music-panel .music-name").innerText = musicObj.title;
    $(".music-panel .author").innerText = musicObj.author;
    $(".cover").style.backgroundImage = "url(" + musicObj.img + ")";    
}

function setPlayList(list){
    var fragment = document.createDocumentFragment();
    list.forEach(function(val,i){        
        var elementLi = document.createElement("li");
        var elementA = document.createElement("a");
        elementA.innerText = list[i].author + "-" + list[i].title;
        if(currentIndex === i){
            elementA.classList.add("active");
        }
        elementLi.appendChild(elementA);
        fragment.appendChild(elementLi);
    })
    $(".music-list").appendChild(fragment);
}

$(".music-list").onclick = function(e){
    if(e.target.tagName.toLowerCase() === "a"){        
        for(var i=0;i<this.children.length;i++){
            this.children[i].children[0].classList.remove("active");
            if(this.children[i].children[0] === e.target){
                musicIndex = i;
            }
        }
        this.children[musicIndex].children[0].classList.add("active");
        loadMusic(musicList[musicIndex]);
    }
}

audio.ontimeupdate = function(){
    $(".music-panel .progress .progress-now").style.width = (this.currentTime/this.duration)*100 + "%";
};

audio.addEventListener("playing",function(){
    $(".music-panel .music-time-duration").innerText = secondFormat(this.duration)
    interval = setInterval(function(){
        $(".music-panel .music-time-now").innerText = secondFormat(audio.currentTime);
    },1000)
});

audio.addEventListener("pause",function(){
    clearInterval(interval);
});

audio.addEventListener("ended",function(){
    currentIndex = (++currentIndex) % musicList.length;
    for(var i=0;i<$(".music-list").children.length;i++){
        $(".music-list").children[i].children[0].classList.remove("active");
    }
    $(".music-list").children[currentIndex].children[0].classList.add("active");
    loadMusic(musicList[currentIndex]);
});

$(".music-panel .play").addEventListener("click",function(e){    
    if(audio.paused){
        audio.play();
        e.target.classList.remove("icon-play");
        e.target.classList.add("icon-pause");        
    } else {
        audio.pause();
        e.target.classList.remove("icon-pause");
        e.target.classList.add("icon-play");
    }
});
$(".music-panel .next").addEventListener("click",function(){
    currentIndex = (++currentIndex) % musicList.length;
    for(var i=0;i<$(".music-list").children.length;i++){
        $(".music-list").children[i].children[0].classList.remove("active");
    }
    $(".music-list").children[currentIndex].children[0].classList.add("active");
    loadMusic(musicList[currentIndex]);
});
$(".music-panel .previous").addEventListener("click",function(){
    currentIndex = (musicList.length + (--currentIndex)) % musicList.length;
    for(var i=0;i<$(".music-list").children.length;i++){
        $(".music-list").children[i].children[0].classList.remove("active");
    }
    $(".music-list").children[currentIndex].children[0].classList.add("active");
    loadMusic(musicList[currentIndex]);
});

$(".music-panel .bar").addEventListener("click",function(e){
    var percent = e.offsetX / parseInt(getComputedStyle(this).width);
    audio.currentTime = percent * audio.duration;
});

$(".music-panel .vol-bar").addEventListener("click",function(e){
    var percent = e.offsetX / parseInt(getComputedStyle(this).width);
    $(".music-panel .vol-now").style.width = percent*100 + "%";
    audio.volume = percent;
    volHistory = audio.volume;
});

audio.addEventListener("volumechange",function(){
    var percent = audio.volume / 1;
    $(".music-panel .vol-now").style.width = percent*100 + "%";
    if(this.volume > 0){
        $(".music-panel .vol-icon .iconfont").classList.remove("icon-mute");
        $(".music-panel .vol-icon .iconfont").classList.add("icon-volume");
    }
});

$(".music-panel .vol-icon").addEventListener("click",function(e){
    if(audio.volume === 0){
        audio.volume = volHistory;
    }else{
        audio.volume = 0;
    }
    e.target.classList.toggle("icon-volume")
    e.target.classList.toggle("icon-mute");
});

//将秒转换为分钟
function secondFormat(second){
    var min = Math.floor(second/60);
    var sec = Math.floor(second%60);
    sec = sec < 10 ? "0" + sec : sec;
    return min + ":" + sec;
}