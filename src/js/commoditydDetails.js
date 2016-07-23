$(function(){
	var $header_left = $(".header_left");//头部左边ul
	var $nav = $(".nav");//导航栏
	var $nav_left = $(".nav_left");//导航栏左边ul
	var $phone_app = $(".phone_app");//头部手机二维码
	var $nav_second_menu = $(".nav_second_menu");//导航栏二级菜单
	var $imgBox = $(".imgBox");//商品大图
	var $overolay = $(".overolay");//大图的遮罩层
	var $small_imgBox = $(".small_imgBox");//商品小图
	var $show_big = $(".show_big");//显示大图
	var $bigerGlass = $(".bigerGlass");//放大镜
	var $count_choose = $(".count_choose");//商品数量
	
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

	//商品放大镜
	$overolay.on("mouseenter",function(e){
		var $nowImgSrc = $overolay.next("img").attr("src");
		var $Img = $("<img/>");
		var pos = {left:e.offsetX-100,top:e.offsetY-100}
		if(pos.left<0){
			pos.left = 0;
		}
		if(pos.left>280){
			pos.left = 280;
		}
		if(pos.top<0){
			pos.top = 0;
		}
		if(pos.top>440){
			pos.top = 440;
		}
		console.log(pos.left,pos.top,e.offsetX,e.offsetY);
		$bigerGlass.css({
			"top":pos.top,
			"left":pos.left
		});
		$bigerGlass.show();
		$show_big.show();
		$Img.attr("src",$nowImgSrc);
		$Img.css({
			"width":960,
			"height":1280
		});
		$Img.appendTo($show_big);

	});

	$overolay.on("mousemove",function(e){
		var pos = {left:e.offsetX-100,top:e.offsetY-100};
		var imgPos = {left:e.offsetX,top:e.offsetY};
		var $img = $(".show_big").find("img");
		if(pos.left<0){
			pos.left = 0;
		}
		if(pos.left>280){
			pos.left = 280
		}
		if(pos.top<0){
			pos.top = 0;
		}
		if(pos.top>440){
			pos.top = 440
		}
		$bigerGlass.css({
			"top":pos.top,
			"left":pos.left
		});
		$img.css({
			"position":"absolute",
			"top":-imgPos.top,
			"left":-imgPos.left
		});
	});

	$overolay.on("mouseleave",function(){
		$show_big.find("img").remove();
		$show_big.hide();
		$bigerGlass.hide();
	});

	//点击商品小图切换商品大图
	var $small_li = $small_imgBox.find("li");
	$small_li.on("click",function(e){
		var $newBigImgSrc = $(this).find("img").attr("src");
		console.log($newBigImgSrc);
		$newBigImgSrc = $newBigImgSrc.replace("a.jpg",".jpg");
		$imgBox.children("img").attr("src",$newBigImgSrc);
		return false;
	});

	//点击增加商品的数量
	var $count_num = $count_choose.find(".count_num");
	var $sub_span = $count_num.prev("span");
	var $add_span = $count_num.next("span");
	var $tip_i = $count_choose.find("i");
	var count = $count_num.html();
	$sub_span.on("click",function(){
		count--;
		if(count<1){
			count = 1;
			return false;
		}else{
			$count_num.html(count);
		}
	});
	$add_span.on("click",function(){
		count++;
		if(count>5){
			count = 5;
			$tip_i.show();
			setTimeout(function(){
				$tip_i.hide();
			},3000);
			return false;
		}else{
			$count_num.html(count);
		}
	})
});