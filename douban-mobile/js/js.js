var top250  = {
    init: function(){
        this.$main = $("main");
        this.$ele = $("#top250");
        this.movieIndex = 0;
        this.isLoading = false;
        this.isFinish = false;

        this.bind();
        this.start();
    },
    bind: function(){
        var _this = this;
        var clock;
        _this.$main.scroll(function(){
            if(clock){
                clearTimeout(clock);
            }
            clock = setTimeout(function(){
                if(_this.$ele.height() - 10 <= _this.$main.scrollTop() + _this.$main.height()){
                    _this.start();
                }
            },300);            
        });
    },
    start: function(){
        var _this = this;
        _this.getdata(function(data){
            _this.render(data);
        });
    },
    getdata: function(callback){
        var _this = this;
        if(_this.isLoading) return;
        if(_this.isFinish) return;
        _this.isLoading = true;
        _this.$ele.find('.loading').show();
        $.ajax({
            url: "https://api.douban.com/v2/movie/top250",
            method: "GET",
            data: {
                start: _this.movieIndex,
                count: 20
            },
            dataType: "jsonp"
            }).done(function(databack){
                // console.log("这是ajax成功后："+_this.movieIndex,databack);                
                _this.movieIndex += 20;
                if(_this.movieIndex >= databack.total){
                    _this.isFinish = true;
                }
                callback&&callback(databack);
            }).fail(function(){
                console.log("获取信息失败");
            }).always(function(){
                _this.isLoading = false;
                _this.$ele.find('.loading').hide();
            });
    },
    render: function(data){
        var _this = this;
        data.subjects.forEach(movie => {
            var html = '<li>\
                <a>\
                <div class="img">\
                    <img src="" alt="">\
                </div>\
                <div class="information">\
                    <div class="title"></div>\
                    <div class="score"><span class="score-red"></span>分<span class="collection"></span></div>\
                    <div class="year"></div>\
                    <div class="director">导演：<span></span></div>\
                    <div class="actor">主演：<span></span></div>\
                </div>\
                </a>\
            </li>';
            var $node = $(html);
            $node.find("a").attr("href",movie.alt);
            $node.find("img").attr("src",movie.images.medium);
            $node.find(".title").text(movie.title);
            $node.find(".score .score-red").text(movie.rating.average);
            $node.find(".score .collection").text(" / " + movie.collect_count + "收藏");
            $node.find(".year").text(movie.year + " / " + movie.genres.join(" / "));
            $node.find(".director span").text(function(){
                var directorAll = [];
                movie.directors.forEach(direct => {
                    directorAll.push(direct.name);
                });
                return directorAll.join("、");
            });
            $node.find(".actor span").text(function(){
                var actorsAll = [];
                movie.casts.forEach(actors => {
                    actorsAll.push(actors.name);
                })
                return actorsAll.join("、");
            });
            _this.$ele.find(".list ul").append($node);
            });
    }
};

var usBox  = {
    init: function(){
        this.$main = $("main");
        this.$ele = $("#us-box");
        this.movieIndex = 0;
        this.isLoading = false;
        this.isFinish = false;

        this.bind();
        this.start();
    },
    bind: function(){
        var _this = this;
        var clock;
        _this.$main.scroll(function(){
            if(clock){
                clearTimeout(clock);
            }
            clock = setTimeout(function(){
                if(_this.$ele.height() - 10 <= _this.$main.scrollTop() + _this.$main.height()){
                    _this.start();
                }
            },300);            
        });
    },
    start: function(){
        var _this = this;
        _this.getdata(function(data){
            _this.render(data);
        });
    },
    getdata: function(callback){
        var _this = this;
        if(_this.isLoading) return;
        if(_this.isFinish) return;
        _this.isLoading = true;
        _this.$ele.find('.loading').show();
        $.ajax({
            url: "https://api.douban.com/v2/movie/us_box",
            method: "GET",            
            dataType: "jsonp"
            }).done(function(databack){
                // console.log("这是ajax成功后："+_this.movieIndex,databack);                
                _this.movieIndex += 20;
                if(_this.movieIndex >= databack.subjects.length){
                    _this.isFinish = true;
                }
                callback&&callback(databack);
            }).fail(function(){
                console.log("获取信息失败");
            }).always(function(){
                _this.isLoading = false;
                _this.$ele.find('.loading').hide();
            });
    },
    render: function(data){
        var _this = this;
        data.subjects.forEach(movie => {
            movie = movie.subject;
            var html = '<li>\
                <a>\
                <div class="img">\
                    <img src="" alt="">\
                </div>\
                <div class="information">\
                    <div class="title"></div>\
                    <div class="score"><span class="score-red"></span>分<span class="collection"></span></div>\
                    <div class="year"></div>\
                    <div class="director">导演：<span></span></div>\
                    <div class="actor">主演：<span></span></div>\
                </div>\
                </a>\
            </li>';
            var $node = $(html);
            $node.find("a").attr("href",movie.alt);
            $node.find("img").attr("src",movie.images.medium);
            $node.find(".title").text(movie.title);
            $node.find(".score .score-red").text(movie.rating.average);
            $node.find(".score .collection").text(" / " + movie.collect_count + "收藏");
            $node.find(".year").text(movie.year + " / " + movie.genres.join(" / "));
            $node.find(".director span").text(function(){
                var directorAll = [];
                movie.directors.forEach(direct => {
                    directorAll.push(direct.name);
                });
                return directorAll.join("、");
            });
            $node.find(".actor span").text(function(){
                var actorsAll = [];
                movie.casts.forEach(actors => {
                    actorsAll.push(actors.name);
                })
                return actorsAll.join("、");
            });
            _this.$ele.find(".list ul").append($node);
            });
    }
};

var searchs  = {
    init: function(){
        this.$main = $("main");
        this.$ele = $("#search");
        this.keyword = "";
        this.status = 0;
        this.movieIndex = 0;
        this.isLoading = false;
        this.isFinish = false;

        this.bind();
    },
    bind: function(){
        var _this = this;
        var clock;
        _this.$ele.find("button").on("click",function(){
            _this.keyword = _this.$ele.find("input").val();
            if(_this.keyword === ""){
                _this.$ele.find(".msg").fadeIn().text("请输入关键字");
            }else{
                _this.$ele.find(".msg").fadeOut();
                _this.status = 1;
                _this.start();
            }
            //
        });

        _this.$main.scroll(function(){
            if(clock){
                clearTimeout(clock);
            }
            clock = setTimeout(function(){
                if(_this.$ele.height() - 10 <= _this.$main.scrollTop() + _this.$main.height() + 55){
                    _this.status = 0;
                    _this.start();
                }
            },300);            
        });
    },
    start: function(){
        var _this = this;
        _this.getdata(function(data){
            _this.render(data);
        });
    },
    getdata: function(callback){
        var _this = this;
        if(_this.status === 1){
            _this.movieIndex = 0;
        }else{
            if(_this.isFinish) return;
        }
        if(_this.isLoading) return;
        _this.isLoading = true;
        _this.$ele.find('.loading').show();
        $.ajax({
            url: "https://api.douban.com/v2/movie/search",
            method: "GET",
            data: {
                q: _this.keyword,
                start: _this.movieIndex,
                count: 20
            },            
            dataType: "jsonp"
            }).done(function(databack){
                // console.log("这是ajax成功后："+_this.movieIndex,databack);                
                _this.movieIndex += 20;
                if(_this.movieIndex >= databack.total){
                    _this.isFinish = true;
                }
                callback&&callback(databack);
            }).fail(function(){
                console.log("获取信息失败");
            }).always(function(){
                _this.isLoading = false;
                _this.$ele.find('.loading').hide();
            });
    },
    render: function(data){
        var _this = this;
        if(this.status === 1){
            this.$ele.find(".list ul").empty();
        }
        
        data.subjects.forEach(movie => {
            var html = '<li>\
                <a>\
                <div class="img">\
                    <img src="" alt="">\
                </div>\
                <div class="information">\
                    <div class="title"></div>\
                    <div class="score"><span class="score-red"></span>分<span class="collection"></span></div>\
                    <div class="year"></div>\
                    <div class="director">导演：<span></span></div>\
                    <div class="actor">主演：<span></span></div>\
                </div>\
                </a>\
            </li>';
            var $node = $(html);
            $node.find("a").attr("href",movie.alt);
            $node.find("img").attr("src",movie.images.medium);
            $node.find(".title").text(movie.title);
            $node.find(".score .score-red").text(movie.rating.average);
            $node.find(".score .collection").text(" / " + movie.collect_count + "收藏");
            $node.find(".year").text(movie.year + " / " + movie.genres.join(" / "));
            $node.find(".director span").text(function(){
                var directorAll = [];
                movie.directors.forEach(direct => {
                    directorAll.push(direct.name);
                });
                return directorAll.join("、");
            });
            $node.find(".actor span").text(function(){
                var actorsAll = [];
                movie.casts.forEach(actors => {
                    actorsAll.push(actors.name);
                })
                return actorsAll.join("、");
            });
            _this.$ele.find(".list ul").append($node);
            });
    }
};

var App = {
    init: function(){
        this.$tabs = $("footer li");
        this.$section = $("section");

        this.bind();
        top250.init();
        usBox.init();
        searchs.init();        
    },
    bind: function(){
        var _this = this;
        _this.$tabs.on("click",function(){
            _this.$section.eq($(this).index()).fadeIn().siblings().hide();
            $(this).addClass("active").siblings().removeClass("active");
        });
    }
}

App.init();