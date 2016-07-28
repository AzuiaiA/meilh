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