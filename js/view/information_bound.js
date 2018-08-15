
$(function(){
	
	$("#primaryBtn").click(function(){
		var socialCard = $("#socialCard").val();
		var phone = $("#phone").val();
		var password = $("#password").val();
		if(socialCard.trim()==''){$.toast("请输入社保号码","text");return;}
		if(!util.validateMobile(phone)){$.toast("请输入有效手机号","text");return;}
		if(password.trim()==''){$.toast("请输入密码","text");return;}
		util.Post(apiUrl.userBindInfo,{
			openid:localStorage.getItem(storageKey.openId),
			login_name:socialCard,
			phone:phone,
			password:password
		},function(res){
			location.href = "subscribe_select.html"
		})
		location.href = "subscribe_select.html"
	})
	
})
