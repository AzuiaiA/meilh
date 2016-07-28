$(function(){
	var $header_left = $(".header_left");//头部左边ul
	var $nav = $(".nav");//导航栏
	var $nav_left = $(".nav_left");//导航栏左边ul
	var $phone_app = $(".phone_app");//头部手机二维码
	var $nav_second_menu = $(".nav_second_menu");//导航栏二级菜单

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