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
	var $pro_button = $(".pro_button").find("a");//加入购物车按钮
	
	$header_left.find("li").first().find("a").css({"color":"#f00"});
	$nav_left.find("li").first().find("a").css({"color":"#f00"});


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
		//刷新导航栏的购物车信息
		if(changeObj.goods!=null){
		//改变导航栏的购物车的数值
			$shopping_bag.find("a").html(changeObj.goods.gCount);

			$price_total.html("￥"+changeObj.goods.gTotal);
		}
	}

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
		//console.log(pos.left,pos.top,e.offsetX,e.offsetY);
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
		var pos = {left:e.pageX-$imgBox.offset().left-100,top:e.pageY-$imgBox.offset().top-100};
		var $img = $(".show_big").find("img");
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
		$bigerGlass.css({
			"top":pos.top,
			"left":pos.left
		});
		//console.log(imgPos.top,imgPos.left);
		$img.css({
			"position":"absolute",
			"top":-(pos.top)*2,
			"left":-(pos.left)*2
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
		//console.log($newBigImgSrc);
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
	});


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

	//点击提交到购物车
	$pro_button.on("click",function(){
		var tittle = $(".pro_info_title").html();
		var gName = $(".pro_name").html();
		var unitPrice = $(".now_price").html();
		var gCount = $count_num.html();
		unitPrice = unitPrice.substring(1);
		var gTotal = gCount*unitPrice;

		if(changeObj==undefined){
			alert("请先登录");
			window.location.href="login.html";
		}else if(changeObj.ynlogin==0){
			alert("请先登录");
			window.location.href="login.html";
		}else{
			if(changeObj.goods==null){
			//增加商品属性(有标题，名字，单价，数量，总价)
				changeObj.goods = {
									"tittle":tittle,
									"gName":gName,
									"unitPrice":unitPrice,
									"gCount":gCount,
									"gTotal":gTotal
								};
			}else{
				console.log(gCount,changeObj.goods.gCount);
				changeObj.goods.gCount = parseInt(changeObj.goods.gCount) + parseInt(gCount);
				changeObj.goods.gTotal = changeObj.goods.gTotal + gTotal;
			}

			//将商品的属性存入cookie
			var changeStr = JSON.stringify(changeObj);//设置值
			var keyStr = changeObj.username+"*username";//设置键
			document.cookie = keyStr+"="+changeStr+";path=/;";
			

			
			//改变导航栏的购物车的数值
			$shopping_bag.find("a").html(changeObj.goods.gCount);

			$price_total.html("￥"+changeObj.goods.gTotal);
			return false;	
		}
	});

});