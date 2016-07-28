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