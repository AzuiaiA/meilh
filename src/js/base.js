$(function(){
	var $header_left = $(".header_left");//头部左边ul
	var $nav = $(".nav");//导航栏
	var $nav_left = $(".nav_left");//导航栏左边ul
	var $phone_app = $(".phone_app");//头部手机二维码
	var $nav_second_menu = $(".nav_second_menu");//导航栏二级菜单
	var $menu_con_imgBox = $(".menu_con_imgBox");//产品图片容器
	var $pro_menu_right = $(".pro_menu_right");//轮播图的容器
	var $pro_menu_left = $(".pro_menu_left");//活动的容器
	var $week_activities = $(".week_activities");//本周活动
	var $week_nav = $(".week_nav");//星期的导航
	var $click_toTop = $(".click_toTop");//固定在页面右边的回到顶部
	var $overcover = $(".overcover")//模块“即将推出活动”的遮罩层
	var $the_activities = $(".the_activities")//模块“即将推出活动”的活动容器

	$header_left.find("li").first().find("a").css({"color":"#f00"});
	$nav_left.find("li").first().find("a").css({"color":"#f00"});


	//刷新导航栏的购物车信息
	var $nav_right = $(".nav_right");
	var $shopping_bag = $nav_right.find(".shopping_bag");
	var shopping_bag_val = $shopping_bag.find("a").html();//购物车商品的件数

	var $price_total = $(".price_total").find("a");
	var price_total_val = $price_total.html();//购物车商品的总价

	//检测用户是否登录
	var $logined = $(".logined");
	var $login_li = $(".login_li");
	var cookie = document.cookie;
	var changeObj;
	//var reg = new RegExp(account+"\\*username=\\{.+\\}");
	var reg = new RegExp("\\*username=\\{.+\\}","g");
	var accountArr = cookie.match(reg);
	if(accountArr!=null){
		for(var i=0;i<accountArr.length;i++){
			var cutI = accountArr[i].indexOf("=");
			var newStr = accountArr[i].substring(cutI+1);
			changeObj = JSON.parse(newStr);
			if(changeObj.ynlogin==1){
				$logined.html("你好"+changeObj.username+",退出");
				$logined.show();
				$login_li.hide();
				break;
			}
		}
		if(changeObj.goods!=null){console.log("a")
		//改变导航栏的购物车的数值
			$shopping_bag.find("a").html(changeObj.goods.gCount);

			$price_total.html("￥"+changeObj.goods.gTotal);
		}
	}

	//点击购物车判断用户是否已经登录
	$nav_right.on("click",function(){
		if(changeObj==undefined){
			alert("请先登录");
			window.location.href="login.html";
		}else if(changeObj.ynlogin==0){
			alert("请先登录");
			window.location.href="login.html";
		}
	});


	//点击退出用户登录
	$logined.on("click",function(){
		changeObj.ynlogin = 0;
		var changeStr = JSON.stringify(changeObj);//设置值
		var keyStr = changeObj.username+"*username";//设置键
		document.cookie = keyStr+"="+changeStr+";path=/;";
		$logined.hide();
		$login_li.show();
	});
	

	//头部手机App的二维码显示隐藏
	var $header_right_a = $phone_app.find("a");
	$header_right_a.hover(function(){
		$(this).next("div").show();
	},function(){
		$(this).next("div").hide();
	});

	//滚动距离超过120像素时导航栏固定在页面顶部
	$(window).on("scroll",function(){
		if($(this).scrollTop()>=120){
			$nav.addClass("nav_scroll");//此类给导航栏设置了定位fixed
		}else{
			$nav.removeClass("nav_scroll");
		}
	})

	//让导航栏左边的ul中的a在hover的时候显示隐藏的二级菜单
	var $nav_left_a = $nav_left.find("a");
	$nav_left_a.hover(function(){
		//console.log(this);
		$(this).next(".nav_second_menu").show();
	},function(){
		$(this).next(".nav_second_menu").hide();
	});

	//让导航栏左边的ul中的二级菜单在hover的时候显示
	$nav_second_menu.hover(function(){
		//console.log(this);
		$(this).css({"display":"block"});
	},function(){
		$(this).css({"display":"none"});
	});

	//产品模块轮播图
	var index = -320;
	var $zuheImg = $pro_menu_right.find("img");
	var $choose_span = $(".choose_span").find("span");

	var timer = setInterval(focus,1000);

	function focus(){	
        if(index == -1280){
			$zuheImg.css({"left":-320});
			index = -320;
		}
		if(index == 0){
			$zuheImg.css({"left":-960});
			index = -960;
		}
		$choose_span.each(function(idx){
    		if(index==-320 && idx==1){
    			$(this).css({"background":"#f00"}).siblings().css({"background":"#f1ebee"});
    		}else if(index==-640 && idx==2){
    			$(this).css({"background":"#f00"}).siblings().css({"background":"#f1ebee"});
    		}else if(index==-960 && idx==0){
    			$(this).css({"background":"#f00"}).siblings().css({"background":"#f1ebee"});
    		}
    	});
    	index = index - 320;
        show();
    }

    function show(){
    	$zuheImg.animate({"left":index});

    }

    var $oButtons = $pro_menu_right.find("a");
    $oButtons.each(function(idx,ele){
        $(this).click(function(e){ 
            if($(this).hasClass('prev')){console.log("a");
                index = index + 320;
            }else{
                index = index - 320;
            }
            show();
            e.preventDefault();
        });
    });

    //点击span切换到对应的图片
	$choose_span.each(function(idx){
		$(this).on("click",function(e){
			$(this).css({"background":"#f00"}).siblings().css({"background":"#f1ebee"});
			if(idx==0){
				index = -320;
				show();
			}else if(idx==1){
				index = -640;
				show();
			}else{
				index = -960;
				show();
			}
			e.preventDefault();
		});
	});

	var $chooseBox = $(".choose_span");
	$chooseBox.on("click",function(e){
		e.preventDefault();
	});

	//当鼠标放在产品图片上的时候放大图片，显示遮罩层
	$menu_con_imgBox.hover(function(){
		$(this).find(".img_mask").show();
		$(this).find("img").stop().animate({
			"width":340,
			"height":212,
			"margin":-10
		});
	},function(){
		$(this).find(".img_mask").hide();
		$(this).find("img").stop().animate({
			"width":320,
			"height":192,
			"margin":0
		});
	});


	//把即将推出的活动中不是当前日期的活动隐藏，当前日期的活动显示
	$pro_menu_left.find(".week_activities").first().show().siblings(".week_activities").hide();


	//处理模块“即将推出活动”的导航列表动态显示星期几
	var myDate = new Date();
	//将第一个li的span值赋成“明天”
	var $week_nav_first = $week_nav.find(".week_nav_first");
	$week_nav_first.find("span").html("明天");
	//其余li的span赋值
	var $week_nav_notLi = $week_nav.find("li").not(".week_nav_first");
	$week_nav_notLi.each(function(idx){
		$(this).find("span").html(convertToWeek((myDate.getDay()+idx+2)%7));
	})
	//处理点击导航后内容显示的更替
	var $week_nav_li = $week_nav.find("li");
	var $week_nav_span = $week_nav_li.find("span");
	var $week_activities = $(".week_activities");
	$.each($week_nav_span,function(idx){
		var ele = $(this);
		var index = idx;
		$(this).on("click",function(){
			$week_activities.each(function(idx){
				if(index==idx){
					ele.parent().css({"borderBottom":"4px solid #000"}).siblings("li").css({"border":"none"});
					$(this).show().siblings(".week_activities").hide();
				}
			})
		})
	});

	//滚动窗口时当滚动距离超过300像素显示
	$(window).on("scroll",function(){//console.log($(this).scrollTop());
		if($(this).scrollTop() >= 400){
			$click_toTop.show();
		}else{
			$click_toTop.hide();
		}
	});

	//点击span时回到页面顶部
	var $click_toTop_span = $click_toTop.find("span");
	$click_toTop_span.on("click",function(){console.log("1");
		// $("body").animate({"scrollTop":0});
		//判断是否为火狐浏览器
		if (navigator.userAgent.indexOf('Firefox') >= 0){
		    document.documentElement.scrollTop=0;
		}
		else{
		   $("body").scrollTop(0);
		}
	});

	//模块“即将推出活动”的遮罩层显示和隐藏
	$the_activities.hover(function(){
		$(this).find(".overcover").show();
	},function(){
		$(this).find(".overcover").hide();
	});

	$overcover.hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
	});
});