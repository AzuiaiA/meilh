/*----------------------------------------共用js模块------------------------------------------------*/
$(function(){
	var $header_left = $(".header_left");//头部左边ul
	var $nav = $(".nav");//导航栏
	var $nav_left = $(".nav_left");//导航栏左边ul
	var $phone_app = $(".phone_app");//头部手机二维码
	var $nav_second_menu = $(".nav_second_menu");//导航栏二级菜单

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
});
/*------------------------------------商品详情页模块---------------------------------------------*/
jQuery(function($){
	var $imgBox = $(".imgBox");//商品大图
	var $overolay = $(".overolay");//大图的遮罩层
	var $small_imgBox = $(".small_imgBox");//商品小图
	var $show_big = $(".show_big");//显示大图
	var $bigerGlass = $(".bigerGlass");//放大镜
	var $count_choose = $(".count_choose");//商品数量
	var $pro_button = $(".pro_button").find("a");//加入购物车按钮
	
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
			alert("添加成功");
			//若账户内无此商品
			if(changeObj.goods==null){
			//增加商品属性(有标题，名字，单价，数量，总价)
				changeObj.goods = {
									"tittle":tittle,
									"gName":gName,
									"unitPrice":unitPrice,
									"gCount":gCount,
									"gTotal":gTotal
								};
			}else{//若账户内有此商品
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
/*---------------------------------------首页模块-----------------------------------------*/
$(function(){
	var $menu_con_imgBox = $(".menu_con_imgBox");//产品图片容器
	var $pro_menu_right = $(".pro_menu_right");//轮播图的容器
	var $pro_menu_left = $(".pro_menu_left");//活动的容器
	var $week_activities = $(".week_activities");//本周活动
	var $week_nav = $(".week_nav");//星期的导航
	var $click_toTop = $(".click_toTop");//固定在页面右边的回到顶部
	var $overcover = $(".overcover")//模块“即将推出活动”的遮罩层
	var $the_activities = $(".the_activities")//模块“即将推出活动”的活动容器

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
	var reg = new RegExp("\\*username=\\{.+\\}","g");//取出所有的账户名
	var accountArr = cookie.match(reg);
	if(accountArr!=null){//如果有此账户
		for(var i=0;i<accountArr.length;i++){
			var cutI = accountArr[i].indexOf("=");
			var newStr = accountArr[i].substring(cutI+1);
			changeObj = JSON.parse(newStr);//讲字符串变为JSON类型
			if(changeObj.ynlogin==1){//如果这个账户已经登录了
				$logined.html("你好"+changeObj.username+",退出");
				$logined.show();
				$login_li.hide();
				break;
			}
		}
		if(changeObj.goods!=null){//console.log("a")
		//改变导航栏的购物车的数值
			$shopping_bag.find("a").html(changeObj.goods.gCount);

			$price_total.html("￥"+changeObj.goods.gTotal);
		}
	}

	//点击购物车判断用户是否已经登录
	$nav_right.on("click",function(){
		if(changeObj==undefined){
			alert("请先登录");
			window.location.href="html/login.html";
		}else if(changeObj.ynlogin==0){
			alert("请先登录");
			window.location.href="html/login.html";
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

	//产品模块轮播图
	var index = -320;
	var $zuheImg = $pro_menu_right.find("img");
	var $choose_span = $(".choose_span").find("span");

	var timer = setInterval(focus,2000);

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
            if($(this).hasClass('prev')){//console.log("a");
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
	$click_toTop_span.on("click",function(){//console.log("1");
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
/*--------------------------------------登录模块--------------------------------------*/
var chArr = ["1","2","3","4","5","6","7","8","9","A","B","C","D","E","F",
			"G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U",
			"V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j",
			"k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
		
var imgArr = ["_01.jpg","_02.jpg","_03.jpg","_04.jpg","_05.jpg","_06.jpg",
			"_07.jpg","_08.jpg","_09.jpg","max_01.jpg","max_02.jpg",
			"max_03.jpg","max_04.jpg","max_05.jpg","max_06.jpg",
			"max_07.jpg","max_09.jpg","max_10.jpg","max_11.jpg",
			"max_12.jpg","max_13.jpg","max_14.jpg","max_15.jpg",
			"max_16.jpg","max_17.jpg","max_18.jpg","max_19.jpg",
			"max_20.jpg","max_21.jpg","max_22.jpg","max_24.jpg",
			"max_25.jpg","max_26.jpg","max_27.jpg","max_28.jpg",
			"min_01.jpg","min_02.jpg","min_03.jpg","min_04.jpg",
			"min_05.jpg","min_06.jpg","min_07.jpg","min_08.jpg",
			"min_09.jpg","min_10.jpg","min_11.jpg","min_12.jpg",
			"min_13.jpg","min_14.jpg","min_15.jpg","min_16.jpg",
			"min_17.jpg","min_18.jpg","min_19.jpg","min_20.jpg",
			"min_21.jpg","min_22.jpg","min_23.jpg","min_24.jpg",
			"min_25.jpg","min_26.jpg"];

$(function(){
	var $account = $("#account");//用户账号输入框
	var $accError = $("#accError");//账号输入错误的提示
	var $password = $("#password");//密码输入框
	var $passError = $("#passError");//密码输入错误的提示
	var $iden_code = $(".iden_code");//验证码
	var $autoIdenCode = $("#autoIdenCode");//验证码的输入框
	var $idenCodeError = $("#idenCodeError");//再输入密码输入错误的提示
	var $auto_login = $(".auto_login");//自动登录框
	var $login_btn = $(".login_btn").find("a");//登录按钮

	//从cookie中取到用户的数据(账号和密码)



	//判断账号是否输入正确
	function checkAccount(){
		var $accountVal = $account.val();
		if(/^1[0-9]{10}$/.test($accountVal) || /^\w+@\w+(\.\w+)+$/.test($accountVal)){
			$accError.hide();
			return true;
		}else{
			$accError.html("请输入正确的手机号和邮箱");
			$accError.show();
			return false;
		}
	}

	$account.on("blur",function(){
		checkAccount();
	});

	//判断密码是否输入正确
	function checkPassword(){
		var $passwordVal = $password.val();
		if(/^\w\w{4,18}\w$/.test($passwordVal)){
			$passError.hide();
			return true;
		}else{
			$passError.html("密码要在6~20位之间并不能用特殊符号");
			$passError.show();
			return false;
		}
	}
	$password.on("blur",function(){
		checkPassword();
	});

	
	var correctCode = "";//用于记录产生的4位验证码
	var $idenImg = $iden_code.find("img");
	//生成随机的4位验证码
	function ranIdenCode(){
		correctCode = "";
		$idenImg.each(function(){
			var index = randomNum(0,59);
			$(this).attr("src","../img/"+imgArr[index]);
			correctCode +=chArr[index];
		});
	}
	ranIdenCode();
	

	//判断验证码是否输入正确
	function checkIdenCode(){
		$autoIdenCodeVal = $autoIdenCode.val();
		if($autoIdenCodeVal != correctCode){
			$idenCodeError.html("您输入的验证码有误");
			$idenCodeError.show();
			ranIdenCode();//重新生成一组验证码
			return false;
		}else{
			$idenCodeError.hide();
			return true;
		}
	}
	$autoIdenCode.on("blur",function(){
		checkIdenCode();
	});


	//点击邮件发送框背景变黑
	var clickCount = 0;
	var $auto_login_span = $auto_login.find("span");
	$auto_login.on("click",function(){
		if(clickCount){
			clickCount = 0;
			$auto_login_span.css("background","#fff");
		}else{
			clickCount = 1;
			$auto_login_span.css("background","#000");
		}
	});


	function matchAccount(account,password){
		var cookie = document.cookie;
		//var reg = new RegExp(account+"\\*username=\\{.+\\}");
		var reg = new RegExp(account+"\\*username=\\{.+\\}");
		var accountArr = cookie.match(reg);
		var accountZero = accountArr[0];
		var cutI = accountZero.indexOf("=");
		var newStr = accountZero.substring(cutI+1);
		var changeObj = JSON.parse(newStr);
		if(changeObj.username==account&&changeObj.password==password){
			changeObj.ynlogin = 1;
			var changeStr = JSON.stringify(changeObj);//设置值
			var keyStr = account+"*username";//设置键
			document.cookie = keyStr+"="+changeStr+";path=/;";
			//console.log(document.cookie);
			return true;
		}else{
			return false;
		}
	}
	
	//验证是否全部通过
	$login_btn.on("click",function(e){//console.log(e.target);
		var $accountVal = $account.val();
		var $passwordVal = $password.val();
		if(!(checkAccount()&&checkPassword()&&checkIdenCode())){
			console.log("d");
			return false;
		}else{
			var tof = matchAccount($accountVal,$passwordVal);
			if(tof){
				alert("登录成功");
			}else{
				alert("账户或密码输入不正确");
				return false;
			}	
		}				
	});
	/*$(document).click(function(e){
		console.log(e.target);
	})*/
});
/*------------------------------------商品列表页模块------------------------------------------*/
$(function(){
	var $choose_right = $(".choose_right");//复选框ul
	var $pro_pic = $(".pro_pic");//商品列表
	var $pro_img = $(".pro_img");//大图容器
	var $hover_img = $(".hover_img");//小图容器
	var $grade = $("#grade");//分数显示页码
	var $turn_left = $(".turn_left");//商品列表上一页按钮
	var $turn_right = $(".turn_right");//商品列表下一页按钮
	var $prev_page = $(".prev_page")//底部导航栏的上一页按钮
	var $next_page = $(".next_page")//底部导航栏的下一页按钮
	var $page_num = $("#page_num")//底部导航栏的输入框
	var $confirm = $("#confirm");//底部导航栏的确定按钮

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

	//封装：删除未选的种类，添加选择的种类
	var $select_attr = $(".select_attr");
	var $selected_attr = $(".selected_attr");//已选的种类
	var li_count = 0;
	function chooseType(){
		$selected_attr.empty();
		li_count = 0;
		$choose_right_li.each(function(){
			if($(this).find("span").hasClass("yes_choose")){
				var txt = $(this).find("i").html();
				$("<li/>").addClass("selected_attr_li").html("种类："+txt).appendTo($selected_attr);
				li_count++;
			}
		});
		if(li_count==0){
			$select_attr.hide();
		}else{
			$select_attr.show();
		}
	}

	//点击已添加的种类可以进行删除种类
	//因为li是动态生成的，不能确定li是否存在，所以使用了事件委托
	$selected_attr.on("click","li",function(){
		var attrTxt = $(this).html();
		$choose_right_li.each(function(){//找到可选属性中与点击的li内容匹配的删除高亮
			var cLi= $(this).find("i").html();
			if(attrTxt == ("种类："+cLi)){
				$(this).find("span").removeClass("yes_choose");
				$(this).find("span").addClass("no_choose");
			}
		});
		$(this).remove();//删除已添加的li
		chooseType();//刷新可选择的复选框
	});

	//点击复选框让框高亮
	var $choose_right_li = $choose_right.find("li");
	$choose_right_li.on("click",function(){
		if($(this).find("span").hasClass("no_choose")){
			var txt = $(this).find("i").html();
			$(this).find("span").removeClass("no_choose");
			$(this).find("span").addClass("yes_choose");
			chooseType();
		}else{
			$(this).find("span").removeClass("yes_choose");
			$(this).find("span").addClass("no_choose");
			chooseType();
		}	
	});


	//按照页数生成页码按钮
	var page = 3;//这里假定页码为3，实际中取服务器页码数
	var pro_total = 0;//商品总数
	var $productTotal = $("#productTotal");
	var $proCount = $(".pro_pic").find(".every_pro");//全部商品
	var $pageTotal = $("#pageTotal");//总页数
	$pageTotal.html(page);
	for(var i=0;i<page;i++){
		if(i==0){
			var newSpan = $("<span/>").addClass("page_span high_light").html(i+1);
			newSpan.insertBefore($next_page);
		}else{
			var newSpan = $("<span/>").addClass("page_span").html(i+1);
			newSpan.insertBefore($next_page);
		}		
	}
	var $page_span = $(".page_span");

	//统计商品总数
	$proCount.each(function(){
		pro_total++;
	});
	$productTotal.html(pro_total);

	//hover大图显示小图容器
	$pro_img.hover(function(){
		$(this).prev(".hover_img").show();
	},function(){
		$(this).prev(".hover_img").hide();
	});

	$hover_img.hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
	});

	//hover小图切换大图
	var $hover_img_span = $hover_img.find("span");//装小图的span
	$hover_img_span.on("mouseenter",function(){
		var spanImgSrc = $(this).find("img").attr("src");
		var newSrc = spanImgSrc.replace("a.jpg",".jpg");
		$(this).parent().next(".pro_img").find("img").attr("src",newSrc);
	});

	//商品列表分页显示
	//封装：按照传入的页码改变页面
	function changePage(index){
		$pro_pic_list.each(function(idx){
			if(idx == (index-1)){
				$(this).show().siblings().hide();
				return false;
			}
		});
	}

	//封装：按照传入的页码改变分数显示的页码
	function changeGrade(index){
		$grade.html(index+"/"+page);
	}

	//封装：按照传入的页码改变底部导航的span高亮
	function changeHighLight(index){
		$page_span.each(function(idx){
			if(idx == (index-1)){
				$(this).addClass("high_light").siblings().removeClass("high_light");
				return false;
			}
		});
	}

	//封装：按照传入的页码改变底部导航的输入框
	function changeBotInput(index){
		$page_num.val(index);
	}

	//第一页默认在页面加载时就显示
	var pageNow = 1;//代表当前在第几页(开始为第一页)
	var $pro_pic_list = $pro_pic.find(".pro_pic_list");
	$pro_pic_list.hide();
	$pro_pic_list.first().show();

	//点击上一页进行翻页,改变与页码有关的位置
	$prev_page.on("click",function(){
		if(pageNow == 1){
			return false;
		}else{
			pageNow--;
			changePage(pageNow);
			changeHighLight(pageNow);
			changeBotInput(pageNow);
			changeGrade(pageNow);
		}
	});

	//点击下一页进行翻页,改变与页码有关的位置
	$next_page.on("click",function(){
		if(pageNow == page){
			return false;
		}else{
			pageNow++;
			changePage(pageNow);
			changeHighLight(pageNow);
			changeBotInput(pageNow);
			changeGrade(pageNow);
		}
	});

	//点击上一页进行翻页,改变与页码有关的位置
	$turn_left.on("click",function(){
		if(pageNow == 1){
			return false;
		}else{
			pageNow--;
			changePage(pageNow);
			changeHighLight(pageNow);
			changeBotInput(pageNow);
			changeGrade(pageNow);
		}
	});

	//点击下一页进行翻页,改变与页码有关的位置
	$turn_right.on("click",function(){
		if(pageNow == page){
			return false;
		}else{
			pageNow++;
			changePage(pageNow);
			changeHighLight(pageNow);
			changeBotInput(pageNow);
			changeGrade(pageNow);
		}
	});

	//点击底部导航栏的span切换到对应的页面
	$page_span.each(function(){
		$(this).on("click",function(){
			var i = $(this).html();
			changePage(i);
			changeHighLight(i);
			changeBotInput(i);
			changeGrade(i);
		});
	});

	//点击底部导航栏的确定按钮切换到输入框的页面
	$confirm.on("click",function(){
		var inputPage = $page_num.val();
		changePage(inputPage);
		changeHighLight(inputPage);
		changeBotInput(inputPage);
		changeGrade(inputPage);
	});

});
/*-----------------------------------注册模块------------------------------------------*/

var chArr = ["1","2","3","4","5","6","7","8","9","A","B","C","D","E","F",
			"G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U",
			"V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j",
			"k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
		
var imgArr = ["_01.jpg","_02.jpg","_03.jpg","_04.jpg","_05.jpg","_06.jpg",
			"_07.jpg","_08.jpg","_09.jpg","max_01.jpg","max_02.jpg",
			"max_03.jpg","max_04.jpg","max_05.jpg","max_06.jpg",
			"max_07.jpg","max_09.jpg","max_10.jpg","max_11.jpg",
			"max_12.jpg","max_13.jpg","max_14.jpg","max_15.jpg",
			"max_16.jpg","max_17.jpg","max_18.jpg","max_19.jpg",
			"max_20.jpg","max_21.jpg","max_22.jpg","max_24.jpg",
			"max_25.jpg","max_26.jpg","max_27.jpg","max_28.jpg",
			"min_01.jpg","min_02.jpg","min_03.jpg","min_04.jpg",
			"min_05.jpg","min_06.jpg","min_07.jpg","min_08.jpg",
			"min_09.jpg","min_10.jpg","min_11.jpg","min_12.jpg",
			"min_13.jpg","min_14.jpg","min_15.jpg","min_16.jpg",
			"min_17.jpg","min_18.jpg","min_19.jpg","min_20.jpg",
			"min_21.jpg","min_22.jpg","min_23.jpg","min_24.jpg",
			"min_25.jpg","min_26.jpg"];

$(function(){
	var $account = $("#account");//用户账号输入框
	var $accError = $("#accError");//账号输入错误的提示
	var $password = $("#password");//密码输入框
	var $passError = $("#passError");//密码输入错误的提示
	var $repassword = $("#repassword");//再输入密码输入框
	var $repassError = $("#repassError");//再输入密码输入错误的提示
	var $iden_code = $(".iden_code");//验证码
	var $autoIdenCode = $("#autoIdenCode");//验证码的输入框
	var $idenCodeError = $("#idenCodeError");//再输入密码输入错误的提示
	var $login_btn = $(".login_btn").find("a");//立即注册按钮
	var $send_email = $(".send_email");//发送邮件框

	//判断账号是否输入正确
	function checkAccount(){
		var $accountVal = $account.val();
		if(/^1[0-9]{10}$/.test($accountVal) || /^\w+@\w+(\.\w+)+$/.test($accountVal)){
			$accError.hide();
			return true;
		}else{
			$accError.html("请输入正确的手机号和邮箱");
			$accError.show();
			return false;
		}
	}

	$account.on("blur",function(){
		checkAccount();
	});

	//判断密码是否输入正确
	function checkPassword(){
		var $passwordVal = $password.val();
		if(/^\w\w{4,18}\w$/.test($passwordVal)){
			$passError.hide();
			return true;
		}else{
			$passError.html("密码要在6~20位之间并不能用特殊符号");
			$passError.show();
			return false;
		}
	}
	$password.on("blur",function(){
		checkPassword();
	});

	//判断再输入密码是否输入正确
	function checkRePassword(){
		var $passwordVal = $password.val();
		var $repasswordVal = $repassword.val();
		if($passwordVal == $repasswordVal){
			$repassError.hide();
			return true;
		}else{
			$repassError.html("两次密码输入不一致");
			$repassError.show();
			return false;
		}
	}

	$repassword.on("blur",function(){
		checkRePassword();
	});

	
	var correctCode = "";//用于记录产生的4位验证码
	var $idenImg = $iden_code.find("img");
	//生成随机的4位验证码
	function ranIdenCode(){
		correctCode = "";
		$idenImg.each(function(){
			var index = randomNum(0,59);
			$(this).attr("src","../img/"+imgArr[index]);
			correctCode +=chArr[index];
		});
	}
	ranIdenCode();
	

	//判断验证码是否输入正确
	function checkIdenCode(){
		$autoIdenCodeVal = $autoIdenCode.val();
		if($autoIdenCodeVal != correctCode){
			$idenCodeError.html("您输入的验证码有误");
			$idenCodeError.show();
			ranIdenCode();//重新生成一组验证码
			return false;
		}else{
			$idenCodeError.hide();
			return true;
		}
	}
	$autoIdenCode.on("blur",function(){
		checkIdenCode();
	});

	//验证是否全部通过
	$login_btn.on("click",function(e){
		if(!(checkAccount()&&checkPassword()&&checkRePassword()&&checkIdenCode())){
			return false;
		}else{
			var $accountVal = $account.val();
			var $passwordVal = $password.val();
			var master = {
							"username":$accountVal,
							"password":$passwordVal,
							"ynlogin":0
						};
			var changeStr = JSON.stringify(master);//设置值
			var keyStr = $accountVal+"*username";//设置键
			document.cookie = keyStr+"="+changeStr+";path=/;";
			console.log(document.cookie);
			alert("注册成功");
		}
	});

	//点击邮件发送框背景变黑
	var clickCount = 0;
	var $send_email_span = $send_email.find("span");
	$send_email.on("click",function(){
		if(clickCount){
			clickCount = 0;
			$send_email_span.css("background","#fff");
		}else{
			clickCount = 1;
			$send_email_span.css("background","#000");
		}
	});


});
/*--------------------------------购物车模块-------------------------------------*/
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


	//刷新导航栏的购物车信息
	var $nav_right = $(".nav_right");
	var $shopping_bag = $nav_right.find(".shopping_bag");
	var shopping_bag_val = $shopping_bag.find("a").html();//购物车商品的件数

	var $price_total = $(".price_total").find("a");
	var price_total_val = $price_total.html();//购物车商品的总价


	var $shopping_list = $(".shopping_list");//购物车商品列表
	var $shopping_list_content = $(".shopping_list_content");
	var $clean_list = $(".clean_list");//结算按钮模块
	var $por_sum = $(".por_sum");//总价
	var $onSell = $(".onSell");//没有商品显示模块

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
		if(changeObj.goods!=null){//若购物车不为空
		//改变导航栏的购物车的数值
			$shopping_bag.find("a").html(changeObj.goods.gCount);

			$price_total.html("￥"+changeObj.goods.gTotal);
		//没有商品显示模块隐藏
		//购物车商品列表,结算按钮模块显示
			$onSell.hide();
			$clean_list.show();
			$shopping_list.show();

			$por_sum.html(changeObj.goods.gTotal);//显示总价

			//创建未结账商品的内容
			//第一个li（商品图片及描述）
			var unbuy_pro = $("<ul>").addClass("unbuy_pro");
			var unbuy_pro_img = $("<p/>").addClass("unbuy_pro_img");
			$("<img src='img/GM1-901-00033gwc-a.jpg'/>").appendTo(unbuy_pro_img);
			var unbuy_pro_left = $("<li>").addClass("unbuy_pro_left").appendTo(unbuy_pro);
			var unbuy_pro_txt = $("<p/>").addClass("unbuy_pro_txt");
			var pro_title = $("<span>").addClass("pro_title").html(changeObj.goods.tittle).appendTo(unbuy_pro_txt);
			var pro_gname = $("<span>").addClass("pro_gname").html(changeObj.goods.gName).appendTo(unbuy_pro_txt);

			unbuy_pro_img.appendTo(unbuy_pro_left);
			unbuy_pro_txt.appendTo(unbuy_pro_left);

			//第二个li（商品单价）
			var unit_price = $("<li>").addClass("unit_price").html(changeObj.goods.unitPrice).appendTo(unbuy_pro);

			//第三个li（商品数量）
			var num_choose = $("<div>").addClass("num_choose");
			var sub_num = $("<span>").addClass("sub_num").html("-").appendTo(num_choose);
			var pro_num = $("<input type='text'/>").addClass("pro_num").val(changeObj.goods.gCount).appendTo(num_choose);
			var add_num = $("<span>").addClass("add_num").html("+").appendTo(num_choose);
			var pro_count = $("<li>").addClass("pro_count").appendTo(unbuy_pro);
			num_choose.appendTo(pro_count);

			//第四个li（商品优惠）
			$("<li>").appendTo(unbuy_pro);

			//第五个li（商品优惠）
			var total = $("<li>").addClass("total").html("￥"+changeObj.goods.gTotal).appendTo(unbuy_pro);

			//第六个li（删除商品）
			var list_last = $("<li>").addClass("list_last").appendTo(unbuy_pro);
			$("<img src='img/icon_delete.png'/>").appendTo(list_last);

			unbuy_pro.appendTo($shopping_list_content);

			//按减号减少商品数量
			sub_num.on("click",function(){
				var pro_num_val = $(".pro_num").val();
				var unit_price_val = $(".unit_price").html();
				//console.log(pro_num_val,unit_price_val);
				if(pro_num_val==1){
					return false;
				}else{
					pro_num_val--;
					$(".pro_num").val(pro_num_val);
					var sum = pro_num_val*unit_price_val;
					$(".total").html("￥"+sum);
					$por_sum.html(sum);//显示总价
				}
			});

			//按加号增加商品数量
			add_num.on("click",function(){
				var pro_num_val = $(".pro_num").val();
				var unit_price_val = $(".unit_price").html();
				//console.log(pro_num_val,unit_price_val);
				pro_num_val++;
				$(".pro_num").val(pro_num_val);
				var sum = pro_num_val*unit_price_val;
				$(".total").html("￥"+sum);
				$por_sum.html(sum);//显示总价
			});

			//点击删除图片删除整列商品
			list_last.on("click","img",function(){
				$(this).parent().parent().remove();
				var $shopping_list_content_ul = $(".shopping_list_content").find(".unbuy_pro");
				changeObj.goods =  null;
				var changeStr = JSON.stringify(changeObj);//设置值
				var keyStr = changeObj.username+"*username";//设置键
				document.cookie = keyStr+"="+changeStr+";path=/;";
				$shopping_bag.find("a").html("0");
				$price_total.html("￥"+"0.00");
				if($shopping_list_content_ul.length==0){
					$onSell.show();
					$clean_list.hide();
					$shopping_list.hide();
				}
			});
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


	//切换tab时显示和隐藏
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