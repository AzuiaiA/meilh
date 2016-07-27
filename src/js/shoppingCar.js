$(function(){
	var $header_left = $(".header_left");//头部左边ul
	var $nav = $(".nav");//导航栏
	var $nav_left = $(".nav_left");//导航栏左边ul
	var $phone_app = $(".phone_app");//头部手机二维码
	var $nav_second_menu = $(".nav_second_menu");//导航栏二级菜单

	var $shoppingCar_tab = $(".shoppingCar_tab");//购物车页签
	var $onSell = $(".onSell");//在售
	var $hopeList = $(".hopeList");//心愿单
	var $lost = $(".lost");//已失效

	$header_left.find("li").first().find("a").css({"color":"#f00"});
	$nav_left.find("li").first().find("a").css({"color":"#f00"});


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


	//
	var $shoppingCar_tab_span = $shoppingCar_tab.find("span");
	$shoppingCar_tab_span.each(function(idx){
		$(this).on("click",function(){
			if(idx==0){
				$onSell.show().siblings().hide();
				$(this).addClass("selected_span").siblings().removeClass("selected_span");
			}else if(idx==1){
				$hopeList.show().siblings().hide();
				$(this).addClass("selected_span").siblings().removeClass("selected_span");
			}else{
				$lost.show().siblings().hide();
				$(this).addClass("selected_span").siblings().removeClass("selected_span");
			}
		});
	});

});